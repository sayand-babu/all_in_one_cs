import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Send, Play } from 'lucide-react';

// Mock problem data
const MOCK_PROBLEMS_MAP = {
  'problem-1': {
    id: 'problem-1',
    title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: 'easy',
    points: 100,
    sampleTestCases: [
      { input: 'nums = [2,7,11,15], target = 9', expectedOutput: '[0,1]' },
      { input: 'nums = [3,2,4], target = 6', expectedOutput: '[1,2]' },
    ],
    initialCode: `function twoSum(nums, target) {
  // TODO: Implement solution
  // Hint: Consider using a HashMap for O(n) time complexity
}`,
  },
  'problem-2': {
    id: 'problem-2',
    title: 'Reverse Linked List',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Can you do it iteratively and recursively?`,
    difficulty: 'medium',
    points: 150,
    sampleTestCases: [
      { input: '[1,2,3,4,5]', expectedOutput: '[5,4,3,2,1]' },
      { input: '[]', expectedOutput: '[]' },
    ],
    initialCode: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  // TODO: Implement solution
}`,
  },
  'problem-3': {
    id: 'problem-3',
    title: 'Merge k Sorted Lists',
    description: `You are given an array of k linked-lists lists, each linked list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.`,
    difficulty: 'hard',
    points: 250,
    sampleTestCases: [
      { input: '[[1,4,5],[1,3,4],[2,6]]', expectedOutput: '[1,1,2,1,3,4,4,5,6]' },
    ],
    initialCode: `function mergeKLists(lists) {
  // TODO: Implement solution
  // Hint: Consider using a min-heap or divide-and-conquer
}`,
  },
};

const ProblemSolvingPage = () => {
  const { contestId, problemId } = useParams();
  const navigate = useNavigate();
  const [code, setCode] = useState(MOCK_PROBLEMS_MAP[problemId]?.initialCode || '');
  const [testResults, setTestResults] = useState([]);
  const [isRunning, setIsRunning] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('javascript');

  const problem = MOCK_PROBLEMS_MAP[problemId];

  if (!problem) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-400">Problem not found</h1>
          <button
            onClick={() => navigate(`/contest/${contestId}`)}
            className="mt-4 text-cyan-400 hover:text-cyan-300"
          >
            Back to contest
          </button>
        </div>
      </div>
    );
  }

  const handleRunCode = () => {
    setIsRunning(true);
    // Simulate code execution
    setTimeout(() => {
      const results = problem.sampleTestCases.map((tc, idx) => ({
        id: idx,
        input: tc.input,
        expectedOutput: tc.expectedOutput,
        actualOutput: tc.expectedOutput, // Mock: assume correct
        passed: true,
      }));
      setTestResults(results);
      setIsRunning(false);
    }, 1500);
  };

  const handleSubmit = () => {
    // Mock submission
    alert('Solution submitted! (Mock implementation)');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-black/50 border-b border-cyan-500/30 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button
              onClick={() => navigate(`/contest/${contestId}`)}
              className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <h1 className="text-2xl font-bold text-cyan-400 flex-1 ml-4">
              {problem.title}
            </h1>
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold ${
                problem.difficulty === 'easy'
                  ? 'bg-green-500/20 text-green-400'
                  : problem.difficulty === 'medium'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : 'bg-red-500/20 text-red-400'
              }`}
            >
              {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-2 gap-6">
          {/* Problem Description */}
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/20 rounded-lg p-6 overflow-auto max-h-[calc(100vh-200px)]">
            <h2 className="text-xl font-bold text-cyan-400 mb-4">Problem Description</h2>
            <p className="text-gray-300 whitespace-pre-wrap mb-6">{problem.description}</p>

            <h3 className="text-lg font-semibold text-lime-400 mb-3">Sample Test Cases</h3>
            <div className="space-y-4">
              {problem.sampleTestCases.map((tc, idx) => (
                <div key={idx} className="bg-gray-700/30 rounded-lg p-4 border border-gray-600/30">
                  <p className="text-sm text-gray-400 mb-2">
                    <span className="font-semibold text-cyan-300">Input:</span> {tc.input}
                  </p>
                  <p className="text-sm text-gray-400">
                    <span className="font-semibold text-lime-300">Output:</span> {tc.expectedOutput}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
              <p className="text-sm text-blue-300">
                <strong>Points:</strong> {problem.points}
              </p>
            </div>
          </div>

          {/* Code Editor */}
          <div className="flex flex-col gap-6">
            {/* Language Selector */}
            <div className="flex items-center gap-4">
              <label className="text-gray-400">Language:</label>
              <select
                value={selectedLanguage}
                onChange={(e) => setSelectedLanguage(e.target.value)}
                className="px-4 py-2 bg-gray-800 border border-cyan-500/30 rounded-lg text-white focus:outline-none focus:border-cyan-500"
              >
                <option value="javascript">JavaScript</option>
                <option value="python">Python</option>
                <option value="cpp">C++</option>
              </select>
            </div>

            {/* Editor */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/20 rounded-lg overflow-hidden flex-1">
              <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full h-64 p-4 bg-gray-850 text-gray-200 font-mono text-sm focus:outline-none resize-none"
                placeholder="Write your code here..."
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-4">
              <button
                onClick={handleRunCode}
                disabled={isRunning}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:from-gray-500 disabled:to-gray-600 rounded-lg font-semibold text-white transition-all"
              >
                <Play className="w-4 h-4" />
                {isRunning ? 'Running...' : 'Run Code'}
              </button>
              <button
                onClick={handleSubmit}
                className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-400 hover:to-green-500 rounded-lg font-semibold text-white transition-all"
              >
                <Send className="w-4 h-4" />
                Submit
              </button>
            </div>

            {/* Test Results */}
            {testResults.length > 0 && (
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/20 rounded-lg p-4">
                <h3 className="font-semibold text-cyan-400 mb-3">Test Results</h3>
                <div className="space-y-2">
                  {testResults.map((result) => (
                    <div
                      key={result.id}
                      className={`p-3 rounded border ${
                        result.passed
                          ? 'bg-green-500/10 border-green-500/30 text-green-300'
                          : 'bg-red-500/10 border-red-500/30 text-red-300'
                      }`}
                    >
                      <p className="text-sm font-semibold">
                        Test Case {result.id + 1}: {result.passed ? '✓ Passed' : '✗ Failed'}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">Input: {result.input}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemSolvingPage;
