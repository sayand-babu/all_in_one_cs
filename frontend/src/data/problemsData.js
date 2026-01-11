// Static problems data
export const problemsData = [
  {
    id: 1,
    title: "Two Sum",
    difficulty: "Easy",
    description: "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target.",
    examples: [
      {
        input: "nums = [2,7,11,15], target = 9",
        output: "[0,1]",
        explanation: "nums[0] + nums[1] == 9, so we return [0, 1]."
      },
      {
        input: "nums = [3,2,4], target = 6",
        output: "[1,2]",
        explanation: "nums[1] + nums[2] == 6, so we return [1, 2]."
      }
    ],
    testCases: [
      {
        input: "[2,7,11,15]\n9",
        expectedOutput: "[0,1]"
      },
      {
        input: "[3,2,4]\n6",
        expectedOutput: "[1,2]"
      },
      {
        input: "[3,3]\n6",
        expectedOutput: "[0,1]"
      }
    ],
    initialCode: `function twoSum(nums, target) {
  // Write your code here
  
}`,
    tags: ["Array", "Hash Table"],
    acceptance: "78.5%"
  },
  {
    id: 2,
    title: "Reverse String",
    difficulty: "Easy",
    description: "Write a function that reverses a string. The input string is given as an array of characters s.",
    examples: [
      {
        input: `s = ["h","e","l","l","o"]`,
        output: `["o","l","l","e","h"]`,
        explanation: "The string is reversed character by character."
      },
      {
        input: `s = ["H","a","n","n","a","h"]`,
        output: `["h","a","n","n","a","H"]`,
        explanation: "The string with special characters is reversed."
      }
    ],
    testCases: [
      {
        input: `["h","e","l","l","o"]`,
        expectedOutput: `["o","l","l","e","h"]`
      },
      {
        input: `["H","a","n","n","a","h"]`,
        expectedOutput: `["h","a","n","n","a","H"]`
      },
      {
        input: `["a"]`,
        expectedOutput: `["a"]`
      }
    ],
    initialCode: `function reverseString(s) {
  // Write your code here
  
}`,
    tags: ["String", "Array"],
    acceptance: "85.2%"
  },
  {
    id: 3,
    title: "Fibonacci Sequence",
    difficulty: "Medium",
    description: "The Fibonacci numbers, commonly denoted F(n), form a sequence in which each number is the sum of the two preceding ones.",
    examples: [
      {
        input: "n = 5",
        output: "3",
        explanation: "F(5) = 3"
      },
      {
        input: "n = 7",
        output: "13",
        explanation: "F(7) = 13"
      }
    ],
    testCases: [
      {
        input: "5",
        expectedOutput: "3"
      },
      {
        input: "7",
        expectedOutput: "13"
      },
      {
        input: "2",
        expectedOutput: "1"
      }
    ],
    initialCode: `function fibonacci(n) {
  // Write your code here
  
}`,
    tags: ["Math", "Recursion", "Dynamic Programming"],
    acceptance: "72.1%"
  },
  {
    id: 4,
    title: "Palindrome Check",
    difficulty: "Easy",
    description: "Given a string s, return true if s is a palindrome, or false otherwise. Ignore spaces, punctuation and capitalization.",
    examples: [
      {
        input: `s = "A man, a plan, a canal: Panama"`,
        output: "true",
        explanation: "After removing non-alphanumeric characters and converting to lowercase: 'amanaplanacanalpanama' is a palindrome."
      },
      {
        input: `s = "race a car"`,
        output: "false",
        explanation: "'raceacar' is not a palindrome."
      }
    ],
    testCases: [
      {
        input: `"A man, a plan, a canal: Panama"`,
        expectedOutput: "true"
      },
      {
        input: `"race a car"`,
        expectedOutput: "false"
      },
      {
        input: `" "`,
        expectedOutput: "true"
      }
    ],
    initialCode: `function isPalindrome(s) {
  // Write your code here
  
}`,
    tags: ["String", "Two Pointers"],
    acceptance: "68.9%"
  }
];

export const defaultProblem = problemsData[0];
