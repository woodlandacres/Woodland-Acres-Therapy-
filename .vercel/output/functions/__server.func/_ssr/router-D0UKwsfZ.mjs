import { j as jsxRuntimeExports, r as reactExports } from "../_libs/react.mjs";
import { c as createRouter, a as createRootRoute, b as createFileRoute, l as lazyRouteComponent, L as Link, O as Outlet, H as HeadContent, S as Scripts } from "../_libs/tanstack__react-router.mjs";
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
const appCss = "/assets/app-BwgdZ_2J.css";
const Route$m = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Woodland Acres Therapy, LLC | Specialized Counseling" },
      {
        name: "description",
        content: "Specialized, integrated counseling for OCD (ERP), ADHD, Autism, and the psychosocial impact of chronic illness. Woodland Acres Therapy combines traditional 1-on-1 therapy with structured online courses and facilitated support groups."
      },
      {
        name: "keywords",
        content: "OCD therapy, ERP therapy, neurodivergent affirming, ADHD support, Autism counseling, chronic illness therapist, support groups, online mental health courses"
      }
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: ""
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap"
      }
    ]
  }),
  notFoundComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-[60vh] flex-col items-center justify-center px-6 text-center", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx("h1", { className: "text-4xl font-bold text-forest mb-4", children: "404 - Page Not Found" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-lg text-gray-600 mb-8 max-w-md", children: "The page you are looking for doesn't exist or has been moved. Let's get you back to safety." }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Link,
      {
        to: "/",
        className: "rounded-md bg-forest px-6 py-3 text-white font-medium hover:bg-forest-dark transition-colors",
        children: "Go Home"
      }
    )
  ] }),
  component: RootComponent
});
function RootComponent() {
  return /* @__PURE__ */ jsxRuntimeExports.jsx(RootDocument, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Layout, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Outlet, {}) }) });
}
function RootDocument({ children }) {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("html", { lang: "en", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("head", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(HeadContent, {}),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        "script",
        {
          type: "application/ld+json",
          dangerouslySetInnerHTML: {
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Woodland Acres Therapy, LLC",
              "image": "https://www.woodlandacrestherapy.org/logo.png",
              "@id": "https://www.woodlandacrestherapy.org/#organization",
              "url": "https://www.woodlandacrestherapy.org",
              "telephone": "(414) 533-7910",
              "email": "eweaver@woodlandacrestherapy.org",
              "priceRange": "$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00"
              },
              "sameAs": []
            })
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("body", { className: "flex min-h-screen flex-col", children: [
      children,
      /* @__PURE__ */ jsxRuntimeExports.jsx(Scripts, {})
    ] })
  ] });
}
function Layout({ children }) {
  const [mobileMenuOpen, setMobileMenuOpen] = reactExports.useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = reactExports.useState(false);
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex min-h-screen flex-col bg-[#F5F0E8]", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("header", { className: "sticky top-0 z-40 bg-[#F5F0E8]/90 backdrop-blur-md border-b border-forest/10 shadow-sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "mx-auto max-w-7xl px-4 sm:px-6 lg:px-8", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex h-20 items-center justify-between", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Link, { to: "/", className: "flex items-center gap-2.5 group", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(
            "svg",
            {
              className: "h-9 w-9 text-forest transition-transform group-hover:scale-105",
              viewBox: "0 0 24 24",
              fill: "none",
              stroke: "currentColor",
              strokeWidth: "2",
              strokeLinecap: "round",
              strokeLinejoin: "round",
              children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2L2 22h20L12 2z" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2v20" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 16h10" }),
                /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 12h6" })
              ]
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-lg font-bold tracking-wide text-forest leading-tight", children: "Woodland Acres" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[10px] font-sans font-semibold tracking-widest text-brown-warm uppercase", children: "Therapy, LLC" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("nav", { className: "hidden lg:flex items-center gap-1.5", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/",
              activeProps: { className: "bg-forest/10 text-forest" },
              className: "px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all",
              children: "Home"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/about",
              activeProps: { className: "bg-forest/10 text-forest" },
              className: "px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all",
              children: "About"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Link,
              {
                to: "/services",
                activeProps: { className: "bg-forest/10 text-forest" },
                className: "px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all flex items-center gap-1",
                onMouseEnter: () => setServicesDropdownOpen(true),
                onClick: () => setServicesDropdownOpen(!servicesDropdownOpen),
                children: [
                  "Services",
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "svg",
                    {
                      className: `h-4 w-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`,
                      viewBox: "0 0 20 20",
                      fill: "currentColor",
                      children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                        "path",
                        {
                          fillRule: "evenodd",
                          d: "M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z",
                          clipRule: "evenodd"
                        }
                      )
                    }
                  )
                ]
              }
            ),
            servicesDropdownOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "div",
              {
                className: "absolute left-0 mt-1 w-64 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 flex flex-col",
                onMouseLeave: () => setServicesDropdownOpen(false),
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/services",
                      onClick: () => setServicesDropdownOpen(false),
                      className: "px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-forest/5 hover:text-forest transition-all",
                      children: "All Services Overview"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "my-1 border-gray-100" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/services/ocd",
                      onClick: () => setServicesDropdownOpen(false),
                      className: "px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-forest/5 hover:text-forest transition-all",
                      children: "OCD & ERP Therapy"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/services/neurodivergent",
                      onClick: () => setServicesDropdownOpen(false),
                      className: "px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-forest/5 hover:text-forest transition-all",
                      children: "Neurodivergent Care (ADHD/Autism)"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/services/chronic-illness",
                      onClick: () => setServicesDropdownOpen(false),
                      className: "px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-forest/5 hover:text-forest transition-all",
                      children: "Chronic Illness Support"
                    }
                  ),
                  /* @__PURE__ */ jsxRuntimeExports.jsx(
                    Link,
                    {
                      to: "/services/individual-therapy",
                      onClick: () => setServicesDropdownOpen(false),
                      className: "px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-forest/5 hover:text-forest transition-all",
                      children: "Individual Therapy"
                    }
                  )
                ]
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/courses",
              activeProps: { className: "bg-forest/10 text-forest" },
              className: "px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all",
              children: "Courses"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/groups",
              activeProps: { className: "bg-forest/10 text-forest" },
              className: "px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all",
              children: "Groups"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/resources",
              activeProps: { className: "bg-forest/10 text-forest" },
              className: "px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all",
              children: "Resources"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/coaching",
              activeProps: { className: "bg-forest/10 text-forest" },
              className: "px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all",
              children: "Coaching"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/contact",
              activeProps: { className: "bg-forest/10 text-forest" },
              className: "px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all",
              children: "Contact"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "hidden lg:flex items-center gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/portal",
              className: "text-[14px] font-semibold text-forest hover:text-forest-dark transition-all",
              children: "Client Portal"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/contact",
              className: "rounded-xl bg-forest px-4.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-forest-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest transition-all",
              children: "Book Free Consultation"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex lg:hidden", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
          "button",
          {
            type: "button",
            className: "-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700",
            onClick: () => setMobileMenuOpen(!mobileMenuOpen),
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "sr-only", children: "Open main menu" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx(
                "svg",
                {
                  className: "h-6 w-6",
                  fill: "none",
                  viewBox: "0 0 24 24",
                  strokeWidth: "1.5",
                  stroke: "currentColor",
                  "aria-hidden": "true",
                  children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                    "path",
                    {
                      strokeLinecap: "round",
                      strokeLinejoin: "round",
                      d: "M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                    }
                  )
                }
              )
            ]
          }
        ) })
      ] }) }),
      mobileMenuOpen && /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "lg:hidden border-b border-forest/10 bg-[#F5F0E8] px-4 py-4 space-y-2 flex flex-col shadow-inner", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/",
            onClick: () => setMobileMenuOpen(false),
            className: "block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest",
            children: "Home"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/about",
            onClick: () => setMobileMenuOpen(false),
            className: "block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest",
            children: "About"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/services",
            onClick: () => setMobileMenuOpen(false),
            className: "block px-3 py-2 rounded-lg text-base font-semibold text-forest hover:bg-forest/5",
            children: "Services Overview"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "pl-4 space-y-1", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/services/ocd",
              onClick: () => setMobileMenuOpen(false),
              className: "block px-3 py-1 rounded-md text-sm text-gray-600 hover:text-forest",
              children: "• OCD & ERP Therapy"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/services/neurodivergent",
              onClick: () => setMobileMenuOpen(false),
              className: "block px-3 py-1 rounded-md text-sm text-gray-600 hover:text-forest",
              children: "• Neurodivergent Care"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/services/chronic-illness",
              onClick: () => setMobileMenuOpen(false),
              className: "block px-3 py-1 rounded-md text-sm text-gray-600 hover:text-forest",
              children: "• Chronic Illness Support"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/services/individual-therapy",
              onClick: () => setMobileMenuOpen(false),
              className: "block px-3 py-1 rounded-md text-sm text-gray-600 hover:text-forest",
              children: "• Individual Therapy"
            }
          )
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/courses",
            onClick: () => setMobileMenuOpen(false),
            className: "block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest",
            children: "Courses"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/groups",
            onClick: () => setMobileMenuOpen(false),
            className: "block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest",
            children: "Groups"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/resources",
            onClick: () => setMobileMenuOpen(false),
            className: "block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest",
            children: "Resources/Blog"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/coaching",
            onClick: () => setMobileMenuOpen(false),
            className: "block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest",
            children: "Coaching"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/contact",
            onClick: () => setMobileMenuOpen(false),
            className: "block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest",
            children: "Contact"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "border-forest/10 my-2" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/portal",
            onClick: () => setMobileMenuOpen(false),
            className: "block text-center w-full px-3 py-2 rounded-lg text-base font-semibold text-forest border border-forest/20 hover:bg-forest/5",
            children: "Client Portal Login"
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Link,
          {
            to: "/contact",
            onClick: () => setMobileMenuOpen(false),
            className: "block text-center w-full bg-forest text-white px-3 py-2 rounded-lg text-base font-semibold shadow-sm hover:bg-forest-dark",
            children: "Book Consultation"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("main", { className: "flex-grow", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("footer", { className: "bg-forest text-[#F5F0E8] border-t border-forest-dark", children: /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "grid grid-cols-1 md:grid-cols-4 gap-10", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-4", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex items-center gap-2", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs(
              "svg",
              {
                className: "h-8 w-8 text-sage-light",
                viewBox: "0 0 24 24",
                fill: "none",
                stroke: "currentColor",
                strokeWidth: "2",
                strokeLinecap: "round",
                strokeLinejoin: "round",
                children: [
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2L2 22h20L12 2z" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M12 2v20" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M7 16h10" }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("path", { d: "M9 12h6" })
                ]
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-serif text-md font-bold tracking-wide leading-tight", children: "Woodland Acres" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "text-[9px] font-semibold tracking-widest text-sage-light uppercase", children: "Therapy, LLC" })
            ] })
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#F5F0E8]/80 leading-relaxed font-sans mt-2", children: "Online therapy for a wide range of concerns, with specialized depth in OCD, ADHD, autism, and chronic illness." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "text-sm text-sage-light font-medium mt-1", children: "Virtual therapy for WI & MI" })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-md font-semibold text-white tracking-wide mb-4", children: "Services & Programs" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-2.5 text-sm", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services/ocd", className: "text-[#F5F0E8]/85 hover:text-white hover:underline", children: "OCD & ERP Therapy" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services/neurodivergent", className: "text-[#F5F0E8]/85 hover:text-white hover:underline", children: "Neurodivergent Care" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services/chronic-illness", className: "text-[#F5F0E8]/85 hover:text-white hover:underline", children: "Chronic Illness Support" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/services/individual-therapy", className: "text-[#F5F0E8]/85 hover:text-white hover:underline", children: "Individual Therapy" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/courses", className: "text-[#F5F0E8]/85 hover:text-white hover:underline", children: "Therapeutic Courses" }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("li", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/groups", className: "text-[#F5F0E8]/85 hover:text-white hover:underline", children: "Support Groups" }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-md font-semibold text-white tracking-wide mb-4", children: "Contact & Location" }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("ul", { className: "space-y-3 text-sm text-[#F5F0E8]/85", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sage-light", children: "Phone:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "(414) 533-7910" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sage-light", children: "Email:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("a", { href: "mailto:eweaver@woodlandacrestherapy.org", className: "hover:underline hover:text-white", children: "eweaver@woodlandacrestherapy.org" })
            ] }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs("li", { className: "flex items-start gap-2", children: [
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: "font-semibold text-sage-light", children: "Services:" }),
              /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "Serving clients virtually throughout Wisconsin and Michigan" })
            ] })
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("h3", { className: "font-serif text-md font-semibold text-white tracking-wide mb-4", children: "Insurance & Fees" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx("p", { className: "text-sm text-[#F5F0E8]/80 leading-relaxed mb-3", children: "We accept private self-pay and bill select insurances (including Aetna, BCBS, and Cigna) integrated seamlessly for eligible clients." }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Link,
            {
              to: "/for-therapists",
              className: "inline-flex text-sm text-sage-light font-semibold hover:text-white hover:underline",
              children: "Provider & Referral Info →"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx("hr", { className: "my-8 border-forest-light/20" }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col gap-6 text-xs text-[#F5F0E8]/70 font-sans", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Medical Disclaimer:" }),
          " The information provided on this website, including articles, courses, and self-assessments, is for educational and community purposes only and is not a substitute for medical advice, diagnosis, treatment, or clinical mental health therapy. Accessing this website, or enrolling in any online course, does not establish a therapist-client relationship."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { className: "leading-relaxed", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "Crisis Warning:" }),
          " Woodland Acres Therapy is not a crisis-intervention service. If you are experiencing a life-threatening emergency or mental health crisis, please call or text ",
          /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "988" }),
          "(the Suicide & Crisis Lifeline), visit the nearest emergency room, or call 911 immediately."
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex flex-col sm:flex-row justify-between items-center gap-4 mt-2", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { children: [
            "© ",
            (/* @__PURE__ */ new Date()).getFullYear(),
            " Woodland Acres Therapy, LLC. All rights reserved."
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: "flex gap-4", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/portal", className: "hover:underline", children: "Client Portal" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "|" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/contact", className: "hover:underline", children: "Privacy Policy" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx("span", { children: "|" }),
            /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/for-therapists", className: "hover:underline", children: "In-Network Insurance Details" })
          ] })
        ] })
      ] })
    ] }) })
  ] });
}
const $$splitComponentImporter$l = () => import("./groups-CM0fgOab.mjs");
const Route$l = createFileRoute("/groups")({
  component: lazyRouteComponent($$splitComponentImporter$l, "component")
});
const $$splitComponentImporter$k = () => import("./for-therapists-BNRd0VwY.mjs");
const Route$k = createFileRoute("/for-therapists")({
  component: lazyRouteComponent($$splitComponentImporter$k, "component")
});
const $$splitComponentImporter$j = () => import("./contact-CrejzqYx.mjs");
const Route$j = createFileRoute("/contact")({
  component: lazyRouteComponent($$splitComponentImporter$j, "component")
});
const $$splitComponentImporter$i = () => import("./coaching-Cum0AXJY.mjs");
const Route$i = createFileRoute("/coaching")({
  component: lazyRouteComponent($$splitComponentImporter$i, "component")
});
const $$splitComponentImporter$h = () => import("./about-DxKkBHIC.mjs");
const Route$h = createFileRoute("/about")({
  component: lazyRouteComponent($$splitComponentImporter$h, "component")
});
const $$splitComponentImporter$g = () => import("./index-BfD0k3Xr.mjs");
const Route$g = createFileRoute("/")({
  component: lazyRouteComponent($$splitComponentImporter$g, "component")
});
const $$splitComponentImporter$f = () => import("./index-COlVV3sj.mjs");
const Route$f = createFileRoute("/services/")({
  component: lazyRouteComponent($$splitComponentImporter$f, "component")
});
const $$splitComponentImporter$e = () => import("./index-DnU7vwbd.mjs");
const Route$e = createFileRoute("/resources/")({
  component: lazyRouteComponent($$splitComponentImporter$e, "component")
});
const $$splitComponentImporter$d = () => import("./index-uOlo3__m.mjs");
const Route$d = createFileRoute("/portal/")({
  component: lazyRouteComponent($$splitComponentImporter$d, "component")
});
const $$splitComponentImporter$c = () => import("./index-BFCK7UUx.mjs");
const Route$c = createFileRoute("/courses/")({
  component: lazyRouteComponent($$splitComponentImporter$c, "component")
});
const $$splitComponentImporter$b = () => import("./ocd-DlxscWIs.mjs");
const Route$b = createFileRoute("/services/ocd")({
  component: lazyRouteComponent($$splitComponentImporter$b, "component")
});
const $$splitComponentImporter$a = () => import("./neurodivergent-RFChnTn3.mjs");
const Route$a = createFileRoute("/services/neurodivergent")({
  component: lazyRouteComponent($$splitComponentImporter$a, "component")
});
const $$splitComponentImporter$9 = () => import("./individual-therapy-C7HaQczm.mjs");
const Route$9 = createFileRoute("/services/individual-therapy")({
  component: lazyRouteComponent($$splitComponentImporter$9, "component")
});
const $$splitComponentImporter$8 = () => import("./chronic-illness-YL14lsJy.mjs");
const Route$8 = createFileRoute("/services/chronic-illness")({
  component: lazyRouteComponent($$splitComponentImporter$8, "component")
});
const $$splitComponentImporter$7 = () => import("../_slug-BUzxUESz.mjs");
const Route$7 = createFileRoute("/resources/$slug")({
  component: lazyRouteComponent($$splitComponentImporter$7, "component")
});
const $$splitComponentImporter$6 = () => import("./groups-C1lAT9ko.mjs").then(function(n) {
  return n.g;
});
const Route$6 = createFileRoute("/portal/groups")({
  component: lazyRouteComponent($$splitComponentImporter$6, "component")
});
const $$splitComponentImporter$5 = () => import("./dashboard-BV12Jvcp.mjs");
const Route$5 = createFileRoute("/portal/dashboard")({
  component: lazyRouteComponent($$splitComponentImporter$5, "component")
});
const $$splitComponentImporter$4 = () => import("./assignments-C-Uin0rD.mjs");
const Route$4 = createFileRoute("/portal/assignments")({
  component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
const $$splitComponentImporter$3 = () => import("./ocd-course-BavnoZjO.mjs");
const Route$3 = createFileRoute("/courses/ocd-course")({
  component: lazyRouteComponent($$splitComponentImporter$3, "component")
});
const $$splitComponentImporter$2 = () => import("./neurodivergent-relationships-CJZRA1dP.mjs");
const Route$2 = createFileRoute("/courses/neurodivergent-relationships")({
  component: lazyRouteComponent($$splitComponentImporter$2, "component")
});
const $$splitComponentImporter$1 = () => import("./index-C_Z0NIle.mjs");
const Route$1 = createFileRoute("/portal/courses/")({
  component: lazyRouteComponent($$splitComponentImporter$1, "component")
});
const $$splitComponentImporter = () => import("../_courseId-BfzzOFKL.mjs");
const Route = createFileRoute("/portal/courses/$courseId")({
  component: lazyRouteComponent($$splitComponentImporter, "component")
});
const GroupsRoute = Route$l.update({
  id: "/groups",
  path: "/groups",
  getParentRoute: () => Route$m
});
const ForTherapistsRoute = Route$k.update({
  id: "/for-therapists",
  path: "/for-therapists",
  getParentRoute: () => Route$m
});
const ContactRoute = Route$j.update({
  id: "/contact",
  path: "/contact",
  getParentRoute: () => Route$m
});
const CoachingRoute = Route$i.update({
  id: "/coaching",
  path: "/coaching",
  getParentRoute: () => Route$m
});
const AboutRoute = Route$h.update({
  id: "/about",
  path: "/about",
  getParentRoute: () => Route$m
});
const IndexRoute = Route$g.update({
  id: "/",
  path: "/",
  getParentRoute: () => Route$m
});
const ServicesIndexRoute = Route$f.update({
  id: "/services/",
  path: "/services/",
  getParentRoute: () => Route$m
});
const ResourcesIndexRoute = Route$e.update({
  id: "/resources/",
  path: "/resources/",
  getParentRoute: () => Route$m
});
const PortalIndexRoute = Route$d.update({
  id: "/portal/",
  path: "/portal/",
  getParentRoute: () => Route$m
});
const CoursesIndexRoute = Route$c.update({
  id: "/courses/",
  path: "/courses/",
  getParentRoute: () => Route$m
});
const ServicesOcdRoute = Route$b.update({
  id: "/services/ocd",
  path: "/services/ocd",
  getParentRoute: () => Route$m
});
const ServicesNeurodivergentRoute = Route$a.update({
  id: "/services/neurodivergent",
  path: "/services/neurodivergent",
  getParentRoute: () => Route$m
});
const ServicesIndividualTherapyRoute = Route$9.update({
  id: "/services/individual-therapy",
  path: "/services/individual-therapy",
  getParentRoute: () => Route$m
});
const ServicesChronicIllnessRoute = Route$8.update({
  id: "/services/chronic-illness",
  path: "/services/chronic-illness",
  getParentRoute: () => Route$m
});
const ResourcesSlugRoute = Route$7.update({
  id: "/resources/$slug",
  path: "/resources/$slug",
  getParentRoute: () => Route$m
});
const PortalGroupsRoute = Route$6.update({
  id: "/portal/groups",
  path: "/portal/groups",
  getParentRoute: () => Route$m
});
const PortalDashboardRoute = Route$5.update({
  id: "/portal/dashboard",
  path: "/portal/dashboard",
  getParentRoute: () => Route$m
});
const PortalAssignmentsRoute = Route$4.update({
  id: "/portal/assignments",
  path: "/portal/assignments",
  getParentRoute: () => Route$m
});
const CoursesOcdCourseRoute = Route$3.update({
  id: "/courses/ocd-course",
  path: "/courses/ocd-course",
  getParentRoute: () => Route$m
});
const CoursesNeurodivergentRelationshipsRoute = Route$2.update({
  id: "/courses/neurodivergent-relationships",
  path: "/courses/neurodivergent-relationships",
  getParentRoute: () => Route$m
});
const PortalCoursesIndexRoute = Route$1.update({
  id: "/portal/courses/",
  path: "/portal/courses/",
  getParentRoute: () => Route$m
});
const PortalCoursesCourseIdRoute = Route.update({
  id: "/portal/courses/$courseId",
  path: "/portal/courses/$courseId",
  getParentRoute: () => Route$m
});
const rootRouteChildren = {
  IndexRoute,
  AboutRoute,
  CoachingRoute,
  ContactRoute,
  ForTherapistsRoute,
  GroupsRoute,
  CoursesNeurodivergentRelationshipsRoute,
  CoursesOcdCourseRoute,
  PortalAssignmentsRoute,
  PortalDashboardRoute,
  PortalGroupsRoute,
  ResourcesSlugRoute,
  ServicesChronicIllnessRoute,
  ServicesIndividualTherapyRoute,
  ServicesNeurodivergentRoute,
  ServicesOcdRoute,
  CoursesIndexRoute,
  PortalIndexRoute,
  ResourcesIndexRoute,
  ServicesIndexRoute,
  PortalCoursesCourseIdRoute,
  PortalCoursesIndexRoute
};
const routeTree = Route$m._addFileChildren(rootRouteChildren)._addFileTypes();
function getRouter() {
  return createRouter({
    routeTree,
    defaultPreload: "intent",
    scrollRestoration: true,
    defaultNotFoundComponent: () => /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: "Not found" })
  });
}
const router = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  getRouter
}, Symbol.toStringTag, { value: "Module" }));
export {
  Route$7 as R,
  Route as a,
  router as r
};
