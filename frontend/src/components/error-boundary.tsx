"use client";

import { Button } from "@/components/ui/button";
import React, { Component, ErrorInfo, ReactNode } from "react";
import { AlertTriangle, RefreshCw, Home, ArrowLeft, Trash2 } from "lucide-react";
import Link from "next/link";

interface Props {
    children?: ReactNode;
    fallback?: ReactNode;
    onReset?: () => void;
}

interface State {
    hasError: boolean;
    error: Error | null;
    errorInfo: ErrorInfo | null;
}

/**
 * ErrorBoundary - Catches JavaScript errors in child components
 * Prevents the entire app from crashing and shows a user-friendly error UI
 */
export class ErrorBoundary extends Component<Props, State> {
    public state: State = {
        hasError: false,
        error: null,
        errorInfo: null,
    };

    public static getDerivedStateFromError(error: Error): Partial<State> {
        return { hasError: true, error };
    }

    public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
        console.error("Error Boundary caught an error:", error, errorInfo);
        this.setState({ errorInfo });
    }

    private handleReset = () => {
        this.setState({ hasError: false, error: null, errorInfo: null });
        this.props.onReset?.();
    };

    private handleClearStorage = () => {
        // Clear financial insights storage that might have corrupted data
        try {
            localStorage.removeItem('helios-financial-insights');
            localStorage.removeItem('helios-auth-storage');
            this.handleReset();
            window.location.reload();
        } catch (e) {
            console.error('Failed to clear storage:', e);
        }
    };

    public render() {
        if (this.state.hasError) {
            // Custom fallback provided
            if (this.props.fallback) {
                return this.props.fallback;
            }

            // Default error UI with premium styling
            return (
                <div className="min-h-[400px] flex items-center justify-center p-6">
                    <div className="max-w-lg w-full">
                        <div className="bg-gradient-to-br from-[#050A14] via-[#0a1628] to-[#050A14] border border-red-500/20 rounded-2xl p-8 text-center relative overflow-hidden shadow-xl shadow-red-500/5">
                            {/* Background glow */}
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-red-500/10 rounded-full blur-[80px] pointer-events-none" />

                            <div className="relative z-10">
                                {/* Icon */}
                                <div className="inline-flex p-4 bg-red-500/10 border border-red-500/20 rounded-full mb-6 animate-pulse">
                                    <AlertTriangle className="w-8 h-8 text-red-400" />
                                </div>

                                {/* Title */}
                                <h2 className="text-xl font-bold text-white mb-2">
                                    Something went wrong
                                </h2>

                                {/* Description */}
                                <p className="text-gray-400 text-sm mb-6">
                                    An unexpected error occurred. This might be due to corrupted data or a temporary issue.
                                </p>

                                {/* Error details (collapsed by default) */}
                                {this.state.error && (
                                    <details className="text-left mb-6 bg-black/30 rounded-lg p-3 border border-white/5">
                                        <summary className="text-xs text-gray-500 cursor-pointer hover:text-gray-400 transition-colors">
                                            View error details
                                        </summary>
                                        <pre className="text-xs text-red-400 mt-2 overflow-auto max-h-32 font-mono whitespace-pre-wrap">
                                            {this.state.error.message}
                                        </pre>
                                        {this.state.errorInfo && (
                                            <pre className="text-xs text-gray-600 mt-2 overflow-auto max-h-32 font-mono whitespace-pre-wrap">
                                                {this.state.errorInfo.componentStack}
                                            </pre>
                                        )}
                                    </details>
                                )}

                                {/* Actions */}
                                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                                    <Button
                                        onClick={this.handleReset}
                                        className="bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-500 hover:to-blue-400 text-white rounded-full px-6 font-bold shadow-lg shadow-blue-600/20"
                                    >
                                        <RefreshCw className="w-4 h-4 mr-2" />
                                        Try Again
                                    </Button>

                                    <Button
                                        onClick={this.handleClearStorage}
                                        variant="outline"
                                        className="border-orange-500/30 text-orange-400 hover:bg-orange-500/10 rounded-full px-6"
                                    >
                                        <Trash2 className="w-4 h-4 mr-2" />
                                        Clear Cache
                                    </Button>
                                </div>

                                {/* Navigation links */}
                                <div className="flex justify-center gap-4 mt-6 text-sm">
                                    <Link
                                        href="/dashboard"
                                        className="text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                                    >
                                        <ArrowLeft className="w-3 h-3" />
                                        Dashboard
                                    </Link>
                                    <Link
                                        href="/"
                                        className="text-gray-500 hover:text-blue-400 transition-colors flex items-center gap-1"
                                    >
                                        <Home className="w-3 h-3" />
                                        Home
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

/**
 * PageErrorBoundary - A styled error boundary specifically for page-level errors
 * with dashboard-specific styling
 */
export class PageErrorBoundary extends ErrorBoundary {
    // Inherits all functionality from ErrorBoundary
}

/**
 * Higher-order component wrapper for functional components
 */
export function withErrorBoundary<P extends object>(
    WrappedComponent: React.ComponentType<P>,
    fallback?: ReactNode
) {
    return function WithErrorBoundaryWrapper(props: P) {
        return (
            <ErrorBoundary fallback={fallback}>
                <WrappedComponent {...props} />
            </ErrorBoundary>
        );
    };
}

export default ErrorBoundary;
