import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/groups")({
  component: SupportGroups,
});

function SupportGroups() {
  const activeGroups = [
    {
      id: "ocd-group",
      name: "The ERP Integration Lounge",
      focus: "OCD Support & Exposure Practice",
      schedule: "Tuesdays from 6:00 PM – 7:15 PM CT",
      details: "HIPAA-compliant Zoom • Capped at 10 peers • Facilitated by our licensed specialist",
      desc: "This weekly therapist-led group is the active, group therapy component of the Premium 10-Week OCD Recovery Program. It is designed to act as a structured peer integration space where we troubleshoot exposure hierarchies, share exposure successes and setbacks, practice inhibitory learning exercises, and conquer obsessional doubts together in community.",
      price: "Included in the Premium 10-Week OCD Recovery Program"
    },
    {
      id: "neurodivergent-group",
      name: "Unmasked Connections",
      focus: "ADHD & Autism Peer Support",
      schedule: "Thursdays from 5:30 PM – 6:45 PM CT",
      details: "HIPAA-compliant Zoom • Capped at 12 peers • Neurodiversity-affirming space",
      desc: "A sensory-safe, highly validating space for Autistic and ADHD adults (both diagnosed and self-identified). We share executive function strategies, navigate late-diagnosis grief, discuss sensory audits, troubleshoot job accommodations, and practice safe, unmasked connection with peers who truly understand.",
      price: "$50 per session (or included for practice therapy clients)"
    },
    {
      id: "chronic-illness-group",
      name: "The Mind-Body Sanctuary",
      focus: "Chronic Illness & Somatic Regulation",
      schedule: "Wednesdays from 4:00 PM – 5:15 PM CT",
      details: "HIPAA-compliant Zoom • Capped at 8 peers • For multi-system illnesses",
      desc: "For adults navigating dysautonomia, POTS, ME/CFS, MCAS, hypermobility, autoimmune disorders, and other complex chronic physical conditions. We hold sacred space for medical grief, practice gentle somatic tracking, and support each other through pacing and energy conservation.",
      price: "$50 per session (or included for practice therapy clients)"
    },
    {
      id: "art-renewal-group",
      name: "Art & Renewal",
      focus: "Grief and Trauma Recovery",
      schedule: "Coming Soon — Fridays from 4:00 PM – 5:30 PM CST",
      details: "HIPAA-compliant Zoom • Capped at 10 peers • Narrative & expressive arts focus",
      desc: "Trauma and grief disrupt the stories we tell about who we are, what is safe, and what the future holds. Healing involves not only processing pain but also reclaiming meaning, identity, creativity, and connection. This group blends narrative therapy, expressive arts, psychoeducation, and values-based living. Each module explores a stage of grief or trauma recovery, with weekly assignments to complete on your own time and a group session to discuss the topic and share creative work."
    }
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header Section */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block mb-3">Group Integration & Support</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Facilitated Support Groups
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            You are not meant to heal in isolation. Connect with peers who speak your language in our structured, 
            clinician-led weekly Zoom groups.
          </p>
        </div>
      </section>

      {/* The Group Model (Why Groups?) */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-7 space-y-6">
              <h2 className="text-3xl font-serif font-bold text-gray-900">Healing in Community</h2>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                Living with severe OCD, complex neurodivergence, or a chronic medical condition is deeply isolating. 
                Friends and family often struggle to understand the mental exhaustion of intrusive thoughts, sensory overload, 
                or chronic systemic flares. This isolation can be as painful as the symptoms themselves.
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                At Woodland Acres Therapy, we believe peer integration is a crucial component of healing. Our facilitated weekly 
                support groups are designed to act as structured communities. Unlike open internet forums, our groups are 
                strictly confidential, HIPAA-compliant, clinician-facilitated, and linked directly to our course syllabus and clinical work.
              </p>
              <p className="text-base text-gray-600 leading-relaxed font-sans">
                Participants share their victories, hold each other accountable to exposures or pacing boundaries, 
                and receive expert professional somatic or clinical adjustments inside a safe, sensory-affirming container.
              </p>
            </div>

            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-forest/10 p-8 bg-cream/50 space-y-4">
                <h3 className="font-serif text-lg font-bold text-forest-dark">Group Features & Structure</h3>
                <ul className="space-y-3.5 text-sm text-gray-750 font-sans">
                  <li className="flex items-start gap-2.5">
                    <span className="text-forest font-semibold">✓</span>
                    <span><strong>Confidential & HIPAA-Secure:</strong> Hosted on a private, medical-grade Zoom platform.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-forest font-semibold">✓</span>
                    <span><strong>Intimate Group Caps:</strong> Limited to 8–12 peers to ensure everyone is heard.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-forest font-semibold">✓</span>
                    <span><strong>Syllabus-Linked:</strong> Integrates seamlessly with our self-paced courses.</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="text-forest font-semibold">✓</span>
                    <span><strong>Wisconsin & Michigan:</strong> Open to all licensed state residents.</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Active Groups List */}
      <section className="py-16 bg-[#F5F0E8] border-t border-forest/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Our Active Clinical Groups</h2>
            <p className="mt-4 text-base text-gray-600 font-sans">
              Discover a weekly space where you can share experiences, receive feedback, and learn alongside peers:
            </p>
          </div>

          <div className="space-y-8 max-w-4xl mx-auto">
            {activeGroups.map((group) => (
              <div 
                key={group.id} 
                className="bg-white rounded-3xl p-8 border border-forest/10 shadow-lg flex flex-col md:flex-row justify-between gap-8 hover:border-forest transition-all"
              >
                {/* Group Details */}
                <div className="space-y-4 flex-grow md:max-w-2xl">
                  <span className="inline-flex items-center rounded-md bg-forest/5 border border-forest/15 px-2.5 py-0.5 text-xs font-semibold text-forest">
                    {group.focus}
                  </span>
                  <h3 className="text-2xl font-serif font-bold text-gray-900">{group.name}</h3>
                  <p className="text-xs text-brown-warm font-semibold tracking-wider uppercase">{group.schedule}</p>
                  <p className="text-xs text-gray-500 font-sans italic">{group.details}</p>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans">{group.desc}</p>
                </div>

                {/* Pricing / Join Widget */}
                <div className="md:w-64 flex flex-col justify-between border-t md:border-t-0 md:border-l border-gray-100 pt-6 md:pt-0 md:pl-8">
                  <div className="space-y-2">
                    <span className="text-xs font-bold text-gray-400 uppercase tracking-wide">Tuition / Fees</span>
                    <p className="text-xl font-bold text-gray-950 font-serif">{group.price}</p>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      In-Network insurance (Aetna, BCBS, Cigna) may cover group therapy. Superbills provided.
                    </p>
                  </div>
                  <div className="pt-6">
                    <Link
                      to="/contact"
                      className="block text-center w-full rounded-xl bg-forest px-4 py-3 text-sm font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
                    >
                      Inquire to Join Group
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-forest py-16 text-[#F5F0E8] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-serif font-bold">Unsure which group fits your goals?</h2>
          <p className="text-base text-[#F5F0E8]/90 max-w-xl mx-auto leading-relaxed">
            Let's chat over a complimentary 15-minute consultation. We'll explore your background and help you 
            join a secure, validating peer container.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="rounded-xl bg-[#F5F0E8] px-6 py-3.5 text-base font-semibold text-forest shadow-md hover:bg-white transition-colors"
            >
              Book Consultation
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
