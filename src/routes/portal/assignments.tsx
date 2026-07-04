import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/portal/assignments")({
  component: PortalAssignments,
});

function PortalAssignments() {
  const [completedList, setCompletedList] = useState([
    {
      id: "a1",
      name: "Symptom Mapping & Compulsion Inventory",
      module: "Module 1",
      status: "completed",
      graded: "Reviewed & Verified",
      date: "2026-06-15"
    },
    {
      id: "a2",
      name: "Your Custom SUDS Hierarchy",
      module: "Module 3",
      status: "completed",
      graded: "Reviewed & Approved",
      date: "2026-06-28"
    }
  ]);

  const [activeList, setActiveList] = useState([
    {
      id: "a3",
      name: "Daily Exposure & Response Prevention Log",
      module: "Module 4",
      dueDate: "In 2 days (Thursday)",
      status: "pending",
      desc: "Record at least 3 daily in-vivo exposures regarding Level 4 triggers. Log your pre-exposure SUDS, 10-minute SUDS, and post-exposure SUDS. Note any physical/mental urges to wash or seek reassurance."
    }
  ]);

  const [fileUploaded, setFileUploaded] = useState(false);

  const handleUpload = () => {
    setFileUploaded(true);
    alert("Mock worksheet successfully submitted to Woodland Acres Therapy! (Clinical secure logging complete)");
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#F5F0E8]/50">
      {/* Sub Header */}
      <section className="bg-white border-b border-forest/10 py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div className="space-y-1">
            <Link to="/portal/dashboard" className="text-xs font-bold text-forest uppercase tracking-wider hover:underline">
              ← Back to Dashboard
            </Link>
            <h1 className="text-3xl font-serif font-bold text-gray-900">Worksheets & Assignments</h1>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Active Assignments */}
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-gray-900">Pending Assignments</h2>
            
            {activeList.map((assign) => (
              <div 
                key={assign.id} 
                className="bg-white rounded-3xl p-6 sm:p-8 border border-amber-300 bg-amber-50/5 shadow-lg space-y-6"
              >
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-gray-100 pb-4">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-brown-warm uppercase tracking-wider">{assign.module}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-amber-500 animate-pulse" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-gray-900 mt-1">{assign.name}</h3>
                  </div>
                  <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full uppercase tracking-wider">
                    Due {assign.dueDate}
                  </span>
                </div>

                <p className="text-sm text-gray-650 leading-relaxed font-sans">{assign.desc}</p>

                {/* Submitting section */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-4 border-t border-gray-100">
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">1. Download Template</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Download the interactive PDF log to track your exposures on your computer, tablet, or print it out.
                    </p>
                    <a
                      href="#download"
                      onClick={(e) => { e.preventDefault(); alert("Template downloaded successfully!"); }}
                      className="inline-flex font-bold text-forest text-xs hover:underline"
                    >
                      Download Exposure Log PDF ↓
                    </a>
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wide">2. Submit Log Worksheets</h4>
                    <p className="text-xs text-gray-500 leading-relaxed">
                      Upload your filled-out exposure logs or screenshot files securely.
                    </p>
                    {fileUploaded ? (
                      <span className="inline-flex items-center rounded-md bg-forest/10 px-2.5 py-1 text-xs font-semibold text-forest">
                        ✓ Submitted & Logged
                      </span>
                    ) : (
                      <button
                        onClick={handleUpload}
                        className="rounded-xl bg-forest px-4.5 py-2.5 text-xs font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
                      >
                        Upload Completed Log File
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Completed Assignments */}
          <div className="space-y-6">
            <div className="border-t border-forest/10 pt-8" />
            <h2 className="text-xl font-serif font-bold text-gray-900">Completed Worksheets</h2>
            
            <div className="grid grid-cols-1 gap-4">
              {completedList.map((comp) => (
                <div 
                  key={comp.id} 
                  className="bg-white rounded-2xl p-5 border border-forest/5 shadow-sm flex flex-col sm:flex-row justify-between sm:items-center gap-4 hover:border-forest/20 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[10px] font-bold text-gray-400 uppercase tracking-wide">{comp.module}</span>
                      <span className="h-1.5 w-1.5 rounded-full bg-forest" />
                    </div>
                    <h3 className="text-lg font-serif font-bold text-gray-900">{comp.name}</h3>
                    <p className="text-xs text-gray-400 font-sans">Submitted on: {comp.date}</p>
                  </div>

                  <div className="flex items-center gap-4">
                    <span className="text-xs font-bold text-forest bg-forest/5 border border-forest/10 px-2.5 py-1 rounded-md uppercase tracking-wider">
                      {comp.graded}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}
