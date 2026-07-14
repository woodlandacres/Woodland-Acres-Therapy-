// Woodland Acres Therapy Contact Page - Secure JSON file-based form submission (Bypasses SQLite locks)
import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { portalApi } from "../portalServer";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [interest, setInterest] = useState("");
  const [insurance, setInsurance] = useState("");
  const [message, setMessage] = useState("");

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await portalApi({
        data: {
          action: "submitContactForm",
          payload: { name, email, phone, interest, insurance, message },
        },
      });

      if (res && res.success) {
        setSuccess(true);
      } else {
        setError("Unable to send message. Please try again or email directly.");
      }
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to connect to the secure portal. Please try direct email or try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      {/* Header banner */}
      <section className="py-16 sm:py-24 bg-gradient-to-b from-[#ECE5D8] to-[#F5F0E8] border-b border-forest/10 text-center">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <span className="text-xs font-bold text-brown-warm uppercase tracking-widest block mb-3">Begin Your Healing Sanctuary</span>
          <h1 className="text-4xl sm:text-5xl font-serif font-bold text-gray-900 leading-tight">
            Connect With Us
          </h1>
          <p className="mt-4 text-base sm:text-xl text-gray-600 max-w-2xl mx-auto font-sans leading-relaxed">
            Ready to explore specialized individual therapy, therapeutic online courses, or facilitated support groups? 
            Reach out today to schedule your complimentary consultation.
          </p>
        </div>
      </section>

      {/* Contact Form */}
      <section className="py-16 bg-white border-b border-forest/10">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-serif font-bold text-gray-900">Send Us a Message</h2>
            <p className="mt-3 text-gray-600">Fill out the form below and we'll get back to you within 24-48 business hours.</p>
          </div>

          {error && (
            <div className="rounded-xl bg-red-50 p-4 text-xs font-semibold text-red-700 border border-red-100 max-w-xl mx-auto mb-6">
              {error}
            </div>
          )}

          {success ? (
            <div className="bg-cream/35 border border-forest/15 rounded-3xl p-8 sm:p-12 text-center max-w-xl mx-auto shadow-lg space-y-6">
              <div className="h-16 w-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto shadow-md">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-serif font-bold text-gray-900">Message Received</h3>
              <p className="text-gray-700 leading-relaxed font-sans">
                Thank you, <span className="font-semibold">{name}</span>! Your contact inquiry has been securely received by our system. 
                We have recorded your interest in <span className="font-semibold">{interest.replace("-", " ")}</span> and our team will reach out to you at <span className="font-semibold">{email}</span> within 24-48 business hours.
              </p>
              <div className="pt-2">
                <button
                  onClick={() => {
                    setSuccess(false);
                    setName("");
                    setEmail("");
                    setPhone("");
                    setInterest("");
                    setInsurance("");
                    setMessage("");
                  }}
                  className="rounded-xl border border-forest/20 text-forest hover:bg-forest hover:text-white px-6 py-2.5 text-sm font-semibold transition-all cursor-pointer"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6 max-w-xl mx-auto">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" id="name" required value={name} onChange={(e) => setName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest bg-cream/30" />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address <span className="text-red-500">*</span></label>
                  <input type="email" id="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest bg-cream/30" />
                </div>
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number</label>
                <input type="tel" id="phone" value={phone} onChange={(e) => setPhone(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest bg-cream/30" />
              </div>

              <div>
                <label htmlFor="interest" className="block text-sm font-semibold text-gray-700 mb-1.5">I'm interested in <span className="text-red-500">*</span></label>
                <select id="interest" required value={interest} onChange={(e) => setInterest(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest bg-cream/30">
                  <option value="">Select a service...</option>
                  <option value="individual-therapy">Individual Therapy</option>
                  <option value="ocd-erp">OCD / ERP Therapy</option>
                  <option value="neurodivergent">Neurodivergent-Affirming Care</option>
                  <option value="chronic-illness">Chronic Illness Support</option>
                  <option value="couples">Couples / Relationship Therapy</option>
                  <option value="ocd-course">OCD Recovery Course</option>
                  <option value="nd-relationships-course">Neurodivergent Relationships Course</option>
                  <option value="support-group">Support Groups</option>
                  <option value="not-sure">Not Sure / General Inquiry</option>
                </select>
              </div>

              <div>
                <label htmlFor="insurance" className="block text-sm font-semibold text-gray-700 mb-1.5">Insurance / Pay Method</label>
                <select id="insurance" value={insurance} onChange={(e) => setInsurance(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest bg-cream/30">
                  <option value="">Select...</option>
                  <option value="aetna">Aetna</option>
                  <option value="bcbs">Blue Cross Blue Shield</option>
                  <option value="cigna">Cigna</option>
                  <option value="self-pay">Self-Pay</option>
                  <option value="other">Other / Not Sure</option>
                </select>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-1.5">Your Message <span className="text-red-500">*</span></label>
                <textarea id="message" rows={5} required value={message} onChange={(e) => setMessage(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-forest focus:border-forest bg-cream/30"></textarea>
              </div>

              <div className="text-center">
                <button type="submit" disabled={loading}
                  className="rounded-xl bg-forest px-8 py-4 text-base font-semibold text-white shadow-md hover:bg-forest-dark transition-all transform hover:-translate-y-0.5 w-full sm:w-auto disabled:bg-forest/50 cursor-pointer">
                  {loading ? "Submitting Secure Request..." : "Send Message"}
                </button>
                <p className="text-xs text-gray-500 mt-4">Your information is securely encrypted and HIPAA protected.</p>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* Contact Cards */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto space-y-8">
            
            {/* Email Card */}
            <div className="bg-cream/35 border border-forest/10 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
              <div className="h-16 w-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto shadow-md mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Email Us Directly</h2>
              <p className="text-gray-600 font-sans mb-4">
                The best way to reach us. We'll respond within 24-48 business hours.
              </p>
              <a
                href="mailto:eweaver@woodlandacrestherapy.org"
                className="text-xl font-semibold text-forest hover:text-forest-dark underline underline-offset-4 decoration-2 decoration-forest/30 hover:decoration-forest transition-all"
              >
                eweaver@woodlandacrestherapy.org
              </a>
            </div>

            {/* Phone Card */}
            <div className="bg-cream/35 border border-forest/10 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
              <div className="h-16 w-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto shadow-md mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Call or Text</h2>
              <p className="text-gray-600 font-sans mb-4">
                Leave a secure voicemail and we'll return your call.
              </p>
              <a
                href="tel:+14145337910"
                className="text-xl font-semibold text-forest hover:text-forest-dark underline underline-offset-4 decoration-2 decoration-forest/30 hover:decoration-forest transition-all"
              >
                (414) 533-7910
              </a>
              <p className="text-xs text-gray-500 mt-3 font-sans">Mon-Fri, 9am - 6pm CST</p>
            </div>

            {/* Location Card */}
            <div className="bg-cream/35 border border-forest/10 rounded-3xl p-8 sm:p-10 shadow-lg text-center">
              <div className="h-16 w-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto shadow-md mb-6">
                <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h2 className="text-2xl font-serif font-bold text-gray-900 mb-2">Practice Location</h2>
              <p className="text-gray-600 font-sans">
                Based in Wisconsin
              </p>
              <p className="text-gray-600 font-sans">
                Serving clients virtually throughout Wisconsin and Michigan
              </p>
            </div>

            {/* Hours */}
            <div className="text-center">
              <p className="text-sm text-gray-500 font-sans">
                Virtual-First Practice. All sessions held via secure telehealth platform.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
