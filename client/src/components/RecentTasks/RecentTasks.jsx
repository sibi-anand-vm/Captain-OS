import React from "react";

const RecentTasks = ({ tasks }) => {
  // Fallback tasks if none are passed
  const recentTasks = tasks || [];

  return (
    <div className="mt-8 bg-slate-800 rounded-2xl p-6 shadow-lg">
      <h3 className="text-lg font-semibold text-white mb-4">Recent Tasks</h3>

      {/* responsive container: horizontal scroll on small screens */}
      {/* table layout for medium+ screens */}
      <div className="w-full overflow-x-auto hidden sm:block">
        <table className="w-full text-left text-sm text-slate-300">
          <thead>
            <tr>
              <th className="pb-2">Task Name</th>
              <th className="pb-2">Status</th>
              <th className="pb-2">Due Date</th>
              <th className="pb-2">Priority</th>
            </tr>
          </thead>

          <tbody>
            {recentTasks.map((task) => (
              <tr
                key={task.id}
                className="border-t border-slate-700 hover:bg-slate-700"
              >
                <td className="py-2 flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={task.completed}
                    readOnly
                    className="h-4 w-4 text-blue-500"
                  />
                  {task.name}
                </td>

                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${
                        task.status === "In Progress"
                          ? "bg-yellow-600 text-yellow-100"
                          : task.status === "Completed"
                          ? "bg-green-600 text-green-100"
                          : "bg-gray-600 text-gray-100"
                      }`}
                  >
                    {task.status}
                  </span>
                </td>

                <td className="py-2">{task.dueDate}</td>

                <td className="py-2">
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium 
                      ${
                        task.priority === "High"
                          ? "bg-red-600 text-red-100"
                          : task.priority === "Medium"
                          ? "bg-yellow-600 text-yellow-100"
                          : "bg-green-600 text-green-100"
                      }`}
                  >
                    {task.priority}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* card layout for mobile */}
      <div className="sm:hidden">
        {recentTasks.map((task) => (
          <div
            key={task.id}
            className="border-t border-slate-700 py-4 flex flex-col gap-2"
          >
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={task.completed}
                readOnly
                className="h-4 w-4 text-blue-500"
              />
              <span className="font-medium text-white">{task.name}</span>
            </div>
            <div className="flex flex-wrap gap-2 text-xs">
              <span
                className={`px-2 py-1 rounded-full 
                  ${
                    task.status === "In Progress"
                      ? "bg-yellow-600 text-yellow-100"
                      : task.status === "Completed"
                      ? "bg-green-600 text-green-100"
                      : "bg-gray-600 text-gray-100"
                  }`}
              >
                {task.status}
              </span>
              <span className="px-2 py-1 rounded-full bg-slate-700 text-slate-300">
                {task.dueDate}
              </span>
              <span
                className={`px-2 py-1 rounded-full 
                  ${
                    task.priority === "High"
                      ? "bg-red-600 text-red-100"
                      : task.priority === "Medium"
                      ? "bg-yellow-600 text-yellow-100"
                      : "bg-green-600 text-green-100"
                  }`}
              >
                {task.priority}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentTasks;
