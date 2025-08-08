import React from 'react';
import { LiquidityInfo } from '../../types/audit';
import { Droplets, Lock, TrendingUp } from 'lucide-react';

interface LiquidityCardProps {
  liquidity: LiquidityInfo;
  darkMode: boolean;
}

export const LiquidityCard: React.FC<LiquidityCardProps> = ({
  liquidity,
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
          <Droplets className="h-6 w-6 text-blue-500" />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            Liquidity Analysis
          </h3>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Liquidity pools and trading data
          </p>
        </div>
      </div>
      
      <div className="space-y-4">
        <div className={`p-4 rounded-xl border ${
          darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className={`font-medium ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Total Liquidity
            </span>
            <span className={`text-lg font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              ${Number(liquidity.totalLiquidity).toLocaleString()}
            </span>
          </div>
          
          <div className="flex items-center space-x-2">
            {liquidity.liquidityLocked ? (
              <>
                <Lock className="h-4 w-4 text-green-500" />
                <span className="text-sm text-green-500">
                  Locked for {liquidity.lockDuration}
                </span>
              </>
            ) : (
              <>
                <Lock className="h-4 w-4 text-red-500" />
                <span className="text-sm text-red-500">
                  Liquidity not locked
                </span>
              </>
            )}
          </div>
        </div>
        
        <div>
          <h4 className={`font-semibold mb-3 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            DEX Pairs ({liquidity.dexPairs.length})
          </h4>
          <div className="space-y-2">
            {liquidity.dexPairs.map((pair, index) => (
              <div
                key={index}
                className={`p-3 rounded-lg border flex items-center justify-between ${
                  darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-white/50'
                }`}
              >
                <div>
                  <p className={`font-medium ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    {pair.dex}
                  </p>
                  <p className={`text-sm font-mono ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {pair.pair}
                  </p>
                </div>
                <div className="text-right">
                  <p className={`font-semibold ${
                    darkMode ? 'text-white' : 'text-gray-900'
                  }`}>
                    ${Number(pair.liquidity).toLocaleString()}
                  </p>
                  <div className="flex items-center space-x-1 text-sm text-green-500">
                    <TrendingUp className="h-3 w-3" />
                    <span>${Number(pair.volume24h).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};