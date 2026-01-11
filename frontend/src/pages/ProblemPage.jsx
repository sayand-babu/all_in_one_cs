import React, { useState } from "react";
import { useParams, Navigate } from "react-router-dom";
import ProblemDescription from "../components/ProblemDescription";
import CodeEditor from "../components/CodeEditor";
import TestCaseResults from "../components/TestCaseResults";
import ProblemsNav from "../components/ProblemsNav";
import { problemsData } from "../data/problemsData";
import { CheckCircle, AlertCircle } from "lucide-react";

const ProblemPage = () => {
  const { problemId } = useParams();
  const problem = problemsData.find((p) => p.id === parseInt(problemId));
  const [results, setResults] = useState({});
  const [isRunning, setIsRunning] = useState(false);
  const [showResults, setShowResults] = useState(false);

  if (!problem) {
    return <Navigate to="/problems/1" />;
  }

  const simulateCodeExecution = (code) => {
    // Simulated execution - in real app, this would send to backend
    setIsRunning(true);
    setTimeout(() => {
      const newResults = {};
      problem.testCases.forEach((testCase, index) => {
        // Random pass/fail for demo - in real app, compare actual output
        const passed = Math.random() > 0.3;
        newResults[index] = {
          status: passed ? "passed" : "failed",
          output: passed ? testCase.expectedOutput : "Incorrect output",
        };
      });
      setResults(newResults);
      setShowResults(true);
      setIsRunning(false);
    }, 1500);
  };

  const handleReset = () => {
    setResults({});
    setShowResults(false);
  };

  const passedTests = Object.values(results).filter((r) => r.status === "passed").length;
  const totalTests = problem.testCases.length;
  const allPassed = passedTests === totalTests && totalTests > 0;

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Summary Banner */}
      {showResults && (
        <div
          className={`px-6 py-4 text-white ${
            allPassed ? "bg-green-600" : "bg-red-600"
          } flex items-center justify-between`}
        >
          <div className="flex items-center gap-3">
            {allPassed ? (
              <CheckCircle className="w-6 h-6" />
            ) : (
              <AlertCircle className="w-6 h-6" />
            )}
            <div>
              <p className="font-semibold">
                {allPassed ? "All Tests Passed!" : "Some Tests Failed"}
              </p>
              <p className="text-sm opacity-90">
                {passedTests} / {totalTests} test cases passed
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 gap-4 flex">
        {/* Left Side - Problem Description */}
        <div className="w-1/2 flex flex-col gap-4">
          <ProblemDescription problem={problem} />
        </div>

        {/* Right Side - Code Editor and Test Results */}
        <div className="w-1/2 flex flex-col gap-4">
          <div className="flex-1">
            <CodeEditor
              initialCode={problem.initialCode}
              onRun={simulateCodeExecution}
              onReset={handleReset}
              isRunning={isRunning}
              language="javascript"
            />
          </div>
          <div className="flex-1">
            <TestCaseResults
              testCases={problem.testCases}
              isRunning={isRunning}
              results={results}
            />
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <ProblemsNav currentProblemId={problem.id} />
    </div>
  );
};

export default ProblemPage;
