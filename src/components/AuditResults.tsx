import React, { useState, useEffect } from 'react';
import { AuditResult } from '../types/audit';
import { TokenInfoCard } from './cards/TokenInfoCard';
import { SecurityCard } from './cards/SecurityCard';
import { LiquidityCard } from './cards/LiquidityCard';
import { OwnerCard } from './cards/OwnerCard';
import { TransactionCard } from './cards/TransactionCard';
import { HardhatTransactionCard } from './cards/HardhatTransactionCard';
import { AIRiskPredictionCard } from './unique/AIRiskPredictionCard';
import { SocialSentimentCard } from './unique/SocialSentimentCard';
import hardhatService, { HardhatTransaction } from '../services/hardhatService';
import { ArrowRight } from 'lucide-react';

interface AuditResultsProps {
  results: AuditResult;
  darkMode: boolean;
}



export const AuditResults: React.FC<AuditResultsProps> = ({
  results,
  darkMode
}) => {
  const [showHardhatTx, setShowHardhatTx] = useState(true);
  const [hardhatTransaction, setHardhatTransaction] = useState<HardhatTransaction | null>(null);
  const [hardhatTransactions, setHardhatTransactions] = useState<HardhatTransaction[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [viewMode, setViewMode] = useState<'single' | 'multiple'>('single');
  
  useEffect(() => {
    // Get the demo transaction from hardhat service
    const txData = hardhatService.getDemoTransaction();
    setHardhatTransaction(txData);
    
    // Add the demo transaction to the transactions list
    setHardhatTransactions([txData]);
  }, []);
  
  const toggleHardhatTx = () => {
    setShowHardhatTx(!showHardhatTx);
  };
  
  const toggleViewMode = () => {
    setViewMode(viewMode === 'single' ? 'multiple' : 'single');
  };
  
  const fetchLatestTransactions = async () => {
    setIsLoading(true);
    try {
      // Get latest transactions from hardhat service
      const transactions = await hardhatService.getLatestTransactions(5);
      setHardhatTransactions(transactions);
    } catch (error) {
      console.error('Error fetching transactions:', error);
    } finally {
      setIsLoading(false);
    }
  };
  return (
    <div className="space-y-6" id="audit-results">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TokenInfoCard tokenInfo={results.tokenInfo} darkMode={darkMode} />
        <SecurityCard security={results.security} darkMode={darkMode} />
      </div>
      
      {/* Unique Features Row */}
      {(results.aiPrediction || results.socialSentiment) && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {results.aiPrediction && (
            <AIRiskPredictionCard 
              prediction={results.aiPrediction} 
              darkMode={darkMode} 
            />
          )}
          {results.socialSentiment && (
            <SocialSentimentCard 
              sentimentData={results.socialSentiment} 
              darkMode={darkMode} 
            />
          )}
        </div>
      )}
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LiquidityCard liquidity={results.liquidity} darkMode={darkMode} />
        <OwnerCard owner={results.owner} darkMode={darkMode} />
      </div>
      
      <TransactionCard transactions={results.transactions} darkMode={darkMode} />
      
      {/* Hardhat Transaction Controls */}
      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-2">
          {showHardhatTx && (
            <>
              <button
                onClick={toggleViewMode}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  darkMode 
                    ? 'bg-gray-700 hover:bg-gray-600 text-white' 
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-800'
                }`}
              >
                View {viewMode === 'single' ? 'Multiple' : 'Single'} Transaction
              </button>
              
              {viewMode === 'multiple' && (
                <button
                  onClick={fetchLatestTransactions}
                  disabled={isLoading}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    darkMode 
                      ? 'bg-green-600 hover:bg-green-700 text-white disabled:bg-gray-700' 
                      : 'bg-green-500 hover:bg-green-600 text-white disabled:bg-gray-300'
                  }`}
                >
                  {isLoading ? 'Loading...' : 'Refresh Transactions'}
                </button>
              )}
            </>
          )}
        </div>
        
        <button
          onClick={toggleHardhatTx}
          className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
            darkMode 
              ? 'bg-blue-600 hover:bg-blue-700 text-white' 
              : 'bg-blue-500 hover:bg-blue-600 text-white'
          }`}
        >
          {showHardhatTx ? 'Hide' : 'Show'} Hardhat Transactions
        </button>
      </div>
      
      {/* Hardhat Transaction Cards */}
      {showHardhatTx && (
        <div className="space-y-6">
          {viewMode === 'single' && hardhatTransaction && (
            <HardhatTransactionCard 
              transaction={hardhatTransaction} 
              darkMode={darkMode} 
            />
          )}
          
          {viewMode === 'multiple' && (
            <div className="space-y-4">
              <h3 className={`text-xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Recent Hardhat Transactions
              </h3>
              
              {hardhatTransactions.length === 0 ? (
                <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  No transactions found. Click "Refresh Transactions" to load the latest transactions.
                </p>
              ) : (
                <div className="space-y-4">
                  {hardhatTransactions.map((tx, index) => (
                    <div 
                      key={tx.hash} 
                      className={`p-4 rounded-xl border ${darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <span className={`text-sm font-medium ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                          Transaction #{index + 1}
                        </span>
                        <span className={`text-xs font-mono ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                          {tx.hash.substring(0, 10)}...{tx.hash.substring(tx.hash.length - 8)}
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <div className="flex-1">
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>From</p>
                          <p className={`text-xs font-mono truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {tx.from}
                          </p>
                        </div>
                        <ArrowRight className={`h-4 w-4 ${darkMode ? 'text-gray-500' : 'text-gray-400'}`} />
                        <div className="flex-1">
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>To</p>
                          <p className={`text-xs font-mono truncate ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {tx.to}
                          </p>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-3 gap-2">
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Value</p>
                          <p className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {tx.value}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gas Used</p>
                          <p className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {tx.gasUsed}
                          </p>
                        </div>
                        <div>
                          <p className={`text-xs ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Gas Limit</p>
                          <p className={`text-xs font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                            {tx.gasLimit}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};