import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaEnvelope, FaTrash, FaCheckCircle, FaClock, FaPhone } from 'react-icons/fa';
import { contactRequestAPI } from '../../../api/api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyContactRequests = () => {
    const queryClient = useQueryClient();

    const { data: requests = [], isLoading } = useQuery({
        queryKey: ['myContactRequests'],
        queryFn: async () => {
            const response = await contactRequestAPI.getMyRequests();
            return response.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => contactRequestAPI.delete(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['myContactRequests']);
            toast.success('Contact request deleted successfully');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to delete request');
        }
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Delete Contact Request?',
            text: 'This action cannot be undone.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Delete!'
        });

        if (result.isConfirmed) {
            deleteMutation.mutate(id);
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
                <h1 className="text-2xl font-bold text-gray-800">My Contact Requests</h1>
                <p className="text-gray-600">View all your contact information requests</p>
            </div>

            {requests.length === 0 ? (
                <div className="card p-12 text-center">
                    <FaEnvelope className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-700 mb-2">No Contact Requests</h2>
                    <p className="text-gray-500">You haven't requested any contact information yet.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Biodata ID</th>
                                <th>Status</th>
                                <th>Mobile No</th>
                                <th>Email</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map((request) => (
                                <tr key={request._id}>
                                    <td className="font-medium">{request.name}</td>
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
                                        {request.status === 'approved' ? (
                                            <a href={`tel:${request.mobileNumber}`} className="text-green-600 hover:underline flex items-center gap-1">
                                                <FaPhone className="text-sm" /> {request.mobileNumber}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">Hidden</span>
                                        )}
                                    </td>
                                    <td>
                                        {request.status === 'approved' ? (
                                            <a href={`mailto:${request.email}`} className="text-green-600 hover:underline flex items-center gap-1">
                                                <FaEnvelope className="text-sm" /> {request.email}
                                            </a>
                                        ) : (
                                            <span className="text-gray-400">Hidden</span>
                                        )}
                                    </td>
                                    <td>
                                        <button
                                            onClick={() => handleDelete(request._id)}
                                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            title="Delete"
                                        >
                                            <FaTrash />
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

export default MyContactRequests;
