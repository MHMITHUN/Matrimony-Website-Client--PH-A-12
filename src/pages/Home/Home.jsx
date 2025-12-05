import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaSearch, FaHeart, FaStar, FaUsers, FaMale, FaFemale, FaRing, FaArrowRight, FaQuoteLeft, FaCrown, FaPlay, FaCheckCircle } from 'react-icons/fa';
import { biodataAPI, statsAPI, successStoryAPI } from '../../api/api';

// Hero Section Component with stunning visuals
const HeroSection = () => {
    const slides = [
        {
            image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=1600',
            title: 'Find Your Perfect Life Partner',
            subtitle: 'Begin your journey towards a blessed marriage the Islamic way'
        },
        {
            image: 'https://images.unsplash.com/photo-1529634806980-85c3dd6d34ac?w=1600',
            title: 'Trusted by Thousands',
            subtitle: 'Join our growing community of Muslims seeking marriage'
        },
        {
            image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?w=1600',
            title: 'Make Your Nikah Happen',
            subtitle: 'We help you find a compatible partner based on Islamic values'
        }
    ];

    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">
            {/* Background Images */}
            {slides.map((slide, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-all duration-1000 ${index === currentSlide ? 'opacity-100 scale-100' : 'opacity-0 scale-105'
                        }`}
                >
                    <div
                        className="absolute inset-0 bg-cover bg-center"
                        style={{ backgroundImage: `url(${slide.image})` }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-slate-900/95 via-emerald-900/90 to-slate-900/95" />
                </div>
            ))}

            {/* Decorative Elements */}
            <div className="absolute top-20 right-20 w-72 h-72 bg-emerald-500/20 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 left-20 w-96 h-96 bg-amber-500/20 rounded-full blur-3xl animate-pulse delay-500"></div>

            {/* Floating Hearts */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                {[...Array(6)].map((_, i) => (
                    <FaHeart
                        key={i}
                        className={`absolute text-white/5 animate-float`}
                        style={{
                            fontSize: `${Math.random() * 40 + 20}px`,
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${i * 0.5}s`,
                            animationDuration: `${3 + Math.random() * 2}s`
                        }}
                    />
                ))}
            </div>

            {/* Content */}
            <div className="relative container-custom py-20 mt-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div className="text-white animate-fade-in-up">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-md rounded-full text-emerald-300 text-sm font-medium mb-6">
                            <FaStar className="animate-pulse" />
                            <span>بِسْمِ اللَّهِ الرَّحْمَنِ الرَّحِيم</span>
                        </div>

                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                            {slides[currentSlide].title.split(' ').map((word, i) => (
                                <span key={i}>
                                    {i === 2 || i === 3 ? (
                                        <span className="bg-gradient-to-r from-amber-400 to-amber-300 bg-clip-text text-transparent">{word} </span>
                                    ) : (
                                        word + ' '
                                    )}
                                </span>
                            ))}
                        </h1>

                        <p className="text-xl md:text-2xl mb-8 text-emerald-100/80 max-w-lg">
                            {slides[currentSlide].subtitle}
                        </p>

                        {/* Features */}
                        <div className="flex flex-wrap gap-4 mb-8">
                            {['Verified Profiles', 'Islamic Values', '100% Secure'].map((feature, i) => (
                                <div key={i} className="flex items-center gap-2 text-emerald-200/70">
                                    <FaCheckCircle className="text-emerald-400" />
                                    <span className="text-sm">{feature}</span>
                                </div>
                            ))}
                        </div>

                        <div className="flex flex-wrap gap-4">
                            <Link
                                to="/register"
                                className="group relative px-8 py-4 bg-gradient-to-r from-amber-500 to-amber-400 text-slate-900 font-bold rounded-2xl overflow-hidden transition-all hover:shadow-2xl hover:shadow-amber-500/30 hover:scale-105"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Get Started Free <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                                </span>
                            </Link>
                            <Link
                                to="/biodatas"
                                className="group px-8 py-4 border-2 border-white/30 text-white font-semibold rounded-2xl backdrop-blur-sm hover:bg-white/10 hover:border-white/50 transition-all flex items-center gap-2"
                            >
                                <FaSearch /> Browse Biodatas
                            </Link>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="hidden lg:grid grid-cols-2 gap-4">
                        {[
                            { icon: <FaUsers />, value: '50K+', label: 'Active Members', color: 'from-emerald-500 to-teal-500' },
                            { icon: <FaRing />, value: '1000+', label: 'Marriages', color: 'from-amber-500 to-orange-500' },
                            { icon: <FaMale />, value: '25K+', label: 'Male Profiles', color: 'from-blue-500 to-indigo-500' },
                            { icon: <FaFemale />, value: '25K+', label: 'Female Profiles', color: 'from-pink-500 to-rose-500' },
                        ].map((stat, i) => (
                            <div
                                key={i}
                                className={`bg-white/10 backdrop-blur-xl rounded-2xl p-6 border border-white/10 hover:bg-white/15 transition-all hover:scale-105 animate-fade-in-up`}
                                style={{ animationDelay: `${i * 100}ms` }}
                            >
                                <div className={`w-12 h-12 rounded-xl bg-gradient-to-r ${stat.color} flex items-center justify-center text-white text-xl mb-4`}>
                                    {stat.icon}
                                </div>
                                <p className="text-3xl font-bold text-white mb-1">{stat.value}</p>
                                <p className="text-emerald-200/70 text-sm">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Slide Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3">
                {slides.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentSlide(index)}
                        className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-amber-400 w-8' : 'bg-white/30 w-2 hover:bg-white/50'
                            }`}
                    />
                ))}
            </div>
        </section>
    );
};

// Premium Members Section
const PremiumMembersSection = () => {
    const [sortOrder, setSortOrder] = useState('asc');

    const { data: premiumBiodatas = [], isLoading } = useQuery({
        queryKey: ['premiumBiodatas', sortOrder],
        queryFn: async () => {
            const response = await biodataAPI.getPremium({ sort: sortOrder, limit: 6 });
            return response.data;
        }
    });

    return (
        <section className="py-24 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
            {/* Decorative */}
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500/5 rounded-full blur-3xl"></div>
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-amber-500/5 rounded-full blur-3xl"></div>

            <div className="container-custom relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-600 text-sm font-medium mb-4">
                        <FaCrown /> Premium Members
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Meet Our{' '}
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Verified Profiles
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Connect with genuine individuals who are seriously looking for their life partners
                    </p>

                    {/* Sort Dropdown */}
                    <div className="flex justify-center mt-8">
                        <select
                            value={sortOrder}
                            onChange={(e) => setSortOrder(e.target.value)}
                            className="px-6 py-3 bg-white border-2 border-gray-200 rounded-xl text-gray-700 font-medium focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 transition-all cursor-pointer"
                        >
                            <option value="asc">Sort by Age: Low to High</option>
                            <option value="desc">Sort by Age: High to Low</option>
                        </select>
                    </div>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="spinner-lg"></div>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {premiumBiodatas.map((biodata, index) => (
                            <BiodataCard key={biodata._id} biodata={biodata} index={index} />
                        ))}
                    </div>
                )}

                <div className="text-center mt-12">
                    <Link
                        to="/biodatas"
                        className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-2xl hover:shadow-xl hover:shadow-emerald-500/20 transition-all hover:scale-105"
                    >
                        View All Biodatas <FaArrowRight />
                    </Link>
                </div>
            </div>
        </section>
    );
};

// Biodata Card Component
const BiodataCard = ({ biodata, index }) => (
    <div
        className="group bg-white rounded-3xl overflow-hidden shadow-lg shadow-black/5 border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
        style={{ animationDelay: `${index * 100}ms` }}
    >
        <div className="relative h-72 overflow-hidden">
            <img
                src={biodata.profileImage || 'https://via.placeholder.com/300x300?text=No+Image'}
                alt={`Biodata ${biodata.biodataId}`}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

            {/* Badges */}
            <div className="absolute top-4 left-4 flex gap-2">
                <span className="px-3 py-1.5 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                    <FaCrown className="text-[10px]" /> Premium
                </span>
            </div>
            <div className="absolute top-4 right-4">
                <span className={`px-3 py-1.5 rounded-full text-xs font-bold ${biodata.biodataType === 'Male'
                    ? 'bg-blue-500 text-white'
                    : 'bg-pink-500 text-white'
                    }`}>
                    {biodata.biodataType}
                </span>
            </div>

            {/* Bottom Info */}
            <div className="absolute bottom-4 left-4 right-4">
                <p className="text-white/80 text-sm mb-1">ID: {biodata.biodataId}</p>
                <h3 className="text-white font-bold text-lg">{biodata.occupation}</h3>
            </div>
        </div>

        <div className="p-6">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-gray-600">
                    <span className="text-2xl font-bold text-emerald-600">{biodata.age}</span>
                    <span className="text-sm">years old</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-sm">
                    📍 {biodata.permanentDivision}
                </div>
            </div>
            <Link
                to={`/biodata/${biodata.biodataId}`}
                className="block w-full py-3 text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/30 transition-all"
            >
                View Profile
            </Link>
        </div>
    </div>
);

// How It Works Section
const HowItWorksSection = () => {
    const steps = [
        {
            icon: <FaUsers className="text-3xl" />,
            title: 'Create Your Profile',
            description: 'Register and create your biodata with accurate information about yourself.',
            color: 'from-emerald-500 to-teal-500'
        },
        {
            icon: <FaSearch className="text-3xl" />,
            title: 'Search Partners',
            description: 'Browse through verified profiles and use filters to find your match.',
            color: 'from-blue-500 to-indigo-500'
        },
        {
            icon: <FaHeart className="text-3xl" />,
            title: 'Connect',
            description: 'Request contact information and start meaningful conversations.',
            color: 'from-pink-500 to-rose-500'
        },
        {
            icon: <FaRing className="text-3xl" />,
            title: 'Get Married',
            description: 'Find your compatible partner and take the step towards Nikah.',
            color: 'from-amber-500 to-orange-500'
        }
    ];

    return (
        <section className="py-24 bg-gradient-to-r from-emerald-600 via-emerald-500 to-teal-600 relative overflow-hidden">
            {/* Decorative Pattern */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute inset-0" style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
                }}></div>
            </div>

            <div className="container-custom relative">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-4">
                        <FaPlay className="text-xs" /> How It Works
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                        Four Simple Steps to <span className="text-amber-300">Your Soulmate</span>
                    </h2>
                    <p className="text-emerald-100/80 text-lg max-w-2xl mx-auto">
                        Our simple process helps you find your perfect life partner the halal way
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                    {steps.map((step, index) => (
                        <div key={index} className="relative group">
                            {/* Connector Line */}
                            {index < steps.length - 1 && (
                                <div className="hidden lg:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-white/30 to-transparent"></div>
                            )}

                            <div className="text-center">
                                <div className="relative inline-block mb-6">
                                    <div className={`w-24 h-24 bg-gradient-to-r ${step.color} rounded-2xl flex items-center justify-center text-white shadow-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-300`}>
                                        {step.icon}
                                    </div>
                                    <div className="absolute -top-2 -right-2 w-8 h-8 bg-white text-emerald-600 rounded-full flex items-center justify-center font-bold shadow-lg">
                                        {index + 1}
                                    </div>
                                </div>
                                <h3 className="text-xl font-bold text-white mb-3">{step.title}</h3>
                                <p className="text-emerald-100/70 text-sm">{step.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Success Counter Section
const SuccessCounterSection = () => {
    const { data: stats, isLoading } = useQuery({
        queryKey: ['publicStats'],
        queryFn: async () => {
            const response = await statsAPI.getPublic();
            return response.data;
        }
    });

    const counters = [
        { icon: <FaUsers />, value: stats?.totalBiodata || 0, label: 'Total Biodatas', color: 'from-emerald-500 to-teal-500' },
        { icon: <FaMale />, value: stats?.maleBiodata || 0, label: 'Male Biodatas', color: 'from-blue-500 to-indigo-500' },
        { icon: <FaFemale />, value: stats?.femaleBiodata || 0, label: 'Female Biodatas', color: 'from-pink-500 to-rose-500' },
        { icon: <FaRing />, value: stats?.marriagesCompleted || 0, label: 'Marriages Completed', color: 'from-amber-500 to-orange-500' },
    ];

    return (
        <section className="py-24 bg-gradient-to-b from-white to-slate-50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-4">
                        <FaStar /> Our Success
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                            Success
                        </span>{' '}
                        in Numbers
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Alhamdulillah! We are proud to be part of so many beautiful marriages
                    </p>
                </div>

                <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                    {counters.map((counter, index) => (
                        <div
                            key={index}
                            className="bg-white rounded-3xl p-8 shadow-lg shadow-black/5 border border-gray-100 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-500 hover:-translate-y-2 text-center group"
                        >
                            <div className={`w-16 h-16 mx-auto mb-6 bg-gradient-to-r ${counter.color} rounded-2xl flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform`}>
                                {counter.icon}
                            </div>
                            <div className="text-4xl md:text-5xl font-bold text-gray-800 mb-2">
                                {isLoading ? '...' : counter.value.toLocaleString()}
                            </div>
                            <div className="text-gray-600">{counter.label}</div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

// Success Stories Section
const SuccessStoriesSection = () => {
    const { data: stories = [], isLoading } = useQuery({
        queryKey: ['successStories'],
        queryFn: async () => {
            const response = await successStoryAPI.getAll();
            return response.data;
        }
    });

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className={index < rating ? 'text-amber-400' : 'text-gray-200'}
            />
        ));
    };

    return (
        <section className="py-24 bg-slate-50">
            <div className="container-custom">
                <div className="text-center mb-16">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 rounded-full text-pink-600 text-sm font-medium mb-4">
                        <FaHeart /> Success Stories
                    </div>
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                        Real Stories,{' '}
                        <span classNam="bg-gradient-to-r from-pink-500 to-rose-500 bg-clip-text text-transparent">
                            Real Happiness
                        </span>
                    </h2>
                    <p className="text-gray-600 text-lg max-w-2xl mx-auto">
                        Hear from couples who found their life partners through our platform
                    </p>
                </div>

                {isLoading ? (
                    <div className="flex justify-center py-12">
                        <div className="spinner-lg"></div>
                    </div>
                ) : stories.length === 0 ? (
                    <div className="text-center py-16 bg-white rounded-3xl shadow-lg">
                        <FaHeart className="text-6xl text-gray-200 mx-auto mb-4" />
                        <h3 className="text-xl font-bold text-gray-700 mb-2">No Success Stories Yet</h3>
                        <p className="text-gray-500">Be the first to share your beautiful story!</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {stories.slice(0, 6).map((story, index) => (
                            <div
                                key={story._id}
                                className="bg-white rounded-3xl p-8 shadow-lg shadow-black/5 hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 relative group"
                            >
                                <FaQuoteLeft className="absolute top-6 right-6 text-4xl text-emerald-100" />

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="relative">
                                        <img
                                            src={story.coupleImage || 'https://via.placeholder.com/100x100?text=Couple'}
                                            alt="Couple"
                                            className="w-16 h-16 rounded-2xl object-cover ring-4 ring-emerald-100"
                                        />
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                                            <FaHeart className="text-white text-xs" />
                                        </div>
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-1 mb-1">
                                            {renderStars(story.reviewStar)}
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            Married: {new Date(story.marriageDate).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long'
                                            })}
                                        </p>
                                    </div>
                                </div>

                                <p className="text-gray-600 italic leading-relaxed line-clamp-4">
                                    "{story.successStoryText}"
                                </p>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

// CTA Section
const CTASection = () => (
    <section className="py-24 bg-gradient-to-r from-amber-500 via-amber-400 to-orange-500 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute inset-0">
            <div className="absolute top-0 left-0 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        </div>

        <div className="container-custom text-center relative">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium mb-6">
                <FaRing /> Start Your Journey
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6">
                Ready to Find Your <span className="text-slate-900">Soulmate?</span>
            </h2>
            <p className="text-white/90 max-w-2xl mx-auto mb-10 text-lg">
                Join thousands of Muslims who have found their life partners through our platform.
                Start your journey towards a blessed marriage today.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
                <Link
                    to="/register"
                    className="group px-10 py-4 bg-slate-900 text-white font-bold rounded-2xl hover:bg-slate-800 transition-all hover:scale-105 flex items-center gap-2"
                >
                    Create Your Profile <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                    to="/biodatas"
                    className="px-10 py-4 bg-white/20 backdrop-blur-sm text-white font-semibold rounded-2xl border-2 border-white/30 hover:bg-white/30 transition-all"
                >
                    Browse First
                </Link>
            </div>
        </div>
    </section>
);

// Main Home Page Component
const Home = () => {
    return (
        <div className="pt-16 md:pt-20">
            <HeroSection />
            <PremiumMembersSection />
            <HowItWorksSection />
            <SuccessCounterSection />
            <SuccessStoriesSection />
            <CTASection />
        </div>
    );
};

export default Home;
