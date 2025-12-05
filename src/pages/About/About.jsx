import { FaMosque, FaHeart, FaShieldAlt, FaUsers, FaCheckCircle, FaStar, FaQuoteLeft, FaSparkles } from 'react-icons/fa';

const About = () => {
    const values = [
        {
            icon: <FaShieldAlt />,
            title: 'Privacy & Security',
            description: 'Your personal information is protected with the highest level of security. We never share your data without consent.',
            color: 'from-blue-500 to-indigo-500'
        },
        {
            icon: <FaCheckCircle />,
            title: 'Verified Profiles',
            description: 'All profiles are manually verified to ensure authenticity and genuine intentions for marriage.',
            color: 'from-emerald-500 to-teal-500'
        },
        {
            icon: <FaHeart />,
            title: 'Islamic Values',
            description: 'Our platform is built on Islamic principles, promoting halal matchmaking for Muslim singles.',
            color: 'from-pink-500 to-rose-500'
        },
        {
            icon: <FaUsers />,
            title: 'Community Trust',
            description: 'Trusted by thousands of Muslim families who have successfully found life partners through our platform.',
            color: 'from-amber-500 to-orange-500'
        }
    ];

    const stats = [
        { value: '50K+', label: 'Registered Members', delay: '0ms' },
        { value: '1000+', label: 'Successful Marriages', delay: '100ms' },
        { value: '7', label: 'Divisions Covered', delay: '200ms' },
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                {/* Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>

                {/* Decorative Elements */}
                <div className="absolute top-10 left-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 right-10 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"></div>

                <div className="container-custom relative text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-amber-300 text-sm font-medium mb-6 animate-fade-in-down">
                        <FaSparkles className="text-xs" />
                        <span>Since 2020</span>
                    </div>
                    <div className="w-20 h-20 bg-gradient-to-br from-amber-400 to-amber-500 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-amber-500/30 animate-float">
                        <FaMosque className="text-4xl text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                        About <span className="text-amber-300">Nikah</span> Matrimony
                    </h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Connecting Muslim hearts for blessed marriages through a platform built on trust, transparency, and Islamic values
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-20 bg-white relative overflow-hidden">
                <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl -translate-y-1/2"></div>

                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                        <div className="animate-fade-in-up">
                            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-6">
                                <FaHeart className="text-xs" />
                                <span>Our Mission</span>
                            </div>
                            <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-6">
                                Helping You Find Your <span className="text-gradient-islamic">Blessed Partner</span>
                            </h2>
                            <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                                At Nikah Matrimony, our mission is to help Muslim singles find their life partners
                                in accordance with Islamic principles. We believe that marriage is a beautiful
                                blessing from Allah, and we strive to make the process of finding a spouse easier,
                                safer, and more accessible.
                            </p>
                            <p className="text-slate-600 leading-relaxed text-lg">
                                We are committed to providing a platform where individuals and families can
                                connect with confidence, knowing that all profiles are verified and that their
                                privacy is protected. Our goal is to facilitate meaningful connections that
                                lead to blessed, lifelong marriages.
                            </p>
                        </div>

                        <div className="relative animate-fade-in-up delay-200">
                            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl rotate-3 scale-105 opacity-20"></div>
                            <img
                                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600"
                                alt="Islamic Wedding"
                                className="relative rounded-3xl shadow-2xl w-full"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-6 rounded-2xl shadow-xl shadow-emerald-500/30">
                                <p className="text-4xl font-bold">1000+</p>
                                <p className="text-emerald-100">Successful Marriages</p>
                            </div>
                            <div className="absolute -top-4 -right-4 bg-gradient-to-r from-amber-500 to-amber-400 text-white p-4 rounded-xl shadow-lg animate-pulse-glow">
                                <FaHeart className="text-2xl" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-20 bg-gradient-to-b from-slate-50 to-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-4">
                            <FaStar className="text-xs" />
                            <span>What We Stand For</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Our Core Values</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            The fundamental principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div
                                key={index}
                                className="group bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-6 text-white text-2xl shadow-lg group-hover:scale-110 transition-transform`}>
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-3">{value.title}</h3>
                                <p className="text-slate-500 leading-relaxed">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quran Quote Section */}
            <section className="py-20 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>

                <div className="container-custom relative text-center">
                    <FaQuoteLeft className="text-5xl text-white/30 mx-auto mb-6" />
                    <p className="text-3xl md:text-4xl font-arabic text-white mb-6 leading-relaxed">
                        وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
                    </p>
                    <p className="text-xl text-white/90 italic mb-4 max-w-3xl mx-auto">
                        "And among His signs is that He created for you mates from among yourselves,
                        that you may find tranquility in them."
                    </p>
                    <p className="text-lg font-semibold text-white">— Surah Ar-Rum (30:21)</p>
                </div>
            </section>

            {/* Stats Section */}
            <section className="py-20 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-16">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-4">
                            <FaCheckCircle className="text-xs" />
                            <span>Our Impact</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4">Why Choose Us?</h2>
                        <p className="text-slate-600 max-w-2xl mx-auto text-lg">
                            We are dedicated to helping you find your perfect match
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {stats.map((stat, index) => (
                            <div
                                key={index}
                                className="text-center bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-3xl p-10 border border-slate-100 hover:border-emerald-200 transition-all animate-fade-in-up"
                                style={{ animationDelay: stat.delay }}
                            >
                                <div className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                                    {stat.value}
                                </div>
                                <p className="text-slate-600 text-lg font-medium">{stat.label}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
