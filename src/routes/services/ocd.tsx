import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services/ocd")({
  component: OcdTherapy,
});

function OcdTherapy() {
  const commonSubtypes = [
    {
      name: "Harm & Violent Intrusive Thoughts",
      desc: "Distressing, repetitive doubts about safety, fear of acting on impulses, or fear of harming oneself or others. We provide safe, supportive spaces to practice imaginal exposures to disarm these terrifying doubts."
    },
    {
      name: "Contamination & Washing",
      desc: "Fears of germs, chemical toxins, illnesses, or spiritual contamination. We work together on systematic exposures, gradually reducing washing, cleaning, or avoidance behavior."
    },
    {
      name: "Scrupulosity & Moral OCD",
      desc: "Intense anxiety regarding religious sin, moral correctness, or having an 'imperfect' conscience. We utilize ERP to help you live in alignment with your faith or values without clinical checking."
    },
    {
      name: "Relationship OCD (ROCD)",
      desc: "Debilitating doubts about your partner's suitability, attraction, or the 'rightness' of the relationship. We help you disarm the constant comparison and checking cycles."
    },
    {
      name: "Somatic & Sensorimotor OCD",
      desc: "Hyper-awareness of natural body processes (breathing, blinking, swallowing, heart rate) accompanied by panic that it will never stop. We help your brain habituate and return these processes to automatic."
    },
    {
      name: "Perfectionism & 'Just Right' OCD",
      desc: "The relentless urge to arrange, touch, tap, or repeat tasks until they achieve a vague, elusive sense of 'just right' completeness. We practice tolerating the discomfort of incompleteness."
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
              Gold-Standard Specialization
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
              OCD & ERP Treatment Program
            </h1>
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed font-sans">
              Exposure and Response Prevention (ERP) is the gold standard clinical treatment for Obsessive-Compulsive Disorder. 
              We don't just 'talk' about your OCD — we systematically train your brain to reclaim your freedom.
            </p>
          </div>
        </div>
      </section>

      {/* Overview & Biology of OCD */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                Understanding the OCD Loop
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                Obsessive-Compulsive Disorder is a neurobiological condition characterized by two primary components: 
                <strong>obsessions</strong> (frightening, distressing intrusive thoughts, images, or urges) and 
                <strong>compulsions</strong> (repetitive physical behaviors or mental rituals performed to neutralize the anxiety).
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                While compulsions provide brief, temporary relief, they actually act as a trap. They tell your brain's fear center 
                (the amygdala) that the threat was real, and that the ritual successfully saved you. This reinforces the cycle, making the 
                next obsession even more intense.
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                Traditional 'talk' or insight-oriented therapy often fails for OCD because analyzing the content of an obsession 
                is actually a form of mental reassurance. It feeds the OCD beast. To recover, we must change our behavioral response to 
                the thoughts using <strong>ERP</strong>.
              </p>
            </div>

            <div className="lg:col-span-5">
              {/* Visual box of the OCD loop */}
              <div className="bg-cream border border-forest/15 rounded-3xl p-8 space-y-6">
                <h3 className="font-serif text-xl font-bold text-forest-dark text-center">The Compulsive Loop vs. ERP</h3>
                <div className="space-y-4 text-sm font-sans">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <span className="font-bold text-red-600 uppercase text-[10px] tracking-wide block">The OCD Loop</span>
                    <p className="text-gray-700 mt-1">
                      <strong>Obsession</strong> (Intrusive thought) → <strong>Anxiety Spike</strong> → 
                      <strong>Compulsion</strong> (Ritual) → <strong>Temporary Relief</strong> (Trap, cycle repeats).
                    </p>
                  </div>
                  <div className="bg-forest/5 p-4 rounded-xl border border-forest/15 shadow-sm">
                    <span className="font-bold text-forest uppercase text-[10px] tracking-wide block">The ERP Recovery Route</span>
                    <p className="text-gray-700 mt-1">
                      <strong>Obsession</strong> → <strong>Anxiety Spike</strong> → <strong>Response Prevention</strong> (Refusing to ritualize) → 
                      <strong>Habituation/Inhibitory Learning</strong> (Brain rewrites fear, loop breaks).
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Subtypes Accordion/Grid */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Obsessional Subtypes We Treat</h2>
            <p className="mt-4 text-base text-gray-600 font-sans">
              OCD can morph into many different themes, but the underlying neurological mechanics are the same. We have extensive, 
              advanced clinical training in all major OCD presentations:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {commonSubtypes.map((sub, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-6 border border-forest/10 shadow-md flex flex-col justify-between">
                <div>
                  <h3 className="font-serif text-lg font-bold text-gray-900 mb-3">{sub.name}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{sub.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How ERP Works Step-by-Step */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Our Structured ERP Process</h2>
            <p className="mt-4 text-base text-gray-600">
              We approach ERP with immense collaboration, safety, and respect. We never force you to do an exposure you aren't ready for.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <span className="text-3xl font-serif font-bold text-forest">Phase 1</span>
              <h4 className="font-serif text-lg font-bold text-gray-900">Hierarchy & Trigger Identification</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                We spend time analyzing your specific obsessions and mapping out your physical and mental compulsions. 
                Together, we construct a hierarchy list rating your triggers from 1 (mild distress) to 10 (intense panic).
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-3xl font-serif font-bold text-forest">Phase 2</span>
              <h4 className="font-serif text-lg font-bold text-gray-900">Gradual, Guided Exposures</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Starting with low-level triggers, we systematically practice entering the triggering situation (Exposure) 
                and choosing not to perform the reassuring ritual (Response Prevention). This is done collaboratively in-session.
              </p>
            </div>

            <div className="space-y-4">
              <span className="text-3xl font-serif font-bold text-forest">Phase 3</span>
              <h4 className="font-serif text-lg font-bold text-gray-900">Generalization & Reclaiming Life</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                As your nervous system learns to tolerate the distress, we assign homework exposures to practice in your daily life. 
                Over time, your world expands as avoidance behaviors diminish, allowing you to live aligned with your true values.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* The Academic Course Connection */}
      <section className="py-20 bg-cream/50 border-t border-forest/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-forest/15 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block">The Classroom Advantage</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                Integrated Course: ERP Mechanics for Severe OCD
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                All individual clinical clients within our OCD treatment program receive free lifetime access to our online course 
                <strong>"ERP Mechanics for Severe OCD"</strong>. 
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed">
                This academic-grade curriculum guides you through the complex brain physiology of anxiety, inhibitory learning, 
                and provides digital exposure logs and worksheets within your client portal. This ensures that you have access 
                to clinical resources 24/7 as you practice exposures.
              </p>
              <div className="pt-2">
                <Link
                  to="/courses/ocd-course"
                  className="inline-flex rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest-dark transition-colors"
                >
                  Read ERP Course Details
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-cream/40 rounded-2xl p-6 border border-forest/10">
              <h4 className="font-serif text-lg font-bold text-forest-dark mb-4 text-center">Active Support Group</h4>
              <p className="text-xs text-gray-600 leading-relaxed text-center mb-4">
                In addition to individual therapy and course modules, you can participate in our facilitated weekly support groups, 
                sharing experiences and conquering exposures with peers.
              </p>
              <div className="text-center">
                <Link to="/groups" className="text-xs font-bold text-forest uppercase tracking-wide hover:underline">
                  Explore OCD Support Group →
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-forest py-16 text-[#F5F0E8] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-serif font-bold">Ready to break the OCD cycle?</h2>
          <p className="text-base text-[#F5F0E8]/90 max-w-xl mx-auto leading-relaxed">
            Take the first step towards reclaiming your mental freedom. Book a consultation to discuss 
            your specific obsessions and begin the ERP process.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="rounded-xl bg-[#F5F0E8] px-6 py-3.5 text-base font-semibold text-forest shadow-md hover:bg-white transition-colors"
            >
              Book ERP Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
