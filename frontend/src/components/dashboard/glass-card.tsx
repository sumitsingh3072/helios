import { cn } from "@/lib/utils";

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    className?: string;
    variant?: "default" | "blue" | "metallic";
}

export function GlassCard({ children, className, variant = "default", ...props }: GlassCardProps) {
    const variants = {
        default: "bg-[#050A14]/80 border-white/5 hover:border-blue-500/20 shadow-sm backdrop-blur-xl",
        blue: "bg-gradient-to-br from-[#050A14] to-[#001029] border-blue-500/20 hover:border-blue-400/30 hover:shadow-[0_0_30px_-10px_rgba(0,71,255,0.2)]",
        metallic: "bg-[#080C14] border-white/10 shadow-[inner_0_0_40px_rgba(0,0,0,0.8)] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] bg-opacity-20 hover:border-white/20 transition-colors",
    };

    return (
        <div
            className={cn(
                "relative overflow-hidden rounded-[2rem] border backdrop-blur-3xl transition-all duration-300 group",
                variants[variant],
                className
            )}
            {...props}
        >
            {/* Metallic Sheen Overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

            {/* Internal Noise */}
            <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.04] pointer-events-none" />
            <div className="relative z-10 h-full">{children}</div>
        </div>
    );
}
