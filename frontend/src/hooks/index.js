import { useEffect, useState } from 'react';
import { getTimeRemaining, getContestStatus } from '../utils/time';

/**
 * Hook to get remaining time for a contest
 */
export const useContestTimer = (endTime, onExpire) => {
  const [timeRemaining, setTimeRemaining] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = getTimeRemaining(endTime);
      setTimeRemaining(remaining);

      if (remaining.expired && onExpire) {
        clearInterval(timer);
        onExpire();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [endTime, onExpire]);

  return timeRemaining;
};

/**
 * Hook to manage contest status and transitions
 */
export const useContestStatus = (contest) => {
  const [status, setStatus] = useState(getContestStatus(contest));

  useEffect(() => {
    const checkStatus = () => {
      setStatus(getContestStatus(contest));
    };

    const interval = setInterval(checkStatus, 30000); // Check every 30 seconds
    return () => clearInterval(interval);
  }, [contest]);

  return status;
};

/**
 * Hook for live submission tracking
 */
export const useSubmissionTracker = (contestId) => {
  const [submissions, setSubmissions] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const trackSubmission = (submission) => {
    setSubmissions([...submissions, submission]);
  };

  const fetchSubmissions = async () => {
    setIsLoading(true);
    try {
      // TODO: Backend API call to GET /contests/{contestId}/submissions
      // const response = await fetch(`/api/contests/${contestId}/submissions`);
      // const data = await response.json();
      // setSubmissions(data);
    } catch (error) {
      console.error('Failed to fetch submissions:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    submissions,
    trackSubmission,
    fetchSubmissions,
    isLoading,
  };
};

/**
 * Hook to manage code execution and testing
 */
export const useCodeExecution = () => {
  const [isRunning, setIsRunning] = useState(false);
  const [results, setResults] = useState(null);
  const [error, setError] = useState(null);

  const executeCode = async (code, language, testCases) => {
    setIsRunning(true);
    setError(null);

    try {
      // TODO: Backend API call to POST /judge/execute
      // const response = await fetch('/api/judge/execute', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify({ code, language, testCases }),
      // });
      // const data = await response.json();

      // Mock execution result
      const mockResults = testCases.map((tc) => ({
        testCaseId: tc.id,
        input: tc.input,
        expected: tc.expectedOutput,
        actual: tc.expectedOutput,
        passed: true,
        executionTime: Math.random() * 100,
      }));

      setResults(mockResults);
      return mockResults;
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setIsRunning(false);
    }
  };

  return {
    isRunning,
    results,
    error,
    executeCode,
  };
};
