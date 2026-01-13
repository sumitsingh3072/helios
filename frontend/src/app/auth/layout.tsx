import { Zap } from "lucide-react";
import Link from "next/link";

export default function AuthLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen flex-col bg-muted/40">
            <div className="flex items-center justify-between p-6">
                <Link href="/" className="flex items-center gap-2 font-bold text-xl">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-primary" />
                    </div>
                    Helios
                </Link>
            </div>
            <div className="flex flex-1 items-center justify-center p-4 sm:p-8">
                <div className="w-full max-w-md space-y-4">
                    {children}
                </div>
            </div>
        </div>
    );
}
