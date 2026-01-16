"use client";

import { Button } from "@/components/ui/button";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useSettingsStore, useAuthStore } from "@/stores";
import { Settings, Bell, Shield, User, Save, Loader2, AlertCircle } from "lucide-react";
import { useState } from "react";

/**
 * Settings Page - Uses Zustand stores for state management
 * Styled to match the dark theme of other pages
 */
export default function SettingsPage() {
    const { settings, updateSettings, saveSettings, isSaving } = useSettingsStore();
    const { user, logout } = useAuthStore();
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

    const handleSave = async () => {
        try {
            await saveSettings();
        } catch {
            // Error handled in store
        }
    };

    return (
        <div className="space-y-6 text-white min-h-screen pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-white">Settings</h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Manage your account settings and preferences.
                    </p>
                </div>
                <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="bg-white text-black hover:bg-gray-200 px-6 rounded-full font-bold shadow-[0_0_20px_-5px_rgba(255,255,255,0.3)]"
                >
                    {isSaving ? (
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    ) : (
                        <Save className="w-4 h-4 mr-2" />
                    )}
                    Save Changes
                </Button>
            </div>

            <div className="grid gap-6 max-w-4xl relative">
                {/* Map overlay on top of cards */}
                <div className="absolute inset-0 z-10 pointer-events-none overflow-hidden rounded-2xl">
                    <img
                        src="/map3.png"
                        alt=""
                        className="w-full h-full object-cover opacity-[0.06] mix-blend-screen"
                    />
                </div>
                {/* Profile Section */}
                <GlassCard variant="metallic" className="p-0 overflow-hidden border-white/5">
                    <div className="p-6 border-b border-white/5 flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <User className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-400">Profile</h3>
                            <p className="text-xs text-blue-300/60">This is how others will see you on the site.</p>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="grid gap-3">
                            <Label htmlFor="name" className="text-sm text-blue-300">Display Name</Label>
                            <Input
                                id="name"
                                value={settings.displayName}
                                onChange={(e) => updateSettings({ displayName: e.target.value })}
                                className="bg-black/50 border-white/10 h-12 rounded-xl text-white placeholder:text-gray-600 focus-visible:ring-blue-500/50"
                            />
                        </div>
                        <div className="grid gap-3">
                            <Label htmlFor="email" className="text-sm text-blue-300">Email</Label>
                            <Input
                                id="email"
                                value={settings.email}
                                disabled
                                className="bg-black/30 border-white/5 h-12 rounded-xl text-gray-500"
                            />
                            <p className="text-xs text-blue-300/50">Email cannot be changed.</p>
                        </div>
                    </div>
                </GlassCard>

                {/* Notifications Section */}
                <GlassCard variant="metallic" className="p-0 overflow-hidden border-white/5">
                    <div className="p-6 border-b border-white/5 flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <Bell className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-400">Notifications</h3>
                            <p className="text-xs text-blue-300/60">Configure how you receive alerts and reports.</p>
                        </div>
                    </div>
                    <div className="p-6 space-y-6">
                        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
                            <div className="flex-1">
                                <p className="font-medium text-blue-300">Spending Alerts</p>
                                <p className="text-xs text-blue-300/50 mt-1">Receive alerts when you exceed your budget.</p>
                            </div>
                            <Switch
                                checked={settings.spendingAlerts}
                                onCheckedChange={(checked) => updateSettings({ spendingAlerts: checked })}
                                className="data-[state=checked]:bg-blue-600"
                            />
                        </div>
                        <div className="flex items-center justify-between gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:border-blue-500/30 transition-colors">
                            <div className="flex-1">
                                <p className="font-medium text-blue-300">Weekly Investment Reports</p>
                                <p className="text-xs text-blue-300/50 mt-1">Get a weekly summary of your portfolio performance.</p>
                            </div>
                            <Switch
                                checked={settings.weeklyReports}
                                onCheckedChange={(checked) => updateSettings({ weeklyReports: checked })}
                                className="data-[state=checked]:bg-blue-600"
                            />
                        </div>
                    </div>
                </GlassCard>

                {/* Security Section */}
                <GlassCard variant="metallic" className="p-0 overflow-hidden border-white/5">
                    <div className="p-6 border-b border-white/5 flex items-center gap-3">
                        <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
                            <Shield className="w-5 h-5 text-blue-500" />
                        </div>
                        <div>
                            <h3 className="font-bold text-blue-400">Security</h3>
                            <p className="text-xs text-blue-300/60">Manage your account security.</p>
                        </div>
                    </div>
                    <div className="p-6 space-y-4">
                        <Button
                            variant="outline"
                            className="border-white/10 hover:bg-white/5 text-gray-300 rounded-xl w-full md:w-auto"
                        >
                            Change Password
                        </Button>
                        <Button
                            variant="outline"
                            onClick={logout}
                            className="border-white/10 hover:bg-white/5 text-gray-300 rounded-xl w-full md:w-auto"
                        >
                            Sign Out
                        </Button>
                    </div>
                </GlassCard>

                {/* Danger Zone */}
                <GlassCard className="p-0 overflow-hidden border-red-500/20 bg-red-500/5">
                    <div className="p-6 border-b border-red-500/20 flex items-center gap-3">
                        <div className="p-2 bg-red-500/10 rounded-lg border border-red-500/20">
                            <AlertCircle className="w-5 h-5 text-red-400" />
                        </div>
                        <div>
                            <h3 className="font-bold text-red-400">Danger Zone</h3>
                            <p className="text-xs text-red-400/60">Irreversible actions regarding your account.</p>
                        </div>
                    </div>
                    <div className="p-6">
                        {!showDeleteConfirm ? (
                            <Button
                                variant="outline"
                                onClick={() => setShowDeleteConfirm(true)}
                                className="border-red-500/30 text-red-400 hover:bg-red-500/10 hover:border-red-500/50 rounded-xl"
                            >
                                Delete Account
                            </Button>
                        ) : (
                            <div className="space-y-4">
                                <p className="text-sm text-red-400">Are you sure? This action cannot be undone.</p>
                                <div className="flex gap-3">
                                    <Button
                                        variant="outline"
                                        onClick={() => setShowDeleteConfirm(false)}
                                        className="border-white/10 text-gray-300 hover:bg-white/5 rounded-xl"
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        className="bg-red-600 hover:bg-red-500 text-white rounded-xl"
                                    >
                                        Yes, Delete My Account
                                    </Button>
                                </div>
                            </div>
                        )}
                    </div>
                </GlassCard>
            </div>
        </div>
    );
}
