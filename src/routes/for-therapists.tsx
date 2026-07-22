import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/for-therapists")({
  component: ForTherapists,
});

function ForTherapists() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block mb-3">For Referring Providers</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Collaborative Care
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            I welcome referrals and collaboration with other professionals. If you have a client who may benefit from
            specialized support, I am happy to connect.
          </p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-cream rounded-2xl p-8 border border-forest/10 shadow-md">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Services Overview</h2>
              <p className="text-gray-600 leading-relaxed mb-6">
                I provide individual therapy for adults in Wisconsin and Michigan via telehealth, with particular depth in:
              </p>
              <ul className="space-y-3 text-gray-600">
                <li className="flex gap-3">
                  <span className="text-forest font-bold">•</span>
                  <span>OCD and anxiety disorders (ERP, ACT, I-CBT)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-forest font-bold">•</span>
                  <span>Neurodivergent-affirming care (ADHD, autism, AuDHD)</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-forest font-bold">•</span>
                  <span>Chronic illness and medical grief</span>
                </li>
                <li className="flex gap-3">
                  <span className="text-forest font-bold">•</span>
                  <span>General anxiety, depression, life transitions, and relationships</span>
                </li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-6">
                I am in-network with Aetna, BlueCross Blue Shield, and Cigna. I also provide superbills
                for out-of-network and self-pay clients.
              </p>
            </div>
            <div className="bg-cream rounded-2xl p-8 border border-forest/10 shadow-md">
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Referral Coordination</h2>
              <p className="text-gray-600 leading-relaxed">
                I am happy to coordinate care with referring providers. Please reach out via the contact form or
                email me directly at <strong className="text-forest">weaveraemily@gmail.com</strong>.
              </p>
            </div>
            <div className="text-center pt-4">
              <Link
                to="/contact"
                className="rounded-xl bg-forest px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-forest-dark transition-all"
              >
                Send a Referral Inquiry
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}