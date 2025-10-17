export interface CourseMaterialsProps {
  duration: string;
  topics: number;
  lessons: number;
  price: number;
  enrolled: number;
  instructor: string;
  language: string;
  certificate: boolean;
}

export interface MaterialItem {
  icon: React.ElementType;
  label: string;
  value: string | number;
}
