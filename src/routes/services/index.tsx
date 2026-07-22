import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/services/")({
  component: ServicesIndex,
});

function ServicesIndex() {
  const specialties = [
    {
      id: "ocd",
      title: "OCD & ERP Therapy",
      shortDesc: "The gold-standard evidence-based approach to reclaiming your life from obsessions and compulsions.",
      longDesc: "If you are suffering from intrusive thoughts, severe checking, contamination fears, or mental rituals, traditional talk therapy can actually make your symptoms worse. We provide highly structured Exposure and Response Prevention (ERP) therapy — the scientifically proven treatment of choice. Together, we design careful, gradual exposures to help your brain learn that these anxious alarms are false.",
      link: "/services/ocd",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      tags: ["ERP Focus", "IOCDF Guidelines", "Inhibitory Learning"]
    },
    {
      id: "neurodivergent",
      title: "Neurodivergent Care (ADHD & Autism)",
      shortDesc: "Affirming, collaborative therapy to help you thrive as your authentic self without masking.",
      longDesc: "We operate on a neurodiversity-affirming paradigm, meaning we view ADHD and Autism as natural variations in human wiring rather than pathologies to be cured. We help you explore your sensory profile, navigate executive dysfunction, establish protective boundaries against autistic burnout, explore unmasking, and build lives aligned with your authentic cognitive style.",
      link: "/services/neurodivergent",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m0-12.728l.707.707m12.728 12.728l-.707-.707M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      tags: ["Neurodivergent Affirming", "Burnout Recovery", "Executive Functioning"]
    },
    {
      id: "chronic-illness",
      title: "Chronic Illness Support",
      shortDesc: "Compassionate clinical space to navigate medical grief, nerve regulation, and life with physical limitations.",
      longDesc: "Receiving a chronic diagnosis (such as POTS, MCAS, fibromyalgia, autoimmune disease, or chronic fatigue) is deeply traumatic. We address the medical grief, fatigue-related anxiety, and depression that often accompany chronic health issues. We use somatic and nervous system regulation tools to help reduce physical distress and assist you in rebuilding a rich, purposeful life.",
      link: "/services/chronic-illness",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      tags: ["Nervous System Somatics", "Grief & Loss", "Health Psychology"]
    },
    {
      id: "individual-therapy",
      title: "Individual General Therapy",
      shortDesc: "Evidence-based counseling for anxiety, high-achievers, life transitions, and relationships.",
      longDesc: "We provide clinical individual therapy for adults dealing with complex life changes, relationship challenges, general anxiety, and developmental trauma. Grounded in Acceptance and Commitment Therapy (ACT) and mindfulness-based CBT, we help you uncover your core values and take action to build a life of genuine alignment and emotional resilience.",
      link: "/services/individual-therapy",
      icon: (
        <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      ),
      tags: ["ACT Modality", "Relational Boundaries", "Mindfulness-Based CBT"]
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block mb-3">Specialty Clinical Practice</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Our Therapeutic Services
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            I offer thoughtful, evidence-based therapy for a wide range of concerns, with particular depth in OCD, neurodivergence, chronic illness, trauma, and life transitions. 
            Discover how we can help you build resilience and safety.
          </p>
        </div>
      </section>

      {/* Services Listings */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {specialties.map((spec, idx) => (
              <div 
                key={spec.id} 
                className={`grid grid-cols-1 lg:grid-cols-12 gap-12 items-center ${idx % 2 === 1 ? 'lg:flex-row-reverse' : ''}`}
              >
                {/* Image Placeholder / Icon Block */}
                <div className={`lg:col-span-5 ${idx % 2 === 1 ? 'lg:order-last' : ''}`}>
                  <div className="rounded-3xl bg-cream border border-forest/10 p-8 shadow-lg relative overflow-hidden aspect-video sm:aspect-square flex flex-col justify-between">
                    <div className="absolute top-0 right-0 p-8 text-forest/10">
                      <svg className="h-32 w-32" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M12 2L2 22h20L12 2z" />
                      </svg>
                    </div>
                    <div className="h-14 w-14 rounded-2xl bg-forest text-white flex items-center justify-center shadow-md">
                      {spec.icon}
                    </div>
                    <div className="space-y-4">
                      <div className="flex flex-wrap gap-2">
                        {spec.tags.map(tag => (
                          <span key={tag} className="text-[10px] font-semibold bg-forest/5 text-forest border border-forest/10 px-2.5 py-1 rounded-md">
                            {tag}
                          </span>
                        ))}
                      </div>
                      <h3 className="text-2xl font-serif font-bold text-gray-900">{spec.title}</h3>
                      <p className="text-xs font-semibold text-brown-warm uppercase tracking-wider">Clinical Specialization Program</p>
                    </div>
                  </div>
                </div>

                {/* Text Content Block */}
                <div className="lg:col-span-7 space-y-6">
                  <h3 className="text-3xl font-serif font-bold text-gray-900">{spec.title}</h3>
                  <p className="text-base font-semibold text-forest leading-relaxed font-sans">{spec.shortDesc}</p>
                  <p className="text-base text-gray-600 leading-relaxed font-sans">{spec.longDesc}</p>
                  <div className="pt-2">
                    <Link
                      to={spec.link}
                      className="inline-flex rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
                    >
                      Learn More About {spec.title.split(' ')[0]} Care →
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Structured Care Model Explanation */}
      <section className="py-20 bg-cream border-t border-forest/10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-8 sm:p-12 border border-forest/15 shadow-xl space-y-8">
            <div className="text-center max-w-3xl mx-auto">
              <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block mb-2">Our Revolutionary Care Standard</span>
              <h2 className="text-3xl font-serif font-bold text-gray-900">How Our Specialized Approach Works</h2>
              <p className="mt-3 text-sm sm:text-base text-gray-600 font-sans">
                Many clients reach a plateau when relying solely on once-weekly therapy. Our practice resolves this by structuring 
                individual therapy as one part of a comprehensive support ecosystem.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-4">
              <div className="space-y-3">
                <div className="text-xl font-bold text-forest font-serif flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-forest/10 flex items-center justify-center text-xs font-semibold">1</span>
                  Individual Guidance
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  We schedule focused weekly or bi-weekly 50-minute clinical sessions. This is where we customize evidence-based protocols 
                  (ERP/ACT), address deeply personal triggers, process trauma, and track your clinical goals.
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-xl font-bold text-forest font-serif flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-forest/10 flex items-center justify-center text-xs font-semibold">2</span>
                  Rigorous Curriculum
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  You are granted full lifetime access to our digital school. Here, you complete educational video modules, 
                  assessments, and workbooks. This deepens your intellectual mastery over your symptoms at your own pace.
                </p>
              </div>

              <div className="space-y-3">
                <div className="text-xl font-bold text-forest font-serif flex items-center gap-2">
                  <span className="h-8 w-8 rounded-full bg-forest/10 flex items-center justify-center text-xs font-semibold">3</span>
                  Supportive Peer Group
                </div>
                <p className="text-sm text-gray-600 leading-relaxed font-sans">
                  Join our weekly facilitated integration support groups. This structured online room is dedicated to discussing 
                  course material, sharing exposures, checking in, and breaking down social isolation alongside other specialized clients.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-forest py-16 text-[#F5F0E8] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-serif font-bold">Have questions about our clinical specialties?</h2>
          <p className="text-base text-[#F5F0E8]/90 max-w-xl mx-auto leading-relaxed">
            We are here to help you navigate which services fit your life best. Let's talk over a consultation.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="rounded-xl bg-[#F5F0E8] px-6 py-3.5 text-base font-semibold text-forest shadow-md hover:bg-white transition-colors"
            >
              Contact Us Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
