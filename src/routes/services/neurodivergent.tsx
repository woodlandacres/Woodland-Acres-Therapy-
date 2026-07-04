import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services/neurodivergent")({
  component: NeurodivergentCare,
});

function NeurodivergentCare() {
  const supportAreas = [
    {
      title: "ADHD Support & Executive Flow",
      desc: "We look beyond 'time management' to understand the neurobiology of ADHD. Together, we address task paralysis, RSD (Rejection Sensitive Dysphoria), hyperfocus, emotional regulation, and build dopamine-friendly environments that work with your interest-driven brain rather than against it."
    },
    {
      title: "Autistic Burnout & Energy Conservation",
      desc: "Autistic burnout is a state of profound physical, cognitive, and emotional exhaustion caused by the chronic stress of masking and surviving in a world not designed for your nervous system. We focus on deep rest, sensory audits, boundary setting, and rebuilding your life to prevent relapse."
    },
    {
      title: "The Art of Unmasking",
      desc: "Masking—constantly hiding your natural autistic or ADHD traits to fit in—takes an immense toll on mental health. We provide a safe, non-judgmental container to explore what lies beneath the mask, helping you identify your authentic needs, quirks, and communication styles."
    },
    {
      title: "Sensory Audits & Integration",
      desc: "Sensory sensitivities are often the root cause of chronic anxiety and irritability. We conduct a detailed sensory audit of your home, work, and social environments, identifying sensory drains and sensory inputs to establish a regulated baseline."
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
              Neurodivergent-Affirming Paradigm
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
              ADHD & Autism Affirming Care
            </h1>
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed font-sans">
              We reject the deficit model of neurodivergence. You are not broken, defective, or in need of a 'cure'. 
              We help you understand your unique neurotype, accommodate your sensory needs, and cultivate deep self-compassion.
            </p>
          </div>
        </div>
      </section>

      {/* Philosophy: Deficit vs Affirming */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                A Different Way of Seeing Yourself
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                Many therapists who claim to treat ADHD and Autism still operate on the <strong>Pathological Deficit Model</strong>. 
                They focus heavily on training you to mask your traits, behave in 'socially appropriate' ways, and conform to neurotypical standards. 
                This often leads to chronic self-doubt, anxiety, and eventual autistic burnout.
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                At Woodland Acres Therapy, we work strictly from the <strong>Neurodiversity-Affirming Paradigm</strong>. We view ADHD and 
                Autism as natural, valid variations in human neurology. We focus on identifying your unique strengths, understanding 
                your neurobiology, auditing your sensory environment, and creating custom accommodations.
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                Whether you were diagnosed in childhood or are navigating the complex, emotional realization of being late-diagnosed 
                in adulthood, we provide an empathetic, knowledgeable home to explore your identity.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-cream border border-forest/15 rounded-3xl p-8 space-y-6">
                <h3 className="font-serif text-xl font-bold text-forest-dark text-center">Pathology vs. Affirmation</h3>
                <div className="space-y-4 text-sm font-sans">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <span className="font-bold text-red-600 uppercase text-[10px] tracking-wide block">Deficit Model (The old way)</span>
                    <ul className="list-disc pl-4 mt-1 text-xs text-gray-700 space-y-1">
                      <li>Treats ADHD/Autism as behavior disorders</li>
                      <li>Encourages masking and suppression of stims</li>
                      <li>Forces compliance with neurotypical systems</li>
                      <li>Aims to 'fix' or minimize difference</li>
                    </ul>
                  </div>
                  <div className="bg-forest/5 p-4 rounded-xl border border-forest/15 shadow-sm">
                    <span className="font-bold text-forest uppercase text-[10px] tracking-wide block">Affirming Model (Our way)</span>
                    <ul className="list-disc pl-4 mt-1 text-xs text-gray-700 space-y-1">
                      <li>Views neurotypes as natural cognitive variations</li>
                      <li>Supports safe unmasking and authentic expression</li>
                      <li>Builds customized, neuro-friendly systems</li>
                      <li>Focuses on environment, burnout, and sensory safety</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Support Areas Grid */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">How We Support Your Neurotype</h2>
            <p className="mt-4 text-base text-gray-600 font-sans">
              Our clinical care is highly collaborative and tailored to how you process the world:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {supportAreas.map((area, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-forest/10 shadow-md space-y-3">
                <h3 className="font-serif text-xl font-bold text-gray-900">{area.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">{area.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relational Course Connection */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F5F0E8] rounded-3xl p-8 sm:p-12 border border-forest/15 shadow-xl grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block">Neurodivergent Relationships</span>
              <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
                Course Connection: Neurodivergent Relationship Dynamics
              </h3>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                Being neurodivergent or partnering with a neurodivergent person comes with incredibly distinct communication, 
                sensory, and emotional patterns. 
              </p>
              <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans">
                Practice clients gain complete access to our online course <strong>"Neurodivergent Relationship Dynamics"</strong>. 
                This self-paced curriculum is designed for both individuals and couples. It breaks down the 'double empathy problem', 
                sensory negotiation, dividing household tasks without executive overload, and building a secure, neuro-affirming relationship.
              </p>
              <div className="pt-2">
                <Link
                  to="/courses/neurodivergent-relationships"
                  className="inline-flex rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest-dark transition-colors"
                >
                  View Relational Course
                </Link>
              </div>
            </div>
            
            <div className="lg:col-span-5 bg-white rounded-2xl p-6 border border-forest/10 text-center space-y-4">
              <h4 className="font-serif text-lg font-bold text-forest">Neuro-Affirming support Groups</h4>
              <p className="text-xs text-gray-600 leading-relaxed">
                We facilitate weekly support groups for neurodivergent adults, creating a validating, sensory-safe space 
                where you can speak openly with others who understand task paralysis, executive burnout, and masking.
              </p>
              <Link to="/groups" className="inline-block text-xs font-bold text-forest uppercase tracking-wide hover:underline">
                Explore Support Groups →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-forest py-16 text-[#F5F0E8] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-serif font-bold">Unmask and thrive with us.</h2>
          <p className="text-base text-[#F5F0E8]/90 max-w-xl mx-auto leading-relaxed">
            Ready to explore your mind without judgment? Book a free 15-minute consultation to discuss neurodivergent-affirming 
            therapy and design an accommodation structure that fits you.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="rounded-xl bg-[#F5F0E8] px-6 py-3.5 text-base font-semibold text-forest shadow-md hover:bg-white transition-colors"
            >
              Book Affirming Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
