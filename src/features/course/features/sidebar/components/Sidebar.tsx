import { mockCourseData } from "@/features/course/utils/mockCourseData";
import CourseProgress from "../../progress/components/CourseProgress";
import { Lesson, Week } from "@/features/course/types";
import CurriculumAccordion from "./CurriculumAccordion";

interface SidebarProps {
  weeks: Week[];
  onLessonClick?: (lesson: Lesson) => void;
}

const Sidebar = ({ weeks, onLessonClick }: SidebarProps) => {
  return (
    <aside>
      <h2 className="text-xl font-bold mb-4  py-4">Topics for This Course</h2>

      {/* Progresses Bar */}
      <CourseProgress progress={mockCourseData.progress} />

      {/* Collapsible weeks  */}
      <div className=" flex flex-col gap-6 border border-gray-100 mt-4">
        <CurriculumAccordion weeks={weeks} onLessonClick={onLessonClick} />
      </div>
    </aside>
  );
};

export default Sidebar;
