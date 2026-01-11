/**
 * Core TypeScript-like interfaces for the Competition Platform
 * Using JSDoc for type documentation in JavaScript
 */

/**
 * @typedef {Object} User
 * @property {string} id - Unique user identifier
 * @property {string} username - Username
 * @property {string} email - User email
 * @property {string} avatar - Avatar URL
 * @property {string} role - 'host' | 'participant' | 'admin'
 */

/**
 * @typedef {Object} TestCase
 * @property {string} id - Unique test case ID
 * @property {string} input - Input data
 * @property {string} expectedOutput - Expected output
 * @property {boolean} isHidden - Whether test case is hidden until submission
 */

/**
 * @typedef {Object} Problem
 * @property {string} id - Unique problem ID
 * @property {string} title - Problem title
 * @property {string} description - Full problem description
 * @property {string} difficulty - 'easy' | 'medium' | 'hard'
 * @property {number} points - Points for solving this problem
 * @property {string} constraints - Problem constraints
 * @property {string} inputFormat - Input format description
 * @property {string} outputFormat - Output format description
 * @property {TestCase[]} sampleTestCases - Public sample test cases
 * @property {TestCase[]} hiddenTestCases - Hidden test cases (server-side)
 * @property {string} initialCode - Initial code template
 * @property {Array<'cpp' | 'python' | 'javascript'>} supportedLanguages - Supported languages
 */

/**
 * @typedef {Object} Submission
 * @property {string} id - Unique submission ID
 * @property {string} problemId - Problem being solved
 * @property {string} userId - User who submitted
 * @property {string} code - Submitted code
 * @property {string} language - Language used
 * @property {Date} timestamp - Submission time
 * @property {string} status - 'accepted' | 'wrong_answer' | 'runtime_error' | 'time_limit_exceeded'
 * @property {number} executionTime - Execution time in ms
 * @property {number} pointsScored - Points awarded
 * @property {string} output - Output from execution
 * @property {string} error - Error message if any
 */

/**
 * @typedef {Object} ParticipantStatus
 * @property {string} userId - Participant user ID
 * @property {string} username - Participant username
 * @property {string} invitationStatus - 'pending' | 'accepted' | 'declined'
 * @property {boolean} hasJoined - Whether participant joined at start
 * @property {number} score - Current score
 * @property {number} rank - Current rank
 * @property {Object.<string, 'unsolved' | 'attempted' | 'solved'>} problemStatuses - Status per problem
 */

/**
 * @typedef {Object} Contest
 * @property {string} id - Unique contest ID
 * @property {string} hostId - User ID of contest creator
 * @property {string} title - Contest title
 * @property {string} description - Contest description
 * @property {Date} createdAt - Contest creation time
 * @property {Date} startTime - Contest start time
 * @property {Date} endTime - Contest end time
 * @property {number} durationMinutes - Contest duration in minutes
 * @property {string} status - 'draft' | 'scheduled' | 'active' | 'completed'
 * @property {Problem[]} problems - Array of problems in contest
 * @property {ParticipantStatus[]} participants - Array of participant statuses
 * @property {string} visibility - 'private' | 'invite-only' | 'public'
 * @property {Submission[]} submissions - All submissions (server-side aggregation)
 */

/**
 * @typedef {Object} ContestLeaderboard
 * @property {string} contestId - Contest ID
 * @property {Array<{rank: number, userId: string, username: string, score: number, solvedProblems: number, lastSubmissionTime: Date}>} entries - Leaderboard entries
 */

export {};
