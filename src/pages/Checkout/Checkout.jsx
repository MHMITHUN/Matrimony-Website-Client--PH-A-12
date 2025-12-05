import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useMutation } from '@tanstack/react-query';
import { FaCreditCard, FaLock, FaCheckCircle } from 'react-icons/fa';
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

        if (!cardNumber || cardNumber.length < 16) {
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
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container-custom max-w-xl">
                <div className="card p-8">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <FaCreditCard className="text-3xl text-green-600" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-800 mb-2">Request Contact Information</h1>
                        <p className="text-gray-600">Complete payment to request contact details</p>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-gray-50 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold text-gray-700 mb-3">Order Summary</h3>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Biodata Contact Request</span>
                            <span className="font-medium">$5.00</span>
                        </div>
                        <div className="flex items-center justify-between text-sm mb-2">
                            <span className="text-gray-600">Biodata ID</span>
                            <span className="font-medium">#{biodataId}</span>
                        </div>
                        <hr className="my-3" />
                        <div className="flex items-center justify-between font-bold">
                            <span>Total</span>
                            <span className="text-green-600">$5.00</span>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Biodata ID (Readonly) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Biodata ID
                            </label>
                            <input
                                type="text"
                                value={biodataId}
                                readOnly
                                className="input-field bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* User Email (Readonly) */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Your Email
                            </label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                readOnly
                                className="input-field bg-gray-100 cursor-not-allowed"
                            />
                        </div>

                        {/* Card Number */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Card Number
                            </label>
                            <div className="relative">
                                <input
                                    type="text"
                                    value={cardNumber}
                                    onChange={(e) => setCardNumber(formatCardNumber(e.target.value))}
                                    placeholder="1234 5678 9012 3456"
                                    maxLength={19}
                                    className="input-field pr-12"
                                    required
                                />
                                <FaCreditCard className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Demo mode: Enter any 16-digit number
                            </p>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            disabled={processing}
                            className="w-full btn-primary py-3 flex items-center justify-center gap-2 disabled:opacity-50"
                        >
                            {processing ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <FaLock /> Pay $5.00
                                </>
                            )}
                        </button>
                    </form>

                    {/* Security Note */}
                    <div className="mt-6 flex items-start gap-3 text-sm text-gray-500">
                        <FaCheckCircle className="text-green-500 mt-0.5" />
                        <p>
                            Your payment is secure. After payment, your request will be sent to admin for approval.
                            Once approved, you can view the contact information from your dashboard.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
