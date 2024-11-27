import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDocuments } from '../store/DocumentContext';
import { DocumentContent } from '../components/Documents/DocumentContent';
import { DocumentAnalysisView } from '../components/Documents/DocumentAnalysisView';
import { ArrowLeft } from 'lucide-react';

export const DocumentDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { getDocument } = useDocuments();
  const [content, setContent] = useState<string>('');
  
  const document = id ? getDocument(id) : undefined;

  useEffect(() => {
    if (document?.content) {
      // Fetch the content from the blob URL
      fetch(document.content)
        .then(response => response.text())
        .then(text => setContent(text))
        .catch(console.error);
    }
  }, [document]);

  if (!document) {
    return (
      <div className="p-6">
        <div className="text-center">
          <h2 className="text-xl font-bold mb-4">Document not found</h2>
          <button
            onClick={() => navigate('/documents')}
            className="text-blue-500 hover:text-blue-700"
          >
            Return to documents
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col">
      <div className="p-4 border-b bg-white">
        <button
          onClick={() => navigate('/documents')}
          className="flex items-center text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-5 w-5 mr-2" />
          Back to Documents
        </button>
      </div>
      <div className="flex flex-1 overflow-hidden">
        <DocumentContent content={content} />
        {document.analysis && <DocumentAnalysisView analysis={document.analysis} />}
      </div>
    </div>
  );
};