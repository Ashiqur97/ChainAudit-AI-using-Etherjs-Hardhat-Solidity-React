import React from 'react';
import { TransactionData } from '../../types/audit';
import { Activity, Users, TrendingUp } from 'lucide-react';

interface TransactionCardProps {
  transactions: TransactionData;
  darkMode: boolean;
}

export const TransactionCard: React.FC<TransactionCardProps> = ({
  transactions,
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
          darkMode ? 'bg-green-500/20' : 'bg-green-50'
        }`}>
          <Activity className="h-6 w-6 text-green-500" />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Transaction Analysis
          </h3>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Trading activity and holder statistics
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className={`p-4 rounded-xl border text-center ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <Activity className={`h-8 w-8 mx-auto mb-2 ${
            darkMode ? 'text-blue-400' : 'text-blue-500'
          }`} />
          <p className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {transactions.totalTransactions.toLocaleString()}
          </p>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Total Transactions
          </p>
        </div>
        
        <div className={`p-4 rounded-xl border text-center ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <Users className={`h-8 w-8 mx-auto mb-2 ${
            darkMode ? 'text-purple-400' : 'text-purple-500'
          }`} />
          <p className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            {transactions.uniqueHolders.toLocaleString()}
          </p>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Unique Holders
          </p>
        </div>
        
        <div className={`p-4 rounded-xl border text-center ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <TrendingUp className={`h-8 w-8 mx-auto mb-2 ${
            darkMode ? 'text-green-400' : 'text-green-500'
          }`} />
          <p className={`text-2xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            ${Number(transactions.avgTransactionSize).toLocaleString()}
          </p>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Avg Transaction
          </p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h4 className={`font-semibold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Large Transactions
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {transactions.largeTransactions.map((tx, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-white/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${
                    tx.type === 'buy' ? 'text-green-500' : 
                    tx.type === 'sell' ? 'text-red-500' : 'text-blue-500'
                  }`}>
                    {tx.type.toUpperCase()}
                  </span>
                  <span className={`text-sm font-bold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${Number(tx.value).toLocaleString()}
                  </span>
                </div>
                <p className={`text-xs font-mono ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {tx.hash.substring(0, 20)}...
                </p>
              </div>
            ))}
          </div>
        </div>
        
        <div>
          <h4 className={`font-semibold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Recent Activity
          </h4>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {transactions.recentActivity.map((tx, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border ${
                  darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-white/50'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className={`text-sm font-medium ${
                    tx.type === 'buy' ? 'text-green-500' : 
                    tx.type === 'sell' ? 'text-red-500' : 'text-blue-500'
                  }`}>
                    {tx.type.toUpperCase()}
                  </span>
                  <span className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {new Date(tx.timestamp * 1000).toLocaleTimeString()}
                  </span>
                </div>
                <p className={`text-xs font-mono ${
                  darkMode ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {tx.hash.substring(0, 20)}...
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};