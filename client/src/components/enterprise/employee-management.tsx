import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Upload, Plus, BarChart3, Settings, Filter, Download, MoreVertical } from "lucide-react";
import BulkUploadModal from "./bulk-upload-modal";

export default function EmployeeManagement() {
  const [showBulkUpload, setShowBulkUpload] = useState(false);

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
      description: "Individual SIM activation"
    },
    {
      icon: BarChart3,
      title: "Usage Analytics",
      description: "View detailed usage reports"
    },
    {
      icon: Settings,
      title: "Billing Settings",
      description: "Manage plans and billing"
    }
  ];

  const employees = [
    {
      name: "Rahul Sharma",
      email: "rahul@techcorp.com",
      simNumber: "9876543210",
      plan: "Premium",
      status: "Active",
      usage: "4.2GB",
      avatar: "R"
    },
    {
      name: "Priya Singh",
      email: "priya@techcorp.com", 
      simNumber: "9876543211",
      plan: "Basic",
      status: "Pending",
      usage: "-",
      avatar: "P"
    }
  ];

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
                <Button variant="ghost" size="sm">
                  <Filter className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Download className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            {/* Search and Filters */}
            <div className="flex space-x-4 mb-4">
              <div className="flex-1">
                <Input placeholder="Search employees..." />
              </div>
              <Select>
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
                  {employees.map((employee, index) => (
                    <tr key={index} className="border-b border-gray-100">
                      <td className="py-3">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">
                            {employee.avatar}
                          </div>
                          <div>
                            <p className="font-medium">{employee.name}</p>
                            <p className="text-sm text-gray-500">{employee.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-3 text-sm">{employee.simNumber}</td>
                      <td className="py-3 text-sm">{employee.plan}</td>
                      <td className="py-3">
                        <Badge
                          variant={employee.status === "Active" ? "default" : "secondary"}
                          className={
                            employee.status === "Active" 
                              ? "bg-success/10 text-success" 
                              : "bg-warning/10 text-warning"
                          }
                        >
                          {employee.status}
                        </Badge>
                      </td>
                      <td className="py-3 text-sm">{employee.usage}</td>
                      <td className="py-3">
                        <Button variant="ghost" size="sm">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </td>
                    </tr>
                  ))}
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

      {/* Bulk Upload Modal */}
      {showBulkUpload && (
        <BulkUploadModal onClose={() => setShowBulkUpload(false)} />
      )}
    </div>
  );
}
