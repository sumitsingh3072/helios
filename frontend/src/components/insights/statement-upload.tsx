"use client";

import { useRef, useState } from "react";
import { Upload, FileText, X, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StatementUploadProps {
    onUpload: (file: File) => Promise<void>;
    isUploading: boolean;
    uploadedFileName: string | null;
    onClear: () => void;
    className?: string;
}

/**
 * StatementUpload - File upload component for bank statements
 * Follows SRP: Only handles file selection and upload trigger
 */
export function StatementUpload({
    onUpload,
    isUploading,
    uploadedFileName,
    onClear,
    className,
}: StatementUploadProps) {
    const inputRef = useRef<HTMLInputElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleFileSelect = async (file: File | undefined) => {
        if (!file) return;

        // Validate file type
        const validTypes = ['application/pdf', 'image/png', 'image/jpeg', 'image/jpg'];
        if (!validTypes.includes(file.type)) {
            setError("Please upload a PDF or image file (PNG, JPG)");
            return;
        }

        // Validate file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            setError("File size must be less than 10MB");
            return;
        }

        setError(null);
        try {
            await onUpload(file);
        } catch {
            // Error is handled by the store
        }
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        handleFileSelect(e.dataTransfer.files[0]);
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(true);
    };

    const handleDragLeave = () => {
        setIsDragging(false);
    };

    if (uploadedFileName) {
        return (
            <div className={cn(
                "flex items-center gap-3 px-4 py-3 bg-green-500/10 border border-green-500/20 rounded-xl",
                className
            )}>
                <FileText className="w-5 h-5 text-green-400 shrink-0" />
                <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-green-300 truncate">{uploadedFileName}</p>
                    <p className="text-xs text-green-400/60">Analysis complete</p>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={onClear}
                    className="h-8 w-8 text-green-400 hover:text-red-400 hover:bg-red-500/10"
                >
                    <X className="w-4 h-4" />
                </Button>
            </div>
        );
    }

    return (
        <div className={className}>
            <input
                ref={inputRef}
                type="file"
                accept=".pdf,.png,.jpg,.jpeg"
                onChange={(e) => handleFileSelect(e.target.files?.[0])}
                className="hidden"
            />
            <div
                onClick={() => !isUploading && inputRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={cn(
                    "relative flex flex-col items-center justify-center gap-3 p-6 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200",
                    isDragging
                        ? "border-blue-500 bg-blue-500/10"
                        : "border-white/10 hover:border-white/20 hover:bg-white/5",
                    isUploading && "pointer-events-none opacity-70"
                )}
            >
                {isUploading ? (
                    <>
                        <Loader2 className="w-8 h-8 text-blue-400 animate-spin" />
                        <p className="text-sm text-gray-400">Analyzing your statement...</p>
                    </>
                ) : (
                    <>
                        <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-xl">
                            <Upload className="w-6 h-6 text-blue-400" />
                        </div>
                        <div className="text-center">
                            <p className="text-sm font-medium text-gray-300">
                                Upload Bank Statement
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                                PDF or Image (PNG, JPG) • Max 10MB
                            </p>
                        </div>
                    </>
                )}
            </div>
            {error && (
                <p className="text-xs text-red-400 mt-2">{error}</p>
            )}
        </div>
    );
}
