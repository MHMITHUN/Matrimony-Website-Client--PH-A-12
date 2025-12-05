import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash, FaEye, FaMapMarkerAlt, FaBriefcase, FaSparkles, FaUser } from 'react-icons/fa';
import { favoritesAPI } from '../../../api/api';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const MyFavorites = () => {
    const queryClient = useQueryClient();

    const { data: favorites = [], isLoading } = useQuery({
        queryKey: ['myFavorites'],
        queryFn: async () => {
            const response = await favoritesAPI.getAll();
            return response.data;
        }
    });

    const deleteMutation = useMutation({
        mutationFn: (id) => favoritesAPI.remove(id),
        onSuccess: () => {
            queryClient.invalidateQueries(['myFavorites']);
            toast.success('Removed from favorites');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to remove');
        }
    });

    const handleDelete = async (id) => {
        const result = await Swal.fire({
            title: 'Remove from Favorites?',
            text: 'This biodata will be removed from your favorites.',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#ef4444',
            cancelButtonColor: '#64748b',
            confirmButtonText: 'Yes, Remove!'
        });

        if (result.isConfirmed) {
            deleteMutation.mutate(id);
        }
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="spinner-lg"></div>
                <p className="mt-4 text-slate-500">Loading favorites...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-pink-500/10 rounded-full text-pink-600 text-sm font-medium mb-2">
                    <FaSparkles className="text-xs" />
                    <span>My Favorites</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">Favourites Biodata</h1>
                <p className="text-slate-500 mt-1">View all your favourite biodatas</p>
            </div>

            {favorites.length === 0 ? (
                <div className="bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100 p-12 text-center">
                    <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-6">
                        <FaHeart className="text-4xl text-pink-300" />
                    </div>
                    <h2 className="text-xl font-bold text-slate-700 mb-2">No Favorites Yet</h2>
                    <p className="text-slate-500 mb-6">You haven't added any biodata to your favorites.</p>
                    <Link
                        to="/biodatas"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                    >
                        Browse Biodatas
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {favorites.map((favorite, index) => (
                        <div
                            key={favorite._id}
                            className="group bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all animate-fade-in-up"
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Header */}
                            <div className="relative p-5 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 overflow-hidden">
                                <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23ffffff%22%20fill-opacity%3D%220.1%22%3E%3Cpath%20d%3D%22M36%2034v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6%2034v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6%204V0H4v4H0v2h4v4h2V6h4V4H6z%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')] opacity-30"></div>
                                <div className="relative flex items-center gap-3">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center text-white font-bold text-lg">
                                        {favorite.name?.charAt(0)?.toUpperCase() || 'U'}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-white">{favorite.name}</h3>
                                        <span className="text-white/70 text-sm">ID: #{favorite.biodataId}</span>
                                    </div>
                                </div>
                                <div className="absolute top-3 right-3">
                                    <FaHeart className="text-white/50 text-xl animate-pulse" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-5 space-y-4">
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-8 h-8 bg-emerald-100 rounded-lg flex items-center justify-center">
                                        <FaMapMarkerAlt className="text-emerald-500 text-sm" />
                                    </div>
                                    <span className="truncate">{favorite.permanentAddress || 'Not specified'}</span>
                                </div>
                                <div className="flex items-center gap-3 text-slate-600">
                                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                                        <FaBriefcase className="text-blue-500 text-sm" />
                                    </div>
                                    <span className="truncate">{favorite.occupation || 'Not specified'}</span>
                                </div>

                                {/* Actions */}
                                <div className="flex gap-2 pt-2">
                                    <Link
                                        to={`/biodata/${favorite.biodataId}`}
                                        className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition-all shadow-lg shadow-emerald-500/25"
                                    >
                                        <FaEye /> View
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(favorite._id)}
                                        disabled={deleteMutation.isLoading}
                                        className="px-4 py-3 border-2 border-red-200 text-red-500 rounded-xl hover:bg-red-50 hover:border-red-300 transition-all disabled:opacity-50"
                                        title="Remove from favorites"
                                    >
                                        <FaTrash />
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default MyFavorites;
