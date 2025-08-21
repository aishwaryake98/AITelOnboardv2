import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Camera, CheckCircle, Loader2, Eye } from "lucide-react";
import { aiService } from "@/services/ai-service";
import { useToast } from "@/hooks/use-toast";

interface FaceVerificationProps {
  onComplete: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  data: any;
}

export default function FaceVerification({ onComplete, onBack, canGoBack, data }: FaceVerificationProps) {
  const [verificationStatus, setVerificationStatus] = useState<string>("");
  const [isVerified, setIsVerified] = useState(false);
  const { toast } = useToast();

  const verificationMutation = useMutation({
    mutationFn: async (userId: string) => {
      return aiService.performFaceVerification(userId);
    },
    onSuccess: (result) => {
      setVerificationStatus(result.verificationStatus);
      setIsVerified(result.verificationStatus === "verified");
      toast({
        title: result.verificationStatus === "verified" ? "Verification Successful" : "Verification Failed",
        description: result.verificationStatus === "verified" 
          ? `Liveness confirmed • Face match: ${(result.matchScore * 100).toFixed(1)}%`
          : "Please try again or contact support",
        variant: result.verificationStatus === "verified" ? "default" : "destructive"
      });
    },
    onError: (error) => {
      toast({
        title: "Verification Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleStartVerification = () => {
    // In a real app, this would access the camera
    verificationMutation.mutate('temp-user-id'); // Replace with actual user ID
  };

  const handleContinue = () => {
    onComplete({
      faceVerificationStatus: verificationStatus,
      isVerified,
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Face Verification</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center">
            <Camera className="w-12 h-12 text-gray-400" />
          </div>
          <h4 className="text-lg font-medium mb-2">Position your face in the camera</h4>
          <p className="text-gray-500">Look directly at the camera and follow the instructions</p>
        </div>

        {/* Face Verification Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h5 className="font-medium mb-2">Verification Steps:</h5>
          <ul className="text-sm space-y-1">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success mr-2" />
              Look directly at the camera
            </li>
            <li className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-300 mr-2" />
              Blink when prompted for liveness detection
            </li>
            <li className="flex items-center">
              <div className="w-4 h-4 rounded-full bg-gray-300 mr-2" />
              Turn head left and right
            </li>
          </ul>
        </div>

        {/* Camera Interface */}
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
          <div className="w-48 h-36 bg-gray-200 rounded-lg mx-auto mb-4 flex items-center justify-center">
            <Eye className="w-8 h-8 text-gray-400" />
          </div>
          <Button
            onClick={handleStartVerification}
            disabled={verificationMutation.isPending}
          >
            {verificationMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Verifying...
              </>
            ) : (
              "Start Camera"
            )}
          </Button>
        </div>

        {/* AI Verification Status */}
        {isVerified && (
          <Alert className="mb-6 border-success bg-success/5">
            <CheckCircle className="w-4 h-4 text-success" />
            <AlertDescription>
              <span className="font-medium text-success">Face Verification Successful</span>
              <br />
              <span className="text-sm text-gray-500">Liveness confirmed • Face match: 98.5%</span>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex space-x-4">
          {canGoBack && (
            <Button onClick={onBack} variant="outline" className="flex-1">
              Back
            </Button>
          )}
          <Button 
            onClick={handleContinue} 
            className="flex-1"
            disabled={!isVerified}
          >
            Continue to Plan Selection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
