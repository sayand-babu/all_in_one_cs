// ============================================
// API Integration Guide for Backend
// ============================================

// This file shows how to integrate real code execution
// with your backend API. Replace the simulation in ProblemPage.jsx

/**
 * Example 1: Simple API Call for Code Execution
 */
const executeCode = async (code, testCases, problemId) => {
  try {
    const response = await fetch('http://your-backend-url/api/execute', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        code: code,
        testCases: testCases,
        problemId: problemId,
        language: 'javascript'
      })
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const results = await response.json();
    return results;
  } catch (error) {
    console.error('Error executing code:', error);
    throw error;
  }
};

/**
 * Example 2: API Call with Submission Tracking
 */
const submitSolution = async (code, problemId, userId) => {
  try {
    const response = await fetch('http://your-backend-url/api/submissions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${userToken}`
      },
      body: JSON.stringify({
        code: code,
        problemId: problemId,
        userId: userId,
        language: 'javascript',
        submittedAt: new Date().toISOString()
      })
    });

    const submission = await response.json();
    return submission;
  } catch (error) {
    console.error('Error submitting solution:', error);
    throw error;
  }
};

/**
 * Example 3: API Response Format
 * 
 * Expected Backend Response Structure:
 */
const exampleResponse = {
  success: true,
  executionId: "exec_12345",
  results: [
    {
      testCaseId: 1,
      status: "passed",     // "passed" | "failed" | "timeout" | "error"
      output: "[0,1]",
      expectedOutput: "[0,1]",
      executionTime: 12,    // milliseconds
      memory: 8,            // MB
      error: null
    },
    {
      testCaseId: 2,
      status: "failed",
      output: "null",
      expectedOutput: "[1,2]",
      executionTime: 8,
      memory: 7,
      error: null
    },
    {
      testCaseId: 3,
      status: "passed",
      output: "[0,1]",
      expectedOutput: "[0,1]",
      executionTime: 10,
      memory: 8,
      error: null
    }
  ],
  summary: {
    totalTests: 3,
    passedTests: 2,
    failedTests: 1,
    totalTime: 30,
    maxMemory: 8
  }
};

/**
 * Example 4: Modified ProblemPage.jsx with Real API
 * 
 * Replace the simulateCodeExecution function with:
 */
const realCodeExecution = async (code) => {
  setIsRunning(true);
  try {
    // Call backend API
    const response = await executeCode(code, problem.testCases, problem.id);
    
    // Transform response to match UI expectations
    const newResults = {};
    response.results.forEach((result, index) => {
      newResults[index] = {
        status: result.status === "passed" ? "passed" : "failed",
        output: result.output,
        executionTime: result.executionTime,
        memory: result.memory
      };
    });
    
    setResults(newResults);
    setShowResults(true);
  } catch (error) {
    console.error('Execution failed:', error);
    alert('Failed to execute code. Please try again.');
  } finally {
    setIsRunning(false);
  }
};

/**
 * Example 5: Error Handling
 */
const handleCodeExecutionError = (error) => {
  switch (error.type) {
    case 'COMPILATION_ERROR':
      return {
        message: 'Compilation Error',
        details: error.details,
        icon: '❌'
      };
    case 'RUNTIME_ERROR':
      return {
        message: 'Runtime Error',
        details: error.details,
        icon: '⚠️'
      };
    case 'TIMEOUT':
      return {
        message: 'Time Limit Exceeded',
        details: 'Your code took too long to execute',
        icon: '⏱️'
      };
    case 'MEMORY_ERROR':
      return {
        message: 'Memory Limit Exceeded',
        details: 'Your code used too much memory',
        icon: '💾'
      };
    default:
      return {
        message: 'Unknown Error',
        details: 'An unexpected error occurred',
        icon: '❌'
      };
  }
};

/**
 * Example 6: Backend Endpoint Suggestions
 * 
 * Your backend should provide these endpoints:
 */
