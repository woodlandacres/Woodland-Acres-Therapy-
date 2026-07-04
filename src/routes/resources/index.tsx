import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/resources/")({
  component: ResourcesIndex,
});

function ResourcesIndex() {
  const blogPosts = [
    {
      slug: "demystifying-ocd-talk-therapy-risks",
      title: "What is ERP Therapy? A Complete Guide to Exposure and Response Prevention for OCD",
      category: "OCD & ERP Treatment",
      date: "July 2, 2026",
      readTime: "10 min read",
      snippet: "An in-depth, clinical yet accessible guide to Exposure and Response Prevention (ERP) therapy, explaining how it treats OCD and rewires the brain."
    },
    {
      slug: "neurodivergent-affirming-lifestyle-guide",
      title: "Therapy for the Neurodivergent Brain: Why One-Size-Fits-All Doesn't Work",
      category: "ADHD & Autism Support",
      date: "June 25, 2026",
      readTime: "10 min read",
      snippet: "Explore why traditional, neurotypical-centric therapy methods often fail or harm ADHDers and autistic adults, and what true neurodivergent-affirming care looks like."
    },
    {
      slug: "navigating-medical-grief-autoimmune",
      title: "Living with Chronic Illness: The Emotional Toll Nobody Talks About",
      category: "Chronic Illness Support",
      date: "June 12, 2026",
      readTime: "12 min read",
      snippet: "An honest, compassionate exploration of the hidden emotional and mental challenges of living with a chronic illness, chronic pain, or invisible disease, integrating the Fennell Four-Phase Model."
    }
  ];

    return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block mb-3">Clinical Insights & Guides</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            The Woodland Acres Library
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Articles, evidence-based guides, and clinical reflections on a wide range of mental health topics — including OCD, ADHD, Autism, 
            chronic illness, grief, trauma, relationships, and life transitions.
          </p>
        </div>
      </section>

      {/* Blog Posts List */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-16">
            {blogPosts.map((post) => (
              <article key={post.slug} className="group border-b border-forest/5 pb-16 last:border-b-0 last:pb-0 space-y-4">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-bold text-forest uppercase tracking-wider">{post.category}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{post.date}</span>
                  <span className="text-gray-400">•</span>
                  <span className="text-gray-500">{post.readTime}</span>
                </div>
                
                <h2 className="text-2xl sm:text-3xl font-serif font-bold text-gray-900 group-hover:text-forest transition-colors leading-tight">
                  <Link to={`/resources/${post.slug}`}>
                    {post.title}
                  </Link>
                </h2>
                
                <p className="text-base text-gray-600 leading-relaxed font-sans">{post.snippet}</p>
                
                <div className="pt-2">
                  <Link 
                    to={`/resources/${post.slug}`}
                    className="inline-flex items-center gap-1 text-sm font-bold text-forest hover:text-forest-dark uppercase tracking-wider"
                  >
                    Read Article & Clinical Guide →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-forest py-16 text-[#F5F0E8] text-center">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-6">
          <h2 className="text-3xl font-serif font-bold">Seeking personalized clinical support?</h2>
          <p className="text-base text-[#F5F0E8]/90 max-w-xl mx-auto leading-relaxed">
            Our articles provide helpful frameworks, but they are not a substitute for clinical care. 
            Schedule a free 15-minute consultation to establish an integrated individual care structure.
          </p>
          <div className="pt-2">
            <Link
              to="/contact"
              className="rounded-xl bg-[#F5F0E8] px-6 py-3.5 text-base font-semibold text-forest shadow-md hover:bg-white transition-colors"
            >
              Contact Our Specialist
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
