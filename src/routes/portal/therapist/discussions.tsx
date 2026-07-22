import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { portalApi } from "../../../portalServer";

export const Route = createFileRoute("/portal/therapist/discussions")({
  component: TherapistDiscussions,
});

const CATEGORIES = [
  "Week 1",
  "Week 2",
  "Week 3",
  "Week 4",
  "Week 5",
  "Week 6",
  "Week 7",
  "Week 8",
  "General Chat"
];

function TherapistDiscussions() {
  const { user, token, loading, handleLogout } = usePortalSession("therapist");
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [expandedDiscussionId, setExpandedDiscussionId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // New reply state
  const [replyContents, setReplyContents] = useState<{ [key: number]: string }>({});
  const [submittingReply, setSubmittingReply] = useState<number | null>(null);

  // Filter/tab for category
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");

  // Load courses
  useEffect(() => {
    if (!token || !user) return;

    portalApi({ data: { action: "getTherapistDashboard", payload: { token } } })
      .then((res: any) => {
        setCourses(res.courses || []);
        if (res.courses && res.courses.length > 0) {
          setSelectedCourseId(res.courses[0].id);
        }
      })
      .catch((err: any) => {
        console.error(err);
        setError("Failed to load courses for forum moderation.");
      });
  }, [token, user]);

  const fetchDiscussions = () => {
    if (!token || selectedCourseId === null) return;
    portalApi({
      data: {
        action: "getDiscussionThreads",
        payload: { token, courseId: selectedCourseId }
      }
    })
      .then((res: any) => {
        setDiscussions(res || []);
      })
      .catch((err: any) => {
        console.error(err);
        setError("Failed to fetch discussion threads.");
      });
  };

  useEffect(() => {
    if (!token || selectedCourseId === null) return;
    fetchDiscussions();
  }, [token, selectedCourseId]);

  const handleCreateReply = async (e: React.FormEvent, threadId: number) => {
    e.preventDefault();
    const replyContent = replyContents[threadId];
    if (!token || !replyContent) return;
    setSubmittingReply(threadId);
    setError("");

    try {
      await portalApi({
        data: {
          action: "replyDiscussion",
          payload: {
            token,
            discussionId: threadId,
            content: replyContent
          }
        }
      });
      setReplyContents((prev) => ({ ...prev, [threadId]: "" }));
      setSuccess("Your specialist clinical response has been published.");
      fetchDiscussions();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to post clinical response.");
    } finally {
      setSubmittingReply(null);
    }
  };

  // Group threads by category
  const groupedDiscussions = CATEGORIES.reduce((acc, cat) => {
    acc[cat] = discussions.filter((d) => d.category === cat);
    return acc;
  }, {} as { [key: string]: any[] });

  // Handle threads that have no category or unexpected category (default to General Chat)
  const leftOverDiscussions = discussions.filter(
    (d) => !d.category || !CATEGORIES.includes(d.category)
  );
  if (leftOverDiscussions.length > 0) {
    groupedDiscussions["General Chat"] = [
      ...groupedDiscussions["General Chat"],
      ...leftOverDiscussions
    ];
  }

  return (
    <PortalLayout user={user} loading={loading} activeTab="discussions" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans max-w-5xl mx-auto pb-12">
        {/* Header */}
        <div className="space-y-1">
          <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Patient Q&A Discussion Moderator</h1>
          <p className="text-sm text-gray-600">Moderate peer boards, validate exposure logging strategies, and answer patient therapy questions.</p>
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
          <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm max-w-md">
            <div className="space-y-2">
              <label htmlFor="moderator-board-select" className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                Select Moderation Forum Board
              </label>
              <select
                id="moderator-board-select"
                className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest font-semibold text-gray-800"
                value={selectedCourseId || ""}
                onChange={(e) => {
                  setSelectedCourseId(parseInt(e.target.value));
                  setExpandedDiscussionId(null);
                }}
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

        {/* Discussions Board categorized */}
        {selectedCourseId && (
          <div className="space-y-10">
            {/* Category Filter Quick-links */}
            <div className="flex flex-wrap gap-2 pb-2">
              <button
                onClick={() => setSelectedCategoryFilter("All")}
                className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                  selectedCategoryFilter === "All"
                    ? "bg-forest border-forest text-white shadow-sm"
                    : "bg-white border-forest/15 text-gray-700 hover:border-forest/30"
                }`}
              >
                All Topics ({discussions.length})
              </button>
              {CATEGORIES.map((cat) => {
                const count = groupedDiscussions[cat]?.length || 0;
                return (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategoryFilter(cat)}
                    className={`px-4 py-2 rounded-full text-xs font-bold border transition-all ${
                      selectedCategoryFilter === cat
                        ? "bg-forest border-forest text-white shadow-sm"
                        : "bg-white border-forest/15 text-gray-700 hover:border-forest/30"
                    }`}
                  >
                    {cat} ({count})
                  </button>
                );
              })}
            </div>

            {/* Displaying Groups */}
            <div className="space-y-8">
              {CATEGORIES.filter(
                (cat) => selectedCategoryFilter === "All" || selectedCategoryFilter === cat
              ).map((cat) => {
                const threads = groupedDiscussions[cat] || [];
                if (selectedCategoryFilter === "All" && threads.length === 0) return null;

                return (
                  <div key={cat} className="space-y-4">
                    <div className="flex items-center gap-3 border-b border-forest/10 pb-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-forest"></span>
                      <h2 className="text-lg font-serif font-bold text-gray-900">{cat}</h2>
                      <span className="text-xs bg-cream/35 border border-forest/10 text-forest px-2.5 py-0.5 rounded-full font-bold">
                        {threads.length} topics
                      </span>
                    </div>

                    {threads.length > 0 ? (
                      <div className="grid grid-cols-1 gap-4">
                        {threads.map((thread) => {
                          const isExpanded = expandedDiscussionId === thread.id;
                          return (
                            <div
                              key={thread.id}
                              className={`bg-white border rounded-2xl p-5 sm:p-6 transition-all shadow-sm ${
                                isExpanded ? "border-forest/35 ring-1 ring-forest/10" : "border-forest/10 hover:border-forest/20"
                              }`}
                            >
                              {/* Thread Header */}
                              <div
                                className="cursor-pointer space-y-2"
                                onClick={() => setExpandedDiscussionId(isExpanded ? null : thread.id)}
                              >
                                <div className="flex justify-between items-start gap-4">
                                  <h3 className="text-lg font-serif font-bold text-gray-950 leading-snug hover:text-forest transition-colors">
                                    {thread.title}
                                  </h3>
                                  <span className="text-xs bg-cream/15 text-forest border border-forest/10 px-3 py-1 rounded-full font-bold shrink-0">
                                    {thread.replies ? thread.replies.length : 0} replies
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-semibold uppercase tracking-wider">
                                  <span className="text-forest font-extrabold">{thread.display_name}</span>
                                  <span>•</span>
                                  <span>{new Date(thread.created_at).toLocaleString()}</span>
                                </div>

                                {!isExpanded && (
                                  <p className="text-sm text-gray-600 line-clamp-2 pt-1 leading-relaxed">
                                    {thread.content}
                                  </p>
                                )}
                              </div>

                              {/* Expanded content */}
                              {isExpanded && (
                                <div className="mt-4 pt-4 border-t border-gray-100 space-y-6">
                                  <p className="text-sm text-gray-800 leading-relaxed whitespace-pre-wrap bg-cream/5 p-4 rounded-xl border border-forest/5">
                                    {thread.content}
                                  </p>

                                  {/* Replies Section */}
                                  <div className="space-y-4">
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">
                                      Responses ({thread.replies ? thread.replies.length : 0})
                                    </h4>
                                    
                                    {thread.replies && thread.replies.length > 0 ? (
                                      <div className="space-y-3 pl-4 border-l-2 border-forest/15">
                                        {thread.replies.map((reply: any) => (
                                          <div key={reply.id} className="p-4 bg-gray-50 rounded-2xl text-xs sm:text-sm space-y-1">
                                            <div className="flex justify-between text-[10px] font-bold text-gray-500">
                                              <span className={reply.role === "therapist" ? "text-forest font-black" : "text-gray-600"}>
                                                {reply.display_name} {reply.role === "therapist" ? "(Clinical Specialist)" : ""}
                                              </span>
                                              <span>{new Date(reply.created_at).toLocaleDateString()}</span>
                                            </div>
                                            <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{reply.content}</p>
                                          </div>
                                        ))}
                                      </div>
                                    ) : (
                                      <p className="text-xs text-gray-500 italic pl-4">No responses yet. Be the first to share your support.</p>
                                    )}

                                    {/* Post inline reply form */}
                                    <form onSubmit={(e) => handleCreateReply(e, thread.id)} className="space-y-3 pt-3">
                                      <div className="space-y-1">
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider">Clinical specialist Reply</label>
                                        <textarea
                                          required
                                          rows={2}
                                          placeholder="Write a supportive, secure, HIPAA-compliant clinical response..."
                                          className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                                          value={replyContents[thread.id] || ""}
                                          onChange={(e) => {
                                            const val = e.target.value;
                                            setReplyContents((prev) => ({ ...prev, [thread.id]: val }));
                                          }}
                                        />
                                      </div>
                                      <div className="flex justify-end">
                                        <button
                                          type="submit"
                                          disabled={submittingReply === thread.id}
                                          className="px-5 py-2 bg-forest hover:bg-forest-dark text-white rounded-xl font-bold text-xs transition-all disabled:opacity-50 shadow-sm"
                                        >
                                          {submittingReply === thread.id ? "Publishing response..." : "Post Specialist Response"}
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-sm text-gray-500 italic py-4 pl-4 border border-dashed border-gray-200 rounded-2xl">
                        No active discussions in this category yet.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
