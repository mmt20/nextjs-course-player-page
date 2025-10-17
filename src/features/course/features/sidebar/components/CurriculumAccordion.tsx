"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp, Lock, FileText, Video, ClipboardList } from "lucide-react";
import { Lesson, Week } from "@/features/course/types";

interface CurriculumAccordionProps {
  weeks: Week[];
  onLessonClick?: (lesson: Lesson) => void;
}

const CurriculumAccordion = ({ weeks, onLessonClick }: CurriculumAccordionProps) => {
  const [expandedWeeks, setExpandedWeeks] = useState<string[]>([weeks[0]?.id]);

  const toggleWeek = (weekId: string) => {
    setExpandedWeeks((prev) => (prev.includes(weekId) ? prev.filter((id) => id !== weekId) : [...prev, weekId]));
  };

  const getLessonIcon = (type: string) => {
    switch (type) {
      case "video":
        return <Video className="h-4 w-4 text-gray-400 flex-shrink-0" />;
      case "pdf":
        return <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />;
      case "exam":
        return <ClipboardList className="h-4 w-4 text-gray-400 flex-shrink-0" />;
      default:
        return <FileText className="h-4 w-4 text-gray-400 flex-shrink-0" />;
    }
  };

  return (
    <div className="space-y-3">
      {weeks.map((week) => {
        const isExpanded = expandedWeeks.includes(week.id);

        return (
          <div key={week.id} className="bg-white rounded-sm shadow-sm overflow-hidden border border-gray-100">
            {/* Week header */}
            <button
              onClick={() => toggleWeek(week.id)}
              className="w-full p-6 text-left hover:bg-gray-50 transition-colors"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{week.title}</h3>
                  <p className="text-sm text-gray-500 leading-relaxed">{week.description}</p>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-gray-400 flex-shrink-0 mt-1" />
                )}
              </div>
            </button>

            {/* Lessons list */}
            {isExpanded && (
              <div className="border-t border-gray-100">
                {week.lessons.map((lesson, index) => (
                  <button
                    key={lesson.id}
                    onClick={() => !lesson.locked && onLessonClick?.(lesson)}
                    disabled={lesson.locked}
                    className={`w-full flex items-center justify-between px-6 py-4 hover:bg-gray-50 transition-colors text-left ${
                      index !== week.lessons.length - 1 ? "border-b border-gray-100" : ""
                    } ${lesson.locked ? "opacity-60 cursor-not-allowed" : "cursor-pointer"}`}
                  >
                    {/* icon and title */}
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      {getLessonIcon(lesson.type)}
                      <span className="text-sm text-gray-700 ">{lesson.title}</span>
                    </div>

                    {/* badges and lock */}
                    <div className="flex flex-col items-center gap-2 ml-4 flex-shrink-0">
                      {lesson.questions !== undefined && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded bg-cyan-50 text-cyan-600 whitespace-nowrap">
                          {lesson.questions} QUESTION{lesson.questions !== 1 ? "S" : ""}
                        </span>
                      )}
                      {lesson.duration && (
                        <span className="text-xs font-medium px-2.5 py-1 rounded bg-pink-50 text-pink-600 whitespace-nowrap">
                          {lesson.duration}
                        </span>
                      )}
                      {lesson.locked && <Lock className="h-4 w-4 text-gray-400 flex-shrink-0" />}
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default CurriculumAccordion;
