import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaMosque, FaUser, FaEdit, FaEye, FaEnvelope, FaHeart, FaRing, FaSignOutAlt, FaBars, FaTimes, FaCrown, FaUsers, FaCheckCircle, FaChartPie, FaListAlt } from 'react-icons/fa';
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import toast from 'react-hot-toast';

const DashboardLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout, isAdmin, isPremium } = useAuth();
    const navigate = useNavigate();

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
        { path: '/dashboard/admin/success-stories', icon: <FaListAlt />, label: 'Success Stories' },
    ];

    const links = isAdmin ? adminLinks : userLinks;

    const SidebarContent = () => (
        <>
            {/* Logo */}
            <div className="p-6 border-b border-green-600">
                <NavLink to="/" className="flex items-center gap-2">
                    <FaMosque className="text-3xl text-amber-400" />
                    <div>
                        <h1 className="text-xl font-bold text-white">Nikah</h1>
                        <p className="text-xs text-green-200 -mt-1">Dashboard</p>
                    </div>
                </NavLink>
            </div>

            {/* User Info */}
            <div className="p-4 border-b border-green-600">
                <div className="flex items-center gap-3">
                    {user?.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt={user.displayName}
                            className="w-12 h-12 rounded-full border-2 border-amber-400"
                        />
                    ) : (
                        <div className="w-12 h-12 rounded-full bg-green-600 flex items-center justify-center">
                            <FaUser className="text-white" />
                        </div>
                    )}
                    <div className="flex-1 min-w-0">
                        <p className="font-medium text-white truncate">{user?.displayName || 'User'}</p>
                        <p className="text-sm text-green-200 truncate">{user?.email}</p>
                        {isPremium && (
                            <span className="inline-flex items-center gap-1 text-xs text-amber-400 mt-1">
                                <FaCrown /> Premium
                            </span>
                        )}
                        {isAdmin && (
                            <span className="inline-flex items-center gap-1 text-xs text-amber-400 mt-1">
                                <FaCrown /> Admin
                            </span>
                        )}
                    </div>
                </div>
            </div>

            {/* Navigation Links */}
            <nav className="p-4 flex-1">
                <ul className="space-y-2">
                    {links.map((link) => (
                        <li key={link.path}>
                            <NavLink
                                to={link.path}
                                onClick={() => setSidebarOpen(false)}
                                className={({ isActive }) =>
                                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${isActive
                                        ? 'bg-white text-green-700 font-semibold'
                                        : 'text-white hover:bg-green-600'
                                    }`
                                }
                            >
                                {link.icon}
                                {link.label}
                            </NavLink>
                        </li>
                    ))}
                </ul>
            </nav>

            {/* Logout Button */}
            <div className="p-4 border-t border-green-600">
                <button
                    onClick={handleLogout}
                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors"
                >
                    <FaSignOutAlt /> Logout
                </button>
            </div>
        </>
    );

    return (
        <div className="min-h-screen bg-gray-100 flex">
            {/* Desktop Sidebar */}
            <aside className="hidden lg:flex flex-col w-72 bg-green-700 fixed h-screen">
                <SidebarContent />
            </aside>

            {/* Mobile Sidebar */}
            {sidebarOpen && (
                <div className="fixed inset-0 z-50 lg:hidden">
                    <div className="absolute inset-0 bg-black/50" onClick={() => setSidebarOpen(false)} />
                    <aside className="absolute left-0 top-0 h-full w-72 bg-green-700 flex flex-col">
                        <SidebarContent />
                    </aside>
                </div>
            )}

            {/* Main Content */}
            <div className="flex-1 lg:ml-72">
                {/* Top Bar */}
                <header className="bg-white shadow-sm sticky top-0 z-40">
                    <div className="flex items-center justify-between px-4 md:px-8 h-16">
                        <button
                            onClick={() => setSidebarOpen(true)}
                            className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                        >
                            <FaBars className="text-xl text-gray-700" />
                        </button>
                        <h1 className="text-lg font-semibold text-gray-800 hidden lg:block">
                            {isAdmin ? 'Admin Dashboard' : 'My Dashboard'}
                        </h1>
                        <NavLink to="/" className="text-green-700 hover:text-green-800 font-medium">
                            ← Back to Home
                        </NavLink>
                    </div>
                </header>

                {/* Page Content */}
                <main className="p-4 md:p-8">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default DashboardLayout;
