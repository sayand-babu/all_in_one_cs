/**
 * Mock Users Data
 */
export const mockUsers = {
  // Current logged-in user
  current: {
    id: 'user-1',
    username: 'alex_developer',
    email: 'alex@example.com',
    avatar: 'https://i.pravatar.cc/150?img=1',
    role: 'participant',
  },
  // Host user
  host: {
    id: 'user-2',
    username: 'sarah_tech',
    email: 'sarah@example.com',
    avatar: 'https://i.pravatar.cc/150?img=2',
    role: 'host',
  },
  // Other participants
  all: [
    {
      id: 'user-1',
      username: 'alex_developer',
      email: 'alex@example.com',
      avatar: 'https://i.pravatar.cc/150?img=1',
      role: 'participant',
    },
    {
      id: 'user-3',
      username: 'jordan_coder',
      email: 'jordan@example.com',
      avatar: 'https://i.pravatar.cc/150?img=3',
      role: 'participant',
    },
    {
      id: 'user-4',
      username: 'casey_ninja',
      email: 'casey@example.com',
      avatar: 'https://i.pravatar.cc/150?img=4',
      role: 'participant',
    },
    {
      id: 'user-5',
      username: 'morgan_elite',
      email: 'morgan@example.com',
      avatar: 'https://i.pravatar.cc/150?img=5',
      role: 'participant',
    },
  ],
};

/**
 * Mock Problems Data
 */
export const mockProblems = [
  {
    id: 'problem-1',
    title: 'Two Sum',
    description: `Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    difficulty: 'easy',
    points: 100,
    constraints: `
2 <= nums.length <= 10^4
-10^9 <= nums[i] <= 10^9
-10^9 <= target <= 10^9
Only one valid answer exists.
    `.trim(),
    inputFormat: 'First line: array of integers. Second line: target integer.',
    outputFormat: 'Return indices as a pair [i, j]',
    sampleTestCases: [
      {
        id: 'tc-1-1',
        input: 'nums = [2,7,11,15], target = 9',
        expectedOutput: '[0,1]',
        isHidden: false,
      },
      {
        id: 'tc-1-2',
        input: 'nums = [3,2,4], target = 6',
        expectedOutput: '[1,2]',
        isHidden: false,
      },
    ],
    hiddenTestCases: [
      {
        id: 'tc-1-3',
        input: 'nums = [3,3], target = 6',
        expectedOutput: '[0,1]',
        isHidden: true,
      },
    ],
    initialCode: `function twoSum(nums, target) {
  // TODO: Implement solution
  // Hint: Consider using a HashMap for O(n) time complexity
}

// Do not modify below
module.exports = twoSum;`,
    supportedLanguages: ['python', 'javascript', 'cpp'],
  },
  {
    id: 'problem-2',
    title: 'Reverse Linked List',
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Can you do it iteratively and recursively?`,
    difficulty: 'medium',
    points: 150,
    constraints: `
The number of nodes in the list is the range [0, 5000].
-5000 <= Node.val <= 5000
    `.trim(),
    inputFormat: 'Head node of linked list',
    outputFormat: 'Head node of reversed linked list',
    sampleTestCases: [
      {
        id: 'tc-2-1',
        input: '[1,2,3,4,5]',
        expectedOutput: '[5,4,3,2,1]',
        isHidden: false,
      },
      {
        id: 'tc-2-2',
        input: '[]',
        expectedOutput: '[]',
        isHidden: false,
      },
    ],
    hiddenTestCases: [
      {
        id: 'tc-2-3',
        input: '[1]',
        expectedOutput: '[1]',
        isHidden: true,
      },
    ],
    initialCode: `class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  // TODO: Implement solution
  // Try both iterative and recursive approaches
}

module.exports = { reverseList, ListNode };`,
    supportedLanguages: ['python', 'javascript', 'cpp'],
  },
  {
    id: 'problem-3',
    title: 'Merge k Sorted Lists',
    description: `You are given an array of k linked-lists lists, each linked list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.`,
    difficulty: 'hard',
    points: 250,
    constraints: `
k == lists.length
0 <= k <= 10^4
0 <= lists[i].length <= 500
-10^4 <= lists[i][j] <= 10^4
    `.trim(),
    inputFormat: 'Array of k sorted linked lists',
    outputFormat: 'Single merged sorted linked list',
    sampleTestCases: [
      {
        id: 'tc-3-1',
        input: '[[1,4,5],[1,3,4],[2,6]]',
        expectedOutput: '[1,1,2,1,3,4,4,5,6]',
        isHidden: false,
      },
    ],
    hiddenTestCases: [
      {
        id: 'tc-3-2',
        input: '[]',
        expectedOutput: '[]',
        isHidden: true,
      },
    ],
    initialCode: `function mergeKLists(lists) {
  // TODO: Implement solution
  // Hint: Consider using a min-heap or divide-and-conquer
}

module.exports = mergeKLists;`,
    supportedLanguages: ['python', 'javascript', 'cpp'],
  },
];

