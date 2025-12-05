import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { FaCreditCard, FaLock, FaCheckCircle, FaShieldAlt, FaArrowLeft, FaStar } from 'react-icons/fa';
import { paymentAPI, contactRequestAPI } from '../../api/api';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const Checkout = () => {
    const { biodataId } = useParams();
    const { user } = useAuth();
    const navigate = useNavigate();

    const [cardNumber, setCardNumber] = useState('');
    const [processing, setProcessing] = useState(false);

    // Create contact request mutation
    const createRequest = useMutation({
        mutationFn: async (paymentId) => {
            return contactRequestAPI.create({
                biodataId: parseInt(biodataId),
                paymentId
            });
        },
        onSuccess: () => {
            toast.success('Contact request submitted successfully! Waiting for admin approval.');
            navigate('/dashboard/contact-requests');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to submit contact request');
        }
    });

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!cardNumber || cardNumber.replace(/\s/g, '').length < 16) {
            toast.error('Please enter a valid card number');
            return;
        }

        setProcessing(true);

        try {
            // Create payment intent (demo mode)
            const paymentResponse = await paymentAPI.createPaymentIntent(500);
            const { paymentId } = paymentResponse.data;

            // Confirm payment
            await paymentAPI.confirmPayment(paymentId);

            // Create contact request
            await createRequest.mutateAsync(paymentId);
        } catch (error) {
            toast.error('Payment failed. Please try again.');
        } finally {
            setProcessing(false);
        }
    };

    const formatCardNumber = (value) => {
        const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
        const matches = v.match(/\d{4,16}/g);
        const match = matches && matches[0] || '';
        const parts = [];
        for (let i = 0, len = match.length; i < len; i += 4) {
            parts.push(match.substring(i, i + 4));
        }
        return parts.length ? parts.join(' ') : value;
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-slate-50 via-emerald-50/30 to-teal-50/50 py-12 pt-28 relative overflow-hidden">
            {/* Decorative Background Elements */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

            <div className="container-custom max-w-xl relative z-10">
                {/* Back Button */}
                <Link
                    to={`/biodata/${biodataId}`}
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
                >
                    <FaArrowLeft /> Back to Profile
                </Link>

                <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl shadow-slate-200/50 border border-white/50 overflow-hidden animate-fade-in-up">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 p-8 text-center relative overflow-hidden">
                        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
                        <div className="relative">
                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FaCreditCard className="text-3xl text-white" />
                            </div>
                            <h1 className="text-2xl font-bold text-white mb-2">Request Contact Information</h1>
                            <p className="text-emerald-100">Complete payment to unlock contact details</p>
                        </div>
                    </div>

                    <div className="p-8">
                        {/* Order Summary */}
                        <div className="bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl p-6 mb-8 border border-slate-100">
                            <h3 className="font-bold text-slate-800 mb-4 flex items-center gap-2">
                                <FaStar className="text-amber-500" />
                                Order Summary
                            </h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">Biodata Contact Request</span>
                                    <span className="font-semibold text-slate-800">৳500.00</span>
                                </div>
                                <div className="flex items-center justify-between text-sm">
                                    <span className="text-slate-600">Biodata ID</span>
                                    <span className="font-semibold text-emerald-600">#{biodataId}</span>
                                </div>
                                <hr className="border-slate-200 my-3" />
                                <div className="flex items-center justify-between font-bold text-lg">
                                    <span className="text-slate-800">Total</span>
                                    <span className="text-emerald-600">৳500.00</span>
                                </div>
                            </div>
                        </div>

                        {/* Payment Form */}
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Biodata ID (Readonly) */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Biodata ID
                                </label>
                                <input
                                    type="text"
                                    value={`#${biodataId}`}
                                    readOnly
                                    className="w-full px-5 py-3.5 bg-slate-100 border-2 border-slate-100 rounded-xl text-slate-600 cursor-not-allowed"
                                />
                            </div>

                            {/* User Email (Readonly) */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Your Email
                                </label>
                                <input
                                    type="email"
                                    value={user?.email || ''}
                                    readOnly
                                    className="w-full px-5 py-3.5 bg-slate-100 border-2 border-slate-100 rounded-xl text-slate-600 cursor-not-allowed"
                                />
                            </div>

                            {/* Card Number */}
                            <div>
                                <label className="block text-sm font-semibold text-slate-700 mb-2">
                                    Card Number
                                </label>
                                <div className="relative group">
                                    <input
                                        type="text"
                                        value={cardNumber}
                                        onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                        placeholder="1234 5678 9012 3456"
                                        maxLength={19}
                                        className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400"
                                        required
                                    />
                                    <FaCreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                                </div>
                                <p className="text-xs text-slate-500 mt-2 flex items-center gap-1">
                                    <FaShieldAlt className="text-emerald-500" />
                                    Demo mode: Enter any 16-digit number
                                </p>
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={processing}
                                className="w-full relative overflow-hidden font-semibold py-4 px-6 rounded-xl transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                            >
                                {processing ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Processing Payment...
                                    </>
                                ) : (
                                    <>
                                        <FaLock className="text-sm" /> Pay ৳500.00
                                    </>
                                )}
                            </button>
                        </form>

                        {/* Security Note */}
                        <div className="mt-8 p-4 bg-emerald-50 rounded-2xl border border-emerald-100">
                            <div className="flex items-start gap-3">
                                <div className="w-10 h-10 bg-emerald-500 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <FaCheckCircle className="text-white" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-emerald-800 mb-1">Secure Payment</h4>
                                    <p className="text-sm text-emerald-700 leading-relaxed">
                                        Your payment is secure. After payment, your request will be sent to admin for approval.
                                        Once approved, you can view the contact information from your dashboard.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;

