"use client";

/**
 * Loading skeleton for initial chat load
 * Follows SRP - only responsible for rendering the loading state
 */
export function ChatLoadingState() {
    return (
        <div className="flex-1 overflow-hidden px-3 md:px-4 py-6 space-y-6 md:space-y-8 relative z-10 animate-pulse">
            {/* Time Divider Skeleton */}
            <div className="flex justify-center">
                <div className="h-6 w-20 bg-white/5 rounded-full" />
            </div>

            {/* AI Message Skeleton */}
            <div className="flex gap-3 md:gap-4 max-w-3xl">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 shrink-0" />
                <div className="flex-1 space-y-3">
                    <div className="p-4 md:p-5 rounded-2xl rounded-tl-none bg-white/5 space-y-3">
                        <div className="h-4 bg-white/5 rounded w-3/4" />
                        <div className="h-4 bg-white/5 rounded w-full" />
                        <div className="h-4 bg-white/5 rounded w-2/3" />
                        <div className="grid grid-cols-2 gap-3 mt-4">
                            <div className="h-24 bg-white/5 rounded-xl" />
                            <div className="h-24 bg-white/5 rounded-xl" />
                        </div>
                    </div>
                    <div className="h-3 w-24 bg-white/5 rounded ml-2" />
                </div>
            </div>

            {/* User Message Skeleton */}
            <div className="flex gap-3 md:gap-4 max-w-2xl ml-auto flex-row-reverse">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 shrink-0" />
                <div className="space-y-3">
                    <div className="p-4 md:p-5 rounded-2xl rounded-tr-none bg-white/5 space-y-2 w-64 md:w-80">
                        <div className="h-4 bg-white/10 rounded w-full" />
                        <div className="h-4 bg-white/10 rounded w-3/4" />
                    </div>
                    <div className="h-3 w-20 bg-white/5 rounded ml-auto mr-2" />
                </div>
            </div>

            {/* AI Response Skeleton */}
            <div className="flex gap-3 md:gap-4 max-w-3xl">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-2xl bg-white/5 shrink-0" />
                <div className="flex-1 space-y-3">
                    <div className="p-4 md:p-5 rounded-2xl rounded-tl-none bg-white/5 space-y-3">
                        <div className="h-4 bg-white/5 rounded w-1/2" />
                        <div className="space-y-2 mt-4">
                            <div className="h-16 bg-white/5 rounded-xl" />
                            <div className="h-16 bg-white/5 rounded-xl" />
                            <div className="h-16 bg-white/5 rounded-xl" />
                        </div>
                    </div>
                    <div className="h-3 w-24 bg-white/5 rounded ml-2" />
                </div>
            </div>
        </div>
    );
}
