import React, { createContext, useContext, useState, useCallback } from 'react';
import { Document } from '../types';

interface DocumentContextType {
  documents: Document[];
  addDocument: (document: Document) => void;
  getDocument: (id: string) => Document | undefined;
}

const DocumentContext = createContext<DocumentContextType | undefined>(undefined);

export const DocumentProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [documents, setDocuments] = useState<Document[]>([]);

  const addDocument = useCallback((document: Document) => {
    setDocuments(prev => [document, ...prev]);
  }, []);

  const getDocument = useCallback((id: string) => {
    return documents.find(doc => doc.id === id);
  }, [documents]);

  return (
    <DocumentContext.Provider value={{ documents, addDocument, getDocument }}>
      {children}
    </DocumentContext.Provider>
  );
};

export const useDocuments = () => {
  const context = useContext(DocumentContext);
  if (!context) {
    throw new Error('useDocuments must be used within a DocumentProvider');
  }
  return context;
};