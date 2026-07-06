import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { getTherapistDashboardData, getDiscussions, addDiscussionReply } from "../../../portalServer";

export const Route = createFileRoute("/portal/therapist/discussions")({
  component: TherapistDiscussions,
});

function TherapistDiscussions() {
  const { user, token, loading, handleLogout } = usePortalSession("therapist");
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [discussionsData, setDiscussionsData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // New reply state
  const [replyContents, setReplyContents] = useState<{ [key: number]: string }>({});
  const [submittingReply, setSubmittingReply] = useState<number | null>(null);

  useEffect(() => {
    if (!token || !user) return;

    getTherapistDashboardData({ data: { token } })
      .then((res) => {
        setCourses(res.courses || []);
        if (res.courses && res.courses.length > 0) {
          setSelectedCourseId(res.courses[0].id);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load courses for forum moderation.");
      });
  }, [token, user]);

  useEffect(() => {
    if (!token || selectedCourseId === null) return;
    fetchDiscussions();
  }, [token, selectedCourseId]);

  const fetchDiscussions = () => {
    if (!token || selectedCourseId === null) return;
    getDiscussions({ data: { token, courseId: selectedCourseId } })
      .then((res) => {
        setDiscussionsData(res.threads || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch discussion threads.");
      });
  };

  const handleCreateReply = async (e: React.FormEvent, threadId: number) => {
    e.preventDefault();
    const replyContent = replyContents[threadId];
    if (!token || !replyContent) return;
    setSubmittingReply(threadId);
    setError("");

    try {
      await addDiscussionReply({
        data: {
          token,
          discussionId: threadId,
          content: replyContent,
        },
      });
      setReplyContents((prev) => ({ ...prev, [threadId]: "" }));
      setSuccess("Your specialist response has been published.");
      fetchDiscussions();
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      setError(err?.message || "Failed to post clinical response.");
    } finally {
      setSubmittingReply(null);
    }
  };

  return (
    <PortalLayout user={user} loading={loading} activeTab="discussions" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans">
        {/* Header */}
        <div className="space-y-1">
          <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Patient Q&A Discussion Moderator</h1>
          <p className="text-sm text-gray-650">Moderate peer boards, validate exposure logging strategies, and answer patient therapy questions.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-700 rounded-xl">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 rounded-xl">
            {success}
          </div>
        )}

        {/* Course Board Selector */}
        {courses.length > 0 && (
          <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm max-w-xl">
            <div className="space-y-2">
              <label htmlFor="moderator-board-select" className="block text-xs font-bold text-gray-600 uppercase">
                Select Moderation Forum Board
              </label>
              <select
                id="moderator-board-select"
                className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest font-semibold text-gray-800"
                value={selectedCourseId || ""}
                onChange={(e) => setSelectedCourseId(parseInt(e.target.value))}
              >
                {courses.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.title} Forum
                  </option>
                ))}
              </select>
            </div>
          </div>
        )}

        {/* Discussions Stream */}
        <div className="bg-white border border-forest/10 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
          <h2 className="text-2xl font-serif font-bold text-gray-900 border-b border-gray-150 pb-3">Active Discussion Threads</h2>

          {discussionsData.length > 0 ? (
            <div className="space-y-8 divide-y divide-gray-100">
              {discussionsData.map((thread) => (
                <div key={thread.id} className="pt-8 first:pt-0 space-y-4">
                  <div className="space-y-1">
                    <h3 className="font-serif text-xl font-bold text-gray-950">{thread.title}</h3>
                    <div className="flex gap-2 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                      <span className="text-forest font-extrabold">{thread.author_name}</span>
                      <span>({thread.author_role})</span>
                      <span>•</span>
                      <span>{new Date(thread.created_at).toLocaleString()}</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed mt-2 p-4 bg-cream/15 rounded-2xl border border-forest/5">
                      {thread.content}
                    </p>
                  </div>

                  {/* Thread Replies */}
                  <div className="pl-6 space-y-3 border-l-2 border-forest/15">
                    {thread.replies && thread.replies.map((reply: any) => (
                      <div key={reply.id} className="p-3.5 bg-gray-50 rounded-xl text-xs space-y-1">
                        <div className="flex justify-between text-[10px] font-bold text-gray-500">
                          <span className={reply.author_role === "therapist" ? "text-forest font-black" : "text-gray-600"}>
                            {reply.author_name} {reply.author_role === "therapist" ? "(Clinical Specialist)" : ""}
                          </span>
                          <span>{new Date(reply.created_at).toLocaleDateString()}</span>
                        </div>
                        <p className="text-gray-700 leading-relaxed">{reply.content}</p>
                      </div>
                    ))}

                    {/* Therapist Reply Form */}
                    <form onSubmit={(e) => handleCreateReply(e, thread.id)} className="space-y-2">
                      <textarea
                        rows={2}
                        required
                        placeholder="Write a supportive, secure LPC response..."
                        className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-xs focus:outline-none focus:border-forest"
                        value={replyContents[thread.id] || ""}
                        onChange={(e) => {
                          const val = e.target.value;
                          setReplyContents((prev) => ({ ...prev, [thread.id]: val }));
                        }}
                      />
                      <div className="flex justify-end">
                        <button
                          type="submit"
                          disabled={submittingReply === thread.id}
                          className="rounded-xl bg-forest hover:bg-forest-dark text-white px-5 py-2 text-xs font-bold transition-all disabled:opacity-50 shadow-sm"
                        >
                          {submittingReply === thread.id ? "Publishing response..." : "Post Specialist Response"}
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic py-10 text-center">No active topics found on this board.</p>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
