import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { portalApi } from "../../portalServer";

export const Route = createFileRoute("/portal/forgot-password")({
  component: ForgotPassword,
});

function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [devLink, setDevLink] = useState("");

  const handleRequestReset = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setMessage("");
    setDevLink("");

    try {
      const res = await portalApi({
        data: {
          action: "requestPasswordReset",
          payload: { email: email.trim() },
        },
      });

      if (res && res.success) {
        setMessage(res.message || "A secure password reset link has been sent to your email address.");
        if (res.devLink) {
          setDevLink(res.devLink);
        }
      } else {
        setError("Unable to process request. Please try again.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An error occurred while processing your request. Please check your internet connection.");
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
          Reset Your Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-650">
          Enter your registered email address below, and we will dispatch a secure, HIPAA-compliant password reset link.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-forest/10 shadow-xl rounded-3xl sm:px-10">
          {!message ? (
            <form onSubmit={handleRequestReset} className="space-y-6">
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

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-forest py-4 font-semibold text-white shadow-md hover:bg-forest-dark transition-all disabled:bg-forest/50 cursor-pointer"
              >
                {loading ? "Verifying secure identity..." : "Send Secure Reset Link"}
              </button>
            </form>
          ) : (
            <div className="space-y-6 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 border border-green-100">
                <svg
                  className="h-6 w-6 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div className="space-y-2">
                <h3 className="text-lg font-serif font-semibold text-gray-950">Reset Link Dispatched</h3>
                <p className="text-sm text-gray-600">{message}</p>
              </div>

              {devLink && (
                <div className="rounded-2xl bg-amber-50 p-4 border border-amber-200 text-left space-y-2">
                  <span className="text-[10px] font-bold tracking-wider text-amber-800 uppercase block">
                    🔧 Developer Simulator
                  </span>
                  <p className="text-xs text-amber-900 leading-relaxed">
                    Normally, the user would click this link in their email inbox. Since we are in development, you can test the rest of the flow by clicking this simulated link directly:
                  </p>
                  <a
                    href={devLink.replace("https://b8fc6da28c11d57088a3189002633958.ctonew.app", "")}
                    className="inline-block text-xs font-bold text-amber-700 underline hover:text-amber-900"
                  >
                    Simulate Email Click & Reset Password →
                  </a>
                </div>
              )}
            </div>
          )}

          <div className="mt-6 border-t border-gray-150 pt-4 text-center text-xs font-sans">
            <Link to="/portal" className="text-forest hover:underline font-bold">
              ← Return to Sign In
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
