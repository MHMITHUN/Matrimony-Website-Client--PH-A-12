import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaSearch, FaUserShield, FaCrown, FaUser, FaCheck, FaUsers, FaStar } from 'react-icons/fa';
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
            confirmButtonColor: '#10b981',
            cancelButtonColor: '#ef4444',
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
            confirmButtonColor: '#f59e0b',
            cancelButtonColor: '#ef4444',
            confirmButtonText: 'Yes, Make Premium!'
        });

        if (result.isConfirmed) {
            makePremiumMutation.mutate(user._id);
        }
    };

    const removePremiumMutation = useMutation({
        mutationFn: (id) => adminAPI.removePremium(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['adminUsers']);
            toast.success('Premium status removed!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to remove premium');
        }
    });

    const handleRemovePremium = async (user) => {
        const result = await Swal.fire({
            title: 'Remove Premium?',
            text: `Are you sure you want to remove premium status from ${user.name}?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, Remove Premium!'
        });

        if (result.isConfirmed) {
            removePremiumMutation.mutate(user._id);
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-2">
                        <FaStar className="text-xs" />
                        <span>User Management</span>
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Manage Users</h1>
                    <p className="text-slate-500 mt-1">View and manage all registered users</p>
                </div>

                {/* Search */}
                <div className="relative group">
                    <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors" />
                    <input
                        type="text"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Search by username..."
                        className="w-full sm:w-72 pl-12 pr-4 py-3 bg-white border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400"
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="flex flex-col items-center justify-center py-20">
                    <div className="spinner-lg"></div>
                    <p className="mt-4 text-slate-500">Loading users...</p>
                </div>
            ) : users.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-12 text-center">
                    <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaUser className="text-4xl text-slate-300" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-700 mb-2">No Users Found</h2>
                    <p className="text-slate-500">No users match your search criteria.</p>
                </div>
            ) : (
                <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-gradient-to-r from-slate-50 to-slate-100">
                                    <th className="text-left px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">User</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Email</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Role</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Status</th>
                                    <th className="text-left px-6 py-4 text-sm font-bold text-slate-600 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {users.map((user, index) => (
                                    <tr
                                        key={user._id}
                                        className="hover:bg-slate-50/50 transition-colors animate-fade-in-up"
                                        style={{ animationDelay: `${index * 50}ms` }}
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center text-white font-bold">
                                                    {user.name?.charAt(0)?.toUpperCase() || 'U'}
                                                </div>
                                                <span className="font-semibold text-slate-800">{user.name || 'N/A'}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-slate-600">{user.email}</td>
                                        <td className="px-6 py-4">
                                            {user.role === 'admin' ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full">
                                                    <FaUserShield className="text-[10px]" /> Admin
                                                </span>
                                            ) : (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-slate-100 text-slate-600 text-xs font-medium rounded-full">
                                                    <FaUser className="text-[10px]" /> User
                                                </span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            {user.isPremium ? (
                                                <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-gradient-to-r from-amber-500 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg shadow-amber-500/25">
                                                    <FaCrown className="text-[10px]" /> Premium
                                                </span>
                                            ) : (
                                                <span className="text-slate-400 text-sm">Standard</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2 flex-wrap">
                                                {user.role !== 'admin' && (
                                                    <button
                                                        onClick={() => handleMakeAdmin(user)}
                                                        disabled={makeAdminMutation.isLoading}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-emerald-100 text-emerald-700 rounded-lg hover:bg-emerald-200 transition-all text-sm font-medium hover:shadow-md disabled:opacity-50"
                                                    >
                                                        <FaUserShield className="text-xs" /> Make Admin
                                                    </button>
                                                )}
                                                {!user.isPremium && (
                                                    <button
                                                        onClick={() => handleMakePremium(user)}
                                                        disabled={makePremiumMutation.isLoading}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-amber-100 text-amber-700 rounded-lg hover:bg-amber-200 transition-all text-sm font-medium hover:shadow-md disabled:opacity-50"
                                                    >
                                                        <FaCrown className="text-xs" /> Make Premium
                                                    </button>
                                                )}
                                                {user.isPremium && (
                                                    <button
                                                        onClick={() => handleRemovePremium(user)}
                                                        disabled={removePremiumMutation.isLoading}
                                                        className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-red-100 text-red-700 rounded-lg hover:bg-red-200 transition-all text-sm font-medium hover:shadow-md disabled:opacity-50"
                                                    >
                                                        <FaCrown className="text-xs" /> Remove Premium
                                                    </button>
                                                )}
                                                {user.role === 'admin' && user.isPremium && (
                                                    <span className="inline-flex items-center gap-1.5 text-emerald-600 text-sm font-medium">
                                                        <FaCheck className="text-xs" /> Fully Privileged
                                                    </span>
                                                )}
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ManageUsers;

