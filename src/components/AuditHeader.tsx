import React from 'react';
import { Shield, Moon, Sun, Download } from 'lucide-react';

interface AuditHeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onExportReport: () => void;
  isLoading: boolean;
}

export const AuditHeader: React.FC<AuditHeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onExportReport,
  isLoading
}) => {
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
      darkMode 
        ? 'bg-gray-900/80 border-gray-700' 
        : 'bg-white/80 border-gray-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${
              darkMode ? 'bg-blue-500/20' : 'bg-blue-50'
            }`}>
              <Shield className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                CryptoAudit Pro
              </h1>
              <p className={`text-sm ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Professional Token Analysis Tool
              </p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onExportReport}
              disabled={isLoading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-xl font-medium transition-all duration-200 ${
                darkMode
                  ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30 disabled:opacity-50'
                  : 'bg-green-50 text-green-600 hover:bg-green-100 disabled:opacity-50'
              }`}
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
            
            <button
              onClick={onToggleDarkMode}
              className={`p-3 rounded-xl transition-all duration-200 ${
                darkMode
                  ? 'bg-gray-800 text-yellow-400 hover:bg-gray-700'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {darkMode ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};