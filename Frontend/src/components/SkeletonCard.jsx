import React from 'react'


function SkeletonCard() {
  return (
    <div className="w-full h-72 bg-gray-200 animate-pulse rounded-lg p-2">
      <div className="h-48 bg-gray-300 rounded-md"></div>
      <div className="h-3 bg-gray-300 mt-3 rounded"></div>
      <div className="h-3 bg-gray-300 mt-2 w-1/2 rounded"></div>
    </div>
  )
}

export default SkeletonCard
