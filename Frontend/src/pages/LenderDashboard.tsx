import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { Plus, Edit, Trash2, Building2, TrendingUp, Users, DollarSign } from "lucide-react";
import { LoanPlan } from "@/components/LoanCard";

export default function LenderDashboard() {
  const { toast } = useToast();
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [loanPlans, setLoanPlans] = useState<LoanPlan[]>([
    {
      id: "lender-1",
      lenderName: "My Financial Institution",
      lenderType: "bank",
      title: "Standard Personal Loan",
      description: "Our flagship personal loan product for qualified customers.",
      interestRate: 6.99,
      minAmount: 5000,
      maxAmount: 50000,
      termMonths: [12, 24, 36, 48],
      creditScoreMin: 680,
      processingTime: "2-3 days",
      features: ["No origination fees", "Early payoff option"]
    }
  ]);

  const [newLoan, setNewLoan] = useState({
    lenderName: "My Financial Institution",
    lenderType: "bank" as LoanPlan['lenderType'],
    title: "",
    description: "",
    interestRate: "",
    minAmount: "",
    maxAmount: "",
    termMonths: [] as number[],
    creditScoreMin: "",
    processingTime: "",
    features: [] as string[]
  });

  const handleCreateLoan = (e: React.FormEvent) => {
    e.preventDefault();
    
    const loan: LoanPlan = {
      id: `lender-${Date.now()}`,
      lenderName: newLoan.lenderName,
      lenderType: newLoan.lenderType,
      title: newLoan.title,
      description: newLoan.description,
      interestRate: parseFloat(newLoan.interestRate),
      minAmount: parseInt(newLoan.minAmount),
      maxAmount: parseInt(newLoan.maxAmount),
      termMonths: newLoan.termMonths,
      creditScoreMin: parseInt(newLoan.creditScoreMin),
      processingTime: newLoan.processingTime,
      features: newLoan.features
    };

    setLoanPlans([...loanPlans, loan]);
    setShowCreateForm(false);
    setNewLoan({
      lenderName: "My Financial Institution",
      lenderType: "bank",
      title: "",
      description: "",
      interestRate: "",
      minAmount: "",
      maxAmount: "",
      termMonths: [],
      creditScoreMin: "",
      processingTime: "",
      features: []
    });

    toast({
      title: "Loan Plan Created",
      description: "Your new loan plan has been created and is now live!",
      variant: "default"
    });
  };

  const deleteLoanPlan = (id: string) => {
    setLoanPlans(loanPlans.filter(plan => plan.id !== id));
    toast({
      title: "Loan Plan Deleted",
      description: "The loan plan has been removed from the marketplace.",
      variant: "default"
    });
  };

  const addTermMonth = (month: number) => {
    if (!newLoan.termMonths.includes(month)) {
      setNewLoan({
        ...newLoan,
        termMonths: [...newLoan.termMonths, month].sort((a, b) => a - b)
      });
    }
  };

  const removeTermMonth = (month: number) => {
    setNewLoan({
      ...newLoan,
      termMonths: newLoan.termMonths.filter(m => m !== month)
    });
  };

  const addFeature = () => {
    const feature = prompt("Enter a new feature:");
    if (feature && !newLoan.features.includes(feature)) {
      setNewLoan({
        ...newLoan,
        features: [...newLoan.features, feature]
      });
    }
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-foreground mb-2">Lender Dashboard</h1>
        <p className="text-lg text-muted-foreground">Manage your loan plans and track performance</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Active Plans</p>
                <p className="text-2xl font-bold">{loanPlans.length}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-success" />
              <div>
                <p className="text-sm text-muted-foreground">Applications</p>
                <p className="text-2xl font-bold">47</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-warning" />
              <div>
                <p className="text-sm text-muted-foreground">Avg. Rate</p>
                <p className="text-2xl font-bold">6.99%</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center gap-2">
              <DollarSign className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Total Volume</p>
                <p className="text-2xl font-bold">$2.1M</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-semibold">Your Loan Plans</h2>
        <Button 
          onClick={() => setShowCreateForm(!showCreateForm)}
          variant="primary"
        >
          <Plus className="h-4 w-4 mr-2" />
          Create New Plan
        </Button>
      </div>

      {showCreateForm && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Create New Loan Plan</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleCreateLoan} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="title">Loan Title *</Label>
                  <Input
                    id="title"
                    value={newLoan.title}
                    onChange={(e) => setNewLoan({ ...newLoan, title: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="lenderType">Institution Type</Label>
                  <Select value={newLoan.lenderType} onValueChange={(value: LoanPlan['lenderType']) => setNewLoan({ ...newLoan, lenderType: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="bank">Bank</SelectItem>
                      <SelectItem value="credit_union">Credit Union</SelectItem>
                      <SelectItem value="online">Online Lender</SelectItem>
                      <SelectItem value="peer_to_peer">Peer-to-Peer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <Label htmlFor="interestRate">Interest Rate (%) *</Label>
                  <Input
                    id="interestRate"
                    type="number"
                    step="0.01"
                    value={newLoan.interestRate}
                    onChange={(e) => setNewLoan({ ...newLoan, interestRate: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="creditScoreMin">Min Credit Score *</Label>
                  <Input
                    id="creditScoreMin"
                    type="number"
                    value={newLoan.creditScoreMin}
                    onChange={(e) => setNewLoan({ ...newLoan, creditScoreMin: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="minAmount">Min Loan Amount ($) *</Label>
                  <Input
                    id="minAmount"
                    type="number"
                    value={newLoan.minAmount}
                    onChange={(e) => setNewLoan({ ...newLoan, minAmount: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="maxAmount">Max Loan Amount ($) *</Label>
                  <Input
                    id="maxAmount"
                    type="number"
                    value={newLoan.maxAmount}
                    onChange={(e) => setNewLoan({ ...newLoan, maxAmount: e.target.value })}
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="processingTime">Processing Time *</Label>
                  <Input
                    id="processingTime"
                    value={newLoan.processingTime}
                    onChange={(e) => setNewLoan({ ...newLoan, processingTime: e.target.value })}
                    placeholder="e.g., 2-3 business days"
                    required
                  />
                </div>
              </div>

              <div>
                <Label htmlFor="description">Description *</Label>
                <Textarea
                  id="description"
                  value={newLoan.description}
                  onChange={(e) => setNewLoan({ ...newLoan, description: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label>Term Options (months)</Label>
                <div className="flex flex-wrap gap-2 mt-2">
                  {[6, 12, 18, 24, 36, 48, 60, 72].map(month => (
                    <Button
                      key={month}
                      type="button"
                      variant={newLoan.termMonths.includes(month) ? "primary" : "outline"}
                      size="sm"
                      onClick={() => newLoan.termMonths.includes(month) ? removeTermMonth(month) : addTermMonth(month)}
                    >
                      {month}
                    </Button>
                  ))}
                </div>
              </div>

              <div>
                <Label>Features</Label>
                <div className="flex flex-wrap gap-2 mt-2 mb-2">
                  {newLoan.features.map((feature, index) => (
                    <Badge key={index} variant="secondary">
                      {feature}
                      <button
                        type="button"
                        onClick={() => setNewLoan({ ...newLoan, features: newLoan.features.filter((_, i) => i !== index) })}
                        className="ml-1 text-xs"
                      >
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
                <Button type="button" variant="outline" size="sm" onClick={addFeature}>
                  Add Feature
                </Button>
              </div>

              <div className="flex gap-4">
                <Button type="submit" variant="primary">
                  Create Loan Plan
                </Button>
                <Button type="button" variant="outline" onClick={() => setShowCreateForm(false)}>
                  Cancel
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Existing Loan Plans */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {loanPlans.map((plan) => (
          <Card key={plan.id} className="relative">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div>
                  <CardTitle className="text-lg">{plan.title}</CardTitle>
                  <Badge className="mt-2">{plan.lenderType.replace('_', ' ')}</Badge>
                </div>
                <div className="flex gap-2">
                  <Button size="sm" variant="outline">
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    size="sm" 
                    variant="destructive"
                    onClick={() => deleteLoanPlan(plan.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-baseline gap-1">
                  <span className="text-2xl font-bold text-primary">{plan.interestRate}%</span>
                  <span className="text-sm text-muted-foreground">APR</span>
                </div>
                
                <div className="text-sm space-y-1">
                  <p><span className="font-medium">Amount:</span> ${plan.minAmount.toLocaleString()} - ${plan.maxAmount.toLocaleString()}</p>
                  <p><span className="font-medium">Terms:</span> {plan.termMonths.join(', ')} months</p>
                  <p><span className="font-medium">Min Credit:</span> {plan.creditScoreMin}+</p>
                  <p><span className="font-medium">Processing:</span> {plan.processingTime}</p>
                </div>

                <p className="text-sm text-muted-foreground">{plan.description}</p>
                
                {plan.features.length > 0 && (
                  <div className="flex flex-wrap gap-1">
                    {plan.features.map((feature, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {feature}
                      </Badge>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
