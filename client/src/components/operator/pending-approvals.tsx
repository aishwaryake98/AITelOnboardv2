import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RefreshCw, Eye, CheckCircle, XCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface PendingApproval {
  id: string;
  applicationId: string;
  customerName: string;
  contactInfo: string;
  type: "Individual" | "Enterprise";
  aiScore: number;
  submittedAt: string;
  employeeCount?: number;
}

export default function PendingApprovals() {
  const { toast } = useToast();
  const [filterType, setFilterType] = useState("all");

  // Mock data - in real app this would come from API
  const pendingApprovals: PendingApproval[] = [
    {
      id: "1",
      applicationId: "KYC-2024-001234",
      customerName: "Anil Kumar",
      contactInfo: "+91-9876543210",
      type: "Individual",
      aiScore: 92,
      submittedAt: "2 hours ago"
    },
    {
      id: "2", 
      applicationId: "KYC-2024-001235",
      customerName: "TechCorp Pvt Ltd",
      contactInfo: "Bulk: 25 employees",
      type: "Enterprise",
      aiScore: 96,
      submittedAt: "4 hours ago",
      employeeCount: 25
    },
    {
      id: "3",
      applicationId: "KYC-2024-001236", 
      customerName: "Priya Sharma",
      contactInfo: "+91-9876543211",
      type: "Individual",
      aiScore: 88,
      submittedAt: "6 hours ago"
    }
  ];

  const filteredApprovals = pendingApprovals.filter(approval => 
    filterType === "all" || approval.type.toLowerCase() === filterType
  );

  const handleApprove = (applicationId: string, customerName: string) => {
    toast({
      title: "Application Approved",
      description: `${customerName}'s application has been approved for activation`,
    });
  };

  const handleReject = (applicationId: string, customerName: string) => {
    toast({
      title: "Application Rejected", 
      description: `${customerName}'s application has been rejected`,
      variant: "destructive",
    });
  };

  const handleViewDetails = (applicationId: string) => {
    toast({
      title: "Application Details",
      description: `Viewing details for ${applicationId}`,
    });
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return "text-success";
    if (score >= 85) return "text-warning";
    return "text-destructive";
  };

  const getProgressColor = (score: number) => {
    if (score >= 95) return "bg-success";
    if (score >= 85) return "bg-warning";
    return "bg-destructive";
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg">Pending Activation Approvals</CardTitle>
          <div className="flex space-x-2">
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger className="w-32">
                <SelectValue placeholder="All Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="individual">Individual</SelectItem>
                <SelectItem value="enterprise">Enterprise</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="ghost" size="sm">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {filteredApprovals.length === 0 ? (
          <div className="text-center py-8">
            <CheckCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Pending Approvals</h3>
            <p className="text-gray-500">All applications have been processed.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Application ID</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Customer</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Type</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">AI Score</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Submitted</th>
                  <th className="text-left py-3 text-sm font-medium text-gray-500">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredApprovals.map((approval) => (
                  <tr key={approval.id} className="border-b border-gray-100">
                    <td className="py-3 text-sm font-mono">{approval.applicationId}</td>
                    <td className="py-3">
                      <div>
                        <p className="font-medium text-sm">{approval.customerName}</p>
                        <p className="text-xs text-gray-500">{approval.contactInfo}</p>
                      </div>
                    </td>
                    <td className="py-3">
                      <Badge
                        variant="outline"
                        className={
                          approval.type === "Individual"
                            ? "border-primary text-primary"
                            : "border-secondary text-secondary"
                        }
                      >
                        {approval.type}
                      </Badge>
                    </td>
                    <td className="py-3">
                      <div className="flex items-center space-x-2">
                        <div className="w-12 h-2 bg-gray-200 rounded-full">
                          <div 
                            className={`h-2 rounded-full ${getProgressColor(approval.aiScore)}`}
                            style={{ width: `${approval.aiScore}%` }}
                          ></div>
                        </div>
                        <span className={`text-sm ${getScoreColor(approval.aiScore)}`}>
                          {approval.aiScore}%
                        </span>
                      </div>
                    </td>
                    <td className="py-3 text-sm text-gray-500">{approval.submittedAt}</td>
                    <td className="py-3">
                      <div className="flex space-x-2">
                        <Button
                          size="sm"
                          onClick={() => handleApprove(approval.applicationId, approval.customerName)}
                          className="bg-success hover:bg-success/90"
                        >
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Approve
                        </Button>
                        <Button
                          size="sm"
                          variant="destructive"
                          onClick={() => handleReject(approval.applicationId, approval.customerName)}
                        >
                          <XCircle className="w-3 h-3 mr-1" />
                          Reject
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => handleViewDetails(approval.applicationId)}
                        >
                          <Eye className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
