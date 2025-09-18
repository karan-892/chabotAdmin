"use client";

export default function UsageCardSkeleton() {
  return (
    <div className="bg-gray-800 border border-gray-700 rounded-lg p-4 animate-pulse">
      <div className="flex items-center justify-between mb-3">
        <div className="w-16 h-4 bg-gray-700 rounded"></div>
        <div className="w-4 h-4 bg-gray-700 rounded"></div>
      </div>
      
      <div className="mb-3">
        <div className="w-12 h-6 bg-gray-700 rounded mb-1"></div>
        <div className="w-20 h-3 bg-gray-700 rounded"></div>
      </div>
      
      <div className="w-full bg-gray-700 rounded-full h-2 mb-2">
        <div className="bg-gray-600 h-2 rounded-full w-1/3"></div>
      </div>
      
      <div className="w-16 h-3 bg-gray-700 rounded"></div>
    </div>
  );
}