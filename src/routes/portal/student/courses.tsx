import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { getPatientDashboardData, getAllCourses, checkoutCourse } from "../../../portalServer";

export const Route = createFileRoute("/portal/student/courses")({
  component: StudentCourses,
});

function PortalCoursesList() {
  const { user, token, loading, handleLogout } = usePortalSession("patient");
  const [enrolled, setEnrolled] = useState<any[]>([]);
  const [available, setAvailable] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loadingAction, setLoadingAction] = useState<number | null>(null);

  useEffect(() => {
    if (!token || !user) return;
    fetchCourses();
  }, [token, user]);

  const fetchCourses = () => {
    if (!token) return;
    // Get enrolled courses
    getPatientDashboardData({ data: { token } })
      .then((res) => {
        setEnrolled(res.courses || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch enrolled courses.");
      });

    // Get all published courses to find those not enrolled
    getAllCourses({ data: { token } })
      .then((res) => {
        setAvailable(res.courses || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch available courses.");
      });
  };

  const handleClaimEnrollment = async (courseId: number, title: string) => {
    if (!token) return;
    setLoadingAction(courseId);
    setError("");
    setSuccess("");

    try {
      await checkoutCourse({
        data: {
          token,
          courseId,
        },
      });
      setSuccess(`Successfully enrolled in "${title}"!`);
      fetchCourses();
    } catch (err: any) {
      setError(err?.message || "Failed to enroll.");
    } finally {
      setLoadingAction(null);
    }
  };

  // Filter out already enrolled from available courses
  const enrolledIds = enrolled.map((e) => e.id);
  const nonEnrolled = available.filter((a) => !enrolledIds.includes(a.id));

  return (
    <PortalLayout user={user} loading={loading} activeTab="courses" handleLogout={handleLogout}>
      <div className="space-y-10 font-sans">
        {/* Header */}
        <div className="space-y-1">
          <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900">My Online School & Courses</h1>
          <p className="text-sm text-gray-650">Evidence-based learning structured with modules, resources, and live integration.</p>
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

        {/* Enrolled Courses */}
        <div className="space-y-6">
          <h2 className="text-xl font-serif font-bold text-gray-900">My Enrolled Curriculums</h2>
          
          {enrolled.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {enrolled.map((course) => (
                <div 
                  key={course.id} 
                  className="bg-white rounded-3xl p-6 border border-forest/10 shadow-lg flex flex-col justify-between space-y-6 hover:border-forest/20 transition-all"
                >
                  <div className="space-y-4">
                    <span className="inline-flex items-center rounded-md bg-forest/5 border border-forest/15 px-2.5 py-0.5 text-xs font-semibold text-forest uppercase">
                      Active
                    </span>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-gray-900 line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-gray-500 font-sans mt-1 line-clamp-3 leading-relaxed">{course.description}</p>
                    </div>
                    
                    {/* Progress bar */}
                    <div className="space-y-2">
                      <div className="flex justify-between text-xs text-gray-650 font-semibold font-sans">
                        <span>Course Completion:</span>
                        <span>{Math.round(course.progress_pct)}%</span>
                      </div>
                      <div className="w-full bg-gray-150 h-2 rounded-full overflow-hidden">
                        <div 
                          className="bg-forest h-full rounded-full transition-all duration-500" 
                          style={{ width: `${course.progress_pct}%` }} 
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100 flex items-center justify-between">
                    <span className="text-xs text-gray-400 font-medium">Free client entitlement</span>
                    <Link
                      to={`/portal/student/course/${course.id}`}
                      className="rounded-xl bg-forest px-4 py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-colors shadow-sm"
                    >
                      Resume Learning →
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10 bg-white border border-forest/10 rounded-3xl">
              <p className="text-xs text-gray-500">You are not enrolled in any programs yet.</p>
            </div>
          )}
        </div>

        {/* Available Programs (for self-claim) */}
        <div className="space-y-6 pt-6 border-t border-forest/10">
          <div>
            <h2 className="text-xl font-serif font-bold text-gray-900">Available Practice Programs</h2>
            <p className="text-xs text-gray-500 mt-1">As a client of Woodland Acres Therapy, you receive fully complimentary access to all practice-authored courses.</p>
          </div>

          {nonEnrolled.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {nonEnrolled.map((course) => (
                <div 
                  key={course.id} 
                  className="bg-white rounded-3xl p-6 border border-forest/5 shadow-md flex flex-col justify-between space-y-6 hover:border-forest/15 transition-all"
                >
                  <div className="space-y-3">
                    <span className="inline-flex items-center rounded-md bg-brown-warm/5 border border-brown-warm/15 px-2.5 py-0.5 text-xs font-semibold text-brown-warm uppercase">
                      Practice Offer
                    </span>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-gray-900 line-clamp-1">{course.title}</h3>
                      <p className="text-xs text-gray-500 mt-1 line-clamp-3 leading-relaxed">{course.description}</p>
                    </div>
                    <div className="text-xs text-gray-400 font-semibold mt-2">
                      Course Value: <span className="text-brown-warm font-bold">${(course.price_cents / 100).toFixed(2)}</span> (Complimentary for you)
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleClaimEnrollment(course.id, course.title)}
                      disabled={loadingAction === course.id}
                      className="w-full rounded-xl border border-forest/20 py-2.5 text-xs font-bold text-forest bg-white hover:bg-forest/5 transition-colors disabled:opacity-50"
                    >
                      {loadingAction === course.id ? "Adding to Dashboard..." : "Claim Complimentary Access"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-gray-500 italic">You have already registered and claimed all available practice programs. Great job!</p>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}

function StudentCourses() {
  return <PortalCoursesList />;
}
