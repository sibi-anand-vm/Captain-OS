import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  CheckSquare,
  Code2,
  Folder,
  BarChart3,
  Users,
  Settings,
} from "lucide-react";

function Sidebar({ expanded, setExpanded }) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/home", icon: <LayoutDashboard size={20} /> },
    { name: "Tasks", path: "/tasks", icon: <CheckSquare size={20} /> },
    { name: "DSA Tracker", path: "/dsa", icon: <Code2 size={20} /> },
  ];

  return (
    <div
      onMouseEnter={() => setExpanded(true)}
      onMouseLeave={() => setExpanded(false)}
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)]
      ${expanded ? "w-64" : "w-20"}
      bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
      border-r border-gray-800
      transition-all duration-300`}
    >
      <div className="mt-10 space-y-3 px-3">
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.name}
              to={item.path}
              className={`flex items-center gap-4 px-3 py-2.5 rounded-lg
              text-sm font-medium transition-all duration-200
              ${
                isActive
                  ? "bg-gray-800 text-cyan-400"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <span>{item.icon}</span>

              {expanded && (
                <span className="whitespace-nowrap">{item.name}</span>
              )}
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;