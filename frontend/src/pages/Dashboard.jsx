// Dashboard.jsx
import React, { useState, useEffect } from 'react';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
  ComposedChart
} from 'recharts';

const Dashboard = ({ isDarkMode }) => {
  const [data, setData] = useState([]);
  const [metrics, setMetrics] = useState({
    avgEngagement: 0,
    totalReach: 0,
    totalImpressions: 0,
    reactionTotals: {},
    hourlyStats: {}
  });

  // Function to sample data while maintaining distribution
  const sampleData = (data, sampleSize = 1000) => {
    if (data.length <= sampleSize) return data;
    
    const sortedData = [...data].sort((a, b) => 
      new Date(a.posted_at) - new Date(b.posted_at)
    );

    const step = Math.floor(data.length / sampleSize);
    const sampledData = [];
    
    for (let i = 0; i < data.length && sampledData.length < sampleSize; i += step) {
      sampledData.push(sortedData[i]);
    }

    if (sampledData.length < sampleSize) {
      const remainingData = sortedData.filter(item => !sampledData.includes(item));
      const remainingNeeded = sampleSize - sampledData.length;
      
      for (let i = 0; i < remainingNeeded; i++) {
        const randomIndex = Math.floor(Math.random() * remainingData.length);
        sampledData.push(remainingData.splice(randomIndex, 1)[0]);
      }
    }

    return sampledData;
  };

  useEffect(() => {
    fetch('/csvjson.json')
      .then(response => response.json())
      .then(jsonData => {
        const sampledData = sampleData(jsonData, 1000);
        setData(sampledData);
        calculateMetrics(sampledData);
      })
      .catch(error => console.error('Error loading data:', error));
  }, []);

  const calculateMetrics = (data) => {
    const totalPosts = data.length;
    
    const metrics = data.reduce((acc, post) => ({
      avgEngagement: acc.avgEngagement + post.engagement_rate,
      totalReach: acc.totalReach + post.reach,
      totalImpressions: acc.totalImpressions + post.impressions,
      reactionTotals: {
        likes: (acc.reactionTotals.likes || 0) + post.like_count,
        loves: (acc.reactionTotals.loves || 0) + post.love_count,
        hahas: (acc.reactionTotals.hahas || 0) + post.haha_count,
        wows: (acc.reactionTotals.wows || 0) + post.wow_count,
        sads: (acc.reactionTotals.sads || 0) + post.sad_count,
        angrys: (acc.reactionTotals.angrys || 0) + post.angry_count,
      }
    }), {
      avgEngagement: 0,
      totalReach: 0,
      totalImpressions: 0,
      reactionTotals: {}
    });

    const hourlyStats = data.reduce((acc, post) => {
      const hour = post.hour;
      if (!acc[hour]) {
        acc[hour] = {
          hour,
          engagement: 0,
          posts: 0,
          reach: 0
        };
      }
      acc[hour].engagement += post.engagement_rate;
      acc[hour].posts += 1;
      acc[hour].reach += post.reach;
      return acc;
    }, {});

    metrics.hourlyStats = Object.values(hourlyStats).map(stat => ({
      ...stat,
      avgEngagement: (stat.engagement / stat.posts).toFixed(2)
    }));

    setMetrics({
      ...metrics,
      avgEngagement: (metrics.avgEngagement / totalPosts).toFixed(2),
      hourlyStats
    });
  };

  const COLORS = {
    primary: '#8B5CF6',
    secondary: '#34D399',
    tertiary: '#FBBF24',
    quaternary: '#EC4899',
    accent: '#3B82F6'
  };

  const reactionData = Object.entries(metrics.reactionTotals).map(([key, value]) => ({
    name: key.charAt(0).toUpperCase() + key.slice(1),
    value
  }));

  return (
    <div className={`min-h-screen p-6 ${isDarkMode ? 'bg-black   text-white' : 'bg-gray-50 text-gray-900'}`}>
      <h1 className="text-3xl font-bold mb-8">Instagram Analytics Dashboard</h1>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg mb-2">Total Reach</h3>
          <p className="text-2xl font-bold">{metrics.totalReach.toLocaleString()}</p>
        </div>
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg mb-2">Total Impressions</h3>
          <p className="text-2xl font-bold">{metrics.totalImpressions.toLocaleString()}</p>
        </div>
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h3 className="text-lg mb-2">Avg Engagement Rate</h3>
          <p className="text-2xl font-bold">{metrics.avgEngagement}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Engagement by Post Type */}
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Engagement by Post Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="post_type" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="engagement_rate" fill={COLORS.primary} name="Engagement Rate" />
              <Line yAxisId="right" type="monotone" dataKey="reach" stroke={COLORS.secondary} name="Reach" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>

        {/* Reaction Distribution */}
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Reaction Distribution</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={reactionData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={100}
                label
              >
                {reactionData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={Object.values(COLORS)[index % Object.values(COLORS).length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Hourly Engagement Patterns */}
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Hourly Engagement Patterns</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={Object.values(metrics.hourlyStats)}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="hour" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="avgEngagement" stroke={COLORS.accent} name="Avg Engagement" />
              <Line type="monotone" dataKey="reach" stroke={COLORS.quaternary} name="Reach" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Video Performance Metrics */}
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Video Performance</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data.filter(post => post.post_type === 'video')}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="post_id" />
              <YAxis yAxisId="left" />
              <YAxis yAxisId="right" orientation="right" />
              <Tooltip />
              <Legend />
              <Bar yAxisId="left" dataKey="video_views" fill={COLORS.primary} name="Views" />
              <Bar yAxisId="right" dataKey="avg_watch_time" fill={COLORS.secondary} name="Avg Watch Time (s)" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Reach vs Impressions */}
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Reach vs Impressions</h2>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="post_type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="reach" stackId="1" stroke={COLORS.primary} fill={COLORS.primary} name="Reach" />
              <Area type="monotone" dataKey="impressions" stackId="2" stroke={COLORS.secondary} fill={COLORS.secondary} name="Impressions" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Page Clicks Analysis */}
        <div className={`p-6 rounded-lg shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}>
          <h2 className="text-xl font-semibold mb-4">Page Clicks by Post Type</h2>
          <ResponsiveContainer width="100%" height={300}>
            <ComposedChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="post_type" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="page_clicks" fill={COLORS.tertiary} name="Page Clicks" />
              <Line type="monotone" dataKey="engagement_rate" stroke={COLORS.quaternary} name="Engagement Rate" />
            </ComposedChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;