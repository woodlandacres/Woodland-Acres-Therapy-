import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "./auth-helper";
import { portalApi } from "../../portalServer";

export const Route = createFileRoute("/portal/dashboard")({
  component: PortalDashboardRoute,
});

function PortalDashboardRoute() {
  const { user, token, loading, handleLogout } = usePortalSession();
  const [patientData, setPatientData] = useState<any>(null);
  const [therapistData, setTherapistData] = useState<any>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Therapist course creation state
  const [newCourseTitle, setNewCourseTitle] = useState("");
  const [newCourseDesc, setNewCourseDesc] = useState("");
  const [newCoursePrice, setNewCoursePrice] = useState("149.00");
  const [creating, setCreating] = useState(false);

  useEffect(() => {
    if (!token || !user) return;

    if (user.role === "patient") {
      portalApi({ data: { action: "getPatientDashboard", payload: { token } } })
        .then((res) => {
          setPatientData(res);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load patient dashboard data.");
        });
    } else if (user.role === "therapist") {
      fetchTherapistData();
    }
  }, [user, token]);

  const fetchTherapistData = () => {
    if (!token) return;
    portalApi({ data: { action: "getTherapistDashboard", payload: { token } } })
      .then((res) => {
        setTherapistData(res);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load therapist dashboard data.");
      });
  };

  const handleCreateCourse = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !newCourseTitle || !newCourseDesc) return;
    setCreating(true);
    setError("");
    setSuccess("");

    try {
      const priceCents = Math.round(parseFloat(newCoursePrice) * 100) || 0;
      await createCourse({
        data: {
          token,
          title: newCourseTitle,
          description: newCourseDesc,
          priceCents,
        },
      });
      setSuccess(`Course "${newCourseTitle}" created successfully!`);
      setNewCourseTitle("");
      setNewCourseDesc("");
      fetchTherapistData();
    } catch (err: any) {
      setError(err?.message || "Failed to create course.");
    } finally {
      setCreating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E8] font-sans">
        <div className="text-center space-y-4 font-sans">
          <div className="h-12 w-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-gray-600">Establishing Secure HIPAA Connection...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <PortalLayout user={user} loading={loading} activeTab="dashboard" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans">
        {/* Alerts / Success */}
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

        {/* HIPAA notice */}
        <div className="bg-forest/5 border border-forest/15 rounded-2xl p-4 flex gap-3 text-xs text-forest font-medium leading-relaxed">
          <span className="text-lg">🛡️</span>
          <p>
            <strong>HIPAA-Secure Clinical Workstation:</strong> This session is protected under federal HIPAA standards. 
            All client notes, session logs, and course modules are secure. For clinical emergencies, please call or text 
            <strong> 988</strong> immediately or seek the nearest emergency medical facility.
          </p>
        </div>

        {/* Patient View */}
        {user.role === "patient" && patientData && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Left Content Area (Courses and Resources) */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Enrolled Courses */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 sm:p-8 shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">My Active Courses</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Learn essential skills between clinical sessions.</p>
                  </div>
                  <Link
                    to="/portal/student/courses"
                    className="text-xs font-bold text-forest hover:underline uppercase tracking-wider"
                  >
                    View All →
                  </Link>
                </div>

                {patientData.courses && patientData.courses.length > 0 ? (
                  <div className="space-y-6">
                    {patientData.courses.map((course: any) => (
                      <div key={course.id} className="p-5 bg-cream/25 rounded-2xl border border-forest/5 space-y-4">
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h3 className="font-serif text-lg font-bold text-gray-900">{course.title}</h3>
                            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{course.description}</p>
                          </div>
                          <Link
                            to={`/portal/student/course/${course.id}`}
                            className="shrink-0 rounded-xl bg-forest px-4 py-2 text-xs font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
                          >
                            Open Classroom
                          </Link>
                        </div>

                        {/* Progress */}
                        <div className="space-y-1.5">
                          <div className="flex justify-between text-xs font-semibold text-gray-650">
                            <span>Syllabus Progress:</span>
                            <span>{Math.round(course.progress_pct)}% Complete</span>
                          </div>
                          <div className="w-full bg-gray-150 h-2 rounded-full overflow-hidden">
                            <div 
                              className="bg-forest h-full rounded-full transition-all duration-500" 
                              style={{ width: `${course.progress_pct}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-10 bg-cream/15 rounded-2xl border border-dashed border-forest/20 space-y-3">
                    <p className="text-sm text-gray-500">You are not currently enrolled in any skill courses.</p>
                    <Link
                      to="/portal/student/courses"
                      className="inline-flex rounded-xl bg-forest px-4 py-2 text-xs font-semibold text-white hover:bg-forest-dark transition-colors"
                    >
                      Browse Practice Courses
                    </Link>
                  </div>
                )}
              </div>

              {/* Handouts & PDFs */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 sm:p-8 shadow-md">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h2 className="text-2xl font-serif font-bold text-gray-900">Handouts & Exercises</h2>
                    <p className="text-xs text-gray-500 mt-0.5">Worksheets and checklists assigned for home practice.</p>
                  </div>
                  <Link
                    to="/portal/student/resources"
                    className="text-xs font-bold text-forest hover:underline uppercase tracking-wider"
                  >
                    All Handouts →
                  </Link>
                </div>

                {patientData.resources && patientData.resources.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {patientData.resources.slice(0, 4).map((res: any) => (
                      <div key={res.id} className="p-4 bg-cream/15 border border-forest/5 rounded-xl flex items-start gap-3 hover:border-forest/15 transition-all">
                        <div className="p-2 rounded-lg bg-forest/10 text-forest text-xs font-bold uppercase shrink-0">
                          {res.file_type || "PDF"}
                        </div>
                        <div className="space-y-1">
                          <h4 className="text-xs font-bold text-gray-900 line-clamp-1">{res.title}</h4>
                          <p className="text-[10px] text-gray-500 line-clamp-1">{res.description}</p>
                          <a 
                            href={res.file_url} 
                            target="_blank"
                            rel="noreferrer"
                            className="inline-block text-[10px] font-bold text-forest hover:underline uppercase tracking-wide mt-1"
                          >
                            Download Document ↓
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500 py-4 text-center">No documents currently available.</p>
                )}
              </div>
            </div>

            {/* Right Sidebar Area (Live Classroom & Message logs) */}
            <div className="lg:col-span-4 space-y-8">
              {/* Zoom Live session */}
              <div className="bg-cream border border-forest/15 rounded-3xl p-6 shadow-md space-y-4">
                <span className="text-[10px] font-bold text-brown-warm uppercase tracking-widest block">Live Group Classroom</span>
                {patientData.zoomSessions && patientData.zoomSessions.length > 0 ? (
                  <div className="space-y-3">
                    <div className="space-y-1">
                      <h3 className="font-serif text-lg font-bold text-gray-900">{patientData.zoomSessions[0].title}</h3>
                      <p className="text-xs text-forest font-bold">
                        Scheduled: {new Date(patientData.zoomSessions[0].scheduled_at).toLocaleDateString()} at{" "}
                        {new Date(patientData.zoomSessions[0].scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-[11px] text-gray-500">Duration: {patientData.zoomSessions[0].duration_min} mins</p>
                    </div>
                    <a
                      href={patientData.zoomSessions[0].zoom_link}
                      target="_blank"
                      rel="noreferrer"
                      className="block text-center w-full rounded-xl bg-forest py-3 text-xs font-bold text-white hover:bg-forest-dark transition-all shadow-sm"
                    >
                      Join HIPAA Zoom Room
                    </a>
                  </div>
                ) : (
                  <p className="text-xs text-gray-650">No support group sessions scheduled this week.</p>
                )}
              </div>

              {/* Forum Shortcut */}
              <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-3">
                <h3 className="font-serif text-base font-bold text-gray-900">Peer Community Board</h3>
                <p className="text-xs text-gray-500 leading-relaxed">
                  Join discussions with other participants currently engaged in ERP practice and neurodivergent skill-building. Share tips, struggles, and values-based victories.
                </p>
                <Link
                  to="/portal/student/community"
                  className="block text-center w-full rounded-xl border border-forest/20 py-2.5 text-xs font-bold text-forest bg-white hover:bg-forest/5 transition-all"
                >
                  Enter Peer Forums
                </Link>
              </div>
            </div>
          </div>
        )}

        {/* Therapist View */}
        {user.role === "therapist" && therapistData && (
          <div className="space-y-8">
            {/* Upper stats widgets */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase font-sans">Active Student Count</span>
                <span className="block text-3xl font-serif font-bold text-forest mt-1">
                  {Array.from(new Set(therapistData.students.map((s: any) => s.student_id))).length}
                </span>
              </div>
              <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase font-sans">Curriculum Courses</span>
                <span className="block text-3xl font-serif font-bold text-forest mt-1">
                  {therapistData.courses.length}
                </span>
              </div>
              <div className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
                <span className="text-xs font-bold text-gray-500 uppercase font-sans">Support Group Integration</span>
                <span className="block text-3xl font-serif font-bold text-forest mt-1">Active</span>
              </div>
            </div>

            {/* Split Screen Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              {/* Left Column: Student Roster table */}
              <div className="lg:col-span-8 bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-6">
                <div>
                  <h2 className="text-2xl font-serif font-bold text-gray-900">Active Patient Roster</h2>
                  <p className="text-xs text-gray-500 mt-0.5">Track individual patient syllabus progression in real-time.</p>
                </div>

                <div className="overflow-x-auto">
                  <table className="min-w-full divide-y divide-gray-150 text-sm">
                    <thead>
                      <tr className="text-left font-bold text-gray-600 text-xs font-sans uppercase">
                        <th className="py-3 px-4">Patient Name</th>
                        <th className="py-3 px-4">Email</th>
                        <th className="py-3 px-4">Enrolled Course</th>
                        <th className="py-3 px-4 text-right">Progress</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                      {therapistData.students && therapistData.students.length > 0 ? (
                        therapistData.students.map((student: any, i: number) => (
                          <tr key={i} className="hover:bg-cream/10">
                            <td className="py-3 px-4 font-bold text-gray-900">{student.display_name}</td>
                            <td className="py-3 px-4 text-xs text-gray-500">{student.email}</td>
                            <td className="py-3 px-4 text-xs font-medium text-gray-700">{student.course_title || "None"}</td>
                            <td className="py-3 px-4 text-right">
                              {student.progress_pct !== null ? (
                                <span className="inline-flex items-center gap-1.5 font-bold text-xs text-forest">
                                  <span className="h-1.5 w-1.5 rounded-full bg-forest animate-pulse" />
                                  {Math.round(student.progress_pct)}%
                                </span>
                              ) : (
                                <span className="text-xs text-gray-400">0%</span>
                              )}
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={4} className="py-4 text-center text-xs text-gray-500">
                            No students registered yet. Let a patient register at <code className="bg-cream px-1.5 py-0.5 text-forest">/portal/register</code>.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Right Column: Course CRUD Form & Discussion Moderator */}
              <div className="lg:col-span-4 space-y-8">
                {/* Create New Course Form */}
                <div className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
                  <h3 className="font-serif text-lg font-bold text-gray-900">Create New Course</h3>
                  <form onSubmit={handleCreateCourse} className="space-y-4">
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 uppercase">Course Title</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Cognitive Reappraisal Masterclass"
                        className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                        value={newCourseTitle}
                        onChange={(e) => setNewCourseTitle(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 uppercase">Description</label>
                      <textarea
                        required
                        rows={3}
                        placeholder="Core goals, skills, and target groups..."
                        className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                        value={newCourseDesc}
                        onChange={(e) => setNewCourseDesc(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1">
                      <label className="text-xs font-bold text-gray-600 uppercase">Price (USD)</label>
                      <input
                        type="number"
                        step="0.01"
                        required
                        placeholder="149.00"
                        className="w-full rounded-xl border border-forest/15 bg-white px-3 py-2 text-xs focus:outline-none focus:border-forest"
                        value={newCoursePrice}
                        onChange={(e) => setNewCoursePrice(e.target.value)}
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={creating}
                      className="w-full rounded-xl bg-forest py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-all disabled:bg-forest/50"
                    >
                      {creating ? "Creating Course..." : "Publish Practice Course"}
                    </button>
                  </form>
                </div>

                {/* Moderators section */}
                <div className="bg-cream border border-forest/15 rounded-3xl p-6 shadow-md space-y-3">
                  <h3 className="font-serif text-base font-bold text-gray-900">Discussion Moderator</h3>
                  <p className="text-xs text-gray-500 leading-relaxed">
                    Check peer forums to reply to client questions, validate exposure techniques, and ensure patient safety.
                  </p>
                  <Link
                    to="/portal/therapist/discussions"
                    className="block text-center w-full rounded-xl bg-forest py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-all shadow-sm"
                  >
                    Open Discussions Moderator
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
