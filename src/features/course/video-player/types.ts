export interface VideoPlayerProps {
  videoUrl: string;
  externalVideoRef?: React.RefObject<HTMLVideoElement>;
  onWideMode?: () => void;
}
type LessonType = "video" | "pdf" | "exam";

interface LessonBase {
  id: string;
  title: string;
  type: LessonType;
  locked: boolean;
  completed: boolean;
}

interface VideoLesson extends LessonBase {
  type: "video";
  duration?: string;
}

interface PdfLesson extends LessonBase {
  type: "pdf";
  questions: number;
  duration: string;
}

interface ExamLesson extends LessonBase {
  type: "exam";
  questions: number;
  duration: string;
  examId: string;
}

type Lesson = VideoLesson | PdfLesson | ExamLesson;

interface Week {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

interface Comment {
  id: string;
  name: string;
  date: string;
  text: string;
  avatar: string;
}

export interface CourseData {
  id: string;
  title: string;
  videoUrl: string;
  duration: string;
  topics: number;
  lessons: number;
  price: number;
  enrolled: number;
  instructor: string;
  language: string;
  certificate: boolean;
  progress: number;
  weeks: Week[];
  comments: Comment[];
}
