import React from 'react';
import { DocumentAnalysis } from '../../types';
import { AlertTriangle, CheckCircle, AlertCircle } from 'lucide-react';

interface DocumentAnalysisViewProps {
  analysis: DocumentAnalysis;
}

const getRiskLevelIcon = (riskLevel: string) => {
  switch (riskLevel.toLowerCase()) {
    case 'high':
      return <AlertTriangle className="h-6 w-6 text-red-500" />;
    case 'low':
      return <CheckCircle className="h-6 w-6 text-green-500" />;
    default:
      return <AlertCircle className="h-6 w-6 text-yellow-500" />;
  }
};

export const DocumentAnalysisView: React.FC<DocumentAnalysisViewProps> = ({ analysis }) => {
  return (
    <div className="w-1/2 p-6 overflow-auto">
      <h2 className="text-xl font-bold mb-4">Analysis</h2>
      <div className="bg-white rounded-lg p-6 shadow">
        <div className="mb-6">
          <div className="flex items-center gap-2">
            <h3 className="font-semibold text-lg">Risk Level</h3>
            {getRiskLevelIcon(analysis.risk_level)}
          </div>
          <p className="text-lg mt-2 font-medium">{analysis.risk_level}</p>
        </div>
        
        <div className="mb-6">
          <h3 className="font-semibold text-lg mb-2">Findings</h3>
          <ul className="list-disc pl-5 space-y-2">
            {analysis.findings.map((finding, index) => (
              <li key={index} className="text-gray-700">{finding}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold text-lg mb-2">Recommendations</h3>
          <ul className="list-disc pl-5 space-y-2">
            {analysis.recommendations.map((rec, index) => (
              <li key={index} className="text-gray-700">{rec}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};