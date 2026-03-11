import React from "react";

const WeeklyProgress = ({ tasksTotal = 80, tasksCompleted = 56 }) => {
  const progressPercentage = Math.round((tasksCompleted / tasksTotal) * 100);

  return (
    <div className="mt-8 bg-slate-800 rounded-2xl p-6 shadow-lg">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Weekly Progress ({tasksTotal} Tasks)
        </h3>
        <span className="text-sm text-slate-400">
          {progressPercentage}% Complete ({tasksCompleted}/{tasksTotal})
        </span>
      </div>

      <div className="w-full bg-slate-700 rounded-full h-3 mt-3">
        <div
          className="bg-blue-500 h-3 rounded-full transition-all duration-300"
          style={{ width: `${progressPercentage}%` }}
        ></div>
      </div>
    </div>
  );
};

export default WeeklyProgress;
