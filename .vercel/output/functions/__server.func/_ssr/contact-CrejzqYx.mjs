import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
function ContactPage() {
  const [formData, setFormData] = reactExports.useState({
    name: "",
    email: "",
    phone: "",
    state: "",
    subject: "Free 15-Minute Consultation",
    contactMethod: "Email",
    message: ""
  });
  const [submitted, setSubmitted] = reactExports.useState(false);
  const [loading, setLoading] = reactExports.useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col min-h-screen", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-16 sm:py-24 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-xs font-bold text-brown-warm uppercase tracking-widest block mb-3", children: "Begin Your Healing Sanctuary" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight", children: "Connect With Us" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed", children: "Ready to explore specialized individual therapy, therapeutic courses, or facilitated support groups? Reach out today to start your complimentary consultation." })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("section", { className: "py-20 bg-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:col-span-5 space-y-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h2", { className: "text-3xl font-serif font-bold text-gray-900", children: "How to Reach the Practice" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-base text-gray-650 leading-relaxed font-sans", children: "Whether you are a potential client looking for specialized therapy or a fellow provider seeking to collaborate, our secure channels are open." })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-6 text-sm font-sans text-gray-700", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start p-5 rounded-2xl bg-cream/30 border border-forest/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-forest text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-serif font-bold text-gray-900 text-base", children: "Practice Phone" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: "(414) 533-7910" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Secure clinical voicemail • Available Mon-Fri, 9am - 6pm CST" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start p-5 rounded-2xl bg-cream/30 border border-forest/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-forest text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-serif font-bold text-gray-900 text-base", children: "Secure Email" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:eweaver@woodlandacrestherapy.org", className: "mt-1 block hover:underline hover:text-forest", children: "eweaver@woodlandacrestherapy.org" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "HIPAA-compliant, encrypted inbox for general inquiries and scheduling." })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4 items-start p-5 rounded-2xl bg-cream/30 border border-forest/5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 rounded-xl bg-forest text-white", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("svg", { className: "h-5 w-5", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M15 11a3 3 0 11-6 0 3 3 0 016 0z" })
            ] }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("h4", { className: "font-serif font-bold text-gray-900 text-base", children: "Practice Location" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "mt-1", children: "Based in Wisconsin • Serving WI & MI virtually" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 mt-0.5", children: "Virtual-First Practice. Serving clients virtually throughout Wisconsin and Michigan." })
            ] })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "lg:col-span-7 bg-cream/35 border border-forest/10 rounded-3xl p-6 sm:p-10 shadow-lg", children: submitted ? /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "text-center py-10 space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "h-16 w-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto shadow-md", children: /* @__PURE__ */ jsxRuntimeExports.jsx("svg", { className: "h-8 w-8", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor", strokeWidth: "3", children: /* @__PURE__ */ jsxRuntimeExports.jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M5 13l4 4L19 7" }) }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-3 max-w-md mx-auto", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("h3", { className: "font-serif text-2xl font-bold text-gray-900", children: [
            "Thank you, ",
            formData.name,
            "!"
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "text-sm text-gray-600 leading-relaxed font-sans", children: [
            "Your message has been sent successfully. Our licensed specialist will review your clinical goals and contact you at ",
            /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: formData.email }),
            " within 24–48 business hours to schedule your free consultation."
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { onClick: () => setSubmitted(false), className: "text-xs font-bold text-forest uppercase tracking-wider hover:underline", children: "Send Another Message" })
      ] }) : /* @__PURE__ */ jsxRuntimeExports.jsxs("form", { onSubmit: handleSubmit, className: "space-y-6", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-2xl font-bold text-gray-900 mb-2", children: "Schedule Consultation / Send Inquiry" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-xs text-gray-500 font-sans leading-relaxed", children: "Note: To receive clinical counseling, you must reside in **Wisconsin** or **Michigan** state. Self-paced course enrollment is open globally." }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "name", className: "text-xs font-bold text-gray-600 uppercase font-sans", children: "Your Full Name" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "text", id: "name", required: true, placeholder: "Jane Doe", className: "w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest", value: formData.name, onChange: (e) => setFormData({
              ...formData,
              name: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "email", className: "text-xs font-bold text-gray-600 uppercase font-sans", children: "Email Address" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "email", id: "email", required: true, placeholder: "rowan@example.com", className: "w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest", value: formData.email, onChange: (e) => setFormData({
              ...formData,
              email: e.target.value
            }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "phone", className: "text-xs font-bold text-gray-600 uppercase font-sans", children: "Phone Number" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("input", { type: "tel", id: "phone", required: true, placeholder: "(414) 533-7910", className: "w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest", value: formData.phone, onChange: (e) => setFormData({
              ...formData,
              phone: e.target.value
            }) })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "state", className: "text-xs font-bold text-gray-600 uppercase font-sans", children: "State of Residence" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "state", required: true, className: "w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest", value: formData.state, onChange: (e) => setFormData({
              ...formData,
              state: e.target.value
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "", children: "-- Select Your State --" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Wisconsin", children: "Wisconsin" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Michigan", children: "Michigan" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Other", children: "Other State (Course Only)" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 sm:grid-cols-2 gap-6", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "subject", className: "text-xs font-bold text-gray-600 uppercase font-sans", children: "Inquiry Subject" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "subject", className: "w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest", value: formData.subject, onChange: (e) => setFormData({
              ...formData,
              subject: e.target.value
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Free 15-Minute Consultation", children: "Free 15-Minute Consultation" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "General Therapy Question", children: "General Therapy Question" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Referring Provider / Professional Inquiry", children: "Referring Provider / Professional Inquiry" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Online Course / Group Syllabus Question", children: "Online Course / Group Syllabus Question" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "contactMethod", className: "text-xs font-bold text-gray-600 uppercase font-sans", children: "Preferred Contact Method" }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("select", { id: "contactMethod", className: "w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest", value: formData.contactMethod, onChange: (e) => setFormData({
              ...formData,
              contactMethod: e.target.value
            }), children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Email", children: "Email Me" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Phone", children: "Call Me" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("option", { value: "Text", children: "Text Me" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "space-y-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("label", { htmlFor: "message", className: "text-xs font-bold text-gray-600 uppercase font-sans", children: "Briefly describe your goals / symptoms" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("textarea", { id: "message", required: true, rows: 5, placeholder: "Hi, I am looking to schedule a consultation for ERP for OCD...", className: "w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest", value: formData.message, onChange: (e) => setFormData({
            ...formData,
            message: e.target.value
          }) })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("button", { type: "submit", disabled: loading, className: "w-full rounded-xl bg-forest py-4 font-semibold text-white hover:bg-forest-dark transition-colors shadow-md disabled:bg-forest/50", children: loading ? "Sending HIPAA-Secure Message..." : "Submit My Consultation Inquiry" })
      ] }) })
    ] }) }) })
  ] });
}
export {
  ContactPage as component
};
