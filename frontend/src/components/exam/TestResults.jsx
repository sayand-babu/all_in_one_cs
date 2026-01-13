import React from "react";
import { CheckCircle, XCircle, Play, Send } from "lucide-react";

const TestResults = ({ results, solutionMeta, onRunTests, onSubmit }) => {
  if (!results) {
    return (
      <div className="flex flex-col gap-4">
        <div className="text-gray-400 text-sm">No tests run yet</div>
        <div className="flex gap-2">
          <button
            onClick={onRunTests}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold transition"
          >
            <Play size={16} />
            Run
          </button>
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold transition"
          >
            <Send size={16} />
            Submit
          </button>
        </div>
      </div>
    );
  }

  const allPassed = results.every((r) => r.passed);
  const passedCount = results.filter((r) => r.passed).length;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-gray-400">Results: </span>
          <span
            className={allPassed ? "text-green-400 font-bold" : "text-red-400 font-bold"}
          >
            {passedCount}/{results.length} passed
          </span>
        </div>
        <div className="flex gap-2">
          <button
            onClick={onRunTests}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded font-semibold text-sm transition"
          >
            <Play size={16} />
            Run
          </button>
          <button
            onClick={onSubmit}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 hover:bg-green-700 rounded font-semibold text-sm transition"
          >
            <Send size={16} />
            Submit
          </button>
        </div>
      </div>

      {/* Solution Meta */}
      {solutionMeta && (
        <div className="bg-gray-800 rounded p-3 text-xs">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-gray-500">Time Complexity</p>
              <p className="text-gray-300 font-mono">{solutionMeta.timeComplexity}</p>
            </div>
            <div>
              <p className="text-gray-500">Space Complexity</p>
              <p className="text-gray-300 font-mono">{solutionMeta.spaceComplexity}</p>
            </div>
          </div>
        </div>
      )}

      {/* Test Cases */}
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {results.map((result, idx) => (
          <div
            key={idx}
            className={`p-3 rounded border ${
              result.passed
                ? "bg-green-900 border-green-700"
                : "bg-red-900 border-red-700"
            }`}
          >
            <div className="flex items-start gap-2">
              {result.passed ? (
                <CheckCircle size={18} className="text-green-400 flex-shrink-0 mt-0.5" />
              ) : (
                <XCircle size={18} className="text-red-400 flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold">Test Case {idx + 1}</p>
                <p className="text-xs text-gray-400 mt-1">
                  <span className="font-mono break-all">{result.input}</span>
                </p>
                <div className="mt-2 text-xs space-y-1">
                  <div>
                    <p className="text-gray-400">Expected:</p>
                    <p className="text-gray-300 font-mono break-all">{result.expected}</p>
                  </div>
                  <div>
                    <p className="text-gray-400">Output:</p>
                    <p className="text-gray-300 font-mono break-all">{result.output}</p>
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-2">Runtime: {result.runtime}ms</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestResults;
