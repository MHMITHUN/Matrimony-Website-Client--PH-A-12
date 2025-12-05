const SkeletonCard = () => (
    <div className="bg-white rounded-2xl shadow-lg shadow-slate-200/50 border border-slate-100 overflow-hidden animate-pulse">
        <div className="h-52 bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 bg-[length:200%_100%] animate-shimmer"></div>
        <div className="p-4 space-y-3">
            <div className="flex items-center justify-between">
                <div className="h-6 w-16 bg-slate-200 rounded"></div>
                <div className="h-4 w-20 bg-slate-200 rounded"></div>
            </div>
            <div className="h-5 w-3/4 bg-slate-200 rounded"></div>
            <div className="h-10 w-full bg-slate-200 rounded-xl"></div>
        </div>
    </div>
);

const SkeletonGrid = ({ count = 8 }) => (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[...Array(count)].map((_, i) => (
            <SkeletonCard key={i} />
        ))}
    </div>
);

const SkeletonStats = () => (
    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-3xl p-8 shadow-lg animate-pulse">
                <div className="w-16 h-16 bg-slate-200 rounded-2xl mx-auto mb-6"></div>
                <div className="h-12 w-24 bg-slate-200 rounded mb-2 mx-auto"></div>
                <div className="h-4 w-32 bg-slate-200 rounded mx-auto"></div>
            </div>
        ))}
    </div>
);

const SkeletonProfile = () => (
    <div className="bg-white rounded-3xl shadow-xl p-8 animate-pulse">
        <div className="flex items-start gap-6 mb-8">
            <div className="w-32 h-32 bg-slate-200 rounded-2xl"></div>
            <div className="flex-1 space-y-3">
                <div className="h-8 w-48 bg-slate-200 rounded"></div>
                <div className="h-4 w-32 bg-slate-200 rounded"></div>
                <div className="h-4 w-40 bg-slate-200 rounded"></div>
            </div>
        </div>
        <div className="space-y-4">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="h-4 bg-slate-200 rounded"></div>
            ))}
        </div>
    </div>
);

export { SkeletonCard, SkeletonGrid, SkeletonStats, SkeletonProfile };
