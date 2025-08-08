import React from 'react';
import { ArrowRight, FileCode } from 'lucide-react';
import { HardhatTransaction } from '../../services/hardhatService';

interface HardhatTransactionCardProps {
  transaction: HardhatTransaction;
  darkMode: boolean;
}

export const HardhatTransactionCard: React.FC<HardhatTransactionCardProps> = ({
  transaction,
  darkMode
}) => {
  return (
    <div className={`p-6 rounded-2xl border transition-all duration-300 ${
      darkMode
        ? 'bg-gray-800/70 border-gray-700 backdrop-blur-sm'
        : 'bg-white/80 border-gray-200 backdrop-blur-sm'
    }`}>
      <div className="flex items-center space-x-3 mb-6">
        <div className={`p-3 rounded-xl ${
          darkMode ? 'bg-blue-500/20' : 'bg-blue-50'
        }`}>
          <FileCode className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Hardhat Transaction
          </h3>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Local blockchain transaction details
          </p>
        </div>
      </div>
      
      <div className={`p-4 rounded-xl border mb-4 ${
        darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
      }`}>
        <div className="space-y-3">
          <div>
            <p className={`text-sm font-medium ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>Transaction Hash</p>
            <p className={`text-sm font-mono break-all ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>{transaction.hash}</p>
          </div>
          
          <div className="flex items-center space-x-2">
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>From</p>
              <p className={`text-sm font-mono truncate ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>{transaction.from}</p>
            </div>
            <ArrowRight className={`h-4 w-4 ${
              darkMode ? 'text-gray-500' : 'text-gray-400'
            }`} />
            <div className="flex-1">
              <p className={`text-sm font-medium ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>To</p>
              <p className={`text-sm font-mono truncate ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>{transaction.to}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-3 gap-4">
        <div className={`p-4 rounded-xl border text-center ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <p className={`text-lg font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {transaction.value}
          </p>
          <p className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Value (ETH)
          </p>
        </div>
        
        <div className={`p-4 rounded-xl border text-center ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <p className={`text-lg font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {transaction.gasUsed}
          </p>
          <p className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Gas Used
          </p>
        </div>
        
        <div className={`p-4 rounded-xl border text-center ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <p className={`text-lg font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {transaction.gasLimit}
          </p>
          <p className={`text-xs ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Gas Limit
          </p>
        </div>
      </div>
    </div>
  );
};