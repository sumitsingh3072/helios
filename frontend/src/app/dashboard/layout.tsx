import { AppSidebar } from "@/components/app-sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="flex min-h-screen bg-muted/20">
            <AppSidebar />
            <div className="flex flex-1 flex-col">
                {/* Mobile Header Placeholder - In a real app, implement sheet/drawer here */}
                <header className="flex h-16 items-center border-b bg-card px-6 md:hidden">
                    <span className="font-bold">Helios</span>
                </header>
                <main className="flex-1 overflow-auto p-6 md:p-8">
                    {children}
                </main>
            </div>
        </div>
    );
}
