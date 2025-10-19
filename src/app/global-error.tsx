"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errorId] = useState(() => Math.random().toString(16).substr(2, 22).toUpperCase());

  useEffect(() => {
    setMounted(true);
    console.error("Global error caught:", error);
  }, [error]);

  if (!mounted) return null;

  const handleGoHome = () => {
    setIsLoading(true);
    router.push("/");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="bg-red-100 p-4 rounded-full">
              <AlertTriangle className="w-8 h-8 text-red-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Something went wrong</h1>
          <p className="text-slate-600">An unexpected error occurred. Our team has been notified.</p>
        </div>

        {/* Error Alert */}
        <Alert variant="destructive" className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4" />
          <AlertTitle>Error Details</AlertTitle>
          <AlertDescription className="mt-2 text-sm font-mono text-red-700 max-h-24 overflow-y-auto">
            {error?.message || "An unknown error occurred"}
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-col sm:flex-row">
          <Button onClick={() => reset()} variant="default" className="gap-2 flex-1" disabled={isLoading}>
            <RefreshCw className="w-4 h-4" />
            Try Again
          </Button>
          <Button onClick={handleGoHome} variant="outline" className="gap-2 flex-1" disabled={isLoading}>
            <Home className="w-4 h-4" />
            Go Home
          </Button>
        </div>

        {/* Footer Info */}
        <div className="text-center text-xs text-slate-500 space-y-1">
          <p>Error ID: {errorId}</p>
          {error?.digest && <p>Digest: {error.digest}</p>}
          <p>If this continues, please contact support</p>
        </div>
      </div>
    </div>
  );
}
