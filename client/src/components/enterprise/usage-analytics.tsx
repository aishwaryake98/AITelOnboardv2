import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Download, TrendingUp, Users, Activity, BarChart3 } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface UsageAnalyticsProps {
  onBack: () => void;
}

export default function UsageAnalytics({ onBack }: UsageAnalyticsProps) {
  const [timeRange, setTimeRange] = useState("30d");

  const { data: analytics, isLoading } = useQuery({
    queryKey: ["/api/enterprise/analytics", timeRange],
    queryFn: ({ queryKey }) => fetch(queryKey.join("?period=")).then(res => res.json()),
  });

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Overview
          </Button>
        </div>
        <div className="animate-pulse">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            {[1,2,3,4].map(i => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const stats = analytics || {
    totalEmployees: 150,
    activeConnections: 142,
    pendingActivations: 8,
    dataUsage: { total: "2.4 TB", thisMonth: "0.8 TB", trend: "+12%" },
    monthlyGrowth: "+15%"
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button variant="ghost" onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Overview
          </Button>
          <h2 className="text-2xl font-bold">Usage Analytics</h2>
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export Report
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Employees</p>
                <p className="text-2xl font-bold text-gray-900">{stats.totalEmployees}</p>
                <p className="text-xs text-success mt-1">{stats.monthlyGrowth} from last month</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Users className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Active Connections</p>
                <p className="text-2xl font-bold text-gray-900">{stats.activeConnections}</p>
                <p className="text-xs text-success mt-1">94.7% uptime</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Activity className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pending Activations</p>
                <p className="text-2xl font-bold text-gray-900">{stats.pendingActivations}</p>
                <p className="text-xs text-warning mt-1">Processing today</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Data Usage</p>
                <p className="text-2xl font-bold text-gray-900">{stats.dataUsage.total}</p>
                <p className="text-xs text-success mt-1">{stats.dataUsage.trend} this month</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                <BarChart3 className="w-6 h-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Details */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Plan Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.topPlans?.map((plan: any, index: number) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`w-4 h-4 rounded-full ${
                      index === 0 ? 'bg-blue-500' : index === 1 ? 'bg-green-500' : 'bg-yellow-500'
                    }`}></div>
                    <span className="text-sm font-medium">{plan.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium">{plan.users} users</div>
                    <div className="text-xs text-gray-500">{plan.percentage}%</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {analytics?.recentActivity?.map((activity: any, index: number) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-sm font-medium">{activity.action}</p>
                    <p className="text-xs text-gray-500">{activity.user}</p>
                  </div>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Trends */}
      <Card>
        <CardHeader>
          <CardTitle>Usage Trends</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-center justify-center bg-gray-50 rounded-lg">
            <div className="text-center">
              <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-500">Interactive usage chart would be displayed here</p>
              <p className="text-sm text-gray-400">Showing data usage, activation trends, and performance metrics</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}