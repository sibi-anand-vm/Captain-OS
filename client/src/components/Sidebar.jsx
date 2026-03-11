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

function Sidebar({ isOpen = true }) {
  const location = useLocation();

  const menuItems = [
    { name: "Dashboard", path: "/home", icon: <LayoutDashboard size={20} /> },
    { name: "Tasks", path: "/tasks", icon: <CheckSquare size={20} /> },
    { name: "DSA Tracker", path: "/dsa", icon: <Code2 size={20} /> },
    { name: "Projects", path: "/projects", icon: <Folder size={20} /> },
    { name: "Analytics", path: "/analytics", icon: <BarChart3 size={20} /> },
    { name: "Team", path: "/team", icon: <Users size={20} /> },
    { name: "Settings", path: "/settings", icon: <Settings size={20} /> },
  ];

  return (
    <div
      className={`${isOpen ? '' : 'hidden'} group fixed top-16 left-0 h-[calc(100vh-4rem)]
                 w-20 hover:w-64
                 bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900
                 border-r border-gray-800
                 transition-all duration-300 ease-in-out`}
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
              {/* Icon */}
              <span>{item.icon}</span>

              {/* Text (hidden when minimized) */}
              <span className="opacity-0 group-hover:opacity-100 transition-all duration-300 whitespace-nowrap">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

export default Sidebar;