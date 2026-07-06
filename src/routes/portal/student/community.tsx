import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "../auth-helper";
import { portalApi } from "../../../portalServer";

export const Route = createFileRoute("/portal/student/community")({
  component: StudentCommunity,
});

function StudentCommunity() {
  const { user, token, loading, handleLogout } = usePortalSession("patient");
  const [discussions, setDiscussions] = useState<any[]>([]);
  const [error, setError] = useState("");

  const refreshDiscussions = () => {
    if (!token) return;
    portalApi({ data: { action: "getPatientDiscussions", payload: { token } } })
      .then(setDiscussions).catch((err: any) => {
        setError("Failed to load discussions.");
        console.error(err);
      });
  };

  useEffect(() => {
    refreshDiscussions();
  }, [token]);

  return (
    <PortalLayout user={user} loading={loading} activeTab="community" handleLogout={handleLogout}>
      <div className="space-y-6">
        <h1 className="text-3xl font-serif font-bold text-gray-900">Community Board</h1>
        {error && <div className="p-4 bg-red-50 text-sm text-red-700 rounded-xl">{error}</div>}
        <div className="space-y-4">
          {discussions.map((d: any) => (
            <div key={d.id} className="bg-white border border-forest/10 rounded-2xl p-5 shadow-sm">
              <h3 className="font-semibold text-gray-900">{d.title}</h3>
              <p className="text-xs text-gray-500 mt-1">by {d.display_name}</p>
              <p className="text-sm text-gray-700 mt-2">{d.content}</p>
            </div>
          ))}
          {discussions.length === 0 && <p className="text-sm text-gray-500 italic">No discussions yet.</p>}
        </div>
      </div>
    </PortalLayout>
  );
}
