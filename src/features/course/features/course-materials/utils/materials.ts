import { Clock, BookOpen, Users, User, Languages, Award, List, DollarSign } from "lucide-react";
import { MaterialItem, CourseMaterialsProps } from "../types";

export function getMaterials(data: CourseMaterialsProps): MaterialItem[] {
  const { duration, topics, lessons, price, enrolled, instructor, language, certificate } = data;

  return [
    { icon: Clock, label: "Duration :", value: duration },
    { icon: List, label: "Topics :", value: topics },
    { icon: BookOpen, label: "Lessons :", value: lessons },
    { icon: DollarSign, label: "Price :", value: `${price}$` },
    { icon: Users, label: "Enrolled :", value: `${enrolled} students` },
    { icon: User, label: "Instructor :", value: instructor },
    { icon: Languages, label: "Language :", value: language },
    { icon: Award, label: "Certificate :", value: certificate ? "Included" : "Not Included" },
  ];
}
