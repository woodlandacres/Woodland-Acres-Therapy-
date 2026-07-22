import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: Home,
});

function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32 bg-gradient-to-b from-[#F5F0E8] via-[#ECE5D8] to-[#F5F0E8]">
        {/* Decorative background vectors */}
        <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-forest/5 ring-1 ring-[#F5F0E8] sm:mr-28 lg:mr-32" />
        
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative">
          <div className="mx-auto max-w-3xl text-center">
            <span className="inline-flex items-center gap-x-1.5 rounded-full bg-forest/10 px-3.5 py-1.5 text-xs font-semibold text-forest uppercase tracking-wider mb-6">
              Now Welcoming New Clients • Wisconsin & Michigan Telehealth
            </span>
            <h1 className="text-4xl sm:text-6xl font-bold tracking-tight text-gray-900 font-serif leading-tight">
              A Supportive Space for <span className="text-forest italic">Complex Minds</span> & <span className="text-forest">Resilient Spirits</span>
            </h1>
            <p className="mt-6 text-lg sm:text-xl leading-relaxed text-gray-600 font-sans max-w-2xl mx-auto">
              Thoughtful, integrated counseling for a wide range of concerns — with specialized depth in <strong>OCD</strong>, <strong>ADHD</strong>, <strong>Autism</strong>, and the
                            mental health toll of <strong>chronic illness</strong>. I combine personalized, one-on-one therapy with structured, group-integrated
              courses and support networks.
            </p>
            <div className="mt-10 flex flex-wrap items-center justify-center gap-4 sm:gap-6">
              <Link
                to="/contact"
                className="w-full sm:w-auto rounded-xl bg-forest px-6 py-4 text-base font-semibold text-white shadow-md hover:bg-forest-dark transition-all transform hover:-translate-y-0.5"
              >
                Schedule Consultation
              </Link>
              <Link
                to="/courses"
                className="w-full sm:w-auto rounded-xl border-2 border-forest/20 px-6 py-3.5 text-base font-semibold text-forest hover:bg-forest/5 transition-all"
              >
                Explore Online Courses
              </Link>
            </div>
            <div className="mt-8 flex items-center justify-center gap-6 text-xs font-semibold text-brown-warm tracking-wider uppercase">
              <span>✓ Evidence-Based (ERP)</span>
              <span>•</span>
              <span>✓ Neurodivergent-Affirming</span>
              <span>•</span>
              <span>✓ Holistic & Integrated</span>
            </div>
          </div>
        </div>
      </section>

      {/* Trust & Credibility Section (Intro about Woodland Acres) */}
      <section className="py-16 sm:py-24 bg-white border-y border-forest/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-5 relative">
              <div className="aspect-[4/5] rounded-3xl bg-cream border border-forest/10 p-4 shadow-xl overflow-hidden flex flex-col justify-between">
                <div className="flex justify-between items-start">
                  <span className="text-xs font-bold uppercase tracking-widest text-brown-warm">Our Sanctuary</span>
                  <svg className="h-8 w-8 text-forest" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2L2 22h20L12 2z" />
                  </svg>
                </div>
                <div className="my-auto space-y-4 px-4 text-center">
                  <p className="font-serif text-2xl italic text-forest-dark">
                    "Healing happens when we stop trying to fit into standard molds and start honoring our unique cognitive architecture."
                  </p>
                  <p className="text-xs font-bold text-gray-500 uppercase tracking-wide">
                    — Woodland Acres Therapy Philosophy
                  </p>
                </div>
                <div className="bg-forest/5 p-4 rounded-2xl border border-forest/10 text-center text-xs font-semibold text-forest">
                  Virtual-First Practice • Serving WI & MI virtually
                </div>
              </div>
            </div>

            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
                Why "Woodland Acres"?
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
                Traditional therapy can sometimes feel sterile, overly clinical, and isolated to a single 50-minute session a week. 
                At Woodland Acres Therapy, we believe true therapeutic progress requires <strong>integration, education, and community</strong>. 
                Our name evokes a sanctuary — a grounded, woodsy environment where you can slow down, parse complex thoughts, 
                and receive thoughtful, evidence-based care.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
                Whether you are navigating severe OCD and require Exposure and Response Prevention (ERP), seeking neurodivergent-affirming 
                strategies for ADHD or Autism, or grappling with the profound emotional grief of chronic physical illness, we provide 
                a single practice that serves both your clinical needs and your desire for deep, life-altering skills.
              </p>
              <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex gap-3 items-start">
                  <div className="rounded-lg bg-forest/10 p-1.5 text-forest">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Specialty Focus</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Deep expertise across many areas.</p>
                  </div>
                </div>
                <div className="flex gap-3 items-start">
                  <div className="rounded-lg bg-forest/10 p-1.5 text-forest">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 text-sm">Integrated Model</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Coursework, groups, and individual therapy.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Three Pillars (Our Model) */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              A Complete Ecosystem of Healing
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              We move beyond the limits of once-weekly therapy by integrating three powerful, interconnected modalities:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Pillar 1 */}
            <div className="bg-white rounded-2xl p-8 border border-forest/10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest mb-6">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">1. One-on-One Therapy</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Specialized clinical therapy tailored to your specific mind. We utilize highly effective, gold-standard modalities, 
                  primarily Exposure and Response Prevention (ERP), Acceptance and Commitment Therapy (ACT), and neurodivergent-affirming 
                  cognitive behavioral therapies.
                </p>
              </div>
              <Link to="/services" className="text-xs font-bold text-forest hover:text-forest-dark uppercase tracking-wider flex items-center gap-1">
                Therapy Details →
              </Link>
            </div>

            {/* Pillar 2 */}
            <div className="bg-white rounded-2xl p-8 border border-forest/10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest mb-6">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">2. Structured Courses</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Our practice runs an integrated online school. These are structured, academic-grade psychoeducational 
                  courses complete with video lectures, reading materials, homework sheets, and digital portal dashboards. Learn the 
                  essential mechanics of ERP or neurodivergent relationship dynamics at your own pace.
                </p>
              </div>
              <Link to="/courses" className="text-xs font-bold text-forest hover:text-forest-dark uppercase tracking-wider flex items-center gap-1">
                Explore Courses →
              </Link>
            </div>

            {/* Pillar 3 */}
            <div className="bg-white rounded-2xl p-8 border border-forest/10 shadow-lg hover:shadow-xl transition-all flex flex-col justify-between">
              <div>
                <div className="h-12 w-12 rounded-xl bg-forest/10 flex items-center justify-center text-forest mb-6">
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-serif font-bold text-gray-900 mb-3">3. Facilitated Groups</h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Therapy should not be a lonely pursuit. Our facilitated support groups unite course participants and clients, 
                  creating a powerful space for collective integration, peer support, and weekly live discussions. Connect with 
                  others who truly speak your language.
                </p>
              </div>
              <Link to="/groups" className="text-xs font-bold text-forest hover:text-forest-dark uppercase tracking-wider flex items-center gap-1">
                See Active Groups →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Specialty Clinical Areas */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              Our Clinical Specialty Areas
            </h2>
            <p className="mt-4 text-base sm:text-lg text-gray-600">
              I work with a wide range of concerns, with particular depth and training in areas such as OCD, ADHD, autism,
                            chronic illness, grief, trauma, and life transitions. My goal is to meet you where you are
                            and provide the care that fits your unique needs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Specialty 1 */}
            <div className="bg-cream/40 rounded-2xl p-6 border border-forest/10 hover:border-forest hover:bg-[#F5F0E8] transition-all group flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-brown-warm uppercase tracking-wider block mb-2">01 / OCD Specialist</span>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 group-hover:text-forest transition-colors">
                  OCD & ERP Therapy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Exposure and Response Prevention (ERP) is the gold standard for OCD. We walk step-by-step with you through structured 
                  exposures to reclaim your life from debilitating compulsions, obsessions, and intrusive thoughts.
                </p>
              </div>
              <Link to="/services/ocd" className="text-xs font-bold text-forest flex items-center gap-1">
                ERP Treatment Details →
              </Link>
            </div>

            {/* Specialty 2 */}
            <div className="bg-cream/40 rounded-2xl p-6 border border-forest/10 hover:border-forest hover:bg-[#F5F0E8] transition-all group flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-brown-warm uppercase tracking-wider block mb-2">02 / Neurodivergent-Affirming</span>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 group-hover:text-forest transition-colors">
                  ADHD & Autism Care
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  We reject pathologizing models of neurodivergence. We focus on affirming ADHD and Autistic profiles, building 
                  executive functioning strategies, navigating autistic burnout, and addressing masking and sensory needs.
                </p>
              </div>
              <Link to="/services/neurodivergent" className="text-xs font-bold text-forest flex items-center gap-1">
                Neurodivergent Services →
              </Link>
            </div>

            {/* Specialty 3 */}
            <div className="bg-cream/40 rounded-2xl p-6 border border-forest/10 hover:border-forest hover:bg-[#F5F0E8] transition-all group flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-brown-warm uppercase tracking-wider block mb-2">03 / Mind-Body Integration</span>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 group-hover:text-forest transition-colors">
                  Chronic Illness Support
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  The psychological burden of chronic pain, autoimmune diagnoses, and neurological conditions is profound. We help 
                  you navigate medical grief, manage nervous system dysregulation, and re-establish a sense of agency.
                </p>
              </div>
              <Link to="/services/chronic-illness" className="text-xs font-bold text-forest flex items-center gap-1">
                Chronic Illness Details →
              </Link>
            </div>

            {/* Specialty 4 */}
            <div className="bg-cream/40 rounded-2xl p-6 border border-forest/10 hover:border-forest hover:bg-[#F5F0E8] transition-all group flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-brown-warm uppercase tracking-wider block mb-2">04 / General & Couples</span>
                <h3 className="text-lg font-serif font-bold text-gray-900 mb-3 group-hover:text-forest transition-colors">
                  Individual Therapy
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed mb-6">
                  Evidence-based therapy for adults dealing with life transitions, relational trauma, chronic stress, or high-achieving 
                  anxiety, with a special emphasis on relationship mechanics for neurodivergent partners.
                </p>
              </div>
              <Link to="/services/individual-therapy" className="text-xs font-bold text-forest flex items-center gap-1">
                Individual Therapy →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Callout */}
      <section className="py-20 bg-cream/60 border-t border-forest/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-4 space-y-6">
              <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block">Online School Spotlight</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
                Academic Skills for Real-Life Healing
              </h2>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                We believe you shouldn't have to wait for your therapy session to learn core clinical models. 
                Our online school houses beautiful, self-paced, academic-level programs containing step-by-step videos 
                and assignments.
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                Clients who combine their weekly sessions with these structured courses experience faster, 
                more resilient breakthroughs.
              </p>
              <Link
                to="/courses"
                className="inline-flex rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
              >
                Browse All Courses
              </Link>
            </div>

            <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Featured Course 1 */}
              <div className="bg-white rounded-2xl p-6 border border-forest/10 shadow-md flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center rounded-md bg-forest/5 px-2.5 py-0.5 text-xs font-semibold text-forest mb-4">
                    Clinical Program
                  </span>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">ERP Mechanics for Severe OCD</h3>
                  <p className="text-xs text-gray-500 mb-4">6 Modules • Video lectures • Digital worksheets • Group Integration</p>
                  <p className="text-sm text-gray-600 mb-6">
                    A clinical-grade, step-by-step masterclass in Exposure and Response Prevention. Master the physiology of anxiety, 
                    design your own custom hierarchy, and systematically practice habituation and inhibitory learning.
                  </p>
                </div>
                <Link
                  to="/courses/ocd-course"
                  className="text-xs font-bold text-forest hover:underline flex items-center gap-1"
                >
                  View ERP Course Details →
                </Link>
              </div>

              {/* Featured Course 2 */}
              <div className="bg-white rounded-2xl p-6 border border-forest/10 shadow-md flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center rounded-md bg-forest/5 px-2.5 py-0.5 text-xs font-semibold text-forest mb-4">
                    Relational Skills
                  </span>
                  <h3 className="text-xl font-serif font-bold text-gray-900 mb-2">Neurodivergent Relationship Dynamics</h3>
                  <p className="text-xs text-gray-500 mb-4">4 Modules • Skill-building exercises • Partner Guides</p>
                  <p className="text-sm text-gray-600 mb-6">
                    A warm, practical, neurodivergent-affirming guide for ADHD/Autistic individuals and their partners. Learn 
                    neuro-inclusive communication patterns, sensory negotiation, executive dysfunction strategies, and emotional intimacy.
                  </p>
                </div>
                <Link
                  to="/courses/neurodivergent-relationships"
                  className="text-xs font-bold text-forest hover:underline flex items-center gap-1"
                >
                  View Relational Course Details →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section (Consultation) */}
      <section className="bg-forest py-20 text-[#F5F0E8] text-center relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 bg-[radial-gradient(#5B8C5A_1px,transparent_1px)] [background-size:16px_16px] opacity-15" />
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-8">
          <h2 className="text-3xl sm:text-5xl font-serif font-bold leading-tight">
            Ready to Begin Your Woodland Journey?
          </h2>
          <p className="text-base sm:text-lg text-[#F5F0E8]/85 max-w-2xl mx-auto leading-relaxed font-sans">
            It starts with a simple consultation. We'll discuss your clinical needs, 
            explain how our online courses and support groups integrate with individual therapy, and verify your 
            insurance details.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/contact"
              className="rounded-xl bg-[#F5F0E8] px-6 py-4 text-base font-semibold text-forest shadow-lg hover:bg-white transition-all transform hover:-translate-y-0.5"
            >
              Book Consultation
            </Link>
            <Link
              to="/portal"
              className="rounded-xl border border-[#F5F0E8]/40 px-6 py-3.5 text-base font-semibold text-[#F5F0E8] hover:bg-forest-light/20 transition-all"
            >
              Access Client Portal
            </Link>
          </div>
          <div className="text-xs text-[#F5F0E8]/70 flex flex-wrap items-center justify-center gap-4">
            <span>In-Network with Aetna, BlueCross, Cigna</span>
            <span>•</span>
            <span>Self-Pay Superbills Provided</span>
            <span>•</span>
            <span>Wisconsin & Michigan Residents Only</span>
          </div>
        </div>
      </section>
    </div>
  );
}
