import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaImage, FaMosque, FaEye, FaEyeSlash, FaHeart, FaCheckCircle, FaStar } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        photoURL: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { register } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const validatePassword = (password) => {
        const hasUpperCase = /[A-Z]/.test(password);
        const hasLowerCase = /[a-z]/.test(password);
        const hasMinLength = password.length >= 6;

        if (!hasMinLength) {
            return 'Password must be at least 6 characters';
        }
        if (!hasUpperCase) {
            return 'Password must contain at least one uppercase letter';
        }
        if (!hasLowerCase) {
            return 'Password must contain at least one lowercase letter';
        }
        return null;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const { name, email, password, photoURL } = formData;

        if (!name || !email || !password) {
            toast.error('Please fill in all required fields');
            return;
        }

        const passwordError = validatePassword(password);
        if (passwordError) {
            toast.error(passwordError);
            return;
        }

        setLoading(true);
        try {
            await register(email, password, name, photoURL);
            toast.success('Registration successful! Welcome to Nikah Matrimony.');
            navigate('/');
        } catch (error) {
            console.error('Register error:', error);
            if (error.code === 'auth/email-already-in-use') {
                toast.error('An account with this email already exists');
            } else if (error.code === 'auth/weak-password') {
                toast.error('Password is too weak');
            } else if (error.code === 'auth/invalid-email') {
                toast.error('Invalid email address');
            } else {
                toast.error(error.message || 'Failed to register');
            }
        } finally {
            setLoading(false);
        }
    };

    // Password strength indicators
    const passwordChecks = [
        { label: 'At least 6 characters', valid: formData.password.length >= 6 },
        { label: 'One uppercase letter', valid: /[A-Z]/.test(formData.password) },
        { label: 'One lowercase letter', valid: /[a-z]/.test(formData.password) },
    ];

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 pt-20 md:pt-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute top-1/3 right-1/4 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl"></div>

            {/* Floating Hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <FaHeart
                        key={i}
                        className="absolute text-emerald-500/5 animate-float"
                        style={{
                            fontSize: `${Math.random() * 30 + 15}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.4}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            <div className="max-w-md w-full relative z-10 animate-fade-in-up">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                        <div className="relative">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-lg opacity-40 group-hover:opacity-60 transition-opacity"></div>
                            <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-3 rounded-xl shadow-lg shadow-emerald-500/25">
                                <FaMosque className="text-2xl text-white" />
                            </div>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">Nikah</h1>
                            <p className="text-sm text-amber-500 font-medium -mt-1">Islamic Matrimony</p>
                        </div>
                    </Link>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-4">
                        <FaStar className="text-xs" />
                        <span>Join Our Community</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Create Your Account</h2>
                    <p className="text-slate-500 mt-2">Start your journey to find your blessed partner</p>
                </div>

                {/* Register Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/50 p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                    <FaEnvelope />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                    <FaLock />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
                                    className="w-full pl-12 pr-12 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-emerald-500 transition-colors"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                            {/* Password Requirements */}
                            {formData.password && (
                                <div className="mt-3 space-y-1.5">
                                    {passwordChecks.map((check, index) => (
                                        <div
                                            key={index}
                                            className={`flex items-center gap-2 text-xs ${check.valid ? 'text-emerald-600' : 'text-slate-400'}`}
                                        >
                                            <FaCheckCircle className={check.valid ? 'text-emerald-500' : 'text-slate-300'} />
                                            {check.label}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Photo URL Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Photo URL <span className="text-slate-400 font-normal">(Optional)</span>
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                    <FaImage />
                                </span>
                                <input
                                    type="url"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    placeholder="Enter your photo URL"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full relative overflow-hidden font-semibold py-4 px-6 rounded-xl transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Creating Account...
                                </span>
                            ) : (
                                'Create Account'
                            )}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center mt-6 text-slate-500">
                        Already have an account?{' '}
                        <Link to="/login" className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-colors">
                            Sign In
                        </Link>
                    </p>
                </div>

                {/* Islamic Quote */}
                <p className="text-center mt-8 text-sm text-slate-400 italic">
                    "Marriage completes half of one's faith"
                    <span className="block mt-1 text-amber-500 not-italic font-medium">— Prophet Muhammad (PBUH)</span>
                </p>
            </div>
        </div>
    );
};

export default Register;

