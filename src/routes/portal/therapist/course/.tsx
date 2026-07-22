import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../../auth-helper";
import { portalApi } from "../../../../portalServer";

export const Route = createFileRoute("/portal/therapist/course/$courseId")({
  component: TherapistCourseDetail,
});

function TherapistCourseDetail() {
  const { courseId } = Route.useParams() as { courseId: string };
  const { user, token, loading, handleLogout } = usePortalSession("therapist");
  const navigate = useNavigate();

  const [courseData, setCourseData] = useState<any>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Edit Course Meta State
  const [editTitle, setEditTitle] = useState("");
  const [editDescription, setEditDescription] = useState("");
  const [editPriceDollars, setEditPriceDollars] = useState("149.00");
  const [editSyllabusType, setEditSyllabusType] = useState("self_paced");
  const [editPublished, setEditPublished] = useState(true);
  const [updatingCourse, setUpdatingCourse] = useState(false);

  // New Module Form State
  const [modTitle, setModTitle] = useState("");
  const [modType, setModType] = useState("video");
  const [modUrl, setModUrl] = useState("");
  const [addingModule, setAddingModule] = useState(false);

  // New Handout/Resource Form State
  const [resTitle, setResourceTitle] = useState("");
  const [resDesc, setResourceDesc] = useState("");
  const [resLink, setResourceUrl] = useState("");
  const [resFileType, setResourceFileType] = useState("pdf");
  const [addingResource, setAddingResource] = useState(false);

  // New Zoom Session Form State
  const [zoomTitle, setZoomTitle] = useState("");
  const [zoomLink, setZoomLink] = useState("");
  const [zoomScheduledAt, setZoomScheduledAt] = useState("");
  const [zoomDuration, setZoomDuration] = useState("60");
  const [addingZoom, setAddingZoom] = useState(false);

  // Student Preview Mode Toggle
  const [studentPreview, setStudentPreview] = useState(false);

  const fetchDetails = () => {
    if (!token || !courseId) return;
    portalApi({
      data: {
        action: "getCourseDetail",
        payload: { token, courseId: parseInt(courseId) }
      }
    })
      .then((res: any) => {
        setCourseData(res);
        if (res.course) {
          setEditTitle(res.course.title || "");
          setEditDescription(res.course.description || "");
          setEditPriceDollars((res.course.price_cents / 100).toFixed(2));
          setEditSyllabusType(res.course.syllabus_type || "self_paced");
          setEditPublished(res.course.published === 1);
        }
      })
      .catch((err: any) => {
        console.error(err);
        setError("Failed to fetch course details.");
      });
  };

  useEffect(() => {
    if (!token || !user) return;
    fetchDetails();
  }, [token, user, courseId]);

  // Update Course Meta
  const handleUpdateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !courseId) return;
    setUpdatingCourse(true);
    setError("");
    setSuccess("");

    try {
      const priceCents = Math.round(parseFloat(editPriceDollars) * 100);
      await portalApi({
        data: {
          action: "updateCourse",
          payload: {
            token,
            courseId: parseInt(courseId),
            title: editTitle,
            description: editDescription,
            price_cents: priceCents,
            published: editPublished ? 1 : 0,
            syllabus_type: editSyllabusType
          }
        }
      });
      setSuccess("Course properties updated successfully!");
      fetchDetails();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to update course properties.");
    } finally {
      setUpdatingCourse(false);
    }
  };

  // Delete Course
  const handleDeleteCourse = async () => {
    const confirmed = window.confirm(
      "CRITICAL DANGER: Deleting this course will permanently erase all syllabus modules, student enrollments, worksheets, and discussion threads. This action is irreversible. Continue?"
    );
    if (!confirmed || !token) return;

    try {
      await portalApi({
        data: {
          action: "deleteCourse",
          payload: { token, courseId: parseInt(courseId) }
        }
      });
      navigate({ to: "/portal/therapist/content" });
    } catch (err: any) {
      setError(err?.message || "Failed to delete course.");
    }
  };

  // Add Syllabus Module
  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !modTitle) return;
    setAddingModule(true);
    setError("");
    setSuccess("");

    try {
      const currentModules = courseData.modules || [];
      const orderIndex = currentModules.length + 1;

      await portalApi({
        data: {
          action: "addModule",
          payload: {
            token,
            courseId: parseInt(courseId),
            title: modTitle,
            contentType: modType,
            contentUrl: modUrl,
            orderIndex
          }
        }
      });
      setSuccess(`Module "${modTitle}" added successfully to syllabus.`);
      setModTitle("");
      setModUrl("");
      fetchDetails();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to add syllabus module.");
    } finally {
      setAddingModule(false);
    }
  };

  // Delete Syllabus Module
  const handleDeleteModule = async (moduleId: number, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete module "${title}"?`);
    if (!confirmed || !token) return;

    try {
      await portalApi({
        data: {
          action: "deleteModule",
          payload: { token, moduleId }
        }
      });
      setSuccess(`Deleted module "${title}" from syllabus.`);
      fetchDetails();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to delete syllabus module.");
    }
  };

  // Reorder Modules
  const handleMoveModule = async (moduleId: number, currentIndex: number, direction: "up" | "down") => {
    if (!token) return;
    const modules = courseData.modules || [];
    const targetIndex = direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= modules.length) return;

    const currentModule = modules[currentIndex];
    const targetModule = modules[targetIndex];

    try {
      // Swap order_indexes
      await portalApi({
        data: {
          action: "updateModuleOrder",
          payload: { token, moduleId: currentModule.id, orderIndex: targetModule.order_index }
        }
      });
      await portalApi({
        data: {
          action: "updateModuleOrder",
          payload: { token, moduleId: targetModule.id, orderIndex: currentModule.order_index }
        }
      });
      fetchDetails();
    } catch (err: any) {
      console.error(err);
      setError("Failed to adjust syllabus module order.");
    }
  };

  // Add Worksheet Handout
  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !resTitle || !resLink) return;
    setAddingResource(true);
    setError("");
    setSuccess("");

    try {
      await portalApi({
        data: {
          action: "addResource",
          payload: {
            token,
            courseId: parseInt(courseId),
            title: resTitle,
            fileType: resFileType,
            fileUrl: resLink,
            description: resDesc
          }
        }
      });
      setSuccess(`Worksheet "${resTitle}" added successfully.`);
      setResourceTitle("");
      setResourceDesc("");
      setResourceUrl("");
      fetchDetails();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to add clinical handout.");
    } finally {
      setAddingResource(false);
    }
  };

  // Delete Resource
  const handleDeleteResource = async (resourceId: number, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to delete worksheets handout "${title}"?`);
    if (!confirmed || !token) return;

    try {
      await portalApi({
        data: {
          action: "deleteResource",
          payload: { token, resourceId }
        }
      });
      setSuccess(`Deleted handout "${title}".`);
      fetchDetails();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to delete clinical handout.");
    }
  };

  // Add Zoom Session
  const handleAddZoom = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !zoomTitle || !zoomLink || !zoomScheduledAt) return;
    setAddingZoom(true);
    setError("");
    setSuccess("");

    try {
      await portalApi({
        data: {
          action: "addZoomSession",
          payload: {
            token,
            courseId: parseInt(courseId),
            title: zoomTitle,
            zoomLink,
            scheduledAt: zoomScheduledAt,
            durationMin: parseInt(zoomDuration)
          }
        }
      });
      setSuccess(`Zoom session "${zoomTitle}" scheduled successfully.`);
      setZoomTitle("");
      setZoomLink("");
      setZoomScheduledAt("");
      setZoomDuration("60");
      fetchDetails();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to schedule live Zoom class.");
    } finally {
      setAddingZoom(false);
    }
  };

  // Delete Zoom Session
  const handleDeleteZoom = async (sessionId: number, title: string) => {
    const confirmed = window.confirm(`Are you sure you want to remove Zoom class "${title}"?`);
    if (!confirmed || !token) return;

    try {
      await portalApi({
        data: {
          action: "deleteZoomSession",
          payload: { token, sessionId }
        }
      });
      setSuccess(`Deleted Zoom session "${title}".`);
      fetchDetails();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to delete Zoom session.");
    }
  };

  if (!courseData) {
    return (
      <PortalLayout user={user} loading={loading} activeTab="content" handleLogout={handleLogout}>
        <div className="p-8 text-center text-gray-500 italic">Retrieving secure course data...</div>
      </PortalLayout>
    );
  }

  const { course, modules, resources, zoomSessions } = courseData;

  return (
    <PortalLayout user={user} loading={loading} activeTab="content" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans max-w-5xl mx-auto pb-12">
        {/* Header navigation back */}
        <div className="flex flex-wrap justify-between items-center gap-4">
          <div className="space-y-1">
            <Link to="/portal/therapist/content" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
              ← Back to All Courses
            </Link>
            <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">
              {studentPreview ? `Preview: ${course.title}` : `Manage: ${course.title}`}
            </h1>
            <p className="text-sm text-gray-600">
              {studentPreview 
                ? "Dogfooding mode: This is exactly what enrolled patients see inside their secure patient workspace." 
                : `Course Curriculum detail view and content manager for Course ID ${course.id}.`}
            </p>
          </div>
          <button
            onClick={() => setStudentPreview(!studentPreview)}
            className={`px-5 py-2.5 rounded-xl font-bold text-xs shadow transition-all border ${
              studentPreview 
                ? "bg-amber-50 text-amber-800 border-amber-200 hover:bg-amber-100" 
                : "bg-white text-forest border-forest/10 hover:bg-cream/10"
            }`}
          >
            {studentPreview ? "👁 Stop Student Preview" : "👁 Preview as Student"}
          </button>
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

        {/* -------------------- PREVIEW MODE (STUDENT VIEW) -------------------- */}
        {studentPreview ? (
          <div className="space-y-8 bg-cream/15 p-6 sm:p-8 rounded-3xl border border-forest/10">
            {/* Header info */}
            <div className="space-y-3 bg-white border border-forest/10 rounded-2xl p-6 shadow-sm">
              <span className="text-[10px] font-black uppercase tracking-wider bg-forest/5 text-forest px-3 py-1 rounded-full border border-forest/10">
                {course.syllabus_type === "facilitated" ? "Facilitated Group Curriculum" : "Self-Paced Course Classroom"}
              </span>
              <h2 className="text-2xl font-serif font-bold text-gray-900 leading-tight">{course.title}</h2>
              <p className="text-sm text-gray-650 leading-relaxed">{course.description}</p>
            </div>

            {/* Modules list as student */}
            <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-serif font-bold text-gray-950 flex items-center gap-2 border-b pb-2 border-gray-100">
                <span>📚</span> Lectures & Video Curriculum
              </h3>
              {modules && modules.length > 0 ? (
                <div className="space-y-3">
                  {modules.map((m: any, idx: number) => (
                    <div key={m.id} className="p-4 bg-gray-50 rounded-2xl hover:bg-cream/5 border border-transparent hover:border-forest/10 transition-all flex justify-between items-center gap-4">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" readOnly className="rounded border-forest/20 text-forest focus:ring-forest shrink-0 w-4 h-4 cursor-not-allowed" />
                        <div className="space-y-0.5">
                          <h4 className="text-sm font-semibold text-gray-900">
                            Module {idx + 1}: {m.title}
                          </h4>
                          <span className="text-[10px] bg-cream/15 text-forest px-2 py-0.5 rounded-full font-bold uppercase tracking-wider font-sans border border-forest/5">
                            {m.content_type}
                          </span>
                        </div>
                      </div>
                      {m.content_url && (
                        <a
                          href={m.content_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-3 py-1.5 bg-forest hover:bg-forest-dark text-white rounded-lg text-xs font-bold transition-all shadow-sm shrink-0"
                        >
                          {m.content_type === "video" ? "Play Video 🎥" : "View Link 🔗"}
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No classroom syllabus modules uploaded yet.</p>
              )}
            </div>

            {/* Resources list as student */}
            <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-serif font-bold text-gray-950 flex items-center gap-2 border-b pb-2 border-gray-100">
                <span>📄</span> Handouts & Homework Worksheets
              </h3>
              {resources && resources.length > 0 ? (
                <div className="space-y-3">
                  {resources.map((r: any) => {
                    const isDoc = r.file_type?.toLowerCase().includes("doc");
                    const icon = isDoc ? "💙" : r.file_type?.toLowerCase().includes("pdf") ? "🔴" : "📄";
                    return (
                      <div key={r.id} className="p-4 bg-gray-50 rounded-2xl hover:bg-cream/5 border border-transparent hover:border-forest/10 transition-all flex justify-between items-center gap-4">
                        <div className="space-y-1">
                          <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                            <span>{icon}</span> {r.title}
                          </h4>
                          <p className="text-xs text-gray-550 leading-relaxed max-w-xl">{r.description}</p>
                        </div>
                        <a
                          href={r.file_url}
                          download
                          className="px-3.5 py-2 bg-white hover:bg-gray-100 text-forest rounded-xl text-xs font-black transition-all border border-forest/10 shadow-sm shrink-0 flex items-center gap-1"
                        >
                          Download {r.file_type?.toUpperCase()} ⬇
                        </a>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <p className="text-sm text-gray-500 italic">No clinical worksheets assigned yet.</p>
              )}
            </div>

            {/* Zoom sessions as student */}
            <div className="bg-white border border-forest/10 rounded-2xl p-6 shadow-sm space-y-4">
              <h3 className="text-lg font-serif font-bold text-gray-950 flex items-center gap-2 border-b pb-2 border-gray-100">
                <span>🎥</span> Live Zoom Integration Class Schedule
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
                <p className="text-sm text-gray-500 italic">No live support classes scheduled yet.</p>
              )}
            </div>
          </div>
        ) : (
          // -------------------- THERAPIST CONTENT MANAGER (EDIT VIEW) --------------------
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Syllabus Modules, Worksheets, Zooms list */}
            <div className="lg:col-span-8 space-y-8">
              {/* Syllabus list with Reordering */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
                <h2 className="text-2xl font-serif font-bold text-gray-900 border-b border-gray-150 pb-2">Course Lecture Syllabus ({modules?.length || 0})</h2>
                {modules && modules.length > 0 ? (
                  <div className="space-y-3 font-sans">
                    {modules.map((m: any, idx: number) => (
                      <div key={m.id} className="p-3.5 bg-cream/15 border border-forest/5 rounded-2xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-3">
                          <div className="flex flex-col gap-1 shrink-0">
                            <button
                              onClick={() => handleMoveModule(m.id, idx, "up")}
                              disabled={idx === 0}
                              className="text-xs text-gray-400 hover:text-forest disabled:opacity-30 transition-colors"
                              title="Move Up"
                            >
                              ▲
                            </button>
                            <button
                              onClick={() => handleMoveModule(m.id, idx, "down")}
                              disabled={idx === modules.length - 1}
                              className="text-xs text-gray-400 hover:text-forest disabled:opacity-30 transition-colors"
                              title="Move Down"
                            >
                              ▼
                            </button>
                          </div>
                          <div className="space-y-0.5">
                            <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans">Module {idx + 1} ({m.content_type})</span>
                            <h4 className="text-sm font-bold text-gray-800 leading-snug">{m.title}</h4>
                            <p className="text-[10px] text-gray-500 font-mono line-clamp-1">{m.content_url || "No link uploaded"}</p>
                          </div>
                        </div>
                        <button
                          onClick={() => handleDeleteModule(m.id, m.title)}
                          className="px-2.5 py-1 text-[10px] bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-bold border border-red-150 uppercase tracking-wider"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic py-6 text-center border border-dashed border-gray-150 rounded-2xl">
                    No classroom syllabus modules uploaded yet. Let's add the first module using the sidebar form!
                  </p>
                )}
              </div>

              {/* Handouts Worksheets list with Word/Video download support */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
                <h2 className="text-2xl font-serif font-bold text-gray-900 border-b border-gray-150 pb-2">Worksheets & Handouts ({resources?.length || 0})</h2>
                {resources && resources.length > 0 ? (
                  <div className="space-y-3 font-sans">
                    {resources.map((r: any) => {
                      const isWord = r.file_type?.toLowerCase().includes("doc");
                      const icon = isWord ? "💙" : r.file_type?.toLowerCase().includes("pdf") ? "🔴" : "📄";
                      return (
                        <div key={r.id} className="p-3.5 bg-cream/15 border border-forest/5 rounded-2xl flex items-center justify-between gap-4">
                          <div className="space-y-1">
                            <h4 className="text-sm font-bold text-gray-900 flex items-center gap-1.5">
                              <span>{icon}</span> {r.title}
                            </h4>
                            <p className="text-[11px] text-gray-500 leading-normal line-clamp-2 max-w-xl">{r.description}</p>
                            <span className="text-[9px] bg-white border px-1.5 py-0.5 text-forest font-bold rounded-full font-mono uppercase">
                              {r.file_type} File URL: {r.file_url}
                            </span>
                          </div>
                          <button
                            onClick={() => handleDeleteResource(r.id, r.title)}
                            className="px-2.5 py-1 text-[10px] bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-bold border border-red-150 uppercase tracking-wider shrink-0"
                          >
                            Delete
                          </button>
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic py-6 text-center border border-dashed border-gray-150 rounded-2xl">
                    No clinical handouts or spreadsheets uploaded yet. Use the sidebar form to publish resources.
                  </p>
                )}
              </div>

              {/* Live Zoom sessions management */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
                <h2 className="text-2xl font-serif font-bold text-gray-900 border-b border-gray-150 pb-2">Zoom Support Classes ({zoomSessions?.length || 0})</h2>
                {zoomSessions && zoomSessions.length > 0 ? (
                  <div className="space-y-3 font-sans">
                    {zoomSessions.map((z: any) => (
                      <div key={z.id} className="p-4 bg-cream/15 border border-forest/5 rounded-2xl flex items-start justify-between gap-4 flex-col sm:flex-row">
                        <div className="space-y-1 flex-grow">
                          <h4 className="text-sm font-bold text-gray-900">{z.title}</h4>
                          <div className="flex flex-wrap gap-x-3 gap-y-1 text-xs text-gray-500">
                            <span>📅 scheduled: {new Date(z.scheduled_at).toLocaleString()}</span>
                            <span>⏳ duration: {z.duration_min} mins</span>
                          </div>
                          <p className="text-[10px] text-forest font-mono truncate max-w-md">{z.zoom_link}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteZoom(z.id, z.title)}
                          className="px-2.5 py-1 text-[10px] bg-red-50 text-red-700 hover:bg-red-100 rounded-lg font-bold border border-red-150 uppercase tracking-wider shrink-0 self-end sm:self-start"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 italic py-6 text-center border border-dashed border-gray-150 rounded-2xl">
                    No cohort Zoom sessions scheduled yet. Use the sidebar form to schedule interactive therapy sessions.
                  </p>
                )}
              </div>
            </div>

            {/* Right Col: Edit course meta properties, forms to Add Module, Handout, Zoom */}
            <div className="lg:col-span-4 space-y-8">
              {/* Edit Course Meta properties */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
                <h3 className="font-serif text-lg font-bold text-gray-950 border-b border-gray-100 pb-2">Edit Course Properties</h3>
                <form onSubmit={handleUpdateCourse} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Course Title</label>
                    <input
                      type="text"
                      required
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest font-semibold text-gray-800"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Price (USD)</label>
                    <input
                      type="number"
                      step="0.01"
                      required
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest font-semibold text-gray-800"
                      value={editPriceDollars}
                      onChange={(e) => setEditPriceDollars(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Course Type</label>
                    <select
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest font-semibold text-gray-800"
                      value={editSyllabusType}
                      onChange={(e) => setEditSyllabusType(e.target.value)}
                    >
                      <option value="self_paced">Self-Paced Course</option>
                      <option value="facilitated">Facilitated Group</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Description</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest text-gray-700"
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                    />
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="edit-published"
                      className="rounded border-forest/20 text-forest focus:ring-forest w-4 h-4"
                      checked={editPublished}
                      onChange={(e) => setEditPublished(e.target.checked)}
                    />
                    <label htmlFor="edit-published" className="text-xs font-bold text-gray-700 select-none">Published (Make Active)</label>
                  </div>
                  <div className="flex gap-2.5 pt-2">
                    <button
                      type="button"
                      onClick={handleDeleteCourse}
                      className="flex-grow rounded-xl bg-red-50 hover:bg-red-100 text-red-700 border border-red-150 py-2.5 text-xs font-bold transition-all shadow-sm"
                    >
                      Delete Course
                    </button>
                    <button
                      type="submit"
                      disabled={updatingCourse}
                      className="flex-grow rounded-xl bg-forest py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-all disabled:opacity-50 shadow-sm"
                    >
                      {updatingCourse ? "Saving..." : "Save Properties"}
                    </button>
                  </div>
                </form>
              </div>

              {/* Add Module Form */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
                <h3 className="font-serif text-lg font-bold text-gray-950 border-b border-gray-100 pb-2">Add Lecture Module</h3>
                <form onSubmit={handleAddModule} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Lecture Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Module 6: Managing intrusive thoughts"
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                      value={modTitle}
                      onChange={(e) => setModTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Content Media Type</label>
                    <select
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest font-semibold text-gray-700"
                      value={modType}
                      onChange={(e) => setModType(e.target.value)}
                    >
                      <option value="video">🎥 Video Recording</option>
                      <option value="pdf">📄 Printable Handout</option>
                      <option value="text">📖 Clinical Article</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Media Link / URL</label>
                    <input
                      type="text"
                      placeholder="e.g. https://www.w3schools.com/html/movie.mp4"
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                      value={modUrl}
                      onChange={(e) => setModUrl(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={addingModule}
                    className="w-full rounded-xl bg-forest py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-all disabled:opacity-50 shadow"
                  >
                    {addingModule ? "Publishing module..." : "Publish Lecture Module"}
                  </button>
                </form>
              </div>

              {/* Add Handout Form */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
                <h3 className="font-serif text-lg font-bold text-gray-950 border-b border-gray-100 pb-2">Add Handout Worksheet</h3>
                <form onSubmit={handleAddResource} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Handout Name</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. ERP Log Sheet week 2"
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                      value={resTitle}
                      onChange={(e) => setResourceTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">File Format Type</label>
                    <select
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest font-semibold text-gray-700"
                      value={resFileType}
                      onChange={(e) => setResourceFileType(e.target.value)}
                    >
                      <option value="pdf">Adobe PDF Handout (🔴)</option>
                      <option value="doc">Microsoft Word Document (💙)</option>
                      <option value="xlsx">Microsoft Excel Spreadsheet (📄)</option>
                      <option value="video">Instructional Mp4 Video (🎥)</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Secure Link / URL</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. /downloads/worksheets/erp_log_sheet.docx"
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest font-mono"
                      value={resLink}
                      onChange={(e) => setResourceUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Client Instructions</label>
                    <textarea
                      rows={2}
                      placeholder="e.g. Log your SUDS scores immediately following exposures..."
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest text-gray-700"
                      value={resDesc}
                      onChange={(e) => setResourceDesc(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={addingResource}
                    className="w-full rounded-xl bg-forest py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-all disabled:opacity-50 shadow"
                  >
                    {addingResource ? "Publishing resource..." : "Add Client Handout"}
                  </button>
                </form>
              </div>

              {/* Add Zoom Schedule Session Form */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
                <h3 className="font-serif text-lg font-bold text-gray-950 border-b border-gray-100 pb-2">Schedule Group Therapy Session</h3>
                <form onSubmit={handleAddZoom} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Class Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Weekly Group ERP Integration check-in"
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                      value={zoomTitle}
                      onChange={(e) => setZoomTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Secure Zoom Join Link</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. https://zoom.us/j/123456789"
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest font-mono"
                      value={zoomLink}
                      onChange={(e) => setZoomLink(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Class DateTime (ISO/Local)</label>
                    <input
                      type="datetime-local"
                      required
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest font-semibold"
                      value={zoomScheduledAt}
                      onChange={(e) => setZoomScheduledAt(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Class Duration (minutes)</label>
                    <input
                      type="number"
                      required
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                      value={zoomDuration}
                      onChange={(e) => setZoomDuration(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={addingZoom}
                    className="w-full rounded-xl bg-forest py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-all disabled:opacity-50 shadow"
                  >
                    {addingZoom ? "Scheduling class..." : "Schedule Zoom Session"}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
