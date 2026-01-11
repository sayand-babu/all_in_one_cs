import React from 'react';
import { Clock, Users, Trophy, AlertCircle } from 'lucide-react';
import { formatTime, formatDuration, getDifficultyColor, getContestStatus } from '../utils/time';

/**
 * ContestCard - Display contest summary with key info
 */
export const ContestCard = ({ contest, onClick }) => {
  const status = getContestStatus(contest);
  const statusColors = {
    scheduled: 'border-l-blue-400',
    active: 'border-l-green-400 shadow-neon',
    completed: 'border-l-gray-400',
  };

  return (
    <div
      onClick={onClick}
      className={`neon-box border-l-4 ${statusColors[status]} p-6 cursor-pointer hover:shadow-neon-lg transition-all group`}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="text-xl font-bold text-tech-cyan group-hover:text-tech-lime transition-colors">
            {contest.title}
          </h3>
          <p className="text-gray-400 text-sm mt-1">{contest.description}</p>
        </div>
        <span
          className={`px-3 py-1 rounded text-xs font-bold uppercase tracking-wider ${
            status === 'active'
              ? 'bg-tech-lime/20 text-tech-lime animate-pulse-neon'
              : status === 'scheduled'
              ? 'bg-blue-500/20 text-blue-400'
              : 'bg-gray-500/20 text-gray-400'
          }`}
        >
          {status}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-4 mt-4 pt-4 border-t border-tech-cyan/20">
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Clock className="w-4 h-4 text-tech-cyan" />
          <span>{formatTime(contest.startTime)}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Trophy className="w-4 h-4 text-tech-lime" />
          <span>{contest.problems?.length || 0} problems</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <Users className="w-4 h-4 text-tech-pink" />
          <span>{contest.participants?.length || 0} participants</span>
        </div>
        <div className="text-sm text-gray-400">
          Duration: {formatDuration(contest.durationMinutes)}
        </div>
      </div>
    </div>
  );
};

/**
 * ProblemListItem - Display problem in contest
 */
export const ProblemListItem = ({
  problem,
  status = 'unsolved',
  score = 0,
  onClick,
}) => {
  const statusIcons = {
    solved: '✓',
    attempted: '◐',
    unsolved: '○',
  };

  const statusColors = {
    solved: 'text-tech-lime',
    attempted: 'text-tech-yellow',
    unsolved: 'text-gray-500',
  };

  return (
    <div
      onClick={onClick}
      className="neon-box p-4 cursor-pointer hover:shadow-neon-lg transition-all group flex items-start gap-4"
    >
      <div className={`text-2xl font-bold ${statusColors[status]}`}>
        {statusIcons[status]}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="font-bold text-tech-cyan group-hover:text-tech-lime">
          {problem.title}
        </h4>
        <div className="flex gap-3 mt-2 flex-wrap">
          <span className={`text-xs px-2 py-1 rounded ${getDifficultyColor(problem.difficulty)}`}>
            {problem.difficulty.toUpperCase()}
          </span>
          <span className="text-xs text-tech-lime">+{problem.points} pts</span>
          {status !== 'unsolved' && (
            <span className="text-xs text-gray-400">Score: {score}</span>
          )}
        </div>
      </div>
    </div>
  );
};

/**
 * ParticipantListItem - Display participant with their status
 */
export const ParticipantListItem = ({ participant, isHost = false }) => {
  const statusColors = {
    pending: 'bg-yellow-400/10 text-yellow-400',
    accepted: 'bg-green-400/10 text-green-400',
    declined: 'bg-red-400/10 text-red-400',
  };

  return (
    <div className="neon-box p-3 flex items-center justify-between">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-tech-cyan/10 flex items-center justify-center border border-tech-cyan/30">
          <span className="text-sm font-bold text-tech-cyan">
            {participant.username?.charAt(0).toUpperCase()}
          </span>
        </div>
        <div>
          <p className="font-semibold text-tech-cyan">{participant.username}</p>
          {participant.rank > 0 && (
            <p className="text-xs text-gray-400">Rank #{participant.rank}</p>
          )}
        </div>
      </div>
      <div className="flex items-center gap-3">
        {participant.score > 0 && (
          <span className="text-sm font-bold text-tech-lime">{participant.score} pts</span>
        )}
        <span
          className={`text-xs px-2 py-1 rounded ${statusColors[participant.invitationStatus]}`}
        >
          {participant.invitationStatus}
        </span>
      </div>
    </div>
  );
};

/**
 * TestResultItem - Display individual test case result
 */
export const TestResultItem = ({ testCase, result, isHidden = false }) => {
  const passed = result?.passed ?? false;
  const bgColor = passed ? 'bg-green-400/5' : 'bg-red-400/5';
  const borderColor = passed ? 'border-green-400/30' : 'border-red-400/30';
  const textColor = passed ? 'text-green-400' : 'text-red-400';

  return (
    <div className={`neon-box border ${borderColor} ${bgColor} p-4`}>
      <div className="flex items-start gap-3 mb-3">
        <span className={`text-xl font-bold ${textColor}`}>
          {passed ? '✓' : '✗'}
        </span>
        <div className="flex-1">
          <p className="font-semibold text-tech-cyan">
            {isHidden ? 'Hidden Test Case' : `Test Case: ${testCase.id}`}
          </p>
          {result?.executionTime && (
            <p className="text-xs text-gray-400">
              Execution: {result.executionTime.toFixed(2)}ms
            </p>
          )}
        </div>
      </div>

      {!isHidden && (
        <div className="grid grid-cols-2 gap-3 text-xs">
          <div>
            <p className="text-gray-500 mb-1">Input:</p>
            <pre className="bg-tech-black/50 p-2 rounded text-gray-300 overflow-auto max-h-20">
              {testCase.input}
            </pre>
          </div>
          <div>
            <p className="text-gray-500 mb-1">Expected Output:</p>
            <pre className="bg-tech-black/50 p-2 rounded text-gray-300 overflow-auto max-h-20">
              {testCase.expectedOutput}
            </pre>
          </div>
        </div>
      )}

      {result && !passed && (
        <div className="mt-3 pt-3 border-t border-red-400/20">
          <p className="text-gray-500 text-xs mb-1">Actual Output:</p>
          <pre className="bg-tech-black/50 p-2 rounded text-red-400 overflow-auto max-h-20">
            {result.actual || 'No output'}
          </pre>
        </div>
      )}
    </div>
  );
};

/**
 * LoadingSpinner - Show loading state
 */
export const LoadingSpinner = () => (
  <div className="flex items-center justify-center p-8">
    <div className="animate-pulse-neon">
      <div className="w-12 h-12 border-2 border-tech-cyan rounded-full animate-spin"></div>
    </div>
  </div>
);

/**
 * ErrorAlert - Display error message
 */
export const ErrorAlert = ({ message, onDismiss }) => (
  <div className="neon-box border border-red-400/50 bg-red-400/5 p-4 flex items-start gap-3">
    <AlertCircle className="w-5 h-5 text-red-400 flex-shrink-0 mt-0.5" />
    <div className="flex-1">
      <p className="text-red-400 font-semibold">Error</p>
      <p className="text-gray-300 text-sm mt-1">{message}</p>
    </div>
    {onDismiss && (
      <button
        onClick={onDismiss}
        className="text-gray-400 hover:text-red-400 transition-colors"
      >
        ✕
      </button>
    )}
  </div>
);
