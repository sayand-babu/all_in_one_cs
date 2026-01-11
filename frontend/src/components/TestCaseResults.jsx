import React from "react";
import { CheckCircle, AlertCircle, Clock } from "lucide-react";

const TestCaseResults = ({ testCases, isRunning, results }) => {
  const getStatusIcon = (status) => {
    if (status === "passed") {
      return <CheckCircle className="w-6 h-6 text-punk-lime" />;
    } else if (status === "failed") {
      return <AlertCircle className="w-6 h-6 text-punk-pink" />;
    }
    return <Clock className="w-6 h-6 text-punk-cyan animate-pulse" />;
  };

  return (
    <div className="bg-black border-2 border-punk-yellow h-full flex flex-col">
      <div className="p-4 border-b-2 border-punk-cyan bg-punk-darkgray">
        <h3 className="text-lg font-black text-punk-yellow uppercase tracking-tight">⚡ TEST RESULTS</h3>
      </div>
      
      <div className="flex-1 overflow-y-auto">
        {testCases.length === 0 ? (
          <div className="p-4 text-gray-500 text-center">No test cases available</div>
        ) : (
          testCases.map((testCase, index) => (
            <div
              key={index}
              className={`p-4 border-b border-punk-purple/30 last:border-b-0 ${
                results[index]?.status === "passed" ? "bg-punk-lime/5 border-l-4 border-l-punk-lime" : 
                results[index]?.status === "failed" ? "bg-punk-pink/5 border-l-4 border-l-punk-pink" : "border-l-4 border-l-punk-cyan/50"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-black text-punk-cyan uppercase text-sm">Test #{index + 1}</span>
                {isRunning ? (
                  <Clock className="w-5 h-5 text-punk-cyan animate-spin" />
                ) : (
                  getStatusIcon(results[index]?.status)
                )}
              </div>
              
              <div className="space-y-2 text-sm">
                <div>
                  <p className="text-punk-cyan font-black mb-1 uppercase text-xs">Input:</p>
                  <p className="bg-punk-black border border-punk-purple/50 p-2 rounded font-mono text-punk-lime break-words">
                    {testCase.input}
                  </p>
                </div>
                
                <div>
                  <p className="text-punk-lime font-black mb-1 uppercase text-xs">Expected:</p>
                  <p className="bg-gray-50 p-2 rounded font-mono text-gray-700 break-words">
                    {testCase.expectedOutput}
                  </p>
                </div>

                {results[index]?.output && (
                  <div>
                    <p className="text-gray-600 font-medium mb-1">Output:</p>
                    <p className={`p-2 rounded font-mono break-words ${
                      results[index]?.status === "passed"
                        ? "bg-green-50 text-green-700"
                        : "bg-red-50 text-red-700"
                    }`}>
                      {results[index]?.output}
                    </p>
                  </div>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TestCaseResults;
