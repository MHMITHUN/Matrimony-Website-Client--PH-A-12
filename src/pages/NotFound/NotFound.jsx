import { Link } from 'react-router-dom';
import { FaHome, FaSearch, FaMosque } from 'react-icons/fa';

const NotFound = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50 to-slate-50 flex items-center justify-center px-4 pt-20">
            <div className="max-w-2xl w-full text-center">
                {/* Animated Icon */}
                <div className="relative mb-8">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="w-32 h-32 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur-3xl opacity-30 animate-pulse"></div>
                    </div>
                    <div className="relative">
                        <FaMosque className="text-9xl text-emerald-600 mx-auto animate-float" />
                    </div>
                </div>

                {/* 404 Text */}
                <h1 className="text-8xl md:text-9xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-4">
                    404
                </h1>

                {/* Error Message */}
                <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
                    Page Not Found
                </h2>
                <p className="text-lg text-gray-600 mb-8 max-w-md mx-auto">
                    Sorry, the page you're looking for doesn't exist. Perhaps it was moved or deleted, or maybe you mistyped the URL.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/"
                        className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-emerald-500/20 transition-all hover:scale-105"
                    >
                        <FaHome className="group-hover:-translate-y-1 transition-transform" />
                        Go Home
                    </Link>
                    <Link
                        to="/biodatas"
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 border-2 border-emerald-500 text-emerald-600 font-semibold rounded-2xl hover:bg-emerald-50 transition-all"
                    >
                        <FaSearch />
                        Browse Biodatas
                    </Link>
                </div>

                {/* Decorative Elements */}
                <div className="mt-12 flex items-center justify-center gap-2 text-sm text-gray-500">
                    <span className="w-12 h-px bg-gradient-to-r from-transparent to-gray-300"></span>
                    <span>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
                    <span className="w-12 h-px bg-gradient-to-l from-transparent to-gray-300"></span>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
