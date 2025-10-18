"use client";
import { useCoursePage } from "@/features/course/hooks/useCoursePage";
import { CourseMobileLayout } from "@/features/course/components/CourseMobileLayout";
import { CourseDesktopLayout } from "@/features/course/components/CourseDesktopLayout";
import { useEffect, useState } from "react";

export default function CoursePage() {
  const data = useCoursePage();
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);

    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024 || data.isWideMode);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, [data.isWideMode]);

  if (!mounted) return null;

  return isMobile ? <CourseMobileLayout data={data} /> : <CourseDesktopLayout data={data} />;
}
