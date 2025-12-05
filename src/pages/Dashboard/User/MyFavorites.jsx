import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { FaHeart, FaTrash, FaEye, FaMapMarkerAlt, FaBriefcase } from 'react-icons/fa';
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
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Yes, Remove!'
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
                <h1 className="text-2xl font-bold text-gray-800">My Favourites Biodata</h1>
                <p className="text-gray-600">View all your favourite biodatas</p>
            </div>

            {favorites.length === 0 ? (
                <div className="card p-12 text-center">
                    <FaHeart className="text-6xl text-gray-300 mx-auto mb-4" />
                    <h2 className="text-xl font-bold text-gray-700 mb-2">No Favorites Yet</h2>
                    <p className="text-gray-500 mb-6">You haven't added any biodata to your favorites.</p>
                    <Link to="/biodatas" className="btn-primary inline-block">
                        Browse Biodatas
                    </Link>
                </div>
            ) : (
                <div className="table-container">
                    <table className="custom-table">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Biodata ID</th>
                                <th>Permanent Address</th>
                                <th>Occupation</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {favorites.map((favorite) => (
                                <tr key={favorite._id}>
                                    <td className="font-medium">{favorite.name}</td>
                                    <td>#{favorite.biodataId}</td>
                                    <td className="flex items-center gap-2">
                                        <FaMapMarkerAlt className="text-green-600" /> {favorite.permanentAddress}
                                    </td>
                                    <td className="flex items-center gap-2">
                                        <FaBriefcase className="text-green-600" /> {favorite.occupation}
                                    </td>
                                    <td>
                                        <div className="flex items-center gap-2">
                                            <Link
                                                to={`/biodata/${favorite.biodataId}`}
                                                className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                                                title="View Profile"
                                            >
                                                <FaEye />
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(favorite._id)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                                title="Remove"
                                            >
                                                <FaTrash />
                                            </button>
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

export default MyFavorites;
