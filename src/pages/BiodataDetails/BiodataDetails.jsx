import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaUser, FaCalendar, FaRulerVertical, FaWeight, FaStar, FaLock, FaCrown } from 'react-icons/fa';
import { biodataAPI, favoritesAPI } from '../../api/api';
import { useAuth } from '../../contexts/AuthContext';
import toast from 'react-hot-toast';

const BiodataDetails = () => {
    const { id } = useParams();
    const { user, isPremium } = useAuth();
    const queryClient = useQueryClient();
    const [isFavorited, setIsFavorited] = useState(false);

    // Fetch biodata details
    const { data: biodata, isLoading, error } = useQuery({
        queryKey: ['biodata', id],
        queryFn: async () => {
            const response = await biodataAPI.getById(id);
            return response.data;
        }
    });

    // Fetch similar biodatas
    const { data: similarBiodatas = [] } = useQuery({
        queryKey: ['similarBiodatas', id],
        queryFn: async () => {
            const response = await biodataAPI.getSimilar(id);
            return response.data;
        },
        enabled: !!biodata
    });

    // Check if favorited
    useQuery({
        queryKey: ['isFavorited', id],
        queryFn: async () => {
            const response = await favoritesAPI.check(id);
            setIsFavorited(response.data.isFavorited);
            return response.data;
        },
        enabled: !!user
    });

    // Add to favorites mutation
    const addToFavorites = useMutation({
        mutationFn: () => favoritesAPI.add(parseInt(id)),
        onSuccess: () => {
            setIsFavorited(true);
            queryClient.invalidateQueries(['favorites']);
            toast.success('Added to favorites!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to add to favorites');
        }
    });

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error || !biodata) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <h2 className="text-2xl font-bold text-gray-800 mb-4">Biodata Not Found</h2>
                    <Link to="/biodatas" className="btn-primary">Browse Biodatas</Link>
                </div>
            </div>
        );
    }

    const canViewContact = biodata.canViewContact || isPremium;
    const isOwnBiodata = biodata.userEmail === user?.email;

    const InfoCard = ({ icon, label, value }) => (
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <span className="text-green-600 mt-1">{icon}</span>
            <div>
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium text-gray-800">{value}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2">
                        {/* Profile Header */}
                        <div className="card p-6 md:p-8 mb-6">
                            <div className="flex flex-col md:flex-row gap-6">
                                <div className="relative">
                                    <img
                                        src={biodata.profileImage || 'https://via.placeholder.com/200x200?text=No+Image'}
                                        alt="Profile"
                                        className="w-48 h-48 md:w-56 md:h-56 object-cover rounded-xl mx-auto md:mx-0"
                                    />
                                    {biodata.isPremium && (
                                        <span className="absolute top-2 left-2 badge-premium flex items-center gap-1">
                                            <FaCrown /> Premium
                                        </span>
                                    )}
                                </div>
                                <div className="flex-1 text-center md:text-left">
                                    <div className="flex flex-wrap items-center justify-center md:justify-start gap-3 mb-3">
                                        <span className={biodata.biodataType === 'Male' ? 'badge-male' : 'badge-female'}>
                                            {biodata.biodataType}
                                        </span>
                                        <span className="text-gray-500">Biodata ID: {biodata.biodataId}</span>
                                    </div>
                                    <h1 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{biodata.name}</h1>
                                    <p className="text-gray-600 mb-4 flex items-center justify-center md:justify-start gap-2">
                                        <FaBriefcase className="text-green-600" /> {biodata.occupation}
                                    </p>
                                    <p className="text-gray-600 mb-4 flex items-center justify-center md:justify-start gap-2">
                                        <FaMapMarkerAlt className="text-green-600" /> {biodata.permanentDivision}
                                    </p>

                                    {/* Action Buttons */}
                                    <div className="flex flex-wrap gap-3 justify-center md:justify-start">
                                        {!isOwnBiodata && (
                                            <button
                                                onClick={() => addToFavorites.mutate()}
                                                disabled={isFavorited || addToFavorites.isLoading}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all ${isFavorited
                                                        ? 'bg-red-100 text-red-500 cursor-default'
                                                        : 'bg-red-500 hover:bg-red-600 text-white'
                                                    }`}
                                            >
                                                <FaHeart /> {isFavorited ? 'Favorited' : 'Add to Favorites'}
                                            </button>
                                        )}

                                        {!canViewContact && !isOwnBiodata && (
                                            <Link
                                                to={`/checkout/${biodata.biodataId}`}
                                                className="btn-secondary flex items-center gap-2"
                                            >
                                                <FaLock /> Request Contact Info
                                            </Link>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="card p-6 md:p-8 mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FaUser className="text-green-600" /> Basic Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoCard icon={<FaCalendar />} label="Date of Birth" value={new Date(biodata.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                                <InfoCard icon={<FaUser />} label="Age" value={`${biodata.age} years`} />
                                <InfoCard icon={<FaRulerVertical />} label="Height" value={biodata.height} />
                                <InfoCard icon={<FaWeight />} label="Weight" value={biodata.weight} />
                                <InfoCard icon={<FaBriefcase />} label="Occupation" value={biodata.occupation} />
                                <InfoCard icon={<FaStar />} label="Race" value={biodata.race} />
                            </div>
                        </div>

                        {/* Family Information */}
                        <div className="card p-6 md:p-8 mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Family Information</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoCard icon={<FaUser />} label="Father's Name" value={biodata.fathersName} />
                                <InfoCard icon={<FaUser />} label="Mother's Name" value={biodata.mothersName} />
                            </div>
                        </div>

                        {/* Location Information */}
                        <div className="card p-6 md:p-8 mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FaMapMarkerAlt className="text-green-600" /> Location
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoCard icon={<FaMapMarkerAlt />} label="Permanent Division" value={biodata.permanentDivision} />
                                <InfoCard icon={<FaMapMarkerAlt />} label="Present Division" value={biodata.presentDivision} />
                            </div>
                        </div>

                        {/* Partner Expectations */}
                        <div className="card p-6 md:p-8 mb-6">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Expected Partner</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <InfoCard icon={<FaUser />} label="Expected Age" value={biodata.expectedPartnerAge} />
                                <InfoCard icon={<FaRulerVertical />} label="Expected Height" value={biodata.expectedPartnerHeight} />
                                <InfoCard icon={<FaWeight />} label="Expected Weight" value={biodata.expectedPartnerWeight} />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="card p-6 md:p-8">
                            <h2 className="text-xl font-bold text-gray-800 mb-6 flex items-center gap-2">
                                <FaPhone className="text-green-600" /> Contact Information
                            </h2>

                            {canViewContact ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoCard icon={<FaEnvelope />} label="Email" value={biodata.userEmail} />
                                    <InfoCard icon={<FaPhone />} label="Mobile" value={biodata.mobileNumber} />
                                </div>
                            ) : (
                                <div className="text-center py-8 bg-gray-50 rounded-lg">
                                    <FaLock className="text-5xl text-gray-300 mx-auto mb-4" />
                                    <h3 className="text-lg font-semibold text-gray-700 mb-2">Contact Information is Hidden</h3>
                                    <p className="text-gray-500 mb-4">Only premium members can view contact information</p>
                                    <Link
                                        to={`/checkout/${biodata.biodataId}`}
                                        className="btn-primary inline-flex items-center gap-2"
                                    >
                                        Request Contact Info ($5)
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Similar Biodatas */}
                    <div className="lg:col-span-1">
                        <div className="card p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-gray-800 mb-6">Similar Biodatas</h2>

                            {similarBiodatas.length === 0 ? (
                                <p className="text-gray-500 text-center py-8">No similar biodatas found</p>
                            ) : (
                                <div className="space-y-4">
                                    {similarBiodatas.map((similar) => (
                                        <Link
                                            key={similar._id}
                                            to={`/biodata/${similar.biodataId}`}
                                            className="block p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={similar.profileImage || 'https://via.placeholder.com/60x60'}
                                                    alt="Profile"
                                                    className="w-14 h-14 rounded-full object-cover"
                                                />
                                                <div className="flex-1">
                                                    <p className="text-sm text-gray-500">ID: {similar.biodataId}</p>
                                                    <p className="font-medium text-gray-800">{similar.occupation}</p>
                                                    <p className="text-sm text-gray-600">{similar.permanentDivision} • {similar.age} yrs</p>
                                                </div>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BiodataDetails;
