import BreadcrumbHeader from "@/components/shared/Header/BreadcrumbHeader";
import { Player } from "@/features/video-player";

export default function Home() {
  return (
    <div className="bg-white text-gray-800 min-h-screen font-sans">
      <BreadcrumbHeader
        breadcrumbs={[{ label: "Home", href: null }, { label: "Courses", href: null }, { label: "Course Details" }]}
        title="Starting SEO as Your Home"
      />

      {/* Main Two-Column Layout (Sidebar & Content) */}
      <main className="flex flex-col lg:flex-row gap-8 px-4 py-8 max-w-7xl mx-auto">
        {/* Video Player Placeholder */}
        <section className="flex-1 flex flex-col gap-8">
          <Player />
        </section>

        <aside className="lg:w-1/3 w-full lg:max-w-xs flex-shrink-0">
          <div className="sticky top-8 bg-white p-6 rounded-lg shadow flex flex-col gap-6 border border-gray-100">
            {/* Progresses Bar */}
            {/* Collapsible weeks placeholder */}
          </div>
        </aside>
      </main>
    </div>
  );
}
