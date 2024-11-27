import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, FileText } from 'lucide-react';
import { DashboardPage } from './pages/DashboardPage';
import { DocumentsPage } from './pages/DocumentsPage';
import { RegulationsPage } from './pages/RegulationsPage';
import { DocumentDetailPage } from './pages/DocumentDetailPage';
import { DocumentProvider } from './store/DocumentContext';
import { AlertTriangle, Home, Menu, BarChart2, Settings, Users,Scale } from 'lucide-react';

function App() {
  return (
    <DocumentProvider>
      <Router>
        <div className="min-h-screen bg-gray-100 flex">

          <div className="h-12 bg-[#161616] fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4">
            <div className="flex items-center">
              <Menu className="h-5 w-5 text-white mr-4" />
              <span className="text-white text-sm">IBM Audit Helper</span>
            </div>
            <div className="flex items-center gap-4">
              <Settings className="h-5 w-5 text-white cursor-pointer" />
              <div className="w-8 h-8 rounded-full bg-[#393939] flex items-center justify-center cursor-pointer">
                <span className="text-white text-sm">JD</span>
              </div>
            </div>
          </div>

          {/* Sidebar */}

          {/* Left Sidebar */}
          {/* <div className="w-64 bg-[#f4f4f4] fixed left-0 top-12 bottom-0 border-r border-[#e0e0e0]">
            <div className="p-2">
              <div className="space-y-1">
                <div className="flex items-center text-[#161616] px-4 py-2 hover:bg-[#e8e8e8] cursor-pointer">
                  <Link
                    to="/"
                    className="flex items-center text-[#161616] px-4 py-2 hover:bg-[#e8e8e8] transition-colors duration-150"
                  >
                    <Home className="h-4 w-4 mr-3" />
                    <span className="text-sm">Home</span>
                  </Link>
                </div>
                <div className="flex items-center text-[#0f62fe] px-4 py-2 bg-[#e8e8e8] cursor-pointer">
                  <Link
                    to="/documents"
                    className="flex items-center text-[#161616] px-4 py-2 hover:bg-[#e8e8e8] transition-colors duration-150"
                  >
                    <BarChart2 className="h-4 w-4 mr-3" />
                    <span className="text-sm">Documents</span>
                  </Link>


                </div>
                <div className="flex items-center text-[#161616] px-4 py-2 hover:bg-[#e8e8e8] cursor-pointer">
                <Link
                    to="/documents"
                    className="flex items-center text-[#161616] px-4 py-2 hover:bg-[#e8e8e8] transition-colors duration-150"
                  >
                    <Users className="h-4 w-4 mr-3" />
                    <span className="text-sm">Users</span>
                  </Link>
                  
                </div>
              </div>
            </div>
          </div> */}


          <nav className="w-64 g-[#f4f4f4] border-r border-[#e0e0e0] shadow-md">
            <div className="p-4">
              <h1 className="text-xl font-bold text-gray-800">Bank Audit System</h1>
            </div>
            <ul className="mt-4">
              <li>
                <Link
                  to="/"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >

                  <LayoutDashboard className="h-5 w-5 mr-2" />
                  Dashboard
                </Link>
              </li>
              <li>
                <Link
                  to="/documents"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <FileText className="h-5 w-5 mr-2" />
                  Documents
                </Link>
              </li>
              <li>
                <Link
                  to="/regulations"
                  className="flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100"
                >
                  <Scale className="h-5 w-5 mr-2" />
                  Regulations
                </Link>
              </li>
            </ul>
          </nav>

          {/* Main Content */}
          <main className="flex-1">
            <Routes>
              <Route path="/" element={<DashboardPage />} />
              <Route path="/documents" element={<DocumentsPage />} />
              <Route path="/regulations" element={<RegulationsPage />} />
              <Route path="/documents/:id" element={<DocumentDetailPage />} />
            </Routes>
          </main>
        </div>
      </Router>
    </DocumentProvider>
  );
}

export default App;