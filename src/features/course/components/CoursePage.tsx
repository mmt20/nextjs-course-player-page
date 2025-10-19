"use client";
import React, { useCallback } from "react";
import BreadcrumbHeader from "@/components/shared/Header/BreadcrumbHeader";
import dynamic from "next/dynamic";
import { CourseComments, CourseMaterials } from "@/features/course/features";
import Sidebar from "@/features/course/features/sidebar/components/Sidebar";
import { mockExam } from "@/features/exam/utils";

import { mockCourseData } from "@/features/course/utils/mockCourseData";
import { useCoursePage } from "@/features/course/hooks/useCoursePage";

// Dynamically import heavy components
const VideoPlayer = dynamic(() => import("@/features/course/features").then((mod) => mod.VideoPlayer), { ssr: false });
const VideoPlayerActions = dynamic(() => import("@/features/course/features").then((mod) => mod.VideoPlayerActions), {
  ssr: false,
});
const AskQuestionModal = dynamic(
  () => import("@/features/course/features/ask-question").then((mod) => mod.AskQuestionModal),
  { ssr: false }
);
const LeaderboardModal = dynamic(
  () => import("@/features/course/features/leaderboard").then((mod) => mod.LeaderboardModal),
  { ssr: false }
);
const ExamModal = dynamic(() => import("@/features/exam").then((mod) => mod.default), { ssr: false });
const PdfViewerModal = dynamic(() => import("@/features/pdf-viewer").then((mod) => mod.PdfViewerModal), { ssr: false });

export default function CoursePage() {
  const data = useCoursePage();

  // Move all useCallback hooks to top-level
  const handleCurriculumClick = useCallback(() => data?.scrollToRef(data.curriculumRef), [data]);
  const handleCommentClick = useCallback(() => data?.scrollToRef(data.commentsRef), [data]);
  const handleAskQuestionClick = useCallback(() => data?.setAskQuestionOpen(true), [data]);
  const handleLeaderboardClick = useCallback(() => data?.setLeaderboardOpen(true), [data]);

  if (!data) return null;

  const layoutClass = data.isMobile ? "flex flex-col gap-6" : "lg:grid lg:grid-cols-[1fr_380px] gap-6";

  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans px-6 lg:px-12">
      <BreadcrumbHeader
        breadcrumbs={[{ label: "Home", href: null }, { label: "Courses", href: null }, { label: "Course Details" }]}
        title="Starting SEO as Your Home"
      />

      <main className={layoutClass}>
        {/* Video Section */}
        <div ref={data.videoPlayerRef} className={data.isMobile ? (data.isWideMode ? "w-full" : "") : "lg:col-start-1"}>
          <div className={data.isMobile ? (data.isWideMode ? "w-full h-[60vh]" : "aspect-video") : "aspect-video"}>
            <VideoPlayer
              videoUrl={mockCourseData.videoUrl}
              thumbnail={mockCourseData.thumbnail}
              externalVideoRef={data.videoRef}
              onWideMode={data.handleWideMode}
            />
          </div>
          <VideoPlayerActions
            onCurriculumClick={handleCurriculumClick}
            onCommentClick={handleCommentClick}
            onAskQuestionClick={handleAskQuestionClick}
            onLeaderboardClick={handleLeaderboardClick}
          />
        </div>

        {/* Sidebar - Sticky on Desktop, inline on Mobile */}
        <div
          ref={data.curriculumRef}
          className={
            data.isMobile ? undefined : "lg:row-start-1 lg:row-span-4 lg:col-start-2 lg:sticky lg:top-6 lg:h-fit"
          }
        >
          <Sidebar weeks={mockCourseData.weeks} onLessonClick={data.handleLessonClick} />
        </div>

        {/* Course Materials */}
        <div className={data.isMobile ? undefined : "lg:col-start-1"}>
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

        {/* Comments Section */}
        <div ref={data.commentsRef} className={data.isMobile ? undefined : "lg:col-start-1"}>
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <div className="h-96 py-4">
            <CourseComments comments={mockCourseData.comments} />
          </div>
        </div>
      </main>

      {/* Modals */}
      <ExamModal exam={mockExam} isOpen={data.examOpen} onClose={() => data.setExamOpen(false)} />
      <PdfViewerModal
        pdfUrl="https://drive.google.com/file/d/1IjquLv6XGW0IbWLq2NrgpIssnS3ugdr0"
        isOpen={data.pdfOpen}
        onClose={() => data.setPdfOpen(false)}
        title={data.selectedLesson?.title || "PDF Document"}
      />
      <AskQuestionModal isOpen={data.askQuestionOpen} onClose={() => data.setAskQuestionOpen(false)} />
      <LeaderboardModal
        leaderboardId="leaderboard-1"
        courseName={mockCourseData.title}
        instructorName={mockCourseData.instructor}
        isOpen={data.leaderboardOpen}
        onClose={() => data.setLeaderboardOpen(false)}
      />
    </div>
  );
}
