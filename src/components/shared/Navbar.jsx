import { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { FaBars, FaTimes, FaMosque, FaUser, FaSignOutAlt, FaChevronDown, FaCrown } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const { user, logout, isAdmin, isPremium } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
            navigate('/');
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    const navLinks = [
        { path: '/', label: 'Home' },
        { path: '/biodatas', label: 'Biodatas' },
        { path: '/about', label: 'About Us' },
        { path: '/contact', label: 'Contact Us' },
    ];

    const NavLinkItem = ({ path, label }) => (
        <NavLink
            to={path}
            className={({ isActive }) =>
                `relative px-4 py-2 rounded-xl font-medium transition-all duration-300 ${isActive
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50'
                }`
            }
            onClick={() => setIsOpen(false)}
        >
            {({ isActive }) => (
                <>
                    {label}
                    {isActive && (
                        <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-500 rounded-full"></span>
                    )}
                </>
            )}
        </NavLink>
    );

    return (
        <nav className={`fixed w-full top-0 z-50 transition-all duration-500 ${scrolled
                ? 'bg-white/90 backdrop-blur-xl shadow-lg shadow-black/5'
                : 'bg-white/70 backdrop-blur-md'
            }`}>
            <div className="container-custom">
                <div className="flex items-center justify-between h-16 md:h-20">
                    {/* Logo */}
                    <Link to="/" className="flex items-center gap-3 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-xl">
                                <FaMosque className="text-2xl text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                                Nikah
                            </h1>
                            <p className="text-[10px] md:text-xs font-medium text-amber-500 -mt-1 tracking-wide">
                                Islamic Matrimony
                            </p>
                        </div>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center gap-1">
                        {navLinks.map((link) => (
                            <NavLinkItem key={link.path} {...link} />
                        ))}

                        {user && (
                            <NavLink
                                to={isAdmin ? '/dashboard/admin' : '/dashboard'}
                                className={({ isActive }) =>
                                    `relative px-4 py-2 rounded-xl font-medium transition-all duration-300 flex items-center gap-2 ${isActive
                                        ? 'text-emerald-600 bg-emerald-50'
                                        : 'text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/50'
                                    }`
                                }
                            >
                                Dashboard
                                {isPremium && <FaCrown className="text-amber-500 text-sm" />}
                            </NavLink>
                        )}
                    </div>

                    {/* Auth Section */}
                    <div className="hidden lg:flex items-center gap-4">
                        {user ? (
                            <div className="relative">
                                <button
                                    onClick={() => setDropdownOpen(!dropdownOpen)}
                                    className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-gray-50 transition-all duration-300"
                                >
                                    <div className="relative">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName}
                                                className="w-10 h-10 rounded-full object-cover ring-2 ring-emerald-500 ring-offset-2"
                                            />
                                        ) : (
                                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-semibold">
                                                {user.displayName?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                        {isPremium && (
                                            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-amber-400 to-amber-500 rounded-full flex items-center justify-center">
                                                <FaCrown className="text-[8px] text-white" />
                                            </span>
                                        )}
                                    </div>
                                    <div className="text-left">
                                        <p className="text-sm font-semibold text-gray-800 max-w-[120px] truncate">
                                            {user.displayName || 'User'}
                                        </p>
                                        <p className="text-xs text-gray-500 max-w-[120px] truncate">
                                            {user.email}
                                        </p>
                                    </div>
                                    <FaChevronDown className={`text-gray-400 text-sm transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`} />
                                </button>

                                {/* Dropdown */}
                                {dropdownOpen && (
                                    <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-2xl shadow-xl shadow-black/10 border border-gray-100 overflow-hidden animate-fade-in-up">
                                        <div className="p-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white">
                                            <p className="font-semibold truncate">{user.displayName}</p>
                                            <p className="text-sm text-white/80 truncate">{user.email}</p>
                                        </div>
                                        <div className="p-2">
                                            <Link
                                                to={isAdmin ? '/dashboard/admin' : '/dashboard'}
                                                onClick={() => setDropdownOpen(false)}
                                                className="flex items-center gap-3 px-4 py-3 rounded-xl text-gray-700 hover:bg-emerald-50 hover:text-emerald-600 transition-all"
                                            >
                                                <FaUser className="text-lg" />
                                                <span className="font-medium">My Dashboard</span>
                                            </Link>
                                            <button
                                                onClick={() => {
                                                    handleLogout();
                                                    setDropdownOpen(false);
                                                }}
                                                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-red-500 hover:bg-red-50 transition-all"
                                            >
                                                <FaSignOutAlt className="text-lg" />
                                                <span className="font-medium">Logout</span>
                                            </button>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center gap-3">
                                <Link
                                    to="/login"
                                    className="px-5 py-2.5 font-semibold text-gray-700 hover:text-emerald-600 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    to="/register"
                                    className="relative group px-5 py-2.5 font-semibold text-white rounded-xl overflow-hidden"
                                >
                                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500"></span>
                                    <span className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-teal-600 opacity-0 group-hover:opacity-100 transition-opacity"></span>
                                    <span className="relative">Get Started</span>
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="lg:hidden relative w-10 h-10 flex items-center justify-center rounded-xl hover:bg-gray-100 transition-colors"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        {isOpen ? (
                            <FaTimes className="text-xl text-gray-700" />
                        ) : (
                            <FaBars className="text-xl text-gray-700" />
                        )}
                    </button>
                </div>

                {/* Mobile Navigation */}
                <div className={`lg:hidden overflow-hidden transition-all duration-500 ${isOpen ? 'max-h-[600px] pb-6' : 'max-h-0'}`}>
                    <div className="pt-4 border-t border-gray-100">
                        <div className="space-y-2">
                            {navLinks.map((link) => (
                                <NavLink
                                    key={link.path}
                                    to={link.path}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    {link.label}
                                </NavLink>
                            ))}

                            {user && (
                                <NavLink
                                    to={isAdmin ? '/dashboard/admin' : '/dashboard'}
                                    className={({ isActive }) =>
                                        `block px-4 py-3 rounded-xl font-medium transition-all duration-200 ${isActive
                                            ? 'bg-emerald-50 text-emerald-600'
                                            : 'text-gray-700 hover:bg-gray-50'
                                        }`
                                    }
                                    onClick={() => setIsOpen(false)}
                                >
                                    Dashboard
                                </NavLink>
                            )}
                        </div>

                        <div className="mt-6 pt-6 border-t border-gray-100">
                            {user ? (
                                <div className="space-y-4">
                                    <div className="flex items-center gap-4 px-4">
                                        {user.photoURL ? (
                                            <img
                                                src={user.photoURL}
                                                alt={user.displayName}
                                                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500 ring-offset-2"
                                            />
                                        ) : (
                                            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-emerald-500 to-teal-500 flex items-center justify-center text-white font-bold text-lg">
                                                {user.displayName?.charAt(0) || 'U'}
                                            </div>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <p className="font-semibold text-gray-800 truncate">{user.displayName || 'User'}</p>
                                            <p className="text-sm text-gray-500 truncate">{user.email}</p>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            handleLogout();
                                            setIsOpen(false);
                                        }}
                                        className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-red-500 hover:bg-red-600 text-white rounded-xl font-semibold transition-all"
                                    >
                                        <FaSignOutAlt />
                                        Logout
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    <Link
                                        to="/login"
                                        className="block text-center px-4 py-3 border-2 border-emerald-500 text-emerald-600 rounded-xl font-semibold hover:bg-emerald-50 transition-all"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/register"
                                        className="block text-center px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white rounded-xl font-semibold hover:shadow-lg transition-all"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        Get Started
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {/* Click outside to close dropdown */}
            {dropdownOpen && (
                <div
                    className="fixed inset-0 z-[-1]"
                    onClick={() => setDropdownOpen(false)}
                ></div>
            )}
        </nav>
    );
};

export default Navbar;
