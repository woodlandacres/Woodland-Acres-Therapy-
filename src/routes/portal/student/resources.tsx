import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { portalApi } from "../../../portalServer";

export const Route = createFileRoute("/portal/student/resources")({
  component: StudentResources,
});

function StudentResources() {
  const { user, token, loading, handleLogout } = usePortalSession("patient");
  const [resources, setResources] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !user) return;

    portalApi({ data: { action: "getPatientDashboard", payload: { token } } })
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
      <div className="space-y-8 font-sans max-w-5xl mx-auto pb-12">
        {/* Header */}
        <div className="space-y-1 border-b border-forest/10 pb-5">
          <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Worksheets & Clinical Logs</h1>
          <p className="text-sm text-gray-650 font-sans">Secure logs, exposure hierarchy spreadsheets, and sensory assessors assigned across your enrolled courses.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Resources Grid */}
        {resources.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {resources.map((res) => {
              const fileTypeLower = (res.file_type || "").toLowerCase();
              const isWord = fileTypeLower.includes("doc");
              const isExcel = fileTypeLower.includes("xls") || fileTypeLower.includes("sheet");
              const isVideo = fileTypeLower.includes("video") || fileTypeLower.includes("mp4");
              
              // Styled badges/icons
              const badgeStyle = isWord
                ? "bg-blue-50 text-blue-800 border-blue-200"
                : isExcel
                ? "bg-emerald-50 text-emerald-800 border-emerald-200"
                : isVideo
                ? "bg-amber-50 text-amber-800 border-amber-200"
                : "bg-red-50 text-red-800 border-red-200";

              const typeLabel = isWord
                ? "Word Document"
                : isExcel
                ? "Excel Worksheet"
                : isVideo
                ? "Video Tutorial"
                : "Adobe PDF Handout";

              const icon = isWord ? "💙" : isExcel ? "🟢" : isVideo ? "🎥" : "🔴";

              return (
                <div 
                  key={res.id} 
                  className="bg-white rounded-3xl p-6 border border-forest/10 shadow-sm flex flex-col justify-between space-y-6 hover:shadow-md transition-all"
                >
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-bold uppercase ${badgeStyle}`}>
                        {icon} <span className="ml-1.5">{typeLabel}</span>
                      </span>
                      <span className="text-[10px] font-bold text-gray-400 font-mono uppercase">
                        ID: #{res.id}
                      </span>
                    </div>
                    <div>
                      <h3 className="text-xl font-serif font-bold text-gray-950 leading-snug">{res.title}</h3>
                      <p className="text-xs text-gray-550 leading-relaxed mt-2">{res.description}</p>
                      <p className="text-[11px] text-gray-400 font-semibold mt-3">
                        Associated Course: <span className="font-bold text-gray-650">{res.course_title}</span>
                      </p>
                    </div>
                  </div>

                  <div className="pt-4 border-t border-gray-150 flex items-center justify-between">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wider font-sans">HIPAA Secure Handout</span>
                    <a
                      href={res.file_url}
                      download
                      className="rounded-xl border border-forest/20 bg-white hover:bg-forest hover:text-white px-4 py-2 text-xs font-bold text-forest transition-all flex items-center gap-1.5 shadow-sm"
                    >
                      Download Worksheet ⬇
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-forest/10 rounded-3xl space-y-4 max-w-lg mx-auto">
            <div className="h-16 w-16 rounded-full bg-forest/5 flex items-center justify-center text-3xl mx-auto">
              📋
            </div>
            <div className="space-y-2 font-sans">
              <h3 className="text-lg font-serif font-bold text-gray-900">No Worksheets Assigned Yet</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto leading-relaxed">
                Once your therapist assigns specific ERP exposure checklists, relationship assessors, or worksheets, they will appear here.
              </p>
            </div>
            <Link
              to="/portal/student/courses"
              className="inline-flex rounded-xl bg-forest px-5 py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-all shadow-sm"
            >
              Resume Courses
            </Link>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
