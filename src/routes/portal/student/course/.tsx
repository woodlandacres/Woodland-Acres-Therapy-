import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../../auth-helper";
import { 
  getCourseViewerData, 
  updateModuleProgress, 
  getDiscussions, 
  addDiscussionThread, 
  addDiscussionReply 
} from "../../../portalServer";

export const Route = createFileRoute("/portal/student/course/$courseId")({
  component: StudentCourseViewer,
});

function StudentCourseViewer() {
  const { courseId } = Route.useParams() as { courseId: string };
  const { user, token, loading, handleLogout } = usePortalSession("patient");
  
  const [courseData, setCourseData] = useState<any>(null);
  const [discussionsData, setDiscussionsData] = useState<any[]>([]);
  const [activeModule, setActiveModule] = useState<any>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [viewTab, setViewTab] = useState<"modules" | "community" | "resources">("modules");

  // New thread state
  const [newThreadTitle, setNewThreadTitle] = useState("");
  const [newThreadContent, setNewThreadContent] = useState("");
  const [submittingThread, setSubmittingThread] = useState(false);

  // New reply state (indexed by thread ID)
  const [replyContents, setReplyContents] = useState<{ [key: number]: string }>({});
  const [submittingReply, setSubmittingReply] = useState<number | null>(null);

  const numericCourseId = isNaN(parseInt(courseId)) ? 1 : parseInt(courseId);

  useEffect(() => {
    if (!token || !user) return;
    fetchCourseDetails();
    fetchDiscussionsList();
  }, [token, user, courseId]);

  const fetchCourseDetails = () => {
    if (!token) return;
    getCourseViewerData({ data: { token, courseId: numericCourseId } })
      .then((res) => {
        setCourseData(res);
        if (res.modules && res.modules.length > 0) {
          // Default to first module
          setActiveModule(res.modules[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load course details.");
      });
  };

  const fetchDiscussionsList = () => {
    if (!token) return;
    getDiscussions({ data: { token, courseId: numericCourseId } })
      .then((res) => {
        setDiscussionsData(res.threads || []);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const handleMarkCompleted = async (module: any) => {
    if (!token || !courseData || !courseData.modules) return;
    setError("");
    setSuccess("");

    try {
      // Calculate new progress percentage
      const currentIndex = courseData.modules.findIndex((m: any) => m.id === module.id);
      const totalModules = courseData.modules.length;
      const completedCount = currentIndex + 1;
      const calculatedPct = Math.round((completedCount / totalModules) * 100);

      await updateModuleProgress({
        data: {
          token,
          courseId: numericCourseId,
          progressPct: calculatedPct,
        },
      });

      setSuccess(`Congratulations! You have completed "${module.title}".`);
      setCourseData((prev: any) => ({
        ...prev,
        progressPct: calculatedPct,
      }));

      // Auto-advance to next module if available
      if (currentIndex + 1 < totalModules) {
        setTimeout(() => {
          setActiveModule(courseData.modules[currentIndex + 1]);
          setSuccess("");
        }, 1500);
      }
    } catch (err: any) {
      setError(err?.message || "Failed to update progress.");
    }
  };

  const handleCreateThread = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newThreadTitle || !newThreadContent) return;
    setSubmittingThread(true);
    setError("");

    try {
      await addDiscussionThread({
        data: {
          token,
          courseId: numericCourseId,
          title: newThreadTitle,
          content: newThreadContent,
        },
      });
      setNewThreadTitle("");
      setNewThreadContent("");
      setSuccess("Your question has been posted to the community board!");
      fetchDiscussionsList();
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
      fetchDiscussionsList();
    } catch (err: any) {
      setError(err?.message || "Failed to post reply.");
    } finally {
      setSubmittingReply(null);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E8] font-sans">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto animate-spin"></div>
          <p className="text-sm font-semibold text-gray-600">Loading Secure Course Viewer...</p>
        </div>
      </div>
    );
  }

  if (!user || !courseData) return null;

  const { course, modules, resources, zoomSessions, progressPct } = courseData;

  return (
    <PortalLayout user={user} loading={loading} activeTab="courses" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans">
        {/* Navigation Breadcrumb */}
        <div className="space-y-1">
          <Link to="/portal/student/courses" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to My Courses
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">{course.title}</h1>
          
          {/* Progress bar */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3 pt-2 max-w-xl">
            <span className="text-xs font-bold text-gray-600 uppercase">Your Progress:</span>
            <div className="flex-grow bg-gray-150 h-3 rounded-full overflow-hidden flex items-center">
              <div 
                className="bg-forest h-full rounded-full transition-all duration-500" 
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <span className="text-xs font-bold text-forest shrink-0">{Math.round(progressPct)}% Completed</span>
          </div>
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

        {/* Course View Tabs */}
        <div className="border-b border-forest/10 flex gap-4 text-xs font-bold uppercase tracking-wider">
          <button
            onClick={() => setViewTab("modules")}
            className={`pb-3 px-1 border-b-2 transition-all ${
              viewTab === "modules" ? "border-forest text-forest" : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Syllabus Lectures
          </button>
          <button
            onClick={() => setViewTab("resources")}
            className={`pb-3 px-1 border-b-2 transition-all ${
              viewTab === "resources" ? "border-forest text-forest" : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Worksheets & Logs ({resources?.length || 0})
          </button>
          <button
            onClick={() => setViewTab("community")}
            className={`pb-3 px-1 border-b-2 transition-all ${
              viewTab === "community" ? "border-forest text-forest" : "border-transparent text-gray-500 hover:text-gray-900"
            }`}
          >
            Q&A Peer Board ({discussionsData?.length || 0})
          </button>
        </div>

        {/* Tab 1: Modules & Lecture Area */}
        {viewTab === "modules" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Lecture list */}
            <div className="lg:col-span-4 bg-white border border-forest/10 rounded-2xl p-4 space-y-4">
              <h3 className="text-sm font-bold text-gray-700 uppercase px-2">Course Chapters</h3>
              <div className="space-y-1.5">
                {modules && modules.length > 0 ? (
                  modules.map((m: any) => (
                    <button
                      key={m.id}
                      onClick={() => setActiveModule(m)}
                      className={`w-full text-left p-3.5 rounded-xl text-xs font-semibold flex items-start gap-3 transition-all ${
                        activeModule?.id === m.id
                          ? "bg-forest/10 text-forest border-l-4 border-forest font-bold"
                          : "text-gray-600 hover:bg-cream/15"
                      }`}
                    >
                      <span className="shrink-0 text-xs">
                        {m.content_type === "video" ? "🎥" : m.content_type === "pdf" ? "📄" : "📖"}
                      </span>
                      <span className="line-clamp-2">{m.title}</span>
                    </button>
                  ))
                ) : (
                  <p className="text-xs text-gray-500 p-2">Syllabus modules are currently being drafted by clinical staff.</p>
                )}
              </div>
            </div>

            {/* Right Col: Active Lecture Display */}
            <div className="lg:col-span-8 bg-white border border-forest/10 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              {activeModule ? (
                <div className="space-y-6">
                  <div className="border-b border-gray-150 pb-4">
                    <span className="text-[10px] font-bold text-brown-warm uppercase tracking-wider block mb-1">
                      Now Reading / Watching
                    </span>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">{activeModule.title}</h2>
                  </div>

                  {/* Dynamic player or content based on content_type */}
                  {activeModule.content_type === "video" && (
                    <div className="space-y-4">
                      <div className="relative aspect-video rounded-2xl overflow-hidden bg-black flex items-center justify-center border border-forest/10 shadow-inner">
                        {activeModule.content_url ? (
                          <video 
                            src={activeModule.content_url} 
                            controls 
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="text-center text-gray-400 p-4">
                            <span className="text-4xl block mb-2 font-serif font-semibold">🎬</span>
                            <p className="text-xs">Mock Clinical Video Integration</p>
                          </div>
                        )}
                      </div>
                      <p className="text-xs text-gray-500 italic text-center">
                        This is a HIPAA-secure clinical media session. Please complete the module in full.
                      </p>
                    </div>
                  )}

                  {activeModule.content_type === "pdf" && (
                    <div className="p-8 border border-dashed border-forest/20 rounded-2xl bg-cream/10 text-center space-y-4">
                      <div className="h-16 w-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto text-2xl font-bold">
                        📄
                      </div>
                      <div className="space-y-2 max-w-sm mx-auto">
                        <h4 className="font-serif font-bold text-gray-900">Worksheet / PDF Companion</h4>
                        <p className="text-xs text-gray-500">This lecture is accompanied by a printable checklist or hierarchy log to record clinical progress.</p>
                      </div>
                      <a
                        href={activeModule.content_url || "#"}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex rounded-xl bg-forest px-5 py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-colors shadow-sm"
                      >
                        Download PDF Handout ↓
                      </a>
                    </div>
                  )}

                  {activeModule.content_type === "text" && (
                    <div className="space-y-4 font-sans text-sm text-gray-700 leading-relaxed">
                      <p>
                        Welcome to this core conceptual session. Response Prevention is the crucial engine of healing in OCD therapy. 
                        By systematically exposing yourself to distress triggers and strictly refraining from safety rituals or compulsions, 
                        your amygdala begins a vital neurological retraining process called habituation.
                      </p>
                      <p className="font-bold text-forest">
                        Core Rule: Allow the distress to peak, plateu, and naturally decline without intervening with safety behaviors.
                      </p>
                      <p>
                        Whether practicing tactile touch, imaginal scenarios, or symptom tracking, patience and consistency are your greatest advocates.
                      </p>
                    </div>
                  )}

                  {/* Mark Completed Button */}
                  <div className="pt-6 border-t border-gray-150 flex justify-between items-center">
                    <span className="text-xs text-gray-500 font-medium">Progress tracks immediately in student portal.</span>
                    <button
                      onClick={() => handleMarkCompleted(activeModule)}
                      className="rounded-xl bg-forest hover:bg-forest-dark text-white px-5 py-3 text-xs font-bold transition-all shadow-md flex items-center gap-2"
                    >
                      <span>Check</span> Mark This Lecture Completed
                    </button>
                  </div>

                </div>
              ) : (
                <div className="text-center py-20 text-gray-500">
                  <p className="text-sm">Select a lecture from the sidebar to begin learning.</p>
                </div>
              )}
            </div>

          </div>
        )}

        {/* Tab 2: Worksheets & Resources */}
        {viewTab === "resources" && (
          <div className="bg-white border border-forest/10 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <div>
              <h3 className="text-2xl font-serif font-bold text-gray-900">Downloadable Worksheets & Handouts</h3>
              <p className="text-xs text-gray-500 mt-1">Use these worksheets between counseling sessions as guided in the curriculum.</p>
            </div>

            {resources && resources.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {resources.map((res: any) => (
                  <div key={res.id} className="p-5 bg-cream/15 border border-forest/5 rounded-2xl flex flex-col justify-between hover:border-forest/15 transition-all">
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="inline-flex items-center rounded-md bg-forest/10 px-2 py-0.5 text-[10px] font-bold text-forest uppercase shrink-0">
                          {res.file_type || "PDF"}
                        </span>
                      </div>
                      <h4 className="font-serif text-base font-bold text-gray-900">{res.title}</h4>
                      <p className="text-xs text-gray-500 leading-relaxed font-sans">{res.description}</p>
                    </div>
                    <div className="pt-4 mt-4 border-t border-forest/5 flex items-center justify-end">
                      <a
                        href={res.file_url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xs font-bold text-forest hover:underline uppercase tracking-wide flex items-center gap-1"
                      >
                        Download ↓
                      </a>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-gray-500 italic py-10 text-center">No downloadable resources assigned for this course.</p>
            )}
          </div>
        )}

        {/* Tab 3: Q&A Forum */}
        {viewTab === "community" && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left: QA Threads */}
            <div className="lg:col-span-8 space-y-6">
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-6">
                <h3 className="text-xl font-serif font-bold text-gray-900">Patient Discussion Board</h3>

                {discussionsData && discussionsData.length > 0 ? (
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
                                  {reply.author_name} {reply.author_role === "therapist" ? "(Emily Weaver, LPC)" : ""}
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
                              placeholder="Write a supportive reply..."
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
                  <p className="text-xs text-gray-500 italic py-6 text-center">No discussion topics posted yet. Be the first to ask!</p>
                )}
              </div>
            </div>

            {/* Right: Add new Thread Form */}
            <div className="lg:col-span-4 bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="font-serif text-lg font-bold text-gray-900">Ask a Q&A Question</h3>
              <p className="text-xs text-gray-500 leading-relaxed">
                Post clinical or self-help questions. Emily Weaver, LPC, and other peers review these boards daily.
              </p>
              <form onSubmit={handleCreateThread} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Topic Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Managing distress peak on Level 3 exposures"
                    className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                    value={newThreadTitle}
                    onChange={(e) => setNewThreadTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-gray-600 uppercase">Your Question / Post</label>
                  <textarea
                    required
                    rows={4}
                    placeholder="Briefly describe what trigger, compaction, or barrier you are encountering..."
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
                  {submittingThread ? "Posting Thread..." : "Publish Question"}
                </button>
              </form>
            </div>

          </div>
        )}
      </div>
    </PortalLayout>
  );
}
