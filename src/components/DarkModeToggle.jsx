import { FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '../contexts/ThemeContext';

const DarkModeToggle = ({ className = '' }) => {
    const { theme, toggleTheme } = useTheme();
    const isDark = theme === 'dark';

    return (
        <button
            onClick={toggleTheme}
            className={`relative group p-2.5 rounded-xl transition-all duration-300 ${className}`}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            {/* Background with glassmorphism effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 dark:from-amber-500/10 dark:to-orange-500/10 rounded-xl group-hover:from-emerald-500/20 group-hover:to-teal-500/20 dark:group-hover:from-amber-500/20 dark:group-hover:to-orange-500/20 transition-all duration-300"></div>

            {/* Icon container */}
            <div className="relative flex items-center justify-center w-6 h-6">
                {/* Sun Icon */}
                <FaSun
                    className={`absolute text-amber-500 transition-all duration-500 ${isDark
                            ? 'opacity-0 rotate-180 scale-0'
                            : 'opacity-100 rotate-0 scale-100'
                        }`}
                    size={20}
                />

                {/* Moon Icon */}
                <FaMoon
                    className={`absolute text-indigo-600 dark:text-indigo-400 transition-all duration-500 ${isDark
                            ? 'opacity-100 rotate-0 scale-100'
                            : 'opacity-0 -rotate-180 scale-0'
                        }`}
                    size={18}
                />
            </div>

            {/* Hover glow effect */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 dark:from-amber-500 dark:to-orange-500 opacity-0 group-hover:opacity-20 blur-lg transition-opacity duration-300"></div>
        </button>
    );
};

export default DarkModeToggle;
