import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Search } from "lucide-react";
import ContestRow from "../../components/contest/ContestRows";

/* =========================
   STATIC CONTEST DATA
========================= */

const MOCK_CONTESTS = [
  {
    id: "contest-001",
    title: "Spring 2026 Weekly Challenge #1",
    status: "scheduled",
    startTime: "2026-03-10T18:00",
    duration: 180,
  },
  {
    id: "contest-002",
    title: "Algorithm Mastery Sprint",
    status: "completed",
    startTime: "2026-02-20T20:00",
    duration: 120,
  },
  {
    id: "contest-003",
    title: "DSA Bootcamp Contest",
    status: "completed",
    startTime: "2026-01-15T19:30",
    duration: 150,
  },
];

/* =========================
   COMPONENT
========================= */

const ContestsListPage = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");

  const filteredContests = MOCK_CONTESTS.filter((contest) => {
    const q = searchTerm.toLowerCase();

    const matchesSearch =
      contest.id.toLowerCase().includes(q) ||
      contest.title.toLowerCase().includes(q);

    const matchesStatus =
      statusFilter === "all" || contest.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto">

      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Contests</h1>
        <button
          onClick={() => navigate("/contest/create")}
          className="flex items-center gap-2 px-3 py-2 border rounded"
        >
          <Plus size={16} />
          Create
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-3 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 w-4 h-4 opacity-60" />
          <input
            type="text"
            placeholder="Search by Contest ID or Title"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-9 pr-3 py-2 border rounded text-sm"
          />
        </div>

        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="px-3 py-2 border rounded text-sm"
        >
          <option value="all">All</option>
          <option value="scheduled">Scheduled</option>
          <option value="completed">Completed</option>
        </select>
      </div>

      {/* Table Header */}
      <div className="grid grid-cols-12 gap-2 px-3 py-2 text-xs font-semibold text-gray-500 border-b">
        <div className="col-span-2">ID</div>
        <div className="col-span-4">Title</div>
        <div className="col-span-3">Start Time</div>
        <div className="col-span-1">Duration</div>
        <div className="col-span-2">Status</div>
      </div>

      {/* Contest Rows */}
      {filteredContests.length === 0 ? (
        <p className="text-sm text-gray-500 mt-4">No contests found</p>
      ) : (
        filteredContests.map((contest) => (
          <ContestRow
            key={contest.id}
            contest={contest}
            onClick={() => navigate(`/contest/${contest.id}`)}
          />
        ))
      )}
    </div>
  );
};

export default ContestsListPage;
