"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const handleSignup = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        // Simulate signup
        setTimeout(() => {
            setLoading(false);
            router.push("/dashboard");
        }, 1500);
    };

    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-serif italic font-medium tracking-tight">Create an account</h1>
                <p className="text-muted-foreground text-sm">
                    Start your journey towards financial clarity
                </p>
            </div>

            <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="first-name">First name</Label>
                        <Input id="first-name" placeholder="John" required className="h-11" />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="last-name">Last name</Label>
                        <Input id="last-name" placeholder="Doe" required className="h-11" />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" placeholder="name@example.com" required type="email" className="h-11" />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" required type="password" className="h-11" />
                </div>

                <Button
                    className="w-full h-11 text-base font-medium mt-2 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? "Creating account..." : "Sign Up"}
                </Button>
            </form>

            <div className="text-center text-sm text-muted-foreground mt-4">
                Already have an account?{" "}
                <Link href="/auth/login" className="font-semibold text-foreground hover:underline">
                    Sign in
                </Link>
            </div>
        </div>
    );
}
