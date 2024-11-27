import React from 'react';
import { FileText, AlertTriangle } from 'lucide-react';
import { StatsCard } from '../components/Dashboard/StatsCard';

export const DashboardPage: React.FC = () => {
  // Mock data - replace with actual API calls
  const stats = {
    totalApplications: 156,
    highRiskApplications: 23,
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 pt-6">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StatsCard
          title="Total Applications"
          value={stats.totalApplications}
          icon={<FileText className="h-8 w-8" />}
        />
        <StatsCard
          title="High Risk Applications"
          value={stats.highRiskApplications}
          icon={<AlertTriangle className="h-8 w-8" />}
        />
      </div>
    </div>
  );
};