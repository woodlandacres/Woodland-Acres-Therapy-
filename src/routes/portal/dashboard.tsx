import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/portal/dashboard")({
  component: PortalDashboard,
});

function PortalDashboard() {
  const clientName = "Alex Mercer";
  const upcomingGroup = {
    name: "The ERP Integration Lounge",
    time: "Tonight at 6:00 PM PST",
    zoom: "https://zoom.us/j/98877665544 (Mock clinical secure link)",
    facilitator: "Practice Therapist"
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E8]/50">
      {/* Sub Header */}
      <section className="bg-white border-b border-forest/10 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <span className="text-xs font-bold text-brown-warm uppercase tracking-wider block">HIPAA-Secure Clinical Portal</span>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Welcome Back, {clientName}</h1>
          </div>
          <div className="flex gap-3">
            <Link
              to="/portal"
              className="rounded-xl border border-gray-200 px-4 py-2 text-xs font-semibold text-gray-700 bg-white hover:bg-gray-50 transition-colors"
            >
              Sign Out
            </Link>
          </div>
        </div>
      </section>

      {/* Main Grid */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Col: Main Navigation Cards */}
            <div className="lg:col-span-8 space-y-8">
              
              {/* Emergency Alert Widget */}
              <div className="bg-[#2D5A3D]/5 border border-[#2D5A3D]/25 rounded-2xl p-4 flex gap-3 text-xs text-[#2D5A3D] font-medium leading-relaxed font-sans">
                <span className="text-base">ℹ</span>
                <p>
                  <strong>Portal Info:</strong> This is a secure patient workstation. All clinical logs, exposure uploads, 
                  and worksheets are protected under HIPAA data privacy standards. For medical or mental health emergencies, 
                  please dial <strong>988</strong> or visit your nearest ER.
                </p>
              </div>

              {/* Grid of the 3 Key Functions */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                
                {/* Card 1: Courses */}
                <div className="bg-white rounded-2xl p-6 border border-forest/5 shadow-md flex flex-col justify-between hover:border-forest transition-colors">
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-4">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">My Online Courses</h3>
                    <p className="text-xs text-gray-500 font-sans mb-4">Resume lectures, modules, and lessons.</p>
                  </div>
                  <Link
                    to="/portal/courses"
                    className="text-xs font-bold text-forest uppercase tracking-wider hover:underline"
                  >
                    Open School →
                  </Link>
                </div>

                {/* Card 2: Groups */}
                <div className="bg-white rounded-2xl p-6 border border-forest/5 shadow-md flex flex-col justify-between hover:border-forest transition-colors">
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-4">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">My Support Groups</h3>
                    <p className="text-xs text-gray-500 font-sans mb-4">Check schedules and active Zoom links.</p>
                  </div>
                  <Link
                    to="/portal/groups"
                    className="text-xs font-bold text-forest uppercase tracking-wider hover:underline"
                  >
                    Open Groups →
                  </Link>
                </div>

                {/* Card 3: Assignments */}
                <div className="bg-white rounded-2xl p-6 border border-forest/5 shadow-md flex flex-col justify-between hover:border-forest transition-colors">
                  <div>
                    <div className="h-10 w-10 rounded-xl bg-forest/10 text-forest flex items-center justify-center mb-4">
                      <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <h3 className="font-serif text-lg font-bold text-gray-900 mb-1">Worksheets & Logs</h3>
                    <p className="text-xs text-gray-500 font-sans mb-4">Download PDF templates and upload hierarchies.</p>
                  </div>
                  <Link
                    to="/portal/assignments"
                    className="text-xs font-bold text-forest uppercase tracking-wider hover:underline"
                  >
                    Open Logs →
                  </Link>
                </div>

              </div>

              {/* Course Progress Spotlight */}
              <div className="bg-white rounded-3xl p-6 border border-forest/10 shadow-lg space-y-4">
                <span className="text-xs font-bold text-brown-warm uppercase tracking-wider">Active Course Progress</span>
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-gray-150 pb-4">
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900">ERP Mechanics for Severe OCD</h3>
                    <p className="text-xs text-gray-500 mt-0.5">Resume Section: Module 4 — Real-Life Exposures</p>
                  </div>
                  <Link
                    to="/portal/courses/ocd-course"
                    className="rounded-xl bg-forest px-4.5 py-2 text-xs font-semibold text-white hover:bg-forest-dark transition-colors"
                  >
                    Resume Learning
                  </Link>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs text-gray-650 font-semibold font-sans">
                    <span>Course Completion Progress:</span>
                    <span>67% Completed</span>
                  </div>
                  {/* Progress bar */}
                  <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                    <div className="bg-forest h-full w-[67%] rounded-full" />
                  </div>
                </div>
              </div>

            </div>

            {/* Right Col: Group Meeting & Messages */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Upcoming Group Meeting Card */}
              <div className="rounded-3xl border border-forest/15 bg-cream p-6 shadow-lg space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold text-brown-warm uppercase tracking-wider">Upcoming Group meeting</span>
                  <span className="animate-pulse flex h-2 w-2 rounded-full bg-forest" />
                </div>
                <div className="space-y-2">
                  <h4 className="font-serif text-lg font-bold text-gray-900">{upcomingGroup.name}</h4>
                  <p className="text-xs font-bold text-forest">{upcomingGroup.time}</p>
                  <p className="text-[11px] text-gray-500">Facilitated by: {upcomingGroup.facilitator}</p>
                </div>
                <a
                  href={upcomingGroup.zoom}
                  target="_blank"
                  rel="noreferrer"
                  className="block text-center w-full rounded-xl bg-forest py-3 text-xs font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
                >
                  Join HIPAA Zoom Room
                </a>
              </div>

              {/* Secure Clinician Messaging inbox mock */}
              <div className="rounded-3xl border border-forest/10 bg-white p-6 shadow-md space-y-4">
                <h4 className="font-serif text-md font-bold text-gray-900">Secure Clinician Inbox</h4>
                
                <div className="space-y-3">
                  <div className="p-3 bg-cream/40 rounded-xl border border-forest/5 space-y-2">
                    <div className="flex justify-between text-[10px] font-semibold text-gray-500">
                      <span>Your Therapist</span>
                      <span>Yesterday, 3:14 PM</span>
                    </div>
                    <p className="text-xs text-gray-700 leading-relaxed font-sans">
                      "Alex, I reviewed your Level 4 hierarchy log. Your ratings look highly realistic. 
                      Let's focus on entering the bathroom without immediate washing as our target on Tuesday. You can do this!"
                    </p>
                  </div>
                </div>

                <div className="pt-2 text-center">
                  <Link
                    to="/contact"
                    className="text-xs font-bold text-forest uppercase tracking-wider hover:underline"
                  >
                    Reply Secure Message →
                  </Link>
                </div>
              </div>

            </div>

          </div>
        </div>
      </section>
    </div>
  );
}
