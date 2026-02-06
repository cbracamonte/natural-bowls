export default function MenuLoading() {
  return (
    <div className="py-16 space-y-8">
      {/* Filter Skeleton */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <aside className="lg:col-span-1">
          <div className="space-y-6">
            <div className="h-32 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="h-48 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </aside>
        <div className="lg:col-span-3">
          <div className="h-64 bg-gray-200 rounded-lg animate-pulse mb-8"></div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-80 bg-gray-200 rounded-lg animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
