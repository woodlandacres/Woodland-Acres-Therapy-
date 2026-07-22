import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { portalApi } from "../../../portalServer";

export const Route = createFileRoute("/portal/student/community")({
  component: StudentCommunity,
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

function StudentCommunity() {
  const { user, token, loading, handleLogout } = usePortalSession("patient");
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [expandedDiscussionId, setExpandedDiscussionId] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // New discussion form state
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newContent, setNewContent] = useState("");
  const [newCategory, setNewCategory] = useState("General Chat");
  const [submittingDiscussion, setSubmittingDiscussion] = useState(false);

  // New reply state
  const [replyContent, setReplyContent] = useState("");
  const [submittingReply, setSubmittingReply] = useState(false);

  // Filter/tab for category
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>("All");

  // Load patient dashboard to get enrolled courses
  useEffect(() => {
    if (!token) return;
    portalApi({ data: { action: "getPatientDashboard", payload: { token } } })
      .then((res: any) => {
        setEnrollments(res.enrollments || []);
        if (res.enrollments && res.enrollments.length > 0) {
          setSelectedCourseId(res.enrollments[0].course_id);
        }
      })
      .catch((err: any) => {
        console.error(err);
        setError("Failed to retrieve enrolled courses.");
      });
  }, [token]);

  // Load discussion threads for selected course
  const fetchDiscussions = () => {
    if (!token || !selectedCourseId) return;
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
        setError("Failed to load community discussions.");
      });
  };

  useEffect(() => {
    fetchDiscussions();
  }, [token, selectedCourseId]);

  const handleCreateDiscussion = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedCourseId || !newTitle || !newContent) return;
    setSubmittingDiscussion(true);
    setError("");

    try {
      await portalApi({
        data: {
          action: "createDiscussion",
          payload: {
            token,
            courseId: selectedCourseId,
            title: newTitle,
            content: newContent,
            category: newCategory
          }
        }
      });
      setNewTitle("");
      setNewContent("");
      setNewCategory("General Chat");
      setShowAddForm(false);
      setSuccess("Your discussion post has been shared successfully!");
      setTimeout(() => setSuccess(""), 4000);
      fetchDiscussions();
    } catch (err: any) {
      setError(err?.message || "Failed to publish discussion.");
    } finally {
      setSubmittingDiscussion(false);
    }
  };

  const handleCreateReply = async (e: React.FormEvent, discussionId: number) => {
    e.preventDefault();
    if (!token || !replyContent) return;
    setSubmittingReply(true);
    setError("");

    try {
      await portalApi({
        data: {
          action: "replyDiscussion",
          payload: {
            token,
            discussionId,
            content: replyContent
          }
        }
      });
      setReplyContent("");
      setSuccess("Reply posted successfully!");
      setTimeout(() => setSuccess(""), 3000);
      fetchDiscussions();
    } catch (err: any) {
      setError(err?.message || "Failed to post reply.");
    } finally {
      setSubmittingReply(false);
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
    <PortalLayout user={user} loading={loading} activeTab="community" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans max-w-5xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-forest/10 pb-5">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Peer Support & Discussions</h1>
            <p className="text-sm text-gray-600">Connect with fellow course participants, share strategies, and foster clinical resilience.</p>
          </div>
          {selectedCourseId && (
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="self-start md:self-center px-5 py-3 bg-forest hover:bg-forest-dark text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
            >
              {showAddForm ? "Cancel Post" : "＋ Start a Discussion"}
            </button>
          )}
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
        {enrollments.length > 0 ? (
          <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm max-w-md">
            <div className="space-y-2">
              <label htmlFor="board-select" className="block text-xs font-bold text-gray-600 uppercase tracking-wider">
                Select Course Forum
              </label>
              <select
                id="board-select"
                className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest font-semibold text-gray-800"
                value={selectedCourseId || ""}
                onChange={(e) => {
                  setSelectedCourseId(parseInt(e.target.value));
                  setExpandedDiscussionId(null);
                }}
              >
                {enrollments.map((e) => (
                  <option key={e.course_id} value={e.course_id}>
                    {e.title} Forum
                  </option>
                ))}
              </select>
            </div>
          </div>
        ) : (
          <div className="p-6 bg-cream/15 rounded-2xl border border-forest/10 text-center italic text-sm text-gray-600">
            You must be enrolled in a course to access discussion forums.
          </div>
        )}

        {/* Add Discussion Form */}
        {showAddForm && selectedCourseId && (
          <div className="bg-white border border-forest/20 rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
            <h3 className="text-xl font-serif font-bold text-gray-950">Publish New Topic</h3>
            <form onSubmit={handleCreateDiscussion} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Topic Title</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., Tips for managing high anxiety during exposures"
                    className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Category</label>
                  <select
                    className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest font-semibold text-gray-800"
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                  >
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="space-y-1">
                <label className="block text-xs font-bold text-gray-600 uppercase">Topic Content</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Describe your question, reflection, or trigger log here."
                  className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                />
              </div>
              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddForm(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-sm font-semibold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submittingDiscussion}
                  className="px-6 py-2.5 bg-forest hover:bg-forest-dark text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 shadow-sm"
                >
                  {submittingDiscussion ? "Publishing..." : "Post to Community"}
                </button>
              </div>
            </form>
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
                      <span className="text-xs bg-cream/35 border border-forest/10 text-forest px-2.5 py-0.5 rounded-full font-bold font-sans">
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
                                onClick={() => {
                                  setExpandedDiscussionId(isExpanded ? null : thread.id);
                                  setReplyContent("");
                                }}
                              >
                                <div className="flex justify-between items-start gap-4">
                                  <h3 className="text-lg font-serif font-bold text-gray-950 leading-snug hover:text-forest transition-colors">
                                    {thread.title}
                                  </h3>
                                  <span className="text-xs bg-cream/15 text-forest border border-forest/10 px-3 py-1 rounded-full font-bold shrink-0 font-sans">
                                    {thread.replies ? thread.replies.length : 0} replies
                                  </span>
                                </div>
                                <div className="flex items-center gap-2 text-[10px] text-gray-500 font-semibold uppercase tracking-wider font-sans">
                                  <span className="text-forest font-extrabold">{thread.display_name}</span>
                                  <span>•</span>
                                  <span>{new Date(thread.created_at).toLocaleDateString()}</span>
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
                                    <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider font-sans">
                                      Responses ({thread.replies ? thread.replies.length : 0})
                                    </h4>
                                    
                                    {thread.replies && thread.replies.length > 0 ? (
                                      <div className="space-y-3 pl-4 border-l-2 border-forest/15">
                                        {thread.replies.map((reply: any) => (
                                          <div key={reply.id} className="p-4 bg-gray-50 rounded-2xl text-xs sm:text-sm space-y-1">
                                            <div className="flex justify-between text-[10px] font-bold text-gray-500 font-sans">
                                              <span>{reply.display_name}</span>
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
                                        <label className="block text-[10px] font-bold text-gray-500 uppercase tracking-wider font-sans">Share Supportive Reply</label>
                                        <textarea
                                          required
                                          rows={2}
                                          placeholder="Write a supportive response or share a matching experience..."
                                          className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                                          value={replyContent}
                                          onChange={(e) => setReplyContent(e.target.value)}
                                        />
                                      </div>
                                      <div className="flex justify-end">
                                        <button
                                          type="submit"
                                          disabled={submittingReply}
                                          className="px-5 py-2 bg-forest hover:bg-forest-dark text-white rounded-xl font-bold text-xs transition-all disabled:opacity-50 shadow-sm"
                                        >
                                          {submittingReply ? "Posting..." : "Post Reply"}
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
