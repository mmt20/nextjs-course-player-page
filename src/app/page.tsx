"use client";
import BreadcrumbHeader from "@/components/shared/Header/BreadcrumbHeader";
import { Sidebar } from "@/features/course/sidebar";
import { VideoPlayer } from "@/features/course/video-player";
import { mockCourseData } from "@/features/course/video-player/utils";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [isPipActive, setIsPipActive] = useState(false);
  const [isWideMode, setIsWideMode] = useState(false);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null!);

  // Handle PIP behavior on mobile scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) return; // Only on mobile/tablet

      if (videoPlayerRef.current && videoRef.current) {
        const videoRect = videoPlayerRef.current.getBoundingClientRect();
        const shouldEnterPip = videoRect.top <= -100; // Trigger when video is mostly out of view
        const isPipCurrentlyActive = !!document.pictureInPictureElement;

        if (shouldEnterPip && !isPipCurrentlyActive && document.pictureInPictureEnabled) {
          videoRef.current
            .requestPictureInPicture()
            .then(() => {
              setIsPipActive(true);
            })
            .catch(() => {
              // PIP failed - silently handle
            });
        } else if (!shouldEnterPip && isPipCurrentlyActive) {
          // Exit PIP mode when scrolling back up
          document
            .exitPictureInPicture()
            .then(() => {
              setIsPipActive(false);
            })
            .catch(() => {
              // Exit PIP failed - silently handle
            });
        }
      }
    };

    // Listen for PIP events
    const handlePipEnter = () => setIsPipActive(true);
    const handlePipLeave = () => setIsPipActive(false);

    if (videoRef.current) {
      videoRef.current.addEventListener("enterpictureinpicture", handlePipEnter);
      videoRef.current.addEventListener("leavepictureinpicture", handlePipLeave);
    }

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
      if (videoRef.current) {
        videoRef.current.removeEventListener("enterpictureinpicture", handlePipEnter);
        videoRef.current.removeEventListener("leavepictureinpicture", handlePipLeave);
      }
    };
  }, []);

  const handleWideMode = () => {
    setIsWideMode(!isWideMode);
  };

  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans">
      <BreadcrumbHeader
        breadcrumbs={[{ label: "Home", href: null }, { label: "Courses", href: null }, { label: "Course Details" }]}
        title="Starting SEO as Your Home"
      />

      {/* Main Layout - Uses CSS Grid order for responsive layout */}
      <main className={`px-0 lg:px-6 ${isWideMode ? " flex flex-col " : "lg:grid lg:grid-cols-[1fr_380px]"} `}>
        {/* Video Player - Single instance with dynamic sizing */}
        <div
          ref={videoPlayerRef}
          className={
            isWideMode ? "w-full h-[60vh] order-1" : "relative aspect-video order-1 px-6 lg:px-0 lg:col-start-1"
          }
        >
          <VideoPlayer videoUrl={mockCourseData.videoUrl} externalVideoRef={videoRef} onWideMode={handleWideMode} />
        </div>

        {/* Course Materials */}
        <div className={isWideMode ? "order-3" : "order-2 px-6 lg:px-0 lg:col-start-1"}>
          <div className="h-96 bg-gray-100 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Course Materials</h3>
            <p>Course content and materials will be displayed here...</p>
          </div>
        </div>

        {/* Sidebar - Order changes based on mode and screen size */}
        <div
          className={
            isWideMode ? "order-2" : "order-3 lg:order-2 lg:row-start-1 lg:row-span-3 lg:col-start-2 px-6 lg:px-0"
          }
        >
          <Sidebar />
        </div>

        {/* Comments */}
        <div className={isWideMode ? "order-4" : "order-4 lg:order-3 lg:col-start-1 px-6 lg:px-0"}>
          <div className="h-96 bg-gray-50 rounded-lg p-4">
            <h3 className="text-lg font-semibold mb-4">Comments</h3>
            <p>Comments section will be displayed here...</p>
          </div>
        </div>
      </main>
    </div>
  );
}
