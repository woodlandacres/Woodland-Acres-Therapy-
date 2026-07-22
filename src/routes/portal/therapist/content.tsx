import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { portalApi } from "../../../portalServer";

export const Route = createFileRoute("/portal/therapist/content")({
  component: TherapistContent,
});

function TherapistContent() {
  const { user, token, loading, handleLogout } = usePortalSession("therapist");
  const [courses, setCourses] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Create Course Form State
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newPriceDollars, setNewPriceDollars] = useState("149.00");
  const [newSyllabusType, setNewSyllabusType] = useState("self_paced");
  const [creatingCourse, setCreatingCourse] = useState(false);

  const fetchCourses = () => {
    if (!token) return;
    portalApi({ data: { action: "getTherapistCourses", payload: { token } } })
      .then((res: any) => {
        setCourses(res || []);
      })
      .catch((err: any) => {
        console.error(err);
        setError("Failed to fetch published courses.");
      });
  };

  useEffect(() => {
    if (!token || !user) return;
    fetchCourses();
  }, [token, user]);

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newTitle || !newDescription) return;
    setCreatingCourse(true);
    setError("");
    setSuccess("");

    const priceCents = Math.round(parseFloat(newPriceDollars) * 100);

    try {
      // First, create the course
      const res: any = await portalApi({
        data: {
          action: "createCourse",
          payload: {
            token,
            title: newTitle,
            description: newDescription,
            price_cents: priceCents
          }
        }
      });

      // Now, update its syllabus_type
      await portalApi({
        data: {
          action: "updateCourse",
          payload: {
            token,
            courseId: res.courseId,
            title: newTitle,
            description: newDescription,
            price_cents: priceCents,
            published: 1,
            syllabus_type: newSyllabusType
          }
        }
      });

      setSuccess(`Course "${newTitle}" created and activated successfully!`);
      setNewTitle("");
      setNewDescription("");
      setNewPriceDollars("149.00");
      setNewSyllabusType("self_paced");
      setShowCreateForm(false);
      fetchCourses();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to create course.");
    } finally {
      setCreatingCourse(false);
    }
  };

  return (
    <PortalLayout user={user} loading={loading} activeTab="content" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans max-w-5xl mx-auto pb-12">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-forest/10 pb-5">
          <div className="space-y-1">
            <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Practice Courses & Curriculum</h1>
            <p className="text-sm text-gray-650">Create courses, manage modules, configure Zoom sessions, and upload resources for your patients.</p>
          </div>
          <button
            onClick={() => setShowCreateForm(!showCreateForm)}
            className="self-start md:self-center px-5 py-3 bg-forest hover:bg-forest-dark text-white rounded-xl font-bold text-sm shadow-md transition-all flex items-center gap-2"
          >
            {showCreateForm ? "Cancel New Course" : "＋ Create Practice Course"}
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

        {/* Create Course Form */}
        {showCreateForm && (
          <div className="bg-white border border-forest/20 rounded-3xl p-6 sm:p-8 shadow-lg space-y-4">
            <h3 className="text-xl font-serif font-bold text-gray-950">Draft New Course</h3>
            <form onSubmit={handleCreateCourse} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="md:col-span-2 space-y-1">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Course Title</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g., OCD & ERP Mastery: 8-Week Core Cohort"
                    className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Course Type</label>
                  <select
                    className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest font-semibold text-gray-800"
                    value={newSyllabusType}
                    onChange={(e) => setNewSyllabusType(e.target.value)}
                  >
                    <option value="self_paced">Self-Paced Educational Course</option>
                    <option value="facilitated">Facilitated Program (Weekly Zoom)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="md:col-span-3 space-y-1">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Description</label>
                  <input
                    type="text"
                    required
                    placeholder="Short summary of target clinical competencies..."
                    className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-gray-600 uppercase">Price (USD)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                    value={newPriceDollars}
                    onChange={(e) => setNewPriceDollars(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                  className="px-5 py-2.5 rounded-xl border border-gray-300 hover:bg-gray-50 text-sm font-semibold text-gray-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={creatingCourse}
                  className="px-6 py-2.5 bg-forest hover:bg-forest-dark text-white rounded-xl font-bold text-sm transition-all disabled:opacity-50 shadow-sm"
                >
                  {creatingCourse ? "Creating..." : "Launch Course"}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Courses Listing Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.length > 0 ? (
            courses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-forest/10 rounded-3xl p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span
                      className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                        course.syllabus_type === "facilitated"
                          ? "bg-amber-50 text-amber-800 border border-amber-100"
                          : "bg-forest/5 text-forest border border-forest/10"
                      }`}
                    >
                      {course.syllabus_type === "facilitated" ? "Facilitated Group" : "Self-Paced Course"}
                    </span>
                    <span className="text-sm font-extrabold text-forest font-mono">
                      ${(course.price_cents / 100).toFixed(2)}
                    </span>
                  </div>

                  <h3 className="text-xl font-serif font-bold text-gray-950 leading-snug">
                    {course.title}
                  </h3>
                  <p className="text-sm text-gray-650 leading-relaxed line-clamp-3">
                    {course.description}
                  </p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 flex justify-between items-center">
                  <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">
                    Course ID: {course.id}
                  </span>
                  <Link
                    to={`/portal/therapist/course/${course.id}`}
                    className="px-4 py-2 bg-forest/5 text-forest hover:bg-forest hover:text-white rounded-xl text-xs font-bold transition-all border border-forest/10 shadow-sm"
                  >
                    Manage Syllabus & Sessions →
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-2 p-12 bg-cream/10 border border-dashed border-forest/15 rounded-3xl text-center">
              <p className="text-sm text-gray-500 italic">No courses created yet. Click "Create Practice Course" above to begin.</p>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
