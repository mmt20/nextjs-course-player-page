const Sidebar = () => {
  return (
    <aside className="p-4 lg:p-6">
      <h2 className="text-xl font-bold mb-4">Topics for This Course</h2>
      <div className="bg-white p-6 rounded-lg shadow flex flex-col gap-6 border border-gray-100">
        {/* Progresses Bar */}
        <div className="h-32 bg-blue-50 rounded p-4">
          <p className="text-sm text-blue-600">Progress tracking will go here</p>
        </div>
        {/* Collapsible weeks placeholder */}
        <div className="h-64 bg-green-50 rounded p-4">
          <p className="text-sm text-green-600">Course weeks/lessons will go here</p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
