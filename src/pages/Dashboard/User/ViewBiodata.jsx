import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaUser, FaEdit, FaCrown, FaMapMarkerAlt, FaBriefcase, FaCalendar, FaRulerVertical, FaWeight, FaPhone, FaEnvelope, FaCheckCircle } from 'react-icons/fa';
import { biodataAPI } from '../../../api/api';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';
import Swal from 'sweetalert2';

const ViewBiodata = () => {
    const { isPremium } = useAuth();
    const queryClient = useQueryClient();

    const { data: biodata, isLoading, error } = useQuery({
        queryKey: ['myBiodata'],
        queryFn: async () => {
            const response = await biodataAPI.getMyBiodata();
            return response.data;
        }
    });

    const requestPremiumMutation = useMutation({
        mutationFn: () => biodataAPI.requestPremium(),
        onSuccess: () => {
            queryClient.invalidateQueries(['myBiodata']);
            toast.success('Premium request submitted! Please wait for admin approval.');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to request premium');
        }
    });

    const handleRequestPremium = async () => {
        const result = await Swal.fire({
            title: 'Request Premium Membership?',
            text: 'Are you sure you want to make your biodata premium? Admin approval is required.',
            icon: 'question',
            showCancelButton: true,
            confirmButtonColor: '#2E7D32',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, Request Premium!'
        });

        if (result.isConfirmed) {
            requestPremiumMutation.mutate();
        }
    };

    if (isLoading) {
        return (
            <div className="flex justify-center py-12">
                <div className="spinner"></div>
            </div>
        );
    }

    if (error || !biodata) {
        return (
            <div className="text-center py-12">
                <FaUser className="text-6xl text-gray-300 mx-auto mb-4" />
                <h2 className="text-xl font-bold text-gray-700 mb-2">No Biodata Found</h2>
                <p className="text-gray-500 mb-6">You haven't created your biodata yet.</p>
                <Link to="/dashboard/edit-biodata" className="btn-primary inline-flex items-center gap-2">
                    <FaEdit /> Create Biodata
                </Link>
            </div>
        );
    }

    const InfoItem = ({ icon, label, value }) => (
        <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
            <span className="text-green-600 mt-1">{icon}</span>
            <div className="min-w-0">
                <p className="text-sm text-gray-500">{label}</p>
                <p className="font-medium text-gray-800 break-words">{value || 'N/A'}</p>
            </div>
        </div>
    );

    return (
        <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-800">My Biodata</h1>
                    <p className="text-gray-600">View your biodata information</p>
                </div>
                <div className="flex gap-3">
                    <Link to="/dashboard/edit-biodata" className="btn-outline flex items-center gap-2">
                        <FaEdit /> Edit
                    </Link>
                    {!isPremium && biodata.premiumRequestStatus !== 'pending' && (
                        <button
                            onClick={handleRequestPremium}
                            disabled={requestPremiumMutation.isLoading}
                            className="btn-secondary flex items-center gap-2"
                        >
                            <FaCrown /> Make Premium
                        </button>
                    )}
                    {biodata.premiumRequestStatus === 'pending' && (
                        <span className="badge-pending flex items-center gap-1">
                            Pending Approval
                        </span>
                    )}
                    {isPremium && (
                        <span className="badge-premium flex items-center gap-1">
                            <FaCrown /> Premium Member
                        </span>
                    )}
                </div>
            </div>

            <div className="card p-6 md:p-8">
                {/* Profile Header */}
                <div className="flex flex-col md:flex-row items-center gap-6 pb-6 border-b border-gray-200 mb-6">
                    <img
                        src={biodata.profileImage || 'https://via.placeholder.com/150'}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover border-4 border-green-100"
                    />
                    <div className="text-center md:text-left">
                        <div className="flex items-center gap-2 mb-2">
                            <span className={biodata.biodataType === 'Male' ? 'badge-male' : 'badge-female'}>
                                {biodata.biodataType}
                            </span>
                            <span className="text-gray-500">Biodata ID: {biodata.biodataId}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-800">{biodata.name}</h2>
                        <p className="text-gray-600 flex items-center justify-center md:justify-start gap-2 mt-1">
                            <FaBriefcase className="text-green-600" /> {biodata.occupation}
                        </p>
                    </div>
                </div>

                {/* Information Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    <InfoItem icon={<FaCalendar />} label="Date of Birth" value={new Date(biodata.dateOfBirth).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })} />
                    <InfoItem icon={<FaUser />} label="Age" value={`${biodata.age} years`} />
                    <InfoItem icon={<FaRulerVertical />} label="Height" value={biodata.height} />
                    <InfoItem icon={<FaWeight />} label="Weight" value={biodata.weight} />
                    <InfoItem icon={<FaBriefcase />} label="Occupation" value={biodata.occupation} />
                    <InfoItem icon={<FaUser />} label="Skin Color" value={biodata.race} />
                    <InfoItem icon={<FaUser />} label="Father's Name" value={biodata.fathersName} />
                    <InfoItem icon={<FaUser />} label="Mother's Name" value={biodata.mothersName} />
                    <InfoItem icon={<FaMapMarkerAlt />} label="Permanent Division" value={biodata.permanentDivision} />
                    <InfoItem icon={<FaMapMarkerAlt />} label="Present Division" value={biodata.presentDivision} />
                    <InfoItem icon={<FaUser />} label="Expected Partner Age" value={biodata.expectedPartnerAge} />
                    <InfoItem icon={<FaRulerVertical />} label="Expected Partner Height" value={biodata.expectedPartnerHeight} />
                    <InfoItem icon={<FaWeight />} label="Expected Partner Weight" value={biodata.expectedPartnerWeight} />
                    <InfoItem icon={<FaEnvelope />} label="Email" value={biodata.userEmail} />
                    <InfoItem icon={<FaPhone />} label="Mobile Number" value={biodata.mobileNumber} />
                </div>
            </div>
        </div>
    );
};

export default ViewBiodata;
