import React from 'react';
import { SecurityAnalysis } from '../../types/audit';
import { AlertTriangle, Shield, CheckCircle, XCircle } from 'lucide-react';

interface SecurityCardProps {
  security: SecurityAnalysis;
  darkMode: boolean;
}

export const SecurityCard: React.FC<SecurityCardProps> = ({
  security,
  darkMode
}) => {
  const getRiskColor = (level: string) => {
    switch (level) {
      case 'LOW': return 'text-green-500';
      case 'MEDIUM': return 'text-yellow-500';
      case 'HIGH': return 'text-orange-500';
      case 'CRITICAL': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getRiskBg = (level: string) => {
    switch (level) {
      case 'LOW': return 'bg-green-500/20';
      case 'MEDIUM': return 'bg-yellow-500/20';
      case 'HIGH': return 'bg-orange-500/20';
      case 'CRITICAL': return 'bg-red-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      darkMode
        ? 'bg-gray-800/70 border-gray-700 backdrop-blur-sm'
        : 'bg-white/80 border-gray-200 backdrop-blur-sm'
    }`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-3 rounded-xl ${
          darkMode ? 'bg-red-500/20' : 'bg-red-50'
        }`}>
          <Shield className="h-6 w-6 text-red-500" />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Security Analysis
          </h3>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Contract security and risk assessment
          </p>
        </div>
      </div>
      
      <div className="space-y-6">
        <div className="text-center">
          <div className={`inline-flex items-center space-x-2 px-4 py-2 rounded-full ${getRiskBg(security.riskLevel)}`}>
            <span className={`text-lg font-bold ${getRiskColor(security.riskLevel)}`}>
              Risk Score: {security.riskScore}/100
            </span>
          </div>
          <p className={`mt-2 text-sm ${getRiskColor(security.riskLevel)} font-medium`}>
            {security.riskLevel} RISK
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {security.canBuy ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className={`font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Can Buy
              </span>
            </div>
            <p className={`text-sm ${
              security.canBuy ? 'text-green-500' : 'text-red-500'
            }`}>
              {security.canBuy ? 'Buying allowed' : 'Buying restricted'}
            </p>
          </div>
          
          <div className={`p-4 rounded-xl border ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {security.canSell ? (
                <CheckCircle className="h-5 w-5 text-green-500" />
              ) : (
                <XCircle className="h-5 w-5 text-red-500" />
              )}
              <span className={`font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Can Sell
              </span>
            </div>
            <p className={`text-sm ${
              security.canSell ? 'text-green-500' : 'text-red-500'
            }`}>
              {security.canSell ? 'Selling allowed' : 'Potential honeypot'}
            </p>
          </div>
        </div>
        
        {security.issues.length > 0 && (
          <div>
            <h4 className={`font-semibold mb-3 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Security Issues ({security.issues.length})
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {security.issues.map((issue, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-2 p-3 rounded-lg ${
                    issue.type === 'error' ? 'bg-red-500/10' :
                    issue.type === 'warning' ? 'bg-yellow-500/10' :
                    'bg-blue-500/10'
                  }`}
                >
                  <AlertTriangle className={`h-4 w-4 mt-0.5 ${
                    issue.type === 'error' ? 'text-red-500' :
                    issue.type === 'warning' ? 'text-yellow-500' :
                    'text-blue-500'
                  }`} />
                  <div>
                    <p className={`font-medium text-sm ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      {issue.title}
                    </p>
                    <p className={`text-xs ${
                      darkMode ? 'text-gray-400' : 'text-gray-600'
                    }`}>
                      {issue.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};