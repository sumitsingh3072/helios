"use client";

import { AppSidebar } from "@/components/app-sidebar";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { AuthGuard } from "@/components/auth-guard";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <AuthGuard>
            <div className="flex min-h-screen bg-[#000000]">
                <AppSidebar />
                <div className="flex flex-1 flex-col">
                    {/* Mobile Header */}
                    <header className="flex h-16 items-center border-b border-white/5 bg-[#000000]/50 backdrop-blur-xl px-6 md:hidden text-white justify-between sticky top-0 z-50">
                        <Logo className="scale-90" />

                        <Sheet>
                            <SheetTrigger asChild>
                                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white hover:bg-white/5">
                                    <Menu className="h-5 w-5" />
                                    <span className="sr-only">Toggle Sidebar</span>
                                </Button>
                            </SheetTrigger>
                            <SheetContent side="left" className="p-0 border-r border-white/10 bg-black w-[85vw] max-w-[300px]">
                                <AppSidebar isMobile={true} />
                            </SheetContent>
                        </Sheet>
                    </header>

                    <main className="flex-1 overflow-auto p-4 md:p-8 bg-[#000000] relative">
                        {/* Subtle Background Effects */}
                        <div className="absolute top-0 left-0 w-full h-[500px] bg-blue-900/5 blur-[150px] pointer-events-none" />
                        <div className="relative z-10">
                            {children}
                        </div>
                    </main>
                </div>
            </div>
        </AuthGuard>
    );
}
