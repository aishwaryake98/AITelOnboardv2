import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Plus, BarChart3, Settings, Filter, Download, MoreVertical, Users, TrendingUp, CreditCard } from "lucide-react";
import BulkUploadModal from "./bulk-upload-modal";
import AddEmployeeModal from "./add-employee-modal";
import { useToast } from "@/hooks/use-toast";

export default function EmployeeManagement() {
  const [showBulkUpload, setShowBulkUpload] = useState(false);
  const [showAddEmployee, setShowAddEmployee] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [filteredEmployees, setFilteredEmployees] = useState<any[]>([]);
  const { toast } = useToast();

  const quickActions = [
    {
      icon: Upload,
      title: "Bulk KYC Upload",
      description: "Upload employee documents in bulk",
      onClick: () => setShowBulkUpload(true)
    },
    {
      icon: Plus,
      title: "Add Employee",
      description: "Individual SIM activation",
      onClick: () => setShowAddEmployee(true)
    },
    {
      icon: BarChart3,
      title: "Usage Analytics",
      description: "View detailed usage reports",
      onClick: () => alert('Usage Analytics - Detailed data usage and performance analytics dashboard would open here')
    },
    {
      icon: Settings,
      title: "Billing Settings",
      description: "Manage plans and billing",
      onClick: () => alert('Billing Settings - Plan management and billing configuration would open here')
    }
  ];

  // Fetch employees from API
  const { data: employees = [], isLoading, error } = useQuery({
    queryKey: ["/api/enterprise/employees"],
    refetchInterval: 30000, // Refresh every 30 seconds
  });

  // Filter employees based on search and status
  useEffect(() => {
    let filtered = employees;
    
    if (searchTerm) {
      filtered = filtered.filter((emp: any) => 
        emp.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        emp.email?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    if (statusFilter !== "all") {
      filtered = filtered.filter((emp: any) => 
        emp.status?.toLowerCase() === statusFilter.toLowerCase()
      );
    }
    
    setFilteredEmployees(filtered);
  }, [employees, searchTerm, statusFilter]);

  const handleDownload = () => {
    try {
      // Create CSV content
      const csvHeaders = ['Name', 'Email', 'Phone', 'Department', 'Status', 'SIM Number', 'Plan', 'Usage'];
      const csvRows = filteredEmployees.map((emp: any) => [
        emp.name || '',
        emp.email || '',
        emp.phone || '',
        emp.department || '',
        emp.status || '',
        emp.simNumber || '',
        emp.plan || '',
        emp.usage || ''
      ]);
      
      const csvContent = [csvHeaders, ...csvRows]
        .map(row => row.map(field => `"${field}"`).join(','))
        .join('\n');
      
      // Create and download file
      const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
      const link = document.createElement('a');
      const url = URL.createObjectURL(blob);
      link.setAttribute('href', url);
      link.setAttribute('download', `employees_${new Date().toISOString().split('T')[0]}.csv`);
      link.style.visibility = 'hidden';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      
      toast({
        title: "Download Complete",
        description: "Employee data has been downloaded as CSV"
      });
    } catch (error) {
      toast({
        title: "Download Failed",
        description: "Failed to download employee data",
        variant: "destructive"
      });
    }
  };

  const recentActivities = [
    {
      icon: "✅",
      title: "SIM activated for Rahul Sharma",
      time: "2 hours ago",
      color: "bg-success/10"
    },
    {
      icon: "📤",
      title: "Bulk KYC upload completed",
      time: "1 day ago",
      color: "bg-warning/10"
    },
    {
      icon: "👥",
      title: "5 new employees added",
      time: "2 days ago",
      color: "bg-primary/10"
    }
  ];

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      {/* Main Content */}
      <div className="lg:col-span-2">
        {/* Quick Actions */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Quick Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-4">
              {quickActions.map((action, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-primary transition-colors cursor-pointer"
                  onClick={action.onClick}
                >
                  <action.icon className="w-6 h-6 text-primary" />
                  <div className="text-left">
                    <h4 className="font-medium">{action.title}</h4>
                    <p className="text-sm text-gray-500">{action.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Employee SIM Management */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="text-lg">Employee SIM Management</CardTitle>
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" onClick={() => setStatusFilter(statusFilter === "all" ? "active" : "all")}>
                  <Filter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm" onClick={handleDownload}>
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filters */}
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <Input 
                  placeholder="Search employees..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="All Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="suspended">Suspended</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Employee Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Employee</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">SIM Number</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Plan</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Status</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Usage</th>
                    <th className="text-left py-3 text-sm font-medium text-gray-500">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isLoading ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        Loading employees...
                      </td>
                    </tr>
                  ) : filteredEmployees.length === 0 ? (
                    <tr>
                      <td colSpan={6} className="py-8 text-center text-gray-500">
                        {searchTerm || statusFilter !== "all" ? "No employees match your filters" : "No employees found"}
                      </td>
                    </tr>
                  ) : (
                    filteredEmployees.map((employee: any, index: number) => (
                      <tr key={employee.id || index} className="border-b border-gray-100">
                        <td className="py-3">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">
                              {employee.name?.charAt(0) || 'E'}
                            </div>
                            <div>
                              <p className="font-medium">{employee.name}</p>
                              <p className="text-sm text-gray-500">{employee.email}</p>
                            </div>
                          </div>
                        </td>
                        <td className="py-3 text-sm">{employee.simNumber || 'Not assigned'}</td>
                        <td className="py-3 text-sm">{employee.plan || 'No plan'}</td>
                        <td className="py-3">
                          <Badge
                            variant={employee.status === "active" ? "default" : "secondary"}
                            className={
                              employee.status === "active" 
                                ? "bg-success/10 text-success" 
                                : "bg-warning/10 text-warning"
                            }
                          >
                            {employee.status || 'pending'}
                          </Badge>
                        </td>
                        <td className="py-3 text-sm">{employee.usage || '-'}</td>
                        <td className="py-3">
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Sidebar */}
      <div className="lg:col-span-1">
        {/* Recent Activities */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Recent Activities</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <div className={`w-8 h-8 ${activity.color} rounded-full flex items-center justify-center text-sm`}>
                    {activity.icon}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{activity.title}</p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Support */}
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">Enterprise Support</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">Get dedicated support for your enterprise needs.</p>
            <div className="space-y-2">
              <Button className="w-full" size="sm">
                Contact Support
              </Button>
              <Button variant="outline" className="w-full" size="sm">
                Documentation
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Modals */}
      {showBulkUpload && (
        <BulkUploadModal onClose={() => setShowBulkUpload(false)} />
      )}
      
      <AddEmployeeModal 
        isOpen={showAddEmployee} 
        onClose={() => setShowAddEmployee(false)} 
      />
    </div>
  );
}
