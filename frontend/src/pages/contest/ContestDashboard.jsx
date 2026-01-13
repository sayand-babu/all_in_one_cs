import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import ContestRow from "../../components/contest/ContestRows";

/* =========================
   STATIC DATA
========================= */

const ALL_CONTESTS = [
  {
    id: "contest-001",
    title: "Spring 2026 Weekly Challenge #1",
    description:
      "Weekly coding contest focusing on core data structures and algorithms.",
    startTime: new Date(Date.now() - 30 * 60000).toISOString(), // Started 30 minutes ago
    duration: 180,
    status: "running",
    createdBy: "user-101",
  },
  {
    id: "contest-002",
    title: "Algorithm Mastery Sprint",
    description: "Fast-paced algorithm contest.",
    startTime: "2026-02-20T20:00",
    duration: 120,
    status: "completed",
    createdBy: "user-101",
  },
  {
    id: "contest-003",
    title: "January DSA Practice Contest",
    description: "DSA fundamentals practice contest.",
    startTime: "2026-01-15T19:30",
    duration: 150,
    status: "completed",
    createdBy: "user-101",
  },
  {
    id: "contest-004",
    title: "Graph Theory Challenge",
    description: "Advanced graph problems.",
    startTime: "2026-02-05T18:00",
    duration: 180,
    status: "completed",
    createdBy: "user-202",
  },
];

/* =========================
   COMPONENT
========================= */

const ContestDetailsPage = () => {
  const { contestId } = useParams();
  const navigate = useNavigate();

  /* =========================
     FIND CURRENT CONTEST
  ========================= */

  const currentContest = ALL_CONTESTS.find(
    (contest) => contest.id === contestId
  );

  if (!currentContest) {
    return (
      <div className="p-6 text-white">
        Contest not found
      </div>
    );
  }

  /* =========================
     TIME LOGIC
  ========================= */

  const now = new Date();
  const startTime = new Date(currentContest.startTime);
  const endTime = new Date(startTime);
  endTime.setMinutes(endTime.getMinutes() + currentContest.duration);

  const canAttempt = now >= startTime && now < endTime;

  const formatDateTime = (iso) => new Date(iso).toLocaleString();

  /* =========================
     PAST CONTESTS BY SAME ORGANIZER
  ========================= */

  const pastContests = ALL_CONTESTS.filter(
    (contest) =>
      contest.createdBy === currentContest.createdBy &&
      contest.id !== currentContest.id
  );

  /* =========================
     UI
  ========================= */

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate("/contests")}
          className="flex items-center gap-2 text-gray-400 hover:text-white mb-6"
        >
          <ArrowLeft size={18} />
          Back to Contests
        </button>

        {/* ================= Contest Info ================= */}
        <div className="border border-gray-700 rounded-lg p-6 mb-8">
          <h1 className="text-3xl font-bold mb-2">
            {currentContest.title}
          </h1>

          <p className="text-gray-400 mb-4">
            {currentContest.description}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-gray-500">Contest ID</p>
              <p className="font-mono">{currentContest.id}</p>
            </div>

            <div>
              <p className="text-gray-500">Start Time</p>
              <p>{formatDateTime(currentContest.startTime)}</p>
            </div>

            <div>
              <p className="text-gray-500">Duration</p>
              <p>{currentContest.duration} minutes</p>
            </div>

            <div>
              <p className="text-gray-500">Status</p>
              <span
                className={`px-2 py-1 rounded text-xs font-semibold ${
                  canAttempt
                    ? "bg-green-600"
                    : currentContest.status === "completed"
                    ? "bg-gray-600"
                    : "bg-blue-600"
                }`}
              >
                {canAttempt ? "Running" : currentContest.status}
              </span>
            </div>
          </div>

          {/* Attempt Button */}
          <div className="mt-6">
            <button
              disabled={!canAttempt}
              onClick={() =>
                navigate(`/contest/${currentContest.id}/attempt`)
              }
              className={`px-6 py-3 rounded font-semibold transition ${
                canAttempt
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-gray-700 text-gray-400 cursor-not-allowed"
              }`}
            >
              {canAttempt
                ? "Attempt Contest"
                : `Started On ${formatDateTime(currentContest.startTime)}`}
            </button>
          </div>
        </div>

        {/* ================= Past Contests ================= */}
        {pastContests.length > 0 && (
          <div className="border border-gray-700 rounded-lg">
            <div className="px-4 py-3 border-b text-lg font-semibold">
              Past Contests by Same Organizer
            </div>

            {/* Header */}
            <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs font-semibold text-gray-500 border-b">
              <div className="col-span-2">ID</div>
              <div className="col-span-4">Title</div>
              <div className="col-span-3">Start Time</div>
              <div className="col-span-1">Duration</div>
              <div className="col-span-2">Status</div>
            </div>

            {/* Rows */}
            {pastContests.map((contest) => (
              <ContestRow
                key={contest.id}
                contest={contest}
                onClick={() =>
                  navigate(`/contest/${contest.id}`)
                }
              />
            ))}
          </div>
        )}

      </div>
    </div>
  );
};

export default ContestDetailsPage;
