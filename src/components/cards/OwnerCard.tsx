import React from 'react';
import { OwnerAnalysis } from '../../types/audit';
import { User, Shield, AlertTriangle, CheckCircle } from 'lucide-react';

interface OwnerCardProps {
  owner: OwnerAnalysis;
  darkMode: boolean;
}

export const OwnerCard: React.FC<OwnerCardProps> = ({
  owner,
  darkMode
}) => {
  const getReputationColor = (reputation: string) => {
    switch (reputation) {
      case 'good': return 'text-green-500';
      case 'neutral': return 'text-yellow-500';
      case 'bad': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getReputationBg = (reputation: string) => {
    switch (reputation) {
      case 'good': return 'bg-green-500/20';
      case 'neutral': return 'bg-yellow-500/20';
      case 'bad': return 'bg-red-500/20';
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
          darkMode ? 'bg-purple-500/20' : 'bg-purple-50'
        }`}>
          <User className="h-6 w-6 text-purple-500" />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Owner Analysis
          </h3>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Contract ownership and reputation
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div>
          <label className={`text-sm font-medium ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Owner Address
          </label>
          <p className={`font-mono text-sm mt-1 ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {owner.ownerAddress}
          </p>
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-3 rounded-lg border ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-1">
              {owner.ownershipRenounced ? (
                <CheckCircle className="h-4 w-4 text-green-500" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              )}
              <span className={`text-sm font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Ownership
              </span>
            </div>
            <p className={`text-xs ${
              owner.ownershipRenounced ? 'text-green-500' : 'text-yellow-500'
            }`}>
              {owner.ownershipRenounced ? 'Renounced' : 'Active'}
            </p>
          </div>
          
          <div className={`p-3 rounded-lg border ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-1">
              {owner.multiSig ? (
                <Shield className="h-4 w-4 text-green-500" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-yellow-500" />
              )}
              <span className={`text-sm font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                MultiSig
              </span>
            </div>
            <p className={`text-xs ${
              owner.multiSig ? 'text-green-500' : 'text-yellow-500'
            }`}>
              {owner.multiSig ? 'Protected' : 'Single owner'}
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <div className={`inline-flex items-center space-x-2 px-3 py-2 rounded-full ${getReputationBg(owner.reputation)}`}>
            <span className={`text-sm font-medium ${getReputationColor(owner.reputation)}`}>
              Reputation: {owner.reputation.toUpperCase()}
            </span>
          </div>
          <p className={`mt-2 text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            {owner.previousProjects} previous projects
          </p>
        </div>
      </div>
    </div>
  );
};