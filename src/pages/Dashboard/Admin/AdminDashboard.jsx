import { useQuery } from '@tanstack/react-query';
import { FaUsers, FaMale, FaFemale, FaCrown, FaDollarSign, FaChartPie } from 'react-icons/fa';
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

    const COLORS = ['#2E7D32', '#1976D2', '#E91E63', '#D4AF37'];

    const pieData = [
        { name: 'Total Biodata', value: stats?.totalBiodata || 0 },
        { name: 'Male Biodata', value: stats?.maleBiodata || 0 },
        { name: 'Female Biodata', value: stats?.femaleBiodata || 0 },
        { name: 'Premium Biodata', value: stats?.premiumBiodata || 0 },
    ];

    const statCards = [
        {
            icon: <FaUsers className="text-3xl" />,
            label: 'Total Biodata',
            value: stats?.totalBiodata || 0,
            color: 'bg-green-500'
        },
        {
            icon: <FaMale className="text-3xl" />,
            label: 'Male Biodata',
            value: stats?.maleBiodata || 0,
            color: 'bg-blue-500'
        },
        {
            icon: <FaFemale className="text-3xl" />,
            label: 'Female Biodata',
            value: stats?.femaleBiodata || 0,
            color: 'bg-pink-500'
        },
        {
            icon: <FaCrown className="text-3xl" />,
            label: 'Premium Biodata',
            value: stats?.premiumBiodata || 0,
            color: 'bg-amber-500'
        },
        {
            icon: <FaDollarSign className="text-3xl" />,
            label: 'Total Revenue',
            value: `$${stats?.totalRevenue || 0}`,
            color: 'bg-purple-500'
        }
    ];

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaChartPie className="text-green-600" /> Admin Dashboard
                </h1>
                <p className="text-gray-600">Overview of platform statistics</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-8">
                {statCards.map((card, index) => (
                    <div key={index} className="card p-6">
                        <div className={`w-14 h-14 ${card.color} rounded-xl flex items-center justify-center text-white mb-4`}>
                            {card.icon}
                        </div>
                        <p className="text-gray-500 text-sm">{card.label}</p>
                        <p className="text-2xl font-bold text-gray-800">{card.value}</p>
                    </div>
                ))}
            </div>

            {/* Pie Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="card p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Biodata Distribution</h2>
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
                                <Tooltip />
                                <Legend />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Revenue Info */}
                <div className="card p-6">
                    <h2 className="text-lg font-bold text-gray-800 mb-6">Revenue Summary</h2>
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500">Total Contact Requests</p>
                                <p className="text-2xl font-bold text-green-700">{stats?.totalContactRequests || 0}</p>
                            </div>
                            <FaUsers className="text-4xl text-green-300" />
                        </div>
                        <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                            <div>
                                <p className="text-sm text-gray-500">Revenue per Request</p>
                                <p className="text-2xl font-bold text-purple-700">$5.00</p>
                            </div>
                            <FaDollarSign className="text-4xl text-purple-300" />
                        </div>
                        <div className="flex items-center justify-between p-4 gradient-gold rounded-lg text-white">
                            <div>
                                <p className="text-sm text-white/80">Total Revenue</p>
                                <p className="text-3xl font-bold">${stats?.totalRevenue || 0}</p>
                            </div>
                            <FaDollarSign className="text-4xl text-white/30" />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
