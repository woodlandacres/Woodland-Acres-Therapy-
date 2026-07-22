import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { portalApi } from "../../portalServer";

type ResetPasswordSearch = {
  token?: string;
};

export const Route = createFileRoute("/portal/reset-password")({
  validateSearch: (search: Record<string, unknown>): ResetPasswordSearch => {
    return {
      token: typeof search.token === "string" ? search.token : undefined,
    };
  },
  component: ResetPassword,
});

function ResetPassword() {
  const { token } = Route.useSearch();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!token) {
      setError("No secure password reset token is present in the URL.");
      return;
    }

    if (password.length < 8) {
      setError("For your security, passwords must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      setError("The password and confirmation password do not match.");
      return;
    }

    setLoading(true);

    try {
      const res = await portalApi({
        data: {
          action: "resetPassword",
          payload: { token, password },
        },
      });

      if (res && res.success) {
        setSuccess(true);
      } else {
        setError("Password reset failed. The link may have expired or already been used.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "An error occurred while resetting your password. The link may be expired.");
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
          Create New Password
        </h2>
        <p className="mt-2 text-center text-sm text-gray-650">
          Please enter your secure new password below to regain access to your client sanctuary.
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 border border-forest/10 shadow-xl rounded-3xl sm:px-10">
          {!token ? (
            <div className="space-y-4 text-center">
              <div className="rounded-xl bg-red-50 p-4 text-sm font-semibold text-red-700 border border-red-100">
                Invalid Request: Missing Security Token.
              </div>
              <p className="text-sm text-gray-650">
                This page can only be accessed via the secure link sent to your registered email.
              </p>
              <div className="pt-2">
                <Link
                  to="/portal/forgot-password"
                  className="inline-block rounded-xl bg-forest px-6 py-3 text-xs font-semibold text-white shadow-md hover:bg-forest-dark transition-all cursor-pointer"
                >
                  Request New Reset Link
                </Link>
              </div>
            </div>
          ) : success ? (
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
                <h3 className="text-lg font-serif font-semibold text-gray-950">Password Updated Successfully</h3>
                <p className="text-sm text-gray-650 leading-relaxed">
                  Your security credentials have been updated. You can now use your new password to sign in.
                </p>
              </div>
              <div className="pt-2">
                <Link
                  to="/portal"
                  className="w-full inline-block rounded-xl bg-forest py-4 font-semibold text-white shadow-md hover:bg-forest-dark transition-all cursor-pointer text-center"
                >
                  Sign In Now
                </Link>
              </div>
            </div>
          ) : (
            <form onSubmit={handleResetPassword} className="space-y-6">
              {error && (
                <div className="rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-700 border border-red-100">
                  {error}
                </div>
              )}

              {/* Password */}
              <div className="space-y-1.5">
                <label htmlFor="password" className="block text-xs font-bold text-gray-700 uppercase">
                  New Secure Password
                </label>
                <input
                  id="password"
                  type="password"
                  required
                  placeholder="Minimum 8 characters"
                  className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>

              {/* Confirm Password */}
              <div className="space-y-1.5">
                <label htmlFor="confirmPassword" className="block text-xs font-bold text-gray-700 uppercase">
                  Confirm New Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  required
                  placeholder="Re-enter password"
                  className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-xl bg-forest py-4 font-semibold text-white shadow-md hover:bg-forest-dark transition-all disabled:bg-forest/50 cursor-pointer"
              >
                {loading ? "Securing and sealing credentials..." : "Reset Password"}
              </button>
            </form>
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
