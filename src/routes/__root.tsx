import {
  HeadContent,
  Outlet,
  Scripts,
  createRootRoute,
  Link,
} from "@tanstack/react-router";
import type { ReactNode } from "react";
import { useState } from "react";

import appCss from "~/styles/app.css?url";

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Woodland Acres Therapy, LLC | Specialized Counseling" },
      {
        name: "description",
        content:
          "Specialized, integrated counseling for OCD (ERP), ADHD, Autism, and the psychosocial impact of chronic illness. Woodland Acres Therapy combines traditional 1-on-1 therapy with structured online courses and facilitated support groups.",
      },
      {
        name: "keywords",
        content:
          "OCD therapy, ERP therapy, neurodivergent affirming, ADHD support, Autism counseling, chronic illness therapist, support groups, online mental health courses",
      },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      {
        rel: "preconnect",
        href: "https://fonts.gstatic.com",
        crossOrigin: "",
      },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&display=swap",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-6 text-center">
      <h1 className="text-4xl font-bold text-forest mb-4">404 - Page Not Found</h1>
      <p className="text-lg text-gray-600 mb-8 max-w-md">
        The page you are looking for doesn't exist or has been moved. Let's get you back to safety.
      </p>
      <Link
        to="/"
        className="rounded-md bg-forest px-6 py-3 text-white font-medium hover:bg-forest-dark transition-colors"
      >
        Go Home
      </Link>
    </div>
  ),
  component: RootComponent,
});

function RootComponent() {
  return (
    <RootDocument>
      <Layout>
        <Outlet />
      </Layout>
    </RootDocument>
  );
}

