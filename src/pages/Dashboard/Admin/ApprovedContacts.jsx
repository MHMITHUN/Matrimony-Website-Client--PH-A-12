import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaCheckCircle, FaEnvelope, FaUser, FaClock } from 'react-icons/fa';
import { adminAPI } from '../../../api/api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ApprovedContacts = () => {
    const queryClient = useQueryClient();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['adminContactRequests'],
        queryFn: async () => {
            const response = await adminAPI.getContactRequests();
            return response.data;
        }
    });

    const approveMutation = useMutation({
        mutationFn: (id) => adminAPI.approveContact(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['adminContactRequests']);
            toast.success('Contact request approved!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to approve');
        }
    });

    const handleApprove = async (request) => {
        const result = await Swal.fire({
            title: 'Approve Contact Request?',
            text: `Approve contact request from ${request.requesterName}?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2E7D32',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Approve!'
        });

        if (result.isConfirmed) {
            approveMutation.mutate(request._id);
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
                    <FaCheckCircle className="text-green-600" /> Approved Contact Request
                </h1>
                <p className="text-gray-600">Manage contact information requests</p>
            </div>

            {requests.length === 0 ? (
                <div className="card p-12 text-center">
                    <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-700 mb-2">No Contact Requests</h2>
                    <p className="text-gray-500">There are no contact requests to manage.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Requester Name</th>
                                <th>Requester Email</th>
                                <th>Biodata ID</th>
                                <th>Status</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request._id}>
                                    <td className="font-medium flex items-center gap-2">
                                        <FaUser className="text-green-600" /> {request.requesterName}
                                    </td>
                                    <td>{request.requesterEmail}</td>
                                    <td>#{request.biodataId}</td>
                                    <td>
                                        {request.status === 'approved' ? (
                                            <span className="badge-approved flex items-center gap-1 w-fit">
                                                <FaCheckCircle /> Approved
                                            </span>
                                        ) : (
                                            <span className="badge-pending flex items-center gap-1 w-fit">
                                                <FaClock /> Pending
                                            </span>
                                        )}
                                    </td>
                                    <td>
                                        {request.status === 'pending' ? (
                                            <button
                                                onClick={() => handleApprove(request)}
                                                disabled={approveMutation.isLoading}
                                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all flex items-center gap-2"
                                            >
                                                <FaCheckCircle /> Approve
                                            </button>
                                        ) : (
                                            <span className="text-gray-400 text-sm">Already Approved</span>
                                        )}
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

export default ApprovedContacts;
