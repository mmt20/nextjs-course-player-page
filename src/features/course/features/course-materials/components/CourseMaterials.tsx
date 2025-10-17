import { getMaterials } from "../utils/materials";
import { CourseMaterialsProps, MaterialItem } from "../types";
export function CourseMaterials(props: CourseMaterialsProps) {
  const materials: MaterialItem[] = getMaterials(props);
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-6 ">
      {materials.map((item, index) => (
        <div key={index} className={`flex items-center gap-4 ${index >= 5 ? "hidden md:flex" : "flex"}`}>
          <item.icon className="h-5 w-5 text-muted-foreground" />
          <div className="flex items-center justify-between flex-1 min-w-0">
            <span className="text-sm font-medium  mr-4">{item.label}</span>
            <span className="text-sm font-semibold whitespace-nowrap">{item.value}</span>
          </div>
        </div>
      ))}
    </div>
  );
}
