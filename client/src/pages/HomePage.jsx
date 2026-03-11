import React, { useState } from 'react'
import Navbar from '../components/Navbar/Navbar'
import Sidebar from '../components/Sidebar'
import Dashboard from './DashboardPage'

function HomePage() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [sidebarHovered, setSidebarHovered] = useState(false);
  const toggleSidebar = () => setSidebarOpen(o => !o);

  return (
    <div className="relative w-full bg-slate-900 min-h-screen">
      <Navbar onBrandClick={toggleSidebar} />

      
      <div 
        onMouseEnter={() => setSidebarHovered(true)}
        onMouseLeave={() => setSidebarHovered(false)}
      >
        <Sidebar isOpen={sidebarOpen} />
      </div>

      <main className={`pt-16 pr-8 transition-all duration-300 ease-in-out ${
        sidebarOpen ? (sidebarHovered ? 'md:ml-64' : 'ml-20 md:ml-20') : ''
      }`}>
        <Dashboard sidebarOpen={sidebarOpen} sidebarHovered={sidebarHovered} />
      </main>
    </div>
  );
}

export default HomePage