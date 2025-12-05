import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaMosque, FaUser, FaEdit, FaEye, FaEnvelope, FaHeart, FaRing, FaSignOutAlt, FaBars, FaTimes, FaCrown, FaUsers, FaCheckCircle, FaChartPie, FaListAlt, FaHome, FaArrowLeft } from 'react-icons/fa';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from '../contexts/AuthContext';
import { adminAPI } from '../api/api';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout, isAdmin, isPremium } = useAuth();
    const navigate = useNavigate();

    // Fetch pending premium requests count for badge
    const { data: pendingRequests = [] } = useQuery({
        queryKey: ['premiumRequests'],
        queryFn: async () => {
            if (!isAdmin) return [];
            const response = await adminAPI.getPremiumRequests();
            return response.data;
        },
        enabled: isAdmin,
        refetchInterval: 30000 // Refetch every 30 seconds
    });

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    const userLinks = [
        { path: '/dashboard/edit-biodata', icon: <FaEdit />, label: 'Edit Biodata' },
        { path: '/dashboard/view-biodata', icon: <FaEye />, label: 'View Biodata' },
        { path: '/dashboard/contact-requests', icon: <FaEnvelope />, label: 'My Contact Requests' },
        { path: '/dashboard/favorites', icon: <FaHeart />, label: 'Favourites Biodata' },
        { path: '/dashboard/got-married', icon: <FaRing />, label: 'Got Married' },
    ];

    const adminLinks = [
        { path: '/dashboard/admin', icon: <FaChartPie />, label: 'Admin Dashboard' },
        { path: '/dashboard/admin/manage-users', icon: <FaUsers />, label: 'Manage Users' },
        { path: '/dashboard/admin/approved-premium', icon: <FaCrown />, label: 'Approved Premium' },
        { path: '/dashboard/admin/approved-contacts', icon: <FaCheckCircle />, label: 'Approved Contacts' },
        { path: '/dashboard/admin/contact-messages', icon: <FaEnvelope />, label: 'Contact Messages' },
        { path: '/dashboard/admin/success-stories', icon: <FaListAlt />, label: 'Success Stories' },
    ];

    const links = isAdmin ? adminLinks : userLinks;

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            {/* Logo */}
            <div className="p-6 border-b border-white/10">
                <NavLink to="/" className="flex items-center gap-3 group">
                    <div className="relative">
                        <div className="absolute inset-0 bg-amber-400 rounded-xl blur-md opacity-50 group-hover:opacity-70 transition-opacity"></div>
                        <div className="relative bg-gradient-to-br from-amber-400 to-amber-500 p-2.5 rounded-xl">
                            <FaMosque className="text-2xl text-white" />
                        </div>
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-white">Nikah</h1>
                        <p className="text-xs text-emerald-200/70 -mt-0.5">Dashboard</p>
                    </div>
                </NavLink>
            </div>

            {/* User Info */}
            <div className="p-4 mx-4 mt-4 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10">
                <div className="flex items-center gap-3">
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-12 h-12 rounded-xl object-cover ring-2 ring-amber-400/50"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-400 to-teal-500 flex items-center justify-center">
                            <FaUser className="text-white text-lg" />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="font-semibold text-white truncate">{user?.displayName || 'User'}</p>
                        <p className="text-sm text-emerald-200/60 truncate">{user?.email}</p>
                        <div className="flex items-center gap-2 mt-1">
                            {isPremium && (
                                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-amber-500/20 text-amber-300 rounded-full">
                                    <FaCrown className="text-[10px]" /> Premium
                                </span>
                            )}
                            {isAdmin && (
                                <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 bg-purple-500/20 text-purple-300 rounded-full">
                                    <FaCrown className="text-[10px]" /> Admin
                                </span>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-4 overflow-y-auto">
                <p className="text-xs font-semibold text-emerald-200/40 uppercase tracking-wider mb-3 px-3">
                    {isAdmin ? 'Admin Menu' : 'Navigation'}
                </p>
                <ul className="space-y-1.5">
                    {links.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group relative ${isActive
                                        ? 'bg-white text-emerald-700 font-semibold shadow-lg shadow-white/10'
                                        : 'text-white/70 hover:bg-white/10 hover:text-white'
                                    }`
                                }
                            >
                                <span className="text-lg">{link.icon}</span>
                                <span className="flex-1">{link.label}</span>
                                {/* Show badge for Approved Premium menu item */}
                                {isAdmin && link.path === '/dashboard/admin/approved-premium' && pendingRequests.length > 0 && (
                                    <span className="inline-flex items-center justify-center min-w-[20px] h-5 px-1.5 bg-amber-500 text-white text-xs font-bold rounded-full animate-pulse">
                                        {pendingRequests.length}
                                    </span>
                                )}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-white/10 space-y-2">
                <NavLink
                    to="/"
                    className="flex items-center justify-center gap-2 px-4 py-3 text-white/70 hover:text-white hover:bg-white/10 rounded-xl transition-all duration-300"
                >
                    <FaHome /> Back to Home
                </NavLink>
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl transition-all duration-300 shadow-lg shadow-red-500/25 hover:shadow-red-500/40"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-slate-100 to-slate-50">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 bg-gradient-to-b from-emerald-600 via-emerald-700 to-teal-800 fixed h-screen shadow-2xl shadow-emerald-900/30">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar Overlay */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        onClick={() => setSidebarOpen(false)}
                    />
                    <aside className="absolute left-0 top-0 h-full w-72 bg-gradient-to-b from-emerald-600 via-emerald-700 to-teal-800 shadow-2xl animate-slide-in-left">
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="absolute top-4 right-4 p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors"
                        >
                            <FaTimes className="text-xl" />
                        </button>
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 lg:ml-72">
                {/* Top Bar */}
                <header className="bg-white/80 backdrop-blur-xl shadow-sm shadow-slate-200/50 sticky top-0 z-40 border-b border-slate-100">
                    <div className="flex items-center justify-between px-4 md:px-8 h-16">
                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setSidebarOpen(true)}
                                className="lg:hidden p-2.5 hover:bg-slate-100 rounded-xl transition-colors"
                            >
                                <FaBars className="text-xl text-slate-600" />
                            </button>
                            <div>
                                <h1 className="text-lg font-bold text-slate-800">
                                    {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
                                </h1>
                                <p className="text-sm text-slate-500 hidden sm:block">
                                    Welcome back, {user?.displayName?.split(' ')[0] || 'User'}!
                                </p>
                            </div>
                        </div>
                        <NavLink
                            to="/"
                            className="flex items-center gap-2 px-4 py-2 text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50 rounded-xl font-medium transition-all"
                        >
                            <FaArrowLeft className="text-sm" />
                            <span className="hidden sm:inline">Back to Home</span>
                        </NavLink>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 md:p-6 lg:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
