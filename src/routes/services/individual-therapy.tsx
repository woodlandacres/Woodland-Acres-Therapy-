import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services/individual-therapy")({
  component: IndividualTherapy,
});

function IndividualTherapy() {
  const therapyFocuses = [
    {
      title: "Life Transitions & Grief",
      desc: "Navigating major life shifts—career changes, divorce, moves, identity updates, or the loss of a loved one—can destabilize your nervous system. We help you hold space for the complex feelings of grief and navigate the horizon with gentle agency."
    },
    {
      title: "Stress, Burnout & High-Achieving Anxiety",
      desc: "Perfectionism and high achievement often mask deep-seated anxiety and chronic stress. We help you explore the root of your drive, deconstruct the pressure to perform, set firm boundaries with work, and establish true restorative rest."
    },
    {
      title: "Relational Trauma & Boundary Setting",
      desc: "Unresolved family-of-origin dynamics and past relational trauma frequently manifest as people-pleasing, boundary deficits, or attachment insecurities. We help you map your relational patterns and learn the somatic and verbal art of setting firm, loving boundaries."
    },
    {
      title: "Bipolar, BPD & Complex Diagnoses",
      desc: "I welcome clients navigating bipolar disorder, borderline personality disorder, and other complex mental health concerns. These experiences require thoughtful, stabilizing care — not dismissal or fear. I provide a grounded, non-judgmental space to understand your patterns and build sustainable coping."
    },
    {
      title: "LGBTQ+ Affirming Therapy",
      desc: "I provide a warm, affirming space for LGBTQ+ individuals. Whether you are exploring identity, navigating family dynamics, processing discrimination or religious trauma, or simply need a therapist who truly understands — you are welcome here."
    },
    {
      title: "Religious Trauma & Spiritual Recovery",
      desc: "Growing up in or leaving a high-control religious environment can leave deep imprints — on your sense of self, your relationships, and your worldview. I help clients process religious trauma, reclaim their own values, and rebuild a sense of meaning on their own terms."
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
              Adult Mental Health
            </span>
            <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
              Individual General Therapy
            </h1>
            <p className="text-base sm:text-xl text-gray-700 leading-relaxed font-sans">
              Evidence-based, values-driven counseling for adults. Whether navigating complex life transitions, anxiety, 
              professional burnout, or relational challenges, we offer a grounded clinical space to foster genuine resilience.
            </p>
          </div>
        </div>
      </section>

      {/* Grounded & Clinical Approach */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-serif font-bold text-gray-900">
                Beyond Standard Talk Therapy
              </h2>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                Many adults seek therapy because they feel stuck in repetitive behavioral loop, despite having high intellectual 
                insight into their problems. Knowing 'why' you do something is rarely enough to change 'how' you do it.
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                Our approach to individual therapy moves beyond passive, unstructured talk. While we hold a warm, deeply compassionate 
                and non-judgmental space, we also incorporate active, values-driven clinical modalities. We want to help you 
                observe your mind, settle your physical stress response, and take committed actions that align with who you wish to be.
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                We frequently utilize <strong>Acceptance and Commitment Therapy (ACT)</strong> and <strong>mindfulness-based Cognitive 
                Behavioral Therapy (CBT)</strong>. Rather than spending sessions fighting or trying to 'eliminate' uncomfortable thoughts 
                and feelings, we teach you how to accept their presence, defuse from their control, and choose behavior grounded in your core values.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="bg-cream border border-forest/15 rounded-3xl p-8 space-y-6">
                <h3 className="font-serif text-xl font-bold text-forest-dark text-center">Our Primary Modalities</h3>
                <div className="space-y-4 text-sm font-sans text-gray-700">
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <span className="font-bold text-forest uppercase text-[10px] tracking-wide block">Acceptance & Commitment (ACT)</span>
                    <p className="mt-1 text-xs">
                      Focuses on psychological flexibility. Learn to observe distressing thoughts with neutrality, accept somatic 
                      discomfort, and take values-based action.
                    </p>
                  </div>
                  <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm">
                    <span className="font-bold text-forest uppercase text-[10px] tracking-wide block">Mindfulness-Based CBT</span>
                    <p className="mt-1 text-xs">
                      Deconstructs deep core beliefs, identifying automatic thoughts and thinking errors, while integrating somatic 
                      slowing techniques to calm the nervous system.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Focus Areas Grid */}
      <section className="py-20 bg-cream">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Adult Focus Areas</h2>
            <p className="mt-4 text-base text-gray-600 font-sans">
              We provide deep, collaborative counseling to help you process:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {therapyFocuses.map((focus, idx) => (
              <div key={idx} className="bg-white rounded-2xl p-8 border border-forest/10 shadow-md space-y-3">
                <h3 className="font-serif text-xl font-bold text-gray-900">{focus.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">{focus.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Relational Dynamics Spotlight */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-[#F5F0E8] rounded-3xl p-8 sm:p-12 border border-forest/15 shadow-xl space-y-6 text-center max-w-4xl mx-auto">
            <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block">Neuro-Relational Specialty</span>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900">
              A Safe Space for Neurodivergent Relationships
            </h3>
            <p className="text-sm sm:text-base text-gray-600 leading-relaxed font-sans max-w-2xl mx-auto">
              Our clinical practice has a distinct focus on supporting relational dynamics between neurodivergent (ADHD & Autistic) 
              individuals and their partners. If you are seeking to build communication patterns that honor both of your cognitive 
              needs, check out our specialised relationship courses.
            </p>
            <div className="pt-2">
              <Link
                to="/courses/neurodivergent-relationships"
                className="inline-flex rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest-dark transition-colors"
              >
                Explore Neurodivergent Relationship Course
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-forest py-16 text-[#F5F0E8] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-serif font-bold">Invest in your psychological well-being.</h2>
          <p className="text-base text-[#F5F0E8]/90 max-w-xl mx-auto leading-relaxed">
            Ready to slow down, parse complex thoughts, and align your life with your values? Book a free 
            15-minute consultation to begin individual therapy.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="rounded-xl bg-[#F5F0E8] px-6 py-3.5 text-base font-semibold text-forest shadow-md hover:bg-white transition-colors"
            >
              Book Individual Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
