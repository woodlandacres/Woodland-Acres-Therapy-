import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { registerUser } from "../../portalServer";

export const Route = createFileRoute("/portal/register")({
  component: PortalRegister,
});

function PortalRegister() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [role, setRole] = useState<"patient" | "therapist">("patient");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await registerUser({
        data: {
          email: email.trim(),
          password,
          displayName: displayName.trim(),
          role,
        },
      });

      if (res && res.success) {
        localStorage.setItem("portal_token", res.token);
        navigate({ to: "/portal/dashboard" });
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to register. Email may already be taken.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[85vh] flex-col justify-center py-12 sm:px-6 lg:px-8 bg-[#F5F0E8]/20 font-sans">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
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
          Create Secure Account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-650">
          Join our integrated care system to access courses, support groups, and clinical resources.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-forest/10 shadow-xl rounded-3xl sm:px-10">
          <form onSubmit={handleRegister} className="space-y-5">
            {error && (
              <div className="rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-700 border border-red-100">
                {error}
              </div>
            )}

            {/* Display Name */}
            <div className="space-y-1.5">
              <label htmlFor="displayName" className="block text-xs font-bold text-gray-700 uppercase">
                Full Name / Preferred Name
              </label>
              <input
                id="displayName"
                type="text"
                required
                placeholder="Alex Mercer"
                className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
              />
            </div>

            {/* Email */}
            <div className="space-y-1.5">
              <label htmlFor="email" className="block text-xs font-bold text-gray-700 uppercase">
                Secure Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                placeholder="patient@test.com"
                className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label htmlFor="password" className="block text-xs font-bold text-gray-700 uppercase">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                minLength={6}
                placeholder="At least 6 characters"
                className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {/* Role selection */}
            <div className="space-y-1.5">
              <label className="block text-xs font-bold text-gray-700 uppercase">
                Portal Role Selection
              </label>
              <div className="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onClick={() => setRole("patient")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    role === "patient"
                      ? "border-forest bg-forest/5 text-forest"
                      : "border-gray-200 text-gray-500 hover:border-forest/20"
                  }`}
                >
                  <span className="text-xs font-bold block">Patient / Client</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Access courses & classroom</span>
                </button>
                <button
                  type="button"
                  onClick={() => setRole("therapist")}
                  className={`flex flex-col items-center justify-center p-3 rounded-xl border text-center transition-all ${
                    role === "therapist"
                      ? "border-forest bg-forest/5 text-forest"
                      : "border-gray-200 text-gray-500 hover:border-forest/20"
                  }`}
                >
                  <span className="text-xs font-bold block">Therapist</span>
                  <span className="text-[10px] text-gray-400 mt-0.5">Manage courses & roster</span>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-forest py-4 font-semibold text-white shadow-md hover:bg-forest-dark transition-all disabled:bg-forest/50 mt-2"
            >
              {loading ? "Registering & Authenticating..." : "Register Secured Account"}
            </button>
          </form>

          <div className="mt-6 border-t border-gray-150 pt-4 text-center text-xs text-gray-500">
            <p>
              Already have an account?{" "}
              <Link to="/portal" className="text-forest hover:underline font-bold">
                Sign In here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
