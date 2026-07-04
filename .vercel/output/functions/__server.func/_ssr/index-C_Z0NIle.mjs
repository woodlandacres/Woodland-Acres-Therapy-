import { j as jsxRuntimeExports } from "../_libs/react.mjs";
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
function PortalCoursesList() {
  const enrolledCourses = [{
    id: "ocd-course",
    title: "ERP Mechanics for Severe OCD",
    subtitle: "A step-by-step masterclass in Exposure and Response Prevention.",
    progress: 67,
    completedModules: 4,
    totalModules: 6,
    nextLesson: "Module 5: Disarming Mental Compulsions",
    imageText: "ERP OCD"
  }];
  const availableCourses = [{
    id: "neurodivergent-relationships",
    title: "Neurodivergent Relationship Dynamics",
    subtitle: "A neuro-affirming guide to communication, division of labor, and intimacy.",
    totalModules: 4,
    imageText: "ND Relationships"
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen bg-[#F5F0E8]/50", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-white border-b border-forest/10 py-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/portal/dashboard", className: "text-xs font-bold text-forest uppercase tracking-wider hover:underline", children: "← Back to Dashboard" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-3xl font-serif font-bold text-gray-900", children: "My Online Courses" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-10", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-serif font-bold text-gray-900", children: "Enrolled Programs" }),
        enrolledCourses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-forest/10 shadow-lg flex flex-col sm:flex-row justify-between gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4 flex-grow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-md bg-forest/5 border border-forest/15 px-2.5 py-0.5 text-xs font-semibold text-forest", children: "Active Program" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-2xl font-serif font-bold text-gray-900", children: course.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 font-sans mt-0.5", children: course.subtitle })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-2 max-w-md", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex justify-between text-xs text-gray-650 font-semibold font-sans", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  "Course Progress: ",
                  course.completedModules,
                  "/",
                  course.totalModules,
                  " Modules"
                ] }),
                /* @__PURE__ */ jsxRuntimeExports.jsxs("span", { children: [
                  course.progress,
                  "%"
                ] })
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "w-full bg-gray-100 h-2 rounded-full overflow-hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "bg-forest h-full", style: {
                width: `${course.progress}%`
              } }) }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 font-medium", children: [
                "Next Up: ",
                course.nextLesson
              ] })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:w-48 flex sm:flex-col justify-end border-t sm:border-t-0 sm:border-l border-gray-150 pt-4 sm:pt-0 sm:pl-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/portal/courses/${course.id}`, className: "block text-center w-full rounded-xl bg-forest py-3 text-xs font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm", children: "Resume Course" }) })
        ] }, course.id))
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "border-t border-forest/10 pt-8" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-xl font-serif font-bold text-gray-900", children: "Available Practice Programs" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 leading-relaxed font-sans", children: "As an active individual client at Woodland Acres Therapy, you are entitled to full complimentary enrollment in all practice online courses. Click below to add them to your secure dashboard." }),
        availableCourses.map((course) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "bg-white rounded-3xl p-6 sm:p-8 border border-forest/5 shadow-md flex flex-col sm:flex-row justify-between gap-6 hover:border-forest/20 transition-all", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 flex-grow", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "inline-flex items-center rounded-md bg-brown-warm/5 border border-brown-warm/15 px-2.5 py-0.5 text-xs font-semibold text-brown-warm", children: "Complimentary Program" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "text-xl font-serif font-bold text-gray-900", children: course.title }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 font-sans mt-0.5", children: course.subtitle })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-xs text-gray-400 font-medium", children: [
              course.totalModules,
              " Modules • Lifetime Access Included"
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "sm:w-48 flex sm:flex-col justify-end border-t sm:border-t-0 sm:border-l border-gray-150 pt-4 sm:pt-0 sm:pl-6", children: /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => alert(`Successfully enrolled in ${course.title}! (Mock enrollment complete)`), className: "block text-center w-full rounded-xl border border-forest/25 py-3 text-xs font-semibold text-forest bg-white hover:bg-forest/5 transition-colors", children: "Claim Free Enrollment" }) })
        ] }, course.id))
      ] })
    ] }) })
  ] });
}
export {
  PortalCoursesList as component
};
