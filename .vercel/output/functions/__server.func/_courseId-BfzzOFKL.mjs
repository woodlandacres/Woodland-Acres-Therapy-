import { j as jsxRuntimeExports } from "./_libs/react.mjs";
import { L as Link } from "./_libs/tanstack__react-router.mjs";
import { a as Route } from "./_ssr/router-D0UKwsfZ.mjs";
import "./_libs/tanstack__router-core.mjs";
import "./_libs/tanstack__history.mjs";
import "./_libs/cookie-es.mjs";
import "./_libs/seroval.mjs";
import "./_libs/seroval-plugins.mjs";
import "node:stream/web";
import "node:stream";
import "./_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "./_libs/isbot.mjs";
function PortalCourseView() {
  const {
    courseId
  } = Route.useParams();
  const courseDetails = {
    title: "ERP Mechanics for Severe OCD",
    subtitle: "A step-by-step masterclass in Exposure and Response Prevention.",
    modules: [{
      id: "m1",
      num: "Module 1",
      title: "The Neurobiology of False Alarms",
      status: "completed",
      lessons: [{
        name: "Lesson 1.1: The Anatomy of OCD",
        duration: "14 mins",
        type: "video"
      }, {
        name: "Lesson 1.2: Why Logic Fails",
        duration: "18 mins",
        type: "video"
      }, {
        name: "Lesson 1.3: Mapping Your Alarms",
        duration: "10 mins",
        type: "worksheet"
      }]
    }, {
      id: "m2",
      num: "Module 2",
      title: "The Mechanics of ERP & Inhibitory Learning",
      status: "completed",
      lessons: [{
        name: "Lesson 2.1: Habituation vs. Inhibitory Learning",
        duration: "22 mins",
        type: "video"
      }, {
        name: "Lesson 2.2: Decoupling the Threat Loop",
        duration: "15 mins",
        type: "video"
      }]
    }, {
      id: "m3",
      num: "Module 3",
      title: "Mapping Your Mind: Constructing the Hierarchy",
      status: "completed",
      lessons: [{
        name: "Lesson 3.1: Defining Your SUDS Ratings",
        duration: "25 mins",
        type: "video"
      }, {
        name: "Lesson 3.2: Designing Secure Gradual Exposures",
        duration: "19 mins",
        type: "video"
      }, {
        name: "Interactive Worksheet: Create Your SUDS Hierarchy",
        duration: "Download",
        type: "worksheet"
      }]
    }, {
      id: "m4",
      num: "Module 4",
      title: "Practicing In-Vivo (Real Life) Exposures",
      status: "active",
      lessons: [{
        name: "Lesson 4.1: The Guidelines of In-Vivo Practice",
        duration: "18 mins",
        type: "video",
        active: true
      }, {
        name: "Lesson 4.2: Resisting the Urge: Core Strategies",
        duration: "24 mins",
        type: "video"
      }, {
        name: "Interactive Log: Your Exposure Response Log",
        duration: "Download",
        type: "worksheet"
      }]
    }, {
      id: "m5",
      num: "Module 5",
      title: "Disarming Mental Compulsions & Reassurance",
      status: "locked",
      lessons: [{
        name: "Lesson 5.1: Rumination and Neutralizing",
        duration: "28 mins",
        type: "video"
      }, {
        name: "Lesson 5.2: Drafting Imaginal Exposure Scripts",
        duration: "21 mins",
        type: "video"
      }]
    }, {
      id: "m6",
      num: "Module 6",
      title: "Sustaining Recovery & Tolerating Uncertainty",
      status: "locked",
      lessons: [{
        name: "Lesson 6.1: Long-Term Relapse Prevention",
        duration: "15 mins",
        type: "video"
      }, {
        name: "Lesson 6.2: Making Friends with Uncertainty",
        duration: "32 mins",
        type: "video"
      }]
    }]
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-[#F5F0E8]/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white border-b border-forest/10 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/portal/courses", className: "text-xs font-bold text-forest uppercase tracking-wider hover:underline", children: "← Back to My Courses" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-serif font-bold text-gray-900", children: courseDetails.title }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 font-sans", children: courseDetails.subtitle })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-8 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-8 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-serif font-bold text-gray-900", children: "Program Course Modules" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-4", children: courseDetails.modules.map((mod) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `bg-white rounded-2xl border p-6 transition-all ${mod.status === "locked" ? "opacity-50 border-gray-150" : mod.status === "active" ? "border-forest shadow-md" : "border-forest/10 shadow-sm"}`, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-start justify-between gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-brown-warm uppercase tracking-wider", children: mod.num }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `h-1.5 w-1.5 rounded-full ${mod.status === "completed" ? "bg-forest" : mod.status === "active" ? "bg-amber-500 animate-pulse" : "bg-gray-300"}` })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-lg font-serif font-bold text-gray-900", children: mod.title })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: `text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${mod.status === "completed" ? "bg-forest/10 text-forest" : mod.status === "active" ? "bg-amber-100 text-amber-800" : "bg-gray-100 text-gray-400"}`, children: mod.status })
          ] }),
          mod.status !== "locked" && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mt-6 border-t border-gray-100 pt-4 space-y-3", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "text-xs font-bold text-gray-400 uppercase tracking-wide", children: "Lessons:" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "grid grid-cols-1 gap-2.5", children: mod.lessons.map((lesson, idx) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: `flex justify-between items-center p-3 rounded-xl border transition-colors ${"active" in lesson ? "bg-forest/5 border-forest/20 font-semibold text-forest" : "bg-gray-50/50 border-gray-100 text-gray-700 hover:bg-gray-50"}`, children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2 text-xs font-sans", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: lesson.type === "video" ? "▶" : "⤓" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: lesson.name })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-bold text-gray-400", children: lesson.duration }),
                mod.status === "completed" && /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-forest text-xs font-bold", children: "✓" })
              ] })
            ] }, idx)) })
          ] })
        ] }, mod.id)) })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-4 sticky top-28 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-3xl border border-forest/15 bg-white p-6 shadow-md space-y-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-lg font-bold text-gray-900 border-b border-gray-100 pb-3", children: "Course Worksheets" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 text-xs font-sans", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 p-4 rounded-2xl bg-cream/40 border border-forest/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-900", children: "1. ERP SUDS Hierarchy Template" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Download our clinical-grade hierarchy template to rate your triggers." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "#download", onClick: (e) => {
                e.preventDefault();
                alert("Mock download started!");
              }, className: "inline-flex font-bold text-forest hover:underline", children: "Download PDF Template ↓" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2.5 p-4 rounded-2xl bg-cream/40 border border-forest/5", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-semibold text-gray-900", children: "2. Upload Completed Hierarchy" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-gray-500", children: "Submit your hierarchy so your therapist can review it before session." }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => alert("Mock upload completed!"), className: "w-full text-center rounded-xl bg-forest py-2.5 font-semibold text-white hover:bg-forest-dark transition-colors", children: "Upload Completed File" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "rounded-2xl border border-forest/10 p-6 bg-cream text-center space-y-3", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-serif text-md font-bold text-gray-900", children: "Next Support Group Zoom" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-650 leading-relaxed font-sans", children: "Tuesday at 6:00 PM PST. Remember to bring your SUDS hierarchy to troubleshoot level 4 exposures." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/portal/groups", className: "inline-block text-xs font-bold text-forest uppercase tracking-wider hover:underline", children: "My Support Groups →" })
        ] })
      ] })
    ] }) }) })
  ] });
}
export {
  PortalCourseView as component
};
