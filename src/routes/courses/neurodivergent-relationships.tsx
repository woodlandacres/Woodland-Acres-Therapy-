import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/neurodivergent-relationships")({
  component: NeurodivergentRelationshipsCourseDetails,
});

function NeurodivergentRelationshipsCourseDetails() {
  const syllabus = [
    {
      num: "01",
      title: "The Neurodivergent Relationship Lens",
      topics: [
        "Deconstructing the 'Double Empathy Problem' in relationships",
        "Understanding Autistic and ADHD attachment and communication profiles",
        "How neurotypical advice can unintentionally damage neurodivergent relationships"
      ],
      desc: "We establish a non-pathologizing foundation. You will learn how Autistic and ADHD brains connect, express intimacy, and process emotions. We explore why standard, neurotypical relationship advice often backfires, and how to define your relationship on your own terms."
    },
    {
      num: "02",
      title: "Neuro-Inclusive Communication & RSD",
      topics: [
        "Navigating RSD (Rejection Sensitive Dysphoria) during conflict",
        "Handling cognitive processing delays and verbal shutdowns",
        "Moving beyond traditional 'I' statements to direct, explicit communication"
      ],
      desc: "Conflict in neurodivergent relationships is often amplified by sensory overload or intense rejection sensitivity (RSD). We provide concrete verbal scripts and nervous system strategies to navigate arguments, accommodate processing delays, and avoid the dread loop of defensiveness."
    },
    {
      num: "03",
      title: "Sensory Safety & Co-Regulation",
      topics: [
        "Conducting a couple's sensory audit (sound, light, touch, temperature)",
        "Managing different sensory profiles (sensory seeking vs. sensory avoiding)",
        "Creating structured 'non-verbal' connection times and sensory quiet zones"
      ],
      desc: "Sensory differences can lead to chronic, unseen irritation in a shared home. We guide you through a complete sensory audit of your shared spaces, helping you design boundaries that allow one partner to decompress in silence while the other seeks stimulation."
    },
    {
      num: "04",
      title: "Executive Flow: Chores, Spoons, and Labor",
      topics: [
        "Deconstructing the exhausting 'parent-child' dynamic in ADHD relationships",
        "Applying 'Spoon Theory' to division of household labor",
        "Designing collaborative, visual chore boards that honor executive function"
      ],
      desc: "Executive dysfunction is a frequent battleground for couples. We help you systematically dismantle the painful 'nagging' or 'parent-child' dynamic. We teach you how to divide chores according to cognitive interest and daily energy reserves (spoons), utilizing highly visual, neuro-friendly tracking systems."
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
              Relational Skills
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
              Neurodivergent Relationship Dynamics
            </h1>
            <p className="text-lg sm:text-xl text-gray-700 leading-relaxed font-sans">
              A practical, neuro-affirming guide to communication, co-regulation, division of labor, and intimacy 
              for ADHD/Autistic individuals and their partners.
            </p>
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-brown-warm uppercase tracking-wider">
              <span>4 Core Modules</span>
              <span>•</span>
              <span>12 Video Lectures</span>
              <span>•</span>
              <span>8 Relationship Worksheets & Guides</span>
              <span>•</span>
              <span>Couples & Individuals Welcomed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Syllabus Grid */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            
            {/* Syllabus Modules */}
            <div className="lg:col-span-8 space-y-10">
              <h2 className="text-3xl font-serif font-bold text-gray-900">Course Syllabus</h2>
              <div className="space-y-8">
                {syllabus.map((mod) => (
                  <div key={mod.num} className="border-l-2 border-forest pl-6 py-1 space-y-3 relative">
                    <span className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-forest border-4 border-white" />
                    <span className="text-xs font-bold text-brown-warm uppercase tracking-wider">Module {mod.num}</span>
                    <h3 className="text-xl font-serif font-bold text-gray-900">{mod.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-sans">{mod.desc}</p>
                    <div className="bg-cream/40 rounded-xl p-4 border border-forest/5 mt-2">
                      <h4 className="text-xs font-bold text-forest uppercase tracking-wider mb-2">Key Worksheets & Guides Taught:</h4>
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

            {/* Pricing Box Sticky */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="rounded-3xl border border-forest/15 p-6 bg-cream shadow-xl space-y-6">
                <div className="space-y-1.5 text-center border-b border-forest/10 pb-4">
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-wider">Tuition Enrollment</span>
                  <p className="text-3xl font-bold text-gray-950 font-serif">$199.00 USD</p>
                  <p className="text-xs text-forest font-semibold mt-1 font-sans">Included FREE for all practice therapy clients</p>
                </div>

                <div className="space-y-4">
                  <h4 className="font-serif text-sm font-bold text-gray-900">What's Included with Enrollment:</h4>
                  <ul className="space-y-3 text-xs text-gray-600">
                    <li className="flex items-start gap-2.5">
                      <span className="text-forest mt-0.5">✔</span>
                      <span>Lifetime access for BOTH partners under a single tuition fee</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-forest mt-0.5">✔</span>
                      <span>12 self-paced video lectures detailing neuro-inclusive techniques</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-forest mt-0.5">✔</span>
                      <span>8 printable couple's sensory and division-of-labor worksheets</span>
                    </li>
                    <li className="flex items-start gap-2.5">
                      <span className="text-forest mt-0.5">✔</span>
                      <span>Access to our facilitated weekly relationship support integration calls</span>
                    </li>
                  </ul>
                </div>

                <div className="pt-2">
                  <Link
                    to="/portal"
                    className="block text-center w-full rounded-xl bg-forest py-3.5 text-sm font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
                  >
                    Enroll via Client Portal
                  </Link>
                </div>
              </div>

              {/* Group callout */}
              <div className="rounded-2xl border border-forest/10 p-6 bg-white text-center space-y-3">
                <h4 className="font-serif text-md font-bold text-gray-900">Facilitated Couples Groups</h4>
                <p className="text-xs text-gray-650 leading-relaxed font-sans">
                  Connect with other neuro-diverse couples in our structured, clinical-grade support groups to validate experiences and 
                  troubleshoot division of labor or communication systems.
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
          <h2 className="text-3xl font-serif font-bold">Build a secure, neuro-affirming relationship.</h2>
          <p className="text-base text-[#F5F0E8]/90 max-w-xl mx-auto leading-relaxed font-sans">
            You don't have to navigate relationship friction using tools that don't fit your wiring. 
            Book a consultation to explore our therapeutic course options.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="rounded-xl bg-[#F5F0E8] px-6 py-3.5 text-base font-semibold text-forest shadow-md hover:bg-white transition-colors"
            >
              Consult a Relationship Specialist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
