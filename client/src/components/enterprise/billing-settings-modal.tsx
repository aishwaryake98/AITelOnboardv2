import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { CreditCard, Settings, X, Check, AlertTriangle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface BillingSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function BillingSettingsModal({ isOpen, onClose }: BillingSettingsModalProps) {
  const [billingData, setBillingData] = useState({
    companyName: "TechCorp Solutions",
    billingEmail: "billing@techcorp.com",
    paymentMethod: "card",
    autoRenewal: true,
    invoiceFrequency: "monthly",
    billingAddress: {
      street: "123 Business Center",
      city: "Mumbai",
      state: "Maharashtra",
      pincode: "400001",
      gst: "27AABCU9603R1ZM"
    }
  });

  const { toast } = useToast();

  const currentPlan = {
    name: "Enterprise Pro",
    price: 799,
    employees: 45,
    features: ["Unlimited Data", "Priority Support", "Advanced Analytics"]
  };

  const invoices = [
    { id: "INV-2024-001", date: "2024-01-01", amount: 35955, status: "paid" },
    { id: "INV-2024-002", date: "2024-02-01", amount: 35955, status: "paid" },
    { id: "INV-2024-003", date: "2024-03-01", amount: 35955, status: "pending" }
  ];

  const handleSave = () => {
    toast({
      title: "Settings Saved",
      description: "Billing settings have been updated successfully"
    });
  };

  const handleUpdatePayment = () => {
    toast({
      title: "Payment Method Updated",
      description: "Your payment information has been securely updated"
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-center justify-between">
            <DialogTitle className="text-2xl flex items-center space-x-2">
              <Settings className="w-6 h-6 text-primary" />
              <span>Billing & Subscription Management</span>
            </DialogTitle>
            <Button variant="ghost" size="sm" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>
        </DialogHeader>

        <div className="space-y-6">
          {/* Current Plan */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                Current Subscription
                <Badge variant="default" className="bg-success/10 text-success">Active</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-semibold mb-2">{currentPlan.name}</h4>
                  <p className="text-3xl font-bold text-primary">₹{currentPlan.price}<span className="text-lg text-gray-500">/employee/month</span></p>
                  <p className="text-sm text-gray-600 mt-2">For {currentPlan.employees} employees</p>
                  <p className="text-xl font-bold mt-2">Total: ₹{currentPlan.price * currentPlan.employees}/month</p>
                </div>
                <div>
                  <h5 className="font-medium mb-2">Plan Features:</h5>
                  <ul className="space-y-1">
                    {currentPlan.features.map((feature, index) => (
                      <li key={index} className="flex items-center text-sm">
                        <Check className="w-4 h-4 text-success mr-2" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button variant="outline" className="mt-4">Upgrade Plan</Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment Method */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <CreditCard className="w-5 h-5" />
                <span>Payment Method</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <div className="border rounded-lg p-4 mb-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <CreditCard className="w-6 h-6 text-primary" />
                        <div>
                          <p className="font-medium">•••• •••• •••• 4532</p>
                          <p className="text-sm text-gray-500">Expires 12/26</p>
                        </div>
                      </div>
                      <Badge variant="default">Primary</Badge>
                    </div>
                  </div>
                  <Button variant="outline" onClick={handleUpdatePayment} className="w-full">
                    Update Payment Method
                  </Button>
                </div>
                <div>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Label htmlFor="auto-renewal">Auto Renewal</Label>
                      <Switch 
                        id="auto-renewal"
                        checked={billingData.autoRenewal}
                        onCheckedChange={(checked) => setBillingData({...billingData, autoRenewal: checked})}
                      />
                    </div>
                    <div>
                      <Label htmlFor="billing-cycle">Billing Cycle</Label>
                      <Select value={billingData.invoiceFrequency} onValueChange={(value) => setBillingData({...billingData, invoiceFrequency: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="annually">Annually (10% discount)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Billing Information */}
          <Card>
            <CardHeader>
              <CardTitle>Billing Information</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="company-name">Company Name</Label>
                  <Input 
                    id="company-name"
                    value={billingData.companyName}
                    onChange={(e) => setBillingData({...billingData, companyName: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="billing-email">Billing Email</Label>
                  <Input 
                    id="billing-email"
                    type="email"
                    value={billingData.billingEmail}
                    onChange={(e) => setBillingData({...billingData, billingEmail: e.target.value})}
                  />
                </div>
                <div>
                  <Label htmlFor="gst">GST Number</Label>
                  <Input 
                    id="gst"
                    value={billingData.billingAddress.gst}
                    onChange={(e) => setBillingData({
                      ...billingData, 
                      billingAddress: {...billingData.billingAddress, gst: e.target.value}
                    })}
                  />
                </div>
                <div>
                  <Label htmlFor="billing-city">City</Label>
                  <Input 
                    id="billing-city"
                    value={billingData.billingAddress.city}
                    onChange={(e) => setBillingData({
                      ...billingData, 
                      billingAddress: {...billingData.billingAddress, city: e.target.value}
                    })}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Invoice History */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {invoices.map((invoice) => (
                  <div key={invoice.id} className="flex items-center justify-between p-3 border rounded-lg">
                    <div>
                      <p className="font-medium">{invoice.id}</p>
                      <p className="text-sm text-gray-500">{new Date(invoice.date).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">₹{invoice.amount.toLocaleString()}</p>
                      <Badge 
                        variant={invoice.status === 'paid' ? 'default' : 'secondary'}
                        className={invoice.status === 'paid' ? 'bg-success/10 text-success' : 'bg-warning/10 text-warning'}
                      >
                        {invoice.status}
                      </Badge>
                    </div>
                    <Button variant="outline" size="sm">Download</Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Save Button */}
          <div className="flex justify-end space-x-4">
            <Button variant="outline" onClick={onClose}>Cancel</Button>
            <Button onClick={handleSave}>Save Changes</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}