import React from "react";

const ContestRow = ({ contest, onClick }) => {
  const formatDateTime = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString();
  };

  return (
    <div
      onClick={onClick}
      className="grid grid-cols-12 gap-2 px-3 py-2 text-sm
                 hover:bg-gray-50 cursor-pointer border-b"
    >
      {/* Contest ID */}
      <div className="col-span-2 font-mono truncate">
        {contest.id}
      </div>

      {/* Title */}
      <div className="col-span-4 truncate">
        {contest.title}
      </div>

      {/* Start Time */}
      <div className="col-span-3 text-gray-600">
        {formatDateTime(contest.startTime)}
      </div>

      {/* Duration */}
      <div className="col-span-1 text-gray-600">
        {contest.duration}m
      </div>

      {/* Status */}
      <div className="col-span-2">
        <span
          className={`px-2 py-0.5 rounded text-xs font-semibold ${
            contest.status === "scheduled"
              ? "bg-blue-100 text-blue-700"
              : contest.status === "running"
              ? "bg-yellow-100 text-yellow-700"
              : "bg-green-100 text-green-700"
          }`}
        >
          {contest.status}
        </span>
      </div>
    </div>
  );
};

export default ContestRow;
