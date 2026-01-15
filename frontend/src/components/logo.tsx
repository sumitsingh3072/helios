import { cn } from "@/lib/utils";

interface LogoProps {
    className?: string;
    iconClassName?: string;
    showText?: boolean;
}

export function Logo({ className, iconClassName, showText = true }: LogoProps) {
    return (
        <div className={cn("flex items-center gap-3", className)}>
            {/* Creative H + O Monogram */}
            <div className={cn("relative h-10 w-10 flex items-center justify-center bg-black text-white dark:bg-white dark:text-black rounded-lg shadow-sm overflow-hidden", iconClassName)}>
                <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="w-6 h-6"
                >
                    {/* The 'H' constructed geometrically */}
                    <rect x="4" y="5" width="3" height="14" rx="0.5" />

                    {/* The 'O' (Sun) floating/intertwined */}
                    <path d="M12 11h-5v2h5v-2z" /> {/* H Crossbar connecting to O */}

                    <circle cx="16" cy="12" r="5" className="stroke-current stroke-[3] fill-none" />
                    <circle cx="16" cy="12" r="2" className="fill-current" />
                </svg>
            </div>
            
        </div>
    );
}
