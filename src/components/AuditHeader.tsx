import React from 'react';
import { Shield, Moon, Sun, Download, TrendingUp, TrendingDown } from 'lucide-react';

interface AuditHeaderProps {
  darkMode: boolean;
  onToggleDarkMode: () => void;
  onExportReport: () => void;
  isLoading: boolean;
  tokenInfo?: {
    name?: string;
    symbol?: string;
    priceChange?: number;
  };
}

export const AuditHeader: React.FC<AuditHeaderProps> = ({
  darkMode,
  onToggleDarkMode,
  onExportReport,
  isLoading,
  tokenInfo
}) => {
  // Generate a visual representation of ups and downs
  const renderPriceChart = () => {
    // Sample data points for the chart (in a real app, this would come from props)
    const dataPoints = tokenInfo?.priceChange !== undefined 
      ? Array.from({ length: 10 }, (_, i) => ({
          x: i,
          y: 50 + (tokenInfo.priceChange * 2) + Math.sin(i) * 20 + Math.random() * 10
        }))
      : [
          { x: 0, y: 50 },
          { x: 1, y: 60 },
          { x: 2, y: 45 },
          { x: 3, y: 70 },
          { x: 4, y: 55 },
          { x: 5, y: 80 },
          { x: 6, y: 65 },
          { x: 7, y: 75 },
          { x: 8, y: 60 },
          { x: 9, y: 65 }
        ];
    
    // Normalize data to fit in our chart area
    const minY = Math.min(...dataPoints.map(p => p.y));
    const maxY = Math.max(...dataPoints.map(p => p.y));
    const range = maxY - minY || 1; // Avoid division by zero
    
    // Create SVG path for the line chart
    const pathData = dataPoints.map((point, i) => 
      `${i === 0 ? 'M' : 'L'} ${(i / (dataPoints.length - 1)) * 100} ${100 - ((point.y - minY) / range) * 100}`
    ).join(' ');
    
    // Determine if the trend is up or down
    const isUp = tokenInfo?.priceChange !== undefined 
      ? tokenInfo.priceChange >= 0 
      : dataPoints[dataPoints.length - 1].y >= dataPoints[0].y;
    
    return (
      <div className="flex items-center space-x-2">
        <div className="relative w-16 h-8">
          <svg viewBox="0 0 100 100" className="w-full h-full">
            <path 
              d={pathData} 
              fill="none" 
              stroke={isUp ? (darkMode ? '#22c55e' : '#16a34a') : (darkMode ? '#ef4444' : '#dc2626')} 
              strokeWidth="3" 
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div className="flex flex-col">
          <span className={`text-xs font-medium ${isUp ? (darkMode ? 'text-success-400' : 'text-success-600') : (darkMode ? 'text-danger-400' : 'text-danger-600')}`}>
            {isUp ? <TrendingUp className="inline h-3 w-3 mr-1" /> : <TrendingDown className="inline h-3 w-3 mr-1" />}
            {tokenInfo?.priceChange !== undefined ? Math.abs(tokenInfo.priceChange).toFixed(2) + '%' : '2.5%'}
          </span>
        </div>
      </div>
    );
  };
  
  return (
    <header className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
      darkMode 
        ? 'bg-dark-900/80 border-dark-700' 
        : 'bg-white/80 border-dark-200'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-3">
            <div className={`p-2 rounded-xl ${
              darkMode ? 'bg-primary-500/20' : 'bg-primary-50'
            }`}>
              <Shield className="h-8 w-8 text-primary-500" />
            </div>
            <div>
              <h1 className={`text-xl font-bold ${
                darkMode ? 'text-white' : 'text-dark-900'
              }`}>
                CryptoAudit Pro
              </h1>
              <p className={`text-sm ${
                darkMode ? 'text-dark-400' : 'text-dark-600'
              }`}>
                Professional Token Analysis Tool
              </p>
            </div>
          </div>
          
          {/* Token Info Section */}
          {tokenInfo && tokenInfo.name && tokenInfo.symbol && (
            <div className={`hidden md:flex items-center px-4 py-2 rounded-lg ${darkMode ? 'bg-dark-800' : 'bg-dark-50'}`}>
              <div className="flex flex-col mr-4">
                <span className={`text-sm font-bold ${darkMode ? 'text-white' : 'text-dark-900'}`}>
                  {tokenInfo.name}
                </span>
                <span className={`text-xs ${darkMode ? 'text-dark-400' : 'text-dark-600'}`}>
                  {tokenInfo.symbol}
                </span>
              </div>
              {renderPriceChart()}
            </div>
          )}
          
          <div className="flex items-center space-x-4">
            <button
              onClick={onExportReport}
              disabled={isLoading}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                darkMode
                  ? 'bg-success-500/20 text-success-400 hover:bg-success-500/30 disabled:opacity-50'
                  : 'bg-success-50 text-success-600 hover:bg-success-100 disabled:opacity-50'
              }`}
            >
              <Download className="h-4 w-4" />
              <span>Export Report</span>
            </button>
            
            <button
              onClick={onToggleDarkMode}
              className={`p-3 rounded-lg transition-all duration-200 ${
                darkMode
                  ? 'bg-dark-800 text-warning-400 hover:bg-dark-700'
                  : 'bg-dark-100 text-dark-600 hover:bg-dark-200'
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