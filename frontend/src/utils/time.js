/**
 * Time and formatting utilities
 */

export const formatTime = (date) => {
  return new Date(date).toLocaleString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};

export const formatDuration = (minutes) => {
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return mins > 0 ? `${hours}h ${mins}m` : `${hours}h`;
};

export const getTimeRemaining = (endTime) => {
  const now = new Date();
  const end = new Date(endTime);
  const diff = end - now;

  if (diff <= 0) return { expired: true, display: '0s' };

  const hours = Math.floor(diff / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  let display = '';
  if (hours > 0) display += `${hours}h `;
  if (minutes > 0) display += `${minutes}m `;
  display += `${seconds}s`;

  return {
    expired: false,
    display: display.trim(),
    total: diff,
    hours,
    minutes,
    seconds,
  };
};

export const getContestStatus = (contest) => {
  const now = new Date();
  const start = new Date(contest.startTime);
  const end = new Date(contest.endTime);

  if (now < start) return 'scheduled';
  if (now > end) return 'completed';
  return 'active';
};

export const getDifficultyColor = (difficulty) => {
  const colors = {
    easy: 'text-green-400 bg-green-400/10',
    medium: 'text-yellow-400 bg-yellow-400/10',
    hard: 'text-red-400 bg-red-400/10',
  };
  return colors[difficulty] || colors.easy;
};

export const getStatusColor = (status) => {
  const colors = {
    solved: 'text-green-400',
    attempted: 'text-yellow-400',
    unsolved: 'text-gray-500',
    accepted: 'text-green-400',
    wrong_answer: 'text-red-400',
    runtime_error: 'text-red-500',
    time_limit_exceeded: 'text-orange-400',
  };
  return colors[status] || colors.unsolved;
};

export const calculateScore = (submission, points) => {
  // Score calculation logic
  // Base points for correct answer, reduced points for wrong answers
  if (submission.status === 'accepted') {
    return points;
  }
  if (submission.status === 'wrong_answer') {
    return Math.max(0, Math.floor(points * 0.3));
  }
  return 0;
};
