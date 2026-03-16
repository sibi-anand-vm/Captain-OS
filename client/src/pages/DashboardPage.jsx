import React, { useState, useEffect } from "react";
import DashboardCard from "../components/card";
import RecentTasks from "../components/RecentTasks/RecentTasks";
import WeeklyProgress from "../components/WeeklyProgress/WeeklyProgress";
import { FaTasks, FaCheckCircle, FaChartLine, FaFire } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";
import { ToastContainer, toast } from "react-toastify";

const Dashboard = ({ sidebarOpen = true, sidebarHovered = false }) => {

  const [dashboardStats, setDashboardStats] = useState(null);
  const [recentTasks, setRecentTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  const { auth } = useAuth();

  
  const getGreeting = () => {
    const hour = new Date().getHours();

    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  useEffect(() => {

    const fetchDashboardData = async () => {

      try {

        const token = auth?.token;

        
        const summaryRes = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/tasks/dashboard/summary`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );

        const summaryData = await summaryRes.json();

        if (summaryRes.ok) {
          setDashboardStats(summaryData);
        }

        
        const taskRes = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/tasks`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            }
          }
        );

        const taskData = await taskRes.json();

        if (taskRes.ok) {
          
          setRecentTasks(taskData.slice(0, 5));
        }

      } catch (err) {
        toast.error(err.message || "Error fetching dashboard data");
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

  
  if (loading) {
    return (
      <div className="text-white p-8">
        Loading dashboard...
      </div>
    );
  }

  return (
    <div className="w-full bg-slate-900 min-h-screen pt-8 pb-8">

      <ToastContainer />

      <div
        className={`mx-auto transition-all duration-300 ease-in-out ${
          sidebarOpen
            ? sidebarHovered
              ? "max-w-6xl pl-8 pr-8"
              : "max-w-6xl pl-8 pr-8"
            : "max-w-5xl px-8"
        }`}
      >

        
        <div className="mb-8">
          <h1 className="text-2xl font-semibold text-white">
            {getGreeting()}, {auth?.user?.userName || "User"} 👋
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

      
        <RecentTasks
          tasks={recentTasks.map((task) => ({
            id: task._id,
            name: task.title,
            status: task.completed ? "Completed" : "In Progress",
            dueDate: new Date(task.dueDate).toLocaleDateString(),
            priority: task.priority,
            completed: task.completed
          }))}
        />

      </div>
    </div>
  );
};

export default Dashboard;