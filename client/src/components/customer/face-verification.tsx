import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, CheckCircle, User } from "lucide-react";

interface FaceUploadProps {
  onComplete: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  data: any;
}

export default function FaceUpload({
  onComplete,
  onBack,
  canGoBack,
  data,
}: FaceUploadProps) {
  const [uploadedPhoto, setUploadedPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedPhoto(file);

      // Preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleContinue = () => {
    if (!uploadedPhoto) return;
    onComplete({
      selfie: uploadedPhoto,
      selfiePreview: photoPreview,
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Upload Your Photo</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-center mb-6">
          <div className="w-32 h-32 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center overflow-hidden">
            {photoPreview ? (
              <img
                src={photoPreview}
                alt="Preview"
                className="w-full h-full object-cover"
              />
            ) : (
              <User className="w-12 h-12 text-gray-400" />
            )}
          </div>
          <h4 className="text-lg font-medium mb-2">Upload a Clear Photo</h4>
          <p className="text-gray-500">
            This photo will be saved with your profile
          </p>
        </div>

        {/* Upload */}
        <div className="mb-6">
          <Label
            htmlFor="photo-upload"
            className="block text-sm font-medium mb-2"
          >
            Upload Your Photo
          </Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Input
              id="photo-upload"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
            />
            <label htmlFor="photo-upload" className="cursor-pointer block">
              <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
              <p className="text-sm text-gray-600 mb-1">
                Click to upload your photo
              </p>
              <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
            </label>
          </div>
        </div>

        {uploadedPhoto && (
          <Alert className="mb-6 border-green-200 bg-green-50">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <AlertDescription>
              <span className="font-medium text-green-800">
                Photo Uploaded Successfully
              </span>
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
            disabled={!uploadedPhoto}
          >
            Continue to Plan Selection
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
