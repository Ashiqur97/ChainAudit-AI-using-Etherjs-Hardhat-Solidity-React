import React from 'react';
import { MessageCircle, TrendingUp, Users, AlertTriangle, Star } from 'lucide-react';

interface SentimentData {
  overallSentiment: 'positive' | 'negative' | 'neutral';
  sentimentScore: number;
  socialMetrics: {
    twitterMentions: number;
    redditPosts: number;
    telegramMembers: number;
    discordMembers: number;
  };
  influencerMentions: Array<{
    platform: string;
    username: string;
    followers: number;
    sentiment: string;
  }>;
  trendingStatus: boolean;
  riskFlags: string[];
  communityHealth: number;
}

interface SocialSentimentCardProps {
  sentimentData: SentimentData;
  darkMode: boolean;
  isLoading?: boolean;
}

export const SocialSentimentCard: React.FC<SocialSentimentCardProps> = ({
  sentimentData,
  darkMode,
  isLoading = false
}) => {
  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'text-green-500';
      case 'negative': return 'text-red-500';
      default: return 'text-gray-500';
    }
  };

  const getSentimentBg = (sentiment: string) => {
    switch (sentiment) {
      case 'positive': return 'bg-green-500/20';
      case 'negative': return 'bg-red-500/20';
      default: return 'bg-gray-500/20';
    }
  };

  const getHealthColor = (health: number) => {
    if (health >= 70) return 'text-green-500';
    if (health >= 40) return 'text-yellow-500';
    return 'text-red-500';
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
            darkMode ? 'bg-blue-500/20' : 'bg-blue-50'
          }`}>
            <MessageCircle className="h-6 w-6 text-blue-500 animate-pulse" />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Social Sentiment Analysis
            </h3>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Analyzing social media buzz...
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
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className={`p-3 rounded-xl ${
            darkMode ? 'bg-blue-500/20' : 'bg-blue-50'
          }`}>
            <MessageCircle className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className={`text-xl font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Social Sentiment Analysis
            </h3>
            <p className={`text-sm ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Real-time social media monitoring
            </p>
          </div>
        </div>
        
        {sentimentData.trendingStatus && (
          <div className="flex items-center space-x-2 px-3 py-1 rounded-full bg-orange-500/20 text-orange-500">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm font-medium">Trending</span>
          </div>
        )}
      </div>

      <div className="space-y-6">
        {/* Overall Sentiment */}
        <div className="text-center">
          <div className={`inline-flex items-center space-x-3 px-6 py-3 rounded-full ${getSentimentBg(sentimentData.overallSentiment)}`}>
            <span className={`text-2xl font-bold ${getSentimentColor(sentimentData.overallSentiment)}`}>
              {sentimentData.sentimentScore > 0 ? '+' : ''}{sentimentData.sentimentScore}
            </span>
            <div className="text-left">
              <p className={`text-sm font-medium capitalize ${getSentimentColor(sentimentData.overallSentiment)}`}>
                {sentimentData.overallSentiment} Sentiment
              </p>
              <p className={`text-xs ${
                darkMode ? 'text-gray-400' : 'text-gray-600'
              }`}>
                Community Health: {sentimentData.communityHealth}%
              </p>
            </div>
          </div>
        </div>

        {/* Social Metrics */}
        <div className="grid grid-cols-2 gap-3">
          <div className={`p-3 rounded-lg border text-center ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <MessageCircle className={`h-5 w-5 mx-auto mb-1 ${
              darkMode ? 'text-blue-400' : 'text-blue-500'
            }`} />
            <p className={`text-lg font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {sentimentData.socialMetrics.twitterMentions.toLocaleString()}
            </p>
            <p className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Twitter Mentions
            </p>
          </div>

          <div className={`p-3 rounded-lg border text-center ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <Users className={`h-5 w-5 mx-auto mb-1 ${
              darkMode ? 'text-purple-400' : 'text-purple-500'
            }`} />
            <p className={`text-lg font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {sentimentData.socialMetrics.telegramMembers.toLocaleString()}
            </p>
            <p className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Telegram Members
            </p>
          </div>

          <div className={`p-3 rounded-lg border text-center ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <MessageCircle className={`h-5 w-5 mx-auto mb-1 ${
              darkMode ? 'text-orange-400' : 'text-orange-500'
            }`} />
            <p className={`text-lg font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {sentimentData.socialMetrics.redditPosts}
            </p>
            <p className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Reddit Posts
            </p>
          </div>

          <div className={`p-3 rounded-lg border text-center ${
            darkMode ? 'border-gray-700 bg-gray-800/50' : 'border-gray-200 bg-gray-50'
          }`}>
            <Users className={`h-5 w-5 mx-auto mb-1 ${
              darkMode ? 'text-indigo-400' : 'text-indigo-500'
            }`} />
            <p className={`text-lg font-bold ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              {sentimentData.socialMetrics.discordMembers.toLocaleString()}
            </p>
            <p className={`text-xs ${
              darkMode ? 'text-gray-400' : 'text-gray-600'
            }`}>
              Discord Members
            </p>
          </div>
        </div>

        {/* Influencer Mentions */}
        {sentimentData.influencerMentions.length > 0 && (
          <div>
            <h4 className={`font-semibold mb-3 flex items-center space-x-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <Star className="h-4 w-4 text-yellow-500" />
              <span>Influencer Mentions ({sentimentData.influencerMentions.length})</span>
            </h4>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {sentimentData.influencerMentions.map((mention, index) => (
                <div
                  key={index}
                  className={`p-3 rounded-lg border ${
                    darkMode ? 'border-gray-700 bg-gray-800/30' : 'border-gray-200 bg-white/50'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`font-medium ${
                      darkMode ? 'text-white' : 'text-gray-900'
                    }`}>
                      @{mention.username}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${getSentimentBg(mention.sentiment)} ${getSentimentColor(mention.sentiment)}`}>
                      {mention.sentiment}
                    </span>
                  </div>
                  <p className={`text-xs ${
                    darkMode ? 'text-gray-400' : 'text-gray-600'
                  }`}>
                    {mention.followers.toLocaleString()} followers • {mention.platform}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Risk Flags */}
        {sentimentData.riskFlags.length > 0 && (
          <div>
            <h4 className={`font-semibold mb-3 flex items-center space-x-2 ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              <AlertTriangle className="h-4 w-4 text-red-500" />
              <span>Social Risk Flags</span>
            </h4>
            <div className="space-y-2">
              {sentimentData.riskFlags.map((flag, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-2 p-2 rounded-lg bg-red-500/10`}
                >
                  <div className="w-2 h-2 rounded-full bg-red-500"></div>
                  <span className={`text-sm text-red-500`}>
                    {flag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Community Health Bar */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className={`text-sm font-medium ${
              darkMode ? 'text-white' : 'text-gray-900'
            }`}>
              Community Health Score
            </span>
            <span className={`text-sm font-bold ${getHealthColor(sentimentData.communityHealth)}`}>
              {sentimentData.communityHealth}/100
            </span>
          </div>
          <div className={`w-full h-2 rounded-full ${
            darkMode ? 'bg-gray-700' : 'bg-gray-200'
          }`}>
            <div
              className={`h-2 rounded-full transition-all duration-500 ${
                sentimentData.communityHealth >= 70 ? 'bg-green-500' :
                sentimentData.communityHealth >= 40 ? 'bg-yellow-500' : 'bg-red-500'
              }`}
              style={{ width: `${sentimentData.communityHealth}%` }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};