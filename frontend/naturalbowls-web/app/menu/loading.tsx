export default function MenuPageLoading() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero skeleton */}
      <div className="relative overflow-hidden">
        <div className="bg-gray-200 animate-pulse py-24 md:py-36">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-8 max-w-3xl mx-auto">
              <div className="h-4 w-32 bg-gray-300 rounded mx-auto mb-3" />
              <div className="h-10 w-80 bg-gray-300 rounded mx-auto mb-6" />
              <div className="h-5 w-96 bg-gray-300 rounded mx-auto" />
            </div>
          </div>
        </div>
      </div>

      {/* Content skeleton */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-md border border-gray-100"
            >
              <div className="aspect-square bg-gray-200 animate-pulse" />
              <div className="p-4 space-y-3">
                <div className="h-4 w-3/4 bg-gray-200 animate-pulse rounded" />
                <div className="h-3 w-full bg-gray-200 animate-pulse rounded" />
                <div className="h-6 w-20 bg-gray-200 animate-pulse rounded" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
