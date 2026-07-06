import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { portalApi } from "../../../portalServer";

export const Route = createFileRoute("/portal/student/classroom")({
  component: StudentClassroom,
});

function StudentClassroom() {
  const { user, token, loading, handleLogout } = usePortalSession("patient");
  const [sessions, setSessions] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token || !user) return;

    portalApi({ data: { action: "getPatientDashboard", payload: { token } } })
      .then((res) => {
        setSessions(res.zoomSessions || []);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch live classroom schedules.");
      });
  }, [token, user]);

  return (
    <PortalLayout user={user} loading={loading} activeTab="classroom" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans">
        {/* Header */}
        <div className="space-y-1">
          <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to Dashboard
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Live Secure Classroom</h1>
          <p className="text-sm text-gray-650">Join scheduled integration lounges, skill workshops, and facilitated expressive arts support groups.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-700 rounded-xl">
            {error}
          </div>
        )}

        {/* Live Classroom Content */}
        {sessions.length > 0 ? (
          <div className="space-y-6 max-w-4xl">
            <h2 className="text-xl font-serif font-bold text-gray-900">Your Scheduled Secure Sessions</h2>
            
            <div className="space-y-4">
              {sessions.map((sess) => {
                const isHappeningSoon = new Date(sess.scheduled_at).getTime() - Date.now() < 1000 * 60 * 60 * 24; // within 24 hours
                
                return (
                  <div 
                    key={sess.id}
                    className={`rounded-3xl p-6 sm:p-8 border shadow-lg flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 ${
                      isHappeningSoon 
                        ? "bg-cream border-forest/20 shadow-forest/5" 
                        : "bg-white border-forest/10"
                    }`}
                  >
                    <div className="space-y-3">
                      <div className="flex items-center gap-2.5">
                        <span className={`inline-flex items-center rounded-md px-2.5 py-0.5 text-xs font-semibold ${
                          isHappeningSoon 
                            ? "bg-forest/10 text-forest border border-forest/15" 
                            : "bg-gray-150 text-gray-600"
                        }`}>
                          {isHappeningSoon ? "Happening Soon" : "Upcoming Class"}
                        </span>
                        <span className="text-xs text-gray-400 font-medium">Course: {sess.course_title}</span>
                      </div>
                      
                      <div>
                        <h3 className="text-xl font-serif font-bold text-gray-900 leading-tight">{sess.title}</h3>
                        <p className="text-xs font-bold text-forest mt-1">
                          📅 {new Date(sess.scheduled_at).toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} at{" "}
                          {new Date(sess.scheduled_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </p>
                        <p className="text-[11px] text-gray-500 mt-0.5">Duration: {sess.duration_min} minutes • Secured Video Integration Room</p>
                      </div>
                    </div>

                    <div className="shrink-0 w-full sm:w-auto">
                      <a
                        href={sess.zoom_link}
                        target="_blank"
                        rel="noreferrer"
                        className="block text-center w-full rounded-xl bg-forest hover:bg-forest-dark text-white px-6 py-3.5 text-xs font-bold transition-all shadow-md"
                      >
                        Join Secure HIPAA Room →
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="text-center py-20 bg-white border border-forest/10 rounded-3xl space-y-4 max-w-lg mx-auto">
            <div className="h-16 w-16 rounded-full bg-forest/5 flex items-center justify-center text-3xl mx-auto">
              📺
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-serif font-bold text-gray-900">No Scheduled Sessions</h3>
              <p className="text-xs text-gray-500 max-w-xs mx-auto">
                There are no active video classes or support groups scheduled on your dashboard this week.
              </p>
            </div>
            <Link
              to="/portal/student/courses"
              className="inline-flex rounded-xl bg-forest px-4 py-2 text-xs font-semibold text-white hover:bg-forest-dark transition-colors"
            >
              Check My Courses
            </Link>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
