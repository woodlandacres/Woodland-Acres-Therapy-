import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { usePortalSession, PortalLayout } from "./auth-helper";
import { getAllCourses, checkoutCourse } from "../../portalServer";

export const Route = createFileRoute("/portal/checkout")({
  component: PortalCheckout,
});

function PortalCheckout() {
  const { user, token, loading, handleLogout } = usePortalSession("patient");
  const [courses, setCourses] = useState<any[]>([]);
  const [selectedCourse, setSelectedCourse] = useState<any>(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [checkingOut, setCheckingOut] = useState(false);
  const navigate = useNavigate();

  // Mock Card Form State
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("4242 •••• •••• 4242");
  const [expiry, setExpiry] = useState("12/28");
  const [cvc, setCvc] = useState("123");

  useEffect(() => {
    if (!token || !user) return;

    getAllCourses({ data: { token } })
      .then((res) => {
        // Only show courses they are NOT enrolled in
        const unEnrolled = res.courses.filter((c: any) => !c.isEnrolled);
        setCourses(unEnrolled);
        if (unEnrolled.length > 0) {
          setSelectedCourse(unEnrolled[0]);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch available courses for purchase.");
      });
  }, [token, user]);

  const handleCheckoutSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!token || !selectedCourse) return;
    setCheckingOut(true);
    setError("");
    setSuccess("");

    try {
      await checkoutCourse({
        data: {
          token,
          courseId: selectedCourse.id,
        },
      });
      setSuccess(`Congratulations! You have successfully enrolled in "${selectedCourse.title}"!`);
      // Remove selected from list
      setCourses((prev) => prev.filter((c) => c.id !== selectedCourse.id));
      setSelectedCourse(null);
    } catch (err: any) {
      setError(err?.message || "Secure checkout failed.");
    } finally {
      setCheckingOut(false);
    }
  };

  return (
    <PortalLayout user={user} loading={loading} activeTab="courses" handleLogout={handleLogout}>
      <div className="space-y-8 font-sans max-w-4xl mx-auto">
        {/* Header */}
        <div className="space-y-1">
          <Link to="/portal/student/courses" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
            ← Back to Courses
          </Link>
          <h1 className="text-3xl font-serif font-bold text-gray-900 leading-tight">Secure Practice Checkout</h1>
          <p className="text-sm text-gray-650">Purchase self-paced courses and specialized integration materials securely.</p>
        </div>

        {error && (
          <div className="p-4 bg-red-50 border border-red-200 text-sm text-red-700 rounded-xl">
            {error}
          </div>
        )}
        {success && (
          <div className="p-4 bg-emerald-50 border border-emerald-200 text-sm text-emerald-700 rounded-xl space-y-4">
            <p className="font-semibold">{success}</p>
            <Link
              to="/portal/student/courses"
              className="inline-block rounded-xl bg-forest px-4 py-2.5 text-xs font-bold text-white hover:bg-forest-dark transition-all"
            >
              Go to Classroom
            </Link>
          </div>
        )}

        {!success && (
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
            {/* Left: Checkout Form */}
            <div className="md:col-span-7 bg-white border border-forest/10 rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
              <h2 className="text-xl font-serif font-bold text-gray-900 border-b border-gray-100 pb-3">Secure Payment Information</h2>
              
              {selectedCourse ? (
                <form onSubmit={handleCheckoutSubmit} className="space-y-5">
                  {/* Selected Course Selector */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-gray-600 uppercase">Selected Curriculum</label>
                    <select
                      className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                      value={selectedCourse.id}
                      onChange={(e) => {
                        const course = courses.find((c) => c.id === parseInt(e.target.value));
                        setSelectedCourse(course);
                      }}
                    >
                      {courses.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.title} — ${(c.price_cents / 100).toFixed(2)}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Card Name */}
                  <div className="space-y-1.5">
                    <label htmlFor="card-name" className="text-xs font-bold text-gray-600 uppercase">Name on Card</label>
                    <input
                      id="card-name"
                      type="text"
                      required
                      placeholder="Alex Mercer"
                      className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                      value={cardName}
                      onChange={(e) => setCardName(e.target.value)}
                    />
                  </div>

                  {/* Card Details */}
                  <div className="space-y-1.5">
                    <label htmlFor="card-num" className="text-xs font-bold text-gray-600 uppercase">Card Number</label>
                    <input
                      id="card-num"
                      type="text"
                      required
                      className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest font-mono"
                      value={cardNumber}
                      onChange={(e) => setCardNumber(e.target.value)}
                    />
                  </div>

                  {/* Expiry and CVC */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label htmlFor="expiry" className="text-xs font-bold text-gray-600 uppercase">Expiration (MM/YY)</label>
                      <input
                        id="expiry"
                        type="text"
                        required
                        className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                        value={expiry}
                        onChange={(e) => setExpiry(e.target.value)}
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label htmlFor="cvc" className="text-xs font-bold text-gray-600 uppercase">CVC Code</label>
                      <input
                        id="cvc"
                        type="text"
                        required
                        className="w-full rounded-xl border border-forest/15 bg-white px-4 py-3 text-sm focus:outline-none focus:border-forest"
                        value={cvc}
                        onChange={(e) => setCvc(e.target.value)}
                      />
                    </div>
                  </div>

                  {/* Pay button */}
                  <button
                    type="submit"
                    disabled={checkingOut}
                    className="w-full rounded-xl bg-forest py-4 font-semibold text-white shadow-md hover:bg-forest-dark transition-all disabled:opacity-50 mt-2"
                  >
                    {checkingOut 
                      ? "Authorizing HIPAA Secure Transaction..." 
                      : `Pay $${(selectedCourse.price_cents / 100).toFixed(2)} & Complete Enrollment`
                    }
                  </button>
                </form>
              ) : (
                <div className="text-center py-10">
                  <p className="text-sm text-gray-500">You are already enrolled in all available courses!</p>
                </div>
              )}
            </div>

            {/* Right: Summary panel */}
            <div className="md:col-span-5 bg-cream border border-forest/15 rounded-3xl p-6 shadow-md space-y-4">
              <h3 className="font-serif text-lg font-bold text-gray-900">Order Summary</h3>
              {selectedCourse ? (
                <div className="space-y-4 text-sm">
                  <div className="border-b border-forest/10 pb-3 flex justify-between items-center gap-2">
                    <div>
                      <h4 className="font-bold text-gray-900">{selectedCourse.title}</h4>
                      <p className="text-[10px] text-gray-500 mt-0.5">Complimentary practice curriculum</p>
                    </div>
                    <span className="font-bold text-gray-900 shrink-0">
                      ${(selectedCourse.price_cents / 100).toFixed(2)}
                    </span>
                  </div>

                  <div className="flex justify-between items-center font-bold text-gray-900">
                    <span>Total Due:</span>
                    <span>${(selectedCourse.price_cents / 100).toFixed(2)}</span>
                  </div>

                  <p className="text-[10px] text-gray-500 leading-relaxed font-sans mt-4">
                    * This transaction is processed through our encrypted private server. By purchasing, you receive lifetime self-paced course updates, peer discussion board access, and clinical worksheets.
                  </p>
                </div>
              ) : (
                <p className="text-xs text-gray-500 italic">No course selected.</p>
              )}
            </div>
          </div>
        )}
      </div>
    </PortalLayout>
  );
}
