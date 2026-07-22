import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/contact/thank-you")({
  component: ThankYouPage,
});

function ThankYouPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <section className="flex-grow flex items-center justify-center bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] px-4">
        <div className="max-w-lg mx-auto text-center space-y-8 py-20">
          <div className="h-20 w-20 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto shadow-md">
            <svg className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h1 className="text-4xl font-serif font-bold text-gray-900 leading-tight">Thank You!</h1>
          <p className="text-lg text-gray-600 font-sans leading-relaxed">
            Your message has been sent successfully. I typically respond within 24-48 business hours.
          </p>
          <div className="pt-4 space-y-4">
            <p className="text-sm text-gray-500 font-sans">
              In the meantime, feel free to explore our services and courses.
            </p>
            <Link
              to="/"
              className="inline-block rounded-xl bg-forest px-6 py-3.5 text-sm font-semibold text-white shadow-md hover:bg-forest-dark transition-all"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}