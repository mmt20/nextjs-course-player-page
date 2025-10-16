import { mockCourseData } from "@/features/course/utils/mockCourseData";
import CourseProgress from "../../progress/components/CourseProgress";

const Sidebar = () => {
  return (
    <aside className="p-4 lg:p-6">
      <h2 className="text-xl font-bold mb-4  md:pb-4">Topics for This Course</h2>

      {/* Progresses Bar */}

      <CourseProgress progress={mockCourseData.progress} />

      {/* Collapsible weeks placeholder */}
      <div className="  rounded-lg shadow flex flex-col gap-6 border border-gray-100">
        <div className="h-64 bg-green-50 rounded p-4">
          <p className="text-sm text-green-600">Course weeks/lessons will go here</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
