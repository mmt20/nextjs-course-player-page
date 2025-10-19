"use client";
import { useRef, useState, useEffect, useCallback, useMemo } from "react";
import { Lesson } from "@/features/course/types";

export interface UseCoursePage {
  // Meta
  isMobile: boolean;
  isWideMode: boolean;

  // Modal states
  examOpen: boolean;
  pdfOpen: boolean;
  askQuestionOpen: boolean;
  leaderboardOpen: boolean;
  selectedLesson: Lesson | null;

  // Refs
  videoPlayerRef: React.RefObject<HTMLDivElement | null>;
  videoRef: React.RefObject<HTMLVideoElement | null>;
  curriculumRef: React.RefObject<HTMLDivElement | null>;
  commentsRef: React.RefObject<HTMLDivElement | null>;

  // Handlers
  handleWideMode: () => void;
  handleLessonClick: (lesson: Lesson) => void;
  scrollToRef: (ref: React.RefObject<HTMLDivElement | null>) => void;

  // Modal setters
  setExamOpen: (open: boolean) => void;
  setPdfOpen: (open: boolean) => void;
  setAskQuestionOpen: (open: boolean) => void;
  setLeaderboardOpen: (open: boolean) => void;
}

export function useCoursePage(): UseCoursePage | null {
  // Lifecycle state
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mode state
  const [isWideMode, setIsWideMode] = useState(false);

  // Modal states
  const [examOpen, setExamOpen] = useState(false);
  const [pdfOpen, setPdfOpen] = useState(false);
  const [askQuestionOpen, setAskQuestionOpen] = useState(false);
  const [leaderboardOpen, setLeaderboardOpen] = useState(false);
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);

  // Refs
  const videoPlayerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const curriculumRef = useRef<HTMLDivElement>(null);
  const commentsRef = useRef<HTMLDivElement>(null);

  // Responsive check - stable reference
  const checkMobile = useCallback((wideMode: boolean) => {
    const isCurrentlyMobile = window.innerWidth < 1024 || wideMode;
    setIsMobile(isCurrentlyMobile);
  }, []);

  // Initialize and setup resize listener
  useEffect(() => {
    setMounted(true);
    checkMobile(isWideMode);

    const handleResize = () => checkMobile(isWideMode);
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, [isWideMode, checkMobile]);

  // Picture-in-Picture effect for mobile
  useEffect(() => {
    // Only enable PiP on mobile viewport
    if (!isMobile) return;

    const handleScroll = () => {
      if (!videoPlayerRef.current || !videoRef.current) return;

      const videoRect = videoPlayerRef.current.getBoundingClientRect();
      const shouldEnterPip = videoRect.top <= -100;
      const isPipActive = !!document.pictureInPictureElement;

      try {
        if (shouldEnterPip && !isPipActive && document.pictureInPictureEnabled) {
          videoRef.current.requestPictureInPicture().catch(() => {});
        } else if (!shouldEnterPip && isPipActive) {
          document.exitPictureInPicture().catch(() => {});
        }
      } catch (error) {
        console.error("PiP error:", error);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isMobile]);

  // Scroll to ref with smooth behavior
  const scrollToRef = useCallback((ref: React.RefObject<HTMLDivElement | null>) => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, []);

  // Handle wide mode toggle
  const handleWideMode = useCallback(() => {
    setIsWideMode((prev) => !prev);
  }, []);

  // Handle lesson click and determine modal type
  const handleLessonClick = useCallback((lesson: Lesson) => {
    setSelectedLesson(lesson);

    if (lesson.type === "pdf") {
      setPdfOpen(true);
    } else if (lesson.type === "exam") {
      setExamOpen(true);
    }
  }, []);

  // Memoize the returned object so consumers receive stable references
  const memoizedReturn = useMemo(
    () => ({
      // Meta
      isMobile,
      isWideMode,

      // Modal states
      examOpen,
      pdfOpen,
      askQuestionOpen,
      leaderboardOpen,
      selectedLesson,

      // Refs
      videoPlayerRef,
      videoRef,
      curriculumRef,
      commentsRef,

      // Handlers
      handleWideMode,
      handleLessonClick,
      scrollToRef,

      // Modal setters
      setExamOpen,
      setPdfOpen,
      setAskQuestionOpen,
      setLeaderboardOpen,
    }),
    [
      isMobile,
      isWideMode,
      examOpen,
      pdfOpen,
      askQuestionOpen,
      leaderboardOpen,
      selectedLesson,
      handleWideMode,
      handleLessonClick,
      scrollToRef,
    ]
  );

  // Return null during SSR/hydration mismatch
  if (!mounted) return null;

  return memoizedReturn;
}
