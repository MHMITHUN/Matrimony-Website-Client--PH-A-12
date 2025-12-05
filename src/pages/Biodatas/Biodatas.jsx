import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaFilter, FaSearch, FaMale, FaFemale, FaMapMarkerAlt, FaBriefcase, FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { biodataAPI } from '../../api/api';

const Biodatas = () => {
    const [filters, setFilters] = useState({
        biodataType: '',
        division: '',
        minAge: '',
        maxAge: ''
    });
    const [page, setPage] = useState(1);
    const [showMobileFilter, setShowMobileFilter] = useState(false);
    const limit = 20;

    const divisions = ['Dhaka', 'Chattagram', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet'];

    const { data, isLoading, isFetching } = useQuery({
        queryKey: ['biodatas', filters, page],
        queryFn: async () => {
            const params = {
                page,
                limit,
                ...(filters.biodataType && { biodataType: filters.biodataType }),
                ...(filters.division && { division: filters.division }),
                ...(filters.minAge && { minAge: filters.minAge }),
                ...(filters.maxAge && { maxAge: filters.maxAge })
            };
            const response = await biodataAPI.getAll(params);
            return response.data;
        },
        keepPreviousData: true
    });

    const biodatas = data?.biodatas || [];
    const pagination = data?.pagination || { currentPage: 1, totalPages: 1, totalItems: 0 };

    const handleFilterChange = (e) => {
        const { name, value } = e.target;
        setFilters(prev => ({ ...prev, [name]: value }));
        setPage(1); // Reset to first page when filter changes
    };

    const clearFilters = () => {
        setFilters({ biodataType: '', division: '', minAge: '', maxAge: '' });
        setPage(1);
    };

    const FilterSection = () => (
        <div className="space-y-6">
            {/* Biodata Type */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Biodata Type</label>
                <div className="space-y-2">
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="biodataType"
                            value=""
                            checked={filters.biodataType === ''}
                            onChange={handleFilterChange}
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-gray-600">All</span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="biodataType"
                            value="Male"
                            checked={filters.biodataType === 'Male'}
                            onChange={handleFilterChange}
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-gray-600 flex items-center gap-2">
                            <FaMale className="text-blue-500" /> Male
                        </span>
                    </label>
                    <label className="flex items-center gap-3 cursor-pointer">
                        <input
                            type="radio"
                            name="biodataType"
                            value="Female"
                            checked={filters.biodataType === 'Female'}
                            onChange={handleFilterChange}
                            className="w-4 h-4 text-green-600 focus:ring-green-500"
                        />
                        <span className="text-gray-600 flex items-center gap-2">
                            <FaFemale className="text-pink-500" /> Female
                        </span>
                    </label>
                </div>
            </div>

            {/* Age Range */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Age Range</label>
                <div className="flex gap-3">
                    <input
                        type="number"
                        name="minAge"
                        value={filters.minAge}
                        onChange={handleFilterChange}
                        placeholder="Min"
                        min="18"
                        max="80"
                        className="input-field py-2 text-sm"
                    />
                    <span className="flex items-center text-gray-400">to</span>
                    <input
                        type="number"
                        name="maxAge"
                        value={filters.maxAge}
                        onChange={handleFilterChange}
                        placeholder="Max"
                        min="18"
                        max="80"
                        className="input-field py-2 text-sm"
                    />
                </div>
            </div>

            {/* Division */}
            <div>
                <label className="block text-sm font-semibold text-gray-700 mb-3">Division</label>
                <select
                    name="division"
                    value={filters.division}
                    onChange={handleFilterChange}
                    className="select-field"
                >
                    <option value="">All Divisions</option>
                    {divisions.map(div => (
                        <option key={div} value={div}>{div}</option>
                    ))}
                </select>
            </div>

            {/* Clear Filters */}
            <button
                onClick={clearFilters}
                className="w-full py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50 transition-colors flex items-center justify-center gap-2"
            >
                <FaTimes /> Clear Filters
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container-custom">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-800">Browse Biodatas</h1>
                        <p className="text-gray-600 mt-1">
                            Showing {pagination.totalItems} biodatas
                        </p>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setShowMobileFilter(true)}
                        className="md:hidden btn-outline flex items-center gap-2"
                    >
                        <FaFilter /> Filters
                    </button>
                </div>

                <div className="flex gap-8">
                    {/* Desktop Sidebar Filter */}
                    <aside className="hidden md:block w-72 flex-shrink-0">
                        <div className="card p-6 sticky top-24">
                            <div className="flex items-center gap-2 mb-6 pb-4 border-b">
                                <FaFilter className="text-green-600" />
                                <h2 className="text-lg font-semibold text-gray-800">Filters</h2>
                            </div>
                            <FilterSection />
                        </div>
                    </aside>

                    {/* Mobile Filter Modal */}
                    {showMobileFilter && (
                        <div className="fixed inset-0 z-50 md:hidden">
                            <div className="absolute inset-0 bg-black/50" onClick={() => setShowMobileFilter(false)} />
                            <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-semibold text-gray-800 flex items-center gap-2">
                                        <FaFilter className="text-green-600" /> Filters
                                    </h2>
                                    <button onClick={() => setShowMobileFilter(false)}>
                                        <FaTimes className="text-gray-500" />
                                    </button>
                                </div>
                                <FilterSection />
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <main className="flex-1">
                        {isLoading ? (
                            <div className="flex justify-center py-20">
                                <div className="spinner"></div>
                            </div>
                        ) : biodatas.length === 0 ? (
                            <div className="text-center py-20">
                                <FaSearch className="text-6xl text-gray-300 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-600 mb-2">No Biodatas Found</h3>
                                <p className="text-gray-500">Try adjusting your filters</p>
                            </div>
                        ) : (
                            <>
                                {/* Biodatas Grid */}
                                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${isFetching ? 'opacity-50' : ''}`}>
                                    {biodatas.map((biodata) => (
                                        <div key={biodata._id} className="card group">
                                            <div className="relative">
                                                <img
                                                    src={biodata.profileImage || 'https://via.placeholder.com/300x300?text=No+Image'}
                                                    alt={`Biodata ${biodata.biodataId}`}
                                                    className="w-full h-48 object-cover"
                                                />
                                                <div className="absolute top-3 right-3">
                                                    <span className={biodata.biodataType === 'Male' ? 'badge-male' : 'badge-female'}>
                                                        {biodata.biodataType}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="p-4">
                                                <div className="flex items-center justify-between mb-2">
                                                    <span className="text-xs text-gray-500">ID: {biodata.biodataId}</span>
                                                    <span className="text-green-700 font-bold">{biodata.age} years</span>
                                                </div>
                                                <h3 className="font-semibold text-gray-800 mb-2 flex items-center gap-2">
                                                    <FaBriefcase className="text-green-600 text-sm" />
                                                    {biodata.occupation}
                                                </h3>
                                                <p className="text-gray-600 text-sm mb-4 flex items-center gap-2">
                                                    <FaMapMarkerAlt className="text-green-600 text-sm" />
                                                    {biodata.permanentDivision}
                                                </p>
                                                <Link
                                                    to={`/biodata/${biodata.biodataId}`}
                                                    className="w-full btn-primary block text-center text-sm py-2"
                                                >
                                                    View Profile
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                                    <p className="text-sm text-gray-600">
                                        Showing {((page - 1) * limit) + 1}-{Math.min(page * limit, pagination.totalItems)} of {pagination.totalItems}
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FaChevronLeft />
                                        </button>

                                        {/* Page Numbers */}
                                        {[...Array(Math.min(5, pagination.totalPages))].map((_, i) => {
                                            let pageNum;
                                            if (pagination.totalPages <= 5) {
                                                pageNum = i + 1;
                                            } else if (page <= 3) {
                                                pageNum = i + 1;
                                            } else if (page >= pagination.totalPages - 2) {
                                                pageNum = pagination.totalPages - 4 + i;
                                            } else {
                                                pageNum = page - 2 + i;
                                            }

                                            return (
                                                <button
                                                    key={i}
                                                    onClick={() => setPage(pageNum)}
                                                    className={`w-10 h-10 rounded-lg font-medium transition-colors ${page === pageNum
                                                            ? 'bg-green-700 text-white'
                                                            : 'border hover:bg-gray-50'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                                            disabled={page === pagination.totalPages}
                                            className="p-2 border rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <FaChevronRight />
                                        </button>
                                    </div>
                                </div>
                            </>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
};

export default Biodatas;
