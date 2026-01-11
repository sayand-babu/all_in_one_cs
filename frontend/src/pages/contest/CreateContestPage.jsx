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
     SUBMIT
  ========================= */

  const handleSubmit = (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.title) newErrors.title = "Title required";
    if (!formData.description) newErrors.description = "Description required";
    if (!formData.startTime) newErrors.startTime = "Start time required";
    if (formData.participants.length === 0)
      newErrors.participants = "Add participants";
    if (formData.problems.length === 0)
      newErrors.problems = "Add problems";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const payload = {
      title: formData.title,
      description: formData.description,
      startTime: formData.startTime,
      duration: formData.duration,
      participantIds: formData.participants.map((u) => u.id),
      problemIds: formData.problems.map((p) => p.id),
    };

    console.log("Contest Created:", payload);
    navigate("/contests");
  };

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen pt-20 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-6">

        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <button onClick={() => navigate("/contests")}>
            <ArrowLeft />
          </button>
          <h1 className="text-3xl font-bold">Create Contest</h1>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">

            {/* LEFT COLUMN – Contest Details */}
            <div className="space-y-6 border p-6 rounded-lg">
              <h2 className="text-xl font-semibold">Contest Details</h2>

              <input
                type="text"
                placeholder="Contest Title"
                className="w-full p-3 bg-gray-800 rounded"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
              />
              {errors.title && <p className="text-red-400">{errors.title}</p>}

              <textarea
                placeholder="Contest Description"
                rows="5"
                className="w-full p-3 bg-gray-800 rounded"
                value={formData.description}
                onChange={(e) =>
                  setFormData({ ...formData, description: e.target.value })
                }
              />
              {errors.description && (
                <p className="text-red-400">{errors.description}</p>
              )}

              <input
                type="datetime-local"
                className="w-full p-3 bg-gray-800 rounded"
                value={formData.startTime}
                onChange={(e) =>
                  setFormData({ ...formData, startTime: e.target.value })
                }
              />
              {errors.startTime && (
                <p className="text-red-400">{errors.startTime}</p>
              )}

              <input
                type="number"
                min="1"
                placeholder="Duration (minutes)"
                className="w-full p-3 bg-gray-800 rounded"
                value={formData.duration}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    duration: Number(e.target.value),
                  })
                }
              />
            </div>

            {/* RIGHT COLUMN – Participants + Problems */}
            <div className="space-y-6">

              {/* Participants */}
              <div className="border p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Add Participants</h2>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter User ID"
                    value={userQuery}
                    onChange={(e) => setUserQuery(e.target.value)}
                    className="flex-1 p-2 bg-gray-800 rounded"
                  />
                  <button type="button" onClick={verifyUser}>
                    Search
                  </button>
                </div>

                {userResult && userResult !== "NOT_FOUND" && (
                  <div className="mt-3 flex justify-between bg-green-900 p-2 rounded">
                    <span>
                      {userResult.username} ({userResult.id})
                    </span>
                    <button type="button" onClick={addUser}>
                      <Plus size={16} />
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.participants.map((u) => (
                    <span
                      key={u.id}
                      className="bg-blue-800 px-3 py-1 rounded flex gap-1"
                    >
                      {u.username}
                      <X size={14} onClick={() => removeUser(u.id)} />
                    </span>
                  ))}
                </div>
              </div>

              {/* Problems */}
              <div className="border p-6 rounded-lg">
                <h2 className="text-xl font-semibold mb-3">Add Questions</h2>

                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Problem ID"
                    value={problemQuery}
                    onChange={(e) => setProblemQuery(e.target.value)}
                    className="flex-1 p-2 bg-gray-800 rounded"
                  />
                  <button type="button" onClick={verifyProblem}>
                    Search
                  </button>
                </div>

                {problemResult && problemResult !== "NOT_FOUND" && (
                  <div className="mt-3 flex justify-between bg-green-900 p-2 rounded">
                    <span>{problemResult.title}</span>
                    <button type="button" onClick={addProblem}>
                      <Plus size={16} />
                    </button>
                  </div>
                )}

                <div className="flex flex-wrap gap-2 mt-3">
                  {formData.problems.map((p) => (
                    <span
                      key={p.id}
                      className="bg-purple-800 px-3 py-1 rounded flex gap-1"
                    >
                      {p.title}
                      <X size={14} onClick={() => removeProblem(p.id)} />
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Submit */}
          <div className="mt-8">
            <button className="w-full p-4 bg-green-600 rounded font-semibold text-lg">
              Create Contest
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default CreateContestPage;
