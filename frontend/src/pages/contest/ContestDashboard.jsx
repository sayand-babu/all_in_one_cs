import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Code, Trophy, Users } from 'lucide-react';

// Mock data - hardcoded in component
const MOCK_CONTEST = {
  id: 'contest-1',
  title: 'Spring 2026 Weekly Challenge #1',
  description: 'Weekly coding challenge focusing on data structures and algorithms.',
  durationMinutes: 180,
  startTime: new Date(Date.now() + 2 * 60 * 60 * 1000),
  endTime: new Date(Date.now() + 5 * 60 * 60 * 1000),
  status: 'scheduled',
};

const MOCK_PROBLEMS = [
  {
    id: 'problem-1',
    title: 'Two Sum',
    difficulty: 'easy',
    points: 100,
  },
  {
    id: 'problem-2',
    title: 'Reverse Linked List',
    difficulty: 'medium',
    points: 150,
  },
  {
    id: 'problem-3',
    title: 'Merge k Sorted Lists',
    difficulty: 'hard',
    points: 250,
  },
];

const MOCK_LEADERBOARD = [
  {
    rank: 1,
    username: 'jordan_coder',
    score: 250,
    solvedProblems: 2,
  },
  {
    rank: 2,
    username: 'alex_developer',
    score: 100,
    solvedProblems: 1,
  },
];

const ContestDashboard = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();
  const [selectedProblem, setSelectedProblem] = useState(MOCK_PROBLEMS[0]);

  const handleProblemClick = (problem) => {
    setSelectedProblem(problem);
    navigate(`/contest/${contestId}/problem/${problem.id}`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-black">
      {/* Header */}
      <div className="bg-black/50 border-b border-cyan-500/30">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <button
            onClick={() => navigate('/contests')}
            className="flex items-center gap-2 text-cyan-400 hover:text-cyan-300 mb-4"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Contests
          </button>
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-lime-400">
            {MOCK_CONTEST.title}
          </h1>
          <p className="text-gray-400 mt-2">{MOCK_CONTEST.description}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="col-span-2">
            {/* Problems Section */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/20 rounded-lg p-6 mb-6">
              <div className="flex items-center gap-2 mb-4">
                <Code className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-cyan-400">Problems</h2>
              </div>
              <div className="space-y-2">
                {MOCK_PROBLEMS.map((problem) => (
                  <div
                    key={problem.id}
                    onClick={() => handleProblemClick(problem)}
                    className="flex items-center justify-between p-4 bg-gray-700/30 hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors border border-gray-600/30"
                  >
                    <div className="flex-1">
                      <h3 className="font-semibold text-white">{problem.title}</h3>
                      <p className="text-sm text-gray-400">
                        <span
                          className={`inline-block px-2 py-1 rounded mr-2 text-xs font-medium ${
                            problem.difficulty === 'easy'
                              ? 'bg-green-500/20 text-green-400'
                              : problem.difficulty === 'medium'
                                ? 'bg-yellow-500/20 text-yellow-400'
                                : 'bg-red-500/20 text-red-400'
                          }`}
                        >
                          {problem.difficulty.charAt(0).toUpperCase() + problem.difficulty.slice(1)}
                        </span>
                        {problem.points} points
                      </p>
                    </div>
                    <span className="text-cyan-400">→</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Leaderboard */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Trophy className="w-5 h-5 text-lime-400" />
                <h2 className="text-xl font-bold text-lime-400">Leaderboard</h2>
              </div>
              <div className="space-y-3">
                {MOCK_LEADERBOARD.map((entry) => (
                  <div key={entry.rank} className="flex items-center justify-between">
                    <div>
                      <p className="font-semibold text-white">{entry.username}</p>
                      <p className="text-xs text-gray-400">{entry.solvedProblems} solved</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-cyan-400">{entry.score}</p>
                      <p className="text-xs text-gray-400">#{entry.rank}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Participants */}
            <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-cyan-500/20 rounded-lg p-6">
              <div className="flex items-center gap-2 mb-4">
                <Users className="w-5 h-5 text-cyan-400" />
                <h2 className="text-xl font-bold text-cyan-400">Participants</h2>
              </div>
              <p className="text-gray-400 text-sm">
                {MOCK_LEADERBOARD.length} participants joined
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContestDashboard;
