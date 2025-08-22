import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, X, CheckCircle, Loader2 } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { uploadService } from "@/services/upload-service";

interface BulkUploadModalProps {
  onClose: () => void;
}

export default function BulkUploadModal({ onClose }: BulkUploadModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const [uploadResults, setUploadResults] = useState<any>(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setCsvFile(file);
      toast({
        title: "File Selected",
        description: `${file.name} ready for upload`,
      });
    }
  };

  const bulkUploadMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('csvFile', file);
      formData.append('enterpriseId', 'techcorp-enterprise');
      return uploadService.uploadBulkCSV(formData);
    },
    onSuccess: (result) => {
      setUploadResults(result);
      setCurrentStep(2);
      toast({
        title: "Upload Successful",
        description: `Successfully processed ${result.employeeCount} employees`,
      });
      // Refresh employee list
      queryClient.invalidateQueries({ queryKey: ["/api/enterprise/employees"] });
    },
    onError: (error: any) => {
      toast({
        title: "Upload Failed",
        description: error.message,
        variant: "destructive"
      });
    },
  });

  const handleContinue = () => {
    if (csvFile && currentStep === 1) {
      bulkUploadMutation.mutate(csvFile);
    } else if (currentStep === 2) {
      setCurrentStep(3);
      // Simulate document processing
      setTimeout(() => {
        toast({
          title: "Processing Complete",
          description: "All employee documents have been processed"
        });
        onClose();
      }, 3000);
    }
  };

  const steps = [
    { step: 1, label: "Upload CSV", active: currentStep >= 1 },
    { step: 2, label: "Upload Documents", active: currentStep >= 2 },
    { step: 3, label: "AI Processing", active: currentStep >= 3 }
  ];

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl">Bulk KYC Upload</DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        {/* Upload Steps */}
        <div className="mb-6">
          <div className="flex items-center justify-between text-sm">
            {steps.map((step, index) => (
              <div key={step.step} className="flex items-center">
                <div className="flex items-center space-x-2">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs ${
                    step.active ? 'bg-primary text-white' : 'bg-gray-200 text-gray-500'
                  }`}>
                    {step.step}
                  </div>
                  <span className={step.active ? 'text-primary' : 'text-gray-500'}>
                    {step.label}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-1 h-1 bg-gray-200 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {currentStep === 1 && (
          <>
            {/* CSV Upload */}
            <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center mb-6">
              <FileText className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h4 className="text-lg font-medium mb-2">Upload Employee Data CSV</h4>
              <p className="text-gray-500 mb-4">Upload a CSV file with employee information</p>
              <Input
                type="file"
                id="csvUpload"
                className="hidden"
                accept=".csv"
                onChange={handleFileSelect}
              />
              <Button onClick={() => document.getElementById('csvUpload')?.click()}>
                Choose CSV File
              </Button>
              <p className="text-xs text-gray-500 mt-2">
                <a href="#" className="text-primary hover:underline">Download sample CSV template</a>
              </p>
            </div>

            {csvFile && (
              <Alert className="mb-6">
                <Upload className="w-4 h-4" />
                <AlertDescription>
                  File selected: {csvFile.name} ({(csvFile.size / 1024).toFixed(1)} KB)
                </AlertDescription>
              </Alert>
            )}
          </>
        )}

        {currentStep === 2 && uploadResults && (
          <div>
            <h4 className="font-medium mb-4">CSV Processing Complete</h4>
            <p className="text-sm text-gray-600 mb-4">
              Successfully processed {uploadResults.employeeCount} employees from the CSV.
            </p>
            
            <Alert className="mb-6 border-green-200 bg-green-50">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <AlertDescription>
                <h5 className="font-medium mb-2 text-green-800">Upload Summary:</h5>
                <div className="text-sm space-y-1 text-green-700">
                  <div>• {uploadResults.employeeCount} employees added to the system</div>
                  <div>• KYC status set to 'pending' for all employees</div>
                  <div>• Email notifications sent to employees</div>
                </div>
              </AlertDescription>
            </Alert>
            
            <Alert className="mb-6">
              <AlertDescription>
                <h5 className="font-medium mb-2">Next Steps:</h5>
                <ul className="text-sm space-y-1">
                  <li>• Employees will receive KYC completion instructions via email</li>
                  <li>• Documents will be processed automatically using AI</li>
                  <li>• SIM activation will begin once KYC is approved</li>
                  <li>• You can track progress in the Employee Management dashboard</li>
                </ul>
              </AlertDescription>
            </Alert>
          </div>
        )}
        
        {currentStep === 3 && (
          <div className="text-center py-8">
            <Loader2 className="w-12 h-12 animate-spin text-primary mx-auto mb-4" />
            <h4 className="font-medium mb-2">Processing Employee Documents</h4>
            <p className="text-sm text-gray-600">AI is analyzing and verifying uploaded documents...</p>
          </div>
        )}

        {/* Document Upload Instructions */}
        {currentStep === 1 && (
          <Alert className="mb-6">
            <AlertDescription>
              <h5 className="font-medium mb-2">Required Documents for Each Employee:</h5>
              <ul className="text-sm space-y-1">
                <li>• Aadhaar Card (front and back)</li>
                <li>• PAN Card</li>
                <li>• Passport size photograph</li>
                <li>• Address proof (if different from Aadhaar)</li>
              </ul>
            </AlertDescription>
          </Alert>
        )}

        <div className="flex space-x-4">
          <Button onClick={onClose} variant="outline" className="flex-1">
            Cancel
          </Button>
          <Button 
            onClick={handleContinue} 
            className="flex-1" 
            disabled={(!csvFile && currentStep === 1) || bulkUploadMutation.isPending}
          >
            {bulkUploadMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Processing...
              </>
            ) : currentStep === 1 ? 'Upload CSV' : currentStep === 2 ? 'Start Document Processing' : 'Complete'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
