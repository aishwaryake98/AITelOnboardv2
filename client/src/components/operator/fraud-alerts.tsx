import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Filter } from "lucide-react";
import { FraudAlert } from "@shared/schema";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

export default function FraudAlerts() {
  const queryClient = useQueryClient();
  const { toast } = useToast();

  const { data: alerts = [], isLoading } = useQuery({
    queryKey: ["/api/fraud-alerts"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  const updateAlertMutation = useMutation({
    mutationFn: async ({ id, updates }: { id: string; updates: Partial<FraudAlert> }) => {
      const response = await apiRequest("PATCH", `/api/fraud-alerts/${id}`, updates);
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/fraud-alerts"] });
      toast({
        title: "Alert Updated",
        description: "Fraud alert status has been updated",
      });
    },
    onError: (error) => {
      toast({
        title: "Update Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });

  const handleReviewAlert = (alertId: string) => {
    updateAlertMutation.mutate({
      id: alertId,
      updates: { status: "reviewed" }
    });
  };

  const handleDismissAlert = (alertId: string) => {
    updateAlertMutation.mutate({
      id: alertId,
      updates: { status: "dismissed" }
    });
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "border-destructive bg-destructive/5";
      case "high":
        return "border-warning bg-warning/5";
      case "medium":
        return "border-secondary bg-secondary/5";
      default:
        return "border-gray-200 bg-gray-50";
    }
  };

  const getSeverityBadgeColor = (severity: string) => {
    switch (severity) {
      case "critical":
        return "bg-destructive text-white";
      case "high":
        return "bg-warning text-white";
      case "medium":
        return "bg-secondary text-white";
      default:
        return "bg-gray-500 text-white";
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
        </CardContent>
      </Card>
    );
  }

  const activeAlerts = (alerts as FraudAlert[])?.filter((alert: FraudAlert) => alert.status === "active") || [];

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">AI Fraud Detection Alerts</CardTitle>
          <div className="flex space-x-2">
            <Badge variant="destructive">{activeAlerts.length} Active</Badge>
            <Button variant="ghost" size="sm">
              <Filter className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {activeAlerts.length === 0 ? (
          <div className="text-center py-8">
            <AlertTriangle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Active Fraud Alerts</h3>
            <p className="text-gray-500">All systems are secure and functioning normally.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {activeAlerts.map((alert: FraudAlert) => (
              <div
                key={alert.id}
                className={`border-l-4 p-4 rounded-r-lg ${getSeverityColor(alert.severity)}`}
              >
                <div className="flex items-start justify-between">
                  <div>
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge className={getSeverityBadgeColor(alert.severity)}>
                        {alert.severity.toUpperCase()}
                      </Badge>
                      <span className="text-sm text-gray-500">
                        {alert.createdAt ? new Date(alert.createdAt).toLocaleString() : 'Just now'}
                      </span>
                    </div>
                    <h4 className="font-medium mb-1">{alert.alertType.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}</h4>
                    <p className="text-sm text-gray-600 mb-2">{alert.description}</p>
                    <div className="flex items-center space-x-4 text-sm">
                      {alert.confidence && (
                        <span>Confidence: {(alert.confidence * 100).toFixed(1)}%</span>
                      )}
                      {alert.userId && (
                        <span>User ID: {alert.userId.slice(0, 8)}...</span>
                      )}
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button
                      size="sm"
                      onClick={() => handleReviewAlert(alert.id)}
                      disabled={updateAlertMutation.isPending}
                      className={
                        alert.severity === "critical" 
                          ? "bg-destructive hover:bg-destructive/90" 
                          : alert.severity === "high"
                          ? "bg-warning hover:bg-warning/90"
                          : "bg-secondary hover:bg-secondary/90"
                      }
                    >
                      Review
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleDismissAlert(alert.id)}
                      disabled={updateAlertMutation.isPending}
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
