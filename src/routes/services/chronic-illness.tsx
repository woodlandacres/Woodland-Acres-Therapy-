import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services/chronic-illness")({
  component: ChronicIllnessSupport,
});

function ChronicIllnessSupport() {
  const supportedConditions = [
    {
      name: "Dysautonomia & POTS",
      desc: "Postural Orthostatic Tachycardia Syndrome and other autonomic nervous system disorders. We help you navigate the intense anxiety mimics that adrenaline spikes cause, and support lifestyle pacing."
    },
    {
      name: "Autoimmune Diseases",
      desc: "Conditions like Lupus, Rheumatoid Arthritis, Hashimoto's, Crohn's, and Multiple Sclerosis. We address the emotional grief of chronic flare-ups and teach somatic pacing to manage stress-induced inflammation."
    },
    {
      name: "ME/CFS & Fibromyalgia",
      desc: "Myalgic Encephalomyelitis / Chronic Fatigue Syndrome and widespread chronic pain. We provide non-judgmental pacing support, rejecting harmful 'push through' mentalities, focusing on energy conservation."
    },
    {
      name: "MCAS & Mast Cell Activation",
      desc: "Severe chemical, environmental, and dietary sensitivities. We address the nervous system hyper-vigilance that accompanies severe allergic reactions, establishing deep safety and peace in a reactive body."
    },
    {
      name: "Hypermobility & hEDS",
      desc: "Ehlers-Danlos Syndrome and hypermobility spectrum disorders. We help you manage chronic joint pain, fatigue, and the psychological impact of navigating a complex, multi-system genetic condition."
    },
    {
      name: "Long COVID & Post-Viral Syndromes",
      desc: "Navigating the devastating, sudden onset of multi-system physical symptoms. We support you through the profound medical grief and help you establish a pacing-oriented lifestyle."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Header */}
      <section className="py-16 sm:py-24 bg-[#ECE5D8] border-b border-forest/10 relative">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="max-w-3xl space-y-6">
            <Link to="/services" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline flex items-center gap-1">
              ← Back to Services
            </Link>
            <span className="inline-flex items-center rounded-md bg-forest/10 px-2.5 py-0.5 text-xs font-semibold text-forest uppercase tracking-wide">
              Health Psychology Specialty
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
              Chronic Illness & Medical Grief Support
            </h1>
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed font-sans">
              Living with a chronic, complex physical illness is an ongoing trauma. We provide specialized somatic and mind-body 
              therapy to help you process medical grief, settle a hyper-vigilant nervous system, and reclaim your agency.
            </p>
          </div>
        </div>
      </section>

      {/* Mind-Body Connection & Medical Gaslighting */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                You Are Not Making It Up
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                Many clients with complex, multi-system illnesses (such as POTS, MCAS, hypermobility, or ME/CFS) spend years 
                seeking a diagnosis, only to be dismissed by doctors who suggest their physical symptoms are 'just anxiety'. 
                This <strong>medical gaslighting</strong> leaves a deep wound of trauma and self-doubt.
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                We know your symptoms are real. We also understand that chronic physical stress inevitably dysregulates the 
                nervous system, putting your body into a constant state of fight-or-flight (survival mode). This creates an 
                intense mind-body feedback loop, where physical flares trigger emotional panic, which in turn triggers more physical inflammation.
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                Our approach combines deep, empathetic <strong>medical grief work</strong> (grieving the body and life you expected to have) 
                with <strong>somatic nervous system tracking</strong>. We teach you how to soothe a reactive nervous system and 
                practice radical pacing, allowing you to live a life of meaning even within physical limitations.
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                I also help with the practical realities of chronic illness — navigating the stress of filing for disability, 
                writing accommodation letters for work or school, and exploring new goals for employment or education that 
                honor your current needs and capacities.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-cream border border-forest/15 rounded-3xl p-8 space-y-6">
                <h3 className="font-serif text-xl font-bold text-forest-dark text-center">Nervous System Somatic Stages</h3>
                <div className="space-y-4 text-xs font-sans text-gray-700">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1">
                    <span className="font-bold text-red-600 uppercase text-[9px] tracking-wide block">Sympathetic (Hyper-arousal)</span>
                    <p>Adrenaline surges, POTS tachycardia, heart racing, high-alert muscle tension, medical scanning, sleep issues.</p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1">
                    <span className="font-bold text-blue-600 uppercase text-[9px] tracking-wide block">Dorsal Vagal (Hypo-arousal)</span>
                    <p>Severe post-exertional fatigue, numbness, brain fog, depressive collapse, dissociation, physical shutdown.</p>
                  </div>
                  <div className="bg-forest/5 p-4 rounded-xl border border-forest/15 shadow-sm space-y-1">
                    <span className="font-bold text-forest uppercase text-[9px] tracking-wide block">Ventral Vagal (Somatic Safety)</span>
                    <p>Nervous system regulated, diaphragmatic ease, somatic awareness, emotional safety, realistic pacing.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Conditions Grid */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Complex Physical Issues We Support</h2>
            <p className="mt-4 text-base text-gray-600 font-sans">
              We bring specialized training in health psychology and somatic tracking to support the complex neuro-immune-endocrine 
              systems involved in multi-system chronic syndromes:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {supportedConditions.map((cond, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-forest/10 shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">{cond.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{cond.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Healing Framework */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Our Mind-Body Therapeutic Framework</h2>
            <p className="mt-4 text-base text-gray-600">
              We move away from rigid 'cognitive' behavioral therapy, incorporating somatic and nervous system safety:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-forest">Somatic Tracking & Nervous System Audits</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                We teach you how to scan your body with curiosity and neutrality rather than panic. By mapping your nervous system states, 
                you learn to intervene with gentle physical strategies before entering complete post-exertional crash or high-adrenaline panic.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-forest">Radical Pacing & Spoon Theory</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Many chronic illness patients are stuck in a painful 'boom-and-bust' cycle: pushing hard on a good day, and crashing 
                for three days after. We help you implement strict somatic pacing protocols to stay within your energy envelope and 
                foster neurological safety.
              </p>
            </div>

            <div className="space-y-3">
              <h4 className="font-serif text-lg font-bold text-forest">Medical Grief & Relational Boundaries</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                We hold a sacred space for your grief. We grieve the activities, jobs, or physical abilities that illness has taken from you. 
                We also explore relational boundaries—helping you communicate your energy needs to friends, family, and employers without guilt.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-forest py-16 text-[#F5F0E8] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-serif font-bold">You don't have to carry this grief alone.</h2>
          <p className="text-base text-[#F5F0E8]/90 max-w-xl mx-auto leading-relaxed">
            Let's establish a supportive, validating therapeutic space to honor your body's journey. 
            Book a free 15-minute consultation to discuss mind-body support.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="rounded-xl bg-[#F5F0E8] px-6 py-3.5 text-base font-semibold text-forest shadow-md hover:bg-white transition-colors"
            >
              Book Somatic Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
