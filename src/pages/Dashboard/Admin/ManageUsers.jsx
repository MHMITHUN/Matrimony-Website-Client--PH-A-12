import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaSearch, FaUserShield, FaCrown, FaUser, FaCheck } from 'react-icons/fa';
import { adminAPI } from '../../../api/api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ManageUsers = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const queryClient = useQueryClient();

    const { data: users = [], isLoading } = useQuery({
        queryKey: ['adminUsers', searchTerm],
        queryFn: async () => {
            const response = await adminAPI.getUsers(searchTerm);
            return response.data;
        }
    });

    const makeAdminMutation = useMutation({
        mutationFn: (id) => adminAPI.makeAdmin(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['adminUsers']);
            toast.success('User is now an admin!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to make admin');
        }
    });

    const makePremiumMutation = useMutation({
        mutationFn: (id) => adminAPI.makePremium(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['adminUsers']);
            toast.success('User is now premium!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to make premium');
        }
    });

    const handleMakeAdmin = async (user) => {
        const result = await Swal.fire({
            title: 'Make Admin?',
            text: `Are you sure you want to make ${user.name} an admin?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2E7D32',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Admin!'
        });

        if (result.isConfirmed) {
            makeAdminMutation.mutate(user._id);
        }
    };

    const handleMakePremium = async (user) => {
        const result = await Swal.fire({
            title: 'Make Premium?',
            text: `Are you sure you want to make ${user.name} a premium member?`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#D4AF37',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Make Premium!'
        });

        if (result.isConfirmed) {
            makePremiumMutation.mutate(user._id);
        }
    };

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">Manage Users</h1>
                    <p className="text-gray-600">View and manage all registered users</p>
                </div>

                {/* Search */}
                <div className="relative">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by username..."
                        className="input-field pl-12 w-full sm:w-64"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <div className="spinner"></div>
                </div>
            ) : users.length === 0 ? (
                <div className="card p-12 text-center">
                    <FaUser className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-700 mb-2">No Users Found</h2>
                    <p className="text-gray-500">No users match your search criteria.</p>
                </div>
            ) : (
                <div className="table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>User Name</th>
                                <th>User Email</th>
                                <th>Role</th>
                                <th>Premium</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user._id}>
                                    <td className="font-medium">{user.name || 'N/A'}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        {user.role === 'admin' ? (
                                            <span className="inline-flex items-center gap-1 text-green-600 font-semibold">
                                                <FaUserShield /> Admin
                                            </span>
                                        ) : (
                                            <span className="text-gray-500">User</span>
                                        )}
                                    </td>
                                    <td>
                                        {user.isPremium ? (
                                            <span className="badge-premium flex items-center gap-1 w-fit">
                                                <FaCrown /> Premium
                                            </span>
                                        ) : (
                                            <span className="text-gray-400">No</span>
                                        )}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            {user.role !== 'admin' && (
                                                <button
                                                    onClick={() => handleMakeAdmin(user)}
                                                    disabled={makeAdminMutation.isLoading}
                                                    className="px-3 py-1.5 bg-green-100 text-green-700 rounded-lg hover:bg-green-200 transition-colors text-sm flex items-center gap-1"
                                                >
                                                    <FaUserShield className="text-xs" /> Make Admin
                                                </button>
                                            )}
                                            {!user.isPremium && (
                                                <button
                                                    onClick={() => handleMakePremium(user)}
                                                    disabled={makePremiumMutation.isLoading}
                                                    className="px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-colors text-sm flex items-center gap-1"
                                                >
                                                    <FaCrown className="text-xs" /> Make Premium
                                                </button>
                                            )}
                                            {user.role === 'admin' && user.isPremium && (
                                                <span className="text-gray-400 text-sm flex items-center gap-1">
                                                    <FaCheck className="text-green-500" /> Fully Privileged
                                                </span>
                                            )}
                                        </div>
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

export default ManageUsers;
