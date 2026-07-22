import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { portalApi } from "../../../portalServer";

export const Route = createFileRoute("/portal/therapist/students")({
  component: TherapistStudents,
});

function TherapistStudents() {
  const { user, token, loading, handleLogout } = usePortalSession("therapist");
  const [enrollments, setEnrollments] = useState<any[]>([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [actionLoading, setActionLoading] = useState<string | null>(null);

  const fetchEnrollments = () => {
    if (!token) return;
    portalApi({ data: { action: "getAllEnrollments", payload: { token } } })
      .then((res: any) => {
        setEnrollments(res || []);
      })
      .catch((err: any) => {
        console.error(err);
        setError("Failed to fetch student enrollment roster.");
      });
  };

  useEffect(() => {
    if (!token || !user) return;
    fetchEnrollments();
  }, [token, user]);

  const handleUnenroll = async (userId: number, courseId: number, studentName: string, courseTitle: string) => {
    const confirmed = window.confirm(
      `Are you sure you want to unenroll ${studentName} from "${courseTitle}"? This will permanently delete their progress tracking data.`
    );
    if (!confirmed || !token) return;

    const actionKey = `${userId}-${courseId}`;
    setActionLoading(actionKey);
    setError("");
    setSuccess("");

    try {
      await portalApi({
        data: {
          action: "unenrollStudent",
          payload: { token, userId, courseId }
        }
      });
      setSuccess(`Successfully unenrolled ${studentName} from "${courseTitle}".`);
      fetchEnrollments();
      setTimeout(() => setSuccess(""), 4000);
    } catch (err: any) {
      setError(err?.message || "Failed to unenroll student.");
    } finally {
      setActionLoading(null);
    }
  };

  return (
    <PortalLayout user={user} loading={loading} activeTab="students" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans max-w-5xl mx-auto pb-12">
        {/* Header */}
        <div className="space-y-1">
          <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Patient Roster & Progress Tracking</h1>
          <p className="text-sm text-gray-650">Moderate active clients enrolled in structured self-paced and facilitated support groups.</p>
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

        {/* Enrollments Table */}
        <div className="bg-white border border-forest/10 rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-150 text-sm">
              <thead>
                <tr className="text-left font-bold text-gray-600 text-xs uppercase tracking-wider font-sans border-b border-gray-150">
                  <th className="py-4 px-4">Patient Name</th>
                  <th className="py-4 px-4">Secure Email</th>
                  <th className="py-4 px-4">Active Course</th>
                  <th className="py-4 px-4 text-center">Progress</th>
                  <th className="py-4 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {enrollments.length > 0 ? (
                  enrollments.map((enrollment: any, idx: number) => {
                    const actionKey = `${enrollment.user_id}-${enrollment.course_id}`;
                    return (
                      <tr key={idx} className="hover:bg-cream/10 transition-colors">
                        <td className="py-4 px-4 font-bold text-gray-900">{enrollment.student_name}</td>
                        <td className="py-4 px-4 text-xs font-mono text-gray-600">{enrollment.student_email}</td>
                        <td className="py-4 px-4 font-medium text-gray-750">{enrollment.course_title}</td>
                        <td className="py-4 px-4 text-center">
                          <div className="flex items-center justify-center gap-3 max-w-[160px] mx-auto">
                            <div className="flex-grow bg-gray-100 h-2 rounded-full overflow-hidden shrink-0 w-20">
                              <div 
                                className="bg-forest h-full rounded-full" 
                                style={{ width: `${enrollment.progress_pct}%` }}
                              />
                            </div>
                            <span className="font-bold text-xs text-forest shrink-0">
                              {Math.round(enrollment.progress_pct)}%
                            </span>
                          </div>
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            onClick={() => handleUnenroll(enrollment.user_id, enrollment.course_id, enrollment.student_name, enrollment.course_title)}
                            disabled={actionLoading === actionKey}
                            className="px-3.5 py-1.5 bg-red-50 text-red-700 hover:bg-red-100 disabled:bg-gray-100 disabled:text-gray-400 rounded-xl font-bold text-xs transition-all border border-red-150"
                          >
                            {actionLoading === actionKey ? "Unenrolling..." : "Unenroll"}
                          </button>
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-xs text-gray-500 italic">
                      No active patient course enrollments registered. Let a client complete intake or buy a course.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </PortalLayout>
  );
}
