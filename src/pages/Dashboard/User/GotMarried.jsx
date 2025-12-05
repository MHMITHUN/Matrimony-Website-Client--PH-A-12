import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaRing, FaStar, FaImage, FaHeart, FaSparkles, FaCalendar, FaIdCard, FaUser } from 'react-icons/fa';
import { successStoryAPI, biodataAPI } from '../../../api/api';
import toast from 'react-hot-toast';

const GotMarried = () => {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        selfBiodataId: '',
        partnerBiodataId: '',
        coupleImage: '',
        marriageDate: '',
        reviewStar: 5,
        successStoryText: ''
    });

    // Fetch user's biodata to get their ID
    const { data: myBiodata } = useQuery({
        queryKey: ['myBiodata'],
        queryFn: async () => {
            const response = await biodataAPI.getMyBiodata();
            return response.data;
        },
        onSuccess: (data) => {
            if (data?.biodataId) {
                setFormData(prev => ({ ...prev, selfBiodataId: data.biodataId }));
            }
        }
    });

    const submitMutation = useMutation({
        mutationFn: (data) => successStoryAPI.create(data),
        onSuccess: () => {
            toast.success('Success story submitted! Thank you for sharing.');
            navigate('/dashboard/view-biodata');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to submit story');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!formData.selfBiodataId || !formData.partnerBiodataId || !formData.coupleImage || !formData.marriageDate || !formData.successStoryText) {
            toast.error('Please fill in all fields');
            return;
        }

        submitMutation.mutate({
            ...formData,
            selfBiodataId: parseInt(formData.selfBiodataId),
            partnerBiodataId: parseInt(formData.partnerBiodataId),
            reviewStar: parseInt(formData.reviewStar)
        });
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 rounded-full text-pink-600 text-sm font-medium mb-2">
                    <FaSparkles className="text-xs" />
                    <span>Share Your Joy</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                    <FaRing className="text-amber-500" /> Got Married
                </h1>
                <p className="text-slate-500 mt-1">Share your success story with the community</p>
            </div>

            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden max-w-2xl">
                {/* Decorative Header */}
                <div className="bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 p-6 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
                    <div className="relative flex items-center gap-4">
                        <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <FaHeart className="text-white text-2xl" />
                        </div>
                        <div>
                            <h2 className="text-xl font-bold text-white">Share Your Story</h2>
                            <p className="text-white/70">Inspire others with your journey</p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                    {/* Biodata IDs Row */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Self Biodata ID */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <FaIdCard className="text-emerald-500" />
                                Your Biodata ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="selfBiodataId"
                                value={formData.selfBiodataId}
                                readOnly={!!myBiodata?.biodataId}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-slate-100 border-2 border-slate-100 rounded-xl text-slate-700 cursor-not-allowed outline-none"
                                placeholder="Your biodata ID"
                                required
                            />
                        </div>

                        {/* Partner Biodata ID */}
                        <div>
                            <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                                <FaUser className="text-pink-500" />
                                Partner Biodata ID <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="number"
                                name="partnerBiodataId"
                                value={formData.partnerBiodataId}
                                onChange={handleChange}
                                className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-pink-500 focus:bg-white focus:shadow-lg focus:shadow-pink-500/10 placeholder:text-slate-400"
                                placeholder="Enter partner's biodata ID"
                                required
                            />
                        </div>
                    </div>

                    {/* Couple Image */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                            <FaImage className="text-purple-500" />
                            Couple Image URL <span className="text-red-500">*</span>
                        </label>
                        <div className="relative group">
                            <input
                                type="url"
                                name="coupleImage"
                                value={formData.coupleImage}
                                onChange={handleChange}
                                className="w-full pl-5 pr-12 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-pink-500 focus:bg-white focus:shadow-lg focus:shadow-pink-500/10 placeholder:text-slate-400"
                                placeholder="https://example.com/couple-image.jpg"
                                required
                            />
                            <FaImage className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-pink-500 transition-colors" />
                        </div>
                    </div>

                    {/* Marriage Date */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                            <FaCalendar className="text-amber-500" />
                            Marriage Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="marriageDate"
                            value={formData.marriageDate}
                            onChange={handleChange}
                            className="w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-pink-500 focus:bg-white focus:shadow-lg focus:shadow-pink-500/10"
                            required
                        />
                    </div>

                    {/* Review Stars */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-3">
                            <FaStar className="text-amber-400" />
                            Rate Your Experience <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2 p-4 bg-gradient-to-br from-amber-50 to-amber-100/50 rounded-2xl border border-amber-100">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, reviewStar: star }))}
                                    className="p-2 transition-all hover:scale-125"
                                >
                                    <FaStar
                                        className={`text-3xl transition-colors ${star <= formData.reviewStar ? 'text-amber-400 drop-shadow-md' : 'text-slate-200'}`}
                                    />
                                </button>
                            ))}
                            <span className="ml-auto text-amber-700 font-semibold self-center">
                                {formData.reviewStar}/5
                            </span>
                        </div>
                    </div>

                    {/* Success Story */}
                    <div>
                        <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2">
                            <FaHeart className="text-pink-500" />
                            Your Success Story <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="successStoryText"
                            value={formData.successStoryText}
                            onChange={handleChange}
                            rows={6}
                            className="w-full px-5 py-4 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-pink-500 focus:bg-white focus:shadow-lg focus:shadow-pink-500/10 placeholder:text-slate-400 resize-none"
                            placeholder="Share your experience... How did you meet? What do you like about our platform? Any advice for others?"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitMutation.isLoading}
                        className="w-full relative overflow-hidden font-semibold py-4 px-6 rounded-xl transition-all duration-300 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg shadow-pink-500/30 hover:shadow-xl hover:shadow-pink-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                    >
                        {submitMutation.isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Submitting...
                            </>
                        ) : (
                            <>
                                <FaHeart /> Submit Your Story
                            </>
                        )}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default GotMarried;
