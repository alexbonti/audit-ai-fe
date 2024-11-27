import React from 'react';

interface DocumentContentProps {
  content: string;
}

export const DocumentContent: React.FC<DocumentContentProps> = ({ content }) => {
  return (
    <div className="w-1/2 p-6 border-r overflow-auto">
      <h2 className="text-xl font-bold mb-4">Original Document</h2>
      <div className="whitespace-pre-wrap bg-white rounded-lg p-4 shadow">
        {content}
      </div>
    </div>
  );
};