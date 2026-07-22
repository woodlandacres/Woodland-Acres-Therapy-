import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../../auth-helper";
import { portalApi } from "../../../../portalServer";

export const Route = createFileRoute("/portal/student/course/$courseId")({
  component: StudentCourseDetail,
});

function StudentCourseDetail() {
  const { courseId } = Route.useParams() as { courseId: string };
  const { user, token, loading, handleLogout } = usePortalSession("patient");

  const [courseData, setCourseData] = useState<any>(null);
  const [enrollment, setEnrollment] = useState<any>(null);
  const [activeModuleIdx, setActiveModuleIdx] = useState<number | null>(null);
  const [completedModuleIds, setCompletedModuleIds] = useState<number[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const fetchCourseData = () => {
    if (!token || !courseId) return;

    // 1. Fetch Course details, modules, resources, and live sessions
    portalApi({
      data: {
        action: "getCourseDetail",
        payload: { token, courseId: parseInt(courseId) }
      }
    })
      .then((res: any) => {
        setCourseData(res || {});
        if (res.modules && res.modules.length > 0 && activeModuleIdx === null) {
          setActiveModuleIdx(0);
        }
      })
      .catch((err: any) => {
        console.error(err);
        setError("Failed to fetch classroom syllabus.");
      });

    // 2. Fetch enrollment status to show progress bar
    portalApi({
      data: {
        action: "getPatientDashboard",
        payload: { token }
      }
    })
      .then((res: any) => {
        const matching = res.enrollments?.find((e: any) => e.course_id === parseInt(courseId));
        if (matching) {
          setEnrollment(matching);
          
          // Seed completed modules locally based on enrollment progress pct if needed
          // Real progression tracking maps completions, let's load completions state from localStorage to prevent loss
          const savedCompletions = localStorage.getItem(`completed_mods_${user?.id}_${courseId}`);
          if (savedCompletions) {
            setCompletedModuleIds(JSON.parse(savedCompletions));
          }
        }
      })
      .catch((err: any) => {
        console.error(err);
        setError("Failed to verify enrollment progress.");
      });
  };

  useEffect(() => {
    if (!token || !user) return;
    fetchCourseData();
  }, [token, user, courseId]);

  const handleMarkComplete = async (moduleId: number) => {
    if (!token || !courseId || !courseData?.modules) return;

    let updatedCompletions = [...completedModuleIds];
    if (completedModuleIds.includes(moduleId)) {
      // Toggle off
      updatedCompletions = completedModuleIds.filter((id) => id !== moduleId);
    } else {
      // Mark complete
      updatedCompletions.push(moduleId);
    }

    setCompletedModuleIds(updatedCompletions);
    localStorage.setItem(`completed_mods_${user?.id}_${courseId}`, JSON.stringify(updatedCompletions));

    // Calculate new progress percentage
    const totalModules = courseData.modules.length;
    const progressPct = totalModules > 0 ? (updatedCompletions.length / totalModules) * 100 : 0;

    try {
      await portalApi({
        data: {
          action: "updateProgress",
          payload: {
            token,
            courseId: parseInt(courseId),
            progress: progressPct
          }
        }
      });
      
      // Update local enrollment progress bar
      if (enrollment) {
        setEnrollment({ ...enrollment, progress_pct: progressPct });
      }
      
      setSuccess("Your progress has been synchronized successfully!");
      setTimeout(() => setSuccess(""), 3000);
    } catch (err: any) {
      console.error(err);
      setError("Failed to persist module progress.");
    }
  };

  if (!courseData) {
    return (
      <PortalLayout user={user} loading={loading} activeTab="courses" handleLogout={handleLogout}>
        <div className="p-8 text-center text-gray-500 italic">Entering secure therapeutic classroom...</div>
      </PortalLayout>
    );
  }

  const { course, modules, resources, zoomSessions } = courseData;
  const activeModule = activeModuleIdx !== null && modules ? modules[activeModuleIdx] : null;

  return (
    <PortalLayout user={user} loading={loading} activeTab="courses" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans max-w-5xl mx-auto pb-12">
        {/* Header navigation back */}
        <div className="space-y-1">
          <Link to="/portal/student/courses" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to Learning Hub
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">{course?.title}</h1>
          <p className="text-sm text-gray-650 leading-relaxed max-w-3xl">{course?.description}</p>
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

        {/* Progress Overview */}
        {enrollment && (
          <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm space-y-2 max-w-xl">
            <div className="flex justify-between items-center text-sm font-bold text-forest">
              <span>Your Classroom Progress</span>
              <span>{Math.round(enrollment.progress_pct || 0)}% Complete</span>
            </div>
            <div className="bg-gray-100 h-2.5 rounded-full overflow-hidden w-full">
              <div 
                className="bg-forest h-full rounded-full transition-all duration-300" 
                style={{ width: `${enrollment.progress_pct || 0}%` }}
              />
            </div>
          </div>
        )}

        {/* Classroom Grid split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Column: Lesson Player */}
          <div className="lg:col-span-8 space-y-6">
            {activeModule ? (
              <div className="bg-white border border-forest/15 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
                <div className="border-b border-gray-150 pb-4 flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <span className="text-[10px] font-black uppercase tracking-wider bg-cream/35 text-forest border border-forest/10 px-2.5 py-1 rounded-full font-sans">
                      Active Lesson {activeModuleIdx! + 1}
                    </span>
                    <h2 className="text-xl font-serif font-bold text-gray-950 mt-1">{activeModule.title}</h2>
                  </div>
                  <button
                    onClick={() => handleMarkComplete(activeModule.id)}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                      completedModuleIds.includes(activeModule.id)
                        ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                        : "bg-white text-forest border-forest/15 hover:bg-cream/10"
                    }`}
                  >
                    {completedModuleIds.includes(activeModule.id) ? "✓ Completed Lesson" : "Mark as Complete"}
                  </button>
                </div>

                {/* Lesson Player Body */}
                <div className="space-y-4">
                  {activeModule.content_type === "video" ? (
                    <div className="space-y-3">
                      {activeModule.content_url ? (
                        <div className="aspect-video bg-black rounded-2xl overflow-hidden shadow-inner border border-gray-800">
                          <video 
                            src={activeModule.content_url} 
                            controls 
                            className="w-full h-full object-cover"
                            poster="/images/video-classroom-placeholder.jpg"
                          />
                        </div>
                      ) : (
                        <div className="aspect-video bg-gray-100 rounded-2xl border border-dashed border-gray-300 flex items-center justify-center p-6 text-center text-sm text-gray-500 italic">
                          No lecture video stream available for this module segment. Refer to downloadable clinical handouts.
                        </div>
                      )}
                    </div>
                  ) : activeModule.content_type === "pdf" ? (
                    <div className="p-6 bg-cream/15 border border-forest/5 rounded-2xl space-y-4 text-center">
                      <span className="text-4xl">📄</span>
                      <h3 className="text-md font-bold text-gray-900">Syllabus Handout Reference File</h3>
                      <p className="text-xs text-gray-600 max-w-md mx-auto">Please download the reference PDF attachment to complete assignments, homework checklists, and logs.</p>
                      {activeModule.content_url && (
                        <a
                          href={activeModule.content_url}
                          download
                          className="inline-flex px-5 py-2.5 bg-forest hover:bg-forest-dark text-white rounded-xl text-xs font-bold transition-all shadow-sm"
                        >
                          Download Syllabus Handout PDF ⬇
                        </a>
                      )}
                    </div>
                  ) : (
                    <div className="p-5 bg-cream/10 border border-forest/5 rounded-2xl space-y-3">
                      <p className="text-sm text-gray-800 leading-relaxed font-sans whitespace-pre-wrap">
                        This lesson consists of standard clinical reading. Follow any worksheet handouts listed in the sidebar to record triggers or exposure response outcomes.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="p-12 bg-white border border-forest/10 rounded-3xl text-center shadow-sm">
                <p className="text-sm text-gray-500 italic">Select a syllabus module on the right to start learning.</p>
              </div>
            )}

            {/* Handouts Downloadable Worksheets list */}
            <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-sm space-y-4 font-sans">
              <h3 className="text-lg font-serif font-bold text-gray-950 flex items-center gap-1.5 border-b border-gray-150 pb-2">
                <span>📄</span> Handouts & Logs Worksheets
              </h3>
              {resources && resources.length > 0 ? (
                <div className="space-y-3">
                  {resources.map((r: any) => {
                    const isDoc = r.file_type?.toLowerCase().includes("doc");
                    const icon = isDoc ? "💙" : r.file_type?.toLowerCase().includes("pdf") ? "🔴" : "📄";
                    return (
                      <div key={r.id} className="p-4 bg-gray-50 rounded-2xl hover:bg-cream/5 border border-transparent hover:border-forest/10 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                            <span>{icon}</span> {r.title}
                          </h4>
                          <p className="text-xs text-gray-650 leading-relaxed max-w-xl">{r.description}</p>
                        </div>
                        <a
                          href={r.file_url}
                          download
                          className="px-4 py-2 bg-white hover:bg-gray-100 text-forest rounded-xl text-xs font-black transition-all border border-forest/10 shadow-sm self-start sm:self-center shrink-0 flex items-center gap-1"
                        >
                          Download {r.file_type?.toUpperCase()} ⬇
                        </a>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic pl-2">No worksheets assigned to this classroom syllabus yet.</p>
              )}
            </div>

            {/* Live Zoom support sessions */}
            <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-sm space-y-4 font-sans">
              <h3 className="text-lg font-serif font-bold text-gray-950 flex items-center gap-1.5 border-b border-gray-150 pb-2">
                <span>🎥</span> Cohort Zoom Classes Schedule
              </h3>
              {zoomSessions && zoomSessions.length > 0 ? (
                <div className="space-y-3">
                  {zoomSessions.map((z: any) => (
                    <div key={z.id} className="p-4 bg-gray-50 rounded-2xl hover:bg-cream/5 border border-transparent hover:border-forest/10 transition-all flex flex-col sm:flex-row justify-between sm:items-center gap-4">
                      <div className="space-y-1">
                        <h4 className="text-sm font-bold text-gray-900">{z.title}</h4>
                        <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500 font-sans">
                          <span>📅 {new Date(z.scheduled_at).toLocaleString()}</span>
                          <span>⏳ {z.duration_min} mins</span>
                        </div>
                      </div>
                      {z.zoom_link && (
                        <a
                          href={z.zoom_link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="self-start sm:self-center px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-black transition-all shadow"
                        >
                          Join Class 💻
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic pl-2">No weekly Zoom group therapy classes scheduled for this cohort yet.</p>
              )}
            </div>
          </div>

          {/* Right Column: Classroom Syllabus List */}
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4 font-sans">
              <h3 className="text-lg font-serif font-bold text-gray-900 border-b border-gray-150 pb-2">Classroom Syllabus</h3>
              {modules && modules.length > 0 ? (
                <div className="space-y-2">
                  {modules.map((m: any, idx: number) => {
                    const isActive = activeModuleIdx === idx;
                    const isCompleted = completedModuleIds.includes(m.id);
                    return (
                      <div
                        key={m.id}
                        onClick={() => setActiveModuleIdx(idx)}
                        className={`p-3 rounded-2xl cursor-pointer border transition-all flex items-center justify-between gap-3 ${
                          isActive
                            ? "bg-forest border-forest text-white"
                            : "bg-cream/10 border-forest/5 text-gray-800 hover:bg-cream/25"
                        }`}
                      >
                        <div className="flex items-center gap-2">
                          <span className="text-xs font-bold opacity-70">L{idx + 1}</span>
                          <h4 className="text-xs font-semibold leading-snug line-clamp-1">{m.title}</h4>
                        </div>
                        {isCompleted && (
                          <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded-full ${
                            isActive ? "bg-white text-forest" : "bg-emerald-50 text-emerald-800"
                          }`}>
                            ✓ Done
                          </span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic py-4">Syllabus list is currently empty.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
