import { Link } from "wouter";
import { ArrowLeft, Bell, User } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import FraudAlerts from "@/components/operator/fraud-alerts";
import PendingApprovals from "@/components/operator/pending-approvals";
import SystemHealth from "@/components/operator/system-health";

export default function OperatorDashboard() {
  const { data: stats } = useQuery({
    queryKey: ["/api/analytics/stats"],
  });

  const statCards = [
    {
      title: "Today's Activations",
      value: stats?.todayActivations || 0,
      icon: "📈",
      color: "text-success",
      change: "+15.2% from yesterday"
    },
    {
      title: "Pending Approvals", 
      value: stats?.pendingApprovals || 0,
      icon: "⏳",
      color: "text-warning",
      change: "Requires attention"
    },
    {
      title: "Fraud Alerts",
      value: stats?.fraudAlerts || 0,
      icon: "⚠️",
      color: "text-destructive",
      change: "Critical: 2 • High: 5"
    },
    {
      title: "AI Accuracy",
      value: `${stats?.aiAccuracy || 0}%`,
      icon: "🧠",
      color: "text-primary",
      change: "+0.3% this week"
    },
    {
      title: "Active Networks",
      value: `${stats?.activeNetworks || 0}%`,
      icon: "📡",
      color: "text-success",
      change: "All systems operational"
    }
  ];

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
              <h2 className="text-xl font-semibold">Operator Dashboard</h2>
              <span className="bg-success/10 text-success px-3 py-1 rounded-full text-sm">Live</span>
            </div>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <button className="text-gray-500 hover:text-primary">
                  <Bell className="w-5 h-5" />
                </button>
                <span className="absolute -top-1 -right-1 w-3 h-3 bg-destructive rounded-full"></span>
              </div>
              <div className="w-8 h-8 bg-success text-white rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Real-time Stats */}
          <div className="grid md:grid-cols-5 gap-6 mb-8">
            {statCards.map((stat, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">{stat.title}</p>
                    <p className="text-2xl font-bold">{stat.value}</p>
                  </div>
                  <span className="text-2xl">{stat.icon}</span>
                </div>
                <div className={`mt-2 text-sm ${stat.color}`}>
                  {stat.change}
                </div>
              </div>
            ))}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <FraudAlerts />
              <div className="mt-6">
                <PendingApprovals />
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <SystemHealth />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
