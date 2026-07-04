import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { L as Link } from "../_libs/tanstack__react-router.mjs";
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
function PortalAssignments() {
  const [completedList, setCompletedList] = reactExports.useState([{
    id: "a1",
    name: "Symptom Mapping & Compulsion Inventory",
    module: "Module 1",
    status: "completed",
    graded: "Reviewed & Verified",
    date: "2026-06-15"
  }, {
    id: "a2",
    name: "Your Custom SUDS Hierarchy",
    module: "Module 3",
    status: "completed",
    graded: "Reviewed & Approved",
    date: "2026-06-28"
  }]);
  const [activeList, setActiveList] = reactExports.useState([{
    id: "a3",
    name: "Daily Exposure & Response Prevention Log",
    module: "Module 4",
    dueDate: "In 2 days (Thursday)",
    status: "pending",
    desc: "Record at least 3 daily in-vivo exposures regarding Level 4 triggers. Log your pre-exposure SUDS, 10-minute SUDS, and post-exposure SUDS. Note any physical/mental urges to wash or seek reassurance."
  }]);
  const [fileUploaded, setFileUploaded] = reactExports.useState(false);
  const handleUpload = () => {
    setFileUploaded(true);
    alert("Mock worksheet successfully submitted to Woodland Acres Therapy! (Clinical secure logging complete)");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-[#F5F0E8]/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white border-b border-forest/10 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/portal/dashboard", className: "text-xs font-bold text-forest uppercase tracking-wider hover:underline", children: "← Back to Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-serif font-bold text-gray-900", children: "Worksheets & Assignments" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-serif font-bold text-gray-900", children: "Pending Assignments" }),
        activeList.map((assign) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-amber-300 bg-amber-50/5 shadow-lg space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-brown-warm uppercase tracking-wider", children: assign.module }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-serif font-bold text-gray-900 mt-1", children: assign.name })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { className: "text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider", children: [
              "Due ",
              assign.dueDate
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-gray-650 leading-relaxed font-sans", children: assign.desc }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-gray-400 uppercase tracking-wide", children: "1. Download Template" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 leading-relaxed", children: "Download the interactive PDF log to track your exposures on your computer, tablet, or print it out." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#download", onClick: (e) => {
                e.preventDefault();
                alert("Template downloaded successfully!");
              }, className: "inline-flex font-bold text-forest text-xs hover:underline", children: "Download Exposure Log PDF ↓" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-gray-400 uppercase tracking-wide", children: "2. Submit Log Worksheets" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 leading-relaxed", children: "Upload your filled-out exposure logs or screenshot files securely." }),
              fileUploaded ? /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-md bg-forest/10 px-2.5 py-1 text-xs font-semibold text-forest", children: "✓ Submitted & Logged" }) : /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: handleUpload, className: "rounded-xl bg-forest px-4.5 py-2.5 text-xs font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm", children: "Upload Completed Log File" })
            ] })
          ] })
        ] }, assign.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-forest/10 pt-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-serif font-bold text-gray-900", children: "Completed Worksheets" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-4", children: completedList.map((comp) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-2xl p-5 border border-forest/5 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-forest/20 transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-gray-400 uppercase tracking-wide", children: comp.module }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "h-1.5 w-1.5 rounded-full bg-forest" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-serif font-bold text-gray-900", children: comp.name }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 font-sans", children: [
              "Submitted on: ",
              comp.date
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-forest bg-forest/5 border border-forest/10 px-2.5 py-1 rounded-md uppercase tracking-wider", children: comp.graded }) })
        ] }, comp.id)) })
      ] })
    ] }) })
  ] });
}
export {
  PortalAssignments as component
};
