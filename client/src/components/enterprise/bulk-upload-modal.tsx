import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Upload, FileText, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BulkUploadModalProps {
  onClose: () => void;
}

export default function BulkUploadModal({ onClose }: BulkUploadModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { toast } = useToast();

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

  const handleContinue = () => {
    if (csvFile) {
      // Simulate upload process
      toast({
        title: "Upload Started",
        description: "Processing CSV file...",
      });
      setCurrentStep(2);
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

        {currentStep === 2 && (
          <div>
            <h4 className="font-medium mb-4">CSV Processing Complete</h4>
            <p className="text-sm text-gray-600 mb-4">
              Found 25 employees in the CSV. Now upload the required documents for each employee.
            </p>
            
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
          <Button onClick={handleContinue} className="flex-1" disabled={!csvFile && currentStep === 1}>
            {currentStep === 1 ? 'Continue' : 'Process Documents'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
