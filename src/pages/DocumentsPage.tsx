import React, { useState } from 'react';
import { DocumentList } from '../components/Documents/DocumentList';
import { DocumentUpload } from '../components/Documents/DocumentUpload';
import { analyzeDocument } from '../services/api';
import { useDocuments } from '../store/DocumentContext';
import { AlertCircle } from 'lucide-react';

export const DocumentsPage: React.FC = () => {
  const { documents, addDocument } = useDocuments();
  const [error, setError] = useState<string | null>(null);

  const handleUpload = async (file: File) => {
    try {
      setError(null);
      const analysis = await analyzeDocument(file);
      
      // Create a new document without reading the file content directly
      const newDocument = {
        id: Date.now().toString(),
        name: file.name,
        uploadDate: new Date(),
        content: URL.createObjectURL(file), // Store file as URL instead of content
        analysis,
      };
      
      addDocument(newDocument);
    } catch (error) {
      setError('Failed to analyze document. Please try again.');
      console.error('Error uploading document:', error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6 pt-6">Documents</h1>

      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center gap-2">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-red-700">{error}</p>
        </div>
      )}
      <div className="mb-8">
        <DocumentUpload onUpload={handleUpload} />
      </div>
      <DocumentList documents={documents} />
    </div>
  );
};