import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaSave, FaUser, FaPhone, FaMapMarkerAlt, FaBriefcase, FaCalendar, FaHeart, FaSparkles, FaImage, FaRulerVertical, FaWeight, FaEnvelope } from 'react-icons/fa';
import { biodataAPI } from '../../../api/api';
import { useAuth } from '../../../contexts/AuthContext';
import toast from 'react-hot-toast';

const EditBiodata = () => {
    const { user } = useAuth();
    const queryClient = useQueryClient();

    const divisions = ['Dhaka', 'Chattagram', 'Rangpur', 'Barisal', 'Khulna', 'Mymensingh', 'Sylhet'];
    const occupations = ['Student', 'Job', 'Business', 'Housewife', 'Teacher', 'Doctor', 'Engineer', 'Other'];
    const races = ['Fair', 'Light Brown', 'Brown', 'Dark'];
    const heights = ['4\'5"', '4\'6"', '4\'7"', '4\'8"', '4\'9"', '4\'10"', '4\'11"', '5\'0"', '5\'1"', '5\'2"', '5\'3"', '5\'4"', '5\'5"', '5\'6"', '5\'7"', '5\'8"', '5\'9"', '5\'10"', '5\'11"', '6\'0"', '6\'1"', '6\'2"', '6\'3"', '6\'4"'];
    const weights = ['40-45 kg', '45-50 kg', '50-55 kg', '55-60 kg', '60-65 kg', '65-70 kg', '70-75 kg', '75-80 kg', '80-85 kg', '85-90 kg', '90+ kg'];

    const [formData, setFormData] = useState({
        biodataType: '',
        name: '',
        profileImage: '',
        dateOfBirth: '',
        height: '',
        weight: '',
        age: '',
        occupation: '',
        race: '',
        fathersName: '',
        mothersName: '',
        permanentDivision: '',
        presentDivision: '',
        expectedPartnerAge: '',
        expectedPartnerHeight: '',
        expectedPartnerWeight: '',
        mobileNumber: ''
    });

    // Fetch existing biodata
    const { data: existingBiodata, isLoading } = useQuery({
        queryKey: ['myBiodata'],
        queryFn: async () => {
            try {
                const response = await biodataAPI.getMyBiodata();
                return response.data;
            } catch (error) {
                if (error.response?.status === 404) {
                    return null;
                }
                throw error;
            }
        }
    });

    useEffect(() => {
        if (existingBiodata) {
            setFormData({
                biodataType: existingBiodata.biodataType || '',
                name: existingBiodata.name || '',
                profileImage: existingBiodata.profileImage || '',
                dateOfBirth: existingBiodata.dateOfBirth ? existingBiodata.dateOfBirth.split('T')[0] : '',
                height: existingBiodata.height || '',
                weight: existingBiodata.weight || '',
                age: existingBiodata.age || '',
                occupation: existingBiodata.occupation || '',
                race: existingBiodata.race || '',
                fathersName: existingBiodata.fathersName || '',
                mothersName: existingBiodata.mothersName || '',
                permanentDivision: existingBiodata.permanentDivision || '',
                presentDivision: existingBiodata.presentDivision || '',
                expectedPartnerAge: existingBiodata.expectedPartnerAge || '',
                expectedPartnerHeight: existingBiodata.expectedPartnerHeight || '',
                expectedPartnerWeight: existingBiodata.expectedPartnerWeight || '',
                mobileNumber: existingBiodata.mobileNumber || ''
            });
        }
    }, [existingBiodata]);

    // Save mutation
    const saveMutation = useMutation({
        mutationFn: (data) => biodataAPI.createOrUpdate(data),
        onSuccess: () => {
            queryClient.invalidateQueries(['myBiodata']);
            toast.success(existingBiodata ? 'Biodata updated successfully!' : 'Biodata created successfully!');
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || 'Failed to save biodata');
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    // Calculate age from date of birth
    useEffect(() => {
        if (formData.dateOfBirth) {
            const today = new Date();
            const birthDate = new Date(formData.dateOfBirth);
            let age = today.getFullYear() - birthDate.getFullYear();
            const m = today.getMonth() - birthDate.getMonth();
            if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
                age--;
            }
            setFormData(prev => ({ ...prev, age }));
        }
    }, [formData.dateOfBirth]);

    const handleSubmit = (e) => {
        e.preventDefault();

        // Validate required fields
        const requiredFields = ['biodataType', 'name', 'profileImage', 'dateOfBirth', 'height', 'weight', 'occupation', 'race', 'fathersName', 'mothersName', 'permanentDivision', 'presentDivision', 'expectedPartnerAge', 'expectedPartnerHeight', 'expectedPartnerWeight', 'mobileNumber'];

        for (const field of requiredFields) {
            if (!formData[field]) {
                toast.error(`Please fill in ${field.replace(/([A-Z])/g, ' $1').toLowerCase()}`);
                return;
            }
        }

        saveMutation.mutate(formData);
    };

    if (isLoading) {
        return (
            <div className="flex flex-col items-center justify-center py-20">
                <div className="spinner-lg"></div>
                <p className="mt-4 text-slate-500">Loading biodata...</p>
            </div>
        );
    }

    const inputClass = "w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 placeholder:text-slate-400";
    const selectClass = "w-full px-5 py-3.5 bg-slate-50 border-2 border-slate-100 rounded-xl outline-none transition-all duration-300 focus:border-emerald-500 focus:bg-white focus:shadow-lg focus:shadow-emerald-500/10 cursor-pointer appearance-none";
    const labelClass = "flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2";

    return (
        <div className="space-y-6">
            {/* Header */}
            <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-full text-emerald-600 text-sm font-medium mb-2">
                    <FaSparkles className="text-xs" />
                    <span>{existingBiodata ? 'Edit Profile' : 'Create Profile'}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-slate-800">
                    {existingBiodata ? 'Edit Your Biodata' : 'Create Your Biodata'}
                </h1>
                <p className="text-slate-500 mt-1">Fill in your details to create or update your biodata</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden">
                {/* Section: Basic Information */}
                <div className="p-6 md:p-8 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center text-white text-sm">
                            <FaUser />
                        </div>
                        Basic Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Biodata Type */}
                        <div>
                            <label className={labelClass}>
                                <FaUser className="text-emerald-500" />
                                Biodata Type <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="biodataType"
                                value={formData.biodataType}
                                onChange={handleChange}
                                className={selectClass}
                                required
                            >
                                <option value="">Select Type</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                        </div>

                        {/* Name */}
                        <div>
                            <label className={labelClass}>
                                <FaUser className="text-blue-500" />
                                Full Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Enter your full name"
                                required
                            />
                        </div>

                        {/* Profile Image */}
                        <div>
                            <label className={labelClass}>
                                <FaImage className="text-purple-500" />
                                Profile Image URL <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="url"
                                name="profileImage"
                                value={formData.profileImage}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="https://example.com/image.jpg"
                                required
                            />
                        </div>

                        {/* Date of Birth */}
                        <div>
                            <label className={labelClass}>
                                <FaCalendar className="text-amber-500" />
                                Date of Birth <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="date"
                                name="dateOfBirth"
                                value={formData.dateOfBirth}
                                onChange={handleChange}
                                className={inputClass}
                                required
                            />
                        </div>

                        {/* Height */}
                        <div>
                            <label className={labelClass}>
                                <FaRulerVertical className="text-teal-500" />
                                Height <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="height"
                                value={formData.height}
                                onChange={handleChange}
                                className={selectClass}
                                required
                            >
                                <option value="">Select Height</option>
                                {heights.map(h => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>
                        </div>

                        {/* Weight */}
                        <div>
                            <label className={labelClass}>
                                <FaWeight className="text-rose-500" />
                                Weight <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="weight"
                                value={formData.weight}
                                onChange={handleChange}
                                className={selectClass}
                                required
                            >
                                <option value="">Select Weight</option>
                                {weights.map(w => (
                                    <option key={w} value={w}>{w}</option>
                                ))}
                            </select>
                        </div>

                        {/* Age (Readonly) */}
                        <div>
                            <label className={labelClass}>
                                <FaCalendar className="text-slate-400" />
                                Age (Auto-calculated)
                            </label>
                            <input
                                type="number"
                                name="age"
                                value={formData.age}
                                className="w-full px-5 py-3.5 bg-slate-100 border-2 border-slate-100 rounded-xl text-slate-700 cursor-not-allowed"
                                readOnly
                            />
                        </div>

                        {/* Occupation */}
                        <div>
                            <label className={labelClass}>
                                <FaBriefcase className="text-indigo-500" />
                                Occupation <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="occupation"
                                value={formData.occupation}
                                onChange={handleChange}
                                className={selectClass}
                                required
                            >
                                <option value="">Select Occupation</option>
                                {occupations.map(o => (
                                    <option key={o} value={o}>{o}</option>
                                ))}
                            </select>
                        </div>

                        {/* Race */}
                        <div>
                            <label className={labelClass}>
                                <FaUser className="text-orange-500" />
                                Skin Color <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="race"
                                value={formData.race}
                                onChange={handleChange}
                                className={selectClass}
                                required
                            >
                                <option value="">Select</option>
                                {races.map(r => (
                                    <option key={r} value={r}>{r}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section: Family Information */}
                <div className="p-6 md:p-8 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-pink-500 to-rose-500 rounded-lg flex items-center justify-center text-white text-sm">
                            <FaHeart />
                        </div>
                        Family Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Father's Name */}
                        <div>
                            <label className={labelClass}>
                                <FaUser className="text-blue-600" />
                                Father's Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="fathersName"
                                value={formData.fathersName}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Enter father's name"
                                required
                            />
                        </div>

                        {/* Mother's Name */}
                        <div>
                            <label className={labelClass}>
                                <FaUser className="text-pink-500" />
                                Mother's Name <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="mothersName"
                                value={formData.mothersName}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="Enter mother's name"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Section: Location */}
                <div className="p-6 md:p-8 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white text-sm">
                            <FaMapMarkerAlt />
                        </div>
                        Location
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Permanent Division */}
                        <div>
                            <label className={labelClass}>
                                <FaMapMarkerAlt className="text-emerald-500" />
                                Permanent Division <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="permanentDivision"
                                value={formData.permanentDivision}
                                onChange={handleChange}
                                className={selectClass}
                                required
                            >
                                <option value="">Select Division</option>
                                {divisions.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>

                        {/* Present Division */}
                        <div>
                            <label className={labelClass}>
                                <FaMapMarkerAlt className="text-blue-500" />
                                Present Division <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="presentDivision"
                                value={formData.presentDivision}
                                onChange={handleChange}
                                className={selectClass}
                                required
                            >
                                <option value="">Select Division</option>
                                {divisions.map(d => (
                                    <option key={d} value={d}>{d}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section: Partner Expectations */}
                <div className="p-6 md:p-8 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-amber-500 to-orange-500 rounded-lg flex items-center justify-center text-white text-sm">
                            <FaHeart />
                        </div>
                        Partner Expectations
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        {/* Expected Partner Age */}
                        <div>
                            <label className={labelClass}>
                                <FaCalendar className="text-amber-500" />
                                Expected Partner Age <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="text"
                                name="expectedPartnerAge"
                                value={formData.expectedPartnerAge}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="e.g., 25-30"
                                required
                            />
                        </div>

                        {/* Expected Partner Height */}
                        <div>
                            <label className={labelClass}>
                                <FaRulerVertical className="text-orange-500" />
                                Expected Partner Height <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="expectedPartnerHeight"
                                value={formData.expectedPartnerHeight}
                                onChange={handleChange}
                                className={selectClass}
                                required
                            >
                                <option value="">Select Height</option>
                                {heights.map(h => (
                                    <option key={h} value={h}>{h}</option>
                                ))}
                            </select>
                        </div>

                        {/* Expected Partner Weight */}
                        <div>
                            <label className={labelClass}>
                                <FaWeight className="text-rose-500" />
                                Expected Partner Weight <span className="text-red-500">*</span>
                            </label>
                            <select
                                name="expectedPartnerWeight"
                                value={formData.expectedPartnerWeight}
                                onChange={handleChange}
                                className={selectClass}
                                required
                            >
                                <option value="">Select Weight</option>
                                {weights.map(w => (
                                    <option key={w} value={w}>{w}</option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>

                {/* Section: Contact Information */}
                <div className="p-6 md:p-8 border-b border-slate-100">
                    <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-violet-500 rounded-lg flex items-center justify-center text-white text-sm">
                            <FaPhone />
                        </div>
                        Contact Information
                    </h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Contact Email (Readonly) */}
                        <div>
                            <label className={labelClass}>
                                <FaEnvelope className="text-slate-400" />
                                Contact Email (Auto-filled)
                            </label>
                            <input
                                type="email"
                                value={user?.email || ''}
                                className="w-full px-5 py-3.5 bg-slate-100 border-2 border-slate-100 rounded-xl text-slate-700 cursor-not-allowed"
                                readOnly
                            />
                        </div>

                        {/* Mobile Number */}
                        <div>
                            <label className={labelClass}>
                                <FaPhone className="text-purple-500" />
                                Mobile Number <span className="text-red-500">*</span>
                            </label>
                            <input
                                type="tel"
                                name="mobileNumber"
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                className={inputClass}
                                placeholder="e.g., +8801XXXXXXXXX"
                                required
                            />
                        </div>
                    </div>
                </div>

                {/* Submit Button */}
                <div className="p-6 md:p-8 bg-gradient-to-r from-slate-50 to-slate-100/50">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <p className="text-slate-500 text-sm">
                            <span className="text-red-500">*</span> All fields marked with asterisk are required
                        </p>
                        <button
                            type="submit"
                            disabled={saveMutation.isLoading}
                            className="w-full sm:w-auto relative overflow-hidden font-semibold py-4 px-8 rounded-xl transition-all duration-300 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white shadow-lg shadow-emerald-500/30 hover:shadow-xl hover:shadow-emerald-500/40 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0 flex items-center justify-center gap-2"
                        >
                            {saveMutation.isLoading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Saving...
                                </>
                            ) : (
                                <>
                                    <FaSave /> Save And Publish Now
                                </>
                            )}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default EditBiodata;
