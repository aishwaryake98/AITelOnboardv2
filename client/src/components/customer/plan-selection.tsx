import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, Brain, CreditCard, Smartphone, Wifi, Loader2, QrCode } from "lucide-react";
import { Plan } from "@shared/schema";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

interface PlanSelectionProps {
  onComplete: (data: any) => void;
  onBack: () => void;
  canGoBack: boolean;
  data: any;
}

export default function PlanSelection({ onComplete, onBack, canGoBack, data }: PlanSelectionProps) {
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [selectedSimType, setSelectedSimType] = useState<string>("");
  const [homeAddress, setHomeAddress] = useState<string>("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [esimData, setEsimData] = useState<any>(null);
  const { toast } = useToast();

  const { data: planData, isLoading } = useQuery({
    queryKey: ["/api/plans/recommended/temp-user-id"], // Replace with actual user ID
  });

  const activationMutation = useMutation({
    mutationFn: async (activationData: any) => {
      if (selectedSimType === 'esim') {
        const response = await apiRequest("POST", "/api/generate-esim", activationData);
        return response.json();
      } else {
        const response = await apiRequest("POST", "/api/sim-activation", activationData);
        return response.json();
      }
    },
    onSuccess: (result) => {
      if (selectedSimType === 'esim') {
        setEsimData(result);
      }
      setShowSuccess(true);
      toast({
        title: "Onboarding Complete!",
        description: selectedSimType === 'esim' 
          ? "Your eSIM QR code has been generated" 
          : "Your SIM has been successfully activated",
      });
    },
    onError: (error) => {
      toast({
        title: "Activation Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handlePlanSelect = (planId: string) => {
    setSelectedPlan(planId);
  };

  const handleSimTypeSelect = (simType: string) => {
    setSelectedSimType(simType);
  };

  const handleCompleteOnboarding = () => {
    if (!selectedPlan || !selectedSimType) {
      toast({
        title: "Missing Information",
        description: "Please select a plan and SIM type",
        variant: "destructive"
      });
      return;
    }

    if ((selectedSimType === 'physical' || selectedSimType === 'dongle') && !homeAddress.trim()) {
      toast({
        title: "Address Required",
        description: "Please provide your home address for delivery",
        variant: "destructive"
      });
      return;
    }

    const activationData = {
      userId: 'temp-user-id', // Replace with actual user ID
      planId: selectedPlan,
      homeAddress: homeAddress.trim() || undefined,
    };

    activationMutation.mutate(activationData);
  };

  const plans = Array.isArray(planData) ? planData : [];
  const recommendedPlan = plans.find((plan: any) => plan.isRecommended);

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <Loader2 className="w-8 h-8 animate-spin" />
        </CardContent>
      </Card>
    );
  }

  if (showSuccess) {
    return (
      <Card>
        <CardContent className="text-center py-8">
          <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Check className="w-8 h-8 text-success" />
          </div>
          <h3 className="text-2xl font-bold mb-4">Onboarding Complete!</h3>
          <p className="text-gray-500 mb-6">Your SIM has been successfully activated. You'll receive a confirmation SMS shortly.</p>
          
          {/* eSIM QR Code Display */}
          {esimData && selectedSimType === 'esim' && (
            <div className="mb-6">
              <div className="text-center mb-4">
                <div className="inline-block p-4 bg-white border-2 border-gray-200 rounded-lg">
                  <img 
                    src={esimData.qrCode} 
                    alt="eSIM QR Code" 
                    className="w-48 h-48 mx-auto"
                  />
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                <div className="flex items-center mb-2">
                  <QrCode className="w-4 h-4 text-blue-600 mr-2" />
                  <span className="font-medium text-blue-800">eSIM Activation Instructions</span>
                </div>
                <p className="text-sm text-blue-700 mb-2">
                  {esimData.instructions}
                </p>
                <div className="text-xs text-blue-600">
                  <strong>Activation Code:</strong> {esimData.activationCode}
                </div>
              </div>
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <div className="text-left space-y-2">
              {selectedSimType === 'esim' && esimData ? (
                <>
                  <div className="flex justify-between text-sm">
                    <span>Activation Code:</span>
                    <span className="font-medium font-mono">{esimData.activationCode}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Type:</span>
                    <span className="font-medium">eSIM</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex justify-between text-sm">
                    <span>SIM Number:</span>
                    <span className="font-medium">Will be assigned</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span>Type:</span>
                    <span className="font-medium capitalize">{selectedSimType}</span>
                  </div>
                </>
              )}
              <div className="flex justify-between text-sm">
                <span>Plan:</span>
                <span className="font-medium">{plans.find((p: any) => p.id === selectedPlan)?.name || 'Selected Plan'}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Status:</span>
                <span className="font-medium text-success">Active</span>
              </div>
            </div>
          </div>

          <div className="space-y-3">
            <Button className="w-full">Download Receipt</Button>
            <Button variant="outline" className="w-full" onClick={() => window.location.href = "/"}>
              Return to Home
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Select Your Plan</CardTitle>
      </CardHeader>
      <CardContent>
        {/* AI Recommendation Banner */}
        {recommendedPlan && (
          <Alert className="mb-6 border-primary bg-primary/5">
            <Brain className="w-4 h-4 text-primary" />
            <AlertDescription>
              <span className="font-medium">AI Recommendation</span>
              <br />
              Based on your usage pattern, we recommend the {recommendedPlan.name} Plan
            </AlertDescription>
          </Alert>
        )}

        {/* Plan Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-6">
          {plans.map((plan: any) => (
            <div
              key={plan.id}
              className={`border rounded-lg p-6 cursor-pointer transition-colors relative ${
                selectedPlan === plan.id
                  ? 'border-primary bg-primary/5'
                  : plan.isRecommended
                  ? 'border-primary border-2 bg-primary/5'
                  : 'border-gray-200 hover:border-primary'
              }`}
              onClick={() => handlePlanSelect(plan.id)}
            >
              {plan.isRecommended && (
                <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                  <Badge className="bg-primary text-white">AI Recommended</Badge>
                </div>
              )}
              <div className="text-center">
                <h4 className="text-lg font-semibold mb-2">{plan.name}</h4>
                <div className="text-2xl font-bold text-primary mb-4">
                  ₹{plan.price}<span className="text-sm font-normal text-gray-500">/month</span>
                </div>
                <ul className="text-sm space-y-2 text-left">
                  <li className="flex items-center">
                    <Check className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                    {plan.dataLimit}
                  </li>
                  {plan.features && Array.isArray(plan.features) && plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center">
                      <Check className="w-4 h-4 text-success mr-2 flex-shrink-0" />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>

        {/* SIM Type Selection */}
        <div className="mb-6">
          <h5 className="font-medium mb-3">Choose SIM Type</h5>
          <div className="grid md:grid-cols-3 gap-4">
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedSimType === 'physical' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary'
              }`}
              onClick={() => handleSimTypeSelect('physical')}
            >
              <div className="text-center">
                <CreditCard className="w-8 h-8 text-primary mx-auto mb-2" />
                <h6 className="font-medium">Physical SIM</h6>
                <p className="text-xs text-gray-500">Home delivery</p>
              </div>
            </div>
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedSimType === 'esim' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary'
              }`}
              onClick={() => handleSimTypeSelect('esim')}
            >
              <div className="text-center">
                <Smartphone className="w-8 h-8 text-primary mx-auto mb-2" />
                <h6 className="font-medium">eSIM</h6>
                <p className="text-xs text-gray-500">Instant activation</p>
              </div>
            </div>
            <div
              className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                selectedSimType === 'dongle' ? 'border-primary bg-primary/5' : 'border-gray-200 hover:border-primary'
              }`}
              onClick={() => handleSimTypeSelect('dongle')}
            >
              <div className="text-center">
                <Wifi className="w-8 h-8 text-primary mx-auto mb-2" />
                <h6 className="font-medium">Dongle</h6>
                <p className="text-xs text-gray-500">Data only</p>
              </div>
            </div>
          </div>
        </div>

        {/* Home Address for Physical SIM/Dongle */}
        {(selectedSimType === 'physical' || selectedSimType === 'dongle') && (
          <div className="mb-6">
            <Label htmlFor="home-address" className="block text-sm font-medium mb-2">
              Home Address *
            </Label>
            <Textarea
              id="home-address"
              placeholder="Enter your complete home address for delivery"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
              rows={3}
              className="w-full"
            />
            <p className="text-xs text-gray-500 mt-1">
              This address will be used for {selectedSimType} delivery
            </p>
          </div>
        )}

        <div className="flex space-x-4">
          {canGoBack && (
            <Button onClick={onBack} variant="outline" className="flex-1">
              Back
            </Button>
          )}
          <Button 
            onClick={handleCompleteOnboarding} 
            className="flex-1 bg-success hover:bg-success/90"
            disabled={!selectedPlan || !selectedSimType || ((selectedSimType === 'physical' || selectedSimType === 'dongle') && !homeAddress.trim()) || activationMutation.isPending}
          >
            {activationMutation.isPending ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                Activating...
              </>
            ) : (
              "Complete Onboarding"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
