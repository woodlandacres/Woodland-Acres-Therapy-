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
function ResourcesIndex() {
  const blogPosts = [{
    slug: "demystifying-ocd-talk-therapy-risks",
    title: "What is ERP Therapy? A Complete Guide to Exposure and Response Prevention for OCD",
    category: "OCD & ERP Treatment",
    date: "July 2, 2026",
    readTime: "10 min read",
    snippet: "An in-depth, clinical yet accessible guide to Exposure and Response Prevention (ERP) therapy, explaining how it treats OCD and rewires the brain."
  }, {
    slug: "neurodivergent-affirming-lifestyle-guide",
    title: "Therapy for the Neurodivergent Brain: Why One-Size-Fits-All Doesn't Work",
    category: "ADHD & Autism Support",
    date: "June 25, 2026",
    readTime: "10 min read",
    snippet: "Explore why traditional, neurotypical-centric therapy methods often fail or harm ADHDers and autistic adults, and what true neurodivergent-affirming care looks like."
  }, {
    slug: "navigating-medical-grief-autoimmune",
    title: "Living with Chronic Illness: The Emotional Toll Nobody Talks About",
    category: "Chronic Illness Support",
    date: "June 12, 2026",
    readTime: "12 min read",
    snippet: "An honest, compassionate exploration of the hidden emotional and mental challenges of living with a chronic illness, chronic pain, or invisible disease, integrating the Fennell Four-Phase Model."
  }];
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-24 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-brown-warm uppercase tracking-widest block mb-3", children: "Clinical Insights & Guides" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight", children: "The Woodland Acres Library" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed", children: "Articles, evidence-based guides, and clinical reflections on a wide range of mental health topics — including OCD, ADHD, Autism, chronic illness, grief, trauma, relationships, and life transitions." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-5xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "space-y-16", children: blogPosts.map((post) => /* @__PURE__ */ jsxRuntimeExports.jsxs("article", { className: "group border-b border-forest/5 pb-16 last:border-b-0 last:pb-0 space-y-4", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-3 text-xs", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-bold text-forest uppercase tracking-wider", children: post.category }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: post.date }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-400", children: "•" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-gray-500", children: post.readTime })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-2xl sm:text-3xl font-serif font-bold text-gray-900 group-hover:text-forest transition-colors leading-tight", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/resources/${post.slug}`, children: post.title }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-gray-600 leading-relaxed font-sans", children: post.snippet }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: `/resources/${post.slug}`, className: "inline-flex items-center gap-1 text-sm font-bold text-forest hover:text-forest-dark uppercase tracking-wider", children: "Read Article & Clinical Guide →" }) })
    ] }, post.slug)) }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "bg-forest py-16 text-[#F5F0E8] text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-serif font-bold", children: "Seeking personalized clinical support?" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-[#F5F0E8]/90 max-w-xl mx-auto leading-relaxed", children: "Our articles provide helpful frameworks, but they are not a substitute for clinical care. Schedule a free 15-minute consultation to establish an integrated individual care structure." }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "pt-2", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "rounded-xl bg-[#F5F0E8] px-6 py-3.5 text-base font-semibold text-forest shadow-md hover:bg-white transition-colors", children: "Contact Our Specialist" }) })
    ] }) })
  ] });
}
export {
  ResourcesIndex as component
};
