import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { 
  getPatientDashboardData, 
  getDiscussions, 
  addDiscussionThread, 
  addDiscussionReply 
} from "../../../portalServer";

export const Route = createFileRoute("/portal/student/community")({
  component: StudentCommunity,
});

function StudentCommunity() {
  const { user, token, loading, handleLogout } = usePortalSession("patient");
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [discussionsData, setDiscussionsData] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // New thread state
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [submittingThread, setSubmittingThread] = useState(false);

  // New reply state
  const [replyContents, setReplyContents] = useState<{ [key: number]: string }>({});
  const [submittingReply, setSubmittingReply] = useState<number | null>(null);

  useEffect(() => {
    if (!token || !user) return;

    // First fetch patient's enrolled courses
    getPatientDashboardData({ data: { token } })
      .then((res) => {
        setCourses(res.courses || []);
        if (res.courses && res.courses.length > 0) {
          setSelectedCourseId(res.courses[0].id);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load enrolled courses.");
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
        setError("Failed to fetch forum discussions.");
      });
  };

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || selectedCourseId === null || !newThreadTitle || !newThreadContent) return;
    setSubmittingThread(true);
    setError("");
    setSuccess("");

    try {
      await addDiscussionThread({
        data: {
          token,
          courseId: selectedCourseId,
          title: newThreadTitle,
          content: newThreadContent,
        },
      });
      setNewThreadTitle("");
      setNewThreadContent("");
      setSuccess("Your topic was published successfully!");
      fetchDiscussions();
    } catch (err: any) {
      setError(err?.message || "Failed to post thread.");
    } finally {
      setSubmittingThread(false);
    }
  };

  const handleCreateReply = async (e: React.FormEvent, threadId: number) => {
    e.preventDefault();
    const replyContent = replyContents[threadId];
    if (!token || !replyContent) return;
    setSubmittingReply(threadId);

    try {
      await addDiscussionReply({
        data: {
          token,
          discussionId: threadId,
          content: replyContent,
        },
      });
      setReplyContents((prev) => ({ ...prev, [threadId]: "" }));
      fetchDiscussions();
    } catch (err: any) {
      setError(err?.message || "Failed to post reply.");
    } finally {
      setSubmittingReply(null);
    }
  };

  return (
    <PortalLayout user={user} loading={loading} activeTab="community" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans">
        {/* Header */}
        <div className="space-y-1">
          <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Patient Peer Community Board</h1>
          <p className="text-sm text-gray-650">Ask questions, share experiences, and receive guidance from peers and specialist facilitators.</p>
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
        <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm max-w-xl">
          <div className="space-y-2">
            <label htmlFor="board-select" className="block text-xs font-bold text-gray-600 uppercase">
              Select Discussion Board
            </label>
            <select
              id="board-select"
              className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
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

        {selectedCourseId !== null && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Discussions Stream */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-forest/10 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
                <h3 className="text-xl font-serif font-bold text-gray-900">Active Peer Board Topics</h3>

                {discussionsData.length > 0 ? (
                  <div className="space-y-6 divide-y divide-gray-100">
                    {discussionsData.map((thread) => (
                      <div key={thread.id} className="pt-6 first:pt-0 space-y-4">
                        <div className="space-y-1">
                          <h4 className="font-serif text-lg font-bold text-gray-950">{thread.title}</h4>
                          <div className="flex gap-2 text-[10px] text-gray-500 font-semibold uppercase">
                            <span className="text-forest font-bold">{thread.author_name}</span>
                            <span>•</span>
                            <span>{new Date(thread.created_at).toLocaleDateString()}</span>
                          </div>
                          <p className="text-xs text-gray-700 leading-relaxed mt-2 p-3 bg-cream/10 rounded-xl border border-forest/5">
                            {thread.content}
                          </p>
                        </div>

                        {/* Thread Replies */}
                        <div className="pl-6 space-y-3 border-l-2 border-forest/15">
                          {thread.replies && thread.replies.map((reply: any) => (
                            <div key={reply.id} className="p-3 bg-gray-50 rounded-xl text-xs space-y-1">
                              <div className="flex justify-between text-[10px] font-bold text-gray-500">
                                <span className={reply.author_role === "therapist" ? "text-forest font-extrabold" : "text-gray-600"}>
                                  {reply.author_name} {reply.author_role === "therapist" ? "(Clinical Facilitator)" : ""}
                                </span>
                                <span>{new Date(reply.created_at).toLocaleDateString()}</span>
                              </div>
                              <p className="text-gray-700 leading-relaxed">{reply.content}</p>
                            </div>
                          ))}

                          {/* Fast Reply Box */}
                          <form onSubmit={(e) => handleCreateReply(e, thread.id)} className="flex gap-2">
                            <input
                              type="text"
                              required
                              placeholder="Offer support or clinical peer advice..."
                              className="flex-grow rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                              value={replyContents[thread.id] || ""}
                              onChange={(e) => setReplyContents((prev) => ({ ...prev, [threadId]: e.target.value } as any))} // Typecasting workaround
                              onInput={(e: any) => {
                                const val = e.target.value;
                                setReplyContents((prev) => ({ ...prev, [thread.id]: val }));
                              }}
                            />
                            <button
                              type="submit"
                              disabled={submittingReply === thread.id}
                              className="rounded-xl bg-forest text-white px-4 py-2 text-xs font-bold hover:bg-forest-dark transition-all disabled:opacity-50 shrink-0"
                            >
                              {submittingReply === thread.id ? "Sending..." : "Reply"}
                            </button>
                          </form>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic py-6 text-center">No discussion topics posted yet on this board. Be the first to start a conversation!</p>
                )}
              </div>
            </div>

            {/* Create Topic Form */}
            <div className="lg:col-span-4 bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="font-serif text-lg font-bold text-gray-900">Start a Board Topic</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Post clinical questions or experiences. Other group participants and clinical staff review and reply daily.
              </p>
              <form onSubmit={handleCreateThread} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Topic Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Managing ADHD overstimulation in open-offices"
                    className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                    value={newThreadTitle}
                    onChange={(e) => setNewThreadTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Content / Details</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Describe your context, questions, or helpful hints..."
                    className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                    value={newThreadContent}
                    onChange={(e) => setNewThreadContent(e.target.value)}
                  />
                </div>
                <button
                  type="submit"
                  disabled={submittingThread}
                  className="w-full rounded-xl bg-forest py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-all disabled:opacity-50"
                >
                  {submittingThread ? "Publishing Topic..." : "Publish Board Topic"}
                </button>
              </form>
            </div>

          </div>
        )}
      </div>
    </PortalLayout>
  );
}
