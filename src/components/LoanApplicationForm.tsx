import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, FileText, User, DollarSign, Building2 } from "lucide-react";

interface LoanApplicationFormProps {
  loanPlan?: {
    id: string;
    title: string;
    lenderName: string;
    interestRate: number;
  };
  onBack: () => void;
}

export function LoanApplicationForm({ loanPlan, onBack }: LoanApplicationFormProps) {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    // Personal Information
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    dateOfBirth: "",
    ssn: "",
    
    // Employment Information
    employmentStatus: "",
    employer: "",
    jobTitle: "",
    workDuration: "",
    annualIncome: "",
    additionalIncome: "",
    
    // Financial Information
    requestedAmount: "",
    loanPurpose: "",
    bankName: "",
    accountType: "",
    monthlyExpenses: "",
    existingDebts: "",
    creditScore: "",
    
    // Additional Information
    hasCollateral: false,
    collateralDescription: "",
    agreeToTerms: false,
    agreeToCredit: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.agreeToTerms || !formData.agreeToCredit) {
      toast({
        title: "Agreement Required",
        description: "Please agree to terms and credit check authorization.",
        variant: "destructive"
      });
      return;
    }

    // Simulate application submission
    toast({
      title: "Application Submitted!",
      description: `Your loan application for ${loanPlan?.title} has been submitted successfully. You'll receive a response within 24-48 hours.`,
      variant: "default"
    });
    
    // Reset form or redirect
    setTimeout(() => {
      onBack();
    }, 2000);
  };

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <Button 
        onClick={onBack}
        variant="outline"
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Loan Plans
      </Button>

      {loanPlan && (
        <Card className="mb-6 bg-gradient-primary text-primary-foreground">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold">{loanPlan.title}</h3>
                <p className="opacity-90">{loanPlan.lenderName}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-bold">{loanPlan.interestRate}% APR</p>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Personal Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5" />
              Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">First Name *</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Last Name *</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
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
                required
              />
            </div>
            <div>
              <Label htmlFor="phone">Phone Number *</Label>
              <Input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange("phone", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="dateOfBirth">Date of Birth *</Label>
              <Input
                id="dateOfBirth"
                type="date"
                value={formData.dateOfBirth}
                onChange={(e) => handleInputChange("dateOfBirth", e.target.value)}
                required
              />
            </div>
            <div>
              <Label htmlFor="ssn">SSN (Last 4 digits) *</Label>
              <Input
                id="ssn"
                maxLength={4}
                value={formData.ssn}
                onChange={(e) => handleInputChange("ssn", e.target.value)}
                placeholder="XXXX"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Employment Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building2 className="h-5 w-5" />
              Employment Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <Label htmlFor="employmentStatus">Employment Status *</Label>
              <Select value={formData.employmentStatus} onValueChange={(value) => handleInputChange("employmentStatus", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select employment status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="full-time">Full-time Employee</SelectItem>
                  <SelectItem value="part-time">Part-time Employee</SelectItem>
                  <SelectItem value="self-employed">Self-employed</SelectItem>
                  <SelectItem value="unemployed">Unemployed</SelectItem>
                  <SelectItem value="retired">Retired</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="employer">Employer Name</Label>
              <Input
                id="employer"
                value={formData.employer}
                onChange={(e) => handleInputChange("employer", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="jobTitle">Job Title</Label>
              <Input
                id="jobTitle"
                value={formData.jobTitle}
                onChange={(e) => handleInputChange("jobTitle", e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="workDuration">Time at Current Job</Label>
              <Select value={formData.workDuration} onValueChange={(value) => handleInputChange("workDuration", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="less-than-1">Less than 1 year</SelectItem>
                  <SelectItem value="1-2">1-2 years</SelectItem>
                  <SelectItem value="2-5">2-5 years</SelectItem>
                  <SelectItem value="5-plus">5+ years</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor="annualIncome">Annual Income *</Label>
              <Input
                id="annualIncome"
                type="number"
                value={formData.annualIncome}
                onChange={(e) => handleInputChange("annualIncome", e.target.value)}
                placeholder="50000"
                required
              />
            </div>
          </CardContent>
        </Card>

        {/* Financial Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              Financial Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="requestedAmount">Requested Loan Amount *</Label>
              <Input
                id="requestedAmount"
                type="number"
                value={formData.requestedAmount}
                onChange={(e) => handleInputChange("requestedAmount", e.target.value)}
                placeholder="25000"
                required
              />
            </div>
            <div>
              <Label htmlFor="creditScore">Estimated Credit Score</Label>
              <Select value={formData.creditScore} onValueChange={(value) => handleInputChange("creditScore", value)}>
                <SelectTrigger>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="excellent">800+ (Excellent)</SelectItem>
                  <SelectItem value="very-good">740-799 (Very Good)</SelectItem>
                  <SelectItem value="good">670-739 (Good)</SelectItem>
                  <SelectItem value="fair">580-669 (Fair)</SelectItem>
                  <SelectItem value="poor">Below 580 (Poor)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="loanPurpose">Loan Purpose *</Label>
              <Textarea
                id="loanPurpose"
                value={formData.loanPurpose}
                onChange={(e) => handleInputChange("loanPurpose", e.target.value)}
                placeholder="Describe what you'll use the loan for..."
                required
              />
            </div>
            <div>
              <Label htmlFor="monthlyExpenses">Monthly Expenses</Label>
              <Input
                id="monthlyExpenses"
                type="number"
                value={formData.monthlyExpenses}
                onChange={(e) => handleInputChange("monthlyExpenses", e.target.value)}
                placeholder="3000"
              />
            </div>
            <div>
              <Label htmlFor="existingDebts">Existing Monthly Debt Payments</Label>
              <Input
                id="existingDebts"
                type="number"
                value={formData.existingDebts}
                onChange={(e) => handleInputChange("existingDebts", e.target.value)}
                placeholder="500"
              />
            </div>
          </CardContent>
        </Card>

        {/* Collateral Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <FileText className="h-5 w-5" />
              Additional Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="hasCollateral"
                checked={formData.hasCollateral}
                onCheckedChange={(checked) => handleInputChange("hasCollateral", checked === true)}
              />
              <Label htmlFor="hasCollateral">I have collateral to secure this loan</Label>
            </div>
            
            {formData.hasCollateral && (
              <div>
                <Label htmlFor="collateralDescription">Collateral Description</Label>
                <Textarea
                  id="collateralDescription"
                  value={formData.collateralDescription}
                  onChange={(e) => handleInputChange("collateralDescription", e.target.value)}
                  placeholder="Describe your collateral (vehicle, property, etc.)"
                />
              </div>
            )}
          </CardContent>
        </Card>

        {/* Terms and Agreements */}
        <Card>
          <CardContent className="pt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToTerms"
                checked={formData.agreeToTerms}
                onCheckedChange={(checked) => handleInputChange("agreeToTerms", checked === true)}
                required
              />
              <Label htmlFor="agreeToTerms">
                I agree to the terms and conditions *
              </Label>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox
                id="agreeToCredit"
                checked={formData.agreeToCredit}
                onCheckedChange={(checked) => handleInputChange("agreeToCredit", checked === true)}
                required
              />
              <Label htmlFor="agreeToCredit">
                I authorize a credit check for this application *
              </Label>
            </div>
          </CardContent>
        </Card>

        <Button type="submit" variant="primary" className="w-full" size="lg">
          Submit Loan Application
        </Button>
      </form>
    </div>
  );
}