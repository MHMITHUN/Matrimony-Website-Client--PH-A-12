import { Outlet } from 'react-router-dom';
import Navbar from '../components/shared/Navbar';
import Footer from '../components/shared/Footer';
import ScrollToTop from '../components/ScrollToTop';
import ScrollToTopButton from '../components/ScrollToTopButton';

const MainLayout = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900 transition-colors duration-300">
            <ScrollToTop />
            <ScrollToTopButton />
            <Navbar />
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default MainLayout;
