import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, IdCard, CreditCard, Link as LinkIcon, CheckCircle, Loader2 } from "lucide-react";
import { uploadService } from "@/services/upload-service";
import { useToast } from "@/hooks/use-toast";

interface DocumentUploadProps {
  onComplete: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  data: any;
}

export default function DocumentUpload({ onComplete, onBack, canGoBack, data }: DocumentUploadProps) {
  const [selectedDocType, setSelectedDocType] = useState<string>("");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [extractedData, setExtractedData] = useState<any>(null);
  const { toast } = useToast();

  const uploadMutation = useMutation({
    mutationFn: async (formData: FormData) => {
      return uploadService.uploadDocument(formData);
    },
    onSuccess: (result) => {
      setExtractedData(result.extractedData);
      toast({
        title: "Document Processed Successfully", 
        description: `${result.extractedData.documentType} verified with ${Math.round(result.extractedData.confidence * 100)}% confidence`,
      });
    },
    onError: (error) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && selectedDocType) {
      setUploadedFile(file);
      
      const formData = new FormData();
      formData.append('document', file);
      formData.append('userId', 'temp-user-id'); // Replace with actual user ID
      formData.append('documentType', selectedDocType);
      
      uploadMutation.mutate(formData);
    }
  };

  const handleContinue = () => {
    // Auto-populate personal info form with extracted data
    onComplete({
      documentType: selectedDocType,
      extractedData,
      uploadedFile: uploadedFile?.name,
      // Pass extracted data to be used in personal info form
      autoFillData: {
        fullName: extractedData?.fullName || "",
        dateOfBirth: extractedData?.dateOfBirth || "",
        address: extractedData?.address || "",
        city: extractedData?.city || "",
        state: extractedData?.state || "",
        pincode: extractedData?.pincode || "",
        mobile: extractedData?.mobile || "",
        email: extractedData?.email || "",
      }
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Document Verification</CardTitle>
        <p className="text-gray-600">Upload your identity document for AI-powered verification</p>
      </CardHeader>
      <CardContent>
        {/* Document Type Selection */}
        <div className="mb-6">
          <h5 className="font-medium mb-3">Select Document Type</h5>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { type: 'aadhaar', label: 'Aadhaar Card', icon: IdCard },
              { type: 'pan', label: 'PAN Card', icon: CreditCard },
              { type: 'passport', label: 'Passport', icon: LinkIcon },
              { type: 'driving_license', label: 'Driving License', icon: IdCard },
            ].map(({ type, label, icon: Icon }) => (
              <div
                key={type}
                className={`border rounded-lg p-4 cursor-pointer transition-colors text-center ${
                  selectedDocType === type
                    ? 'border-primary bg-primary/5'
                    : 'border-gray-200 hover:border-primary'
                }`}
                onClick={() => setSelectedDocType(type)}
              >
                <Icon className="w-6 h-6 text-primary mx-auto mb-2" />
                <p className="text-sm font-medium">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* File Upload */}
        {selectedDocType && (
          <div className="mb-6">
            <Label htmlFor="document-upload" className="block text-sm font-medium mb-2">
              Upload {selectedDocType.replace('_', ' ').toUpperCase()} Document
            </Label>
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
              <Input
                id="document-upload"
                type="file"
                accept="image/*,.pdf"
                onChange={handleFileSelect}
                className="hidden"
                disabled={uploadMutation.isPending}
              />
              <label htmlFor="document-upload" className="cursor-pointer block">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600 mb-1">Click to upload or drag and drop</p>
                <p className="text-xs text-gray-500">PNG, JPG, PDF up to 10MB</p>
              </label>
            </div>
          </div>
        )}

        {/* Upload Status */}
        {uploadMutation.isPending && (
          <div className="mb-6">
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg">
              <Loader2 className="w-5 h-5 animate-spin text-primary" />
              <div>
                <p className="font-medium text-primary">Processing Document...</p>
                <p className="text-sm text-blue-600">AI is extracting and verifying information</p>
              </div>
            </div>
          </div>
        )}

        {/* Extracted Data Display */}
        {extractedData && (
          <div className="mb-6">
            <Alert className="border-green-200 bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription>
                <div className="space-y-2">
                  <p className="font-medium text-green-800">Document Verified Successfully</p>
                  <div className="grid md:grid-cols-2 gap-4 mt-3">
                    {extractedData.fullName && (
                      <div className="text-sm">
                        <span className="font-medium">Name:</span> {extractedData.fullName}
                      </div>
                    )}
                    {extractedData.dateOfBirth && (
                      <div className="text-sm">
                        <span className="font-medium">DOB:</span> {extractedData.dateOfBirth}
                      </div>
                    )}
                    {extractedData.address && (
                      <div className="text-sm col-span-2">
                        <span className="font-medium">Address:</span> {extractedData.address}
                      </div>
                    )}
                    <div className="text-sm">
                      <span className="font-medium">Confidence:</span> {Math.round(extractedData.confidence * 100)}%
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-green-100 rounded-lg">
                    <p className="text-xs text-green-700">
                      ✅ This information will auto-fill your personal details in the next step
                    </p>
                  </div>
                </div>
              </AlertDescription>
            </Alert>
          </div>
        )}

        {/* DigiLocker Alternative */}
        {!selectedDocType && (
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <LinkIcon className="text-primary w-5 h-5" />
                <div>
                  <h4 className="font-medium">Connect DigiLocker</h4>
                  <p className="text-sm text-gray-500">Instantly verify documents from DigiLocker</p>
                </div>
              </div>
              <Button variant="outline" size="sm">
                Connect
              </Button>
            </div>
          </div>
        )}

        {/* Continue Button */}
        {extractedData && (
          <div className="flex justify-between pt-6">
            <Button variant="outline" onClick={onBack} disabled={!canGoBack}>
              Back
            </Button>
            <Button onClick={handleContinue}>
              Continue to Personal Info
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}