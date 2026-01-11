import React from "react";
import { Link, useParams } from "react-router-dom";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { problemsData } from "../data/problemsData";

const ProblemsNav = ({ currentProblemId }) => {
  const currentIndex = problemsData.findIndex((p) => p.id === currentProblemId);
  const prevProblem = currentIndex > 0 ? problemsData[currentIndex - 1] : null;
  const nextProblem = currentIndex < problemsData.length - 1 ? problemsData[currentIndex + 1] : null;

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case "Easy":
        return "text-punk-lime";
      case "Medium":
        return "text-punk-yellow";
      case "Hard":
        return "text-punk-pink";
      default:
        return "text-punk-cyan";
    }
  };

  return (
    <div className="flex items-center justify-between p-4 bg-punk-darkgray border-t-2 border-punk-purple">
      {prevProblem ? (
        <Link
          to={`/problems/${prevProblem.id}`}
          className="flex items-center gap-2 px-4 py-2 text-punk-cyan hover:text-punk-lime rounded transition border-2 border-punk-cyan hover:border-punk-pink font-black uppercase text-sm"
        >
          <ChevronLeft className="w-5 h-5" />
          <div>
            <p className="text-xs">← PREV</p>
            <p className="text-sm font-black">{prevProblem.title}</p>
          </div>
        </Link>
      ) : (
        <div />
      )}

      <div className="text-center">
        <p className="text-sm text-punk-pink font-black uppercase tracking-wide">
          BATTLE {currentIndex + 1} / {problemsData.length}
        </p>
      </div>

      {nextProblem ? (
        <Link
          to={`/problems/${nextProblem.id}`}
          className="flex items-center gap-2 px-4 py-2 text-punk-lime hover:text-punk-cyan rounded transition border-2 border-punk-lime hover:border-punk-pink font-black uppercase text-sm text-right"
        >
          <div className="text-right">
            <p className="text-xs text-gray-500">Next</p>
            <p className="text-sm font-medium">{nextProblem.title}</p>
          </div>
          <ChevronRight className="w-4 h-4" />
        </Link>
      ) : (
        <div />
      )}
    </div>
  );
};

export default ProblemsNav;
