"use client";

import {
    BarChart3,
    CreditCard,
    LayoutDashboard,
    LogOut,
    MessageSquare,
    PieChart,
    Settings,
    Zap,
    ChevronLeft,
    ChevronRight,
    ScanLine,
} from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Logo } from "@/components/logo";
import { ModeToggle } from "@/components/mode-toggle";

interface AppSidebarProps {
    className?: string;
    isMobile?: boolean;
}

const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: MessageSquare, label: "AI Chat", href: "/dashboard/chat" },
    { icon: ScanLine, label: "Scanner", href: "/dashboard/scanner" },
    { icon: PieChart, label: "Insights", href: "/dashboard/insights" },
    { icon: CreditCard, label: "Transactions", href: "/dashboard/transactions" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function AppSidebar({ className, isMobile = false }: AppSidebarProps) {
    const pathname = usePathname();
    const [isCollapsed, setIsCollapsed] = useState(false);

    // Force expanded on mobile
    const collapseState = isMobile ? false : isCollapsed;

    return (
        <aside
            className={cn(
                "flex flex-col h-full bg-[#000000] border-r border-[#1F1F1F] text-gray-400 relative overflow-hidden transition-all duration-300 ease-in-out",
                collapseState ? "w-20" : "w-72",
                isMobile ? "w-full border-none" : "hidden md:flex",
                className
            )}
        >
            {/* Background Ambient Glow */}
            <div className="absolute top-0 left-0 w-full h-96 bg-blue-900/10 blur-[100px] pointer-events-none" />

            <div className={cn(
                "flex h-20 items-center px-6 relative z-10 border-b border-white/5 transition-all",
                collapseState ? "justify-center" : "justify-between"
            )}>
                <Link href="/dashboard" className="flex items-center gap-3 group overflow-hidden">
                    <div className={cn(
                        "transition-all duration-300",
                        collapseState ? "scale-90" : "scale-100"
                    )}>
                        <Logo showText={!collapseState} />
                    </div>
                </Link>
            </div>

            <div className="flex-1 overflow-x-hidden overflow-y-auto py-6 relative z-10 scrollbar-none">
                <nav className="grid items-start px-3 text-sm font-medium gap-2">
                    {sidebarItems.map((item, index) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={index}
                                href={item.href}
                                className={cn(
                                    "flex items-center gap-4 rounded-full py-3 transition-all duration-300 group relative overflow-hidden",
                                    collapseState ? "justify-center px-0" : "px-5",
                                    isActive
                                        ? "text-white bg-blue-600/10 shadow-[0_0_20px_-5px_rgba(59,130,246,0.3)] border border-blue-500/20"
                                        : "hover:text-white hover:bg-white/5 hover:border-white/5 border border-transparent"
                                )}
                                title={collapseState ? item.label : undefined}
                            >
                                <item.icon className={cn(
                                    "h-5 w-5 shrink-0 transition-transform duration-300 group-hover:scale-110",
                                    isActive ? "text-blue-500" : "group-hover:text-blue-400"
                                )} />

                                {!collapseState && (
                                    <span className={cn(
                                        "relative z-10 tracking-wide font-medium whitespace-nowrap overflow-hidden transition-all duration-300 text-sm",
                                        isActive ? "font-bold text-blue-100" : ""
                                    )}>{item.label}</span>
                                )}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            <div className="mt-auto p-4 border-t border-white/5 relative z-10 flex flex-col gap-4">
                {/* User Profile */}
                <div className={cn(
                    "flex items-center gap-3 px-3 py-2 rounded-2xl bg-[#050A14] border border-white/5 hover:border-white/10 transition-colors cursor-pointer group overflow-hidden",
                    collapseState ? "justify-center p-2" : ""
                )}>
                    <div className="h-9 w-9 shrink-0 rounded-full bg-gradient-to-tr from-blue-600 to-cyan-500 flex items-center justify-center ring-2 ring-black/50 overflow-hidden">
                        <div className="w-full h-full bg-black/20 flex items-center justify-center font-bold text-white text-[10px]">SG</div>
                    </div>
                    {!collapseState && (
                        <div className="overflow-hidden min-w-0">
                            <p className="font-bold text-sm text-white truncate group-hover:text-blue-400 transition-colors">Somil Gupta</p>
                            <p className="text-[10px] uppercase tracking-widest text-gray-500 font-bold truncate">Pro Plan</p>
                        </div>
                    )}
                </div>

                {/* Collapse Toggle (Desktop Only) */}
                {!isMobile && (
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="w-full justify-center text-gray-500 hover:text-white hover:bg-white/5 transition-colors h-8"
                    >
                        {collapseState ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
                    </Button>
                )}
            </div>
        </aside>
    );
}
