import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, DollarSign, TrendingUp, Wallet } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
    return (
        <div className="space-y-8">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
                    <p className="text-muted-foreground mt-1">
                        Here's what's happening with your finance today.
                    </p>
                </div>
                <div className="flex items-center gap-2">
                    <Button>Add Transaction</Button>
                </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {[
                    { title: "Total Balance", value: "₹2,45,000", change: "+20.1% from last month", icon: Wallet },
                    { title: "Monthly Spending", value: "₹45,231", change: "+4% from last month", icon: DollarSign },
                    { title: "Investments", value: "₹1,20,000", change: "+12.5% all time", icon: TrendingUp },
                    { title: "Active SIPs", value: "₹15,000", change: "3 Active SIPs", icon: ArrowUpRight },
                ].map((item, i) => (
                    <Card key={i}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {item.title}
                            </CardTitle>
                            <item.icon className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{item.value}</div>
                            <p className="text-xs text-muted-foreground">
                                {item.change}
                            </p>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Spending Analysis</CardTitle>
                        <CardDescription>
                            A breakdown of your spending across categories.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[200px] flex items-center justify-center text-muted-foreground">
                            Chart Placeholder (Recharts)
                        </div>
                    </CardContent>
                </Card>
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>
                            You made 265 transactions this month.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Uber Ride", amount: "-₹340.00", date: "Today, 9:00 AM" },
                                { name: "Starbucks", amount: "-₹450.00", date: "Today, 8:30 AM" },
                                { name: "Salary Credited", amount: "+₹85,000.00", date: "Yesterday" },
                                { name: "Netflix Subscription", amount: "-₹649.00", date: "Yesterday" },
                            ].map((t, i) => (
                                <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                    <div>
                                        <p className="text-sm font-medium leading-none">{t.name}</p>
                                        <p className="text-xs text-muted-foreground mt-1">{t.date}</p>
                                    </div>
                                    <div className={`font-medium ${t.amount.startsWith('+') ? 'text-green-600' : ''}`}>{t.amount}</div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
