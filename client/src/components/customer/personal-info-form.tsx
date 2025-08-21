import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const personalInfoSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  countryCode: z.string().min(1, "Country code is required"),
  mobile: z.string().regex(/^[1-9][\d]{9}$/, "Please enter a valid 10-digit mobile number"),
  email: z.string().email("Please enter a valid email address"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  address: z.string().min(10, "Address must be at least 10 characters"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(1, "State is required"),
  pincode: z.string().regex(/^[1-9][0-9]{5}$/, "Please enter a valid PIN code"),
});

type PersonalInfoData = z.infer<typeof personalInfoSchema>;

interface PersonalInfoFormProps {
  onComplete: (data: PersonalInfoData) => void;
  data: any;
}

export default function PersonalInfoForm({ onComplete, data }: PersonalInfoFormProps) {
  // Auto-fill form with data from document upload if available
  const autoFillData = data?.autoFillData || {};
  const form = useForm<PersonalInfoData>({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: {
      fullName: autoFillData.fullName || data.fullName || "",
      countryCode: "+91",
      mobile: autoFillData.mobile?.replace("+91", "").trim() || data.mobile || "",
      email: autoFillData.email || data.email || "",
      dateOfBirth: autoFillData.dateOfBirth || data.dateOfBirth || "",
      address: autoFillData.address || data.address || "",
      city: autoFillData.city || data.city || "",
      state: autoFillData.state || data.state || "",
      pincode: autoFillData.pincode || data.pincode || "",
    },
  });

  const onSubmit = (formData: PersonalInfoData) => {
    onComplete(formData);
  };

  const indianStates = [
    { value: "andhra-pradesh", label: "Andhra Pradesh" },
    { value: "karnataka", label: "Karnataka" },
    { value: "maharashtra", label: "Maharashtra" },
    { value: "delhi", label: "Delhi" },
    { value: "gujarat", label: "Gujarat" },
    { value: "tamil-nadu", label: "Tamil Nadu" },
    // Add more states as needed
  ];

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle className="text-xl">Personal Information</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fullName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Full Name *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your full name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number *</FormLabel>
                    <FormControl>
                      <div className="flex">
                        <FormField
                          control={form.control}
                          name="countryCode"
                          render={({ field: countryField }) => (
                            <Select value={countryField.value} onValueChange={countryField.onChange}>
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="+91">+91</SelectItem>
                                <SelectItem value="+1">+1</SelectItem>
                                <SelectItem value="+44">+44</SelectItem>
                                <SelectItem value="+86">+86</SelectItem>
                                <SelectItem value="+81">+81</SelectItem>
                              </SelectContent>
                            </Select>
                          )}
                        />
                        <Input 
                          placeholder="Enter 10-digit mobile number" 
                          className="ml-2 flex-1"
                          {...field}
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address *</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="your.email@example.com" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth *</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address *</FormLabel>
                  <FormControl>
                    <Textarea rows={3} placeholder="Enter your complete address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid md:grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="city"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City *</FormLabel>
                    <FormControl>
                      <Input placeholder="City" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>State *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select State" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {indianStates.map((state) => (
                          <SelectItem key={state.value} value={state.value}>
                            {state.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pincode"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>PIN Code *</FormLabel>
                    <FormControl>
                      <Input placeholder="400001" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full">
              Continue to Document Upload
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
