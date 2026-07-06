import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { portalApi } from "../../../portalServer";

export const Route = createFileRoute("/portal/therapist/students")({
  component: TherapistStudents,
});

function TherapistStudents() {
  const { user, token, loading, handleLogout } = usePortalSession("therapist");
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !user) return;

    portalApi({ data: { action: "getTherapistDashboard", payload: { token } } })
      .then((res) => {
        setData(res);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch student roster.");
      });
  }, [token, user]);

  return (
    <PortalLayout user={user} loading={loading} activeTab="students" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans">
        {/* Header */}
        <div className="space-y-1">
          <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Patient Roster & Progress Tracking</h1>
          <p className="text-sm text-gray-650">HIPAA-compliant logs of active clients enrolled in structured self-paced and facilitated support groups.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Students Table */}
        <div className="bg-white border border-forest/10 rounded-3xl p-6 sm:p-8 shadow-md">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-150 text-sm">
              <thead>
                <tr className="text-left font-bold text-gray-600 text-xs uppercase tracking-wider font-sans border-b border-gray-150">
                  <th className="py-4 px-4">Patient Name</th>
                  <th className="py-4 px-4">Secure Email</th>
                  <th className="py-4 px-4">Active Course</th>
                  <th className="py-4 px-4">Registration Date</th>
                  <th className="py-4 px-4 text-right">Progress Bar</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {data && data.students && data.students.length > 0 ? (
                  data.students.map((student: any, i: number) => (
                    <tr key={i} className="hover:bg-cream/10 transition-colors">
                      <td className="py-4 px-4 font-bold text-gray-900">{student.display_name}</td>
                      <td className="py-4 px-4 text-xs font-mono text-gray-650">{student.email}</td>
                      <td className="py-4 px-4 font-medium text-gray-750">{student.course_title || "No active course"}</td>
                      <td className="py-4 px-4 text-xs text-gray-500">
                        {student.created_at ? new Date(student.created_at).toLocaleDateString() : "Clinical Intake"}
                      </td>
                      <td className="py-4 px-4 text-right">
                        {student.progress_pct !== null ? (
                          <div className="flex items-center justify-end gap-3 max-w-[160px] ml-auto">
                            <div className="flex-grow bg-gray-100 h-2 rounded-full overflow-hidden shrink-0 w-24">
                              <div 
                                className="bg-forest h-full rounded-full" 
                                style={{ width: `${student.progress_pct}%` }}
                              />
                            </div>
                            <span className="font-bold text-xs text-forest shrink-0">
                              {Math.round(student.progress_pct)}%
                            </span>
                          </div>
                        ) : (
                          <span className="text-xs text-gray-400 italic">Unstarted</span>
                        )}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-xs text-gray-500 italic">
                      No patients registered in the secure system yet. Let a client complete intake at <code className="bg-cream px-1.5 py-0.5 text-forest">/portal/register</code>.
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
