import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/portal/courses/$courseId")({
  component: PortalCourseView,
});

function PortalCourseView() {
  const { courseId } = Route.useParams();
  
  const courseDetails = {
    title: "ERP Mechanics for Severe OCD",
    subtitle: "A step-by-step masterclass in Exposure and Response Prevention.",
    modules: [
      {
        id: "m1",
        num: "Module 1",
        title: "The Neurobiology of False Alarms",
        status: "completed",
        lessons: [
          { name: "Lesson 1.1: The Anatomy of OCD", duration: "14 mins", type: "video" },
          { name: "Lesson 1.2: Why Logic Fails", duration: "18 mins", type: "video" },
          { name: "Lesson 1.3: Mapping Your Alarms", duration: "10 mins", type: "worksheet" }
        ]
      },
      {
        id: "m2",
        num: "Module 2",
        title: "The Mechanics of ERP & Inhibitory Learning",
        status: "completed",
        lessons: [
          { name: "Lesson 2.1: Habituation vs. Inhibitory Learning", duration: "22 mins", type: "video" },
          { name: "Lesson 2.2: Decoupling the Threat Loop", duration: "15 mins", type: "video" }
        ]
      },
      {
        id: "m3",
        num: "Module 3",
        title: "Mapping Your Mind: Constructing the Hierarchy",
        status: "completed",
        lessons: [
          { name: "Lesson 3.1: Defining Your SUDS Ratings", duration: "25 mins", type: "video" },
          { name: "Lesson 3.2: Designing Secure Gradual Exposures", duration: "19 mins", type: "video" },
          { name: "Interactive Worksheet: Create Your SUDS Hierarchy", duration: "Download", type: "worksheet" }
        ]
      },
      {
        id: "m4",
        num: "Module 4",
        title: "Practicing In-Vivo (Real Life) Exposures",
        status: "active",
        lessons: [
          { name: "Lesson 4.1: The Guidelines of In-Vivo Practice", duration: "18 mins", type: "video", active: true },
          { name: "Lesson 4.2: Resisting the Urge: Core Strategies", duration: "24 mins", type: "video" },
          { name: "Interactive Log: Your Exposure Response Log", duration: "Download", type: "worksheet" }
        ]
      },
      {
        id: "m5",
        num: "Module 5",
        title: "Disarming Mental Compulsions & Reassurance",
        status: "locked",
        lessons: [
          { name: "Lesson 5.1: Rumination and Neutralizing", duration: "28 mins", type: "video" },
          { name: "Lesson 5.2: Drafting Imaginal Exposure Scripts", duration: "21 mins", type: "video" }
        ]
      },
      {
        id: "m6",
        num: "Module 6",
        title: "Sustaining Recovery & Tolerating Uncertainty",
        status: "locked",
        lessons: [
          { name: "Lesson 6.1: Long-Term Relapse Prevention", duration: "15 mins", type: "video" },
          { name: "Lesson 6.2: Making Friends with Uncertainty", duration: "32 mins", type: "video" }
        ]
      }
    ]
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E8]/50">
      {/* Sub Header */}
      <section className="bg-white border-b border-forest/10 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="space-y-1">
            <Link to="/portal/courses" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
              ← Back to My Courses
            </Link>
            <h1 className="text-3xl font-serif font-bold text-gray-900">{courseDetails.title}</h1>
            <p className="text-xs text-gray-500 font-sans">{courseDetails.subtitle}</p>
          </div>
        </div>
      </section>

      {/* Syllabus Grid Layout */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Modules list */}
            <div className="lg:col-span-8 space-y-6">
              <h2 className="text-xl font-serif font-bold text-gray-900">Program Course Modules</h2>
              
              <div className="space-y-4">
                {courseDetails.modules.map((mod) => (
                  <div 
                    key={mod.id} 
                    className={`bg-white rounded-2xl border p-6 transition-all ${
                      mod.status === "locked" 
                        ? "opacity-50 border-gray-150" 
                        : mod.status === "active"
                        ? "border-forest shadow-md"
                        : "border-forest/10 shadow-sm"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="text-[10px] font-bold text-brown-warm uppercase tracking-wider">{mod.num}</span>
                          <span className={`h-1.5 w-1.5 rounded-full ${
                            mod.status === "completed" ? "bg-forest" : mod.status === "active" ? "bg-amber-500 animate-pulse" : "bg-gray-300"
                          }`} />
                        </div>
                        <h3 className="text-lg font-serif font-bold text-gray-900">{mod.title}</h3>
                      </div>
                      
                      {/* Status pill */}
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md ${
                        mod.status === "completed" 
                          ? "bg-forest/10 text-forest" 
                          : mod.status === "active"
                          ? "bg-amber-100 text-amber-800"
                          : "bg-gray-100 text-gray-400"
                      }`}>
                        {mod.status}
                      </span>
                    </div>

                    {/* Lesson sub-list */}
                    {mod.status !== "locked" && (
                      <div className="mt-6 border-t border-gray-100 pt-4 space-y-3">
                        <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">Lessons:</h4>
                        <div className="grid grid-cols-1 gap-2.5">
                          {mod.lessons.map((lesson, idx) => (
                            <div 
                              key={idx} 
                              className={`flex justify-between items-center p-3 rounded-xl border transition-colors ${
                                'active' in lesson 
                                  ? "bg-forest/5 border-forest/20 font-semibold text-forest" 
                                  : "bg-gray-50/50 border-gray-100 text-gray-700 hover:bg-gray-50"
                              }`}
                            >
                              <div className="flex items-center gap-2 text-xs font-sans">
                                <span className="text-gray-400">
                                  {lesson.type === "video" ? "▶" : "⤓"}
                                </span>
                                <span>{lesson.name}</span>
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-[10px] font-bold text-gray-400">{lesson.duration}</span>
                                {mod.status === "completed" && (
                                  <span className="text-forest text-xs font-bold">✓</span>
                                )}
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Right Col: Course Assets / Worksheets */}
            <div className="lg:col-span-4 sticky top-28 space-y-6">
              <div className="rounded-3xl border border-forest/15 bg-white p-6 shadow-md space-y-6">
                <h3 className="font-serif text-lg font-bold text-gray-900 border-b border-gray-100 pb-3">Course Worksheets</h3>
                
                <div className="space-y-4 text-xs font-sans">
                  {/* Download */}
                  <div className="space-y-2 p-4 rounded-2xl bg-cream/40 border border-forest/5">
                    <h4 className="font-semibold text-gray-900">1. ERP SUDS Hierarchy Template</h4>
                    <p className="text-gray-500">Download our clinical-grade hierarchy template to rate your triggers.</p>
                    <a
                      href="#download"
                      onClick={(e) => { e.preventDefault(); alert("Mock download started!"); }}
                      className="inline-flex font-bold text-forest hover:underline"
                    >
                      Download PDF Template ↓
                    </a>
                  </div>

                  {/* Upload */}
                  <div className="space-y-2.5 p-4 rounded-2xl bg-cream/40 border border-forest/5">
                    <h4 className="font-semibold text-gray-900">2. Upload Completed Hierarchy</h4>
                    <p className="text-gray-500">Submit your hierarchy so your therapist can review it before session.</p>
                    <button
                      onClick={() => alert("Mock upload completed!")}
                      className="w-full text-center rounded-xl bg-forest py-2.5 font-semibold text-white hover:bg-forest-dark transition-colors"
                    >
                      Upload Completed File
                    </button>
                  </div>
                </div>
              </div>

              {/* Group callout */}
              <div className="rounded-2xl border border-forest/10 p-6 bg-cream text-center space-y-3">
                <h4 className="font-serif text-md font-bold text-gray-900">Next Support Group Zoom</h4>
                <p className="text-xs text-gray-650 leading-relaxed font-sans">
                  Tuesday at 6:00 PM PST. Remember to bring your SUDS hierarchy to troubleshoot level 4 exposures.
                </p>
                <Link to="/portal/groups" className="inline-block text-xs font-bold text-forest uppercase tracking-wider hover:underline">
                  My Support Groups →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
