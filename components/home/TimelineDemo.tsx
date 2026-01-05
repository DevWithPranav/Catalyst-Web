import React from "react";
import { Timeline } from "@/components/ui/timeline";

export default function TimelineDemo() {
  const data = [
    {
      title: "2024",
      content: (
        <div>
          <p className="mb-8 text-xs md:text-sm font-normal text-white">
            Catalyst evolved into a full-scale innovation and entrepreneurship
            platform, bringing together students, mentors, and industry partners
            through curated programs, workshops, and collaborative initiatives.
            The focus shifted from experimentation to execution, with systems
            designed for scalability and long-term impact.
          </p>
        </div>
      ),
    },
    {
      title: "Early 2023",
      content: (
        <div>
          <p className="mb-4 text-xs md:text-sm font-normal text-white">
            The foundation of Catalyst was laid with a small core team exploring
            how technology, design, and engineering could intersect to solve
            real-world problems within the campus ecosystem.
          </p>
          <p className="mb-8 text-xs md:text-sm font-normal text-white">
            Early efforts focused on rapid prototyping, community building, and
            validating ideas through hands-on projects, discussions, and
            internal showcases that shaped the direction of the initiative.
          </p>
        </div>
      ),
    },
    {
      title: "2025",
      content: (
        <div>
          <p className="mb-4 text-xs md:text-sm font-normal text-white">
            Recent updates reflect continuous refinement of the Catalyst
            platform, with improvements aimed at usability, collaboration, and
            outreach.
          </p>

          <div className="mb-8 space-y-2">
            <div className="text-xs md:text-sm text-white">
              Introduced a unified platform identity and design system.
            </div>
            <div className="text-xs md:text-sm text-white">
              Launched structured innovation tracks for students and teams.
            </div>
            <div className="text-xs md:text-sm text-white">
              Improved internal tooling for event coordination and content
              publishing.
            </div>
            <div className="text-xs md:text-sm text-white">
              Expanded mentorship access through industry and alumni
              connections.
            </div>
            <div className="text-xs md:text-sm text-white">
              Streamlined onboarding for new contributors and collaborators.
            </div>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="relative w-full overflow-clip ">
      <h2 className="text-3xl font-primary mb-3 text-center text-white mx-5 mt-35">
        TIMELINE
      </h2>

      <Timeline data={data} />
    </div>
  );
}
