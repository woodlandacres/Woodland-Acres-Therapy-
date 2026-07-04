import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/coaching")({
  component: Coaching,
});

function Coaching() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block mb-3">Coming Soon</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Neurodivergent &amp; ERP Coaching
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Structured, goal-oriented coaching to help you build executive functioning skills, practice ERP exposures,
            and stay accountable — available nationwide.
          </p>
        </div>
      </section>
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            <div className="bg-cream rounded-2xl p-8 border border-forest/10 shadow-md">
              <span className="inline-flex items-center rounded-md bg-forest/5 px-2.5 py-0.5 text-xs font-semibold text-forest mb-4">Not Yet Available</span>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">Coming Soon</h2>
              <p className="text-gray-600 leading-relaxed">
                I am developing a coaching program for individuals who want structured, goal-oriented support
                between or beyond therapy. Coaching is available nationwide and is designed for those who are
                psychologically stable, self-motivated, and looking for accountability and skill-building.
              </p>
              <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white rounded-xl p-5 border border-forest/5 shadow-sm">
                  <h3 className="font-bold text-forest mb-2">ERP Practice Coaching</h3>
                  <p className="text-sm text-gray-600">Structured exposure practice support between therapy sessions. Build your hierarchy, track SUDS, and stay consistent.</p>
                </div>
                <div className="bg-white rounded-xl p-5 border border-forest/5 shadow-sm">
                  <h3 className="font-bold text-forest mb-2">Neurodivergent Skills Coaching</h3>
                  <p className="text-sm text-gray-600">Executive functioning strategies, sensory regulation, daily structure, and accountability for ADHD and autistic adults.</p>
                </div>
              </div>
              <p className="text-sm text-gray-500 mt-6">
                I am gauging interest in coaching before launching. If this sounds like something you would use,
                please add your name to the waitlist so I know there is demand. No commitment — just helps me
                decide whether to move forward.
              </p>
            </div>
            <div className="text-center pt-4">
              <a
                href="mailto:eweaver@woodlandacrestherapy.org?subject=Coaching%20Waitlist%20Interest&body=I%27m%20interested%20in%20learning%20more%20about%20your%20coaching%20program.%20Please%20keep%20me%20updated!"
                className="rounded-xl bg-forest px-6 py-3.5 text-base font-semibold text-white shadow-md hover:bg-forest-dark transition-all"
              >
                Join the Waitlist
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}