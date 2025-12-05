import { Link } from 'react-router-dom';
import { FaMosque, FaFacebook, FaTwitter, FaInstagram, FaLinkedin, FaEnvelope, FaPhone, FaMapMarkerAlt, FaHeart, FaPaperPlane } from 'react-icons/fa';
import { useState } from 'react';
import toast from 'react-hot-toast';

const Footer = () => {
    const currentYear = new Date().getFullYear();
    const [email, setEmail] = useState('');

    const handleSubscribe = (e) => {
        e.preventDefault();
        if (email) {
            toast.success('Thank you for subscribing!');
            setEmail('');
        }
    };

    const socialLinks = [
        { icon: <FaFacebook />, href: '#', color: 'hover:bg-blue-600' },
        { icon: <FaTwitter />, href: '#', color: 'hover:bg-sky-500' },
        { icon: <FaInstagram />, href: '#', color: 'hover:bg-pink-600' },
        { icon: <FaLinkedin />, href: '#', color: 'hover:bg-blue-700' },
    ];

    return (
        <footer className="relative overflow-hidden">
            {/* Decorative Wave */}
            <div className="absolute top-0 left-0 right-0">
                <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V0H1380C1320 0 1200 0 1080 0C960 0 840 0 720 0C600 0 480 0 360 0C240 0 120 0 60 0H0V120Z"
                        fill="url(#gradient-wave)"
                    />
                    <defs>
                        <linearGradient id="gradient-wave" x1="0" y1="0" x2="1440" y2="0">
                            <stop offset="0%" stopColor="#f8fafc" />
                            <stop offset="50%" stopColor="#f1f5f9" />
                            <stop offset="100%" stopColor="#f8fafc" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>

            {/* Main Footer */}
            <div className="bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 pt-32 pb-8 relative">
                {/* Decorative Elements */}
                <div className="absolute top-20 left-10 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl"></div>
                <div className="absolute bottom-20 right-10 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl"></div>

                <div className="container-custom relative">
                    {/* Newsletter Section */}
                    <div className="mb-16 relative">
                        <div className="max-w-3xl mx-auto text-center">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-400 text-sm font-medium mb-4">
                                <FaEnvelope className="text-xs" />
                                Newsletter
                            </div>
                            <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                                Stay Updated with{' '}
                                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                                    Nikah Matrimony
                                </span>
                            </h3>
                            <p className="text-slate-400 mb-6">
                                Subscribe to receive the latest updates, success stories, and matchmaking tips
                            </p>
                            <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="flex-1 px-5 py-3.5 bg-white/5 border border-white/10 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-emerald-500/50 focus:bg-white/10 transition-all"
                                    required
                                />
                                <button
                                    type="submit"
                                    className="px-6 py-3.5 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-500/25"
                                >
                                    <FaPaperPlane />
                                    Subscribe
                                </button>
                            </form>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 mb-12">
                        {/* Brand Section */}
                        <div className="lg:col-span-1">
                            <Link to="/" className="inline-flex items-center gap-3 mb-6 group">
                                <div className="relative">
                                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl blur-lg opacity-60 group-hover:opacity-80 transition-opacity"></div>
                                    <div className="relative bg-gradient-to-r from-emerald-500 to-teal-500 p-2.5 rounded-xl">
                                        <FaMosque className="text-2xl text-white" />
                                    </div>
                                </div>
                                <div>
                                    <h2 className="text-2xl font-bold text-white">Nikah</h2>
                                    <p className="text-xs text-amber-400 font-medium -mt-0.5">Islamic Matrimony</p>
                                </div>
                            </Link>
                            <p className="text-slate-400 text-sm leading-relaxed mb-6">
                                Finding your life partner the halal way. We connect Muslim singles
                                who are serious about marriage, following Islamic principles.
                            </p>
                            <div className="flex gap-3">
                                {socialLinks.map((social, index) => (
                                    <a
                                        key={index}
                                        href={social.href}
                                        className={`w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 text-slate-400 hover:text-white ${social.color} transition-all duration-300 hover:scale-110`}
                                    >
                                        {social.icon}
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* Quick Links */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></span>
                                Quick Links
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    { to: '/', label: 'Home' },
                                    { to: '/biodatas', label: 'Browse Biodatas' },
                                    { to: '/about', label: 'About Us' },
                                    { to: '/contact', label: 'Contact Us' },
                                    { to: '/register', label: 'Register Now' },
                                ].map((link, index) => (
                                    <li key={index}>
                                        <Link
                                            to={link.to}
                                            className="text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group"
                                        >
                                            <span className="w-0 group-hover:w-2 h-0.5 bg-emerald-500 transition-all duration-300 rounded-full"></span>
                                            {link.label}
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Services */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></span>
                                Our Services
                            </h3>
                            <ul className="space-y-3">
                                {[
                                    'Profile Creation',
                                    'Partner Search',
                                    'Premium Membership',
                                    'Verified Profiles',
                                    'Privacy Protection',
                                ].map((service, index) => (
                                    <li key={index} className="text-slate-400 flex items-center gap-2">
                                        <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></span>
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Contact Info */}
                        <div>
                            <h3 className="text-lg font-bold text-white mb-6 flex items-center gap-2">
                                <span className="w-8 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"></span>
                                Contact Us
                            </h3>
                            <ul className="space-y-4">
                                <li className="flex items-start gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 flex-shrink-0">
                                        <FaMapMarkerAlt />
                                    </div>
                                    <span className="text-slate-400 text-sm">
                                        House 123, Road 45, Gulshan-2, Dhaka 1212, Bangladesh
                                    </span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 flex-shrink-0">
                                        <FaPhone />
                                    </div>
                                    <span className="text-slate-400 text-sm">+880 1700-000000</span>
                                </li>
                                <li className="flex items-center gap-4">
                                    <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400 flex-shrink-0">
                                        <FaEnvelope />
                                    </div>
                                    <span className="text-slate-400 text-sm">info@nikahmatrimony.com</span>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Bottom Section */}
                    <div className="border-t border-white/10 pt-8">
                        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                            <p className="text-slate-500 text-sm text-center md:text-left">
                                © {currentYear} Nikah Islamic Matrimony. Made with{' '}
                                <FaHeart className="inline text-red-500" /> in Bangladesh
                            </p>
                            <div className="flex gap-6 text-sm">
                                <Link to="/privacy" className="text-slate-500 hover:text-emerald-400 transition-colors">
                                    Privacy Policy
                                </Link>
                                <Link to="/terms" className="text-slate-500 hover:text-emerald-400 transition-colors">
                                    Terms of Service
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Islamic Quote */}
                <div className="mt-8 py-6 bg-gradient-to-r from-emerald-600/10 via-emerald-500/5 to-teal-500/10 border-t border-white/5">
                    <div className="container-custom">
                        <p className="text-center text-emerald-400/80 text-sm italic">
                            "And among His signs is that He created for you mates from among yourselves,
                            that you may find tranquility in them."
                            <span className="block mt-1 text-amber-400/70 font-medium not-italic">— Quran 30:21</span>
                        </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
