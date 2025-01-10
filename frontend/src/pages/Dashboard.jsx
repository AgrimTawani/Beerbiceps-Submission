import { 
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell
} from 'recharts';

const Dashboard = () => {
  // Mock data for follower growth
  const followerData = [
    { month: 'Jan', followers: 2400 },
    { month: 'Feb', followers: 3600 },
    { month: 'Mar', followers: 4800 },
    { month: 'Apr', followers: 5200 },
    { month: 'May', followers: 7000 },
    { month: 'Jun', followers: 8900 }
  ];

  // Mock data for engagement rate
  const engagementData = [
    { day: 'Mon', rate: 4.5 },
    { day: 'Tue', rate: 5.2 },
    { day: 'Wed', rate: 6.8 },
    { day: 'Thu', rate: 4.9 },
    { day: 'Fri', rate: 7.2 },
    { day: 'Sat', rate: 8.1 },
    { day: 'Sun', rate: 7.5 }
  ];

  // Mock data for content performance
  const contentData = [
    { type: 'Photos', posts: 45 },
    { type: 'Videos', posts: 30 },
    { type: 'Reels', posts: 25 },
    { type: 'Stories', posts: 80 }
  ];

  // Mock data for audience demographics
  const demographicsData = [
    { name: '18-24', value: 30 },
    { name: '25-34', value: 40 },
    { name: '35-44', value: 20 },
    { name: '45+', value: 10 }
  ];

  const COLORS = ['#8B5CF6', '#7C3AED', '#6D28D9', '#5B21B6'];

  return (
    <div className="min-h-screen bg-black text-white p-6">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Instagram Analytics Dashboard</h1>
        
        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          {[
            { title: 'Total Followers', value: '8,900', change: '+12.5%' },
            { title: 'Avg. Engagement', value: '6.3%', change: '+2.1%' },
            { title: 'Total Posts', value: '180', change: '+15' },
            { title: 'Reach', value: '25.4K', change: '+8.9%' }
          ].map((stat, index) => (
            <div key={index} className="bg-gray-900 p-4 rounded-lg">
              <h3 className="text-gray-400 text-sm">{stat.title}</h3>
              <p className="text-2xl font-bold mt-1">{stat.value}</p>
              <span className="text-green-500 text-sm">{stat.change}</span>
            </div>
          ))}
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Follower Growth */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Follower Growth</h2>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={followerData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="month" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                <Area type="monotone" dataKey="followers" stroke="#8B5CF6" fill="#8B5CF6" fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Engagement Rate */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Daily Engagement Rate</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={engagementData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="day" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                <Line type="monotone" dataKey="rate" stroke="#8B5CF6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </div>

          {/* Content Distribution */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Content Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={contentData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis dataKey="type" stroke="#9CA3AF" />
                <YAxis stroke="#9CA3AF" />
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
                <Bar dataKey="posts" fill="#8B5CF6" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Audience Demographics */}
          <div className="bg-gray-900 p-4 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Audience Age Distribution</h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={demographicsData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name} (${value}%)`}
                  outerRadius={100}
                  fill="#8B5CF6"
                  dataKey="value"
                >
                  {demographicsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#1F2937', border: 'none' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;