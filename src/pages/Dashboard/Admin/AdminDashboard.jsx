import { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import {
    LineChart, Line, AreaChart, Area, PieChart, Pie, Cell,
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';
import { FaUsers, FaUserTie, FaHeart, FaChartLine, FaVenus, FaMars, FaTrophy } from 'react-icons/fa';
import { analyticsAPI } from '../../../api/api';
import { motion } from 'framer-motion';
import toast from 'react-hot-toast';

const AdminDashboard = () => {
    const [stats, setStats] = useState(null);
    const [userGrowth, setUserGrowth] = useState([]);
    const [locationStats, setLocationStats] = useState([]);
    const [ageDistribution, setAgeDistribution] = useState([]);
    const [recentActivity, setRecentActivity] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    const fetchAnalytics = async () => {
        try {
            const [statsRes, growthRes, locationRes, ageRes, activityRes] = await Promise.all([
                analyticsAPI.getStats(),
                analyticsAPI.getUserGrowth(),
                analyticsAPI.getLocationStats(),
                analyticsAPI.getAgeDistribution(),
                analyticsAPI.getRecentActivity()
            ]);

            setStats(statsRes.data);
            setUserGrowth(growthRes.data);
            setLocationStats(locationRes.data.slice(0, 6)); // Top 6 locations
            setAgeDistribution(ageRes.data);
            setRecentActivity(activityRes.data);
        } catch (error) {
            console.error('Error fetching analytics:', error);
            toast.error('Failed to load analytics data');
        } finally {
            setLoading(false);
        }
    };

    const COLORS = ['#10b981', '#14b8a6', '#06b6d4', '#3b82f6', '#6366f1', '#8b5cf6'];

    const StatCard = ({ icon, label, value, color, bgColor, trend }) => (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/30 border border-white/50 dark:border-slate-700 p-6 hover:shadow-xl transition-all"
        >
            <div className="flex items-start justify-between">
                <div className="flex-1">
                    <p className="text-slate-500 dark:text-slate-400 text-sm font-medium mb-2">{label}</p>
                    <h3 className="text-3xl font-bold text-slate-800 dark:text-white mb-1">{value?.toLocaleString() || 0}</h3>
                    {trend && (
                        <p className="text-xs text-emerald-600 flex items-center gap-1">
                            <FaChartLine className="text-[10px]" />
                            <span>{trend}</span>
                        </p>
                    )}
                </div>
                <div className={`w-14 h-14 rounded-xl ${bgColor} flex items-center justify-center text-2xl ${color}`}>
                    {icon}
                </div>
            </div>
        </motion.div>
    );

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900">
                <div className="text-center">
                    <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-slate-600 dark:text-slate-400 font-medium">Loading analytics...</p>
                </div>
            </div>
        );
    }

    const genderData = [
        { name: 'Male', value: stats?.maleCount || 0, color: '#3b82f6' },
        { name: 'Female', value: stats?.femaleCount || 0, color: '#ec4899' }
    ];

    return (
        <>
            <Helmet>
                <title>Admin Dashboard - Analytics & Insights</title>
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 p-6">
                <div className="max-w-7xl mx-auto">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-2">
                            Analytics Dashboard
                        </h1>
                        <p className="text-slate-600 dark:text-slate-400">
                            Real-time insights and comprehensive analytics
                        </p>
                    </div>

                    {/* Statistics Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <StatCard
                            icon={<FaUsers />}
                            label="Total Users"
                            value={stats?.totalUsers}
                            color="text-emerald-600"
                            bgColor="bg-emerald-500/10"
                        />
                        <StatCard
                            icon={<FaUserTie />}
                            label="Premium Members"
                            value={stats?.totalPremiumUsers}
                            color="text-amber-600"
                            bgColor="bg-amber-500/10"
                        />
                        <StatCard
                            icon={<FaHeart />}
                            label="Contact Requests"
                            value={stats?.totalContactRequests}
                            color="text-pink-600"
                            bgColor="bg-pink-500/10"
                        />
                        <StatCard
                            icon={<FaTrophy />}
                            label="Success Stories"
                            value={stats?.totalSuccessStories}
                            color="text-teal-600"
                            bgColor="bg-teal-500/10"
                            trend={`${stats?.successRate}% success rate`}
                        />
                    </div>

                    {/* Charts Section */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* User Growth Chart */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/30 border border-white/50 dark:border-slate-700 p-6"
                        >
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></span>
                                User Growth Trend
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <AreaChart data={userGrowth}>
                                    <defs>
                                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                        <linearGradient id="colorPremium" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                                            <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="month" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            border: 'none',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Legend />
                                    <Area
                                        type="monotone"
                                        dataKey="total"
                                        stroke="#10b981"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorTotal)"
                                        name="Total Users"
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="premium"
                                        stroke="#f59e0b"
                                        strokeWidth={2}
                                        fillOpacity={1}
                                        fill="url(#colorPremium)"
                                        name="Premium Users"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </motion.div>

                        {/* Gender Distribution */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/30 border border-white/50 dark:border-slate-700 p-6"
                        >
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></span>
                                Gender Distribution
                            </h3>
                            <div className="flex items-center justify-center">
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={genderData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                            outerRadius={100}
                                            fill="#8884d8"
                                            dataKey="value"
                                        >
                                            {genderData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                    </PieChart>
                                </ResponsiveContainer>
                            </div>
                            <div className="flex items-center justify-center gap-6 mt-4">
                                <div className="flex items-center gap-2">
                                    <FaMars className="text-blue-500 text-xl" />
                                    <span className="text-slate-600 dark:text-slate-300">{stats?.maleCount} Males</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <FaVenus className="text-pink-500 text-xl" />
                                    <span className="text-slate-600 dark:text-slate-300">{stats?.femaleCount} Females</span>
                                </div>
                            </div>
                        </motion.div>
                    </div>

                    {/* Second Row Charts */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
                        {/* Location Distribution */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/30 border border-white/50 dark:border-slate-700 p-6"
                        >
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></span>
                                Top Locations
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <BarChart data={locationStats}>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                                    <XAxis dataKey="name" stroke="#64748b" />
                                    <YAxis stroke="#64748b" />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: 'rgba(255, 255, 255, 0.95)',
                                            border: 'none',
                                            borderRadius: '12px',
                                            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                        }}
                                    />
                                    <Bar dataKey="value" fill="#10b981" radius={[8, 8, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </motion.div>

                        {/* Age Distribution */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/30 border border-white/50 dark:border-slate-700 p-6"
                        >
                            <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                                <span className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></span>
                                Age Distribution
                            </h3>
                            <ResponsiveContainer width="100%" height={300}>
                                <PieChart>
                                    <Pie
                                        data={ageDistribution.filter(item => item.value > 0)}
                                        cx="50%"
                                        cy="50%"
                                        labelLine={false}
                                        label={({ percent }) => `${(percent * 100).toFixed(0)}%`}
                                        outerRadius={100}
                                        fill="#8884d8"
                                        dataKey="value"
                                    >
                                        {ageDistribution.filter(item => item.value > 0).map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                        ))}
                                    </Pie>
                                    <Tooltip />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </motion.div>
                    </div>

                    {/* Recent Activity Timeline */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/30 border border-white/50 dark:border-slate-700 p-6"
                    >
                        <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-6 flex items-center gap-2">
                            <span className="w-1 h-6 bg-gradient-to-b from-emerald-500 to-teal-500 rounded-full"></span>
                            Recent Activity
                        </h3>
                        <div className="space-y-4 max-h-96 overflow-y-auto">
                            {recentActivity.map((activity, index) => (
                                <div
                                    key={index}
                                    className="flex items-start gap-4 p-4 bg-slate-50 dark:bg-slate-700/50 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
                                >
                                    <div className={`w-2 h-2 rounded-full mt-2 flex-shrink-0 ${activity.type === 'user' ? 'bg-emerald-500' :
                                        activity.type === 'biodata' ? 'bg-blue-500' :
                                            'bg-pink-500'
                                        }`}></div>
                                    <div className="flex-1">
                                        <p className="text-slate-700 dark:text-slate-200 text-sm">{activity.message}</p>
                                        <p className="text-slate-400 text-xs mt-1">
                                            {new Date(activity.time).toLocaleString()}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </>
    );
};

export default AdminDashboard;
