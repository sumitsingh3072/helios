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
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

const sidebarItems = [
    { icon: LayoutDashboard, label: "Overview", href: "/dashboard" },
    { icon: MessageSquare, label: "AI Chat", href: "/dashboard/chat" },
    { icon: PieChart, label: "Insights", href: "/dashboard/insights" },
    { icon: CreditCard, label: "Transactions", href: "/dashboard/transactions" },
    // { icon: TrendingUp, label: "Investments", href: "/dashboard/investments" },
    { icon: Settings, label: "Settings", href: "/dashboard/settings" },
];

export function AppSidebar() {
    const pathname = usePathname();

    return (
        <aside className="hidden w-64 flex-col border-r bg-card md:flex">
            <div className="flex h-16 items-center justify-between px-6 border-b">
                <Link href="/dashboard" className="flex items-center gap-2 font-bold text-xl">
                    <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Zap className="h-5 w-5 text-primary" />
                    </div>
                    Helios
                </Link>
                <ModeToggle />
            </div>
            <div className="flex-1 overflow-auto py-6">
                <nav className="grid items-start px-4 text-sm font-medium gap-1">
                    {sidebarItems.map((item, index) => (
                        <Link
                            key={index}
                            href={item.href}
                            className={cn(
                                "flex items-center gap-3 rounded-lg px-3 py-2.5 transition-all hover:text-primary",
                                pathname === item.href
                                    ? "bg-primary/10 text-primary"
                                    : "text-muted-foreground hover:bg-muted"
                            )}
                        >
                            <item.icon className="h-4 w-4" />
                            {item.label}
                        </Link>
                    ))}
                </nav>
            </div>
            <div className="mt-auto p-4 border-t">
                <div className="flex items-center gap-3 mb-4 px-2">
                    <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                        <div className="h-4 w-4 rounded-full bg-primary" />
                    </div>
                    <div className="text-sm">
                        <p className="font-medium">Somil Gupta</p>
                        <p className="text-xs text-muted-foreground">Pro Plan</p>
                    </div>
                </div>
                <Button variant="ghost" size="sm" className="w-full justify-start text-muted-foreground">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                </Button>
            </div>
        </aside>
    );
}
