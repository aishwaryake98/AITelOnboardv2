import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, Loader2, User } from "lucide-react";
import { uploadService } from "@/services/upload-service";
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
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const verificationMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      const response = await fetch('/api/face-verification', {
        method: 'POST',
        body: formData
      });
      if (!response.ok) {
        throw new Error('Face verification failed');
      }
      return response.json();
    },
    onSuccess: (result) => {
      setVerificationStatus(result.verificationStatus);
      setIsVerified(result.verificationStatus === "verified");
      toast({
        title: result.verificationStatus === "verified" ? "Verification Successful" : "Verification Failed",
        description: result.verificationStatus === "verified" 
          ? `Face match: ${(result.matchScore * 100).toFixed(1)}%`
          : "Please try again with a clearer photo",
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

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedPhoto(file);
      
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleStartVerification = () => {
    if (!uploadedPhoto) {
      toast({
        title: "No Photo Selected",
        description: "Please upload your photo first",
        variant: "destructive"
      });
      return;
    }

    const formData = new FormData();
    formData.append('photo', uploadedPhoto);
    formData.append('userId', 'temp-user-id'); // Replace with actual user ID
    formData.append('documentPhoto', data?.extractedData?.documentPhoto || 'extracted-from-document');
    
    verificationMutation.mutate(formData);
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
          <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
            {photoPreview ? (
              <img src={photoPreview} alt="Preview" className="w-full h-full object-cover" />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <h4 className="text-lg font-medium mb-2">Upload Your Photo</h4>
          <p className="text-gray-500">Upload a clear photo of your face for verification</p>
        </div>

        {/* Face Verification Instructions */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
          <h5 className="font-medium mb-2">Photo Guidelines:</h5>
          <ul className="text-sm space-y-1">
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success mr-2" />
              Face should be clearly visible and well-lit
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success mr-2" />
              Look directly at the camera
            </li>
            <li className="flex items-center">
              <CheckCircle className="w-4 h-4 text-success mr-2" />
              Remove sunglasses, hat, or face covering
            </li>
          </ul>
        </div>

        {/* Photo Upload Interface */}
        <div className="mb-6">
          <Label htmlFor="photo-upload" className="block text-sm font-medium mb-2">
            Upload Your Photo
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              disabled={verificationMutation.isPending}
            />
            <label htmlFor="photo-upload" className="cursor-pointer block">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">Click to upload your photo</p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </label>
          </div>
        </div>

        {uploadedPhoto && (
          <div className="mb-6">
            <Button
              onClick={handleStartVerification}
              disabled={verificationMutation.isPending}
              className="w-full"
            >
              {verificationMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying Face...
                </>
              ) : (
                "Verify Face"
              )}
            </Button>
          </div>
        )}

        {/* AI Verification Status */}
        {isVerified && (
          <Alert className="mb-6 border-success bg-success/5">
            <CheckCircle className="w-4 h-4 text-success" />
            <AlertDescription>
              <span className="font-medium text-success">Face Verification Successful</span>
              <br />
              <span className="text-sm text-gray-500">Face matches document photo</span>
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
