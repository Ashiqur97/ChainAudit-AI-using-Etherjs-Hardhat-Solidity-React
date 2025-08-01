import React from 'react';
import { AuditResult } from '../types/audit';
import { TokenInfoCard } from './cards/TokenInfoCard';
import { SecurityCard } from './cards/SecurityCard';
import { LiquidityCard } from './cards/LiquidityCard';
import { OwnerCard } from './cards/OwnerCard';
import { TransactionCard } from './cards/TransactionCard';
import { AIRiskPredictionCard } from './unique/AIRiskPredictionCard';
import { SocialSentimentCard } from './unique/SocialSentimentCard';

interface AuditResultsProps {
  results: AuditResult;
  darkMode: boolean;
}

export const AuditResults: React.FC<AuditResultsProps> = ({
  results,
  darkMode
}) => {
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
    </div>
  );
};