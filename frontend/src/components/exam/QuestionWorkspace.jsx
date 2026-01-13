import React, { useState } from "react";
import { ArrowLeft, ArrowRight, ChevronUp, ChevronDown } from "lucide-react";
import TestResults from "./TestResults";

const QuestionWorkspace = ({
  question,
  allQuestions,
  onBack,
  onPreviousQuestion,
  onNextQuestion,
  currentIndex,
}) => {
  const [code, setCode] = useState(question.initialCode);
  const [testResults, setTestResults] = useState(null);
  const [isPanelCollapsed, setIsPanelCollapsed] = useState(false);

  // Simulate running tests
  const runTests = () => {
    const results = question.testCases.map((testCase, idx) => ({
      input: testCase.input,
      expected: testCase.expectedOutput,
      output: testCase.expectedOutput, // Mock: always correct
      passed: true,
      runtime: Math.floor(Math.random() * 50) + 5,
    }));
    setTestResults(results);
  };

  // Simulate submission
  const submitSolution = () => {
    const results = question.testCases.map((testCase, idx) => {
      const passed = Math.random() > 0.3; // 70% pass rate for simulation
      return {
        input: testCase.input,
        expected: testCase.expectedOutput,
        output: passed
          ? testCase.expectedOutput
          : "Wrong answer",
        passed,
        runtime: Math.floor(Math.random() * 50) + 5,
      };
    });
    setTestResults(results);
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-400";
      case "medium":
        return "text-yellow-400";
      case "hard":
        return "text-red-400";
      default:
        return "text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="border-l border-gray-700 pl-4">
              <p className="text-sm text-gray-500">
                Question {currentIndex + 1} of {allQuestions.length}
              </p>
              <h1 className="text-xl font-bold">{question.title}</h1>
            </div>
          </div>
          <span className={`font-semibold ${getDifficultyColor(question.difficulty)}`}>
            {question.difficulty}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Problem Panel */}
        <div
          className={`flex flex-col border-r border-gray-700 bg-gray-800 overflow-hidden transition-all ${
            isPanelCollapsed ? "w-12" : "w-1/2"
          }`}
        >
          {/* Toggle Button */}
          <button
            onClick={() => setIsPanelCollapsed(!isPanelCollapsed)}
            className="absolute right-0 top-20 transform translate-x-1/2 bg-gray-700 hover:bg-gray-600 p-1 rounded border border-gray-600 z-10"
          >
            {isPanelCollapsed ? (
              <ChevronDown size={16} />
            ) : (
              <ChevronUp size={16} />
            )}
          </button>

          {!isPanelCollapsed && (
            <>
              {/* Problem Description */}
              <div className="flex-1 overflow-y-auto p-6">
                <div className="space-y-6">
                  {/* Description */}
                  <div>
                    <h2 className="text-lg font-semibold mb-2">Description</h2>
                    <p className="text-gray-400 whitespace-pre-wrap leading-relaxed">
                      {question.description}
                    </p>
                  </div>

                  {/* Constraints */}
                  {question.constraints && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-2">
                        Constraints:
                      </h3>
                      <ul className="text-sm text-gray-400 space-y-1">
                        {question.constraints.map((constraint, idx) => (
                          <li key={idx}>• {constraint}</li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* Examples */}
                  {question.examples && (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-300 mb-3">
                        Examples:
                      </h3>
                      <div className="space-y-3">
                        {question.examples.map((example, idx) => (
                          <div
                            key={idx}
                            className="bg-gray-700 rounded p-3 text-sm"
                          >
                            <p className="text-green-400 font-mono">
                              Input: {example.input}
                            </p>
                            <p className="text-blue-400 font-mono">
                              Output: {example.output}
                            </p>
                            {example.explanation && (
                              <p className="text-gray-400 mt-2">
                                Explanation: {example.explanation}
                              </p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Editor Panel */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Code Editor */}
          <div className="flex-1 flex flex-col border-b border-gray-700 p-4 overflow-hidden">
            <label className="text-sm text-gray-400 mb-2">Code</label>
            <textarea
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="flex-1 bg-gray-800 text-gray-200 border border-gray-700 rounded p-4 font-mono text-sm resize-none focus:outline-none focus:border-blue-500"
              spellCheck="false"
            />
          </div>

          {/* Results Panel */}
          <div className="flex-1 border-t border-gray-700 p-4 overflow-auto">
            <label className="text-sm text-gray-400 mb-3 block">Results</label>
            <TestResults
              results={testResults}
              solutionMeta={question.solutionMeta}
              onRunTests={runTests}
              onSubmit={submitSolution}
            />
          </div>
        </div>
      </div>

      {/* Footer Navigation */}
      <div className="border-t border-gray-700 bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button
            onClick={onPreviousQuestion}
            disabled={currentIndex === 0}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded transition"
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <div className="text-sm text-gray-400">
            Question {currentIndex + 1} of {allQuestions.length}
          </div>

          <button
            onClick={onNextQuestion}
            disabled={currentIndex === allQuestions.length - 1}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded transition"
          >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default QuestionWorkspace;
