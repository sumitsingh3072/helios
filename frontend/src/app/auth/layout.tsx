import { Logo } from "@/components/logo";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-[#F3F0E7] dark:bg-black text-black dark:text-white relative overflow-hidden">
            {/* Background Effects */}
            <div className="absolute left-[-20%] top-[40%] w-[60vw] h-[60vh] bg-[#2A86FF] rounded-full blur-[120px] opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />
            <div className="absolute right-[-20%] bottom-[10%] w-[60vw] h-[60vh] bg-[#FF9F1C] rounded-full blur-[120px] opacity-20 pointer-events-none mix-blend-multiply dark:mix-blend-screen" />

            {/* Header */}
            <div className="relative z-50 flex items-center justify-between p-6 md:p-10">
                <Link href="/" className="hover:opacity-80 transition-opacity">
                    <Logo className="text-black dark:text-white" />
                </Link>
            </div>

            {/* Content Center */}
            <div className="flex flex-1 items-center justify-center p-4 sm:p-8 relative z-10">
                <div className="w-full max-w-md space-y-6">
                    {children}
                </div>
            </div>
        </div>
    );
}
