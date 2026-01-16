"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { api, ApiError } from "@/services/api";
import { AlertCircle, Loader2 } from "lucide-react";

export default function SignupPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        password: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await api.auth.signup({
                email: formData.email,
                full_name: `${formData.firstName} ${formData.lastName}`.trim(),
                phone_number: formData.phone,
                password: formData.password,
            });

            // Auto-login after signup
            await api.auth.login(formData.email, formData.password);
            router.push("/dashboard");
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError("Failed to create account. Please try again.");
            }
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col gap-6 w-full animate-in fade-in slide-in-from-bottom-8 duration-500">
            <div className="space-y-2 text-center">
                <h1 className="text-3xl font-serif italic font-medium tracking-tight">Create an account</h1>
                <p className="text-muted-foreground text-sm">
                    Start your journey towards financial clarity
                </p>
            </div>

            {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-center gap-3 text-red-400 text-sm">
                    <AlertCircle className="w-4 h-4 shrink-0" />
                    {error}
                </div>
            )}

            <form onSubmit={handleSignup} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                        <Label htmlFor="firstName">First name</Label>
                        <Input
                            id="firstName"
                            placeholder="John"
                            required
                            className="h-11"
                            value={formData.firstName}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                    <div className="space-y-2">
                        <Label htmlFor="lastName">Last name</Label>
                        <Input
                            id="lastName"
                            placeholder="Doe"
                            required
                            className="h-11"
                            value={formData.lastName}
                            onChange={handleChange}
                            disabled={loading}
                        />
                    </div>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        placeholder="name@example.com"
                        required
                        type="email"
                        className="h-11"
                        value={formData.email}
                        onChange={handleChange}
                        disabled={loading}
                    />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                        id="phone"
                        placeholder="9876543210"
                        required
                        type="tel"
                        className="h-11"
                        value={formData.phone}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">Required for bank integration</p>
                </div>
                <div className="space-y-2">
                    <Label htmlFor="password">Password</Label>
                    <Input
                        id="password"
                        required
                        type="password"
                        className="h-11"
                        minLength={8}
                        value={formData.password}
                        onChange={handleChange}
                        disabled={loading}
                    />
                    <p className="text-xs text-muted-foreground">Minimum 8 characters</p>
                </div>

                <Button
                    className="w-full h-11 text-base font-medium mt-2 bg-black text-white hover:bg-black/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                    type="submit"
                    disabled={loading}
                >
                    {loading ? (
                        <>
                            <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                            Creating account...
                        </>
                    ) : (
                        "Sign Up"
                    )}
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
