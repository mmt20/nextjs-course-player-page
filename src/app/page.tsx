"use client";
import BreadcrumbHeader from "@/components/shared/Header/BreadcrumbHeader";
import { VideoPlayer } from "@/features/course/video-player";
import { mockCourseData } from "@/features/course/video-player/utils";
import { useRef, useState } from "react";

export default function Home() {
  const [isWideMode, setIsWideMode] = useState(false);
  const materialsRef = useRef<HTMLDivElement>(null);
  const handleWideMode = () => {
    setIsWideMode(!isWideMode);
    if (!isWideMode) {
      setTimeout(() => {
        materialsRef.current?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };
  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans">
      <BreadcrumbHeader
        breadcrumbs={[{ label: "Home", href: null }, { label: "Courses", href: null }, { label: "Course Details" }]}
        title="Starting SEO as Your Home"
      />

      {/* Main Layout */}
      <main className={isWideMode ? "container mx-auto px-4" : "lg:grid lg:grid-cols-[1fr_380px]"}>
        {/* Main Content */}

        <section className="flex-1 flex flex-col gap-8 px-6">
          {/* Video Player */}
          <VideoPlayer videoUrl={mockCourseData.videoUrl} onWideMode={handleWideMode} />
        </section>

        {/* Course Materials */}
        {/* Comments */}

        {/* Sidebar */}

        <aside className="p-4 lg:p-6 border-t lg:border-t-0">
          <h2 className="text-xl font-bold mb-4">Topics for This Course</h2>
          <div className="sticky top-8 bg-white p-6 rounded-lg shadow flex flex-col gap-6 border border-gray-100">
            {/* Progresses Bar */}
            {/* Collapsible weeks placeholder */}
          </div>
        </aside>
      </main>
    </div>
  );
}