function RootDocument({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalBusiness",
              "name": "Woodland Acres Therapy, LLC",
              "image": "https://www.woodlandacrestherapy.com/logo.png",
              "@id": "https://www.woodlandacrestherapy.com/#organization",
              "url": "https://www.woodlandacrestherapy.com",
              "telephone": "(414) 533-7910",
              "email": "weaveraemily@gmail.com",
              "priceRange": "$",
              "openingHoursSpecification": {
                "@type": "OpeningHoursSpecification",
                "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
                "opens": "09:00",
                "closes": "18:00",
              },
              "sameAs": [],
            }),
          }}
        />
      </head>
      <body className="flex min-h-screen flex-col">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function Layout({ children }: { children: ReactNode }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesDropdownOpen, setServicesDropdownOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-[#F5F0E8]">
      {/* Header / Navigation */}
      <header className="sticky top-0 z-40 bg-[#F5F0E8]/90 backdrop-blur-md border-b border-forest/10 shadow-sm">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            {/* Logo */}
            <div className="flex items-center">
              <Link to="/" className="flex items-center gap-2.5 group">
                <svg
                  className="h-9 w-9 text-forest transition-transform group-hover:scale-105"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 22h20L12 2z" />
                  <path d="M12 2v20" />
                  <path d="M7 16h10" />
                  <path d="M9 12h6" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-serif text-lg font-bold tracking-wide text-forest leading-tight">
                    Woodland Acres
                  </span>
                  <span className="text-[10px] font-sans font-semibold tracking-widest text-brown-warm uppercase">
                    Therapy, LLC
                  </span>
                </div>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1.5">
              <Link
                to="/"
                activeProps={{ className: "bg-forest/10 text-forest" }}
                className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all"
              >
                Home
              </Link>
              <Link
                to="/about"
                activeProps={{ className: "bg-forest/10 text-forest" }}
                className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all"
              >
                About
              </Link>

              {/* Services Popover/Dropdown */}
              <div className="relative">
                <Link
                  to="/services"
                  activeProps={{ className: "bg-forest/10 text-forest" }}
                  className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all flex items-center gap-1"
                  onMouseEnter={() => setServicesDropdownOpen(true)}
                  onClick={() => setServicesDropdownOpen(!servicesDropdownOpen)}
                >
                  Services
                  <svg
                    className={`h-4 w-4 transition-transform ${servicesDropdownOpen ? "rotate-180" : ""}`}
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                      clipRule="evenodd"
                    />
                  </svg>
                </Link>

                {servicesDropdownOpen && (
                  <div
                    className="absolute left-0 mt-1 w-64 rounded-xl bg-white p-2 shadow-xl ring-1 ring-black/5 z-50 flex flex-col"
                    onMouseLeave={() => setServicesDropdownOpen(false)}
                  >
                    <Link
                      to="/services"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm font-semibold text-gray-900 hover:bg-forest/5 hover:text-forest transition-all"
                    >
                      All Services Overview
                    </Link>
                    <hr className="my-1 border-gray-100" />
                    <Link
                      to="/services/ocd"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-forest/5 hover:text-forest transition-all"
                    >
                      OCD & ERP Therapy
                    </Link>
                    <Link
                      to="/services/neurodivergent"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-forest/5 hover:text-forest transition-all"
                    >
                      Neurodivergent Care (ADHD/Autism)
                    </Link>
                    <Link
                      to="/services/chronic-illness"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-forest/5 hover:text-forest transition-all"
                    >
                      Chronic Illness Support
                    </Link>
                    <Link
                      to="/services/individual-therapy"
                      onClick={() => setServicesDropdownOpen(false)}
                      className="px-3 py-2 rounded-lg text-sm text-gray-700 hover:bg-forest/5 hover:text-forest transition-all"
                    >
                      Individual Therapy
                    </Link>
                  </div>
                )}
              </div>

              <Link
                to="/courses"
                activeProps={{ className: "bg-forest/10 text-forest" }}
                className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all"
              >
                Courses
              </Link>
              <Link
                to="/groups"
                activeProps={{ className: "bg-forest/10 text-forest" }}
                className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all"
              >
                Groups
              </Link>
              <Link
                to="/resources"
                activeProps={{ className: "bg-forest/10 text-forest" }}
                className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all"
              >
                Resources
              </Link>
              <Link
                to="/coaching"
                activeProps={{ className: "bg-forest/10 text-forest" }}
                className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all"
              >
                Coaching
              </Link>
              <Link
                to="/contact"
                activeProps={{ className: "bg-forest/10 text-forest" }}
                className="px-3.5 py-2 rounded-lg text-[14px] font-medium text-gray-700 hover:bg-forest/5 hover:text-forest transition-all"
              >
                Contact
              </Link>
            </nav>

            {/* CTAs */}
            <div className="hidden lg:flex items-center gap-4">
              <Link
                to="/portal"
                className="text-[14px] font-semibold text-forest hover:text-forest-dark transition-all"
              >
                Client Portal
              </Link>
              <Link
                to="/contact"
                className="rounded-xl bg-forest px-4.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-forest-dark focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-forest transition-all"
              >
                Book Free Consultation
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="flex lg:hidden">
              <button
                type="button"
                className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                <span className="sr-only">Open main menu</span>
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile menu, show/hide based on menu state. */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-b border-forest/10 bg-[#F5F0E8] px-4 py-4 space-y-2 flex flex-col shadow-inner">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest"
            >
              Home
            </Link>
            <Link
              to="/about"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest"
            >
              About
            </Link>
            <Link
              to="/services"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-semibold text-forest hover:bg-forest/5"
            >
              Services Overview
            </Link>
            <div className="pl-4 space-y-1">
              <Link
                to="/services/ocd"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1 rounded-md text-sm text-gray-600 hover:text-forest"
              >
                • OCD & ERP Therapy
              </Link>
              <Link
                to="/services/neurodivergent"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1 rounded-md text-sm text-gray-600 hover:text-forest"
              >
                • Neurodivergent Care
              </Link>
              <Link
                to="/services/chronic-illness"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1 rounded-md text-sm text-gray-600 hover:text-forest"
              >
                • Chronic Illness Support
              </Link>
              <Link
                to="/services/individual-therapy"
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-1 rounded-md text-sm text-gray-600 hover:text-forest"
              >
                • Individual Therapy
              </Link>
            </div>
            <Link
              to="/courses"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest"
            >
              Courses
            </Link>
            <Link
              to="/groups"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest"
            >
              Groups
            </Link>
            <Link
              to="/resources"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest"
            >
              Resources/Blog
            </Link>
            <Link
              to="/coaching"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest"
            >
              Coaching
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded-lg text-base font-medium text-gray-700 hover:bg-forest/5 hover:text-forest"
            >
              Contact
            </Link>
            <hr className="border-forest/10 my-2" />
            <Link
              to="/portal"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full px-3 py-2 rounded-lg text-base font-semibold text-forest border border-forest/20 hover:bg-forest/5"
            >
              Client Portal Login
            </Link>
            <Link
              to="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center w-full bg-forest text-white px-3 py-2 rounded-lg text-base font-semibold shadow-sm hover:bg-forest-dark"
            >
              Book Consultation
            </Link>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-forest text-[#F5F0E8] border-t border-forest-dark">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10">
            {/* Column 1: Info & Brand */}
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <svg
                  className="h-8 w-8 text-sage-light"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 2L2 22h20L12 2z" />
                  <path d="M12 2v20" />
                  <path d="M7 16h10" />
                  <path d="M9 12h6" />
                </svg>
                <div className="flex flex-col">
                  <span className="font-serif text-md font-bold tracking-wide leading-tight">
                    Woodland Acres
                  </span>
                  <span className="text-[9px] font-semibold tracking-widest text-sage-light uppercase">
                    Therapy, LLC
                  </span>
                </div>
              </div>
              <p className="text-sm text-[#F5F0E8]/80 leading-relaxed font-sans mt-2">
                Online therapy for a wide range of concerns, with specialized depth in OCD, ADHD, autism, and chronic illness.
              </p>
              <div className="text-sm text-sage-light font-medium mt-1">
                Virtual therapy for WI & MI
              </div>
            </div>

            {/* Column 2: Quick Links */}
            <div>
              <h3 className="font-serif text-md font-semibold text-white tracking-wide mb-4">
                Services & Programs
              </h3>
              <ul className="space-y-2.5 text-sm">
                <li>
                  <Link to="/services/ocd" className="text-[#F5F0E8]/85 hover:text-white hover:underline">
                    OCD & ERP Therapy
                  </Link>
                </li>
                <li>
                  <Link to="/services/neurodivergent" className="text-[#F5F0E8]/85 hover:text-white hover:underline">
                    Neurodivergent Care
                  </Link>
                </li>
                <li>
                  <Link to="/services/chronic-illness" className="text-[#F5F0E8]/85 hover:text-white hover:underline">
                    Chronic Illness Support
                  </Link>
                </li>
                <li>
                  <Link to="/services/individual-therapy" className="text-[#F5F0E8]/85 hover:text-white hover:underline">
                    Individual Therapy
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="text-[#F5F0E8]/85 hover:text-white hover:underline">
                    Therapeutic Courses
                  </Link>
                </li>
                <li>
                  <Link to="/groups" className="text-[#F5F0E8]/85 hover:text-white hover:underline">
                    Support Groups
                  </Link>
                </li>
              </ul>
            </div>

            {/* Column 3: Contact & Location */}
            <div>
              <h3 className="font-serif text-md font-semibold text-white tracking-wide mb-4">
                Contact & Location
              </h3>
              <ul className="space-y-3 text-sm text-[#F5F0E8]/85">
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-sage-light">Phone:</span>
                  <span>(414) 533-7910</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-sage-light">Email:</span>
                  <a href="mailto:weaveraemily@gmail.com" className="hover:underline hover:text-white">
                    weaveraemily@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <span className="font-semibold text-sage-light">Services:</span>
                  <span>Serving clients virtually throughout Wisconsin and Michigan</span>
                </li>
              </ul>
            </div>

            {/* Column 4: Insurance & Referrals */}
            <div>
              <h3 className="font-serif text-md font-semibold text-white tracking-wide mb-4">
                Insurance & Fees
              </h3>
              <p className="text-sm text-[#F5F0E8]/80 leading-relaxed mb-3">
                We accept private self-pay and bill select insurances (including Aetna, BCBS, and Cigna)
                integrated seamlessly for eligible clients.
              </p>
              <Link
                to="/for-therapists"
                className="inline-flex text-sm text-sage-light font-semibold hover:text-white hover:underline"
              >
                Provider & Referral Info →
              </Link>
            </div>
          </div>

          <hr className="my-8 border-forest-light/20" />

          {/* Bottom Legal & Disclaimer */}
          <div className="flex flex-col gap-6 text-xs text-[#F5F0E8]/70 font-sans">
            <p className="leading-relaxed">
              <strong>Medical Disclaimer:</strong> The information provided on this website, including articles,
              courses, and self-assessments, is for educational and community purposes only and is not a substitute
              for medical advice, diagnosis, treatment, or clinical mental health therapy. Accessing this website,
              or enrolling in any online course, does not establish a therapist-client relationship.
            </p>
            <p className="leading-relaxed">
              <strong>Crisis Warning:</strong> Woodland Acres Therapy is not a crisis-intervention service. If you are
              experiencing a life-threatening emergency or mental health crisis, please call or text <strong>988</strong>
              (the Suicide & Crisis Lifeline), visit the nearest emergency room, or call 911 immediately.
            </p>
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
              <p>© {new Date().getFullYear()} Woodland Acres Therapy, LLC. All rights reserved.</p>
              <div className="flex gap-4">
                <Link to="/portal" className="hover:underline">Client Portal</Link>
                <span>|</span>
                <Link to="/contact" className="hover:underline">Privacy Policy</Link>
                <span>|</span>
                <Link to="/for-therapists" className="hover:underline">In-Network Insurance Details</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
