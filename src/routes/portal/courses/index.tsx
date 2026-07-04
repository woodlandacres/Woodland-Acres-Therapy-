import { createFileRoute, Link } from "@tanstack/react-router";

export const Route = createFileRoute("/portal/courses/")({
  component: PortalCoursesList,
});

function PortalCoursesList() {
  const enrolledCourses = [
    {
      id: "ocd-course",
      title: "ERP Mechanics for Severe OCD",
      subtitle: "A step-by-step masterclass in Exposure and Response Prevention.",
      progress: 67,
      completedModules: 4,
      totalModules: 6,
      nextLesson: "Module 5: Disarming Mental Compulsions",
      imageText: "ERP OCD"
    }
  ];

  const availableCourses = [
    {
      id: "neurodivergent-relationships",
      title: "Neurodivergent Relationship Dynamics",
      subtitle: "A neuro-affirming guide to communication, division of labor, and intimacy.",
      totalModules: 4,
      imageText: "ND Relationships"
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
            <h1 className="text-3xl font-serif font-bold text-gray-900">My Online Courses</h1>
          </div>
        </div>
      </section>

      {/* Courses Area */}
      <section className="py-10">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 space-y-10">
          
          {/* Enrolled Courses */}
          <div className="space-y-6">
            <h2 className="text-xl font-serif font-bold text-gray-900">Enrolled Programs</h2>
            
            {enrolledCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-3xl p-6 sm:p-8 border border-forest/10 shadow-lg flex flex-col sm:flex-row justify-between gap-6"
              >
                <div className="space-y-4 flex-grow">
                  <span className="inline-flex items-center rounded-md bg-forest/5 border border-forest/15 px-2.5 py-0.5 text-xs font-semibold text-forest">
                    Active Program
                  </span>
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-gray-900">{course.title}</h3>
                    <p className="text-xs text-gray-500 font-sans mt-0.5">{course.subtitle}</p>
                  </div>
                  
                  {/* Progress bar info */}
                  <div className="space-y-2 max-w-md">
                    <div className="flex justify-between text-xs text-gray-650 font-semibold font-sans">
                      <span>Course Progress: {course.completedModules}/{course.totalModules} Modules</span>
                      <span>{course.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-100 h-2 rounded-full overflow-hidden">
                      <div className="bg-forest h-full" style={{ width: `${course.progress}%` }} />
                    </div>
                    <p className="text-xs text-gray-400 font-medium">Next Up: {course.nextLesson}</p>
                  </div>
                </div>

                <div className="sm:w-48 flex sm:flex-col justify-end border-t sm:border-t-0 sm:border-l border-gray-150 pt-4 sm:pt-0 sm:pl-6">
                  <Link
                    to={`/portal/courses/${course.id}`}
                    className="block text-center w-full rounded-xl bg-forest py-3 text-xs font-semibold text-white hover:bg-forest-dark transition-colors shadow-sm"
                  >
                    Resume Course
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Available Programs (practice clients can claim free) */}
          <div className="space-y-6">
            <div className="border-t border-forest/10 pt-8" />
            <h2 className="text-xl font-serif font-bold text-gray-900">Available Practice Programs</h2>
            <p className="text-xs text-gray-500 leading-relaxed font-sans">
              As an active individual client at Woodland Acres Therapy, you are entitled to full complimentary enrollment in all 
              practice online courses. Click below to add them to your secure dashboard.
            </p>

            {availableCourses.map((course) => (
              <div 
                key={course.id} 
                className="bg-white rounded-3xl p-6 sm:p-8 border border-forest/5 shadow-md flex flex-col sm:flex-row justify-between gap-6 hover:border-forest/20 transition-all"
              >
                <div className="space-y-3 flex-grow">
                  <span className="inline-flex items-center rounded-md bg-brown-warm/5 border border-brown-warm/15 px-2.5 py-0.5 text-xs font-semibold text-brown-warm">
                    Complimentary Program
                  </span>
                  <div>
                    <h3 className="text-xl font-serif font-bold text-gray-900">{course.title}</h3>
                    <p className="text-xs text-gray-500 font-sans mt-0.5">{course.subtitle}</p>
                  </div>
                  <p className="text-xs text-gray-400 font-medium">{course.totalModules} Modules • Lifetime Access Included</p>
                </div>

                <div className="sm:w-48 flex sm:flex-col justify-end border-t sm:border-t-0 sm:border-l border-gray-150 pt-4 sm:pt-0 sm:pl-6">
                  <button
                    onClick={() => alert(`Successfully enrolled in ${course.title}! (Mock enrollment complete)`)}
                    className="block text-center w-full rounded-xl border border-forest/25 py-3 text-xs font-semibold text-forest bg-white hover:bg-forest/5 transition-colors"
                  >
                    Claim Free Enrollment
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>
    </div>
  );
}
