import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaMale, FaFemale, FaCrown, FaDollarSign, FaChartPie, FaArrowUp, FaStar } from 'react-icons/fa';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { statsAPI } from '../../../api/api';

const AdminDashboard = () => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['adminStats'],
        queryFn: async () => {
            const response = await statsAPI.getAdmin();
            return response.data;
        }
    });

    const COLORS = ['#10b981', '#3b82f6', '#ec4899', '#f59e0b'];

    const pieData = [
        { name: 'Total Biodata', value: stats?.totalBiodata || 0 },
        { name: 'Male Biodata', value: stats?.maleBiodata || 0 },
        { name: 'Female Biodata', value: stats?.femaleBiodata || 0 },
        { name: 'Premium Biodata', value: stats?.premiumBiodata || 0 },
    ];

    const statCards = [
        {
            icon: <FaUsers />,
            label: 'Total Biodata',
            value: stats?.totalBiodata || 0,
            gradient: 'from-emerald-500 to-teal-500',
            shadow: 'shadow-emerald-500/25',
            bg: 'bg-emerald-50'
        },
        {
            icon: <FaMale />,
            label: 'Male Biodata',
            value: stats?.maleBiodata || 0,
            gradient: 'from-blue-500 to-indigo-500',
            shadow: 'shadow-blue-500/25',
            bg: 'bg-blue-50'
        },
        {
            icon: <FaFemale />,
            label: 'Female Biodata',
            value: stats?.femaleBiodata || 0,
            gradient: 'from-pink-500 to-rose-500',
            shadow: 'shadow-pink-500/25',
            bg: 'bg-pink-50'
        },
        {
            icon: <FaCrown />,
            label: 'Premium Biodata',
            value: stats?.premiumBiodata || 0,
            gradient: 'from-amber-500 to-orange-500',
            shadow: 'shadow-amber-500/25',
            bg: 'bg-amber-50'
        },
        {
            icon: <FaDollarSign />,
            label: 'Total Revenue',
            value: `৳${stats?.totalRevenue || 0}`,
            gradient: 'from-purple-500 to-violet-500',
            shadow: 'shadow-purple-500/25',
            bg: 'bg-purple-50'
        }
    ];

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="spinner-lg"></div>
                <p className="mt-4 text-slate-500">Loading dashboard...</p>
            </div>
        );
    }

    return (
        <div className="space-y-8">
            {/* Page Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-2">
                        <FaStar className="text-xs" />
                        <span>Overview</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                        Admin Dashboard
                    </h1>
                    <p className="text-slate-500 mt-1">Platform statistics and analytics</p>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {statCards.map((card, index) => (
                    <div
                        key={index}
                        className="group bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                        style={{ animationDelay: `${index * 100}ms` }}
                    >
                        <div className={`w-12 h-12 bg-gradient-to-br ${card.gradient} ${card.shadow} rounded-xl flex items-center justify-center text-white text-xl mb-4 shadow-lg group-hover:scale-110 transition-transform`}>
                            {card.icon}
                        </div>
                        <p className="text-slate-500 text-sm font-medium">{card.label}</p>
                        <p className="text-2xl md:text-3xl font-bold text-slate-800 mt-1">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Pie Chart */}
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Biodata Distribution</h2>
                            <p className="text-slate-500 text-sm">Breakdown by category</p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                            <FaChartPie className="text-white" />
                        </div>
                    </div>
                    <div className="h-80">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    labelLine={false}
                                    outerRadius={100}
                                    fill="#8884d8"
                                    dataKey="value"
                                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                    ))}
                                </Pie>
                                <Tooltip
                                    contentStyle={{
                                        backgroundColor: 'white',
                                        border: 'none',
                                        borderRadius: '12px',
                                        boxShadow: '0 10px 40px rgba(0,0,0,0.1)'
                                    }}
                                />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Info */}
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6">
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Revenue Summary</h2>
                            <p className="text-slate-500 text-sm">Financial overview</p>
                        </div>
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                            <FaDollarSign className="text-white" />
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-5 bg-gradient-to-br from-emerald-50 to-emerald-100/50 rounded-2xl border border-emerald-100 group hover:shadow-md transition-all">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Total Contact Requests</p>
                                <p className="text-2xl font-bold text-emerald-700 mt-1">{stats?.totalContactRequests || 0}</p>
                            </div>
                            <div className="w-14 h-14 bg-emerald-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FaUsers className="text-2xl text-emerald-500" />
                            </div>
                        </div>

                        <div className="flex items-center justify-between p-5 bg-gradient-to-br from-purple-50 to-purple-100/50 rounded-2xl border border-purple-100 group hover:shadow-md transition-all">
                            <div>
                                <p className="text-sm text-slate-500 font-medium">Revenue per Request</p>
                                <p className="text-2xl font-bold text-purple-700 mt-1">৳500.00</p>
                            </div>
                            <div className="w-14 h-14 bg-purple-500/10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FaArrowUp className="text-2xl text-purple-500" />
                            </div>
                        </div>

                        <div className="relative overflow-hidden flex items-center justify-between p-6 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-400 rounded-2xl shadow-lg shadow-amber-500/25 group">
                            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
                            <div className="relative">
                                <p className="text-sm text-white/80 font-medium">Total Revenue</p>
                                <p className="text-3xl font-bold text-white mt-1">৳{stats?.totalRevenue || 0}</p>
                            </div>
                            <div className="relative w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform">
                                <FaDollarSign className="text-2xl text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;

