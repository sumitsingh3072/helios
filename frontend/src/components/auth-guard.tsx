"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/stores";
import { Loader2 } from "lucide-react";

interface AuthGuardProps {
    children: React.ReactNode;
}

/**
 * AuthGuard - Protects routes that require authentication
 * Redirects to /auth/login if user is not authenticated
 */
export function AuthGuard({ children }: AuthGuardProps) {
    const router = useRouter();
    const { isAuthenticated, checkAuth, fetchUser, isLoading } = useAuthStore();
    const [isChecking, setIsChecking] = useState(true);

    useEffect(() => {
        const verifyAuth = async () => {
            // Check if there's a valid token
            const hasToken = checkAuth();

            if (!hasToken) {
                // No token, redirect to login
                router.replace("/auth/login");
                return;
            }

            // Token exists, verify it's still valid by fetching user
            if (!isAuthenticated) {
                try {
                    await fetchUser();
                } catch {
                    // Token is invalid, redirect to login
                    router.replace("/auth/login");
                    return;
                }
            }

            setIsChecking(false);
        };

        verifyAuth();
    }, [checkAuth, fetchUser, isAuthenticated, router]);

    // Show loading state while checking authentication
    if (isChecking || isLoading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#000000]">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
                    <p className="text-sm text-gray-400">Verifying authentication...</p>
                </div>
            </div>
        );
    }

    // User is authenticated, render children
    return <>{children}</>;
}
