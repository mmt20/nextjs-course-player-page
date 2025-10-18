"use client";
import BreadcrumbHeader from "@/components/shared/Header/BreadcrumbHeader";
import { AskQuestionModal } from "@/features/course/features/ask-question";
import { CourseComments, CourseMaterials, VideoPlayer, VideoPlayerActions } from "@/features/course/features";
import Sidebar from "@/features/course/features/sidebar/components/Sidebar";
import { LeaderboardModal } from "@/features/course/features/leaderboard";
import ExamModal from "@/features/exam";
import { mockExam } from "@/features/exam/utils";
import { PdfViewerModal } from "@/features/pdf-viewer";
import { mockCourseData } from "@/features/course/utils/mockCourseData";
import { useCoursePage } from "@/features/course/hooks/useCoursePage";

interface CourseMobileLayoutProps {
  data: ReturnType<typeof useCoursePage>;
}

export function CourseMobileLayout({ data }: CourseMobileLayoutProps) {
  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans px-6 lg:px-12">
      <BreadcrumbHeader
        breadcrumbs={[{ label: "Home", href: null }, { label: "Courses", href: null }, { label: "Course Details" }]}
        title="Starting SEO as Your Home"
      />

      <main className="flex flex-col gap-6">
        {/* 1. Video Section */}
        <div ref={data.videoPlayerRef} className={data.isWideMode ? "w-full" : ""}>
          <div className={data.isWideMode ? "w-full h-[60vh]" : "aspect-video"}>
            <VideoPlayer
              videoUrl={mockCourseData.videoUrl}
              externalVideoRef={data.videoRef}
              onWideMode={data.handleWideMode}
            />
          </div>
          <VideoPlayerActions
            onCurriculumClick={data.handleCurriculumClick}
            onCommentClick={data.handleCommentClick}
            onAskQuestionClick={() => data.setAskQuestionOpen(true)}
            onLeaderboardClick={() => data.setLeaderboardOpen(true)}
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

        {/* 3. Curriculum Sidebar */}
        <div ref={data.curriculumRef}>
          <Sidebar weeks={mockCourseData.weeks} onLessonClick={data.handleLessonClick} />
        </div>

        {/* 4. Comments Section */}
        <div ref={data.commentsRef}>
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <CourseComments comments={mockCourseData.comments} />
        </div>
      </main>

      {/* Modals */}
      <ExamModal exam={mockExam} isOpen={data.examOpen} onClose={() => data.setExamOpen(false)} />
      <PdfViewerModal
        pdfUrl={"https://drive.google.com/file/d/1IjquLv6XGW0IbWLq2NrgpIssnS3ugdr0"}
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
