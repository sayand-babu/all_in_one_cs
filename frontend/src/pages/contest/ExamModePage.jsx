import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft, ChevronRight, Flag } from "lucide-react";
import Timer from "../../components/exam/Timer";
import QuestionWorkspace from "../../components/exam/QuestionWorkspace";
import { EXAM_QUESTIONS, EXAM_CONTEST } from "../../data/examData";

const ExamModePage = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  const [questions, setQuestions] = useState(EXAM_QUESTIONS);
  const [selectedQuestionId, setSelectedQuestionId] = useState(null);
  const [showWorkspace, setShowWorkspace] = useState(false);
  const [timeUp, setTimeUp] = useState(false);

  const selectedQuestion = questions.find((q) => q.id === selectedQuestionId);
  const selectedIndex = questions.findIndex((q) => q.id === selectedQuestionId);

  const handleSelectQuestion = (questionId) => {
    setSelectedQuestionId(questionId);
    setShowWorkspace(true);
  };

  const handleQuestionSubmit = (questionId) => {
    setQuestions(
      questions.map((q) =>
        q.id === questionId ? { ...q, status: "attempted" } : q
      )
    );
  };

  const handlePreviousQuestion = () => {
    if (selectedIndex > 0) {
      setSelectedQuestionId(questions[selectedIndex - 1].id);
    }
  };

  const handleNextQuestion = () => {
    if (selectedIndex < questions.length - 1) {
      setSelectedQuestionId(questions[selectedIndex + 1].id);
    }
  };

  if (showWorkspace && selectedQuestion) {
    return (
      <QuestionWorkspace
        question={selectedQuestion}
        allQuestions={questions}
        currentIndex={selectedIndex}
        onBack={() => setShowWorkspace(false)}
        onPreviousQuestion={handlePreviousQuestion}
        onNextQuestion={handleNextQuestion}
      />
    );
  }

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "text-green-400 bg-green-900";
      case "medium":
        return "text-yellow-400 bg-yellow-900";
      case "hard":
        return "text-red-400 bg-red-900";
      default:
        return "text-gray-400 bg-gray-900";
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "attempted":
        return "✓";
      case "not-attempted":
        return "○";
      default:
        return "○";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "attempted":
        return "text-green-400";
      case "not-attempted":
        return "text-gray-400";
      default:
        return "text-gray-400";
    }
  };

  const attemptedCount = questions.filter((q) => q.status === "attempted").length;

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Header */}
      <div className="border-b border-gray-700 bg-gray-800 p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate(`/contest/${contestId}`)}
              className="flex items-center gap-2 text-gray-400 hover:text-white transition"
            >
              <ArrowLeft size={20} />
              Back
            </button>
            <div className="border-l border-gray-700 pl-4">
              <h1 className="text-2xl font-bold">{EXAM_CONTEST.title}</h1>
              <p className="text-sm text-gray-400">Contest ID: {EXAM_CONTEST.id}</p>
            </div>
          </div>
          <Timer durationMinutes={EXAM_CONTEST.durationMinutes} />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 max-w-7xl mx-auto w-full p-6">
        {/* Questions Summary */}
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold">Questions</h2>
            <div className="text-sm text-gray-400">
              <span className="font-semibold text-green-400">
                {attemptedCount}
              </span>
              /{questions.length} Attempted
            </div>
          </div>

          {/* Questions Grid */}
          <div className="grid grid-cols-1 gap-2">
            {questions.map((question, idx) => (
              <button
                key={question.id}
                onClick={() => handleSelectQuestion(question.id)}
                className={`w-full text-left p-4 rounded border transition hover:border-blue-500 ${
                  selectedQuestionId === question.id
                    ? "border-blue-500 bg-blue-900"
                    : "border-gray-700 bg-gray-700 hover:bg-gray-600"
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Status Icon */}
                    <span className={`text-lg font-bold ${getStatusColor(question.status)}`}>
                      {getStatusIcon(question.status)}
                    </span>

                    {/* Question Info */}
                    <div className="flex-1">
                      <p className="font-semibold">
                        {idx + 1}. {question.title}
                      </p>
                      <p className="text-xs text-gray-400 mt-1">
                        ID: {question.id}
                      </p>
                    </div>

                    {/* Difficulty Badge */}
                    <span
                      className={`px-3 py-1 rounded text-xs font-semibold ${getDifficultyColor(
                        question.difficulty
                      )}`}
                    >
                      {question.difficulty}
                    </span>
                  </div>

                  {/* Arrow */}
                  <ChevronRight size={20} className="ml-4 text-gray-500" />
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Submit Section */}
        <div className="flex gap-4 justify-center">
          <button
            onClick={() => navigate(`/contest/${contestId}`)}
            className="px-6 py-3 bg-gray-700 hover:bg-gray-600 rounded font-semibold transition"
          >
            Exit Exam
          </button>
          <button className="px-6 py-3 bg-green-600 hover:bg-green-700 rounded font-semibold flex items-center gap-2 transition">
            <Flag size={18} />
            Submit All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamModePage;
