import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/about")({
  component: About,
});

function About() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Banner */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block mb-3">Our Core Philosophy</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            About Woodland Acres Therapy
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            We believe clinical excellence and deeply human, compassionate care belong in the same room. Learn about our approach, 
            our credentials, and why we do this work.
          </p>
        </div>
      </section>

      {/* The Therapist Bio */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
            
            {/* Left Col: Photo + Credential block */}
            <div className="lg:col-span-5 space-y-6">
              <div className="rounded-3xl border border-forest/10 bg-[#F5F0E8] p-4 shadow-xl">
                {/* Emily's portrait photo */}
                <img
                  src="/images/emily-weaver.jpg"
                  alt="Emily Weaver, MS, LPC"
                  className="aspect-[4/5] rounded-2xl w-full object-cover"
                  loading="eager"
                />
              </div>

              {/* Quick Credentials Widget */}
              <div className="rounded-2xl border border-forest/15 p-6 bg-cream/30 space-y-4">
                <h4 className="font-serif text-lg font-bold text-gray-900">Therapeutic Focus</h4>
                <ul className="space-y-3 text-sm text-gray-700">
                  <li className="flex items-center gap-2.5">
                    <span className="text-forest">✔</span>
                    <span>Humanistic & Existential Therapy base</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-forest">✔</span>
                    <span>ACT, CBT, DBT, and ERP techniques</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-forest">✔</span>
                    <span>Specialty Neurodivergent & OCD care</span>
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-forest">✔</span>
                    <span>Licensed in WI and MI</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Col: Biography */}
            <div className="lg:col-span-7 space-y-6">
              <span className="text-xs font-bold text-forest uppercase tracking-wider block">Lead Clinician Statement</span>
              <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 leading-tight">
                "I've always been drawn to the deeper questions — why we are the way we are, what shapes us, and how we can grow into who we want to become."
              </h2>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
                My work is grounded in humanistic and existential therapy. I help clients explore the deeper questions of identity, values, and meaning while also building practical tools for change. Depending on your needs, I may integrate techniques from ACT, CBT, DBT, and ERP, among others.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
                My clients are often thoughtful, introspective people — the kind who spend time reflecting on their lives and want to understand themselves more deeply. They may be facing anxiety, intrusive thoughts, compulsions, grief, depression, life transitions, or challenges related to neurodivergence. They feel stuck in patterns they cannot quite untangle on their own.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans">
                I also bring something personal to my work that I've come to see as a strength: I carry deep, firsthand understanding of what it means to navigate OCD, neurodivergence, and chronic health conditions — both in my own life and in my family. This lived experience, combined with my clinical training, gives me a perspective I could not get from textbooks alone. I know how these overlapping experiences compound, and I know what it takes to work through them.
              </p>
              <p className="text-base sm:text-lg text-gray-600 leading-relaxed font-sans pt-2">
                If you are ready to dig deep, plant your seed, and watch yourself grow, I'm looking forward to supporting your journey.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Our Practice Values */}
      <section className="py-20 bg-cream border-t border-forest/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900">
              The Woodland Acres Code of Care
            </h2>
            <p className="mt-4 text-base text-gray-600">
              Our clinical practice is built upon four fundamental operating principles:
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-white rounded-2xl p-8 border border-forest/5 shadow-md space-y-3">
              <span className="text-2xl text-forest font-bold">1. Precision & Evidence-Based Depth</span>
              <h4 className="font-serif text-lg font-bold text-gray-900">We do not improvise with your recovery.</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                For conditions like severe OCD, we use highly structured, scientifically proven ERP and ACT protocols. We track 
                objective progress markers, outline clear goals, and work with clinical precision. We believe you deserve specialized, 
                thoughtful interventions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-forest/5 shadow-md space-y-3">
              <span className="text-2xl text-forest font-bold">2. True Neurodivergent Affirmation</span>
              <h4 className="font-serif text-lg font-bold text-gray-900">Neurodivergence is not a pathological deficit.</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                We reject "therapies" aimed at forcing Autistic or ADHD individuals to mask or conform to neurotypical behaviors. 
                Instead, we work to identify sensory profiles, executive function support, prevent autistic burnout, and cultivate 
                self-compassion and pride.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-forest/5 shadow-md space-y-3">
              <span className="text-2xl text-forest font-bold">3. The Classroom Model of Healing</span>
              <h4 className="font-serif text-lg font-bold text-gray-900">Education is a vital catalyst for therapy.</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Therapeutic concepts should be fully transparent. By structuring our practice like a school — offering high-quality, 
                dynamic digital courses with worksheets and modules — we empower you to become an expert on your own mind 
                and behavior outside of sessions.
              </p>
            </div>

            <div className="bg-white rounded-2xl p-8 border border-forest/5 shadow-md space-y-3">
              <span className="text-2xl text-forest font-bold">4. Active, Shared Community</span>
              <h4 className="font-serif text-lg font-bold text-gray-900">You are not meant to heal in isolation.</h4>
              <p className="text-sm text-gray-600 leading-relaxed">
                Feeling isolated is one of the most painful aspects of OCD, neurodivergence, and chronic illness. By integrating 
                facilitated, private, weekly group Zoom integration calls and course-linked peer forums, we ensure you have 
                a community of peers who deeply validate your journey.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-forest py-16 text-[#F5F0E8] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-serif font-bold">Want to see if we're a good fit?</h2>
          <p className="text-base text-[#F5F0E8]/90 max-w-xl mx-auto leading-relaxed">
            Let's spend 15 minutes together over a free Zoom consultation to discuss your history, goals, 
            and outline a customized care plan.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="rounded-xl bg-[#F5F0E8] px-6 py-3.5 text-base font-semibold text-forest shadow-md hover:bg-white transition-colors"
            >
              Book My Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
