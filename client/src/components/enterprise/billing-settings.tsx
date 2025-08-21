import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download, CreditCard, DollarSign, Calendar, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface BillingSettingsProps {
  onBack: () => void;
}

export default function BillingSettings({ onBack }: BillingSettingsProps) {
  const { data: billing, isLoading } = useQuery({
    queryKey: ["/api/enterprise/billing"],
    queryFn: ({ queryKey }) => fetch(queryKey[0]).then(res => res.json()),
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
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {[1,2,3].map(i => (
              <div key={i} className="bg-gray-200 h-32 rounded-lg"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const billData = billing || {
    currentBill: 45750,
    previousBill: 42300,
    dueDate: "2025-09-15",
    status: "current",
    accountBalance: -1250,
    breakdown: [],
    paymentHistory: []
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
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
          <h2 className="text-2xl font-bold">Billing & Settings</h2>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Download Invoice
          </Button>
          <Button size="sm">
            Make Payment
          </Button>
        </div>
      </div>

      {/* Current Bill Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Bill</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(billData.currentBill)}</p>
                <p className="text-sm text-gray-500 mt-1">Due: {billData.dueDate}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Previous Bill</p>
                <p className="text-3xl font-bold text-gray-900">{formatCurrency(billData.previousBill)}</p>
                <p className="text-sm text-success mt-1">+{Math.round(((billData.currentBill - billData.previousBill) / billData.previousBill) * 100)}% increase</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Account Status</p>
                <div className="flex items-center space-x-2 mt-2">
                  <Badge variant="default" className="bg-success text-white">
                    {billData.status === 'current' ? 'Current' : billData.status}
                  </Badge>
                  {billData.accountBalance < 0 && (
                    <Badge variant="secondary">
                      Credit: {formatCurrency(Math.abs(billData.accountBalance))}
                    </Badge>
                  )}
                </div>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <CreditCard className="w-6 h-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bill Breakdown */}
      <Card>
        <CardHeader>
          <CardTitle>Current Bill Breakdown</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {billData.breakdown?.map((item: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium">{item.service}</p>
                  <p className="text-sm text-gray-500">{item.description}</p>
                  {item.count && <p className="text-xs text-gray-400">{item.count} units</p>}
                  {item.usage && <p className="text-xs text-gray-400">{item.usage} consumed</p>}
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold">{formatCurrency(item.amount)}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t pt-4 mt-4">
            <div className="flex items-center justify-between text-lg font-bold">
              <span>Total Amount</span>
              <span>{formatCurrency(billData.currentBill)}</span>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Payment History */}
      <Card>
        <CardHeader>
          <CardTitle>Payment History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {billData.paymentHistory?.map((payment: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-gray-600" />
                  </div>
                  <div>
                    <p className="font-medium">{payment.date}</p>
                    <p className="text-sm text-gray-500">{payment.method}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium">{formatCurrency(payment.amount)}</p>
                  <Badge variant="default" className="bg-success text-white text-xs">
                    {payment.status}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payment Settings */}
      <Card>
        <CardHeader>
          <CardTitle>Payment Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium">Auto-Pay</p>
                <p className="text-sm text-gray-500">Automatically pay bills on due date</p>
              </div>
              <Button variant="outline" size="sm">
                Enable
              </Button>
            </div>
            
            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium">Payment Method</p>
                <p className="text-sm text-gray-500">Bank Transfer (HDFC Bank ****1234)</p>
              </div>
              <Button variant="outline" size="sm">
                Change
              </Button>
            </div>

            <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div>
                <p className="font-medium">Billing Address</p>
                <p className="text-sm text-gray-500">TechCorp Pvt Ltd, Sector 12, Gurgaon</p>
              </div>
              <Button variant="outline" size="sm">
                Update
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}