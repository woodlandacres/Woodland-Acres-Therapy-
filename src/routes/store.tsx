import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/store")({
  component: StorePage,
});

const PRODUCTS = [
  {
    name: "Read the Room: Healthy Relationships & Decision-Making Toolkit",
    price: "$59.99",
    href: "https://northwoodbehavioralsupplyco.com/shop/GOcQwJjS",
    image:
      "https://fqnzgstimsmpxdztkdup.supabase.co/storage/v1/object/public/images/GOcQwJjS/model1-2026-09-03T14-14-15-031Z.webp",
    badge: "Conversational Card Game",
    description:
      "A conversational card game for elementary and middle school kids that presents real-life social scenarios and asks players to choose the healthiest response. Covers friendship, family, and early romantic situations, with facilitator materials for therapists, counselors, and teachers.",
  },
  {
    name: "Dough Tell",
    price: "$35.99",
    href: "https://northwoodbehavioralsupplyco.com/shop/wtlQfyJn",
    image:
      "https://fqnzgstimsmpxdztkdup.supabase.co/storage/v1/object/public/images/wtlQfyJn/model1-2026-09-03T15-07-37-386Z.webp",
    badge: "Play Therapy Deck",
    description:
      "A play therapy 'Pictionary'-style card deck paired with play dough, designed for tactile, expressive play that helps kids put feelings into words through sculpting.",
  },
];

function StorePage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Page Header */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block mb-3">
            Northwood Behavioral Supply Co.
          </span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            The Woodland Acres Store
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Tools for the people who help people. Practical, creative resources for
            therapists, counselors, educators, and families — from our sister shop,
            Northwood Behavioral Supply Co.
          </p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 bg-[#F5F0E8] border-t border-forest/5">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {PRODUCTS.map((product) => (
              <div
                key={product.name}
                className="bg-white rounded-3xl overflow-hidden border border-forest/10 shadow-md hover:shadow-xl hover:shadow-forest/10 transition-all flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden bg-[#ECE5D8]">
                  <img
                    src={product.image}
                    alt={product.name}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-7 flex flex-col flex-grow">
                  <div className="flex items-center justify-between gap-3 mb-3">
                    <span className="text-[10px] font-bold uppercase tracking-widest text-brown-warm border border-forest/10 bg-forest/5 text-forest px-2.5 py-1 rounded-md">
                      {product.badge}
                    </span>
                    <span className="text-xl font-serif font-bold text-forest">
                      {product.price}
                    </span>
                  </div>
                  <h2 className="text-lg sm:text-xl font-serif font-bold text-gray-900 leading-snug mb-3">
                    {product.name}
                  </h2>
                  <p className="text-sm text-gray-600 leading-relaxed font-sans mb-6 flex-grow">
                    {product.description}
                  </p>
                  <a
                    href={product.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-xl bg-forest px-5 py-3 text-sm font-semibold text-white shadow-sm hover:bg-forest-dark transition-all"
                  >
                    Shop Now
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Full Store CTA */}
          <div className="mt-14 text-center">
            <p className="text-sm text-gray-600 font-sans mb-4">
              Looking for more tools for your practice, classroom, or family?
            </p>
            <a
              href="https://northwoodbehavioralsupplyco.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-xl border-2 border-forest px-6 py-3 text-sm font-semibold text-forest hover:bg-forest hover:text-white transition-all"
            >
              Visit the full store
              <svg
                className="h-4 w-4"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M4.25 5.5a.75.75 0 00-.75.75v8.5c0 .414.336.75.75.75h8.5a.75.75 0 00.75-.75v-4a.75.75 0 011.5 0v4A2.25 2.25 0 0112.75 17h-8.5A2.25 2.25 0 012 14.75v-8.5A2.25 2.25 0 014.25 4h5a.75.75 0 010 1.5h-5z"
                  clipRule="evenodd"
                />
                <path
                  fillRule="evenodd"
                  d="M6.194 12.753a.75.75 0 001.06.053L16.5 4.44v2.81a.75.75 0 001.5 0v-4.5a.75.75 0 00-.75-.75h-4.5a.75.75 0 000 1.5h2.553l-9.056 8.194a.75.75 0 00-.053 1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}