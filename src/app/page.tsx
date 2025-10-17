"use client";
import BreadcrumbHeader from "@/components/shared/Header/BreadcrumbHeader";
import { CourseComments } from "@/features/course/features/comments/components/CourseComments";
import { CourseMaterials } from "@/features/course/features/course-materials/components/CourseMaterials";
import Sidebar from "@/features/course/features/sidebar/components/Sidebar";

import { VideoPlayer } from "@/features/course/features/video-player";
import { Lesson } from "@/features/course/types";
import { mockCourseData } from "@/features/course/utils/mockCourseData";
import ExamModal from "@/features/exam";
import { mockExam } from "@/features/exam/utils";

import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [isPipActive, setIsPipActive] = useState(false);
  const [isWideMode, setIsWideMode] = useState(false);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null!);
  const [examOpen, setExamOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

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
  const handleLessonClick = (lesson: Lesson) => {
    if (lesson.type === "exam") {
      setExamOpen(true);
    } else if (lesson.type === "pdf") {
    }
  };
  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans px-6 lg:px-12">
      <BreadcrumbHeader
        breadcrumbs={[{ label: "Home", href: null }, { label: "Courses", href: null }, { label: "Course Details" }]}
        title="Starting SEO as Your Home"
      />

      {/* Main Layout  */}
      <main className={`${isWideMode ? " flex flex-col " : "lg:grid lg:grid-cols-[1fr_380px]"} `}>
        {/* Video Player  */}
        <div
          ref={videoPlayerRef}
          className={isWideMode ? "w-full h-[80vh] order-1" : "relative  aspect-video order-1 lg:px-0 lg:col-start-1"}
        >
          <VideoPlayer videoUrl={mockCourseData.videoUrl} externalVideoRef={videoRef} onWideMode={handleWideMode} />
        </div>

        {/* Course Materials */}
        <div className={`${isWideMode ? "order-3" : "order-2  lg:col-start-1"} my-20 `}>
          <h2 className="text-2xl font-bold mb-6">Course Materials</h2>
          <CourseMaterials
            duration={mockCourseData.duration}
            topics={mockCourseData.topics}
            lessons={mockCourseData.lessons}
            price={mockCourseData.price}
            enrolled={mockCourseData.enrolled}
            instructor={mockCourseData.instructor}
            language={mockCourseData.language}
            certificate={mockCourseData.certificate}
          />
        </div>

        {/* Sidebar  */}
        <div className={isWideMode ? "order-2" : "order-3 lg:order-2 lg:row-start-1 lg:row-span-4 lg:col-start-2 "}>
          <Sidebar weeks={mockCourseData.weeks} onLessonClick={handleLessonClick} />
        </div>

        {/* Comments */}
        <div className={isWideMode ? "order-4" : "order-4 lg:order-3 lg:col-start-1 "}>
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <div className="h-96  py-4">
            <CourseComments comments={mockCourseData.comments} />
          </div>
        </div>
      </main>

      <ExamModal exam={mockExam} isOpen={examOpen} onClose={() => setExamOpen(false)} />
    </div>
  );
}
