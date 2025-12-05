import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { FaRing, FaEye, FaStar, FaMale, FaFemale, FaTimes } from 'react-icons/fa';
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
                className={index < rating ? 'text-amber-400' : 'text-gray-300'}
            />
        ));
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800 flex items-center gap-2">
                    <FaRing className="text-amber-500" /> Success Stories
                </h1>
                <p className="text-gray-600">View all submitted success stories</p>
            </div>

            {stories.length === 0 ? (
                <div className="card p-12 text-center">
                    <FaRing className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-700 mb-2">No Success Stories</h2>
                    <p className="text-gray-500">No success stories have been submitted yet.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Male Biodata ID</th>
                                <th>Female Biodata ID</th>
                                <th>Marriage Date</th>
                                <th>Rating</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {stories.map((story) => (
                                <tr key={story._id}>
                                    <td className="flex items-center gap-2">
                                        <FaMale className="text-blue-500" /> #{story.maleBiodataId || story.selfBiodataId}
                                    </td>
                                    <td className="flex items-center gap-2">
                                        <FaFemale className="text-pink-500" /> #{story.femaleBiodataId || story.partnerBiodataId}
                                    </td>
                                    <td>
                                        {new Date(story.marriageDate).toLocaleDateString('en-US', {
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </td>
                                    <td>
                                        <div className="flex gap-1">
                                            {renderStars(story.reviewStar)}
                                        </div>
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => setSelectedStory(story)}
                                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
                                        >
                                            <FaEye /> View Story
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}

            {/* Story Modal */}
            {selectedStory && (
                <div className="modal-overlay" onClick={() => setSelectedStory(null)}>
                    <div className="modal-content p-6" onClick={(e) => e.stopPropagation()}>
                        <div className="flex items-center justify-between mb-6">
                            <h2 className="text-xl font-bold text-gray-800">Success Story</h2>
                            <button
                                onClick={() => setSelectedStory(null)}
                                className="p-2 hover:bg-gray-100 rounded-lg"
                            >
                                <FaTimes className="text-gray-500" />
                            </button>
                        </div>

                        {/* Couple Image */}
                        <img
                            src={selectedStory.coupleImage || 'https://via.placeholder.com/400x300?text=Couple'}
                            alt="Couple"
                            className="w-full h-48 object-cover rounded-lg mb-6"
                        />

                        {/* Info */}
                        <div className="grid grid-cols-2 gap-4 mb-6">
                            <div className="bg-blue-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Male Biodata ID</p>
                                <p className="font-bold text-blue-700 flex items-center gap-2">
                                    <FaMale /> #{selectedStory.maleBiodataId || selectedStory.selfBiodataId}
                                </p>
                            </div>
                            <div className="bg-pink-50 p-4 rounded-lg">
                                <p className="text-sm text-gray-500">Female Biodata ID</p>
                                <p className="font-bold text-pink-700 flex items-center gap-2">
                                    <FaFemale /> #{selectedStory.femaleBiodataId || selectedStory.partnerBiodataId}
                                </p>
                            </div>
                        </div>

                        {/* Marriage Date & Rating */}
                        <div className="flex items-center justify-between mb-4">
                            <p className="text-gray-600">
                                <strong>Marriage Date:</strong>{' '}
                                {new Date(selectedStory.marriageDate).toLocaleDateString('en-US', {
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </p>
                            <div className="flex gap-1">
                                {renderStars(selectedStory.reviewStar)}
                            </div>
                        </div>

                        {/* Story Text */}
                        <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-gray-700 leading-relaxed italic">
                                "{selectedStory.successStoryText}"
                            </p>
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedStory(null)}
                            className="w-full mt-6 btn-primary"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminSuccessStories;
