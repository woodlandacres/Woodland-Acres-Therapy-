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
  const [enrolledIds, setEnrolledIds] = useState<number[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) return;
    portalApi({ data: { action: "getPatientDashboard", payload: { token } } }).then((res: any) => {
      setEnrolledIds(res.enrollments?.map((e: any) => e.course_id) || []);
    }).catch(console.error);
    portalApi({ data: { action: "getAllCourses", payload: {} } }).then((res: any) => {
      setCourses(res || []);
    }).catch(console.error);
  }, [token]);

  const handleEnroll = async (courseId: number, priceCents: number) => {
    if (!token) return;
    try {
      await portalApi({ data: { action: "enrollCourse", payload: { token, courseId, amount_cents: priceCents } } });
      setEnrolledIds([...enrolledIds, courseId]);
      navigate({ to: "/portal/dashboard" });
    } catch (err: any) {
      setError(err?.message || "Enrollment failed.");
    }
  };

  return (
    <PortalLayout user={user} loading={loading} activeTab="courses" handleLogout={handleLogout}>
      <div className="space-y-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Available Courses</h1>
        {error && <div className="p-4 bg-red-50 text-sm text-red-700 rounded-xl">{error}</div>}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {courses.map((course: any) => (
            <div key={course.id} className="bg-white border border-forest/10 rounded-3xl p-6 shadow-md space-y-4">
              <h2 className="text-xl font-serif font-bold text-gray-900">{course.title}</h2>
              <p className="text-sm text-gray-600">{course.description}</p>
              <div className="flex items-center justify-between pt-2">
                <span className="text-lg font-bold text-forest">${(course.price_cents / 100).toFixed(2)}</span>
                {enrolledIds.includes(course.id) ? (
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-xl">Enrolled</span>
                ) : (
                  <button onClick={() => handleEnroll(course.id, course.price_cents)} className="rounded-xl bg-forest px-5 py-2.5 text-sm font-semibold text-white hover:bg-forest-dark transition-all">Enroll Now</button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}