import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaUser, FaEdit, FaCrown, FaMapMarkerAlt, FaBriefcase, FaCalendar, FaRulerVertical, FaWeight, FaPhone, FaEnvelope, FaSparkles, FaCheckCircle, FaClock, FaHeart } from 'react-icons/fa';
import { biodataAPI } from '../../../api/api';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ViewBiodata = () => {
    const { isPremium } = useAuth();
    const queryClient = useQueryClient();

    const { data: biodata, isLoading, error } = useQuery({
        queryKey: ['myBiodata'],
        queryFn: async () => {
            const response = await biodataAPI.getMyBiodata();
            return response.data;
        }
    });

    const requestPremiumMutation = useMutation({
        mutationFn: () => biodataAPI.requestPremium(),
        onSuccess: () => {
            queryClient.invalidateQueries(['myBiodata']);
            toast.success('Premium request submitted! Please wait for admin approval.');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to request premium');
        }
    });

    const handleRequestPremium = async () => {
        const result = await Swal.fire({
            title: 'Request Premium Membership?',
            text: 'Are you sure you want to make your biodata premium? Admin approval is required.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Request Premium!'
        });

        if (result.isConfirmed) {
            requestPremiumMutation.mutate();
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="spinner-lg"></div>
                <p className="mt-4 text-slate-500">Loading biodata...</p>
            </div>
        );
    }

    if (error || !biodata) {
        return (
            <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-12 text-center">
                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FaUser className="text-4xl text-slate-300" />
                </div>
                <h2 className="text-xl font-bold text-slate-700 mb-2">No Biodata Found</h2>
                <p className="text-slate-500 mb-6">You haven't created your biodata yet.</p>
                <Link
                    to="/dashboard/edit-biodata"
                    className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                >
                    <FaEdit /> Create Biodata
                </Link>
            </div>
        );
    }

    const InfoItem = ({ icon, label, value, color = 'from-emerald-500 to-teal-500' }) => (
        <div className="group flex items-start gap-4 p-4 bg-gradient-to-br from-slate-50 to-slate-100/50 rounded-xl border border-slate-100 hover:border-emerald-200 hover:shadow-md transition-all">
            <div className={`w-10 h-10 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center text-white flex-shrink-0 group-hover:scale-110 transition-transform`}>
                {icon}
            </div>
            <div className="min-w-0 flex-1">
                <p className="text-xs font-medium text-slate-400 uppercase tracking-wide">{label}</p>
                <p className="font-semibold text-slate-800 break-words mt-0.5">{value || 'N/A'}</p>
            </div>
        </div>
    );

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-2">
                        <FaSparkles className="text-xs" />
                        <span>My Profile</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">My Biodata</h1>
                    <p className="text-slate-500 mt-1">View your biodata information</p>
                </div>
                <div className="flex flex-wrap gap-3">
                    <Link
                        to="/dashboard/edit-biodata"
                        className="inline-flex items-center gap-2 px-5 py-2.5 border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-emerald-500 hover:text-emerald-600 transition-all"
                    >
                        <FaEdit /> Edit
                    </Link>
                    {!isPremium && biodata.premiumRequestStatus !== 'pending' && (
                        <button
                            onClick={handleRequestPremium}
                            disabled={requestPremiumMutation.isLoading}
                            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-amber-500/25 transition-all disabled:opacity-50"
                        >
                            <FaCrown /> Make Premium
                        </button>
                    )}
                    {biodata.premiumRequestStatus === 'pending' && (
                        <span className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-amber-100 text-amber-700 text-sm font-bold rounded-xl">
                            <FaClock /> Pending Approval
                        </span>
                    )}
                    {isPremium && (
                        <span className="inline-flex items-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-sm font-bold rounded-xl shadow-lg shadow-amber-500/25">
                            <FaCrown /> Premium Member
                        </span>
                    )}
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
                {/* Profile Header */}
                <div className="bg-gradient-to-r from-emerald-500 via-teal-500 to-emerald-600 p-6 md:p-8 relative overflow-hidden">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
                    <div className="relative flex flex-col md:flex-row items-center gap-6">
                        <div className="relative">
                            <img
                                src={biodata.profileImage || 'https://via.placeholder.com/150'}
                                alt="Profile"
                                className="w-32 h-32 rounded-2xl object-cover border-4 border-white/20 shadow-lg"
                            />
                            {isPremium && (
                                <div className="absolute -top-2 -right-2 w-8 h-8 bg-gradient-to-r from-amber-500 to-amber-400 rounded-full flex items-center justify-center shadow-lg">
                                    <FaCrown className="text-white text-sm" />
                                </div>
                            )}
                        </div>
                        <div className="text-center md:text-left">
                            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 mb-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-bold ${biodata.biodataType === 'Male'
                                        ? 'bg-blue-500 text-white'
                                        : 'bg-pink-500 text-white'
                                    }`}>
                                    {biodata.biodataType}
                                </span>
                                <span className="text-white/70 text-sm">ID: #{biodata.biodataId}</span>
                            </div>
                            <h2 className="text-2xl md:text-3xl font-bold text-white">{biodata.name}</h2>
                            <p className="text-emerald-100 flex items-center justify-center md:justify-start gap-2 mt-2">
                                <FaBriefcase /> {biodata.occupation}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Information Grid */}
                <div className="p-6 md:p-8">
                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaUser className="text-emerald-500" /> Personal Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <InfoItem icon={<FaCalendar />} label="Date of Birth" value={new Date(biodata.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                        <InfoItem icon={<FaUser />} label="Age" value={`${biodata.age} years`} />
                        <InfoItem icon={<FaRulerVertical />} label="Height" value={biodata.height} />
                        <InfoItem icon={<FaWeight />} label="Weight" value={biodata.weight} />
                        <InfoItem icon={<FaBriefcase />} label="Occupation" value={biodata.occupation} />
                        <InfoItem icon={<FaUser />} label="Skin Color" value={biodata.race} />
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaHeart className="text-pink-500" /> Family Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <InfoItem icon={<FaUser />} label="Father's Name" value={biodata.fathersName} color="from-pink-500 to-rose-500" />
                        <InfoItem icon={<FaUser />} label="Mother's Name" value={biodata.mothersName} color="from-pink-500 to-rose-500" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaMapMarkerAlt className="text-blue-500" /> Location
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <InfoItem icon={<FaMapMarkerAlt />} label="Permanent Division" value={biodata.permanentDivision} color="from-blue-500 to-indigo-500" />
                        <InfoItem icon={<FaMapMarkerAlt />} label="Present Division" value={biodata.presentDivision} color="from-blue-500 to-indigo-500" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaSparkles className="text-amber-500" /> Partner Expectations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                        <InfoItem icon={<FaUser />} label="Expected Partner Age" value={biodata.expectedPartnerAge} color="from-amber-500 to-orange-500" />
                        <InfoItem icon={<FaRulerVertical />} label="Expected Partner Height" value={biodata.expectedPartnerHeight} color="from-amber-500 to-orange-500" />
                        <InfoItem icon={<FaWeight />} label="Expected Partner Weight" value={biodata.expectedPartnerWeight} color="from-amber-500 to-orange-500" />
                    </div>

                    <h3 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-2">
                        <FaPhone className="text-purple-500" /> Contact Information
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        <InfoItem icon={<FaEnvelope />} label="Email" value={biodata.userEmail} color="from-purple-500 to-violet-500" />
                        <InfoItem icon={<FaPhone />} label="Mobile Number" value={biodata.mobileNumber} color="from-purple-500 to-violet-500" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewBiodata;
