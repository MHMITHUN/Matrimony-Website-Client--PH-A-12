import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaEnvelope, FaLock, FaUser, FaImage, FaMosque, FaEye, FaEyeSlash } from 'react-icons/fa';
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
                    <h2 className="text-2xl font-bold text-gray-800">Create Account</h2>
                    <p className="text-gray-600 mt-2">Join our community to find your life partner</p>
                </div>

                {/* Register Card */}
                <div className="card p-8">
                    <form onSubmit={handleSubmit} className="space-y-5">
                        {/* Name Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaUser />
                                </span>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Enter your full name"
                                    className="input-field pl-12"
                                    required
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Email Address <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaEnvelope />
                                </span>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="Enter your email"
                                    className="input-field pl-12"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Password <span className="text-red-500">*</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaLock />
                                </span>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Create a password"
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
                            <p className="text-xs text-gray-500 mt-1">
                                Must be at least 6 characters with uppercase and lowercase letters
                            </p>
                        </div>

                        {/* Photo URL Input */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Photo URL <span className="text-gray-400">(Optional)</span>
                            </label>
                            <div className="relative">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                                    <FaImage />
                                </span>
                                <input
                                    type="url"
                                    name="photoURL"
                                    value={formData.photoURL}
                                    onChange={handleChange}
                                    placeholder="Enter your photo URL"
                                    className="input-field pl-12"
                                />
                            </div>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full btn-primary py-3 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                        </button>
                    </form>

                    {/* Login Link */}
                    <p className="text-center mt-6 text-gray-600">
                        Already have an account?{' '}
                        <Link to="/login" className="text-green-700 font-semibold hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
