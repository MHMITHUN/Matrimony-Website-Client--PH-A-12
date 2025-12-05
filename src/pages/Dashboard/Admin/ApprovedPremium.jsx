import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCrown, FaCheck, FaUser } from 'react-icons/fa';
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
            confirmButtonColor: '#D4AF37',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve!'
        });

        if (result.isConfirmed) {
            approveMutation.mutate(request.biodataId);
        }
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
                    <FaCrown className="text-amber-500" /> Approved Premium
                </h1>
                <p className="text-gray-600">Manage premium membership requests</p>
            </div>

            {requests.length === 0 ? (
                <div className="card p-12 text-center">
                    <FaCrown className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-700 mb-2">No Pending Requests</h2>
                    <p className="text-gray-500">There are no premium requests waiting for approval.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Biodata Id</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request._id}>
                                    <td className="font-medium flex items-center gap-2">
                                        <FaUser className="text-green-600" /> {request.name}
                                    </td>
                                    <td>{request.userEmail}</td>
                                    <td>#{request.biodataId}</td>
                                    <td>
                                        <button
                                            onClick={() => handleApprove(request)}
                                            disabled={approveMutation.isLoading}
                                            className="px-4 py-2 bg-gradient-to-r from-amber-400 to-amber-600 text-white rounded-lg hover:from-amber-500 hover:to-amber-700 transition-all flex items-center gap-2"
                                        >
                                            <FaCheck /> Make Premium
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default ApprovedPremium;
