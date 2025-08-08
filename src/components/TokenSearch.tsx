import React, { useState } from 'react';
import { Search, AlertCircle } from 'lucide-react';

interface TokenSearchProps {
  onSearch: (address: string) => void;
  isLoading: boolean;
  darkMode: boolean;
}

export const TokenSearch: React.FC<TokenSearchProps> = ({
  onSearch,
  isLoading,
  darkMode
}) => {
  const [address, setAddress] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (!address.trim()) {
      setError('Please enter a token contract address');
      return;
    }
    
    if (!address.match(/^0x[a-fA-F0-9]{40}$/)) {
      setError('Please enter a valid Ethereum address');
      return;
    }
    
    onSearch(address.trim());
  };

  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      darkMode
        ? 'bg-gray-800/50 border-gray-700 backdrop-blur-sm'
        : 'bg-white/70 border-gray-200 backdrop-blur-sm'
    }`}>
      <div className="text-center mb-6">
        <h2 className={`text-2xl font-bold mb-2 ${
          darkMode ? 'text-white' : 'text-gray-900'
        }`}>
          Audit Token Contract
        </h2>
        <p className={`${
          darkMode ? 'text-gray-400' : 'text-gray-600'
        }`}>
          Enter a token contract address to perform comprehensive security analysis
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
            <Search className={`h-5 w-5 ${
              darkMode ? 'text-gray-400' : 'text-gray-500'
            }`} />
          </div>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="0x... (Token Contract Address)"
            className={`w-full pl-12 pr-4 py-4 rounded-xl border-2 font-mono text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20 ${
              darkMode
                ? 'bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-400'
                : 'bg-white border-gray-300 text-gray-900 placeholder-gray-500 focus:border-blue-500'
            }`}
            disabled={isLoading}
          />
        </div>
        
        {error && (
          <div className="flex items-center space-x-2 text-red-500 text-sm">
            <AlertCircle className="h-4 w-4" />
            <span>{error}</span>
          </div>
        )}
        
        <button
          type="submit"
          disabled={isLoading || !address.trim()}
          className={`w-full py-4 px-6 rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed ${
            darkMode
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white'
              : 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
          }`}
        >
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              <span>Analyzing Contract...</span>
            </div>
          ) : (
            'Start Audit Analysis'
          )}
        </button>
      </form>
      
      <div className={`mt-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm ${
        darkMode ? 'text-gray-400' : 'text-gray-600'
      }`}>
        <div>✓ Security Analysis</div>
        <div>✓ Liquidity Check</div>
        <div>✓ Owner Analysis</div>
        <div>✓ Scam Detection</div>
      </div>
    </div>
  );
};