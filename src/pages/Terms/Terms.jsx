import { Helmet } from 'react-helmet-async';
import { FaFileContract, FaUserCheck, FaMoneyBillWave, FaBan, FaGavel, FaHandshake } from 'react-icons/fa';

const Terms = () => {
    const sections = [
        {
            icon: <FaUserCheck />,
            title: 'Account Registration',
            content: [
                'You must be at least 18 years old to use this service',
                'You must provide accurate and truthful information',
                'You are responsible for maintaining account security',
                'One person may only create one account',
                'Accounts are non-transferable'
            ]
        },
        {
            icon: <FaHandshake />,
            title: 'User Conduct',
            content: [
                'All interactions must adhere to Islamic principles and values',
                'Respectful communication is required at all times',
                'Harassment, abuse, or inappropriate behavior is strictly prohibited',
                'Users must have genuine intentions for marriage',
                'Misrepresentation of identity or information is not allowed'
            ]
        },
        {
            icon: <FaMoneyBillWave />,
            title: 'Premium Services & Payment',
            content: [
                'Premium memberships are subscription-based services',
                'Payments are processed securely through our payment partners',
                'Subscriptions automatically renew unless cancelled',
                'Refund requests are considered on a case-by-case basis',
                'Prices may change with 30 days notice to existing subscribers'
            ]
        },
        {
            icon: <FaBan />,
            title: 'Prohibited Activities',
            content: [
                'Creating fake profiles or providing false information',
                'Soliciting money or financial information from other users',
                'Sharing inappropriate content or images',
                'Using the platform for commercial or promotional purposes',
                'Attempting to hack, abuse, or manipulate the platform',
                'Violating any applicable laws or regulations'
            ]
        },
        {
            icon: <FaGavel />,
            title: 'Disclaimers & Limitations',
            content: [
                'We facilitate connections but do not guarantee marriage outcomes',
                'Users are responsible for their own decisions and interactions',
                'We are not liable for relationships formed through the platform',
                'We verify information to the best of our ability but cannot guarantee accuracy',
                'Service availability may be subject to technical limitations'
            ]
        },
        {
            icon: <FaFileContract />,
            title: 'Account Termination',
            content: [
                'We reserve the right to suspend or terminate accounts that violate these terms',
                'Users may delete their accounts at any time',
                'Upon termination, access to premium features will cease',
                'We may retain certain information as required by law',
                'Repeated violations may result in permanent ban'
            ]
        }
    ];

    return (
        <>
            <Helmet>
                <title>Terms of Service - Nikah Islamic Matrimony</title>
                <meta name="description" content="Read our Terms of Service to understand your rights and responsibilities when using Nikah Matrimony platform." />
            </Helmet>

            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 dark:from-slate-900 dark:via-emerald-900/10 dark:to-teal-900/10 py-12 px-4">
                <div className="container-custom max-w-5xl">
                    {/* Header */}
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-4">
                            <FaFileContract className="text-xs" />
                            <span>Legal Agreement</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-bold text-slate-800 dark:text-white mb-4">
                            Terms of Service
                        </h1>
                        <p className="text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
                            By using Nikah Matrimony, you agree to these terms and conditions. Please read them carefully before using our services.
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

                    {/* Acceptance Statement */}
                    <div className="mt-12 p-6 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-2xl border border-emerald-500/20">
                        <p className="text-slate-700 dark:text-slate-300 text-center">
                            <strong>Acceptance of Terms:</strong> By creating an account and using Nikah Matrimony, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
                        </p>
                    </div>

                    {/* Contact Section */}
                    <div className="mt-6 text-center text-slate-600 dark:text-slate-400">
                        <p>
                            Questions about our terms? Contact us at{' '}
                            <a href="mailto:legal@nikahmatrimony.com" className="text-emerald-600 font-semibold hover:underline">
                                legal@nikahmatrimony.com
                            </a>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Terms;
