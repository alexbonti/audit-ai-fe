import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FileText, ChevronDown } from 'lucide-react';
import { Document } from '../../types';
import { format } from 'date-fns';
import Markdown from 'react-markdown';

interface DocumentListProps {
  documents: Document[];
}

export const DocumentList: React.FC<DocumentListProps> = ({ documents }) => {
  console.log(documents)
  const navigate = useNavigate();
  const [openAnalysis, setOpenAnalysis] = React.useState<string | null>(null);
  const [openText, setOpenText] = React.useState<string | null>(null);

  const toggleAnalysis = (e: React.MouseEvent, docId: string) => {
    e.stopPropagation();
    setOpenAnalysis(openAnalysis === docId ? null : docId);
  };

  const toggleText = (e: React.MouseEvent, docId: string) => {
    e.stopPropagation();
    setOpenText(openText === docId ? null : docId);
  };

  return (
    <div className="space-y-3">
      {documents.map((doc) => (
        <div 
          key={doc.id} 
          className="bg-[#f4f4f4] border border-[#e0e0e0] rounded-none hover:border-[#0f62fe] transition-colors duration-200"
        >
          <div className="p-4">
            {/* Document Header */}
            <div 
              className="cursor-pointer"
              onClick={() => navigate(`/documents/${doc.id}`)}
            >
              <div className="flex items-center mb-4">
                <FileText className="h-5 w-5 text-[#4589ff] mr-3" />
                <div>
                  <p className="font-normal text-[#161616] text-sm">{doc.name}</p>
                  <p className="text-xs text-[#525252] mt-1">
                    Uploaded on {format(new Date(doc.uploadDate), 'MMM dd, yyyy')}
                  </p>
                </div>
              </div>
            </div>

            {/* Text Section */}
            <div className="mb-3">
              <button
                onClick={(e) => toggleText(e, doc.id)}
                className="w-full flex items-center justify-between py-2 text-sm text-[#161616] hover:bg-[#e8e8e8] transition-colors duration-150"
              >
                <span className="font-medium">Document Text</span>
                <ChevronDown 
                  className={`h-4 w-4 text-[#161616] transition-transform duration-200 ${
                    openText === doc.id ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {/* Text Content */}
              <div className={`
                overflow-hidden transition-all duration-200 ease-in-out
                ${openText === doc.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <div className="bg-white border border-[#e0e0e0] p-4 mt-2">
                  <div className="text-sm text-[#161616] prose prose-sm max-w-none">
                    <Markdown 
                      components={{
                        p: ({children}) => <p className="text-[#161616] leading-5">{children}</p>,
                        h1: ({children}) => <h1 className="text-[#161616] text-xl font-light mt-4 mb-2">{children}</h1>,
                        h2: ({children}) => <h2 className="text-[#161616] text-lg font-light mt-4 mb-2">{children}</h2>,
                        ul: ({children}) => <ul className="list-disc pl-4 my-2">{children}</ul>,
                        li: ({children}) => <li className="text-[#161616] my-1">{children}</li>,
                      }}
                    >
                      {doc.analysis.text}
                    </Markdown>
                  </div>
                </div>
              </div>
            </div>

            {/* Analysis Section */}
            <div>
              <button
                onClick={(e) => toggleAnalysis(e, doc.id)}
                className="w-full flex items-center justify-between py-2 text-sm text-[#161616] hover:bg-[#e8e8e8] transition-colors duration-150"
              >
                <span className="font-medium">Analysis</span>
                <ChevronDown 
                  className={`h-4 w-4 text-[#161616] transition-transform duration-200 ${
                    openAnalysis === doc.id ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              
              {/* Analysis Content */}
              <div className={`
                overflow-hidden transition-all duration-200 ease-in-out
                ${openAnalysis === doc.id ? 'max-h-[1000px] opacity-100' : 'max-h-0 opacity-0'}
              `}>
                <div className="bg-white border border-[#e0e0e0] p-4 mt-2">
                  <div className="text-sm text-[#161616] prose prose-sm max-w-none">
                    <Markdown 
                      components={{
                        p: ({children}) => <p className="text-[#161616] leading-5">{children}</p>,
                        h1: ({children}) => <h1 className="text-[#161616] text-xl font-light mt-4 mb-2">{children}</h1>,
                        h2: ({children}) => <h2 className="text-[#161616] text-lg font-light mt-4 mb-2">{children}</h2>,
                        ul: ({children}) => <ul className="list-disc pl-4 my-2">{children}</ul>,
                        li: ({children}) => <li className="text-[#161616] my-1">{children}</li>,
                      }}
                    >
                      {doc.analysis.analysis}
                    </Markdown>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DocumentList;