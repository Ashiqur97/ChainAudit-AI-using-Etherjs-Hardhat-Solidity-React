import React from 'react';
import { Brain, TrendingUp, TrendingDown, AlertTriangle, CheckCircle } from 'lucide-react';

interface RiskPrediction {
  predictedRiskScore: number;
  confidenceLevel: number;
  riskFactors: string[];
  marketTrend: 'bullish' | 'bearish' | 'neutral';
  recommendation: 'buy' | 'hold' | 'sell' | 'avoid';
  aiAnalysis: string;
}

interface AIRiskPredictionCardProps {
  prediction: RiskPrediction;
  darkMode: boolean;
  isLoading?: boolean;
}

export const AIRiskPredictionCard: React.FC<AIRiskPredictionCardProps> = ({
  prediction,
  darkMode,
  isLoading = false
}) => {
  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case 'buy': return 'text-green-500';
      case 'hold': return 'text-blue-500';
      case 'sell': return 'text-yellow-500';
      case 'avoid': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getRecommendationBg = (recommendation: string) => {
    switch (recommendation) {
      case 'buy': return 'bg-green-500/20';
      case 'hold': return 'bg-blue-500/20';
      case 'sell': return 'bg-yellow-500/20';
      case 'avoid': return 'bg-red-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'bullish': return <TrendingUp className="h-5 w-5 text-green-500" />;
      case 'bearish': return <TrendingDown className="h-5 w-5 text-red-500" />;
      default: return <div className="h-5 w-5 rounded-full bg-gray-400"></div>;
    }
  };

  if (isLoading) {
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
            <Brain className="h-6 w-6 text-purple-500 animate-pulse" />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              AI Risk Prediction
            </h3>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Analyzing market data and patterns...
            </p>
          </div>
        </div>
        <div className="animate-pulse space-y-4">
          <div className={`h-4 rounded ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className={`h-4 rounded w-3/4 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
          <div className={`h-4 rounded w-1/2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}></div>
        </div>
      </div>
    );
  }

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
          <Brain className="h-6 w-6 text-purple-500" />
        </div>
        <div>
          <h3 className={`text-xl font-bold ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            AI Risk Prediction
          </h3>
          <p className={`text-sm ${
            darkMode ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Machine learning analysis and prediction
          </p>
        </div>
        <div className="ml-auto flex items-center space-x-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          <span className={`text-sm font-medium ${
            darkMode ? 'text-green-400' : 'text-green-600'
          }`}>
            AI Powered
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {/* Predicted Risk Score */}
        <div className="text-center">
          <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full ${
            prediction.predictedRiskScore < 25 ? 'bg-green-500/20' :
            prediction.predictedRiskScore < 50 ? 'bg-yellow-500/20' :
            prediction.predictedRiskScore < 75 ? 'bg-orange-500/20' : 'bg-red-500/20'
          }`}>
            <span className={`text-2xl font-bold ${
              prediction.predictedRiskScore < 25 ? 'text-green-500' :
              prediction.predictedRiskScore < 50 ? 'text-yellow-500' :
              prediction.predictedRiskScore < 75 ? 'text-orange-500' : 'text-red-500'
            }`}>
              {prediction.predictedRiskScore}%
            </span>
            <div className="text-left">
              <p className={`text-sm font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Predicted Risk
              </p>
              <p className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                {prediction.confidenceLevel}% confidence
              </p>
            </div>
          </div>
        </div>

        {/* Market Trend & Recommendation */}
        <div className="grid grid-cols-2 gap-4">
          <div className={`p-4 rounded-xl border ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              {getTrendIcon(prediction.marketTrend)}
              <span className={`font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                Market Trend
              </span>
            </div>
            <p className={`text-sm capitalize ${
              prediction.marketTrend === 'bullish' ? 'text-green-500' :
              prediction.marketTrend === 'bearish' ? 'text-red-500' : 'text-gray-500'
            }`}>
              {prediction.marketTrend}
            </p>
          </div>

          <div className={`p-4 rounded-xl border ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <div className="flex items-center space-x-2 mb-2">
              <div className={`w-3 h-3 rounded-full ${getRecommendationBg(prediction.recommendation)}`}></div>
              <span className={`font-medium ${
                darkMode ? 'text-white' : 'text-gray-900'
              }`}>
                AI Recommendation
              </span>
            </div>
            <p className={`text-sm font-bold uppercase ${getRecommendationColor(prediction.recommendation)}`}>
              {prediction.recommendation}
            </p>
          </div>
        </div>

        {/* Risk Factors */}
        <div>
          <h4 className={`font-semibold mb-3 flex items-center space-x-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            <AlertTriangle className="h-4 w-4 text-yellow-500" />
            <span>Key Risk Factors</span>
          </h4>
          <div className="space-y-2">
            {prediction.riskFactors.map((factor, index) => (
              <div
                key={index}
                className={`flex items-center space-x-2 p-2 rounded-lg ${
                  darkMode ? 'bg-gray-800/30' : 'bg-white/50'
                }`}
              >
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className={`text-sm ${
                  darkMode ? 'text-gray-300' : 'text-gray-700'
                }`}>
                  {factor}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* AI Analysis */}
        <div className={`p-4 rounded-xl border-l-4 border-purple-500 ${
          darkMode ? 'bg-purple-500/10' : 'bg-purple-50'
        }`}>
          <h4 className={`font-semibold mb-2 ${
            darkMode ? 'text-white' : 'text-gray-900'
          }`}>
            AI Analysis Summary
          </h4>
          <p className={`text-sm ${
            darkMode ? 'text-gray-300' : 'text-gray-700'
          }`}>
            {prediction.aiAnalysis}
          </p>
        </div>
      </div>
    </div>
  );
};