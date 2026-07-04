import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { u as useNavigate, L as Link } from "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "../_libs/cookie-es.mjs";
import "../_libs/seroval.mjs";
import "../_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
function PortalLogin() {
  const [email, setEmail] = reactExports.useState("");
  const [password, setPassword] = reactExports.useState("");
  const [loading, setLoading] = reactExports.useState(false);
  const [error, setError] = reactExports.useState("");
  const navigate = useNavigate();
  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setTimeout(() => {
      setLoading(false);
      if (email.trim() && password.length >= 4) {
        navigate({
          to: "/portal/dashboard"
        });
      } else {
        setError("Invalid email or password. (Hint: Enter any valid email and a 4+ character password for this stubbed portal).");
      }
    }, 1e3);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[80vh] flex-col justify-center py-12 sm:px-6 lg:px-8", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "sm:mx-auto sm:w-full sm:max-w-md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2 group", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "h-10 w-10 text-forest", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2L2 22h20L12 2z" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2v20" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col text-left", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-lg font-bold tracking-wide text-forest leading-tight", children: "Woodland Acres" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-sans font-semibold tracking-widest text-brown-warm uppercase", children: "Therapy Portal" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "mt-6 text-center text-3xl font-serif font-bold tracking-tight text-gray-900", children: "Sign In to Your Client Sanctuary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-2 text-center text-sm text-gray-600", children: "Access your courses, check support group Zoom links, and submit worksheets." })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mt-8 sm:mx-auto sm:w-full sm:max-w-md", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white py-8 px-4 border border-forest/10 shadow-xl rounded-3xl sm:px-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleLogin, className: "space-y-6", children: [
        error && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-700 border border-red-100", children: error }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "block text-xs font-bold text-gray-700 uppercase font-sans", children: "Secure Email Address" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "email", type: "email", required: true, placeholder: "client@woodlandacrestherapy.org", className: "w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest", value: email, onChange: (e) => setEmail(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center justify-between", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "password", className: "block text-xs font-bold text-gray-700 uppercase font-sans", children: "Password" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#forgot", className: "text-xs font-semibold text-forest hover:underline", children: "Forgot Password?" })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "password", type: "password", required: true, placeholder: "••••••••", className: "w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest", value: password, onChange: (e) => setPassword(e.target.value) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-between", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("input", { id: "remember-me", name: "remember-me", type: "checkbox", className: "h-4 w-4 rounded border-gray-300 text-forest focus:ring-forest" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "remember-me", className: "ml-2 block text-xs text-gray-650 font-semibold font-sans", children: "Remember me on this browser" })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full rounded-xl bg-forest py-4 font-semibold text-white shadow-md hover:bg-forest-dark transition-all disabled:bg-forest/50", children: loading ? "Decrypting HIPAA-Secure Connection..." : "Secure Sign In" })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border-t border-gray-150 pt-4 text-center text-xs text-gray-500 font-sans space-y-2", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Are you a new client? Your invite link was emailed to you upon clinical intake." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
          "Need portal support? Reach out to",
          " ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:eweaver@woodlandacrestherapy.org", className: "text-forest hover:underline font-semibold", children: "eweaver@woodlandacrestherapy.org" })
        ] })
      ] })
    ] }) })
  ] });
}
export {
  PortalLogin as component
};
