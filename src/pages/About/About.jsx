import { FaMosque, FaHeart, FaShieldAlt, FaUsers, FaCheckCircle } from 'react-icons/fa';

const About = () => {
    const values = [
        {
            icon: <FaShieldAlt className="text-3xl" />,
            title: 'Privacy & Security',
            description: 'Your personal information is protected with the highest level of security. We never share your data without consent.'
        },
        {
            icon: <FaCheckCircle className="text-3xl" />,
            title: 'Verified Profiles',
            description: 'All profiles are manually verified to ensure authenticity and genuine intentions for marriage.'
        },
        {
            icon: <FaHeart className="text-3xl" />,
            title: 'Islamic Values',
            description: 'Our platform is built on Islamic principles, promoting halal matchmaking for Muslim singles.'
        },
        {
            icon: <FaUsers className="text-3xl" />,
            title: 'Community Trust',
            description: 'Trusted by thousands of Muslim families who have successfully found life partners through our platform.'
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="gradient-islamic py-20 text-white">
                <div className="container-custom text-center">
                    <FaMosque className="text-6xl mx-auto mb-6 text-amber-400" />
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">About Nikah Matrimony</h1>
                    <p className="text-xl text-green-100 max-w-2xl mx-auto">
                        Connecting Muslim hearts for blessed marriages since 2020
                    </p>
                </div>
            </section>

            {/* Mission Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
                            <p className="text-gray-600 mb-4 leading-relaxed">
                                At Nikah Matrimony, our mission is to help Muslim singles find their life partners
                                in accordance with Islamic principles. We believe that marriage is a beautiful
                                blessing from Allah, and we strive to make the process of finding a spouse easier,
                                safer, and more accessible.
                            </p>
                            <p className="text-gray-600 leading-relaxed">
                                We are committed to providing a platform where individuals and families can
                                connect with confidence, knowing that all profiles are verified and that their
                                privacy is protected. Our goal is to facilitate meaningful connections that
                                lead to blessed, lifelong marriages.
                            </p>
                        </div>
                        <div className="relative">
                            <img
                                src="https://images.unsplash.com/photo-1519741497674-611481863552?w=600"
                                alt="Islamic Wedding"
                                className="rounded-2xl shadow-xl"
                            />
                            <div className="absolute -bottom-6 -left-6 bg-green-700 text-white p-6 rounded-xl shadow-lg">
                                <p className="text-3xl font-bold">1000+</p>
                                <p className="text-sm">Successful Marriages</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Values Section */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Our Values</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            The core principles that guide everything we do
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {values.map((value, index) => (
                            <div key={index} className="card p-6 text-center hover:shadow-xl transition-shadow">
                                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-700">
                                    {value.icon}
                                </div>
                                <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                                <p className="text-gray-600 text-sm">{value.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Quran Quote Section */}
            <section className="py-16 gradient-gold text-white">
                <div className="container-custom text-center">
                    <p className="text-2xl md:text-3xl font-arabic mb-6">
                        وَمِنْ آيَاتِهِ أَنْ خَلَقَ لَكُم مِّنْ أَنفُسِكُمْ أَزْوَاجًا لِّتَسْكُنُوا إِلَيْهَا
                    </p>
                    <p className="text-lg italic mb-4">
                        "And among His signs is that He created for you mates from among yourselves,
                        that you may find tranquility in them."
                    </p>
                    <p className="font-semibold">- Surah Ar-Rum (30:21)</p>
                </div>
            </section>

            {/* Team Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose Us?</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            We are dedicated to helping you find your perfect match
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        <div className="text-center">
                            <div className="text-5xl font-bold text-green-700 mb-2">50K+</div>
                            <p className="text-gray-600">Registered Members</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-green-700 mb-2">1000+</div>
                            <p className="text-gray-600">Successful Marriages</p>
                        </div>
                        <div className="text-center">
                            <div className="text-5xl font-bold text-green-700 mb-2">7</div>
                            <p className="text-gray-600">Divisions Covered</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default About;
