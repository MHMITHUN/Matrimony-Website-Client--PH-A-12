import { useState } from 'react';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';
import toast from 'react-hot-toast';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // Simulate form submission
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast.success('Message sent successfully! We will get back to you soon.');
        setFormData({ name: '', email: '', subject: '', message: '' });
        setLoading(false);
    };

    const contactInfo = [
        {
            icon: <FaMapMarkerAlt className="text-2xl" />,
            title: 'Visit Us',
            lines: ['House 123, Road 45', 'Gulshan-2, Dhaka 1212', 'Bangladesh']
        },
        {
            icon: <FaPhone className="text-2xl" />,
            title: 'Call Us',
            lines: ['+880 1700-000000', '+880 1800-000000']
        },
        {
            icon: <FaEnvelope className="text-2xl" />,
            title: 'Email Us',
            lines: ['info@nikahmatrimony.com', 'support@nikahmatrimony.com']
        },
        {
            icon: <FaClock className="text-2xl" />,
            title: 'Working Hours',
            lines: ['Saturday - Thursday', '9:00 AM - 6:00 PM']
        }
    ];

    return (
        <div className="min-h-screen">
            {/* Hero Section */}
            <section className="gradient-islamic py-20 text-white">
                <div className="container-custom text-center">
                    <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
                    <p className="text-xl text-green-100 max-w-2xl mx-auto">
                        Have questions? We are here to help you on your journey to finding your life partner
                    </p>
                </div>
            </section>

            {/* Contact Info Cards */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {contactInfo.map((info, index) => (
                            <div key={index} className="card p-6 text-center hover:shadow-xl transition-shadow">
                                <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-700">
                                    {info.icon}
                                </div>
                                <h3 className="text-lg font-bold text-gray-800 mb-3">{info.title}</h3>
                                {info.lines.map((line, i) => (
                                    <p key={i} className="text-gray-600 text-sm">{line}</p>
                                ))}
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Form Section */}
            <section className="py-16 bg-gray-50">
                <div className="container-custom">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Form */}
                        <div className="card p-8">
                            <h2 className="text-2xl font-bold text-gray-800 mb-6">Send Us a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-5">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            value={formData.name}
                                            onChange={handleChange}
                                            placeholder="Enter your name"
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-2">
                                            Your Email
                                        </label>
                                        <input
                                            type="email"
                                            name="email"
                                            value={formData.email}
                                            onChange={handleChange}
                                            placeholder="Enter your email"
                                            className="input-field"
                                            required
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        name="subject"
                                        value={formData.subject}
                                        onChange={handleChange}
                                        placeholder="What is this about?"
                                        className="input-field"
                                        required
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        placeholder="Write your message here..."
                                        rows="5"
                                        className="input-field resize-none"
                                        required
                                    ></textarea>
                                </div>
                                <button
                                    type="submit"
                                    disabled={loading}
                                    className="btn-primary w-full py-3 flex items-center justify-center gap-2"
                                >
                                    {loading ? (
                                        'Sending...'
                                    ) : (
                                        <>
                                            <FaPaperPlane /> Send Message
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                        {/* Map */}
                        <div className="card overflow-hidden">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3651.0!2d90.4125!3d23.7925!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjPCsDQ3JzMzLjAiTiA5MMKwMjQnNDUuMCJF!5e0!3m2!1sen!2sbd!4v1234567890"
                                width="100%"
                                height="100%"
                                style={{ border: 0, minHeight: '400px' }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-16 bg-white">
                <div className="container-custom">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h2>
                        <p className="text-gray-600 max-w-2xl mx-auto">
                            Find answers to common questions about our platform
                        </p>
                    </div>

                    <div className="max-w-3xl mx-auto space-y-4">
                        <div className="card p-6">
                            <h3 className="font-bold text-gray-800 mb-2">How does Nikah Matrimony work?</h3>
                            <p className="text-gray-600 text-sm">
                                Create your profile, browse through verified biodatas, and connect with potential matches.
                                Premium members can directly view contact information.
                            </p>
                        </div>
                        <div className="card p-6">
                            <h3 className="font-bold text-gray-800 mb-2">Is my information safe?</h3>
                            <p className="text-gray-600 text-sm">
                                Absolutely! We use industry-standard security measures to protect your personal information.
                                Your contact details are only visible to premium members or upon request.
                            </p>
                        </div>
                        <div className="card p-6">
                            <h3 className="font-bold text-gray-800 mb-2">How can I become a premium member?</h3>
                            <p className="text-gray-600 text-sm">
                                You can request premium membership from your dashboard. Once approved by our admin team,
                                you will have access to all contact information and premium features.
                            </p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Contact;
