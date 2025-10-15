import BreadcrumbHeader from "@/components/shared/Header/BreadcrumbHeader";

export default function Home() {
  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans">
      <BreadcrumbHeader
        breadcrumbs={[{ label: "Home", href: null }, { label: "Courses", href: null }, { label: "Course Details" }]}
        title="Starting SEO as Your Home"
      />
    </div>
  );
}
