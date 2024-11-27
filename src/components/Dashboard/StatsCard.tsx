import React from 'react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: React.ReactNode;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-[#f4f4f4] border border-[#e0e0e0] rounded-none hover:border-[#0f62fe] transition-colors duration-200">
      <div className="p-4 flex items-center justify-between">
        <div>
          <p className="text-[#525252] text-sm font-normal">{title}</p>
          <p className="text-[#161616] text-2xl font-light mt-2">
            {value.toLocaleString()}
          </p>
        </div>
        <div className="text-[#4589ff]">{icon}</div>
      </div>
    </div>
  );
};