"use client";
import BreadcrumbHeader from "@/components/shared/Header/BreadcrumbHeader";
import { AskQuestionModal } from "@/features/course/ask-question";
import { CourseComments, CourseMaterials, VideoPlayer, VideoPlayerActions } from "@/features/course/features";
import Sidebar from "@/features/course/features/sidebar/components/Sidebar";

import { Lesson } from "@/features/course/types";
import { mockCourseData } from "@/features/course/utils/mockCourseData";
import ExamModal from "@/features/exam";
import { mockExam } from "@/features/exam/utils";
import { PdfViewerModal } from "@/features/pdf-viewer";

import { useRef, useState, useEffect } from "react";

export default function Home() {
  const [isPipActive, setIsPipActive] = useState(false);
  const [isWideMode, setIsWideMode] = useState(false);
  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null!);
  const [examOpen, setExamOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [pdfOpen, setPdfOpen] = useState(false);
  const curriculumRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);
  const [askQuestionOpen, setAskQuestionOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) return;

      if (videoPlayerRef.current && videoRef.current) {
        const videoRect = videoPlayerRef.current.getBoundingClientRect();
        const shouldEnterPip = videoRect.top <= -100;
        const isPipCurrentlyActive = !!document.pictureInPictureElement;

        if (shouldEnterPip && !isPipCurrentlyActive && document.pictureInPictureEnabled) {
          videoRef.current
            .requestPictureInPicture()
            .then(() => setIsPipActive(true))
            .catch(() => {});
        } else if (!shouldEnterPip && isPipCurrentlyActive) {
          document
            .exitPictureInPicture()
            .then(() => setIsPipActive(false))
            .catch(() => {});
        }
      }
    };

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

  const handleWideMode = () => setIsWideMode(!isWideMode);

  const handleLessonClick = (lesson: Lesson) => {
    setSelectedLesson(lesson);
    if (lesson.type === "pdf") setPdfOpen(true);
    else if (lesson.type === "exam") setExamOpen(true);
  };

  const handleCurriculumClick = () => curriculumRef.current?.scrollIntoView({ behavior: "smooth" });
  const handleCommentClick = () => commentsRef.current?.scrollIntoView({ behavior: "smooth" });

  // Mobile or Wide Mode Layout
  if (isWideMode || (typeof window !== "undefined" && window.innerWidth < 1024)) {
    return (
      <div className="bg-white text-gray-800 min-h-screen font-sans px-6 lg:px-12">
        <BreadcrumbHeader
          breadcrumbs={[{ label: "Home", href: null }, { label: "Courses", href: null }, { label: "Course Details" }]}
          title="Starting SEO as Your Home"
        />

        <main className="flex flex-col gap-6">
          {/* 1. Video */}
          <div ref={videoPlayerRef} className={isWideMode ? "w-full" : ""}>
            <div className={isWideMode ? "w-full h-[60vh]" : "aspect-video"}>
              <VideoPlayer videoUrl={mockCourseData.videoUrl} externalVideoRef={videoRef} onWideMode={handleWideMode} />
            </div>
            <VideoPlayerActions
              onCurriculumClick={handleCurriculumClick}
              onCommentClick={handleCommentClick}
              onAskQuestionClick={() => setAskQuestionOpen(true)}
              onLeaderboardClick={() => console.log("Leaderboard clicked")}
            />
          </div>

          {/* 2. Course Materials */}
          <section className="py-4">
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
          </section>
          {/* 3. Sidebar */}
          <div ref={curriculumRef}>
            <Sidebar weeks={mockCourseData.weeks} onLessonClick={handleLessonClick} />
          </div>

          {/* 4. Comments */}
          <div ref={commentsRef}>
            <h2 className="text-2xl font-bold mb-6">Comments</h2>

            <CourseComments comments={mockCourseData.comments} />
          </div>
        </main>

        <ExamModal exam={mockExam} isOpen={examOpen} onClose={() => setExamOpen(false)} />
        <PdfViewerModal
          pdfUrl={"https://drive.google.com/file/d/1IjquLv6XGW0IbWLq2NrgpIssnS3ugdr0"}
          isOpen={pdfOpen}
          onClose={() => setPdfOpen(false)}
          title={selectedLesson?.title || "PDF Document"}
        />
        <AskQuestionModal isOpen={askQuestionOpen} onClose={() => setAskQuestionOpen(false)} />
      </div>
    );
  }

  // Desktop Normal Mode Layout
  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans px-6 lg:px-12">
      <BreadcrumbHeader
        breadcrumbs={[{ label: "Home", href: null }, { label: "Courses", href: null }, { label: "Course Details" }]}
        title="Starting SEO as Your Home"
      />

      <main className="lg:grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Video */}
        <div ref={videoPlayerRef} className="lg:col-start-1">
          <div className="aspect-video">
            <VideoPlayer videoUrl={mockCourseData.videoUrl} externalVideoRef={videoRef} onWideMode={handleWideMode} />
          </div>
          <VideoPlayerActions
            onCurriculumClick={handleCurriculumClick}
            onCommentClick={handleCommentClick}
            onAskQuestionClick={() => setAskQuestionOpen(true)}
            onLeaderboardClick={() => console.log("Leaderboard clicked")}
          />
        </div>

        {/* Sidebar */}
        <div ref={curriculumRef} className="lg:row-start-1 lg:row-span-4 lg:col-start-2">
          <Sidebar weeks={mockCourseData.weeks} onLessonClick={handleLessonClick} />
        </div>

        {/* Course Materials */}
        <div className="lg:col-start-1 ">
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

        {/* Comments */}
        <div ref={commentsRef} className="lg:col-start-1">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <div className="h-96 py-4">
            <CourseComments comments={mockCourseData.comments} />
          </div>
        </div>
      </main>

      <ExamModal exam={mockExam} isOpen={examOpen} onClose={() => setExamOpen(false)} />
      <PdfViewerModal
        pdfUrl={"https://drive.google.com/file/d/1IjquLv6XGW0IbWLq2NrgpIssnS3ugdr0"}
        isOpen={pdfOpen}
        onClose={() => setPdfOpen(false)}
        title={selectedLesson?.title || "PDF Document"}
      />
      <AskQuestionModal isOpen={askQuestionOpen} onClose={() => setAskQuestionOpen(false)} />
    </div>
  );
}
