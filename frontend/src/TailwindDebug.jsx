import React from 'react'

export default function TailwindDebug() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-700 via-pink-600 to-orange-500 flex items-center justify-center">
      <div className="bg-white/90 backdrop-blur-xl rounded-2xl shadow-2xl p-10 max-w-md w-full">
        <h1 className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-500 mb-6 text-center">
          Tailwind CSS Check
        </h1>

        <p className="text-gray-700 text-center mb-6">
          If you see gradients, shadows, colors, spacing, and hover effects,
          Tailwind CSS is working correctly.
        </p>

        <div className="grid grid-cols-3 gap-4 mb-6">
          <div className="h-16 bg-red-500 rounded-lg shadow-md hover:scale-105 transition" />
          <div className="h-16 bg-green-500 rounded-lg shadow-md hover:scale-105 transition" />
          <div className="h-16 bg-blue-500 rounded-lg shadow-md hover:scale-105 transition" />
        </div>

        <button className="w-full py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold rounded-xl shadow-lg hover:shadow-2xl hover:scale-[1.02] transition">
          Hover Me
        </button>

        <div className="mt-6 text-center">
          <span className="inline-block px-4 py-1 text-sm font-medium bg-black text-white rounded-full">
            Tailwind Active
          </span>
        </div>
      </div>
    </div>
  );
}