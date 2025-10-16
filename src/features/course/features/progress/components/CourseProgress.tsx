import ArrowDown from "@/components/shared/Icons/ArrowDown";

interface CourseProgressProps {
  progress: number;
}

const CourseProgress = ({ progress }: CourseProgressProps) => {
  return (
    <div className="w-full max-w-md mx-auto  py-8">
      <div className="relative">
        <div
          className="invisible md:visible  absolute -top-14 transform -translate-x-1/2 flex flex-col items-center"
          style={{ left: `${progress}%` }}
        >
          <div className="bg-white border-2 border-gray-300 rounded-full w-10 h-10 flex items-center justify-center shadow-sm">
            <span className="text-sm font-bold text-gray-700">You</span>
          </div>
          {/* arrow down */}
          <ArrowDown />
        </div>

        {/* Progress Bar */}
        <div className="relative h-1 w-full overflow-hidden rounded-full bg-gray-200 ">
          <div className="h-full bg-green-500 rounded-full" style={{ width: `${progress}%` }} />
        </div>

        {/* Percentage Label */}
        <div
          className="absolute -bottom-8 transform -translate-x-1/2 text-sm font-semibold text-gray-700"
          style={{ left: `${progress}%` }}
        >
          {progress}%
        </div>
      </div>
    </div>
  );
};

export default CourseProgress;
