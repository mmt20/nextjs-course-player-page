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
  const pipTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Responsive check
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

  useEffect(() => {
    // Only enable PiP on mobile viewport
    if (!isMobile || isWideMode || !videoPlayerRef.current || !videoRef.current) return;

    const videoElement = videoRef.current;
    const videoContainer = videoPlayerRef.current;

    const handleScroll = () => {
      // Clear pending timeout to avoid race conditions
      if (pipTimeoutRef.current) clearTimeout(pipTimeoutRef.current);

      const videoRect = videoContainer.getBoundingClientRect();
      // Video considered "scrolled away" when top is above -100px
      const shouldEnterPip = videoRect.top < -100;
      const isPipActive = document.pictureInPictureElement === videoElement;

      // Debounce PiP state changes to prevent rapid toggles
      pipTimeoutRef.current = setTimeout(async () => {
        try {
          // Exit PiP if video scrolled back into view
          if (!shouldEnterPip && isPipActive) {
            await document.exitPictureInPicture();
          }
          // Enter PiP if video scrolled out and PiP available
          else if (shouldEnterPip && !isPipActive && document.pictureInPictureEnabled) {
            await videoElement.requestPictureInPicture();
          }
        } catch (error) {
          // Silently handle PiP errors (user may deny permission, etc)
          if (error instanceof DOMException && error.name !== "NotAllowedError") {
            console.warn("PiP toggle failed:", error.message);
          }
        }
      }, 100); // 100ms debounce
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      if (pipTimeoutRef.current) clearTimeout(pipTimeoutRef.current);

      // Exit PiP on unmount if active
      if (document.pictureInPictureElement === videoElement) {
        document.exitPictureInPicture().catch(() => {});
      }
    };
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

  if (!mounted) return null;

  return memoizedReturn;
}
