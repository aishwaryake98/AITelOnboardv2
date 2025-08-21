import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

interface AddEmployeeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddEmployeeModal({ isOpen, onClose }: AddEmployeeModalProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    mobile: "",
    department: "",
    planId: "premium"
  });
  
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const addEmployeeMutation = useMutation({
    mutationFn: async (data: any) => {
      return apiRequest("POST", "/api/enterprise/employees", data).then(res => res.json());
    },
    onSuccess: () => {
      toast({
        title: "Employee Added",
        description: "Employee has been added successfully and will receive SIM activation instructions.",
      });
      queryClient.invalidateQueries({ queryKey: ["/api/enterprise/employees"] });
      onClose();
      setFormData({
        fullName: "",
        email: "",
        mobile: "",
        department: "",
        planId: "premium"
      });
    },
    onError: (error: any) => {
      toast({
        title: "Error",
        description: "Failed to add employee. Please try again.",
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addEmployeeMutation.mutate({
      ...formData,
      enterpriseId: 'techcorp-enterprise',
      kycStatus: 'pending'
    });
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Add New Employee</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="fullName">Full Name *</Label>
            <Input
              id="fullName"
              value={formData.fullName}
              onChange={(e) => handleInputChange("fullName", e.target.value)}
              placeholder="Enter employee's full name"
              required
            />
          </div>

          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              placeholder="employee@company.com"
              required
            />
          </div>

          <div>
            <Label htmlFor="mobile">Mobile Number *</Label>
            <Input
              id="mobile"
              value={formData.mobile}
              onChange={(e) => handleInputChange("mobile", e.target.value)}
              placeholder="Enter 10-digit mobile number"
              required
            />
          </div>

          <div>
            <Label htmlFor="department">Department</Label>
            <Select value={formData.department} onValueChange={(value) => handleInputChange("department", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="IT">Information Technology</SelectItem>
                <SelectItem value="HR">Human Resources</SelectItem>
                <SelectItem value="Finance">Finance</SelectItem>
                <SelectItem value="Marketing">Marketing</SelectItem>
                <SelectItem value="Operations">Operations</SelectItem>
                <SelectItem value="Sales">Sales</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="plan">SIM Plan</Label>
            <Select value={formData.planId} onValueChange={(value) => handleInputChange("planId", value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic Plan - ₹299/month</SelectItem>
                <SelectItem value="premium">Premium Plan - ₹499/month</SelectItem>
                <SelectItem value="enterprise">Enterprise Plan - ₹799/month</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={addEmployeeMutation.isPending}>
              {addEmployeeMutation.isPending ? "Adding..." : "Add Employee"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}