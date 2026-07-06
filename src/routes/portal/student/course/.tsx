import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../../auth-helper";
import { portalApi } from "../../../portalServer";

export const Route = createFileRoute("/portal/student/course/$courseId")({
  component: StudentCourseViewer,
});

function StudentCourseViewer() {
  const { user, token, loading, handleLogout } = usePortalSession("patient");
  const [course, setCourse] = useState<any>(null);
  const [modules, setModules] = useState<any[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!token) return;
    const params = new URLSearchParams(window.location.search);
    const courseId = parseInt(params.get("courseId") || "0");
    if (!courseId) return;
    portalApi({ data: { action: "getCourseDetail", payload: { courseId } } }).then((res: any) => {
      setCourse(res.course);
      setModules(res.modules || []);
    }).catch((err: any) => {
      setError("Failed to load course.");
      console.error(err);
    });
  }, [token]);

  const handleUpdateProgress = async (moduleId: number) => {
    if (!token || !course) return;
    try {
      await portalApi({ data: { action: "updateProgress", payload: { token, courseId: course.id, progress: 100 } } });
    } catch (err: any) {
      console.error(err);
    }
  };

  return (
    <PortalLayout user={user} loading={loading} activeTab="courses" handleLogout={handleLogout}>
      <div className="space-y-8">
        <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">← Back to Dashboard</Link>
        {error && <div className="p-4 bg-red-50 text-sm text-red-700 rounded-xl">{error}</div>}
        {course && (
          <>
            <h1 className="text-3xl font-serif font-bold text-gray-900">{course.title}</h1>
            <p className="text-gray-600">{course.description}</p>
          </>
        )}
        <div className="space-y-4">
          <h2 className="text-xl font-serif font-bold text-gray-900">Course Modules</h2>
          {modules.map((mod: any) => (
            <div key={mod.id} className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm flex items-center justify-between">
              <div>
                <h3 className="font-semibold text-gray-900">{mod.title}</h3>
                <p className="text-xs text-gray-500">{mod.content_type}</p>
              </div>
              <button onClick={() => handleUpdateProgress(mod.id)} className="rounded-lg bg-forest/10 text-forest text-xs font-bold px-3 py-1.5 hover:bg-forest/20 transition-all">Mark Complete</button>
            </div>
          ))}
        </div>
      </div>
    </PortalLayout>
  );
}
