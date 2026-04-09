export default function BowlsPageLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero skeleton */}
      <div className="bg-gray-300 animate-pulse py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="h-12 w-96 bg-gray-400/50 rounded mb-6" />
            <div className="h-6 w-full bg-gray-400/50 rounded mb-4" />
            <div className="h-6 w-3/4 bg-gray-400/50 rounded mb-8" />
            <div className="flex gap-4">
              <div className="h-12 w-36 bg-gray-400/50 rounded-full" />
              <div className="h-12 w-44 bg-gray-400/50 rounded-full" />
            </div>
          </div>
        </div>
      </div>

      {/* Builder skeleton */}
      <div className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="h-8 w-48 bg-gray-200 animate-pulse rounded mx-auto mb-8" />
          <div className="grid md:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-32 bg-gray-200 animate-pulse rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
