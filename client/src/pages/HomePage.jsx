import React, { useState } from "react";
import Navbar from "../components/Navbar/Navbar";
import Sidebar from "../components/Sidebar";
import Dashboard from "./DashboardPage";

function HomePage() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="relative w-full bg-slate-900 min-h-screen overflow-x-hidden">
      <Navbar />

      <Sidebar expanded={expanded} setExpanded={setExpanded} />

      <main
        className={`pt-16 pr-8 transition-all duration-300 ${
          expanded ? "ml-80" : "ml-40"
        }`}
      >
        <Dashboard />
      </main>
    </div>
  );
}

export default HomePage;