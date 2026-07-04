import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/ocd-course")({
  component: OcdCourseDetails,
});

function OcdCourseDetails() {
  const modules = [
    {
      num: "01",
      title: "The Neurobiology of False Alarms",
      topics: [
        "The anatomy of the OCD brain (amygdala, OFC, and basal ganglia)",
        "Why logical thinking cannot solve an intrusive thought alarm",
        "The physics of anxiety: adrenaline, heart rate, and natural regulation"
      ],
      desc: "We begin by demystifying the biology of your anxiety. You'll learn exactly why your brain fires off intense panic alarms regarding harmless thoughts, and why attempting to 'think your way out' of a thought only keeps you stuck."
    },
    {
      num: "02",
      title: "The Mechanics of ERP & Inhibitory Learning",
      topics: [
        "The classic Habituation model vs. modern Inhibitory Learning theory",
        "The 'Exposure' component: entering the fear zone",
        "The 'Response Prevention' component: refusing the security safety blanket"
      ],
      desc: "Learn the core therapeutic equations that break OCD. We explore why entering triggering environments (Exposure) while actively refusing to perform physical or mental rituals (Response Prevention) retrains your brain's alarm system."
    },
    {
      num: "03",
      title: "Mapping Your Mind: Constructing the Hierarchy",
      topics: [
        "Identifying physical, avoidance, and mental compulsions",
        "Using the SUDS (Subjective Units of Distress Scale) from 0 to 100",
        "Designing gradual, collaborative exposure steps"
      ],
      desc: "You will construct your custom exposure roadmap. We teach you how to catalog your intrusive thoughts and compulsions, rank your triggers systematically, and select low-level exposures to begin practicing with absolute safety."
    },
    {
      num: "04",
      title: "Practicing In-Vivo (Real Life) Exposures",
      topics: [
        "Step-by-step physical exposure protocols",
        "How to sit with distress without checking, cleaning, or tapping",
        "Tracking your exposure response patterns in the client portal"
      ],
      desc: "We dive into the physical practice. You will receive precise video guidance on how to systematically approach touch, contamination, checking, or ordering triggers in your home and work life, tracking your somatic settling in real time."
    },
    {
      num: "05",
      title: "Disarming Mental Compulsions & Reassurance",
      topics: [
        "Identifying mental reassurance, rumination, and neutralizing",
        "The danger of asking family members for reassurance",
        "Drafting and recording custom Imaginal Exposure scripts"
      ],
      desc: "Mental compulsions (such as praying, repeating phrases, or checking your memory) are often harder to catch than physical rituals. We teach you how to spot and stop mental reassurance-seeking and construct imaginal exposure scenarios for your deepest fears."
    },
    {
      num: "06",
      title: "Sustaining Recovery & Tolerating Uncertainty",
      topics: [
        "How to manage slip-ups and prevent full relapse",
        "Making friends with uncertainty (the ultimate OCD cure)",
        "Transitioning from symptom tracking to values-driven living"
      ],
      desc: "OCD is a chronic condition, but it does not have to run your life. We focus on long-term sustainability: how to identify early slip-ups, apply ERP protocols instantly, and cultivate a deep, joyful comfort with life's ultimate uncertainties."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Course Hero Banner */}
      <section className="py-16 sm:py-24 bg-[#ECE5D8] border-b border-forest/10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl space-y-6">
            <Link to="/courses" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline flex items-center gap-1">
              ← Back to Courses
            </Link>
            <span className="inline-flex items-center rounded-md bg-forest/10 px-2.5 py-0.5 text-xs font-semibold text-forest uppercase tracking-wide">
              Course Syllabus
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
              ERP Mechanics for Severe OCD
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-sans">
              A comprehensive, self-paced, academic-grade psychoeducational course mapping out the precise physiology, 
              mechanics, and custom roadmaps of Exposure and Response Prevention (ERP).
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-brown-warm uppercase tracking-wider">
              <span>6 Core Modules</span>
              <span>•</span>
              <span>18 Video Lectures</span>
              <span>•</span>
              <span>Interactive Digital Worksheets</span>
              <span>•</span>
              <span>Included in Clinical Recovery Program</span>
            </div>
          </div>
        </div>
      </section>

      {/* Course Highlights Widget */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Syllabus */}
            <div className="lg:col-span-8 space-y-10">
              <h2 className="text-3xl font-serif font-bold text-gray-900">Course Syllabus Details</h2>
              <div className="space-y-8">
                {modules.map((mod) => (
                  <div key={mod.num} className="border-l-2 border-forest pl-6 py-1 space-y-3 relative">
                    <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-forest border-4 border-white" />
                    <span className="text-xs font-bold text-brown-warm uppercase tracking-wider">Module {mod.num}</span>
                    <h3 className="text-xl font-serif font-bold text-gray-900">{mod.title}</h3>
                    <p className="text-sm text-gray-650 leading-relaxed font-sans">{mod.desc}</p>
                    <div className="bg-cream/40 rounded-xl p-4 border border-forest/5 mt-2">
                      <h4 className="text-xs font-bold text-forest uppercase tracking-wider mb-2">Key Topics Taught:</h4>
                      <ul className="list-disc pl-4 text-xs text-gray-750 space-y-1.5">
                        {mod.topics.map((topic, i) => (
                          <li key={i}>{topic}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price / Enrollment Box */}
            <div className="lg:col-span-4 sticky top-28 space-y-6 font-sans">
              {/* Disclaimer Box */}
              <div className="rounded-2xl border-2 border-brown-warm/30 p-5 bg-amber-50/50 space-y-2 text-xs text-amber-900 shadow-sm leading-relaxed">
                <span className="font-bold uppercase tracking-wider block text-brown-warm">⚠ Clinical Disclaimer</span>
                <p>
                  This course is an <strong>educational resource only</strong> and not a substitute for professional mental health treatment. If you are in crisis, please call <strong>988</strong> or contact emergency services immediately.
                </p>
              </div>

              {/* Purchase Options Card */}
              <div className="rounded-3xl border border-forest/15 p-6 bg-cream shadow-xl space-y-6">
                <h4 className="font-serif text-base font-bold text-gray-900 border-b border-forest/10 pb-2">Program Pathways</h4>
                
                {/* Option 1: Self-Paced Course */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-gray-500 uppercase tracking-wider block">Path A: Self-Paced Course</span>
                  <p className="text-2xl font-bold text-gray-950 font-serif">$299</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    Access to all 18 video lectures, worksheets, and custom hierarchies in the portal.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/portal"
                      className="block text-center w-full rounded-xl bg-forest py-2.5 text-xs font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
                    >
                      Enroll in Self-Paced Course
                    </Link>
                  </div>
                </div>

                <hr className="border-forest/10" />

                {/* Option 2: 10-Week Program */}
                <div className="space-y-2">
                  <span className="text-[10px] font-bold text-forest uppercase tracking-wider block">Path B: Premium 10-Week Recovery</span>
                  <p className="text-sm font-semibold text-gray-500">Includes this course + individual therapy + group</p>
                  <p className="text-xs text-gray-600 leading-relaxed">
                    A comprehensive, therapist-guided recovery program. Tuition is <strong>$3,500</strong> with payment plans available.
                  </p>
                  <div className="pt-2">
                    <Link
                      to="/contact"
                      className="block text-center w-full rounded-xl border border-forest/20 bg-white py-2.5 text-xs font-semibold text-forest hover:bg-forest/5 transition-colors shadow-sm"
                    >
                      Learn More & Apply
                    </Link>
                  </div>
                </div>
              </div>

              {/* Group callout */}
              <div className="rounded-2xl border border-forest/10 p-6 bg-white text-center space-y-3">
                <h4 className="font-serif text-md font-bold text-gray-900">Weekly OCD Support Group</h4>
                <p className="text-xs text-gray-650 leading-relaxed font-sans">
                  The weekly group integration lounge is included as an active component of the <strong>Premium 10-Week OCD Recovery Program</strong> to practice exposures alongside peers under therapist guidance.
                </p>
                <Link to="/groups" className="inline-block text-xs font-bold text-forest uppercase tracking-wider hover:underline">
                  Support Group Details →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-forest py-16 text-[#F5F0E8] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-serif font-bold">Begin your exposure journey today.</h2>
          <p className="text-base text-[#F5F0E8]/90 max-w-xl mx-auto leading-relaxed font-sans">
            Whether you want to learn independently as a self-paced student, or combine this course with specialized, 
            one-on-one therapy, let's establish your path to freedom.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="rounded-xl bg-[#F5F0E8] px-6 py-3.5 text-base font-semibold text-forest shadow-md hover:bg-white transition-colors"
            >
              Consult an ERP Specialist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
