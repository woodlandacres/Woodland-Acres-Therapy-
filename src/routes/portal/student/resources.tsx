import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { getPatientDashboardData } from "../../../portalServer";

export const Route = createFileRoute("/portal/student/resources")({
  component: StudentResources,
});

function StudentResources() {
  const { user, token, loading, handleLogout } = usePortalSession("patient");
  const [resources, setResources] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !user) return;

    getPatientDashboardData({ data: { token } })
      .then((res) => {
        setResources(res.resources || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch worksheets and clinical resources.");
      });
  }, [token, user]);

  return (
    <PortalLayout user={user} loading={loading} activeTab="resources" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans">
        {/* Header */}
        <div className="space-y-1">
          <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900">Worksheets & Clinical Logs</h1>
          <p className="text-sm text-gray-650">HIPAA-compliant logs, hierarchy templates, and checklists assigned for your active programs.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Resources Grid */}
        {resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res) => (
              <div 
                key={res.id} 
                className="bg-white rounded-3xl p-6 border border-forest/10 shadow-lg flex flex-col justify-between space-y-6 hover:border-forest/20 transition-all"
              >
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="inline-flex items-center rounded-md bg-forest/5 border border-forest/15 px-2.5 py-0.5 text-xs font-semibold text-forest uppercase">
                      {res.file_type || "PDF Handout"}
                    </span>
                    <span className="text-[10px] font-bold text-gray-400 font-mono uppercase">
                      ID: #{res.id}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 leading-tight">{res.title}</h3>
                    <p className="text-xs text-gray-500 font-sans mt-2 leading-relaxed">{res.description}</p>
                    <p className="text-[11px] text-gray-400 font-medium mt-1">Associated Course: <span className="font-bold text-gray-500">{res.course_title}</span></p>
                  </div>
                </div>

                <div className="pt-4 border-t border-gray-150 flex items-center justify-between">
                  <span className="text-xs text-gray-400">HIPAA Secures</span>
                  <a
                    href={res.file_url}
                    target="_blank"
                    rel="noreferrer"
                    className="rounded-xl border border-forest/30 bg-white hover:bg-forest/5 px-4 py-2 text-xs font-bold text-forest transition-colors flex items-center gap-1 shadow-sm"
                  >
                    Download Worksheet ↓
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-forest/10 rounded-3xl space-y-4 max-w-lg mx-auto">
            <div className="h-16 w-16 rounded-full bg-forest/5 flex items-center justify-center text-3xl mx-auto">
              📋
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-serif font-bold text-gray-900">No Worksheets Assigned Yet</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                Once your therapist assigns specific hierarchy worksheets or sensory assessment checklists, they will appear here.
              </p>
            </div>
            <Link
              to="/portal/student/courses"
              className="inline-flex rounded-xl bg-forest px-4 py-2 text-xs font-semibold text-white hover:bg-forest-dark transition-colors"
            >
              Resume Courses
            </Link>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
