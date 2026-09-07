import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/courses/ptsd-recovery-workbook")({
  component: PTSDWorkbookView,
});

function PTSDWorkbookView() {
  const sections = [
    {
      num: "1",
      title: "Introduction & Welcome",
      topics: [
        "What this workbook is and isn't: setting healthy clinical boundaries",
        "Permission Slip for the Reader: taking healing at your own pace",
        "The Neuroscience of Trauma: Amygdala (the Smoke Alarm), Hippocampus (the Timekeeper), and Prefrontal Cortex (the Wise Conductor)",
        "The Window of Tolerance: navigating hyper-arousal (panic/tension) and hypo-arousal (numbness/shutdown)"
      ],
      activity: "Activity 1.1: Mapping My Autonomic States (identifying physical cues, thoughts, and behaviors)"
    },
    {
      num: "2",
      title: "Understanding Your Trauma Story",
      topics: [
        "Validation across diverse trauma profiles (medical trauma, moral injury, childhood relational trauma, spiritual abuse)",
        "Case studies: Elena, Marcus, Chloe, and Sam",
        "Understanding that trauma is not defined by the event, but by the nervous system's survival response"
      ],
      activity: "Activity 2.1: Mapping My Unique Trauma Story (externalizing the narrative with somatic check-ins)"
    },
    {
      num: "3",
      title: "Safety & Stabilization (Phase 1)",
      topics: [
        "The absolute priority of stabilization before processing trauma",
        "Somatic anchors for grounding: The 5-4-3-2-1 Sensory Method, Somatic Bilateral Tapping",
        "DBT Distress Tolerance: TIPP skills (Temperature, Intense Exercise, Paced Breathing, Paired Muscle Relaxation)"
      ],
      activity: "Activity 3.1 & 3.2: My Safety/Crisis Plan & Trigger Tracking with Curiosity"
    },
    {
      num: "4",
      title: "Processing the Trauma: Cognitive & Narrative Approaches",
      topics: [
        "Cognitive Stuck Points: identifying black-and-white thinking, safety assumptions, and self-blame",
        "Externalizing the trauma using Narrative Therapy",
        "Creating a safe space for narrative writing"
      ],
      activity: "Activity 4.1 & 4.2: Identifying Stuck Points & Characterizing the 'Overprotective Sentinel'"
    },
    {
      num: "5",
      title: "Facing Avoidance: Exposure-Based Work",
      topics: [
        "Why avoidance maintains trauma and shrinks our window of tolerance",
        "The Exposure Ladder: understanding Subjective Units of Distress (SUDs)",
        "Detailed guidelines for safe, graduated in-vivo (real-life) exposure"
      ],
      activity: "Activity 5.1: My Graduated Exposure Ladder & Critical Safety Warning for self-guided exposure"
    },
    {
      num: "6",
      title: "Art & Expression Prompts",
      topics: [
        "Expressing what words cannot capture using multi-modal creative outlets",
        "Somatic body mapping: visualizing emotions in physical space",
        "Identity reclamation through visual collage"
      ],
      activity: "Activity 6.1, 6.2 & 6.3: Somatic Body Mapping, Visual Journaling & Identity Collage"
    },
    {
      num: "7",
      title: "Spirituality, Meaning & Post-Traumatic Growth",
      topics: [
        "Active meaning-making vs. toxic positivity ('everything happens for a reason')",
        "The science of Post-Traumatic Growth (PTG) across five domains",
        "Reconnecting with existential foundations and core values"
      ],
      activity: "Activity 7.1 & 7.2: Reconnecting with Core Values & Reimagining Existential Faith"
    },
    {
      num: "8",
      title: "Relationships & Connection",
      topics: [
        "How trauma impacts attachment styles, trust, and co-regulation",
        "The Trauma-Informed Communication Blueprint: expressing somatic and emotional needs",
        "Boundary Mapping: reclaiming your 'No' as a tool for safety and intimacy"
      ],
      activity: "Activity 8.1 & 8.2: Rebuilding My Relational Blueprint & Boundary Designing"
    },
    {
      num: "9",
      title: "The Ongoing Journey",
      topics: [
        "Sustaining growth over the long term",
        "Relapse prevention, setback planning, and celebrating micro-wins",
        "Comprehensive trauma support directories and vetted crisis hotlines"
      ],
      activity: "Activity 9.1 & 9.2: Relapse Prevention Blueprint & Tracking My Micro-Wins"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E8]">
      {/* Hero Section */}
      <section className="py-20 sm:py-28 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none bg-[radial-gradient(#2D5A3D_1px,transparent_1px)] [background-size:16px_16px]"></div>
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8 relative z-10 space-y-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-forest/10 text-forest uppercase tracking-wider">
            ★ Self-Paced Educational Course
          </span>
          <h1 className="text-4xl sm:text-6xl font-serif font-bold text-gray-900 leading-tight tracking-tight max-w-4xl mx-auto">
            The Woodland Path
          </h1>
          <p className="text-xl sm:text-2xl font-serif text-brown-warm italic max-w-3xl mx-auto">
            A Multi-Modal, Self-Guided Workbook for Trauma Recovery & Post-Traumatic Growth
          </p>
          <p className="mt-4 text-base sm:text-lg text-gray-600 max-w-3xl mx-auto font-sans leading-relaxed">
            Written by the clinical team at Woodland Acres Therapy, LLC. A comprehensive, 60-page companion integrating evidence-based tools from Cognitive Behavioral Therapy (CBT), Dialectical Behavior Therapy (DBT), Cognitive Processing Therapy (CPT), Prolonged Exposure (PE), Narrative, and Expressive Arts therapies.
          </p>

          {/* Quick Actions */}
          <div className="pt-8 flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="https://buy.stripe.com/4gMeVd2ijdGbc4w0HR5kk02"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-forest px-8 py-4 text-base font-bold text-[#F5F0E8] shadow-md hover:bg-forest-dark transition-all transform hover:-translate-y-0.5"
            >
              Buy Now — $79
            </a>
            <Link
              to="/contact"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-forest/20 bg-white/60 backdrop-blur-sm px-8 py-4 text-base font-semibold text-forest shadow-sm hover:bg-white hover:border-forest/40 transition-all"
            >
              Schedule Clinical Consultation
            </Link>
          </div>
          <p className="text-xs text-gray-500 font-sans">
            Full course companion with lifetime self-paced access. Safe and secure checkout via Stripe.
          </p>
        </div>
      </section>

      {/* Prominent Clinical Disclaimer */}
      <section className="py-8 bg-white border-y border-forest/10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-l-4 border-amber-500 bg-amber-500/5 p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-2xl" aria-hidden="true">⚠️</span>
              <h2 className="text-lg font-serif font-bold text-gray-900 uppercase tracking-wide">
                Clinical Disclaimer & Boundary of Care
              </h2>
            </div>
            <div className="text-sm sm:text-base text-gray-700 font-sans space-y-3 leading-relaxed">
              <p>
                <strong>This workbook is a self-guided educational companion.</strong> It is designed to provide evidence-based, multi-modal clinical exercises to help you understand your nervous system and organize your healing process.
              </p>
              <p className="font-semibold text-gray-900">
                It is NOT a replacement for individual clinical therapy, medical advice, or psychiatric intervention.
              </p>
              <p>
                Trauma work can be emotionally intense, occasionally bringing up heavy memories or physical responses that feel destabilizing. If your distress levels spike consistently, if you experience severe dissociative episodes, or if you feel unsafe at any point, <strong>please close the workbook and seek the support of a licensed trauma-informed professional.</strong>
              </p>
              <p>
                If you are in Wisconsin or Michigan, you can contact Woodland Acres Therapy to establish an individualized clinical structure. If you are experiencing an immediate crisis, please utilize the crisis resources listed at the end of the document (or dial 988).
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Overview & Why It Was Written */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-12">
          {/* Main Description */}
          <div className="space-y-6">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              Why We Created This Companion
            </h2>
            <div className="text-base sm:text-lg text-gray-600 font-sans leading-relaxed space-y-4">
              <p>
                At Woodland Acres Therapy, we reject the notion that mental health care should be confined strictly to a weekly 50-minute clinical session. We believe in providing people with deep, structured tools that honor their autonomy, intellect, and unique capacity to navigate their own recovery.
              </p>
              <p>
                Trauma is not a thinking problem; it is a <strong>biological survival response</strong> that reshapes the nervous system, brain structures (the amygdala and hippocampus), and how we relate to the world. Healing from trauma requires a multi-modal approach—calming our biological smoke alarms (grounding and distress tolerance), cognitive reappraisal (addressing stuck points), and narrative externalization (reclaiming our stories).
              </p>
              <p>
                We compiled this comprehensive 60-page recovery guide and self-paced course to serve as a dense, high-utility reference manual. Whether you use it on your own as a self-paced journal, run through it alongside your therapist, or use it to explore your window of tolerance before embarking on structured trauma therapy, we hope it offers you a safe, grounded path forward.
              </p>
            </div>
          </div>

          <hr className="border-forest/10" />

          {/* Section-by-Section Breakdown */}
          <div className="space-y-8">
            <h2 className="text-3xl font-serif font-bold text-gray-900 text-center">
              What's Inside: The 9 Recovery Sections
            </h2>
            <p className="text-center text-gray-500 font-sans max-w-2xl mx-auto">
              Each section is designed to safely walk you through a specific phase of trauma recovery, offering both clinical science and concrete, interactive journaling exercises.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4">
              {sections.map((sec) => (
                <div key={sec.num} className="bg-[#F5F0E8] rounded-xl p-6 border border-forest/5 shadow-sm space-y-4 hover:border-forest/20 transition-all flex flex-col justify-between">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <span className="flex items-center justify-center w-8 h-8 rounded-full bg-forest text-[#F5F0E8] text-xs font-bold font-sans">
                        0{sec.num}
                      </span>
                      <h3 className="text-lg font-serif font-bold text-gray-900">
                        {sec.title}
                      </h3>
                    </div>
                    <ul className="list-disc pl-5 text-sm text-gray-600 font-sans space-y-2 leading-relaxed">
                      {sec.topics.map((topic, i) => (
                        <li key={i}>{topic}</li>
                      ))}
                    </ul>
                  </div>
                  <div className="bg-white/60 border border-forest/10 rounded-lg p-3 text-xs font-sans text-forest font-semibold mt-4">
                    📝 {sec.activity}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <hr className="border-forest/10" />

          {/* Somatic Safety Perm slip snippet */}
          <div className="bg-forest/5 rounded-2xl border border-forest/10 p-8 text-center space-y-4">
            <p className="text-xl sm:text-2xl font-serif italic text-forest-dark">
              &ldquo;My safety is my priority. I give myself permission to heal at a pace that honors my nervous system.&rdquo;
            </p>
            <p className="text-xs font-sans text-gray-500 tracking-wider uppercase font-semibold">
              — The Reader's Permission Slip, Section 1
            </p>
          </div>

          {/* Purchase CTA Card */}
          <div className="bg-forest rounded-2xl p-8 sm:p-12 text-[#F5F0E8] text-center space-y-6 shadow-md relative overflow-hidden">
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none bg-[radial-gradient(#F5F0E8_1px,transparent_1px)] [background-size:12px_12px]"></div>
            <div className="relative z-10 max-w-2xl mx-auto space-y-4">
              <h3 className="text-2xl sm:text-3xl font-serif font-bold">
                Begin Your Trauma Recovery Journey
              </h3>
              <p className="text-sm sm:text-base text-[#F5F0E8]/90 leading-relaxed font-sans">
                Take the woodland path to healing with lifetime, self-paced access to this 60-page multi-modal curriculum, interactive worksheets, and therapeutic resources for $79.
              </p>
              <div className="pt-4 flex flex-col sm:flex-row justify-center items-center gap-4">
                <a
                  href="https://buy.stripe.com/4gMeVd2ijdGbc4w0HR5kk02"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-[#F5F0E8] px-8 py-4 text-base font-bold text-forest shadow-md hover:bg-white transition-colors"
                >
                  Buy Now — $79
                </a>
                <Link
                  to="/contact"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-[#F5F0E8]/30 bg-transparent px-8 py-4 text-base font-semibold text-[#F5F0E8] hover:bg-[#F5F0E8]/10 transition-colors"
                >
                  Work with a Therapist
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
