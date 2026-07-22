import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { portalApi } from "../../../portalServer";

export const Route = createFileRoute("/portal/student/courses")({
  component: StudentCourses,
});

function StudentCourses() {
  const { user, token, loading, handleLogout } = usePortalSession("patient");
  const [courses, setCourses] = useState<any[]>([]);
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const fetchDashboardAndCourses = () => {
    if (!token) return;
    portalApi({ data: { action: "getPatientDashboard", payload: { token } } })
      .then((res: any) => {
        setEnrollments(res.enrollments || []);
      })
      .catch(console.error);

    portalApi({ data: { action: "getAllCourses", payload: {} } })
      .then((res: any) => {
        setCourses(res || []);
      })
      .catch(console.error);
  };

  useEffect(() => {
    fetchDashboardAndCourses();
  }, [token]);

  const handleEnroll = async (courseId: number, priceCents: number) => {
    if (!token) return;
    try {
      await portalApi({ data: { action: "enrollCourse", payload: { token, courseId, amount_cents: priceCents } } });
      fetchDashboardAndCourses();
      navigate({ to: `/portal/student/course/${courseId}` });
    } catch (err: any) {
      setError(err?.message || "Enrollment failed.");
    }
  };

  return (
    <PortalLayout user={user} loading={loading} activeTab="courses" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans max-w-5xl mx-auto pb-12">
        {/* Header */}
        <div className="space-y-1 border-b border-forest/10 pb-5">
          <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Woodland Acres Learning Hub</h1>
          <p className="text-sm text-gray-650">Browse structured therapeutic courses, enroll in active cohorts, or enter your classroom workspace.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-700 rounded-xl">
            {error}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course: any) => {
            const enrollment = enrollments.find((e: any) => e.course_id === course.id);
            const isEnrolled = !!enrollment;

            return (
              <div key={course.id} className="bg-white border border-forest/10 rounded-3xl p-6 shadow-sm flex flex-col justify-between hover:shadow-md transition-all">
                <div className="space-y-4">
                  <div className="flex justify-between items-start gap-4">
                    <h2 className="text-xl font-serif font-bold text-gray-950 leading-snug">{course.title}</h2>
                    {isEnrolled && (
                      <span className="text-[10px] font-black uppercase tracking-wider bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1 rounded-full shrink-0 font-sans">
                        Enrolled
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">{course.description}</p>
                </div>

                <div className="pt-6 mt-6 border-t border-gray-100 space-y-4">
                  {isEnrolled && enrollment && (
                    <div className="space-y-1.5 font-sans">
                      <div className="flex justify-between text-xs font-bold text-forest">
                        <span>Course Progress</span>
                        <span>{Math.round(enrollment.progress_pct || 0)}%</span>
                      </div>
                      <div className="bg-gray-100 h-2 rounded-full overflow-hidden w-full">
                        <div 
                          className="bg-forest h-full rounded-full transition-all duration-300" 
                          style={{ width: `${enrollment.progress_pct || 0}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <div className="flex items-center justify-between pt-2">
                    <span className="text-lg font-bold text-forest font-mono">${(course.price_cents / 100).toFixed(2)}</span>
                    {isEnrolled ? (
                      <Link 
                        to={`/portal/student/course/${course.id}`}
                        className="rounded-xl bg-forest hover:bg-forest-dark text-white px-5 py-2.5 text-sm font-semibold transition-all shadow-sm flex items-center gap-1.5"
                      >
                        Enter Classroom →
                      </Link>
                    ) : (
                      <button 
                        onClick={() => handleEnroll(course.id, course.price_cents)} 
                        className="rounded-xl border border-forest hover:bg-forest hover:text-white text-forest px-5 py-2.5 text-sm font-semibold transition-all shadow-sm"
                      >
                        Enroll Now
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {courses.length === 0 && (
            <div className="col-span-2 p-12 bg-cream/10 border border-dashed border-forest/15 rounded-3xl text-center">
              <p className="text-sm text-gray-500 italic">No public courses published yet. Please check back later.</p>
            </div>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
