import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json'
    }
});

// Request interceptor to add auth token
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('access-token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor for error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            // Token expired or invalid - clear storage
            localStorage.removeItem('access-token');
            // Optionally redirect to login
            // window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

export default api;

// Auth API
export const authAPI = {
    getToken: (userData) => api.post('/auth/jwt', userData),
    getCurrentUser: () => api.get('/auth/me'),
    checkAdmin: (email) => api.get(`/auth/admin/${email}`),
    checkPremium: (email) => api.get(`/auth/premium/${email}`)
};

// Biodata API
export const biodataAPI = {
    getAll: (params) => api.get('/biodata', { params }),
    getPremium: (params) => api.get('/biodata/premium', { params }),
    getById: (id) => api.get(`/biodata/${id}`),
    getSimilar: (id) => api.get(`/biodata/${id}/similar`),
    getMyBiodata: () => api.get('/biodata/user/me'),
    createOrUpdate: (data) => api.post('/biodata', data),
    requestPremium: () => api.post('/biodata/request-premium')
};

// Contact Request API
export const contactRequestAPI = {
    getMyRequests: () => api.get('/contact-requests/my-requests'),
    create: (data) => api.post('/contact-requests', data),
    delete: (id) => api.delete(`/contact-requests/${id}`)
};

// Favorites API
export const favoritesAPI = {
    getAll: () => api.get('/favorites'),
    add: (biodataId) => api.post('/favorites', { biodataId }),
    remove: (id) => api.delete(`/favorites/${id}`),
    check: (biodataId) => api.get(`/favorites/check/${biodataId}`)
};

// Success Story API
export const successStoryAPI = {
    getAll: () => api.get('/success-stories'),
    create: (data) => api.post('/success-stories', data),
    getById: (id) => api.get(`/success-stories/${id}`)
};

// Admin API
export const adminAPI = {
    getUsers: (search) => api.get('/admin/users', { params: { search } }),
    makeAdmin: (id) => api.patch(`/admin/users/${id}/make-admin`),
    makePremium: (id) => api.patch(`/admin/users/${id}/make-premium`),
    getPremiumRequests: () => api.get('/admin/premium-requests'),
    approvePremium: (biodataId) => api.patch(`/admin/approve-premium/${biodataId}`),
    getContactRequests: () => api.get('/admin/contact-requests'),
    approveContact: (id) => api.patch(`/admin/approve-contact/${id}`),
    getSuccessStories: () => api.get('/admin/success-stories')
};

// Stats API
export const statsAPI = {
    getPublic: () => api.get('/stats/public'),
    getAdmin: () => api.get('/stats/admin')
};

// Analytics API
export const analyticsAPI = {
    getStats: () => api.get('/analytics/stats'),
    getUserGrowth: () => api.get('/analytics/user-growth'),
    getLocationStats: () => api.get('/analytics/location-stats'),
    getAgeDistribution: () => api.get('/analytics/age-distribution'),
    getRecentActivity: () => api.get('/analytics/recent-activity')
};

// Payment API
export const paymentAPI = {
    createPaymentIntent: (amount) => api.post('/payment/create-payment-intent', { amount }),
    confirmPayment: (paymentId) => api.post('/payment/confirm-payment', { paymentId })
};
