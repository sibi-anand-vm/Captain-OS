import React, { useState, useEffect } from "react";
import DashboardCard from "../components/card";
import RecentTasks from "../components/RecentTasks/RecentTasks";
import WeeklyProgress from "../components/WeeklyProgress/WeeklyProgress";
import { FaTasks, FaCheckCircle, FaChartLine, FaFire } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import {ToastContainer,toast} from 'react-toastify'

const Dashboard = ({ sidebarOpen = true, sidebarHovered = false }) => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const { auth } = useAuth();

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        let token = auth.token;
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/tasks/dashboard/summary`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
          }
        });

        const data = await res.json();
        if (res.ok) {
          setDashboardStats(data);
        } else {
          toast.error("API Error:", data);
        }
      } catch (err) {
        toast.error("Error fetching dashboard data:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  const dashboardData = [
    {
      title: "Total Tasks",
      value: dashboardStats?.totalTasks || "0",
      subtitle: `${dashboardStats?.weeklyStats?.totalTaskThisWeek || 0} this week`,
      icon: <FaTasks />,
      color: "bg-blue-600"
    },
    {
      title: "Completed",
      value: dashboardStats?.completedTasks || "0",
      subtitle: `${dashboardStats?.weeklyStats?.completedTaskThisWeek || 0} this week`,
      icon: <FaCheckCircle />,
      color: "bg-green-600"
    },
    {
      title: "Completion Rate",
      value: `${dashboardStats?.completionPercentage?.toFixed(1) || "0"}%`,
      subtitle: "On Track",
      icon: <FaChartLine />,
      color: "bg-yellow-500"
    },
    {
      title: "Daily Streak",
      value: `${dashboardStats?.currentStreak || "0"} 🔥`,
      subtitle: "Keep it going!",
      icon: <FaFire />,
      color: "bg-red-500"
    }
  ];

  
  const recentTasks = [
    {
      id: 1,
      name: "Implement user auth flow",
      status: "In Progress",
      dueDate: "Oct 28",
      priority: "High",
      completed: false,
    },
    {
      id: 2,
      name: "Fix UI bugs on Dashboard",
      status: "Completed",
      dueDate: "Oct 27",
      priority: "Medium",
      completed: true,
    },
    {
      id: 3,
      name: "Review PR #104: Design System",
      status: "In Progress",
      dueDate: "Oct 29",
      priority: "High",
      completed: false,
    },
    {
      id: 4,
      name: "Setup CI/CD pipeline",
      status: "To Do",
      dueDate: "Oct 30",
      priority: "Medium",
      completed: false,
    },
    {
      id: 5,
      name: "Update API documentation",
      status: "Completed",
      dueDate: "Oct 31",
      priority: "Low",
      completed: true,
    },
  ];
return (
  <div className="w-full bg-slate-900 min-h-screen pt-8 pb-8">
    <div className={`mx-auto transition-all duration-300 ease-in-out ${
      sidebarOpen ? (sidebarHovered ? 'max-w-6xl pl-8 pr-8' : 'max-w-6xl pl-8 pr-8') : 'max-w-5xl px-8'
    }`}>
      
      <div className="mb-8">
        <h1 className="text-2xl font-semibold text-white">
          Good Evening, Alex 👋
        </h1>
        <p className="text-slate-400 text-sm mt-1">
          Let's finish the day strong. Here's your overview.
        </p>
      </div>

    
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
      {dashboardData.map((item, index) => (
        <DashboardCard
          key={index}
          title={item.title}
          value={item.value}
          subtitle={item.subtitle}
          icon={item.icon}
          color={item.color}
        />
      ))}
    </div>

    
    <WeeklyProgress 
      tasksTotal={dashboardStats?.weeklyStats?.totalTaskThisWeek || 0}
      tasksCompleted={dashboardStats?.weeklyStats?.completedTaskThisWeek || 0}
    />

    <RecentTasks tasks={recentTasks} />
    </div>

  </div>
);
};

export default Dashboard;