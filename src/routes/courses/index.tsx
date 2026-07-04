import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/")({
  component: CoursesIndex,
});

function CoursesIndex() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block mb-3">Woodland Acres Online School</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Therapeutic Online Courses & Programs
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            We operate our practice like an online academy, offering a structured service ladder to meet your unique clinical, community, and vocational needs.
          </p>
        </div>
      </section>

      {/* Our Integrated Model */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-cream/40 border border-forest/10 rounded-3xl p-8 sm:p-12 shadow-md max-w-4xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 mb-6 text-center">
              Our Integrated Service Ladder
            </h2>
            <p className="text-sm text-gray-600 font-sans leading-relaxed text-center mb-8 max-w-2xl mx-auto col-span-2">
              We combine traditional one-on-one therapy with structured online coursework and facilitated support groups. This integrated model provides you with deep tools and worksheets to accelerate your healing journey while ensuring high-margin sessions focus on personal blockages.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-sm text-gray-600 font-sans">
              <p className="leading-relaxed">
                <strong>Why Combine Therapy with Coursework?</strong> In standard weekly counseling, precious time is often consumed by 'teaching' basic psychological concepts or explaining cognitive mechanisms. By housing these dense, core educational modules in a digital format, you can digest the material at your own pace, on your own schedule.
              </p>
              <p className="leading-relaxed">
                <strong>Maximizing Outpatient Efficacy:</strong> This frees up our high-margin, one-on-one therapy sessions to focus exclusively on your highly personal triggers, nuanced emotional blocks, and targeted clinical processing. Combined with our weekly peer support groups, this model fosters significantly faster and more sustainable breakthroughs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-16 bg-[#F5F0E8] border-t border-forest/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 max-w-4xl mx-auto">
            
            {/* 1. Premium 10-Week OCD Recovery Program (Featured) */}
            <div className="bg-white rounded-3xl p-8 border-2 border-forest shadow-2xl flex flex-col md:flex-row justify-between gap-8 hover:shadow-forest/10 transition-all relative overflow-hidden">
              <div className="absolute top-0 right-0 bg-forest text-[#F5F0E8] text-[10px] font-bold uppercase tracking-wider px-4 py-1.5 rounded-bl-xl">
                Featured Program
              </div>
              
              {/* Course Info */}
              <div className="space-y-4 flex-grow md:max-w-2xl">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-semibold bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded-md">
                    Clinical Program
                  </span>
                  <span className="text-[10px] font-semibold bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded-md">
                    High-Support Track
                  </span>
                  <span className="text-[10px] font-semibold bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded-md">
                    OCD Focus
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">Premium 10-Week OCD Recovery Program</h3>
                  <p className="text-sm font-semibold text-forest mt-1">Our flagship, highly cohesive recovery experience</p>
                </div>
                <p className="text-xs text-brown-warm font-semibold tracking-wider uppercase">10 Weeks • Intensive Care • Individual + Group + Curriculum</p>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  This is a <strong>comprehensive virtual OCD recovery program</strong> designed for clients seeking structured, evidence-based treatment rather than standard weekly outpatient therapy. We combine high-support clinical guidance with peer integration and serverless education.
                </p>
                
                <div className="space-y-2 pt-2">
                  <h4 className="text-xs font-bold text-gray-900 uppercase tracking-wider">What the program includes:</h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-1.5 text-xs text-gray-600 font-sans">
                    <li className="flex items-center gap-2">
                      <span className="text-forest font-bold">✔</span>
                      <span>10 weekly individual therapy sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-forest font-bold">✔</span>
                      <span>10 weekly therapist-led group sessions</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-forest font-bold">✔</span>
                      <span>Full 10-week structured online course</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-forest font-bold">✔</span>
                      <span>Worksheets & exposure-planning tools</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-forest font-bold">✔</span>
                      <span>Progress monitoring & accountability</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-forest font-bold">✔</span>
                      <span>Support for scrupulosity, ADHD, & hEDS</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Enrollment Widget */}
              <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Total Program Tuition</span>
                  <p className="text-xl sm:text-2xl font-bold text-gray-950 font-serif">$3,500</p>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    Structured payment plan options are available. Inquire to join the upcoming cohort.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    to="/contact"
                    className="block text-center w-full rounded-xl bg-forest px-4 py-3 text-sm font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
                  >
                    Apply to Program
                  </Link>
                </div>
              </div>
            </div>

            {/* 2. Self-Paced OCD Course */}
            <div className="bg-white rounded-3xl p-8 border border-forest/10 shadow-xl flex flex-col md:flex-row justify-between gap-8 hover:border-forest transition-all">
              {/* Course Info */}
              <div className="space-y-4 flex-grow md:max-w-2xl">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-semibold bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded-md">
                    Educational Resource
                  </span>
                  <span className="text-[10px] font-semibold bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded-md">
                    Self-Paced
                  </span>
                  <span className="text-[10px] font-semibold bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded-md">
                    ERP & I-CBT Mechanics
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">Self-Paced OCD Course</h3>
                  <p className="text-sm font-semibold text-forest mt-1">ERP Mechanics for Severe OCD</p>
                </div>
                <p className="text-xs text-brown-warm font-semibold tracking-wider uppercase">6 Modules • 18 Video Lectures • 12 Worksheets</p>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  For individuals who want deep access to evidence-based clinical guides and tools but cannot participate in active therapy or groups. Emphasizes support for diverse OCD presentations including neurodivergence, chronic illness, and scrupulosity, while remaining welcoming to anyone struggling with OCD.
                </p>
                
                <div className="bg-cream/30 border border-forest/5 rounded-2xl p-4 space-y-2">
                  <p className="text-xs text-gray-600 font-sans leading-relaxed">
                    <strong>Includes:</strong> All 6 educational modules, video lectures, downloadable worksheets, exposure planning, ACT/ERP/I-CBT concepts.
                  </p>
                  <p className="text-xs text-brown-warm font-sans leading-relaxed">
                    <strong>Does NOT include:</strong> Individual therapy, group participation, coaching, crisis support, or a therapeutic relationship.
                  </p>
                  <p className="text-xs font-semibold text-brown-warm leading-relaxed border-t border-forest/5 pt-2">
                    ⚠ Disclaimer: This is an educational resource only and not a substitute for mental health treatment.
                  </p>
                </div>
              </div>

              {/* Enrollment Widget */}
              <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Course Tuition</span>
                  <p className="text-xl font-bold text-gray-950 font-serif">$299</p>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    Complete self-paced access. No therapeutic relationship included.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    to="/courses/ocd-course"
                    className="block text-center w-full rounded-xl bg-forest px-4 py-3 text-sm font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
                  >
                    View Syllabus Details
                  </Link>
                </div>
              </div>
            </div>

            {/* 3. Neurodivergent Relationship Dynamics */}
            <div className="bg-white rounded-3xl p-8 border border-forest/10 shadow-xl flex flex-col md:flex-row justify-between gap-8 hover:border-forest transition-all">
              {/* Course Info */}
              <div className="space-y-4 flex-grow md:max-w-2xl">
                <div className="flex flex-wrap gap-2">
                  <span className="text-[10px] font-semibold bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded-md">
                    Relational Skills
                  </span>
                  <span className="text-[10px] font-semibold bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded-md">
                    ADHD & Autism
                  </span>
                  <span className="text-[10px] font-semibold bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded-md">
                    Double Empathy
                  </span>
                </div>
                <div>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">Neurodivergent Relationship Dynamics</h3>
                  <p className="text-sm font-semibold text-forest mt-1">A neuro-affirming guide to communication, division of labor, and intimacy</p>
                </div>
                <p className="text-xs text-brown-warm font-semibold tracking-wider uppercase">4 Modules • 12 Video Lectures • 8 Relationship Guides</p>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  A warm, practical guide for couples where one or both partners are ADHD or Autistic. Move beyond neurotypical assumptions to explore sensory safety, non-pathologizing communication loops, RSD support, and equitable task divisions.
                </p>
              </div>

              {/* Enrollment Widget */}
              <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                <div className="space-y-2">
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Course Tuition</span>
                  <p className="text-xl font-bold text-gray-950 font-serif">$199</p>
                  <p className="text-xs text-gray-500 leading-relaxed font-sans">
                    Complete self-paced access to all 4 modules and relationship guides.
                  </p>
                </div>
                <div className="pt-6">
                  <Link
                    to="/courses/neurodivergent-relationships"
                    className="block text-center w-full rounded-xl bg-forest px-4 py-3 text-sm font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
                  >
                    View Syllabus Details
                  </Link>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-forest py-16 text-[#F5F0E8] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-serif font-bold">Have questions about our online courses?</h2>
          <p className="text-base text-[#F5F0E8]/90 max-w-xl mx-auto leading-relaxed font-sans">
            Whether you want to enroll as a self-paced learner, join a facilitated peer support group, or integrate these courses with individual therapy, let's schedule a free consult.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="rounded-xl bg-[#F5F0E8] px-6 py-3.5 text-base font-semibold text-forest shadow-md hover:bg-white transition-colors"
            >
              Ask a Course Question
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
