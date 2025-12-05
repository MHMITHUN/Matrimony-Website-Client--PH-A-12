import { useState, useEffect } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { FaSave, FaUser, FaPhone, FaMapMarkerAlt, FaBriefcase, FaCalendar, FaHeart } from 'react-icons/fa';
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
            <div className="flex justify-center py-12">
                <div className="spinner"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">
                    {existingBiodata ? 'Edit Your Biodata' : 'Create Your Biodata'}
                </h1>
                <p className="text-gray-600">Fill in your details to create or update your biodata</p>
            </div>

            <form onSubmit={handleSubmit} className="card p-6 md:p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {/* Biodata Type */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Biodata Type <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="biodataType"
                            value={formData.biodataType}
                            onChange={handleChange}
                            className="select-field"
                            required
                        >
                            <option value="">Select Type</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                        </select>
                    </div>

                    {/* Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter your full name"
                            required
                        />
                    </div>

                    {/* Profile Image */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Profile Image URL <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="url"
                            name="profileImage"
                            value={formData.profileImage}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="https://example.com/image.jpg"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Date of Birth <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="date"
                            name="dateOfBirth"
                            value={formData.dateOfBirth}
                            onChange={handleChange}
                            className="input-field"
                            required
                        />
                    </div>

                    {/* Height */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Height <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="height"
                            value={formData.height}
                            onChange={handleChange}
                            className="select-field"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Weight <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="weight"
                            value={formData.weight}
                            onChange={handleChange}
                            className="select-field"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Age
                        </label>
                        <input
                            type="number"
                            name="age"
                            value={formData.age}
                            className="input-field bg-gray-100"
                            readOnly
                        />
                    </div>

                    {/* Occupation */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Occupation <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="occupation"
                            value={formData.occupation}
                            onChange={handleChange}
                            className="select-field"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Skin Color <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="race"
                            value={formData.race}
                            onChange={handleChange}
                            className="select-field"
                            required
                        >
                            <option value="">Select</option>
                            {races.map(r => (
                                <option key={r} value={r}>{r}</option>
                            ))}
                        </select>
                    </div>

                    {/* Father's Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Father's Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="fathersName"
                            value={formData.fathersName}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter father's name"
                            required
                        />
                    </div>

                    {/* Mother's Name */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mother's Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="mothersName"
                            value={formData.mothersName}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="Enter mother's name"
                            required
                        />
                    </div>

                    {/* Permanent Division */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Permanent Division <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="permanentDivision"
                            value={formData.permanentDivision}
                            onChange={handleChange}
                            className="select-field"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Present Division <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="presentDivision"
                            value={formData.presentDivision}
                            onChange={handleChange}
                            className="select-field"
                            required
                        >
                            <option value="">Select Division</option>
                            {divisions.map(d => (
                                <option key={d} value={d}>{d}</option>
                            ))}
                        </select>
                    </div>

                    {/* Expected Partner Age */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expected Partner Age <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            name="expectedPartnerAge"
                            value={formData.expectedPartnerAge}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g., 25-30"
                            required
                        />
                    </div>

                    {/* Expected Partner Height */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expected Partner Height <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="expectedPartnerHeight"
                            value={formData.expectedPartnerHeight}
                            onChange={handleChange}
                            className="select-field"
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
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Expected Partner Weight <span className="text-red-500">*</span>
                        </label>
                        <select
                            name="expectedPartnerWeight"
                            value={formData.expectedPartnerWeight}
                            onChange={handleChange}
                            className="select-field"
                            required
                        >
                            <option value="">Select Weight</option>
                            {weights.map(w => (
                                <option key={w} value={w}>{w}</option>
                            ))}
                        </select>
                    </div>

                    {/* Contact Email (Readonly) */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Contact Email
                        </label>
                        <input
                            type="email"
                            value={user?.email || ''}
                            className="input-field bg-gray-100"
                            readOnly
                        />
                    </div>

                    {/* Mobile Number */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mobile Number <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="tel"
                            name="mobileNumber"
                            value={formData.mobileNumber}
                            onChange={handleChange}
                            className="input-field"
                            placeholder="e.g., +8801XXXXXXXXX"
                            required
                        />
                    </div>
                </div>

                {/* Submit Button */}
                <div className="mt-8 flex justify-end">
                    <button
                        type="submit"
                        disabled={saveMutation.isLoading}
                        className="btn-primary flex items-center gap-2 px-8 py-3"
                    >
                        {saveMutation.isLoading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                Saving...
                            </>
                        ) : (
                            <>
                                <FaSave /> Save And Publish Now
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default EditBiodata;
