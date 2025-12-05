import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaMosque, FaEye, FaEyeSlash, FaHeart, FaStar } from 'react-icons/fa';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    const { login, loginWithGoogle } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    const from = location.state?.from?.pathname || '/';

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!email || !password) {
            toast.error('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await login(email, password);
            toast.success('Login successful! Welcome back.');
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Login error:', error);
            if (error.code === 'auth/invalid-credential') {
                toast.error('Invalid email or password');
            } else if (error.code === 'auth/user-not-found') {
                toast.error('No account found with this email');
            } else if (error.code === 'auth/wrong-password') {
                toast.error('Incorrect password');
            } else {
                toast.error(error.message || 'Failed to login');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            await loginWithGoogle();
            toast.success('Login successful! Welcome.');
            navigate(from, { replace: true });
        } catch (error) {
            console.error('Google login error:', error);
            if (error.code === 'auth/popup-closed-by-user') {
                toast.error('Login cancelled');
            } else {
                toast.error('Failed to login with Google');
            }
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center py-12 px-4 pt-20 md:pt-24 relative overflow-hidden bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-teal-500/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

            {/* Floating Hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(5)].map((_, i) => (
                    <FaHeart
                        key={i}
                        className="absolute text-emerald-500/5 animate-float"
                        style={{
                            fontSize: `${Math.random() * 30 + 20}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.5}s`,
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
                        <span>Welcome Back</span>
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800">Sign In to Your Account</h2>
                    <p className="text-slate-500 mt-2">Continue your journey to finding your life partner</p>
                </div>

                {/* Login Card */}
                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/50 p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                    <FaEnvelope />
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2">
                                Password
                            </label>
                            <div className="relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                                    <FaLock />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
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
                                    Signing in...
                                </span>
                            ) : (
                                'Sign In'
                            )}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center gap-4">
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                        <span className="text-sm text-slate-400 font-medium">Or continue with</span>
                        <div className="flex-1 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent"></div>
                    </div>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3.5 bg-white border-2 border-slate-100 rounded-xl hover:border-slate-200 hover:bg-slate-50 transition-all duration-300 disabled:opacity-50 group shadow-sm hover:shadow-md"
                    >
                        <FaGoogle className="text-red-500 text-xl group-hover:scale-110 transition-transform" />
                        <span className="font-semibold text-slate-700">Continue with Google</span>
                    </button>

                    {/* Register Link */}
                    <p className="text-center mt-6 text-slate-500">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-colors">
                            Register Now
                        </Link>
                    </p>
                </div>

                {/* Islamic Quote */}
                <p className="text-center mt-8 text-sm text-slate-400 italic">
                    "And among His signs is that He created for you mates from among yourselves"
                    <span className="block mt-1 text-amber-500 not-italic font-medium">— Quran 30:21</span>
                </p>
            </div>
        </div>
    );
};

export default Login;