const backendEndpoints = {
  // Execute code and get immediate results
  execute: {
    path: '/api/execute',
    method: 'POST',
    body: {
      code: 'string',
      testCases: 'array',
      problemId: 'number',
      language: 'string'
    },
    response: 'See exampleResponse above'
  },

  // Submit code for permanent tracking
  submit: {
    path: '/api/submissions',
    method: 'POST',
    body: {
      code: 'string',
      problemId: 'number',
      userId: 'string',
      language: 'string',
      submittedAt: 'ISO8601 date'
    },
    response: {
      id: 'submission_id',
      status: 'accepted|rejected',
      results: 'array'
    }
  },

  // Get problem details
  getProblem: {
    path: '/api/problems/:id',
    method: 'GET',
    response: {
      id: 'number',
      title: 'string',
      description: 'string',
      // ... rest of problem fields
    }
  },

  // Get all problems
  getProblems: {
    path: '/api/problems',
    method: 'GET',
    query: {
      difficulty: 'Easy|Medium|Hard',
      page: 'number',
      limit: 'number'
    },
    response: {
      problems: 'array',
      total: 'number',
      page: 'number'
    }
  },

  // Get user submissions
  getSubmissions: {
    path: '/api/users/:userId/submissions',
    method: 'GET',
    response: {
      submissions: 'array'
    }
  }
};

/**
 * Example 7: Authentication Integration
 * 
 * For adding user authentication:
 */
const authApi = {
  login: async (email, password) => {
    const response = await fetch('http://your-backend-url/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    });
    return response.json();
  },

  logout: async () => {
    await fetch('http://your-backend-url/api/auth/logout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });
  },

  register: async (email, password, name) => {
    const response = await fetch('http://your-backend-url/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password, name })
    });
    return response.json();
  }
};

/**
 * Example 8: Setup for React Context (Optional)
 * 
 * For global state management:
 */
// Create a context for API calls
/*
import React, { createContext, useCallback } from 'react';

const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const executeCode = useCallback(async (code, testCases, problemId) => {
    // Implementation here
  }, []);

  const submitSolution = useCallback(async (code, problemId, userId) => {
    // Implementation here
  }, []);

  return (
    <ApiContext.Provider value={{ executeCode, submitSolution }}>
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = React.useContext(ApiContext);
  if (!context) {
    throw new Error('useApi must be used within ApiProvider');
  }
  return context;
};
*/

/**
 * Example 9: Error Handling Middleware
 */
const handleApiError = (error, context = '') => {
  if (error.response) {
    // Backend returned error status
    console.error(`${context} - Status: ${error.response.status}`, error.response.data);
  } else if (error.request) {
    // Request made but no response
    console.error(`${context} - No response:`, error.request);
  } else {
    // Error setting up request
    console.error(`${context} - Error:`, error.message);
  }
};

/**
 * Example 10: Rate Limiting
 * 
 * Prevent too many API calls:
 */
const withRateLimit = (fn, delay = 1000) => {
  let lastCall = 0;
  return async (...args) => {
    const now = Date.now();
    if (now - lastCall < delay) {
      throw new Error('Too many requests. Please wait before trying again.');
    }
    lastCall = now;
    return fn(...args);
  };
};

// Usage:
/*
const rateLimitedExecute = withRateLimit(executeCode, 2000);
*/

/**
 * Example 11: Caching Results
 * 
 * Cache API responses to reduce backend calls:
 */
class CodeExecutionCache {
  constructor() {
    this.cache = new Map();
  }

  getKey(code, testCases) {
    return `${code}_${JSON.stringify(testCases)}`;
  }

  get(code, testCases) {
    return this.cache.get(this.getKey(code, testCases));
  }

  set(code, testCases, results) {
    this.cache.set(this.getKey(code, testCases), results);
  }

  clear() {
    this.cache.clear();
  }
}

// ============================================
// Implementation Tips
// ============================================

/*
1. Start with executeCode function for basic integration
2. Add authentication when ready
3. Implement submission tracking later
4. Use error handling for better UX
5. Cache results to reduce API calls
6. Add rate limiting for production
7. Test with different languages
8. Monitor execution times and memory usage
9. Add analytics/logging for debugging
10. Implement retry logic for failed requests

Resources:
- Axios (Promise based HTTP client) https://axios-http.com
- Fetch API (Native) https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API
- React Query (Data fetching) https://tanstack.com/query/latest
- SWR (Data fetching) https://swr.vercel.app
*/
