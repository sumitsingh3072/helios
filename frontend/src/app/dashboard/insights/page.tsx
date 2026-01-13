"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
    Bar,
    BarChart,
    CartesianGrid,
    Cell,
    Legend,
    Line,
    LineChart,
    Pie,
    PieChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { Lightbulb, TrendingUp, Wallet } from "lucide-react";

// Mock Data
const dataSpending = [
    { name: "Food", value: 4500, color: "var(--chart-1)" },
    { name: "Transport", value: 2300, color: "var(--chart-2)" },
    { name: "Rent", value: 15000, color: "var(--chart-3)" },
    { name: "Utilities", value: 3200, color: "var(--chart-4)" },
    { name: "Entertainment", value: 4200, color: "var(--chart-5)" },
];

const dataTrend = [
    { month: "Jan", spend: 28000, save: 12000 },
    { month: "Feb", spend: 32000, save: 18000 },
    { month: "Mar", spend: 29500, save: 15000 },
    { month: "Apr", spend: 35000, save: 10000 },
    { month: "May", spend: 27000, save: 22000 },
    { month: "Jun", spend: 31000, save: 19000 },
];

export default function InsightsPage() {
    return (
        <div className="space-y-6">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Insights</h1>
                <p className="text-muted-foreground mt-1">
                    AI-powered analysis of your financial health.
                </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {/* AI Insight Cards */}
                <Card className="bg-primary/5 border-primary/20">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-primary font-semibold">
                            <Lightbulb className="h-4 w-4" />
                            <span>Smart Tip</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            Your "Entertainment" spending is 15% higher than last month. Consider cutting back on subscription services to save ~₹800/month.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-green-500/5 border-green-500/20">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-green-600 font-semibold">
                            <TrendingUp className="h-4 w-4" />
                            <span>Investment Opportunity</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            You have ₹12,000 surplus cash this month. Investing this in a Nifty 50 Index Fund could grow your wealth by 12% annually.
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-blue-500/5 border-blue-500/20">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-blue-600 font-semibold">
                            <Wallet className="h-4 w-4" />
                            <span>Cash Flow</span>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm">
                            Your savings rate increased to 35% this month! You are on track to reach your emergency fund goal by August.
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Spending Breakdown</CardTitle>
                        <CardDescription>Distribution of expenses for June 2024</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <PieChart>
                                    <Pie
                                        data={dataSpending}
                                        cx="50%"
                                        cy="50%"
                                        innerRadius={60}
                                        outerRadius={80}
                                        paddingAngle={5}
                                        dataKey="value"
                                    >
                                        {dataSpending.map((entry, index) => (
                                            <Cell key={`cell-${index}`} fill={entry.color} />
                                        ))}
                                    </Pie>
                                    <Tooltip
                                        contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                        itemStyle={{ color: 'var(--foreground)' }}
                                    />
                                    <Legend />
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>

                <Card className="col-span-1">
                    <CardHeader>
                        <CardTitle>Income vs Spending</CardTitle>
                        <CardDescription>6-Month trend analysis</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="h-[300px] w-full">
                            <ResponsiveContainer width="100%" height="100%">
                                <BarChart data={dataTrend}>
                                    <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                    <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                    <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                                    <Tooltip
                                        cursor={{ fill: 'var(--muted)' }}
                                        contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }}
                                    />
                                    <Legend />
                                    <Bar dataKey="spend" name="Spending" fill="var(--chart-5)" radius={[4, 4, 0, 0]} />
                                    <Bar dataKey="save" name="Savings" fill="var(--chart-2)" radius={[4, 4, 0, 0]} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </CardContent>
                </Card>
            </div>
            <Card>
                <CardHeader>
                    <CardTitle>Net Worth Growth</CardTitle>
                    <CardDescription>Projected vs Actual Growth</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={dataTrend}>
                                <CartesianGrid strokeDasharray="3 3" opacity={0.3} />
                                <XAxis dataKey="month" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `₹${value / 1000}k`} />
                                <Tooltip contentStyle={{ backgroundColor: 'var(--background)', borderRadius: '8px', border: '1px solid var(--border)' }} />
                                <Line type="monotone" dataKey="save" stroke="var(--chart-1)" strokeWidth={2} activeDot={{ r: 8 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
