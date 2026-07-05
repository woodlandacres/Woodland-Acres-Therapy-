// Woodland Acres Therapy Contact Page - FormSubmit.io integration
import { createFileRoute } from "@tanstack/react-router";
import { useState, useEffect } from "react";

export const Route = createFileRoute("/contact")({
  component: ContactPage,
});

function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("submitted") === "true") {
      setSubmitted(true);
      // Clean up the URL without reloading
      window.history.replaceState({}, "", "/contact");
    }
  }, []);

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
            Ready to explore specialized individual therapy, therapeutic courses, or facilitated support groups? 
            Reach out today to start your complimentary consultation.
          </p>
        </div>
      </section>

      {/* Main Content (Info left, Form right) */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 sm:gap-16 items-start">
            
            {/* Left Col: Contact Information */}
            <div className="lg:col-span-5 space-y-10">
              <div className="space-y-4">
                <h2 className="text-3xl font-serif font-bold text-gray-900">How to Reach the Practice</h2>
                <p className="text-base text-gray-650 leading-relaxed font-sans">
                  Whether you are a potential client looking for specialized therapy or a fellow provider seeking to 
                  collaborate, our secure channels are open.
                </p>
              </div>

              {/* Contact Cards */}
              <div className="space-y-6 text-sm font-sans text-gray-700">
                <div className="flex gap-4 items-start p-5 rounded-2xl bg-cream/30 border border-forest/5">
                  <div className="p-2 rounded-xl bg-forest text-white">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-gray-900 text-base">Practice Phone</h4>
                    <p className="mt-1">(414) 533-7910</p>
                    <p className="text-xs text-gray-500 mt-0.5">Secure clinical voicemail • Available Mon-Fri, 9am - 6pm CST</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-5 rounded-2xl bg-cream/30 border border-forest/5">
                  <div className="p-2 rounded-xl bg-forest text-white">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-gray-900 text-base">Secure Email</h4>
                    <a href="mailto:eweaver@woodlandacrestherapy.org" className="mt-1 block hover:underline hover:text-forest">
                      eweaver@woodlandacrestherapy.org
                    </a>
                    <p className="text-xs text-gray-500 mt-0.5">HIPAA-compliant, encrypted inbox for general inquiries and scheduling.</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start p-5 rounded-2xl bg-cream/30 border border-forest/5">
                  <div className="p-2 rounded-xl bg-forest text-white">
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-gray-900 text-base">Practice Location</h4>
                    <p className="mt-1">
                      Based in Wisconsin • Serving WI & MI virtually
                    </p>
                    <p className="text-xs text-gray-500 mt-0.5">Virtual-First Practice. Serving clients virtually throughout Wisconsin and Michigan.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Col: Consultation Inquiry Form */}
            <div className="lg:col-span-7 bg-cream/35 border border-forest/10 rounded-3xl p-6 sm:p-10 shadow-lg">
              {submitted ? (
                <div className="text-center py-10 space-y-6">
                  <div className="h-16 w-16 bg-forest/10 text-forest rounded-full flex items-center justify-center mx-auto shadow-md">
                    <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div className="space-y-3 max-w-md mx-auto">
                    <h3 className="font-serif text-2xl font-bold text-gray-900">Thank You!</h3>
                    <p className="text-sm text-gray-600 leading-relaxed font-sans">
                      Your message has been sent successfully. Our licensed specialist will review your clinical goals and contact you 
                      within 24–48 business hours to schedule your free consultation.
                    </p>
                  </div>
                  <a
                    href="/contact"
                    className="text-xs font-bold text-forest uppercase tracking-wider hover:underline inline-block"
                  >
                    Send Another Message
                  </a>
                </div>
              ) : (
                <form
                  action="https://formsubmit.co/eweaver@woodlandacrestherapy.org"
                  method="POST"
                  className="space-y-6"
                >
                  {/* FormSubmit configuration */}
                  <input type="hidden" name="_subject" value="New Website Inquiry from Woodland Acres Therapy" />
                  <input type="hidden" name="_captcha" value="true" />
                  <input type="hidden" name="_next" value="https://woodlandacrestherapy.com/contact?submitted=true" />
                  <input type="hidden" name="_autoresponse" value="Thank you for reaching out to Woodland Acres Therapy. We have received your inquiry and a licensed specialist will respond within 24-48 business hours to schedule your free consultation." />
                  <input type="hidden" name="_template" value="table" />

                  <h3 className="font-serif text-2xl font-bold text-gray-900 mb-2">Schedule Consultation / Send Inquiry</h3>
                  <p className="text-xs text-gray-500 font-sans leading-relaxed">
                    Note: To receive clinical counseling, you must reside in <strong>Wisconsin</strong> or <strong>Michigan</strong> state. Self-paced course enrollment is open globally.
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Name */}
                    <div className="space-y-1.5">
                      <label htmlFor="name" className="text-xs font-bold text-gray-600 uppercase font-sans">Your Full Name</label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        placeholder="Jane Doe"
                        className="w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest"
                      />
                    </div>

                    {/* Email */}
                    <div className="space-y-1.5">
                      <label htmlFor="email" className="text-xs font-bold text-gray-600 uppercase font-sans">Email Address</label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        placeholder="rowan@example.com"
                        className="w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Phone */}
                    <div className="space-y-1.5">
                      <label htmlFor="phone" className="text-xs font-bold text-gray-600 uppercase font-sans">Phone Number</label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        placeholder="(414) 533-7910"
                        className="w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest"
                      />
                    </div>

                    {/* State of Residence */}
                    <div className="space-y-1.5">
                      <label htmlFor="state" className="text-xs font-bold text-gray-600 uppercase font-sans">State of Residence</label>
                      <select
                        id="state"
                        name="state"
                        required
                        className="w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest"
                      >
                        <option value="">-- Select Your State --</option>
                        <option value="Wisconsin">Wisconsin</option>
                        <option value="Michigan">Michigan</option>
                        <option value="Other">Other State (Course Only)</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Subject */}
                    <div className="space-y-1.5">
                      <label htmlFor="subject" className="text-xs font-bold text-gray-600 uppercase font-sans">Inquiry Subject</label>
                      <select
                        id="subject"
                        name="subject"
                        className="w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest"
                      >
                        <option value="Free 15-Minute Consultation">Free 15-Minute Consultation</option>
                        <option value="General Therapy Question">General Therapy Question</option>
                        <option value="Referring Provider / Professional Inquiry">Referring Provider / Professional Inquiry</option>
                        <option value="Online Course / Group Syllabus Question">Online Course / Group Syllabus Question</option>
                      </select>
                    </div>

                    {/* Contact Method */}
                    <div className="space-y-1.5">
                      <label htmlFor="contactMethod" className="text-xs font-bold text-gray-600 uppercase font-sans">Preferred Contact Method</label>
                      <select
                        id="contactMethod"
                        name="contact_method"
                        className="w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest"
                      >
                        <option value="Email">Email Me</option>
                        <option value="Phone">Call Me</option>
                        <option value="Text">Text Me</option>
                      </select>
                    </div>
                  </div>

                  {/* Message */}
                  <div className="space-y-1.5">
                    <label htmlFor="message" className="text-xs font-bold text-gray-600 uppercase font-sans">Briefly describe your goals / symptoms</label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      placeholder="Hi, I am looking to schedule a consultation for ERP for OCD..."
                      className="w-full rounded-xl bg-white border border-forest/15 px-4 py-3 text-sm focus:outline-none focus:border-forest"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-forest py-4 font-semibold text-white hover:bg-forest-dark transition-colors shadow-md"
                  >
                    Submit My Consultation Inquiry
                  </button>
                </form>
              )}
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}