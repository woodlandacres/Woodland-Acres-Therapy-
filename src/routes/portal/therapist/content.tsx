import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { portalApi } from "../../../portalServer";

export const Route = createFileRoute("/portal/therapist/content")({
  component: TherapistContent,
});

function TherapistContent() {
  const { user, token, loading, handleLogout } = usePortalSession("therapist");
  const [dashboardData, setDashboardData] = useState<any>(null);
  const [selectedCourseId, setSelectedCourseId] = useState<number | null>(null);
  const [courseDetails, setCourseData] = useState<any>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Add Module Form State
  const [moduleTitle, setModuleTitle] = useState("");
  const [moduleType, setModuleType] = useState("video");
  const [moduleUrl, setModuleUrl] = useState("");
  const [addingModule, setAddingModule] = useState(false);

  // Add Resource Form State
  const [resourceTitle, setResourceTitle] = useState("");
  const [resourceType, setResourceType] = useState("PDF");
  const [resourceUrl, setResourceUrl] = useState("");
  const [resourceDesc, setResourceDesc] = useState("");
  const [addingResource, setAddingResource] = useState(false);

  useEffect(() => {
    if (!token || !user) return;
    fetchDashboard();
  }, [token, user]);

  useEffect(() => {
    if (!token || selectedCourseId === null) return;
    fetchCourseDetails();
  }, [token, selectedCourseId]);

  const api = (action: string, payload: any) => portalApi({ data: { action, payload } });

  const fetchDashboard = () => {
    if (!token) return;
    api("getTherapistDashboard", { token })
      .then((res: any) => {
        setDashboardData(res);
        if (res.courses && res.courses.length > 0 && selectedCourseId === null) {
          setSelectedCourseId(res.courses[0].id);
        }
      })
      .catch((err: any) => {
        console.error(err);
        setError("Failed to fetch curriculum details.");
      });
  };

  const fetchCourseDetails = () => {
    if (!token || selectedCourseId === null) return;
    api("getCourseDetail", { token, courseId: selectedCourseId })
      .then((res: any) => {
        setCourseData(res);
      })
      .catch((err: any) => {
        console.error(err);
        setError("Failed to load details for selected course.");
      });
  };

  const handleAddModule = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || selectedCourseId === null || !moduleTitle) return;
    setAddingModule(true);
    setError("");
    setSuccess("");

    try {
      await api("addModule", {
        token,
        courseId: selectedCourseId,
        title: moduleTitle,
        contentType: moduleType,
        contentUrl: moduleUrl,
        orderIndex: 0,
      });
      setSuccess(`Module "${moduleTitle}" added successfully.`);
      setModuleTitle("");
      setModuleUrl("");
      fetchCourseDetails();
    } catch (err: any) {
      setError(err?.message || "Failed to add module.");
    } finally {
      setAddingModule(false);
    }
  };

  const handleDeleteModule = async (moduleId: number) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this lecture module?")) return;
    setError("");
    setSuccess("");

    try {
      await api("deleteModule", { token, moduleId });
      setSuccess("Module deleted successfully.");
      fetchCourseDetails();
    } catch (err: any) {
      setError(err?.message || "Failed to delete module.");
    }
  };

  const handleAddResource = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || selectedCourseId === null || !resourceTitle || !resourceUrl) return;
    setAddingResource(true);
    setError("");
    setSuccess("");

    try {
      await api("addResource", {
        token,
        courseId: selectedCourseId,
        title: resourceTitle,
        fileType: resourceType,
        fileUrl: resourceUrl,
        description: resourceDesc,
      });
      setSuccess(`Resource "${resourceTitle}" uploaded successfully.`);
      setResourceTitle("");
      setResourceUrl("");
      setResourceDesc("");
      fetchCourseDetails();
    } catch (err: any) {
      setError(err?.message || "Failed to upload resource.");
    } finally {
      setAddingResource(false);
    }
  };

  const handleDeleteResource = async (resourceId: number) => {
    if (!token) return;
    if (!confirm("Are you sure you want to delete this clinical worksheet?")) return;
    setError("");
    setSuccess("");

    try {
      await api("deleteResource", { token, resourceId });
      setSuccess("Worksheet deleted successfully.");
      fetchCourseDetails();
    } catch (err: any) {
      setError(err?.message || "Failed to delete resource.");
    }
  };

  const handleDeleteCourse = async (courseId: number) => {
    if (!token) return;
    if (!confirm("CRITICAL: Deleting this course will permanently erase all modules, enrolled student progress, and resources. Continue?")) return;
    setError("");
    setSuccess("");

    try {
      await api("deleteCourse", { token, courseId });
      setSuccess("Course deleted successfully.");
      setSelectedCourseId(null);
      setCourseData(null);
      fetchDashboard();
    } catch (err: any) {
      setError(err?.message || "Failed to delete course.");
    }
  };

  return (
    <PortalLayout user={user} loading={loading} activeTab="content" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans">
        {/* Header */}
        <div className="space-y-1">
          <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Curriculum Content Management</h1>
          <p className="text-sm text-gray-650">Add lectures, upload homework PDFs, schedule live Zoom syncs, or modify published practice courses.</p>
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
        {dashboardData && dashboardData.courses && dashboardData.courses.length > 0 && (
          <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm max-w-xl flex gap-4 items-end">
            <div className="flex-grow space-y-2">
              <label htmlFor="course-select" className="block text-xs font-bold text-gray-600 uppercase">
                Active Course Context
              </label>
              <select
                id="course-select"
                className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest font-semibold text-gray-800"
                value={selectedCourseId || ""}
                onChange={(e) => setSelectedCourseId(parseInt(e.target.value))}
              >
                {dashboardData.courses.map((c: any) => (
                  <option key={c.id} value={c.id}>
                    {c.title} ({c.student_count} Enrolled)
                  </option>
                ))}
              </select>
            </div>
            {selectedCourseId !== null && (
              <button
                onClick={() => handleDeleteCourse(selectedCourseId)}
                className="rounded-xl border border-red-200 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-bold px-4 py-3.5 transition-all shadow-sm"
              >
                Delete Course
              </button>
            )}
          </div>
        )}

        {selectedCourseId !== null && courseDetails && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Col: Existing Content Lists */}
            <div className="lg:col-span-8 space-y-8">
              {/* Modules list */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
                <h3 className="text-lg font-serif font-bold text-gray-900 border-b border-gray-150 pb-2">Course Lecture Syllabus ({courseDetails.modules?.length || 0})</h3>
                {courseDetails.modules && courseDetails.modules.length > 0 ? (
                  <div className="space-y-2.5">
                    {courseDetails.modules.map((m: any) => (
                      <div key={m.id} className="p-3 bg-cream/15 border border-forest/5 rounded-xl flex items-center justify-between gap-4">
                        <div className="flex items-center gap-2 text-xs font-semibold text-gray-800">
                          <span className="text-sm">{m.content_type === "video" ? "🎥" : m.content_type === "pdf" ? "📄" : "📖"}</span>
                          <span>{m.title}</span>
                        </div>
                        <button
                          onClick={() => handleDeleteModule(m.id)}
                          className="text-[10px] text-red-600 font-bold uppercase tracking-wider hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">No modules added to this course syllabus yet.</p>
                )}
              </div>

              {/* Resources list */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
                <h3 className="text-lg font-serif font-bold text-gray-900 border-b border-gray-150 pb-2">Assigned Worksheets & Logs ({courseDetails.resources?.length || 0})</h3>
                {courseDetails.resources && courseDetails.resources.length > 0 ? (
                  <div className="space-y-2.5">
                    {courseDetails.resources.map((r: any) => (
                      <div key={r.id} className="p-3.5 bg-cream/15 border border-forest/5 rounded-xl flex items-center justify-between gap-4">
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-gray-900">{r.title}</h4>
                          <p className="text-[10px] text-gray-500 leading-normal line-clamp-1">{r.description}</p>
                        </div>
                        <button
                          onClick={() => handleDeleteResource(r.id)}
                          className="text-[10px] text-red-600 font-bold uppercase tracking-wider hover:underline shrink-0"
                        >
                          Delete
                        </button>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 italic">No worksheets or PDF resources added yet.</p>
                )}
              </div>
            </div>

            {/* Right Col: Forms to Add Content */}
            <div className="lg:col-span-4 space-y-8">
              {/* Add Module Form */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
                <h3 className="font-serif text-md font-bold text-gray-900 border-b border-gray-100 pb-2">Add Syllabus Module</h3>
                <form onSubmit={handleAddModule} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Lecture Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Module 3: Constructing Your Hierarchies"
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                      value={moduleTitle}
                      onChange={(e) => setModuleTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Media Content Type</label>
                    <select
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                      value={moduleType}
                      onChange={(e) => setModuleType(e.target.value)}
                    >
                      <option value="video">Video Lecture (MP4/Stream)</option>
                      <option value="pdf">Printable PDF Guide</option>
                      <option value="text">Standard Reading Article</option>
                    </select>
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Media URL / Download Link</label>
                    <input
                      type="text"
                      placeholder="e.g. https://www.w3schools.com/html/movie.mp4"
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                      value={moduleUrl}
                      onChange={(e) => setModuleUrl(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={addingModule}
                    className="w-full rounded-xl bg-forest py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-all disabled:opacity-50"
                  >
                    {addingModule ? "Adding..." : "Add Lecture"}
                  </button>
                </form>
              </div>

              {/* Add Resource Form */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
                <h3 className="font-serif text-md font-bold text-gray-900 border-b border-gray-100 pb-2">Add Handout Worksheet</h3>
                <form onSubmit={handleAddResource} className="space-y-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Worksheet Title</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Blank Exposure Hierarchy Template"
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                      value={resourceTitle}
                      onChange={(e) => setResourceTitle(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">File Link (URL)</label>
                    <input
                      type="text"
                      required
                      placeholder="/downloads/worksheets/erp_hierarchy_blank.pdf"
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                      value={resourceUrl}
                      onChange={(e) => setResourceUrl(e.target.value)}
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-bold text-gray-650 uppercase">Description / Instruction</label>
                    <textarea
                      rows={2}
                      placeholder="Instruct the client on how or when to log SUD scores..."
                      className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                      value={resourceDesc}
                      onChange={(e) => setResourceDesc(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={addingResource}
                    className="w-full rounded-xl bg-forest py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-all disabled:opacity-50"
                  >
                    {addingResource ? "Uploading..." : "Upload Clinical Handout"}
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