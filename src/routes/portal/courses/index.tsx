import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/portal/courses/")({
  component: RedirectToStudentCourses,
});

function RedirectToStudentCourses() {
  const navigate = useNavigate();
  useEffect(() => {
    navigate({ to: "/portal/student/courses", replace: true });
  }, [navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#F5F0E8] font-sans">
      <p className="text-sm font-semibold text-gray-600">Routing to Your Secure Classroom...</p>
    </div>
  );
}
