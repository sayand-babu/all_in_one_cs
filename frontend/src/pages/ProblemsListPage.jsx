import React from "react";
import { Link } from "react-router-dom";
import { problemsData } from "../data/problemsData";
import { ArrowRight, TrendingUp } from "lucide-react";

const ProblemsListPage = () => {
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

  const stats = {
    total: problemsData.length,
    easy: problemsData.filter((p) => p.difficulty === "Easy").length,
    medium: problemsData.filter((p) => p.difficulty === "Medium").length,
    hard: problemsData.filter((p) => p.difficulty === "Hard").length,
  };

  return (
    <div className="min-h-screen bg-black py-12 border-t-4 border-punk-pink">
      <div className="max-w-6xl mx-auto px-4">
        {/* Hero Section */}
        <div className="mb-12 border-b-2 border-punk-purple pb-8">
          <h1 className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-punk-pink to-punk-cyan mb-4 uppercase tracking-tight">BATTLE ARENA</h1>
          <p className="text-lg text-punk-cyan font-bold mb-8 uppercase tracking-wide">
            Step up and face the ultimate coding challenges!
          </p>

          {/* Stats Cards */}
          <div className="grid grid-cols-4 gap-4">
            <div className="bg-black p-6 border-2 border-punk-cyan hover:shadow-lg hover:shadow-punk-cyan/50 transition">
              <p className="text-xs text-punk-cyan font-bold mb-2 uppercase">Total Battles</p>
              <p className="text-4xl font-black text-punk-cyan">{stats.total}</p>
            </div>
            <div className="bg-black p-6 border-2 border-punk-lime hover:shadow-lg hover:shadow-punk-lime/50 transition">
              <p className="text-xs text-punk-lime font-bold mb-2 uppercase">Easy Mode</p>
              <p className="text-4xl font-black text-punk-lime">{stats.easy}</p>
            </div>
            <div className="bg-black p-6 border-2 border-punk-yellow hover:shadow-lg hover:shadow-punk-yellow/50 transition">
              <p className="text-xs text-punk-yellow font-bold mb-2 uppercase">Hardcore</p>
              <p className="text-4xl font-black text-punk-yellow">{stats.medium}</p>
            </div>
            <div className="bg-black p-6 border-2 border-punk-pink hover:shadow-lg hover:shadow-punk-pink/50 transition">
              <p className="text-xs text-punk-pink font-bold mb-2 uppercase">INSANE</p>
              <p className="text-4xl font-black text-punk-pink">{stats.hard}</p>
            </div>
          </div>
        </div>

        {/* Problems Table */}
        <div className="bg-black border-2 border-punk-pink overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="bg-gray-50 border-b border-gray-200">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">#</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Title</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Difficulty</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Topics</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900">Acceptance</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-gray-900"></th>
                </tr>
              </thead>
              <tbody>
                {problemsData.map((problem, index) => (
                  <tr key={problem.id} className="border-b border-gray-200 hover:bg-gray-50 transition">
                    <td className="px-6 py-4 text-sm text-gray-600">{problem.id}</td>
                    <td className="px-6 py-4">
                      <span className="text-sm font-medium text-gray-900">{problem.title}</span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${getDifficultyColor(
                          problem.difficulty
                        )}`}
                      >
                        {problem.difficulty}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-wrap gap-1">
                        {problem.tags.slice(0, 2).map((tag, i) => (
                          <span
                            key={i}
                            className="inline-block text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                        {problem.tags.length > 2 && (
                          <span className="inline-block text-xs text-gray-600">
                            +{problem.tags.length - 2}
                          </span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{problem.acceptance}</td>
                    <td className="px-6 py-4 text-right">
                      <Link
                        to={`/problems/${problem.id}`}
                        className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 transition"
                      >
                        <span className="text-sm font-medium">Solve</span>
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProblemsListPage;
