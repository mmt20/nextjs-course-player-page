"use client";
import { useRef, useState, useEffect } from "react";
import { Lesson } from "@/features/course/types";

export function useCoursePage() {
  const [isWideMode, setIsWideMode] = useState(false);
  const [examOpen, setExamOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [askQuestionOpen, setAskQuestionOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);

  const videoPlayerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null!);
  const curriculumRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  // Picture-in-Picture Effect
  useEffect(() => {
    const handleScroll = () => {
      if (window.innerWidth >= 1024) return;

      if (videoPlayerRef.current && videoRef.current) {
        const videoRect = videoPlayerRef.current.getBoundingClientRect();
        const shouldEnterPip = videoRect.top <= -100;
        const isPipCurrentlyActive = !!document.pictureInPictureElement;

        if (shouldEnterPip && !isPipCurrentlyActive && document.pictureInPictureEnabled) {
          videoRef.current.requestPictureInPicture().catch(() => {});
        } else if (!shouldEnterPip && isPipCurrentlyActive) {
          document.exitPictureInPicture().catch(() => {});
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
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

  return {
    // State
    isWideMode,
    examOpen,
    selectedLesson,
    pdfOpen,
    askQuestionOpen,
    leaderboardOpen,

    // Refs
    videoPlayerRef,
    videoRef,
    curriculumRef,
    commentsRef,

    // Handlers
    handleWideMode,
    handleLessonClick,
    handleCurriculumClick,
    handleCommentClick,
    setExamOpen,
    setPdfOpen,
    setAskQuestionOpen,
    setLeaderboardOpen,
  };
}
