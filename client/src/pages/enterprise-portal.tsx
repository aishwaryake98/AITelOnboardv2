import { Link } from "wouter";
import { ArrowLeft, Bell, User } from "lucide-react";
import StatsOverview from "@/components/enterprise/stats-overview";
import EmployeeManagement from "@/components/enterprise/employee-management";

export default function EnterprisePortal() {
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
              <h2 className="text-xl font-semibold">Enterprise Portal</h2>
              <span className="bg-secondary/10 text-secondary px-3 py-1 rounded-full text-sm">
                TechCorp Pvt Ltd
              </span>
            </div>
            <div className="flex items-center space-x-4">
              <button className="text-gray-500 hover:text-primary">
                <Bell className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-secondary text-white rounded-full flex items-center justify-center">
                <User className="w-4 h-4" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Stats Overview */}
          <StatsOverview />

          {/* Employee Management */}
          <div className="mt-8">
            <EmployeeManagement />
          </div>
        </div>
      </div>
    </div>
  );
}
