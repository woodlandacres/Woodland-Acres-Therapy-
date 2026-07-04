import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/portal/groups")({
  component: PortalGroupsList,
});

function PortalCoursesList() {
  const registeredGroups = [
    {
      id: "ocd-group",
      name: "The ERP Integration Lounge",
      focus: "OCD Support & Exposure Practice",
      schedule: "Weekly on Tuesdays, 6:00 PM – 7:15 PM PST",
      nextMeeting: "Tonight at 6:00 PM PST (Active)",
      zoomLink: "https://zoom.us/j/98877665544 (Mock clinical secure link)",
      facilitator: "Woodland Acres Therapist"
    }
  ];

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E8]/50">
      {/* Sub Header */}
      <section className="bg-white border-b border-forest/10 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-serif font-bold text-gray-900">My Support Groups</h1>
          </div>
        </div>
      </section>

      {/* Main Groups area */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Active groups list */}
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-gray-900">My Registered Groups</h2>
            
            {registeredGroups.map((group) => (
              <div 
                key={group.id} 
                className="bg-white rounded-3xl p-6 sm:p-8 border border-forest/10 shadow-lg flex flex-col sm:flex-row justify-between gap-6"
              >
                <div className="space-y-4 flex-grow">
                  <span className="inline-flex items-center rounded-md bg-forest/5 border border-forest/15 px-2.5 py-0.5 text-xs font-semibold text-forest">
                    {group.focus}
                  </span>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900">{group.name}</h3>
                    <p className="text-xs font-bold text-forest mt-1">{group.schedule}</p>
                  </div>
                  <p className="text-xs text-gray-500 font-sans">Facilitator: {group.facilitator}</p>
                  
                  <div className="bg-amber-50 rounded-xl p-4 border border-amber-100 text-xs text-amber-900 font-medium">
                    ⚠️ <strong>Next Session:</strong> {group.nextMeeting}. Please have your Module 4 Exposure Hierarchy worksheet handy.
                  </div>
                </div>

                <div className="sm:w-48 flex sm:flex-col justify-end border-t sm:border-t-0 sm:border-l border-gray-150 pt-4 sm:pt-0 sm:pl-6">
                  <a
                    href={group.zoomLink}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-center w-full rounded-xl bg-forest py-3 text-xs font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
                  >
                    Join HIPAA Zoom Room
                  </a>
                </div>
              </div>
            ))}
          </div>

          {/* Group Rules and Safety */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-forest/5 shadow-md space-y-6">
            <h3 className="text-lg font-serif font-bold text-gray-900 border-b border-gray-100 pb-3">
              Clinical Group Guidelines
            </h3>
            <ul className="list-disc pl-5 text-xs text-gray-650 space-y-3.5 font-sans leading-relaxed">
              <li>
                <strong>HIPAA & Confidentiality:</strong> What is shared in group stays in group. Taking screenshots, recording, 
                or sharing participants' names or details outside of this private room is strictly prohibited and is grounds for immediate 
                clinical discharge from the practice.
              </li>
              <li>
                <strong>Sensory Checking & Headphones:</strong> To maintain data privacy, please wear headphones if other individuals are 
                in your physical space. Log in from a quiet, private, well-lit environment.
              </li>
              <li>
                <strong>Safe & Respectful Connection:</strong> We are all working through intense, complex mind paths. Practice non-judgmental 
                validation, respect boundaries, and focus on supporting each other's target exposures or emotional pacing.
              </li>
            </ul>
          </div>

        </div>
      </section>
    </div>
  );
}
