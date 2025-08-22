import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { BarChart3, TrendingUp, Activity, Wifi, X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface UsageAnalyticsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function UsageAnalyticsModal({ isOpen, onClose }: UsageAnalyticsModalProps) {
  const [timeRange, setTimeRange] = useState("7d");

  // Mock data - in real app this would come from API
  const analytics = {
    totalEmployees: 45,
    activeConnections: 42,
    totalDataUsage: "1.2TB",
    averagePerUser: "27GB",
    topUsers: [
      { name: "Rahul Sharma", usage: "45GB", department: "IT" },
      { name: "Priya Singh", usage: "38GB", department: "Marketing" },
      { name: "John Smith", usage: "35GB", department: "Sales" }
    ],
    monthlyTrend: [
      { month: "Jan", usage: 850 },
      { month: "Feb", usage: 920 },
      { month: "Mar", usage: 1100 },
      { month: "Apr", usage: 1200 }
    ]
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl flex items-center space-x-2">
              <BarChart3 className="w-6 h-6 text-primary" />
              <span>Usage Analytics Dashboard</span>
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Time Range Filter */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Analytics Overview</h3>
            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-40">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 3 months</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Activity className="w-8 h-8 text-primary" />
                  <div>
                    <p className="text-2xl font-bold">{analytics.totalEmployees}</p>
                    <p className="text-sm text-gray-500">Total Employees</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <Wifi className="w-8 h-8 text-success" />
                  <div>
                    <p className="text-2xl font-bold">{analytics.activeConnections}</p>
                    <p className="text-sm text-gray-500">Active Connections</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <TrendingUp className="w-8 h-8 text-secondary" />
                  <div>
                    <p className="text-2xl font-bold">{analytics.totalDataUsage}</p>
                    <p className="text-sm text-gray-500">Total Data Usage</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-4">
                <div className="flex items-center space-x-3">
                  <BarChart3 className="w-8 h-8 text-warning" />
                  <div>
                    <p className="text-2xl font-bold">{analytics.averagePerUser}</p>
                    <p className="text-sm text-gray-500">Avg per User</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Usage Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Monthly Usage Trend</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-64 flex items-end space-x-4">
                {analytics.monthlyTrend.map((item, index) => (
                  <div key={index} className="flex-1 flex flex-col items-center">
                    <div 
                      className="w-full bg-primary rounded-t-lg"
                      style={{ height: `${(item.usage / 1200) * 200}px` }}
                    ></div>
                    <p className="text-sm mt-2">{item.month}</p>
                    <p className="text-xs text-gray-500">{item.usage}GB</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Users */}
          <Card>
            <CardHeader>
              <CardTitle>Top Data Users</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {analytics.topUsers.map((user, index) => (
                  <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center text-sm">
                        {user.name.charAt(0)}
                      </div>
                      <div>
                        <p className="font-medium">{user.name}</p>
                        <p className="text-sm text-gray-500">{user.department}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-primary">{user.usage}</p>
                      <p className="text-sm text-gray-500">this month</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Export Options */}
          <div className="flex space-x-4">
            <Button variant="outline" className="flex-1">
              Export PDF Report
            </Button>
            <Button variant="outline" className="flex-1">
              Export CSV Data
            </Button>
            <Button className="flex-1">
              Schedule Reports
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}