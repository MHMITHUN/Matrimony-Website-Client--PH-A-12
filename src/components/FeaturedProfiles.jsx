import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaChevronLeft, FaChevronRight, FaCrown, FaMapMarkerAlt, FaBriefcase, FaHeart } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

const FeaturedProfiles = ({ biodatas = [] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [direction, setDirection] = useState(0);

    const itemsPerView = {
        mobile: 1,
        tablet: 2,
        desktop: 3
    };

    const [perView, setPerView] = useState(3);

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) setPerView(itemsPerView.mobile);
            else if (window.innerWidth < 1024) setPerView(itemsPerView.tablet);
            else setPerView(itemsPerView.desktop);
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Auto-play carousel
    useEffect(() => {
        const timer = setInterval(() => {
            handleNext();
        }, 5000);
        return () => clearInterval(timer);
    }, [currentIndex, biodatas.length, perView]);

    const handleNext = () => {
        setDirection(1);
        setCurrentIndex((prev) => (prev + 1) % Math.max(1, biodatas.length - perView + 1));
    };

    const handlePrev = () => {
        setDirection(-1);
        setCurrentIndex((prev) => (prev - 1 + Math.max(1, biodatas.length - perView + 1)) % Math.max(1, biodatas.length - perView + 1));
    };

    const visibleBiodatas = biodatas.slice(currentIndex, currentIndex + perView);

    const variants = {
        enter: (direction) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            x: 0,
            opacity: 1
        },
        exit: (direction) => ({
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    if (!biodatas || biodatas.length === 0) return null;

    return (
        <div className="relative">
            <div className="overflow-hidden">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentIndex}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
                    >
                        {visibleBiodatas.map((biodata) => (
                            <div
                                key={biodata._id}
                                className="group bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden hover:shadow-2xl hover:shadow-emerald-500/10 hover:-translate-y-1 transition-all duration-300"
                            >
                                <div className="relative h-64 overflow-hidden">
                                    <img
                                        src={biodata.profileImage || 'https://via.placeholder.com/400x400?text=No+Image'}
                                        alt={`Featured Profile ${biodata.biodataId}`}
                                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                                    />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent"></div>

                                    {/* Badges */}
                                    <div className="absolute top-3 left-3 flex gap-2">
                                        <span className="px-3 py-1 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                            <FaHeart className="text-[10px]" /> Featured
                                        </span>
                                        {biodata.isPremium && (
                                            <span className="px-3 py-1 bg-gradient-to-r from-amber-500 to-amber-400 text-white text-xs font-bold rounded-full shadow-lg flex items-center gap-1">
                                                <FaCrown className="text-[10px]" /> Premium
                                            </span>
                                        )}
                                    </div>

                                    <span className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-bold ${biodata.biodataType === 'Male' ? 'bg-blue-500 text-white' : 'bg-pink-500 text-white'
                                        }`}>
                                        {biodata.biodataType}
                                    </span>

                                    {/* Bottom Info */}
                                    <div className="absolute bottom-3 left-3 right-3">
                                        <p className="text-white/70 text-xs mb-1">ID: {biodata.biodataId}</p>
                                        <div className="flex items-center gap-2 text-white">
                                            <span className="text-2xl font-bold">{biodata.age}</span>
                                            <span className="text-sm opacity-90">years old</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="p-5">
                                    <div className="flex items-center gap-2 text-slate-600 mb-3">
                                        <FaBriefcase className="text-emerald-500 text-sm" />
                                        <span className="font-semibold truncate">{biodata.occupation}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                                        <FaMapMarkerAlt className="text-emerald-500" />
                                        <span>{biodata.permanentDivision}</span>
                                    </div>

                                    <Link
                                        to={`/biodata/${biodata.biodataId}`}
                                        className="block w-full py-3 text-center bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 hover:shadow-lg hover:shadow-emerald-500/25 transition-all"
                                    >
                                        View Profile
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Navigation Buttons */}
            {biodatas.length > perView && (
                <>
                    <button
                        onClick={handlePrev}
                        className="absolute -left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl border border-slate-100 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-500 hover:scale-110 transition-all z-10"
                    >
                        <FaChevronLeft />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute -right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full shadow-xl border border-slate-100 flex items-center justify-center text-slate-600 hover:text-emerald-600 hover:border-emerald-500 hover:scale-110 transition-all z-10"
                    >
                        <FaChevronRight />
                    </button>
                </>
            )}

            {/* Indicators */}
            {biodatas.length > perView && (
                <div className="flex justify-center gap-2 mt-8">
                    {[...Array(Math.max(1, biodatas.length - perView + 1))].map((_, i) => (
                        <button
                            key={i}
                            onClick={() => setCurrentIndex(i)}
                            className={`h-2 rounded-full transition-all ${i === currentIndex
                                    ? 'w-8 bg-gradient-to-r from-emerald-500 to-teal-500'
                                    : 'w-2 bg-slate-300 hover:bg-emerald-400'
                                }`}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default FeaturedProfiles;
