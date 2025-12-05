import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { FaFilter, FaSearch, FaMale, FaFemale, FaMapMarkerAlt, FaBriefcase, FaTimes, FaChevronLeft, FaChevronRight, FaCrown, FaHeart, FaSparkles } from 'react-icons/fa';
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
        setPage(1);
    };

    const clearFilters = () => {
        setFilters({ biodataType: '', division: '', minAge: '', maxAge: '' });
        setPage(1);
    };

    const FilterSection = () => (
        <div className="space-y-6">
            {/* Biodata Type */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Biodata Type</label>
                <div className="space-y-2">
                    {[
                        { value: '', label: 'All', icon: null },
                        { value: 'Male', label: 'Male', icon: <FaMale className="text-blue-500" /> },
                        { value: 'Female', label: 'Female', icon: <FaFemale className="text-pink-500" /> },
                    ].map((option) => (
                        <label
                            key={option.value}
                            className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all duration-200 ${filters.biodataType === option.value
                                    ? 'bg-emerald-50 border-2 border-emerald-500'
                                    : 'bg-slate-50 border-2 border-transparent hover:bg-slate-100'
                                }`}
                        >
                            <input
                                type="radio"
                                name="biodataType"
                                value={option.value}
                                checked={filters.biodataType === option.value}
                                onChange={handleFilterChange}
                                className="w-4 h-4 text-emerald-600 border-slate-300 focus:ring-emerald-500"
                            />
                            <span className="flex items-center gap-2 text-slate-700 font-medium">
                                {option.icon}
                                {option.label}
                            </span>
                        </label>
                    ))}
                </div>
            </div>

            {/* Age Range */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Age Range</label>
                <div className="flex items-center gap-3">
                    <input
                        type="number"
                        name="minAge"
                        value={filters.minAge}
                        onChange={handleFilterChange}
                        placeholder="Min"
                        min="18"
                        max="80"
                        className="flex-1 px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm focus:border-emerald-500 focus:bg-white outline-none transition-all"
                    />
                    <span className="text-slate-400 font-medium">to</span>
                    <input
                        type="number"
                        name="maxAge"
                        value={filters.maxAge}
                        onChange={handleFilterChange}
                        placeholder="Max"
                        min="18"
                        max="80"
                        className="flex-1 px-4 py-2.5 bg-slate-50 border-2 border-slate-100 rounded-xl text-sm focus:border-emerald-500 focus:bg-white outline-none transition-all"
                    />
                </div>
            </div>

            {/* Division */}
            <div>
                <label className="block text-sm font-bold text-slate-700 mb-3">Division</label>
                <select
                    name="division"
                    value={filters.division}
                    onChange={handleFilterChange}
                    className="w-full px-4 py-3 bg-slate-50 border-2 border-slate-100 rounded-xl text-slate-700 focus:border-emerald-500 focus:bg-white outline-none transition-all cursor-pointer appearance-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='M6 8l4 4 4-4'/%3e%3c/svg%3e")`,
                        backgroundPosition: 'right 12px center',
                        backgroundRepeat: 'no-repeat',
                        backgroundSize: '20px'
                    }}
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
                className="w-full py-3 border-2 border-slate-200 rounded-xl text-slate-600 font-medium hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
            >
                <FaTimes className="text-sm" /> Clear All Filters
            </button>
        </div>
    );

    return (
        <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white py-8 pt-24">
            <div className="container-custom">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
                    <div>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-3">
                            <FaSparkles className="text-xs" />
                            <span>Find Your Match</span>
                        </div>
                        <h1 className="text-3xl md:text-4xl font-bold text-slate-800">Browse Biodatas</h1>
                        <p className="text-slate-500 mt-2">
                            {pagination.totalItems > 0
                                ? `Showing ${pagination.totalItems} verified profiles`
                                : 'Search for your perfect match'}
                        </p>
                    </div>

                    {/* Mobile Filter Toggle */}
                    <button
                        onClick={() => setShowMobileFilter(true)}
                        className="md:hidden flex items-center justify-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 rounded-xl font-semibold text-slate-700 hover:border-emerald-500 hover:text-emerald-600 transition-all shadow-sm"
                    >
                        <FaFilter /> Filters
                    </button>
                </div>

                <div className="flex gap-8">
                    {/* Desktop Sidebar Filter */}
                    <aside className="hidden md:block w-80 flex-shrink-0">
                        <div className="bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 p-6 sticky top-24">
                            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-100">
                                <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center">
                                    <FaFilter className="text-white" />
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-800">Filters</h2>
                                    <p className="text-xs text-slate-500">Refine your search</p>
                                </div>
                            </div>
                            <FilterSection />
                        </div>
                    </aside>

                    {/* Mobile Filter Modal */}
                    {showMobileFilter && (
                        <div className="fixed inset-0 z-50 md:hidden">
                            <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setShowMobileFilter(false)} />
                            <div className="absolute right-0 top-0 h-full w-80 max-w-full bg-white p-6 overflow-y-auto shadow-2xl animate-slide-in-right">
                                <div className="flex items-center justify-between mb-6">
                                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2">
                                        <FaFilter className="text-emerald-600" /> Filters
                                    </h2>
                                    <button
                                        onClick={() => setShowMobileFilter(false)}
                                        className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
                                    >
                                        <FaTimes className="text-slate-500" />
                                    </button>
                                </div>
                                <FilterSection />
                            </div>
                        </div>
                    )}

                    {/* Main Content */}
                    <main className="flex-1">
                        {isLoading ? (
                            <div className="flex flex-col items-center justify-center py-20">
                                <div className="spinner-lg"></div>
                                <p className="mt-4 text-slate-500">Loading biodatas...</p>
                            </div>
                        ) : biodatas.length === 0 ? (
                            <div className="text-center py-20 bg-white rounded-3xl shadow-xl shadow-slate-200/50 border border-slate-100">
                                <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <FaSearch className="text-4xl text-slate-300" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-700 mb-2">No Biodatas Found</h3>
                                <p className="text-slate-500 mb-6">Try adjusting your filters to find more matches</p>
                                <button
                                    onClick={clearFilters}
                                    className="px-6 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:shadow-lg transition-all"
                                >
                                    Clear All Filters
                                </button>
                            </div>
                        ) : (
                            <>
                                {/* Biodatas Grid */}
                                <div className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 ${isFetching ? 'opacity-60' : ''}`}>
                                    {biodatas.map((biodata, index) => (
                                        <div
                                            key={biodata._id}
                                            className="group bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300 animate-fade-in-up"
                                            style={{ animationDelay: `${index * 50}ms` }}
                                        >
                                            <div className="relative h-52 overflow-hidden">
                                                <img
                                                    src={biodata.profileImage || 'https://via.placeholder.com/300x300?text=No+Image'}
                                                    alt={`Biodata ${biodata.biodataId}`}
                                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent"></div>

                                                {/* Badges */}
                                                <div className="absolute top-3 left-3 right-3 flex items-start justify-between">
                                                    {biodata.isPremium && (
                                                        <span className="px-2.5 py-1 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs font-bold rounded-full flex items-center gap-1 shadow-lg">
                                                            <FaCrown className="text-[10px]" /> Premium
                                                        </span>
                                                    )}
                                                    <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${biodata.biodataType === 'Male'
                                                            ? 'bg-blue-500 text-white'
                                                            : 'bg-pink-500 text-white'
                                                        }`}>
                                                        {biodata.biodataType}
                                                    </span>
                                                </div>

                                                {/* Bottom Info */}
                                                <div className="absolute bottom-3 left-3">
                                                    <span className="text-white/70 text-xs">ID: {biodata.biodataId}</span>
                                                </div>
                                            </div>

                                            <div className="p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <div className="flex items-center gap-1.5 text-slate-600">
                                                        <span className="text-2xl font-bold text-emerald-600">{biodata.age}</span>
                                                        <span className="text-sm">years</span>
                                                    </div>
                                                    <div className="flex items-center gap-1 text-slate-500 text-sm">
                                                        <FaMapMarkerAlt className="text-emerald-500 text-xs" />
                                                        {biodata.permanentDivision}
                                                    </div>
                                                </div>

                                                <h3 className="font-semibold text-slate-800 mb-3 flex items-center gap-2 truncate">
                                                    <FaBriefcase className="text-emerald-500 text-sm flex-shrink-0" />
                                                    <span className="truncate">{biodata.occupation}</span>
                                                </h3>

                                                <Link
                                                    to={`/biodata/${biodata.biodataId}`}
                                                    className="block w-full py-2.5 text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg hover:shadow-emerald-500/25 transition-all text-sm"
                                                >
                                                    View Profile
                                                </Link>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Pagination */}
                                <div className="mt-10 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 p-4">
                                    <p className="text-sm text-slate-600">
                                        Showing <span className="font-semibold text-emerald-600">{((page - 1) * limit) + 1}-{Math.min(page * limit, pagination.totalItems)}</span> of <span className="font-semibold">{pagination.totalItems}</span> biodatas
                                    </p>
                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => setPage(p => Math.max(1, p - 1))}
                                            disabled={page === 1}
                                            className="p-2.5 border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
                                                    className={`w-10 h-10 rounded-xl font-semibold transition-all ${page === pageNum
                                                            ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/25'
                                                            : 'border-2 border-slate-200 text-slate-600 hover:border-emerald-500 hover:text-emerald-600'
                                                        }`}
                                                >
                                                    {pageNum}
                                                </button>
                                            );
                                        })}

                                        <button
                                            onClick={() => setPage(p => Math.min(pagination.totalPages, p + 1))}
                                            disabled={page === pagination.totalPages}
                                            className="p-2.5 border-2 border-slate-200 rounded-xl hover:border-emerald-500 hover:text-emerald-600 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
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
