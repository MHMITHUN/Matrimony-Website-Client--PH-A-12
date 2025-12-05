import { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { FaEnvelope, FaLock, FaGoogle, FaMosque, FaEye, FaEyeSlash } from 'react-icons/fa';
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
        <div className="min-h-screen flex items-center justify-center py-12 px-4 pattern-bg">
            <div className="max-w-md w-full">
                {/* Header */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-2 mb-6">
                        <FaMosque className="text-4xl text-green-700" />
                        <div>
                            <h1 className="text-3xl font-bold text-green-700">Nikah</h1>
                            <p className="text-sm text-amber-600 -mt-1">Islamic Matrimony</p>
                        </div>
                    </Link>
                    <h2 className="text-2xl font-bold text-gray-800">Welcome Back</h2>
                    <p className="text-gray-600 mt-2">Sign in to continue your journey</p>
                </div>

                {/* Login Card */}
                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaEnvelope />
                                </span>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="input-field pl-12"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaLock />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="input-field pl-12 pr-12"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                                </button>
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="my-6 flex items-center">
                        <div className="flex-1 border-t border-gray-200"></div>
                        <span className="px-4 text-sm text-gray-500">Or continue with</span>
                        <div className="flex-1 border-t border-gray-200"></div>
                    </div>

                    {/* Google Login */}
                    <button
                        onClick={handleGoogleLogin}
                        disabled={loading}
                        className="w-full flex items-center justify-center gap-3 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
                    >
                        <FaGoogle className="text-red-500 text-xl" />
                        <span className="font-medium text-gray-700">Continue with Google</span>
                    </button>

                    {/* Register Link */}
                    <p className="text-center mt-6 text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="text-green-700 font-semibold hover:underline">
                            Register Now
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
