import React, { useState, useEffect } from "react";
import { AlertCircle } from "lucide-react";

const Timer = ({ durationMinutes, onTimeUp }) => {
  const [timeRemaining, setTimeRemaining] = useState(
    durationMinutes * 60
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          onTimeUp && onTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [onTimeUp]);

  const hours = Math.floor(timeRemaining / 3600);
  const minutes = Math.floor((timeRemaining % 3600) / 60);
  const seconds = timeRemaining % 60;

  const isLowTime = timeRemaining < 600; // Less than 10 minutes
  const isVeryLowTime = timeRemaining < 60; // Less than 1 minute

  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded font-mono font-bold text-lg ${
        isVeryLowTime
          ? "bg-red-900 text-red-200"
          : isLowTime
          ? "bg-yellow-900 text-yellow-200"
          : "bg-gray-700 text-gray-200"
      }`}
    >
      {isVeryLowTime && <AlertCircle size={20} />}
      <span>
        {String(hours).padStart(2, "0")}:{String(minutes).padStart(2, "0")}:
        {String(seconds).padStart(2, "0")}
      </span>
    </div>
  );
};

export default Timer;
