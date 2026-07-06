import { useEffect, useState } from "react";
import { useNavigate, Link } from "@tanstack/react-router";
import { verifySession } from "../../portalServer";

export interface User {
  id: number;
  email: string;
  display_name: string;
  role: "therapist" | "patient";
}

export function usePortalSession(requiredRole?: "therapist" | "patient") {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const storedToken = localStorage.getItem("portal_token");
    setToken(storedToken);

    if (!storedToken) {
      setLoading(false);
      navigate({ to: "/portal" });
      return;
    }

    verifySession({ data: { token: storedToken } })
      .then((res: any) => {
        const u = res.user as User;
        if (requiredRole && u.role !== requiredRole) {
          navigate({ to: "/portal/dashboard" });
        } else {
          setUser(u);
        }
      })
      .catch((err) => {
        console.error("Auth verification failed:", err);
        localStorage.removeItem("portal_token");
        navigate({ to: "/portal" });
      })
      .finally(() => {
        setLoading(false);
      });
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("portal_token");
    navigate({ to: "/portal" });
  };

  return { user, token, loading, handleLogout };
}

interface PortalLayoutProps {
  user: User | null;
  loading: boolean;
  activeTab: string;
  children: React.ReactNode;
  handleLogout: () => void;
}

export function PortalLayout({ user, loading, activeTab, children, handleLogout }: PortalLayoutProps) {
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#F5F0E8] font-sans">
        <div className="text-center space-y-4">
          <div className="h-12 w-12 border-4 border-forest border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="text-sm font-semibold text-gray-600">Establishing Secure HIPAA Connection...</p>
        </div>
      </div>
    );
  }

  if (!user) return null;

  const isTherapist = user.role === "therapist";

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E8]/40 text-gray-800 font-sans">
      {/* Secure Header Banner */}
      <header className="bg-white border-b border-forest/10 sticky top-0 z-40 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-6">
              <Link to="/portal/dashboard" className="flex items-center gap-2 group">
                <svg className="h-8 w-8 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 2L2 22h20L12 2z" />
                  <path d="M12 2v20" />
                </svg>
                <div className="flex flex-col text-left">
                  <span className="font-serif text-base font-bold tracking-wide text-forest leading-tight">
                    Woodland Acres
                  </span>
                  <span className="text-[9px] font-sans font-semibold tracking-widest text-brown-warm uppercase">
                    HIPAA Secure Portal
                  </span>
                </div>
              </Link>

              {/* Sub-tabs based on role */}
              <nav className="hidden md:flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider">
                {isTherapist ? (
                  <>
                    <Link
                      to="/portal/dashboard"
                      className={`px-3 py-2 rounded-xl transition-all ${
                        activeTab === "dashboard" ? "bg-forest/10 text-forest" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/portal/therapist/students"
                      className={`px-3 py-2 rounded-xl transition-all ${
                        activeTab === "students" ? "bg-forest/10 text-forest" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Student Roster
                    </Link>
                    <Link
                      to="/portal/therapist/content"
                      className={`px-3 py-2 rounded-xl transition-all ${
                        activeTab === "content" ? "bg-forest/10 text-forest" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Content Management
                    </Link>
                    <Link
                      to="/portal/therapist/discussions"
                      className={`px-3 py-2 rounded-xl transition-all ${
                        activeTab === "discussions" ? "bg-forest/10 text-forest" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Discussions Forum
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/portal/dashboard"
                      className={`px-3 py-2 rounded-xl transition-all ${
                        activeTab === "dashboard" ? "bg-forest/10 text-forest" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/portal/student/courses"
                      className={`px-3 py-2 rounded-xl transition-all ${
                        activeTab === "courses" ? "bg-forest/10 text-forest" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      My Courses
                    </Link>
                    <Link
                      to="/portal/student/resources"
                      className={`px-3 py-2 rounded-xl transition-all ${
                        activeTab === "resources" ? "bg-forest/10 text-forest" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Resources & Logs
                    </Link>
                    <Link
                      to="/portal/student/classroom"
                      className={`px-3 py-2 rounded-xl transition-all ${
                        activeTab === "classroom" ? "bg-forest/10 text-forest" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Live Classroom
                    </Link>
                    <Link
                      to="/portal/student/community"
                      className={`px-3 py-2 rounded-xl transition-all ${
                        activeTab === "community" ? "bg-forest/10 text-forest" : "text-gray-600 hover:bg-gray-100"
                      }`}
                    >
                      Community Board
                    </Link>
                  </>
                )}
              </nav>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex flex-col text-right hidden sm:block">
                <span className="text-xs font-bold text-gray-900 leading-tight block">{user.display_name}</span>
                <span className="text-[10px] text-gray-500 font-medium tracking-wide uppercase font-sans">
                  Role: {user.role === "therapist" ? "Clinical Specialist" : "Active Patient"}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-bold text-gray-700 bg-white hover:bg-gray-50 transition-all shadow-sm"
              >
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sub-Navigation */}
      <div className="bg-white border-b border-forest/10 md:hidden flex flex-wrap gap-2 px-4 py-3 justify-center text-[10px] font-bold uppercase tracking-wider">
        {isTherapist ? (
          <>
            <Link
              to="/portal/dashboard"
              className={`px-2.5 py-1.5 rounded-lg ${
                activeTab === "dashboard" ? "bg-forest/10 text-forest" : "text-gray-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/portal/therapist/students"
              className={`px-2.5 py-1.5 rounded-lg ${
                activeTab === "students" ? "bg-forest/10 text-forest" : "text-gray-600"
              }`}
            >
              Roster
            </Link>
            <Link
              to="/portal/therapist/content"
              className={`px-2.5 py-1.5 rounded-lg ${
                activeTab === "content" ? "bg-forest/10 text-forest" : "text-gray-600"
              }`}
            >
              Content
            </Link>
            <Link
              to="/portal/therapist/discussions"
              className={`px-2.5 py-1.5 rounded-lg ${
                activeTab === "discussions" ? "bg-forest/10 text-forest" : "text-gray-600"
              }`}
            >
              Discussions
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/portal/dashboard"
              className={`px-2.5 py-1.5 rounded-lg ${
                activeTab === "dashboard" ? "bg-forest/10 text-forest" : "text-gray-600"
              }`}
            >
              Dashboard
            </Link>
            <Link
              to="/portal/student/courses"
              className={`px-2.5 py-1.5 rounded-lg ${
                activeTab === "courses" ? "bg-forest/10 text-forest" : "text-gray-600"
              }`}
            >
              Courses
            </Link>
            <Link
              to="/portal/student/resources"
              className={`px-2.5 py-1.5 rounded-lg ${
                activeTab === "resources" ? "bg-forest/10 text-forest" : "text-gray-600"
              }`}
            >
              Logs
            </Link>
            <Link
              to="/portal/student/classroom"
              className={`px-2.5 py-1.5 rounded-lg ${
                activeTab === "classroom" ? "bg-forest/10 text-forest" : "text-gray-600"
              }`}
            >
              Live
            </Link>
            <Link
              to="/portal/student/community"
              className={`px-2.5 py-1.5 rounded-lg ${
                activeTab === "community" ? "bg-forest/10 text-forest" : "text-gray-600"
              }`}
            >
              Community
            </Link>
          </>
        )}
      </div>

      {/* Content Area */}
      <main className="flex-grow py-8 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8">
        {children}
      </main>
    </div>
  );
}
