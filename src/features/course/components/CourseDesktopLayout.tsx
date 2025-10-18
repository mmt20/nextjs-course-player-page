"use client";
import BreadcrumbHeader from "@/components/shared/Header/BreadcrumbHeader";
import { AskQuestionModal } from "@/features/course/ask-question";
import { CourseComments, CourseMaterials, VideoPlayer, VideoPlayerActions } from "@/features/course/features";
import Sidebar from "@/features/course/features/sidebar/components/Sidebar";
import { LeaderboardModal } from "@/features/course/leaderboard";
import ExamModal from "@/features/exam";
import { mockExam } from "@/features/exam/utils";
import { PdfViewerModal } from "@/features/pdf-viewer";
import { mockCourseData } from "@/features/course/utils/mockCourseData";
import { useCoursePage } from "@/features/course/hooks/useCoursePage";

interface CourseDesktopLayoutProps {
  data: ReturnType<typeof useCoursePage>;
}

export function CourseDesktopLayout({ data }: CourseDesktopLayoutProps) {
  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans px-6 lg:px-12">
      <BreadcrumbHeader
        breadcrumbs={[{ label: "Home", href: null }, { label: "Courses", href: null }, { label: "Course Details" }]}
        title="Starting SEO as Your Home"
      />

      <main className="lg:grid lg:grid-cols-[1fr_380px] gap-6">
        {/* Video Section */}
        <div ref={data.videoPlayerRef} className="lg:col-start-1">
          <div className="aspect-video">
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

        {/* Sidebar - Sticky on Desktop */}
        <div
          ref={data.curriculumRef}
          className="lg:row-start-1 lg:row-span-4 lg:col-start-2 lg:sticky lg:top-6 lg:h-fit"
        >
          <Sidebar weeks={mockCourseData.weeks} onLessonClick={data.handleLessonClick} />
        </div>

        {/* Course Materials */}
        <div className="lg:col-start-1">
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
        <div ref={data.commentsRef} className="lg:col-start-1">
          <h2 className="text-2xl font-bold mb-6">Comments</h2>
          <div className="h-96 py-4">
            <CourseComments comments={mockCourseData.comments} />
          </div>
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
