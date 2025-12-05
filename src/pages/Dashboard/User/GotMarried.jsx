import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQuery } from '@tanstack/react-query';
import { FaRing, FaStar, FaImage, FaHeart } from 'react-icons/fa';
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
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaRing className="text-amber-500" /> Got Married
                </h1>
                <p className="text-gray-600">Share your success story with the community</p>
            </div>

            <div className="card p-6 md:p-8 max-w-2xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Self Biodata ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Biodata ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="selfBiodataId"
                            value={formData.selfBiodataId}
                            readOnly={!!myBiodata?.biodataId}
                            onChange={handleChange}
                            className="input-field bg-gray-100"
                            placeholder="Your biodata ID"
                            required
                        />
                    </div>

                    {/* Partner Biodata ID */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Partner Biodata ID <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="number"
                            name="partnerBiodataId"
                            value={formData.partnerBiodataId}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter partner's biodata ID"
                            required
                        />
                    </div>

                    {/* Couple Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Couple Image URL <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                            <input
                                type="url"
                                name="coupleImage"
                                value={formData.coupleImage}
                                onChange={handleChange}
                                className="input-field pr-10"
                                placeholder="https://example.com/couple-image.jpg"
                                required
                            />
                            <FaImage className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                        </div>
                    </div>

                    {/* Marriage Date */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Marriage Date <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="marriageDate"
                            value={formData.marriageDate}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>

                    {/* Review Stars */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Rate Your Experience <span className="text-red-500">*</span>
                        </label>
                        <div className="flex gap-2">
                            {[1, 2, 3, 4, 5].map((star) => (
                                <button
                                    key={star}
                                    type="button"
                                    onClick={() => setFormData(prev => ({ ...prev, reviewStar: star }))}
                                    className="p-2 transition-transform hover:scale-110"
                                >
                                    <FaStar
                                        className={`text-3xl ${star <= formData.reviewStar ? 'text-amber-400' : 'text-gray-300'
                                            }`}
                                    />
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Success Story */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Your Success Story <span className="text-red-500">*</span>
                        </label>
                        <textarea
                            name="successStoryText"
                            value={formData.successStoryText}
                            onChange={handleChange}
                            rows={6}
                            className="input-field resize-none"
                            placeholder="Share your experience... How did you meet? What do you like about our platform? Any advice for others?"
                            required
                        ></textarea>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={submitMutation.isLoading}
                        className="w-full btn-primary py-3 flex items-center justify-center gap-2"
                    >
                        {submitMutation.isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
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
