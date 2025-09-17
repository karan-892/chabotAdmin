"use client";

export default function LoadingSpinner() {
  return (
    <div className="flex flex-col items-center justify-center space-y-4">
      <div className="relative">
        <div className="w-12 h-12 border-4 border-gray-700 border-t-blue-500 rounded-full animate-spin"></div>
        <div className="absolute inset-0 w-12 h-12 border-4 border-transparent border-r-teal-500 rounded-full animate-spin animation-delay-150"></div>
      </div>
      <div className="text-center">
        <h3 className="text-lg font-medium text-white mb-2">Loading Dashboard</h3>
        <p className="text-gray-400 text-sm">Fetching your workspace data...</p>
      </div>
    </div>
  );
}