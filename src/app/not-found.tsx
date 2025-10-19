"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { FileQuestion, RefreshCw, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function NotFound() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100 p-4">
      <div className="w-full max-w-md space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="flex justify-center mb-4">
            <div className="bg-amber-100 p-4 rounded-full">
              <FileQuestion className="w-8 h-8 text-amber-600" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-slate-900">Page not found</h1>
          <p className="text-slate-600">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        </div>

        {/* Info Alert */}
        <Alert className="bg-amber-50 border-amber-200">
          <FileQuestion className="h-4 w-4 text-amber-600" />
          <AlertTitle className="text-amber-900">404 Not Found</AlertTitle>
          <AlertDescription className="mt-2 text-sm text-amber-700">
            The requested resource could not be found on this server.
          </AlertDescription>
        </Alert>

        {/* Action Buttons */}
        <div className="flex gap-3 flex-col sm:flex-row">
          <Button onClick={() => router.back()} variant="default" className="gap-2 flex-1" disabled={isLoading}>
            <RefreshCw className="w-4 h-4" />
            Go Back
          </Button>
          <Button
            onClick={() => {
              setIsLoading(true);
              router.push("/");
            }}
            variant="outline"
            className="gap-2 flex-1"
            disabled={isLoading}
          >
            <Home className="w-4 h-4" />
            Go Home
          </Button>
        </div>

        {/* Footer Info */}
        <div className="text-center text-xs text-slate-500 space-y-1">
          <p>Status Code: 404</p>
          <p>If you think this is a mistake, please contact support</p>
        </div>
      </div>
    </div>
  );
}
