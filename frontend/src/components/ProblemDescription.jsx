import React from "react";
import { Code2, BookOpen, Award } from "lucide-react";

const ProblemDescription = ({ problem }) => {
  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "bg-punk-lime/20 text-punk-lime border border-punk-lime";
      case "Medium":
        return "bg-punk-yellow/20 text-punk-yellow border border-punk-yellow";
      case "Hard":
        return "bg-punk-pink/20 text-punk-pink border border-punk-pink";
      default:
        return "bg-punk-cyan/20 text-punk-cyan border border-punk-cyan";
    }
  };

  return (
    <div className="bg-black border-2 border-punk-cyan h-full flex flex-col">
      <div className="p-4 border-b-2 border-punk-pink">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h2 className="text-3xl font-black text-punk-cyan mb-3 uppercase tracking-tight">
              #{problem.id} - {problem.title}
            </h2>
            <div className="flex gap-2 flex-wrap">
              <span
                className={`px-3 py-2 text-sm font-black ${getDifficultyColor(
                  problem.difficulty
                )}`}
              >
                {problem.difficulty}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                Acceptance: {problem.acceptance}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-6">
          {/* Description */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
              <BookOpen className="w-5 h-5" />
              Description
            </h3>
            <p className="text-gray-700 leading-relaxed">{problem.description}</p>
          </div>

          {/* Examples */}
          <div>
            <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
              <Code2 className="w-5 h-5" />
              Examples
            </h3>
            <div className="space-y-4">
              {problem.examples.map((example, index) => (
                <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200">
                  <p className="text-sm font-medium text-gray-600 mb-2">Example {index + 1}:</p>
                  <div className="space-y-2 text-sm">
                    <div>
                      <p className="text-gray-600 font-medium">Input:</p>
                      <p className="bg-white p-2 rounded font-mono text-gray-700 border border-gray-200">
                        {example.input}
                      </p>
                    </div>
                    <div>
                      <p className="text-gray-600 font-medium">Output:</p>
                      <p className="bg-white p-2 rounded font-mono text-gray-700 border border-gray-200">
                        {example.output}
                      </p>
                    </div>
                    {example.explanation && (
                      <div>
                        <p className="text-gray-600 font-medium">Explanation:</p>
                        <p className="text-gray-700">{example.explanation}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tags */}
          {problem.tags && problem.tags.length > 0 && (
            <div>
              <h3 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <Award className="w-5 h-5" />
                Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {problem.tags.map((tag, index) => (
                  <span
                    key={index}
                    className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm font-medium hover:bg-gray-200 transition"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProblemDescription;
