/* =========================
   STATIC EXAM DATA
========================= */

export const EXAM_QUESTIONS = [
  {
    id: "Q1",
    title: "Two Sum",
    difficulty: "Easy",
    status: "not-attempted",
    description: `Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.

You may assume that each input has exactly one solution, and you may not use the same element twice.

You can return the answer in any order.`,
    constraints: [
      "2 <= nums.length <= 10^4",
      "-10^9 <= nums[i] <= 10^9",
      "-10^9 <= target <= 10^9",
      "Only one valid answer exists.",
    ],
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "The sum of 2 and 7 is 9. Therefore, index0 = 0, index1 = 1.",
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "The sum of 2 and 4 is 6. Therefore, index0 = 1, index1 = 2.",
      },
    ],
    initialCode: `function twoSum(nums, target) {
  // TODO: Implement solution
  // Hint: Consider using a HashMap for O(n) time complexity
}`,
    testCases: [
      {
        input: "[2,7,11,15], 9",
        expectedOutput: "[0,1]",
      },
      {
        input: "[3,2,4], 6",
        expectedOutput: "[1,2]",
      },
      {
        input: "[3,3], 6",
        expectedOutput: "[0,1]",
      },
    ],
    solutionMeta: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(n)",
    },
  },
  {
    id: "Q2",
    title: "Reverse Linked List",
    difficulty: "Medium",
    status: "not-attempted",
    description: `Given the head of a singly linked list, reverse the list, and return the reversed list.

Example 1:
Input: head = [1,2,3,4,5]
Output: [5,4,3,2,1]

Example 2:
Input: head = [1,2]
Output: [2,1]`,
    constraints: [
      "The number of nodes in the list is the range [0, 5000].",
      "-5000 <= Node.val <= 5000",
    ],
    examples: [
      {
        input: "[1,2,3,4,5]",
        output: "[5,4,3,2,1]",
        explanation: "The linked list is reversed",
      },
      {
        input: "[1,2]",
        output: "[2,1]",
        explanation: "Simple two-node reversal",
      },
    ],
    initialCode: `function reverseList(head) {
  // TODO: Implement solution
  // Consider both iterative and recursive approaches
}`,
    testCases: [
      {
        input: "[1,2,3,4,5]",
        expectedOutput: "[5,4,3,2,1]",
      },
      {
        input: "[1,2]",
        expectedOutput: "[2,1]",
      },
      {
        input: "[]",
        expectedOutput: "[]",
      },
    ],
    solutionMeta: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(1)",
    },
  },
  {
    id: "Q3",
    title: "Longest Substring Without Repeating Characters",
    difficulty: "Medium",
    status: "not-attempted",
    description: `Given a string s, find the length of the longest substring without repeating characters.

Example 1:
Input: s = "abcabcbb"
Output: 3
Explanation: The answer is "abc", with the length of 3.

Example 2:
Input: s = "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.`,
    constraints: [
      "0 <= s.length <= 5 * 10^4",
      "s consists of English letters, digits, symbols and spaces.",
    ],
    examples: [
      {
        input: '"abcabcbb"',
        output: "3",
        explanation: 'Substring "abc" has length 3',
      },
      {
        input: '"bbbbb"',
        output: "1",
        explanation: 'Substring "b" has length 1',
      },
    ],
    initialCode: `function lengthOfLongestSubstring(s) {
  // TODO: Implement solution
  // Use sliding window approach
}`,
    testCases: [
      {
        input: '"abcabcbb"',
        expectedOutput: "3",
      },
      {
        input: '"bbbbb"',
        expectedOutput: "1",
      },
      {
        input: '"pwwkew"',
        expectedOutput: "3",
      },
    ],
    solutionMeta: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(min(n, m))",
    },
  },
  {
    id: "Q4",
    title: "Binary Tree Level Order Traversal",
    difficulty: "Medium",
    status: "not-attempted",
    description: `Given the root of a binary tree, return the level order traversal of its nodes' values. (i.e., from left to right, level by level).

Example 1:
Input: root = [3,9,20,null,null,15,7]
Output: [[3],[9,20],[15,7]]

Example 2:
Input: root = [1]
Output: [[1]]`,
    constraints: [
      "The number of nodes in the tree is in the range [0, 2000].",
      "-1000 <= Node.val <= 1000",
    ],
    examples: [
      {
        input: "[3,9,20,null,null,15,7]",
        output: "[[3],[9,20],[15,7]]",
        explanation: "Level order traversal of the tree",
      },
    ],
    initialCode: `function levelOrder(root) {
  // TODO: Implement solution
  // Use BFS with a queue
}`,
    testCases: [
      {
        input: "[3,9,20,null,null,15,7]",
        expectedOutput: "[[3],[9,20],[15,7]]",
      },
      {
        input: "[1]",
        expectedOutput: "[[1]]",
      },
    ],
    solutionMeta: {
      timeComplexity: "O(n)",
      spaceComplexity: "O(w)",
    },
  },
  {
    id: "Q5",
    title: "Merge K Sorted Lists",
    difficulty: "Hard",
    status: "not-attempted",
    description: `You are given an array of k linked-lists lists, each linked-list is sorted in ascending order.

Merge all the linked-lists into one sorted linked-list and return it.

Example:
Input: lists = [[1,4,5],[1,3,4],[2,6]]
Output: [1,1,2,3,4,4,5,6]`,
    constraints: [
      "k == lists.length",
      "0 <= k <= 10^4",
      "0 <= lists[i].length <= 500",
      "-10^4 <= lists[i][j] <= 10^4",
    ],
    examples: [
      {
        input: "[[1,4,5],[1,3,4],[2,6]]",
        output: "[1,1,2,3,4,4,5,6]",
        explanation: "All lists merged into one sorted list",
      },
    ],
    initialCode: `function mergeKLists(lists) {
  // TODO: Implement solution
  // Consider using a min-heap or divide and conquer
}`,
    testCases: [
      {
        input: "[[1,4,5],[1,3,4],[2,6]]",
        expectedOutput: "[1,1,2,3,4,4,5,6]",
      },
      {
        input: "[]",
        expectedOutput: "[]",
      },
    ],
    solutionMeta: {
      timeComplexity: "O(n log k)",
      spaceComplexity: "O(n)",
    },
  },
];

export const EXAM_CONTEST = {
  id: "CONTEST-001",
  title: "Spring 2026 Weekly Challenge #1",
  durationMinutes: 180,
  startTime: new Date(Date.now() - 30 * 60000).toISOString(), // Started 30 minutes ago
};
