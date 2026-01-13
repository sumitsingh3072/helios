import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { ArrowRight, Check, Shield, TrendingUp, Zap, BarChart3, Database, Globe, Lock } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { AnalyticsCard, SecurityCard, AiCard } from "@/components/bento-grid-items";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Navbar - Centered Container */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
        <div className="container mx-auto max-w-7xl flex h-16 items-center justify-between px-6 lg:px-8">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold tracking-tight">Helios</span>
          </div>
          <nav className="hidden md:flex gap-8 text-sm font-medium">
            {/* <Link href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</Link> */}
          </nav>
          <div className="flex items-center gap-4">
            <ModeToggle />
            <Link href="/auth/login" className="text-sm font-medium text-muted-foreground hover:text-foreground hidden sm:inline-block">
              Log in
            </Link>
            <Button asChild size="sm" className="rounded-full px-5">
              <Link href="/auth/signup">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full">
        {/* Hero Section - Centered */}
        <section className="w-full py-24 sm:py-32 lg:pb-40 border-b">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8 flex flex-col items-center text-center">
            <div className="inline-flex items-center rounded-full border bg-muted/50 px-3 py-1 text-sm font-medium text-muted-foreground backdrop-blur-sm mb-6">
              <span className="flex h-2 w-2 rounded-full bg-primary mr-2"></span>
              Now in Early Access 2.0
            </div>
            <h1 className="max-w-4xl text-5xl font-bold tracking-tight sm:text-7xl mb-6 bg-clip-text text-transparent bg-gradient-to-b from-foreground to-foreground/60">
              Financial Clarity for the Modern Age
            </h1>
            <p className="max-w-2xl text-lg text-muted-foreground sm:text-xl mb-10 leading-relaxed">
              Connect your accounts, get AI-driven insights, and master your cash flow.
              Helios is the co-pilot your money deserves.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full justify-center">
              <Button size="lg" className="rounded-full h-12 px-8 text-base shadow-lg shadow-primary/20">
                Start Your Free Trial
              </Button>
              <Button variant="outline" size="lg" className="rounded-full h-12 px-8 text-base">
                View Interactive Demo
              </Button>
            </div>

            {/* UI Preview */}
            <div className="mt-20 relative w-full max-w-5xl rounded-2xl border bg-background shadow-2xl overflow-hidden aspect-[16/9] group">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/5 via-transparent to-transparent z-0 pointer-events-none" />
              {/* Mockup Content Placeholders */}
              <div className="relative z-10 w-full h-full p-4 grid grid-cols-12 gap-4 bg-muted/10">
                {/* Sidebar */}
                <div className="hidden md:flex col-span-2 h-full rounded-lg border bg-background/50 flex-col p-4 gap-4">
                  <div className="h-8 w-8 rounded-full bg-primary/20" />
                  <div className="space-y-2">
                    <div className="h-2 w-16 bg-muted-foreground/20 rounded" />
                    <div className="h-2 w-12 bg-muted-foreground/20 rounded" />
                    <div className="h-2 w-14 bg-muted-foreground/20 rounded" />
                  </div>
                </div>
                {/* Main */}
                <div className="col-span-12 md:col-span-10 grid grid-rows-6 gap-4 h-full">
                  {/* Top Bar */}
                  <div className="row-span-1 rounded-lg border bg-background/50 flex items-center px-6 justify-between">
                    <div className="h-4 w-32 bg-muted-foreground/20 rounded" />
                    <div className="flex gap-2">
                      <div className="h-8 w-8 rounded-full bg-muted-foreground/10" />
                      <div className="h-8 w-20 rounded-full bg-primary/20" />
                    </div>
                  </div>
                  {/* Content */}
                  <div className="row-span-5 grid grid-cols-3 gap-4">
                    <div className="col-span-2 rounded-lg border bg-background/80 p-6 shadow-sm">
                      <div className="flex items-center gap-4 mb-4">
                        <div className="h-10 w-10 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500"><TrendingUp size={20} /></div>
                        <div>
                          <div className="h-4 w-24 bg-foreground/10 rounded mb-1" />
                          <div className="h-8 w-32 bg-foreground/20 rounded" />
                        </div>
                      </div>
                      <div className="h-40 w-full bg-muted/20 rounded-lg" />
                    </div>
                    <div className="col-span-1 rounded-lg border bg-background/80 p-6 shadow-sm flex flex-col gap-4">
                      <div className="h-4 w-24 bg-foreground/20 rounded" />
                      <div className="flex-1 bg-muted/20 rounded-lg p-3 space-y-2">
                        <div className="h-2 w-full bg-muted-foreground/10 rounded" />
                        <div className="h-2 w-3/4 bg-muted-foreground/10 rounded" />
                      </div>
                      <div className="h-10 w-full bg-primary/10 rounded-lg" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Strip - Infinite Marquee */}
        <section className="border-b py-12 bg-muted/30 w-full overflow-hidden">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8 text-center">
            <p className="text-sm font-semibold text-muted-foreground mb-8 uppercase tracking-widest">Powering Next-Gen Finance Teams</p>
            <div className="relative flex overflow-x-hidden group">
              <div className="animate-marquee whitespace-nowrap flex items-center gap-12 lg:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 font-bold text-xl"><Globe className="h-6 w-6" /> GlobalBank</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Database className="h-6 w-6" /> DataFlow</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Zap className="h-6 w-6" /> FastPay</div>
                <div className="flex items-center gap-2 font-bold text-xl"><BarChart3 className="h-6 w-6" /> ChartMetric</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Shield className="h-6 w-6" /> SecureCorp</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Globe className="h-6 w-6" /> GlobalBank</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Database className="h-6 w-6" /> DataFlow</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Zap className="h-6 w-6" /> FastPay</div>
              </div>
              <div className="absolute top-0 animate-marquee2 whitespace-nowrap flex items-center gap-12 lg:gap-20 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                <div className="flex items-center gap-2 font-bold text-xl"><Globe className="h-6 w-6" /> GlobalBank</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Database className="h-6 w-6" /> DataFlow</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Zap className="h-6 w-6" /> FastPay</div>
                <div className="flex items-center gap-2 font-bold text-xl"><BarChart3 className="h-6 w-6" /> ChartMetric</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Shield className="h-6 w-6" /> SecureCorp</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Globe className="h-6 w-6" /> GlobalBank</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Database className="h-6 w-6" /> DataFlow</div>
                <div className="flex items-center gap-2 font-bold text-xl"><Zap className="h-6 w-6" /> FastPay</div>
              </div>
            </div>
          </div>
        </section>

        {/* Features - Bento Grid */}
        <section id="features" className="py-24 sm:py-32 w-full">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            <div className="flex flex-col items-center text-center md:max-w-3xl mx-auto mb-20 gap-4">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Everything you need to master your money</h2>
              <p className="text-lg text-muted-foreground">
                Stop relying on spreadsheets. Helios brings bank-grade syncing, intelligent categorization, and investment tracking into one unified dashboard.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[300px]">
              {/* 1. Analytics Card (Large, spans 2 cols) */}
              <div className="md:col-span-2 relative group overflow-hidden rounded-3xl border bg-background p-8 shadow-sm transition-all hover:shadow-md">
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary mb-4">
                      <BarChart3 className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-bold">Real-time Analytics</h3>
                    <p className="text-muted-foreground mt-2 max-w-sm">Visualize your cash flow with interactive charts that update instantly as you spend.</p>
                  </div>
                  {/* Interactive Component Area */}
                  <div className="absolute right-0 bottom-0 top-0 w-1/2 opacity-50 mask-gradient-left md:opacity-100">
                    <AnalyticsCard />
                  </div>
                </div>
              </div>

              {/* 2. Security (Tall or Normal) */}
              <div className="md:col-span-1 relative group overflow-hidden rounded-3xl border bg-background p-8 shadow-sm transition-all hover:shadow-md">
                <div className="absolute inset-0 z-0 opacity-50">
                  <SecurityCard />
                </div>
                <div className="relative z-10 flex flex-col h-full justify-between pointer-events-none">
                  <div className="h-10 w-10 rounded-lg bg-green-500/10 flex items-center justify-center text-green-500 mb-4">
                    <Shield className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold">Bank-Grade Security</h3>
                    <p className="text-muted-foreground mt-2">256-bit encryption ensuring your financial data stays private and secure.</p>
                  </div>
                </div>
              </div>

              {/* 3. AI Insights (Normal) */}
              <div className="md:col-span-1 relative group overflow-hidden rounded-3xl border bg-background p-8 shadow-sm transition-all hover:shadow-md flex flex-col justify-between">
                <div>
                  <div className="h-10 w-10 rounded-lg bg-purple-500/10 flex items-center justify-center text-purple-500 mb-4">
                    <Zap className="h-5 w-5" />
                  </div>
                  <h3 className="text-xl font-bold">AI Co-Pilot</h3>
                  <p className="text-muted-foreground mt-2 text-sm">Get actionable advice in plain English.</p>
                </div>
                <div className="mt-4 flex-1">
                  <AiCard />
                </div>
              </div>

              {/* 4. Global Tracking (Large, spans 2 cols) */}
              <div className="md:col-span-2 relative group overflow-hidden rounded-3xl border bg-background p-8 shadow-sm transition-all hover:shadow-md">
                <div className="grid grid-cols-2 gap-8 h-full">
                  <div className="flex flex-col justify-center">
                    <div className="h-10 w-10 rounded-lg bg-blue-500/10 flex items-center justify-center text-blue-500 mb-4">
                      <Globe className="h-5 w-5" />
                    </div>
                    <h3 className="text-2xl font-bold">Global Tracking</h3>
                    <p className="text-muted-foreground mt-2">Track assets across multiple currencies, regions, and asset classes in one view.</p>
                  </div>
                  <div className="relative bg-muted/20 rounded-2xl p-4 border flex flex-col gap-3 mask-gradient-top">
                    {/* Mock Asset List */}
                    {[1, 2, 3].map(i => (
                      <div key={i} className="flex items-center justify-between p-3 bg-background rounded-xl shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="h-8 w-8 rounded-full bg-primary/10" />
                          <div className="h-2 w-16 bg-muted-foreground/20 rounded" />
                        </div>
                        <div className="h-2 w-12 bg-green-500/20 rounded" />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section className="py-24 bg-muted/30 border-t w-full">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-center mb-16">Loved by 10,000+ Users</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { quote: "Helios completely changed how I look at my monthly expenses. The AI tips are genuinely useful.", author: "Sarah J.", role: "Product Designer" },
                { quote: "I used to track everything in Excel. Helios saves me 5 hours a week and looks 10x better.", author: "Mike T.", role: "Software Engineer" },
                { quote: "Finally, a fintech app that feels premium and doesn't spam me with ads. Highly recommended.", author: "Priya R.", role: "Founder" },
              ].map((t, i) => (
                <div key={i} className="flex flex-col justify-between p-8 rounded-2xl bg-background border shadow-sm">
                  <p className="text-lg mb-6 leading-relaxed">"{t.quote}"</p>
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center font-bold text-primary">
                      {t.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-bold text-sm">{t.author}</p>
                      <p className="text-xs text-muted-foreground">{t.role}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Big CTA */}
        <section className="py-24 sm:py-32 w-full">
          <div className="container mx-auto max-w-7xl px-6 lg:px-8">
            <div className="relative isolate overflow-hidden bg-background border rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
              {/* Gradient Background */}
              <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top_right,_var(--tw-gradient-stops))] from-primary/20 via-background to-background opacity-80" />

              <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                  Ready to transform your finances?
                  <br />
                  <span className="text-primary">Join the hackathon demo.</span>
                </h2>
                <p className="mt-6 text-lg leading-8 text-muted-foreground">
                  Experience the future of financial management. No credit card required, just pure AI-driven insights.
                </p>
                <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                  <Button size="lg" className="rounded-full px-8 h-12 shadow-md">
                    <Link href="/auth/signup">Get Started Now</Link>
                  </Button>
                  <Button variant="outline" size="lg" className="rounded-full px-8 h-12">
                    <Link href="/dashboard" className="flex items-center">
                      Try Demo <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="relative mt-16 h-80 lg:mt-8">
                {/* Decorative floating UI elements */}
                <div className="absolute left-0 top-0 w-[57rem] max-w-none rounded-md bg-white/5 ring-1 ring-white/10" />
                <div className="absolute top-10 left-10 p-6 bg-card border rounded-xl shadow-2xl w-64 rotate-[-6deg] z-20">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="h-10 w-10 rounded-full bg-green-500/10 flex items-center justify-center text-green-500"><TrendingUp size={20} /></div>
                    <div>
                      <div className="text-sm font-bold">Investment Up</div>
                      <div className="text-xs text-green-600">+12.5% this month</div>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-muted/20 rounded-full overflow-hidden">
                    <div className="h-full w-3/4 bg-green-500 rounded-full" />
                  </div>
                </div>
                <div className="absolute top-40 left-40 p-6 bg-card border rounded-xl shadow-2xl w-64 rotate-[3deg] z-10 glass-panel">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary"><Zap size={20} /></div>
                    <div>
                      <div className="text-sm font-bold">New Insight</div>
                      <div className="text-xs text-muted-foreground">Just now</div>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">You could save ₹2,000 by optimizing your subscriptions.</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t py-12 bg-background w-full">
        <div className="container mx-auto max-w-7xl px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
            <div className="h-6 w-6 rounded bg-primary/20 flex items-center justify-center text-primary">
              <Zap className="h-3 w-3" />
            </div>
            <span className="font-bold">Helios</span>
          </div>
          <p className="text-sm text-muted-foreground">© 2026 Helios Inc. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
