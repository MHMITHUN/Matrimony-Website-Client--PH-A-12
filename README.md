# Nikah - Islamic Matrimony Platform

A comprehensive Islamic Matrimony platform built with the MERN stack, designed to help Muslim singles find their life partners in accordance with Islamic principles.

## 🌐 Live Site

- **Frontend**: [https://nikah-matrimony.netlify.app](https://nikah-matrimony.netlify.app)
- **Backend**: [https://nikah-matrimony-api.vercel.app](https://nikah-matrimony-api.vercel.app)

## 🔐 Admin Credentials

- **Email**: admin@islamicmatrimony.com
- **Password**: Admin@123

## ✨ Features

1. **Beautiful Islamic-themed UI** - Green and gold color scheme with Islamic patterns and motifs
2. **User Authentication** - Secure login/registration with Firebase (Email/Password and Google Sign-in)
3. **JWT Protected Routes** - All private routes are protected with JWT tokens
4. **Premium Membership System** - Users can request premium status for enhanced features
5. **Biodata Management** - Create, edit, and view detailed biodata profiles
6. **Advanced Filtering** - Filter biodatas by age, gender, and division with pagination
7. **Favorites System** - Save favorite biodatas for easy access
8. **Contact Request with Payment** - Request contact information with secure Stripe payment ($5)
9. **Success Stories** - Share and view marriage success stories from the community
10. **Admin Dashboard** - Comprehensive admin panel with statistics and management tools
11. **Responsive Design** - Fully responsive for mobile, tablet, and desktop
12. **Real-time Notifications** - Toast notifications for all CRUD operations

## 🛠️ Technologies Used

### Frontend
- React 18 + Vite
- TailwindCSS (No DaisyUI)
- React Router DOM
- TanStack Query
- Firebase Authentication
- Axios with Interceptors
- React Hot Toast / SweetAlert2
- Recharts (for admin charts)
- React Icons

### Backend
- Node.js + Express.js
- MongoDB + Mongoose
- JWT Authentication
- Stripe Payment Integration
- CORS enabled

## 📁 Project Structure

```
├── client/
│   ├── src/
│   │   ├── api/          # Axios API configuration
│   │   ├── components/   # Reusable components
│   │   ├── config/       # Firebase configuration
│   │   ├── contexts/     # Auth context
│   │   ├── layouts/      # Main and Dashboard layouts
│   │   └── pages/        # All page components
│   └── .env              # Environment variables
│
└── server/
    ├── config/           # Database configuration
    ├── middleware/       # JWT verification
    ├── models/           # Mongoose models
    ├── routes/           # API routes
    └── .env              # Environment variables
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v18 or higher)
- MongoDB Atlas account
- Firebase project
- Stripe account (for payments)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/islamic-matrimony.git
cd islamic-matrimony
```

2. Install server dependencies
```bash
cd server
npm install
```

3. Install client dependencies
```bash
cd ../client
npm install
```

4. Set up environment variables (see `.env.example` files)

5. Start the development servers
```bash
# Terminal 1 - Server
cd server
npm run dev

# Terminal 2 - Client
cd client
npm run dev
```

## 📊 API Endpoints

### Authentication
- `POST /api/auth/jwt` - Get JWT token
- `GET /api/auth/me` - Get current user

### Biodata
- `GET /api/biodata` - Get all biodatas
- `GET /api/biodata/premium` - Get premium biodatas
- `POST /api/biodata` - Create/update biodata

### Admin
- `GET /api/admin/users` - Get all users
- `PATCH /api/admin/users/:id/make-admin` - Make user admin
- `PATCH /api/admin/users/:id/make-premium` - Make user premium

## 📝 Environment Variables

### Client (.env)
```
VITE_FIREBASE_API_KEY=your_key
VITE_FIREBASE_AUTH_DOMAIN=your_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_API_URL=http://localhost:5000/api
```

### Server (.env)
```
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret
STRIPE_SECRET_KEY=your_stripe_key
CLIENT_URL=http://localhost:5173
```

## 👨‍💻 Developer

**Mahamudul Hasan**

---

*"And among His signs is that He created for you mates from among yourselves, that you may find tranquility in them." - Quran 30:21*
