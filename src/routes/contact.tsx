// Woodland Acres Therapy Contact Page - Direct contact info (form removed while email system is being set up)
import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header banner */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block mb-3">Begin Your Healing Sanctuary</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Connect With Us
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Ready to explore specialized individual therapy, therapeutic courses, or facilitated support groups? 
            Reach out today to schedule your complimentary consultation.
          </p>
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Email Card */}
            <div className="bg-cream/35 border border-forest/10 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
              <div className="h-16 w-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto shadow-md mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Email Us Directly</h2>
              <p className="text-gray-600 font-sans mb-4">
                The best way to reach us. We'll respond within 24-48 business hours.
              </p>
              <a
                href="mailto:weaveraemily@gmail.com"
                className="text-xl font-semibold text-forest hover:text-forest-dark underline underline-offset-4 decoration-2 decoration-forest/30 hover:decoration-forest transition-all"
              >
                weaveraemily@gmail.com
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-cream/35 border border-forest/10 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
              <div className="h-16 w-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto shadow-md mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Call or Text</h2>
              <p className="text-gray-600 font-sans mb-4">
                Leave a secure voicemail and we'll return your call.
              </p>
              <a
                href="tel:+14145337910"
                className="text-xl font-semibold text-forest hover:text-forest-dark underline underline-offset-4 decoration-2 decoration-forest/30 hover:decoration-forest transition-all"
              >
                (414) 533-7910
              </a>
              <p className="text-xs text-gray-500 mt-3 font-sans">Mon-Fri, 9am - 6pm CST</p>
            </div>

            {/* Location Card */}
            <div className="bg-cream/35 border border-forest/10 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
              <div className="h-16 w-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto shadow-md mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Practice Location</h2>
              <p className="text-gray-600 font-sans">
                Based in Wisconsin
              </p>
              <p className="text-gray-600 font-sans">
                Serving clients virtually throughout Wisconsin and Michigan
              </p>
            </div>

            {/* Hours */}
            <div className="text-center">
              <p className="text-sm text-gray-500 font-sans">
                Virtual-First Practice. All sessions held via secure telehealth platform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}