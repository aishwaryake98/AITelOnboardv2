import { useState } from "react";
import { Link } from "wouter";
import { ArrowLeft, Shield } from "lucide-react";
import PersonalInfoForm from "@/components/customer/personal-info-form";
import DocumentUpload from "@/components/customer/document-upload";
import FaceVerification from "@/components/customer/face-verification";
import PlanSelection from "@/components/customer/plan-selection";
import ProgressBar from "@/components/ui/progress-bar";

export default function CustomerPortal() {
  const [currentStep, setCurrentStep] = useState(1);
  const [customerData, setCustomerData] = useState<any>({});

  const steps = [
    { step: 1, label: "Document Upload", component: DocumentUpload },
    { step: 2, label: "Personal Info", component: PersonalInfoForm },
    { step: 3, label: "Face Verification", component: FaceVerification },
    { step: 4, label: "Plan Selection", component: PlanSelection },
  ];

  const CurrentStepComponent = steps.find(s => s.step === currentStep)?.component;

  const handleStepComplete = (stepData: any) => {
    setCustomerData((prev: any) => ({ ...prev, ...stepData }));
    if (currentStep < 4) {
      setCurrentStep(currentStep + 1);
    }
  };

  const goToPreviousStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <button className="text-gray-500 hover:text-primary">
                  <ArrowLeft className="w-5 h-5" />
                </button>
              </Link>
              <h2 className="text-xl font-semibold">Customer Onboarding</h2>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <Shield className="w-4 h-4 text-success" />
                <span>Secure Process</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <ProgressBar
            steps={steps.map(s => ({ step: s.step, label: s.label }))}
            currentStep={currentStep}
          />
        </div>
      </div>

      {/* Main Content */}
      <div className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Form */}
            <div className="lg:col-span-2">
              {CurrentStepComponent && (
                <CurrentStepComponent
                  onComplete={handleStepComplete}
                  onBack={goToPreviousStep}
                  data={customerData}
                  canGoBack={currentStep > 1}
                />
              )}
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              {/* Security Information */}
              <div className="bg-white rounded-xl shadow-lg p-6 mb-6">
                <h4 className="font-semibold mb-4">Security & Privacy</h4>
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="text-sm">256-bit encryption</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="text-sm">TRAI compliant</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Shield className="w-4 h-4 text-success" />
                    <span className="text-sm">GDPR protected</span>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
