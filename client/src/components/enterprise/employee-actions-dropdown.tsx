import { useState } from "react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { MoreVertical, Edit, Trash2, Pause, Play, Phone, Mail, Activity } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface EmployeeActionsDropdownProps {
  employee: any;
  onAction?: (action: string, employee: any) => void;
}

export default function EmployeeActionsDropdown({ employee, onAction }: EmployeeActionsDropdownProps) {
  const { toast } = useToast();

  const handleAction = (action: string) => {
    switch (action) {
      case 'edit':
        toast({
          title: "Edit Employee",
          description: `Opening edit form for ${employee.name}`
        });
        break;
      case 'suspend':
        toast({
          title: "Employee Suspended",
          description: `${employee.name}'s SIM has been suspended`
        });
        break;
      case 'activate':
        toast({
          title: "Employee Activated", 
          description: `${employee.name}'s SIM has been activated`
        });
        break;
      case 'call':
        toast({
          title: "Calling Employee",
          description: `Initiating call to ${employee.phone || employee.simNumber}`
        });
        break;
      case 'email':
        toast({
          title: "Email Sent",
          description: `Email sent to ${employee.email}`
        });
        break;
      case 'usage':
        toast({
          title: "Usage Details",
          description: `Viewing detailed usage for ${employee.name}`
        });
        break;
      case 'delete':
        toast({
          title: "Employee Removed",
          description: `${employee.name} has been removed from the system`,
          variant: "destructive"
        });
        break;
    }
    
    if (onAction) {
      onAction(action, employee);
    }
  };

  const isActive = employee.status === 'active';

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm">
          <MoreVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        <DropdownMenuItem onClick={() => handleAction('edit')}>
          <Edit className="w-4 h-4 mr-2" />
          Edit Details
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('usage')}>
          <Activity className="w-4 h-4 mr-2" />
          View Usage
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleAction('call')}>
          <Phone className="w-4 h-4 mr-2" />
          Call Employee
        </DropdownMenuItem>
        
        <DropdownMenuItem onClick={() => handleAction('email')}>
          <Mail className="w-4 h-4 mr-2" />
          Send Email
        </DropdownMenuItem>
        
        <DropdownMenuSeparator />
        
        {isActive ? (
          <DropdownMenuItem onClick={() => handleAction('suspend')} className="text-warning">
            <Pause className="w-4 h-4 mr-2" />
            Suspend SIM
          </DropdownMenuItem>
        ) : (
          <DropdownMenuItem onClick={() => handleAction('activate')} className="text-success">
            <Play className="w-4 h-4 mr-2" />
            Activate SIM
          </DropdownMenuItem>
        )}
        
        <DropdownMenuSeparator />
        
        <DropdownMenuItem onClick={() => handleAction('delete')} className="text-destructive">
          <Trash2 className="w-4 h-4 mr-2" />
          Remove Employee
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}