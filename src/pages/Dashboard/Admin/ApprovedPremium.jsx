import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCrown, FaCheck, FaUser, FaSparkles, FaEnvelope, FaIdCard } from 'react-icons/fa';
import { adminAPI } from '../../../api/api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ApprovedPremium = () => {
    const queryClient = useQueryClient();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['premiumRequests'],
        queryFn: async () => {
            const response = await adminAPI.getPremiumRequests();
            return response.data;
        }
    });

    const approveMutation = useMutation({
        mutationFn: (biodataId) => adminAPI.approvePremium(biodataId),
        onSuccess: () => {
            queryClient.invalidateQueries(['premiumRequests']);
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

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="spinner-lg"></div>
                <p className="mt-4 text-slate-500">Loading requests...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500/10 rounded-full text-amber-600 text-sm font-medium mb-2">
                    <FaSparkles className="text-xs" />
                    <span>Premium Management</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800 flex items-center gap-3">
                    Premium Requests
                </h1>
                <p className="text-slate-500 mt-1">Manage premium membership requests</p>
            </div>

            {requests.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-12 text-center">
                    <div className="w-20 h-20 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaCrown className="text-4xl text-amber-300" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-700 mb-2">No Pending Requests</h2>
                    <p className="text-slate-500">There are no premium requests waiting for approval.</p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {requests.map((request, index) => (
                        <div
                            key={request._id}
                            className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-6 hover:shadow-xl transition-all animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Header */}
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

                            {/* Info */}
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

                            {/* Action */}
                            <button
                                onClick={() => handleApprove(request)}
                                disabled={approveMutation.isLoading}
                                className="w-full flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition-all shadow-lg shadow-amber-500/25 hover:shadow-xl hover:shadow-amber-500/30 disabled:opacity-50"
                            >
                                <FaCheck /> Approve Premium
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ApprovedPremium;
