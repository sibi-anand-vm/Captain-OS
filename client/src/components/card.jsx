import React from "react";

const DashboardCard = ({ title, value, subtitle, icon, color }) => {
  return (
    <div className="bg-slate-800 rounded-2xl p-5 
                    flex items-center justify-between 
                    shadow-lg hover:shadow-xl 
                    transition-all duration-300">

      <div>
        <p className="text-sm text-slate-400">{title}</p>
        <h2 className="text-2xl font-bold text-white mt-1">{value}</h2>
        <p className="text-xs text-emerald-400 mt-1">{subtitle}</p>
      </div>

      <div className={`p-4 rounded-xl ${color} text-white text-xl`}>
        {icon}
      </div>

    </div>
  );
};

export default DashboardCard;