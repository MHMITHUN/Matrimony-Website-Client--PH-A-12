import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaHeart, FaPhone, FaEnvelope, FaMapMarkerAlt, FaBriefcase, FaUser, FaCalendar, FaRulerVertical, FaWeight, FaStar, FaLock, FaCrown, FaArrowLeft, FaCheckCircle, FaSparkles } from 'react-icons/fa';
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
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
                <div className="text-center">
                    <div className="spinner-lg"></div>
                    <p className="mt-4 text-slate-500">Loading profile...</p>
                </div>
            </div>
        );
    }

    if (error || !biodata) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-slate-50 to-white">
                <div className="text-center bg-white rounded-3xl shadow-xl p-12 max-w-md mx-4">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaUser className="text-4xl text-slate-300" />
                    </div>
                    <h2 className="text-2xl font-bold text-slate-800 mb-4">Biodata Not Found</h2>
                    <p className="text-slate-500 mb-6">The profile you're looking for doesn't exist or has been removed.</p>
                    <Link to="/biodatas" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                        <FaArrowLeft /> Browse Biodatas
                    </Link>
                </div>
            </div>
        );
    }

    const canViewContact = biodata.canViewContact || isPremium;
    const isOwnBiodata = biodata.userEmail === user?.email;

    const InfoCard = ({ icon, label, value }) => (
        <div className="flex items-start gap-4 p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-100 hover:shadow-md hover:border-emerald-200 transition-all group">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform">
                {icon}
            </div>
            <div>
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
                <p className="font-semibold text-slate-800 mt-0.5">{value || 'Not specified'}</p>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 pt-24">
            <div className="container-custom">
                {/* Back Button */}
                <Link
                    to="/biodatas"
                    className="inline-flex items-center gap-2 text-slate-600 hover:text-emerald-600 font-medium mb-6 transition-colors"
                >
                    <FaArrowLeft /> Back to Biodatas
                </Link>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Profile Header Card */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 overflow-hidden">
                            <div className="relative h-48 bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-50"></div>
                            </div>
                            <div className="relative px-6 pb-6">
                                <div className="flex flex-col md:flex-row gap-6">
                                    {/* Profile Image */}
                                    <div className="relative -mt-20 md:-mt-16">
                                        <div className="relative">
                                            <img
                                                src={biodata.profileImage || 'https://via.placeholder.com/200x200?text=No+Image'}
                                                alt="Profile"
                                                className="w-36 h-36 md:w-44 md:h-44 object-cover rounded-2xl border-4 border-white shadow-xl mx-auto md:mx-0"
                                            />
                                            {biodata.isPremium && (
                                                <span className="absolute -top-2 -right-2 px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                                                    <FaCrown className="text-[10px]" /> Premium
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    {/* Profile Info */}
                                    <div className="flex-1 text-center md:text-left pt-2 md:pt-6">
                                        <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                                            <span className={`px-3 py-1 rounded-full text-xs font-bold ${biodata.biodataType === 'Male'
                                                    ? 'bg-blue-100 text-blue-600'
                                                    : 'bg-pink-100 text-pink-600'
                                                }`}>
                                                {biodata.biodataType}
                                            </span>
                                            <span className="text-slate-400 text-sm">ID: #{biodata.biodataId}</span>
                                        </div>
                                        <h1 className="text-2xl md:text-3xl font-bold text-slate-800 mb-2">{biodata.name}</h1>
                                        <p className="text-slate-600 flex items-center justify-center md:justify-start gap-2 mb-1">
                                            <FaBriefcase className="text-emerald-500" /> {biodata.occupation}
                                        </p>
                                        <p className="text-slate-500 flex items-center justify-center md:justify-start gap-2">
                                            <FaMapMarkerAlt className="text-emerald-500" /> {biodata.permanentDivision}
                                        </p>

                                        {/* Action Buttons */}
                                        <div className="flex flex-wrap gap-3 justify-center md:justify-start mt-4">
                                            {!isOwnBiodata && (
                                                <button
                                                    onClick={() => addToFavorites.mutate()}
                                                    disabled={isFavorited || addToFavorites.isLoading}
                                                    className={`flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold transition-all ${isFavorited
                                                            ? 'bg-red-100 text-red-500 cursor-default'
                                                            : 'bg-gradient-to-r from-red-500 to-rose-500 text-white hover:shadow-lg hover:shadow-red-500/25'
                                                        }`}
                                                >
                                                    <FaHeart /> {isFavorited ? 'Favorited' : 'Add to Favorites'}
                                                </button>
                                            )}

                                            {!canViewContact && !isOwnBiodata && (
                                                <Link
                                                    to={`/checkout/${biodata.biodataId}`}
                                                    className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-amber-400 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all"
                                                >
                                                    <FaLock className="text-sm" /> Request Contact Info
                                                </Link>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Basic Information */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                    <FaUser className="text-white" />
                                </div>
                                Basic Information
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
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-rose-500 rounded-xl flex items-center justify-center">
                                    <FaHeart className="text-white" />
                                </div>
                                Family Information
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoCard icon={<FaUser />} label="Father's Name" value={biodata.fathersName} />
                                <InfoCard icon={<FaUser />} label="Mother's Name" value={biodata.mothersName} />
                            </div>
                        </div>

                        {/* Location Information */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center">
                                    <FaMapMarkerAlt className="text-white" />
                                </div>
                                Location
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <InfoCard icon={<FaMapMarkerAlt />} label="Permanent Division" value={biodata.permanentDivision} />
                                <InfoCard icon={<FaMapMarkerAlt />} label="Present Division" value={biodata.presentDivision} />
                            </div>
                        </div>

                        {/* Partner Expectations */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
                                    <FaSparkles className="text-white" />
                                </div>
                                Expected Partner
                            </h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <InfoCard icon={<FaUser />} label="Expected Age" value={biodata.expectedPartnerAge} />
                                <InfoCard icon={<FaRulerVertical />} label="Expected Height" value={biodata.expectedPartnerHeight} />
                                <InfoCard icon={<FaWeight />} label="Expected Weight" value={biodata.expectedPartnerWeight} />
                            </div>
                        </div>

                        {/* Contact Information */}
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 md:p-8">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-violet-500 rounded-xl flex items-center justify-center">
                                    <FaPhone className="text-white" />
                                </div>
                                Contact Information
                            </h2>

                            {canViewContact ? (
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <InfoCard icon={<FaEnvelope />} label="Email" value={biodata.userEmail} />
                                    <InfoCard icon={<FaPhone />} label="Mobile" value={biodata.mobileNumber} />
                                </div>
                            ) : (
                                <div className="text-center py-10 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-2xl border border-slate-200">
                                    <div className="w-16 h-16 bg-slate-200 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaLock className="text-3xl text-slate-400" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-700 mb-2">Contact Information is Hidden</h3>
                                    <p className="text-slate-500 mb-6 max-w-sm mx-auto">Only premium members can view contact information directly</p>
                                    <Link
                                        to={`/checkout/${biodata.biodataId}`}
                                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                                    >
                                        <FaCheckCircle /> Request Contact Info (৳500)
                                    </Link>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Sidebar - Similar Biodatas */}
                    <div className="lg:col-span-1">
                        <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sticky top-24">
                            <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-3">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                    <FaHeart className="text-white" />
                                </div>
                                Similar Profiles
                            </h2>

                            {similarBiodatas.length === 0 ? (
                                <div className="text-center py-8">
                                    <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <FaUser className="text-2xl text-slate-300" />
                                    </div>
                                    <p className="text-slate-500">No similar profiles found</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {similarBiodatas.map((similar) => (
                                        <Link
                                            key={similar._id}
                                            to={`/biodata/${similar.biodataId}`}
                                            className="block p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <img
                                                    src={similar.profileImage || 'https://via.placeholder.com/60x60'}
                                                    alt="Profile"
                                                    className="w-14 h-14 rounded-xl object-cover group-hover:scale-105 transition-transform"
                                                />
                                                <div className="flex-1 min-w-0">
                                                    <p className="text-xs text-slate-400">ID: {similar.biodataId}</p>
                                                    <p className="font-semibold text-slate-800 truncate">{similar.occupation}</p>
                                                    <p className="text-sm text-slate-500">{similar.permanentDivision} • {similar.age} yrs</p>
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
