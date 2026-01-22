import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, X } from "lucide-react";

/* =========================
   MOCK DATABASE (TEMP)
========================= */

const mockUsersDB = [
  { id: "u101", username: "alice", email: "alice@mail.com" },
  { id: "u102", username: "bob", email: "bob@mail.com" },
  { id: "u103", username: "charlie", email: "charlie@mail.com" },
];

const mockProblemsDB = [
  { id: "p1", title: "Two Sum", difficulty: "Easy" },
  { id: "p2", title: "Longest Substring", difficulty: "Medium" },
  { id: "p3", title: "Median of Two Arrays", difficulty: "Hard" },
];

const CreateContestPage = () => {
  const navigate = useNavigate();

  /* =========================
     WIZARD STEP
  ========================= */
  const [step, setStep] = useState(1);

  /* =========================
     FORM STATE
  ========================= */
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    startTime: "",
    duration: 180,
    participants: [],
    problems: [],
  });

  const [userQuery, setUserQuery] = useState("");
  const [problemQuery, setProblemQuery] = useState("");
  const [userResult, setUserResult] = useState(null);
  const [problemResult, setProblemResult] = useState(null);
  const [errors, setErrors] = useState({});

  /* =========================
     VERIFY
  ========================= */

  const verifyUser = () => {
    const found = mockUsersDB.find((u) => u.id === userQuery.trim());
    setUserResult(found || "NOT_FOUND");
  };

  const verifyProblem = () => {
    const found = mockProblemsDB.find((p) => p.id === problemQuery.trim());
    setProblemResult(found || "NOT_FOUND");
  };

  /* =========================
     ADD / REMOVE
  ========================= */

  const addUser = () => {
    if (
      userResult &&
      userResult !== "NOT_FOUND" &&
      !formData.participants.some((u) => u.id === userResult.id)
    ) {
      setFormData({
        ...formData,
        participants: [...formData.participants, userResult],
      });
    }
    setUserResult(null);
    setUserQuery("");
  };

  const addProblem = () => {
    if (
      problemResult &&
      problemResult !== "NOT_FOUND" &&
      !formData.problems.some((p) => p.id === problemResult.id)
    ) {
      setFormData({
        ...formData,
        problems: [...formData.problems, problemResult],
      });
    }
    setProblemResult(null);
    setProblemQuery("");
  };

  const removeUser = (id) => {
    setFormData({
      ...formData,
      participants: formData.participants.filter((u) => u.id !== id),
    });
  };

  const removeProblem = (id) => {
    setFormData({
      ...formData,
      problems: formData.problems.filter((p) => p.id !== id),
    });
  };

  /* =========================
     STEP VALIDATION
  ========================= */

  const validateStep1 = () => {
    const errs = {};
    if (!formData.title) errs.title = "Title required";
    if (!formData.startTime) errs.startTime = "Start time required";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    if (formData.participants.length === 0) {
      setErrors({ participants: "Add at least one participant" });
      return false;
    }
    setErrors({});
    return true;
  };

  const validateStep3 = () => {
    if (formData.problems.length === 0) {
      setErrors({ problems: "Add at least one problem" });
      return false;
    }
    setErrors({});
    return true;
  };

  /* =========================
     SUBMIT
  ========================= */

  const handleSubmit = () => {
    console.log("Contest Created:", formData);
    navigate("/contests");
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-gray-950 text-white pt-16">
      <div className="max-w-4xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button
            onClick={() => navigate("/contests")}
            className="p-2 rounded hover:bg-gray-800"
          >
            <ArrowLeft />
          </button>
          <div>
            <h1 className="text-2xl font-semibold">Create Contest</h1>
            <p className="text-gray-400 text-sm">
              Step {step} of 3
            </p>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex gap-4 text-xs text-gray-500 mb-6">
          <span className={step === 1 ? "text-white" : ""}>Details</span>
          <span>→</span>
          <span className={step === 2 ? "text-white" : ""}>Participants</span>
          <span>→</span>
          <span className={step === 3 ? "text-white" : ""}>Problems</span>
        </div>

        {/* CARD */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-6 space-y-5">

          {/* STEP 1 */}
          {step === 1 && (
            <>
              <h2 className="text-lg font-semibold">Contest Details</h2>

              <input
                className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-sm"
                placeholder="Contest title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              {errors.title && <p className="text-red-400 text-xs">{errors.title}</p>}

              <textarea
                rows="2"
                className="w-full p-2 bg-gray-800 rounded border border-gray-700 text-sm resize-y"
                placeholder="Short description"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />

              <div className="grid grid-cols-2 gap-4">
                <input
                  type="datetime-local"
                  className="p-2 bg-gray-800 rounded border border-gray-700 text-sm"
                  value={formData.startTime}
                  onChange={(e) =>
                    setFormData({ ...formData, startTime: e.target.value })
                  }
                />
                <input
                  type="number"
                  min="1"
                  className="p-2 bg-gray-800 rounded border border-gray-700 text-sm"
                  value={formData.duration}
                  onChange={(e) =>
                    setFormData({ ...formData, duration: Number(e.target.value) })
                  }
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={() => validateStep1() && setStep(2)}
                  className="px-5 py-2 bg-blue-600 rounded text-sm font-medium"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 2 */}
          {step === 2 && (
            <>
              <h2 className="text-lg font-semibold">Participants</h2>

              <div className="flex gap-2">
                <input
                  className="flex-1 p-2 bg-gray-800 rounded border border-gray-700 text-sm"
                  placeholder="User ID"
                  value={userQuery}
                  onChange={(e) => setUserQuery(e.target.value)}
                />
                <button
                  onClick={verifyUser}
                  type="button"
                  className="px-4 bg-blue-600 rounded text-sm"
                >
                  Verify
                </button>
              </div>

              {userResult && userResult !== "NOT_FOUND" && (
                <div className="flex justify-between bg-green-900/40 border border-green-700 p-2 rounded">
                  <span className="text-sm">
                    {userResult.username} ({userResult.id})
                  </span>
                  <button onClick={addUser}><Plus size={16} /></button>
                </div>
              )}

              {errors.participants && (
                <p className="text-red-400 text-xs">{errors.participants}</p>
              )}

              <div className="flex flex-wrap gap-2">
                {formData.participants.map((u) => (
                  <span
                    key={u.id}
                    className="bg-blue-700/40 border border-blue-600 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                  >
                    {u.username}
                    <X size={12} onClick={() => removeUser(u.id)} />
                  </span>
                ))}
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(1)} className="text-sm text-gray-400">
                  Back
                </button>
                <button
                  onClick={() => validateStep2() && setStep(3)}
                  className="px-5 py-2 bg-blue-600 rounded text-sm"
                >
                  Next
                </button>
              </div>
            </>
          )}

          {/* STEP 3 */}
          {step === 3 && (
            <>
              <h2 className="text-lg font-semibold">Problems</h2>

              <div className="flex gap-2">
                <input
                  className="flex-1 p-2 bg-gray-800 rounded border border-gray-700 text-sm"
                  placeholder="Problem ID"
                  value={problemQuery}
                  onChange={(e) => setProblemQuery(e.target.value)}
                />
                <button
                  onClick={verifyProblem}
                  type="button"
                  className="px-4 bg-blue-600 rounded text-sm"
                >
                  Verify
                </button>
              </div>

              {problemResult && problemResult !== "NOT_FOUND" && (
                <div className="flex justify-between bg-green-900/40 border border-green-700 p-2 rounded">
                  <span className="text-sm">{problemResult.title}</span>
                  <button onClick={addProblem}><Plus size={16} /></button>
                </div>
              )}

              {errors.problems && (
                <p className="text-red-400 text-xs">{errors.problems}</p>
              )}

              <div className="flex flex-wrap gap-2">
                {formData.problems.map((p) => (
                  <span
                    key={p.id}
                    className="bg-purple-700/40 border border-purple-600 px-2 py-1 rounded-full text-xs flex items-center gap-1"
                  >
                    {p.title}
                    <X size={12} onClick={() => removeProblem(p.id)} />
                  </span>
                ))}
              </div>

              <div className="flex justify-between">
                <button onClick={() => setStep(2)} className="text-sm text-gray-400">
                  Back
                </button>
                <button
                  onClick={() => validateStep3() && handleSubmit()}
                  className="px-6 py-2 bg-green-600 rounded text-sm font-medium"
                >
                  Create Contest
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
};

export default CreateContestPage;
``