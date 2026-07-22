import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { portalApi } from "../../portalServer";

export const Route = createFileRoute("/portal/")({
  component: PortalLogin,
});

function PortalLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    const token = localStorage.getItem("portal_token");
    if (token) {
      navigate({ to: "/portal/dashboard" });
    }
  }, [navigate]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await portalApi({
        data: { action: "login", payload: { email: email.trim(), password: password } },
      });

      if (res && res.success) {
        localStorage.setItem("portal_token", res.token);
        navigate({ to: "/portal/dashboard" });
      } else {
        setError("Invalid email or password.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Invalid email or password. Please verify your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#F5F0E8]/20 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        {/* Logo */}
        <div className="flex justify-center">
          <Link to="/" className="flex items-center gap-2 group">
            <svg
              className="h-10 w-10 text-forest"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M12 2L2 22h20L12 2z" />
              <path d="M12 2v20" />
            </svg>
            <div className="flex flex-col text-left">
              <span className="font-serif text-lg font-bold tracking-wide text-forest leading-tight">
                Woodland Acres
              </span>
              <span className="text-[10px] font-sans font-semibold tracking-widest text-brown-warm uppercase">
                Therapy Portal
              </span>
            </div>
          </Link>
        </div>
        <h2 className="mt-6 text-center text-3xl font-serif font-bold tracking-tight text-gray-900">
          Sign In to Your Client Sanctuary
        </h2>
        <p className="mt-2 text-center text-sm text-gray-650">
          Access your courses, check support group Zoom links, and submit worksheets.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-forest/10 shadow-xl rounded-3xl sm:px-10">
          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-700 border border-red-100">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase">
                Secure Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="client@example.com"
                className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between">
                <label htmlFor="password" className="block text-xs font-bold text-gray-700 uppercase">
                  Password
                </label>
                <Link
                  to="/portal/forgot-password"
                  className="text-xs font-bold text-forest hover:underline"
                >
                  Forgot Password?
                </Link>
              </div>
              <input
                id="password"
                type="password"
                required
                placeholder="••••••••"
                className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-forest py-4 font-semibold text-white shadow-md hover:bg-forest-dark transition-all disabled:bg-forest/50"
            >
              {loading ? "Decrypting HIPAA-Secure Connection..." : "Secure Sign In"}
            </button>
          </form>




          <div className="mt-6 border-t border-gray-150 pt-4 text-center text-xs text-gray-500 font-sans space-y-2">
            <p>
              Are you a new client? Your invite link was emailed to you upon clinical intake, or you can{" "}
              <Link to="/portal/register" className="text-forest hover:underline font-bold">
                Register here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
