import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/resources/")({
  component: ResourcesIndex,
});

function ResourcesIndex() {
  const blogPosts = [
    {
      slug: "ptsd-recovery-workbook",
      title: "The Woodland Path: A Multi-Modal Trauma Recovery & PTSD Workbook",
      category: "Free Digital Workbook",
      date: "August 28, 2026",
      readTime: "60-Page Manual",
      snippet: "A comprehensive, self-guided clinical companion for trauma recovery and post-traumatic growth. Integrates evidence-based worksheets from CBT, DBT, CPT, Prolonged Exposure, and Expressive Arts."
    },
    {
      slug: "finding-ocd-therapist-wisconsin",
      title: "Finding an OCD Therapist in Wisconsin: What to Look for in ERP Treatment",
      category: "OCD & ERP Treatment",
      date: "July 29, 2026",
      readTime: "8 min read",
      snippet: "Struggling to find the right OCD therapist in Wisconsin? Learn how Exposure and Response Prevention (ERP) works, and what to look for in specialized treatment."
    },
    {
      slug: "adhd-therapy-for-adults-wisconsin-michigan",
      title: "ADHD Therapy for Adults in Wisconsin & Michigan: Beyond Medication",
      category: "ADHD & Autism Support",
      date: "July 29, 2026",
      readTime: "7 min read",
      snippet: "Seeking effective ADHD therapy for adults in Wisconsin or Michigan? Explore how a neurodivergent-affirming approach helps with executive functioning and sensory strategies."
    },
    {
      slug: "psychosocial-toll-chronic-illness-wisconsin-michigan",
      title: "The Psychosocial Toll of Chronic Illness: When Your Body Needs More Than Medicine",
      category: "Chronic Illness Support",
      date: "July 29, 2026",
      readTime: "8 min read",
      snippet: "The intersection of chronic illness and mental health goes beyond physical symptoms. Explore the deep psychosocial toll of medical grief, and how therapy can help."
    },
    {
      slug: "can-you-learn-erp-through-online-course",
      title: "Can You Learn ERP Through an Online Course? A Guide to Structured OCD Recovery",
      category: "OCD & ERP Treatment",
      date: "July 29, 2026",
      readTime: "7 min read",
      snippet: "Is an ERP therapy online course effective for OCD recovery? Read our guide on how structured courses, online modules, and group integration can support healing."
    },
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
    },
    {
      slug: "just-right-ocd-symmetry-erp",
      title: "How to Use ERP for 'Just Right' OCD and Symmetry Compulsions",
      category: "OCD & ERP Treatment",
      date: "July 16, 2026",
      readTime: "15 min read",
      snippet: "Discover how to adapt Exposure and Response Prevention (ERP) for 'just right' OCD and symmetry compulsions. Learn the science of somatic tolerance training."
    },
    {
      slug: "autistic-burnout-vs-depression",
      title: "Autistic Burnout vs Depression: How to Tell the Difference",
      category: "ADHD & Autism Support",
      date: "July 10, 2026",
      readTime: "14 min read",
      snippet: "Is it clinical depression or autistic burnout? Discover the critical diagnostic differences, neurological markers, and how to safely heal."
    },
    {
      slug: "bfrb-trichotillomania-dermatillomania-treatment",
      title: "Body-Focused Repetitive Behaviors (BFRBs): When Hair Pulling and Skin Picking Take Over",
      category: "Chronic Illness Support",
      date: "July 5, 2026",
      readTime: "15 min read",
      snippet: "Struggling with compulsive hair pulling or skin picking? Explore evidence-based BFRB treatments, the SCAMP ComB model, and practical somatic coping strategies."
    },
    {
      slug: "intrusive-thoughts-ocd-pure-o-erp",
      title: "Intrusive Thoughts OCD: Why They Feel So Real and How ERP Helps",
      category: "OCD & ERP Treatment",
      date: "June 30, 2026",
      readTime: "15 min read",
      snippet: "Why do intrusive thoughts feel so terrifyingly real? Understand the science of 'Pure O', harm OCD, and how adapted ERP and I-CBT can help you recover."
    },
    {
      slug: "personality-attachment-and-faith",
      title: "Personality, Attachment, and Faith: How Who We Are Shapes Our Spiritual Commitment",
      category: "Faith & Spirituality",
      date: "July 16, 2026",
      readTime: "12 min read",
      snippet: "Research shows that personality traits and attachment styles significantly influence how individuals experience faith, religious commitment, and spiritual satisfaction."
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
            Schedule a consultation to establish an integrated individual care structure.
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
