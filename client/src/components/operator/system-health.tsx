import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, XCircle } from "lucide-react";

interface SystemComponent {
  name: string;
  status: "healthy" | "degraded" | "offline";
  description: string;
}

interface ApiIntegration {
  name: string;
  status: "connected" | "limited" | "offline";
  description: string;
}

export default function SystemHealth() {
  const systemComponents: SystemComponent[] = [
    {
      name: "AI Processing",
      status: "healthy",
      description: "All AI services operational"
    },
    {
      name: "KYC Database", 
      status: "healthy",
      description: "Database responding normally"
    },
    {
      name: "Face Recognition",
      status: "degraded",
      description: "Experiencing intermittent delays"
    },
    {
      name: "Fraud Detection",
      status: "healthy",
      description: "Real-time monitoring active"
    }
  ];

  const apiIntegrations: ApiIntegration[] = [
    {
      name: "DigiLocker API",
      status: "connected", 
      description: "Government document verification"
    },
    {
      name: "UIDAI Verification",
      status: "connected",
      description: "Aadhaar validation service"
    },
    {
      name: "Face Recognition API", 
      status: "limited",
      description: "Rate limited - reduced capacity"
    },
    {
      name: "SIM Provisioning",
      status: "connected",
      description: "Telecom activation service"
    }
  ];

  const todaySummary = {
    processed: 1247,
    autoApproved: 1183,
    manualReview: 43,
    rejected: 21,
    successRate: 94.9
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "healthy":
      case "connected":
        return <CheckCircle className="w-4 h-4 text-success" />;
      case "degraded":
      case "limited":
        return <AlertCircle className="w-4 h-4 text-warning" />;
      case "offline":
        return <XCircle className="w-4 h-4 text-destructive" />;
      default:
        return <AlertCircle className="w-4 h-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "healthy":
      case "connected":
        return "text-success";
      case "degraded":
      case "limited":
        return "text-warning";
      case "offline":
        return "text-destructive";
      default:
        return "text-gray-500";
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case "healthy":
        return "Healthy";
      case "connected":
        return "Connected";
      case "degraded":
        return "Degraded";
      case "limited":
        return "Limited";
      case "offline":
        return "Offline";
      default:
        return "Unknown";
    }
  };

  return (
    <div className="space-y-6">
      {/* System Health */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">System Health</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {systemComponents.map((component) => (
              <div key={component.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(component.status)}
                  <div>
                    <span className="text-sm font-medium">{component.name}</span>
                    <p className="text-xs text-gray-500">{component.description}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(component.status)} border-current`}
                >
                  {getStatusText(component.status)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Quick Stats */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Today's Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span>Applications Processed</span>
              <span className="font-medium">{todaySummary.processed.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Auto-Approved</span>
              <span className="font-medium text-success">{todaySummary.autoApproved.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Manual Review</span>
              <span className="font-medium text-warning">{todaySummary.manualReview}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Rejected</span>
              <span className="font-medium text-destructive">{todaySummary.rejected}</span>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between text-sm font-medium">
              <span>Success Rate</span>
              <span className="text-success">{todaySummary.successRate}%</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* API Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">API Integrations</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {apiIntegrations.map((api) => (
              <div key={api.name} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  {getStatusIcon(api.status)}
                  <div>
                    <span className="text-sm font-medium">{api.name}</span>
                    <p className="text-xs text-gray-500">{api.description}</p>
                  </div>
                </div>
                <Badge
                  variant="outline"
                  className={`${getStatusColor(api.status)} border-current text-xs`}
                >
                  {getStatusText(api.status)}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
