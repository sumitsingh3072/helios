"use client";

import { useState, useCallback } from "react";
import { GlassCard } from "@/components/dashboard/glass-card";
import { Button } from "@/components/ui/button";
import {
    ScanLine,
    Upload,
    FileText,
    AlertTriangle,
    CheckCircle2,
    Loader2,
    ShieldAlert,
    Shield,
    X
} from "lucide-react";
import { api, ApiError } from "@/services/api";

interface AnalysisResult {
    document_type: string;
    extracted_data: Record<string, unknown>;
}

interface FraudResult {
    is_scam: boolean;
    reason: string;
}

export default function ScannerPage() {
    const [file, setFile] = useState<File | null>(null);
    const [preview, setPreview] = useState<string | null>(null);
    const [isUploading, setIsUploading] = useState(false);
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [isCheckingFraud, setIsCheckingFraud] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [ocrText, setOcrText] = useState<string | null>(null);
    const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
    const [fraudResult, setFraudResult] = useState<FraudResult | null>(null);
    const [dragActive, setDragActive] = useState(false);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    }, []);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    }, []);

    const handleFile = (selectedFile: File) => {
        // Validate file type
        const allowedTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/webp', 'application/pdf'];
        if (!allowedTypes.includes(selectedFile.type)) {
            setError("Please upload a PNG, JPG, WEBP, or PDF file.");
            return;
        }

        setFile(selectedFile);
        setError(null);
        setOcrText(null);
        setAnalysisResult(null);
        setFraudResult(null);

        // Create preview for images
        if (selectedFile.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreview(e.target?.result as string);
            };
            reader.readAsDataURL(selectedFile);
        } else {
            setPreview(null);
        }
    };

    const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleScan = async () => {
        if (!file) return;

        setIsUploading(true);
        setError(null);

        try {
            // Call OCR endpoint
            const result = await api.ocr.upload(file);
            setOcrText(result.extracted_text || "No text could be extracted from this document.");
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError("Failed to scan document. Please try again.");
            }
        } finally {
            setIsUploading(false);
        }
    };

    const handleAnalyze = async () => {
        if (!file) return;

        setIsAnalyzing(true);
        setError(null);

        try {
            // Call document analysis endpoint
            const result = await api.documentAnalysis.analyze(file);
            setAnalysisResult(result);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError("Failed to analyze document. Please try again.");
            }
        } finally {
            setIsAnalyzing(false);
        }
    };

    const handleFraudCheck = async () => {
        if (!ocrText) return;

        setIsCheckingFraud(true);
        setError(null);

        try {
            // Call fraud detection endpoint
            const result = await api.fraud.analyze(ocrText);
            setFraudResult(result);
        } catch (err) {
            if (err instanceof ApiError) {
                setError(err.message);
            } else {
                setError("Failed to check for fraud. Please try again.");
            }
        } finally {
            setIsCheckingFraud(false);
        }
    };

    const clearAll = () => {
        setFile(null);
        setPreview(null);
        setOcrText(null);
        setAnalysisResult(null);
        setFraudResult(null);
        setError(null);
    };

    return (
        <div className="space-y-6 text-white min-h-screen pb-10">
            {/* Header */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl md:text-3xl font-serif font-bold tracking-tight text-white flex items-center gap-3">
                        <ScanLine className="w-8 h-8 text-blue-400" />
                        Document Scanner
                    </h1>
                    <p className="text-gray-400 text-sm mt-1">
                        Upload documents for OCR, analysis, and fraud detection.
                    </p>
                </div>
                {file && (
                    <Button
                        variant="outline"
                        className="border-white/10 hover:bg-white/5 text-gray-300 font-medium rounded-full px-6"
                        onClick={clearAll}
                    >
                        <X className="w-4 h-4 mr-2" />
                        Clear
                    </Button>
                )}
            </div>

            {/* Error Display */}
            {error && (
                <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-xl flex items-center gap-3 text-red-400">
                    <AlertTriangle className="w-5 h-5 shrink-0" />
                    {error}
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload Section */}
                <GlassCard variant="metallic" className="p-6 border-white/5">
                    <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
                        <Upload className="w-5 h-5 text-blue-400" />
                        Upload Document
                    </h2>

                    {/* Drop Zone */}
                    <div
                        onDragEnter={handleDrag}
                        onDragLeave={handleDrag}
                        onDragOver={handleDrag}
                        onDrop={handleDrop}
                        className={`
                            relative border-2 border-dashed rounded-2xl p-8 text-center transition-all cursor-pointer
                            ${dragActive ? 'border-blue-500 bg-blue-500/10' : 'border-white/10 hover:border-white/20 hover:bg-white/5'}
                            ${preview ? 'border-green-500/50 bg-green-500/5' : ''}
                        `}
                    >
                        <input
                            type="file"
                            accept="image/png,image/jpeg,image/jpg,image/webp,application/pdf"
                            onChange={handleFileInput}
                            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                        />

                        {preview ? (
                            <div className="space-y-4">
                                <img
                                    src={preview}
                                    alt="Preview"
                                    className="max-h-48 mx-auto rounded-lg object-contain"
                                />
                                <p className="text-sm text-green-400 font-medium">{file?.name}</p>
                            </div>
                        ) : file ? (
                            <div className="space-y-4">
                                <FileText className="w-16 h-16 mx-auto text-blue-400" />
                                <p className="text-sm text-gray-400">{file.name}</p>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <Upload className="w-12 h-12 mx-auto text-gray-500" />
                                <div>
                                    <p className="text-gray-400 font-medium">Drag & drop your document here</p>
                                    <p className="text-white text-sm mt-1">or click to browse</p>
                                </div>
                                <p className="text-xs text-white">Supports PNG, JPG, WEBP, PDF</p>
                            </div>
                        )}
                    </div>

                    {/* Action Buttons */}
                    {file && (
                        <div className="flex flex-col sm:flex-row gap-3 mt-6">
                            <Button
                                onClick={handleScan}
                                disabled={isUploading}
                                className="flex-1 bg-blue-600 hover:bg-blue-500 text-white font-bold rounded-xl h-12"
                            >
                                {isUploading ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Scanning...</>
                                ) : (
                                    <><ScanLine className="w-4 h-4 mr-2" />Extract Text (OCR)</>
                                )}
                            </Button>
                            <Button
                                onClick={handleAnalyze}
                                disabled={isAnalyzing}
                                className="flex-1 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl h-12"
                            >
                                {isAnalyzing ? (
                                    <><Loader2 className="w-4 h-4 mr-2 animate-spin" />Analyzing...</>
                                ) : (
                                    <><FileText className="w-4 h-4 mr-2" />Analyze Document</>
                                )}
                            </Button>
                        </div>
                    )}
                </GlassCard>

                {/* Results Section */}
                <div className="space-y-6">
                    {/* OCR Result */}
                    {ocrText && (
                        <GlassCard variant="default" className="p-6 border-white/5 bg-[#050A14]">
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-bold flex items-center gap-2">
                                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                                    Extracted Text
                                </h2>
                                <Button
                                    onClick={handleFraudCheck}
                                    disabled={isCheckingFraud}
                                    size="sm"
                                    className="bg-orange-600 hover:bg-orange-500 text-white font-bold rounded-lg"
                                >
                                    {isCheckingFraud ? (
                                        <><Loader2 className="w-4 h-4 mr-1 animate-spin" />Checking...</>
                                    ) : (
                                        <><ShieldAlert className="w-4 h-4 mr-1" />Check Fraud</>
                                    )}
                                </Button>
                            </div>
                            <div className="bg-black/50 rounded-xl p-4 max-h-64 overflow-y-auto">
                                <pre className="text-sm text-gray-300 whitespace-pre-wrap font-mono">
                                    {ocrText}
                                </pre>
                            </div>
                        </GlassCard>
                    )}

                    {/* Fraud Result */}
                    {fraudResult && (
                        <GlassCard
                            variant="default"
                            className={`p-6 border ${fraudResult.is_scam ? 'border-red-500/30 bg-red-500/5' : 'border-green-500/30 bg-green-500/5'}`}
                        >
                            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                                {fraudResult.is_scam ? (
                                    <>
                                        <ShieldAlert className="w-5 h-5 text-red-400" />
                                        <span className="text-red-400">Potential Scam Detected!</span>
                                    </>
                                ) : (
                                    <>
                                        <Shield className="w-5 h-5 text-green-400" />
                                        <span className="text-green-400">Document Appears Safe</span>
                                    </>
                                )}
                            </h2>
                            <p className="text-gray-300">{fraudResult.reason}</p>
                        </GlassCard>
                    )}

                    {/* Analysis Result */}
                    {analysisResult && (
                        <GlassCard variant="blue" className="p-6">
                            <h2 className="text-lg font-bold flex items-center gap-2 mb-4">
                                <FileText className="w-5 h-5 text-blue-300" />
                                Document Analysis
                            </h2>
                            <div className="space-y-4">
                                <div className="p-3 bg-black/30 rounded-xl">
                                    <p className="text-xs text-blue-200/60 uppercase tracking-wider font-bold mb-1">Document Type</p>
                                    <p className="text-white font-bold">{analysisResult.document_type}</p>
                                </div>
                                <div className="p-3 bg-black/30 rounded-xl">
                                    <p className="text-xs text-blue-200/60 uppercase tracking-wider font-bold mb-2">Extracted Data</p>
                                    <div className="grid grid-cols-2 gap-3">
                                        {Object.entries(analysisResult.extracted_data).map(([key, value]) => (
                                            <div key={key}>
                                                <p className="text-xs text-gray-500 capitalize">{key.replace(/_/g, ' ')}</p>
                                                <p className="text-white font-medium text-sm">{String(value)}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </GlassCard>
                    )}

                    {/* Empty State */}
                    {!ocrText && !analysisResult && !fraudResult && (
                        <GlassCard variant="default" className="p-8 border-white/5 bg-[#050A14] text-center">
                            <ScanLine className="w-12 h-12 mx-auto text-gray-600 mb-4" />
                            <p className="text-gray-500">Upload a document and scan or analyze it to see results here.</p>
                        </GlassCard>
                    )}
                </div>
            </div>
        </div>
    );
}
