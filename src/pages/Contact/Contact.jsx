import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane, FaQuestionCircle, FaChevronDown, FaStar } from 'react-icons/fa';
import toast from 'react-hot-toast';
import { contactMessageAPI } from '../../api/api';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);
    const [openFaq, setOpenFaq] = useState(null);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            await contactMessageAPI.send(formData);
            toast.success('Message sent successfully! We will get back to you soon.');
            setFormData({ name: '', email: '', subject: '', message: '' });
        } catch (error) {
            console.error('Error sending message:', error);
            toast.error('Failed to send message. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    const contactInfo = [
        {
            icon: <FaMapMarkerAlt />,
            title: 'Visit Us',
            lines: ['House 123, Road 45', 'Gulshan-2, Dhaka 1212', 'Bangladesh'],
            color: 'from-blue-500 to-indigo-500'
        },
        {
            icon: <FaPhone />,
            title: 'Call Us',
            lines: ['+880 1700-000000', '+880 1800-000000'],
            color: 'from-emerald-500 to-teal-500'
        },
        {
            icon: <FaEnvelope />,
            title: 'Email Us',
            lines: ['info@nikahmatrimony.com', 'support@nikahmatrimony.com'],
            color: 'from-pink-500 to-rose-500'
        },
        {
            icon: <FaClock />,
            title: 'Working Hours',
            lines: ['Saturday - Thursday', '9:00 AM - 6:00 PM'],
            color: 'from-amber-500 to-orange-500'
        }
    ];

    const faqs = [
        {
            question: 'How does Nikah Matrimony work?',
            answer: 'Create your profile, browse through verified biodatas, and connect with potential matches. Premium members can directly view contact information.'
        },
        {
            question: 'Is my information safe?',
            answer: 'Absolutely! We use industry-standard security measures to protect your personal information. Your contact details are only visible to premium members or upon request.'
        },
        {
            question: 'How can I become a premium member?',
            answer: 'You can request premium membership from your dashboard. Once approved by our admin team, you will have access to all contact information and premium features.'
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="relative py-24 md:py-32 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-600 via-teal-600 to-emerald-700"></div>
                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.05%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>

                {/* Decorative Elements */}
                <div className="absolute top-10 right-10 w-72 h-72 bg-amber-400/20 rounded-full blur-3xl"></div>
                <div className="absolute bottom-10 left-10 w-96 h-96 bg-teal-300/20 rounded-full blur-3xl"></div>

                <div className="container-custom relative text-center">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full text-amber-300 text-sm font-medium mb-6 animate-fade-in-down">
                        <FaStar className="text-xs" />
                        <span>Get in Touch</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 animate-fade-in-up">
                        Contact <span className="text-amber-300">Us</span>
                    </h1>
                    <p className="text-xl text-emerald-100 max-w-2xl mx-auto animate-fade-in-up delay-100">
                        Have questions? We are here to help you on your journey to finding your life partner
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <div
                                key={index}
                                className="group bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-700 p-8 text-center hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <div className={`w-14 h-14 bg-gradient-to-br ${info.color} rounded-2xl flex items-center justify-center mx-auto mb-5 text-white text-xl shadow-lg group-hover:scale-110 transition-transform`}>
                                    {info.icon}
                                </div>
                                <h3 className="text-lg font-bold text-slate-800 dark:text-white mb-3">{info.title}</h3>
                                {info.lines.map((line, i) => (
                                    <p key={i} className="text-slate-500 dark:text-slate-400">{line}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-700 p-8 md:p-10 animate-fade-in-up">
                            <div className="mb-8">
                                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-4">
                                    <FaEnvelope className="text-xs" />
                                    <span>Send Message</span>
                                </div>
                                <h2 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Get In Touch</h2>
                                <p className="text-slate-500 dark:text-slate-400 mt-2">Fill out the form and we'll respond within 24 hours</p>
                            </div>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400 dark:text-white"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400 dark:text-white"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What is this about?"
                                        className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400 dark:text-white"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..."
                                        rows="5"
                                        className="w-full px-5 py-3.5 bg-slate-50 dark:bg-slate-700 border-2 border-slate-100 dark:border-slate-600 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white dark:focus:bg-slate-800 focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400 dark:text-white resize-none"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="w-full relative overflow-hidden font-semibold py-4 px-6 rounded-xl transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Sending...
                                        </>
                                    ) : (
                                        <>
                                            <FaPaperPlane /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Map */}
                        <div className="bg-white dark:bg-slate-800 rounded-3xl shadow-xl shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in-up delay-200">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.4125!3d23.7925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzMzLjAiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '500px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white dark:bg-slate-900">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-4">
                            <FaQuestionCircle className="text-xs" />
                            <span>FAQs</span>
                        </div>
                        <h2 className="text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-4">Frequently Asked Questions</h2>
                        <p className="text-slate-500 dark:text-slate-400 max-w-2xl mx-auto text-lg">
                            Find answers to common questions about our platform
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        {faqs.map((faq, index) => (
                            <div
                                key={index}
                                className="bg-white dark:bg-slate-800 rounded-2xl shadow-lg shadow-slate-200/50 dark:shadow-black/30 border border-slate-100 dark:border-slate-700 overflow-hidden animate-fade-in-up"
                                style={{ animationDelay: `${index * 100}ms` }}
                            >
                                <button
                                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                                    className="w-full flex items-center justify-between p-6 text-left hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                                >
                                    <h3 className="font-bold text-slate-800 dark:text-white pr-4">{faq.question}</h3>
                                    <FaChevronDown className={`text-emerald-500 flex-shrink-0 transition-transform duration-300 ${openFaq === index ? 'rotate-180' : ''}`} />
                                </button>
                                <div className={`overflow-hidden transition-all duration-300 ${openFaq === index ? 'max-h-48' : 'max-h-0'}`}>
                                    <p className="px-6 pb-6 text-slate-600 dark:text-slate-300 leading-relaxed">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;

