import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, IdCard, CreditCard, Link as LinkIcon, CheckCircle, Loader2 } from "lucide-react";
import { aiService } from "@/services/ai-service";
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
        description: "Information extracted and verified",
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
    onComplete({
      documentType: selectedDocType,
      extractedData,
      uploadedFile: uploadedFile?.name,
    });
  };

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Document Verification</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Document Type Selection */}
        <div className="mb-6">
          <Label className="block text-sm font-medium mb-3">Select Document Type</Label>
          <div className="grid md:grid-cols-2 gap-4">
            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                selectedDocType === 'aadhaar' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary'
              }`}
              onClick={() => setSelectedDocType('aadhaar')}
            >
              <div className="flex items-center space-x-3">
                <IdCard className="text-primary w-5 h-5" />
                <div>
                  <h4 className="font-medium">Aadhaar Card</h4>
                  <p className="text-sm text-gray-500">Government issued ID with photo</p>
                </div>
              </div>
            </div>
            <div
              className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${
                selectedDocType === 'pan' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary'
              }`}
              onClick={() => setSelectedDocType('pan')}
            >
              <div className="flex items-center space-x-3">
                <CreditCard className="text-primary w-5 h-5" />
                <div>
                  <h4 className="font-medium">PAN Card</h4>
                  <p className="text-sm text-gray-500">Permanent Account Number card</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Document Upload Area */}
        {selectedDocType && (
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
            <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h4 className="text-lg font-medium mb-2">Upload Document</h4>
            <p className="text-gray-500 mb-4">Drag and drop or click to select</p>
            <Input
              type="file"
              id="documentUpload"
              className="hidden"
              accept="image/*,.pdf"
              onChange={handleFileSelect}
              disabled={uploadMutation.isPending}
            />
            <Button
              onClick={() => document.getElementById('documentUpload')?.click()}
              disabled={uploadMutation.isPending}
              variant="outline"
            >
              {uploadMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Processing...
                </>
              ) : (
                "Choose File"
              )}
            </Button>
            <p className="text-xs text-gray-500 mt-2">Supported: JPG, PNG, PDF (max 10MB)</p>
          </div>
        )}

        {/* DigiLocker Option */}
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

        {/* AI Processing Status */}
        {uploadMutation.isPending && (
          <Alert className="mb-6">
            <Loader2 className="w-4 h-4 animate-spin" />
            <AlertDescription>
              AI Processing Document... Extracting information and verifying authenticity
            </AlertDescription>
          </Alert>
        )}

        {/* Auto-filled Form (after OCR) */}
        {extractedData && (
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <CheckCircle className="w-5 h-5 text-success" />
              <h4 className="font-medium text-success">Document Verified - Please confirm extracted information</h4>
            </div>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div>
                <Label className="block text-sm font-medium mb-2">Name (from document)</Label>
                <Input value={extractedData.name || ""} className="bg-gray-50" readOnly />
              </div>
              <div>
                <Label className="block text-sm font-medium mb-2">Document Number</Label>
                <Input value={extractedData.documentNumber || ""} className="bg-gray-50" readOnly />
              </div>
            </div>
          </div>
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
            disabled={!extractedData}
          >
            Continue to Face Verification
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
