export interface Lesson {
  id: string;
  title: string;
  type: "video" | "pdf" | "exam";
  duration?: string;
  locked: boolean;
  completed: boolean;
  questions?: number;
  examId?: string;
}

export interface Week {
  id: string;
  title: string;
  description: string;
  lessons: Lesson[];
}

export interface Comment {
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
  thumbnail?: string;
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