/**
 * Mock Contest Data
 */
export const mockContests = [
  {
    id: 'contest-1',
    hostId: 'user-2',
    title: 'Spring 2026 Weekly Challenge #1',
    description: 'Weekly coding challenge focusing on data structures and algorithms. Test your problem-solving skills!',
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    startTime: new Date(Date.now() + 2 * 60 * 60 * 1000), // 2 hours from now
    endTime: new Date(Date.now() + 5 * 60 * 60 * 1000), // 5 hours from now
    durationMinutes: 180,
    status: 'scheduled',
    problems: mockProblems.slice(0, 3),
    participants: [
      {
        userId: 'user-1',
        username: 'alex_developer',
        invitationStatus: 'accepted',
        hasJoined: false,
        score: 0,
        rank: 0,
        problemStatuses: {
          'problem-1': 'unsolved',
          'problem-2': 'unsolved',
          'problem-3': 'unsolved',
        },
      },
      {
        userId: 'user-3',
        username: 'jordan_coder',
        invitationStatus: 'accepted',
        hasJoined: false,
        score: 0,
        rank: 0,
        problemStatuses: {
          'problem-1': 'unsolved',
          'problem-2': 'unsolved',
          'problem-3': 'unsolved',
        },
      },
      {
        userId: 'user-4',
        username: 'casey_ninja',
        invitationStatus: 'pending',
        hasJoined: false,
        score: 0,
        rank: 0,
        problemStatuses: {},
      },
    ],
    visibility: 'invite-only',
    submissions: [],
  },
  {
    id: 'contest-2',
    hostId: 'user-2',
    title: 'Algorithm Mastery Sprint',
    description: 'Advanced algorithms competition. Only for experienced competitive programmers.',
    createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    startTime: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
    endTime: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000), // 1 day ago
    durationMinutes: 240,
    status: 'completed',
    problems: mockProblems,
    participants: [
      {
        userId: 'user-1',
        username: 'alex_developer',
        invitationStatus: 'accepted',
        hasJoined: true,
        score: 320,
        rank: 2,
        problemStatuses: {
          'problem-1': 'solved',
          'problem-2': 'solved',
          'problem-3': 'attempted',
        },
      },
      {
        userId: 'user-3',
        username: 'jordan_coder',
        invitationStatus: 'accepted',
        hasJoined: true,
        score: 400,
        rank: 1,
        problemStatuses: {
          'problem-1': 'solved',
          'problem-2': 'solved',
          'problem-3': 'solved',
        },
      },
    ],
    visibility: 'invite-only',
    submissions: [],
  },
];

/**
 * Mock Leaderboard Data
 */
export const mockLeaderboards = {
  'contest-1': {
    contestId: 'contest-1',
    entries: [
      {
        rank: 1,
        userId: 'user-3',
        username: 'jordan_coder',
        score: 250,
        solvedProblems: 2,
        lastSubmissionTime: new Date(),
      },
      {
        rank: 2,
        userId: 'user-1',
        username: 'alex_developer',
        score: 100,
        solvedProblems: 1,
        lastSubmissionTime: new Date(),
      },
    ],
  },
  'contest-2': {
    contestId: 'contest-2',
    entries: [
      {
        rank: 1,
        userId: 'user-3',
        username: 'jordan_coder',
        score: 400,
        solvedProblems: 3,
        lastSubmissionTime: new Date(Date.now() - 12 * 60 * 60 * 1000),
      },
      {
        rank: 2,
        userId: 'user-1',
        username: 'alex_developer',
        score: 320,
        solvedProblems: 2,
        lastSubmissionTime: new Date(Date.now() - 10 * 60 * 60 * 1000),
      },
    ],
  },
};
