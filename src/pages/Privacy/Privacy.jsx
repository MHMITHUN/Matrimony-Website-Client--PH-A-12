import { Helmet } from 'react-helmet-async';
import { FaShieldAlt, FaLock, FaUserShield, FaDatabase, FaCookie, FaEnvelope } from 'react-icons/fa';

const Privacy = () => {
    const sections = [
        {
            icon: <FaDatabase />,
            title: 'Information We Collect',
            content: [
                'Personal information you provide when creating your profile (name, email, age, location)',
                'Profile pictures and biographical information',
                'Communication preferences and contact information',
                'Payment information for premium services (processed securely)',
                'Usage data and analytics to improve our services'
            ]
        },
        {
            icon: <FaLock />,
            title: 'How We Use Your Information',
            content: [
                'To create and maintain your profile on our platform',
                'To facilitate matchmaking and connections with other users',
                'To process payments for premium memberships',
                'To send important updates about our services',
                'To improve our platform and user experience',
                'To ensure compliance with Islamic principles in matchmaking'
            ]
        },
        {
            icon: <FaUserShield />,
            title: 'Data Protection',
            content: [
                'We use industry-standard encryption to protect your data',
                'Your personal information is never sold to third parties',
                'We implement strict access controls and security measures',
                'Regular security audits and updates to our systems',
                'Compliance with data protection regulations'
            ]
        },
        {
            icon: <FaCookie />,
            title: 'Cookies and Tracking',
            content: [
                'We use essential cookies to maintain your session',
                'Analytics cookies help us understand user behavior',
                'You can control cookie preferences in your browser',
                'Third-party services may use cookies for payment processing'
            ]
        },
        {
            icon: <FaShieldAlt />,
            title: 'Your Rights',
            content: [
                'Access and download your personal data at any time',
                'Request correction of inaccurate information',
                'Delete your account and associated data',
                'Opt-out of marketing communications',
                'Control your privacy settings and visibility'
            ]
        },
        {
            icon: <FaEnvelope />,
            title: 'Contact Us',
            content: [
                'If you have questions about our privacy practices, contact us at:',
                'Email: privacy@nikahmatrimony.com',
                'Phone: +880 1700-000000',
                'Address: House 123, Road 45, Gulshan-2, Dhaka 1212, Bangladesh'
            ]
        }
    ];

    return (
        <>
            <Helmet>
                <title>Privacy Policy - Nikah Islamic Matrimony</title>
                <meta name="description" content="Learn how Nikah Matrimony protects your privacy and handles your personal information securely." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 dark:from-slate-900 dark:via-emerald-900/10 dark:to-teal-900/10 py-12 px-4">
                <div className="container-custom max-w-5xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-4">
                            <FaShieldAlt className="text-xs" />
                            <span>Privacy & Security</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
                            Privacy Policy
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            At Nikah Matrimony, we are committed to protecting your privacy and ensuring your personal information is handled securely and responsibly.
                        </p>
                        <p className="text-sm text-slate-500 dark:text-slate-400 mt-4">
                            Last Updated: December 6, 2025
                        </p>
                    </div>

                    {/* Content Sections */}
                    <div className="space-y-6">
                        {sections.map((section, index) => (
                            <div
                                key={index}
                                className="bg-white/80 dark:bg-slate-800/80 backdrop-blur-xl rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/30 border border-white/50 dark:border-slate-700 p-8 hover:shadow-xl transition-shadow"
                            >
                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xl flex-shrink-0">
                                        {section.icon}
                                    </div>
                                    <h2 className="text-2xl font-bold text-slate-800 dark:text-white mt-1">
                                        {section.title}
                                    </h2>
                                </div>
                                <ul className="space-y-3 ml-16">
                                    {section.content.map((item, idx) => (
                                        <li key={idx} className="flex items-start gap-3 text-slate-600 dark:text-slate-300">
                                            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full mt-2 flex-shrink-0"></span>
                                            <span>{item}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        ))}
                    </div>

                    {/* Footer Note */}
                    <div className="mt-12 p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20">
                        <p className="text-slate-700 dark:text-slate-300 text-center">
                            <strong>Note:</strong> This privacy policy may be updated periodically. We will notify you of any significant changes via email or through our platform.
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Privacy;
