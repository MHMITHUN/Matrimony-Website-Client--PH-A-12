import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCrown, FaCheck, FaUser, FaStar, FaEnvelope, FaIdCard, FaBriefcase, FaMapMarkerAlt, FaClock, FaHistory, FaHourglassHalf } from 'react-icons/fa';
import { adminAPI } from '../../../api/api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ApprovedPremium = () => {
    const [activeTab, setActiveTab] = useState('pending'); // 'pending' or 'history'
    const queryClient = useQueryClient();

    // Fetch pending requests
    const { data: pendingRequests = [], isLoading: loadingPending } = useQuery({
        queryKey: ['premiumRequests'],
        queryFn: async () => {
            const response = await adminAPI.getPremiumRequests();
            return response.data;
        }
    });

    // Fetch approved history
    const { data: approvedMembers = [], isLoading: loadingHistory } = useQuery({
        queryKey: ['approvedPremiumHistory'],
        queryFn: async () => {
            const response = await adminAPI.getApprovedPremiumHistory();
            return response.data;
        }
    });

    const approveMutation = useMutation({
        mutationFn: (biodataId) => adminAPI.approvePremium(biodataId),
        onSuccess: () => {
            queryClient.invalidateQueries(['premiumRequests']);
            queryClient.invalidateQueries(['approvedPremiumHistory']);
            toast.success('Premium request approved!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to approve');
        }
    });

    const handleApprove = async (request) => {
        const result = await Swal.fire({
            title: 'Approve Premium Request?',
            text: `Approve premium request for ${request.name}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#f59e0b',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Approve!'
        });

        if (result.isConfirmed) {
            approveMutation.mutate(request.biodataId);
        }
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const isLoading = activeTab === 'pending' ? loadingPending : loadingHistory;
    const data = activeTab === 'pending' ? pendingRequests : approvedMembers;

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-600 text-sm font-medium mb-2">
                    <FaStar className="text-xs" />
                    <span>Premium Management</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                    Premium Requests
                </h1>
                <p className="text-slate-500 mt-1">Manage premium membership requests and view history</p>
            </div>

            {/* Tabs */}
            <div className="flex gap-2 border-b border-slate-200">
                <button
                    onClick={() => setActiveTab('pending')}
                    className={`px-6 py-3 font-semibold transition-all relative ${activeTab === 'pending'
                            ? 'text-amber-600'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <span className="flex items-center gap-2">
                        <FaHourglassHalf />
                        Pending Requests
                        {pendingRequests.length > 0 && (
                            <span className="ml-1 px-2 py-0.5 bg-amber-500 text-white text-xs rounded-full">
                                {pendingRequests.length}
                            </span>
                        )}
                    </span>
                    {activeTab === 'pending' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-amber-500 to-orange-500"></div>
                    )}
                </button>
                <button
                    onClick={() => setActiveTab('history')}
                    className={`px-6 py-3 font-semibold transition-all relative ${activeTab === 'history'
                            ? 'text-emerald-600'
                            : 'text-slate-500 hover:text-slate-700'
                        }`}
                >
                    <span className="flex items-center gap-2">
                        <FaHistory />
                        Approved History
                        <span className="ml-1 text-xs text-slate-400">({approvedMembers.length})</span>
                    </span>
                    {activeTab === 'history' && (
                        <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-500 to-teal-500"></div>
                    )}
                </button>
            </div>

            {/* Content */}
            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="spinner-lg"></div>
                    <p className="mt-4 text-slate-500">Loading...</p>
                </div>
            ) : data.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-12 text-center">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCrown className="text-4xl text-amber-300" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-700 mb-2">
                        {activeTab === 'pending' ? 'No Pending Requests' : 'No Premium Members Yet'}
                    </h2>
                    <p className="text-slate-500">
                        {activeTab === 'pending'
                            ? 'There are no premium requests waiting for approval.'
                            : 'There are no approved premium members to display.'}
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {activeTab === 'pending' ? (
                        /* Pending Requests */
                        pendingRequests.map((request, index) => (
                            <div
                                key={request._id}
                                className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 hover:shadow-xl transition-all animate-fade-in-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-amber-500 to-orange-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-amber-500/25">
                                            {request.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800">{request.name}</h3>
                                            <span className="inline-flex items-center gap-1 text-xs text-amber-600 font-medium">
                                                <FaCrown className="text-[10px]" /> Wants Premium
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaEnvelope className="text-slate-400" />
                                        <span className="text-slate-600 truncate">{request.userEmail}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaIdCard className="text-slate-400" />
                                        <span className="text-slate-600">Biodata ID: #{request.biodataId}</span>
                                    </div>
                                </div>

                                <button
                                    onClick={() => handleApprove(request)}
                                    disabled={approveMutation.isLoading}
                                    className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-50"
                                >
                                    <FaCheck /> Approve Premium
                                </button>
                            </div>
                        ))
                    ) : (
                        /* Approved History */
                        approvedMembers.map((member, index) => (
                            <div
                                key={member._id}
                                className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 hover:shadow-xl transition-all animate-fade-in-up"
                                style={{ animationDelay: `${index * 50}ms` }}
                            >
                                <div className="flex items-start justify-between mb-4">
                                    <div className="flex items-center gap-3">
                                        <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold shadow-lg shadow-emerald-500/25">
                                            {member.name?.charAt(0)?.toUpperCase() || 'U'}
                                        </div>
                                        <div>
                                            <h3 className="font-bold text-slate-800">{member.name}</h3>
                                            <span className="inline-flex items-center gap-1 text-xs bg-gradient-to-r from-amber-500 to-orange-500 text-white px-2 py-0.5 rounded-full font-medium">
                                                <FaCrown className="text-[8px]" /> Premium
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-2.5 mb-4">
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaEnvelope className="text-slate-400 shrink-0" />
                                        <span className="text-slate-600 truncate">{member.userEmail}</span>
                                    </div>
                                    <div className="flex items-center gap-2 text-sm">
                                        <FaIdCard className="text-slate-400 shrink-0" />
                                        <span className="text-slate-600">Biodata ID: #{member.biodataId}</span>
                                    </div>
                                    {member.age && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaUser className="text-slate-400 shrink-0" />
                                            <span className="text-slate-600">{member.age} years old</span>
                                        </div>
                                    )}
                                    {member.occupation && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaBriefcase className="text-slate-400 shrink-0" />
                                            <span className="text-slate-600">{member.occupation}</span>
                                        </div>
                                    )}
                                    {member.permanentDivision && (
                                        <div className="flex items-center gap-2 text-sm">
                                            <FaMapMarkerAlt className="text-slate-400 shrink-0" />
                                            <span className="text-slate-600">{member.permanentDivision}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center gap-2 text-sm pt-2 border-t border-slate-100">
                                        <FaClock className="text-emerald-500 shrink-0" />
                                        <span className="text-slate-500 text-xs">Approved: {formatDate(member.updatedAt || member.createdAt)}</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-slate-100">
                                    <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-emerald-50 text-emerald-700 rounded-lg text-xs font-medium">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        Active Premium Member
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            )}
        </div>
    );
};

export default ApprovedPremium;
