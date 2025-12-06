import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { HelmetProvider } from 'react-helmet-async';
import { AuthProvider } from './contexts/AuthContext';
import { ThemeProvider } from './contexts/ThemeContext';

// Layouts
import MainLayout from './layouts/MainLayout';
import DashboardLayout from './layouts/DashboardLayout';

// Components
import PrivateRoute from './components/PrivateRoute';
import AdminRoute from './components/AdminRoute';

// Public Pages
import Home from './pages/Home/Home';
import Biodatas from './pages/Biodatas/Biodatas';
import BiodataDetails from './pages/BiodataDetails/BiodataDetails';
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';
import About from './pages/About/About';
import Contact from './pages/Contact/Contact';
import Checkout from './pages/Checkout/Checkout';
import Privacy from './pages/Privacy/Privacy';
import Terms from './pages/Terms/Terms';
import NotFound from './pages/NotFound/NotFound';

// User Dashboard Pages
import EditBiodata from './pages/Dashboard/User/EditBiodata';
import ViewBiodata from './pages/Dashboard/User/ViewBiodata';
import MyContactRequests from './pages/Dashboard/User/MyContactRequests';
import MyFavorites from './pages/Dashboard/User/MyFavorites';
import GotMarried from './pages/Dashboard/User/GotMarried';

// Admin Dashboard Pages
import AdminDashboard from './pages/Dashboard/Admin/AdminDashboard';
import ManageUsers from './pages/Dashboard/Admin/ManageUsers';
import ApprovedPremium from './pages/Dashboard/Admin/ApprovedPremium';
import ApprovedContacts from './pages/Dashboard/Admin/ApprovedContacts';
import AdminSuccessStories from './pages/Dashboard/Admin/AdminSuccessStories';
import ContactMessages from './pages/Dashboard/Admin/ContactMessages';

// Create query client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    }
  }
});

// Create router
const router = createBrowserRouter([
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'biodatas', element: <Biodatas /> },
      { path: 'about', element: <About /> },
      { path: 'contact', element: <Contact /> },
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: 'privacy', element: <Privacy /> },
      { path: 'terms', element: <Terms /> },
      {
        path: 'biodata/:id',
        element: (
          <PrivateRoute>
            <BiodataDetails />
          </PrivateRoute>
        )
      },
      {
        path: 'checkout/:biodataId',
        element: (
          <PrivateRoute>
            <Checkout />
          </PrivateRoute>
        )
      }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoute>
        <DashboardLayout />
      </PrivateRoute>
    ),
    children: [
      // User Dashboard Routes
      { index: true, element: <EditBiodata /> },
      { path: 'edit-biodata', element: <EditBiodata /> },
      { path: 'view-biodata', element: <ViewBiodata /> },
      { path: 'contact-requests', element: <MyContactRequests /> },
      { path: 'favorites', element: <MyFavorites /> },
      { path: 'got-married', element: <GotMarried /> },

      // Admin Dashboard Routes
      {
        path: 'admin',
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        )
      },
      {
        path: 'admin/manage-users',
        element: (
          <AdminRoute>
            <ManageUsers />
          </AdminRoute>
        )
      },
      {
        path: 'admin/approved-premium',
        element: (
          <AdminRoute>
            <ApprovedPremium />
          </AdminRoute>
        )
      },
      {
        path: 'admin/approved-contacts',
        element: (
          <AdminRoute>
            <ApprovedContacts />
          </AdminRoute>
        )
      },
      {
        path: 'admin/contact-messages',
        element: (
          <AdminRoute>
            <ContactMessages />
          </AdminRoute>
        )
      },
      {
        path: 'admin/success-stories',
        element: (
          <AdminRoute>
            <AdminSuccessStories />
          </AdminRoute>
        )
      }
    ]
  },
  {
    path: '*',
    element: <NotFound />
  }
]);

function App() {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <RouterProvider router={router} />
            <Toaster
              position="top-center"
              toastOptions={{
                duration: 3000,
                style: {
                  background: '#333',
                  color: '#fff',
                },
                success: {
                  iconTheme: {
                    primary: '#2E7D32',
                    secondary: '#fff'
                  }
                },
                error: {
                  iconTheme: {
                    primary: '#C62828',
                    secondary: '#fff'
                  }
                }
              }}
            />
          </AuthProvider>
        </QueryClientProvider>
      </ThemeProvider>
    </HelmetProvider>
  );
}

export default App;
