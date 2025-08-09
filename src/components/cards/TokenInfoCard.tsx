import React from 'react';
import { TokenInfo } from '../../types/audit';
import { Coins, Calendar, Shield, Copy } from 'lucide-react';

interface TokenInfoCardProps {
  tokenInfo: TokenInfo;
  darkMode: boolean;
}

export const TokenInfoCard: React.FC<TokenInfoCardProps> = ({
  tokenInfo,
  darkMode
}) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <div className={`p-6 rounded-xl transition-all duration-300 ${darkMode ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'} shadow-xl`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          <div className={`p-2 rounded-lg ${darkMode ? 'bg-blue-500/10' : 'bg-blue-50'}`}>
            <Coins className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
          </div>
          <h3 className="text-lg font-bold">Token Details</h3>
        </div>
        
        {tokenInfo.verified && (
          <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-green-500/10 text-green-400' : 'bg-green-50 text-green-600'}`}>
            <Shield className="h-3.5 w-3.5" />
            <span>Verified</span>
          </div>
        )}
      </div>
      
      {/* Main Content */}
      <div className="space-y-4">
        {/* Token Identity Card */}
        <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className="p-4">
            {/* Token Identity Header */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Coins className={`h-5 w-5 ${darkMode ? 'text-blue-400' : 'text-blue-500'}`} />
                <span className="font-bold text-lg">Token Identity</span>
              </div>
              
              {/* Status Badge */}
              <div className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium ${darkMode ? 'bg-success-500/20 text-success-400' : 'bg-success-100 text-success-600'}`}>
                <Shield className="h-3.5 w-3.5" />
                <span>Verified</span>
              </div>
            </div>
            
            {/* Token Identity Card */}
            <div className={`rounded-xl p-5 transition-all duration-300 ${darkMode ? 'bg-gradient-to-br from-gray-800 to-gray-900' : 'bg-gradient-to-br from-white to-gray-50'} shadow-lg`}>
              {/* Visual Representation */}
              <div className="flex justify-center mb-5">
                <div className="relative w-24 h-24 rounded-full flex items-center justify-center bg-gradient-to-br from-primary-500 to-secondary-500 shadow-lg">
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary-500/20 to-secondary-500/20 animate-pulse"></div>
                  <Coins className="h-10 w-10 text-white" />
                </div>
              </div>
              
              {/* Token Name and Symbol - Centered Layout */}
              <div className="text-center mb-6">
                <div className="mb-3">
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${darkMode ? 'bg-primary-500/20 text-primary-400' : 'bg-primary-100 text-primary-600'}`}>
                    TOKEN NAME
                  </span>
                  <h2 className={`text-2xl font-bold break-words ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {tokenInfo.name || 'Loading...'}
                  </h2>
                </div>
                
                <div>
                  <span className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-full mb-2 ${darkMode ? 'bg-secondary-500/20 text-secondary-400' : 'bg-secondary-100 text-secondary-600'}`}>
                    SYMBOL
                  </span>
                  <div className={`text-3xl font-bold font-mono ${darkMode ? 'text-secondary-400' : 'text-secondary-600'}`}>
                    {tokenInfo.symbol || '...'}
                  </div>
                </div>
              </div>
              
              {/* Token Address */}
              <div className="mb-5">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-xs font-semibold ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    CONTRACT ADDRESS
                  </span>
                  <button
                    onClick={() => copyToClipboard(tokenInfo.contractAddress)}
                    className={`p-1.5 rounded-lg transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-400' : 'hover:bg-gray-200 text-gray-600'}`}
                    title="Copy to clipboard"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                </div>
                <div className={`p-3 rounded-lg text-sm font-mono break-all ${darkMode ? 'bg-gray-800/50 text-gray-300' : 'bg-gray-100 text-gray-700'}`}>
                  {tokenInfo.contractAddress}
                </div>
              </div>
              
              {/* Token Metrics */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-primary-500/5 to-primary-500/10 dark:from-primary-500/10 dark:to-primary-500/20">
                  <div className={`text-xs uppercase mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Total Supply
                  </div>
                  <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {tokenInfo.totalSupply ? Number(tokenInfo.totalSupply).toLocaleString() : '1,000,000,000'}
                  </div>
                </div>
                <div className="text-center p-3 rounded-lg bg-gradient-to-br from-secondary-500/5 to-secondary-500/10 dark:from-secondary-500/10 dark:to-secondary-500/20">
                  <div className={`text-xs uppercase mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                    Decimals
                  </div>
                  <div className={`font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    {tokenInfo.decimals}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Contract Address Card */}
        <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className={`px-4 py-3 flex items-center justify-between ${darkMode ? 'bg-gray-800/80' : 'bg-gray-100/80'}`}>
            <div className="flex items-center gap-2">
              <Copy className={`h-4 w-4 ${darkMode ? 'text-purple-400' : 'text-purple-500'}`} />
              <span className="font-medium text-sm">Contract Address</span>
            </div>
          </div>
          
          <div className="p-4">
            <div className={`flex items-center justify-between p-2 rounded ${darkMode ? 'bg-gray-900/50' : 'bg-white'}`}>
              <code className="font-mono text-sm truncate">{tokenInfo.contractAddress}</code>
              <button
                onClick={() => copyToClipboard(tokenInfo.contractAddress)}
                className={`p-1.5 rounded transition-colors ${darkMode ? 'hover:bg-gray-700 text-gray-300' : 'hover:bg-gray-100 text-gray-600'}`}
                title="Copy to clipboard"
              >
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        
        {/* Token Metrics Card */}
        <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className={`px-4 py-3 flex items-center justify-between ${darkMode ? 'bg-gray-800/80' : 'bg-gray-100/80'}`}>
            <div className="flex items-center gap-2">
              <Coins className={`h-4 w-4 ${darkMode ? 'text-green-400' : 'text-green-500'}`} />
              <span className="font-medium text-sm">Token Metrics</span>
            </div>
          </div>
          
          <div className="p-4 grid grid-cols-2 gap-4">
            {/* Total Supply */}
            <div>
              <label className={`block text-xs uppercase mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Total Supply</label>
              <span className="text-lg font-medium">
                {tokenInfo.totalSupply ? Number(tokenInfo.totalSupply).toLocaleString() : 'Loading...'}
              </span>
            </div>
            
            {/* Decimals */}
            <div>
              <label className={`block text-xs uppercase mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Decimals</label>
              <span className="text-lg font-medium">{tokenInfo.decimals}</span>
            </div>
          </div>
        </div>
        
        {/* Creation Date Card */}
        <div className={`rounded-lg overflow-hidden ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
          <div className={`px-4 py-3 flex items-center justify-between ${darkMode ? 'bg-gray-800/80' : 'bg-gray-100/80'}`}>
            <div className="flex items-center gap-2">
              <Calendar className={`h-4 w-4 ${darkMode ? 'text-amber-400' : 'text-amber-500'}`} />
              <span className="font-medium text-sm">Creation Information</span>
            </div>
          </div>
          
          <div className="p-4">
            <label className={`block text-xs uppercase mb-1 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}>Creation Date</label>
            <span className="text-lg font-medium">{tokenInfo.creationDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};