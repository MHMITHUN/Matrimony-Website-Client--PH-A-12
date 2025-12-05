import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaRing, FaEye, FaStar, FaMale, FaFemale, FaTimes, FaHeart, FaCalendar, FaQuoteLeft } from 'react-icons/fa';
import { adminAPI } from '../../../api/api';

const AdminSuccessStories = () => {
    const [selectedStory, setSelectedStory] = useState(null);

    const { data: stories = [], isLoading } = useQuery({
        queryKey: ['adminSuccessStories'],
        queryFn: async () => {
            const response = await adminAPI.getSuccessStories();
            return response.data;
        }
    });

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <FaStar
                key={index}
                className={index < rating ? 'text-amber-400' : 'text-slate-200'}
            />
        ));
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="spinner-lg"></div>
                <p className="mt-4 text-slate-500">Loading stories...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 rounded-full text-pink-600 text-sm font-medium mb-2">
                    <FaStar className="text-xs" />
                    <span>Success Stories</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                    Marriage Success Stories
                </h1>
                <p className="text-slate-500 mt-1">View all submitted success stories</p>
            </div>

            {stories.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-12 text-center">
                    <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaRing className="text-4xl text-pink-300" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-700 mb-2">No Success Stories</h2>
                    <p className="text-slate-500">No success stories have been submitted yet.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {stories.map((story, index) => (
                        <div
                            key={story._id}
                            className="group bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-xl transition-all animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Image */}
                            <div className="relative h-48 overflow-hidden">
                                <img
                                    src={story.coupleImage || 'https://via.placeholder.com/400x300?text=Couple'}
                                    alt="Couple"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>
                                <div className="absolute bottom-3 left-3 flex gap-1">
                                    {renderStars(story.reviewStar)}
                                </div>
                                <div className="absolute top-3 right-3 px-2.5 py-1 bg-pink-500/90 backdrop-blur-sm text-white text-xs font-bold rounded-full flex items-center gap-1">
                                    <FaHeart className="text-[10px]" /> Success Story
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5">
                                <div className="flex items-center gap-3 mb-4">
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-blue-100 rounded-lg">
                                        <FaMale className="text-blue-600 text-sm" />
                                        <span className="text-blue-700 text-sm font-bold">#{story.maleBiodataId || story.selfBiodataId}</span>
                                    </div>
                                    <FaHeart className="text-pink-400 text-xs" />
                                    <div className="flex items-center gap-2 px-3 py-1.5 bg-pink-100 rounded-lg">
                                        <FaFemale className="text-pink-600 text-sm" />
                                        <span className="text-pink-700 text-sm font-bold">#{story.femaleBiodataId || story.partnerBiodataId}</span>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                                    <FaCalendar className="text-emerald-500" />
                                    <span>
                                        {new Date(story.marriageDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </span>
                                </div>

                                <button
                                    onClick={() => setSelectedStory(story)}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40"
                                >
                                    <FaEye /> View Story
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Story Modal */}
            {selectedStory && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4" onClick={() => setSelectedStory(null)}>
                    <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"></div>
                    <div
                        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto animate-fade-in-up"
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-white/80 backdrop-blur-xl p-6 border-b border-slate-100 flex items-center justify-between z-10">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                                    <FaHeart className="text-white" />
                                </div>
                                <h2 className="text-xl font-bold text-slate-800">Success Story</h2>
                            </div>
                            <button
                                onClick={() => setSelectedStory(null)}
                                className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                            >
                                <FaTimes className="text-slate-500" />
                            </button>
                        </div>

                        <div className="p-6">
                            {/* Couple Image */}
                            <img
                                src={selectedStory.coupleImage || 'https://via.placeholder.com/400x300?text=Couple'}
                                alt="Couple"
                                className="w-full h-56 object-cover rounded-2xl mb-6"
                            />

                            {/* Info Cards */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="bg-gradient-to-br from-blue-50 to-blue-100/50 p-4 rounded-2xl border border-blue-100">
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Male Biodata</p>
                                    <p className="font-bold text-blue-700 flex items-center gap-2">
                                        <FaMale className="text-blue-500" /> #{selectedStory.maleBiodataId || selectedStory.selfBiodataId}
                                    </p>
                                </div>
                                <div className="bg-gradient-to-br from-pink-50 to-pink-100/50 p-4 rounded-2xl border border-pink-100">
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide mb-1">Female Biodata</p>
                                    <p className="font-bold text-pink-700 flex items-center gap-2">
                                        <FaFemale className="text-pink-500" /> #{selectedStory.femaleBiodataId || selectedStory.partnerBiodataId}
                                    </p>
                                </div>
                            </div>

                            {/* Marriage Date & Rating */}
                            <div className="flex items-center justify-between p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-100 mb-6">
                                <div>
                                    <p className="text-xs text-slate-500 font-medium uppercase tracking-wide">Marriage Date</p>
                                    <p className="font-bold text-slate-800 flex items-center gap-2 mt-1">
                                        <FaCalendar className="text-emerald-500" />
                                        {new Date(selectedStory.marriageDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                                <div className="flex gap-1 text-lg">
                                    {renderStars(selectedStory.reviewStar)}
                                </div>
                            </div>

                            {/* Story Text */}
                            <div className="bg-gradient-to-br from-amber-50 to-amber-100/50 p-5 rounded-2xl border border-amber-100">
                                <FaQuoteLeft className="text-2xl text-amber-300 mb-3" />
                                <p className="text-slate-700 leading-relaxed italic">
                                    {selectedStory.successStoryText}
                                </p>
                            </div>

                            {/* Close Button */}
                            <button
                                onClick={() => setSelectedStory(null)}
                                className="w-full mt-6 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25"
                            >
                                Close
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSuccessStories;

