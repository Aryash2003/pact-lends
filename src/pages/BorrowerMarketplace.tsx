import { useState } from "react";
import { LoanCard } from "@/components/LoanCard";
import { LoanApplicationForm } from "@/components/LoanApplicationForm";
import { mockLoanPlans } from "@/data/mockLoans";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Search, Filter, DollarSign, TrendingDown } from "lucide-react";

export default function BorrowerMarketplace() {
  const [selectedLoan, setSelectedLoan] = useState<string | null>(null);
  const [showApplication, setShowApplication] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filters, setFilters] = useState({
    maxRate: [15],
    minAmount: "",
    maxAmount: "",
    lenderType: "all",
    minCreditScore: [500]
  });

  const filteredLoans = mockLoanPlans.filter(loan => {
    const matchesSearch = loan.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.lenderName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         loan.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRate = loan.interestRate <= filters.maxRate[0];
    const matchesType = filters.lenderType === "all" || loan.lenderType === filters.lenderType;
    const matchesMinAmount = !filters.minAmount || loan.minAmount >= parseInt(filters.minAmount);
    const matchesMaxAmount = !filters.maxAmount || loan.maxAmount <= parseInt(filters.maxAmount);
    const matchesCreditScore = loan.creditScoreMin <= filters.minCreditScore[0];

    return matchesSearch && matchesRate && matchesType && matchesMinAmount && matchesMaxAmount && matchesCreditScore;
  });

  const handleApply = (loanId: string) => {
    setSelectedLoan(loanId);
    setShowApplication(true);
  };

  const handleBackToMarketplace = () => {
    setShowApplication(false);
    setSelectedLoan(null);
  };

  const selectedLoanData = selectedLoan ? mockLoanPlans.find(loan => loan.id === selectedLoan) : null;

  if (showApplication) {
    return (
      <LoanApplicationForm 
        loanPlan={selectedLoanData}
        onBack={handleBackToMarketplace}
      />
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Header */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-foreground mb-4">Find Your Perfect Loan</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Compare rates and terms from trusted lenders. Apply online in minutes.
        </p>
      </div>

      {/* Search and Filters */}
      <Card className="mb-8">
        <CardContent className="pt-6">
          <div className="space-y-6">
            {/* Search Bar */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by lender name, loan type, or features..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Filters */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <Label className="text-sm font-medium">Max Interest Rate</Label>
                <div className="mt-2">
                  <Slider
                    value={filters.maxRate}
                    onValueChange={(value) => setFilters({ ...filters, maxRate: value })}
                    max={20}
                    min={3}
                    step={0.25}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>3%</span>
                    <span className="font-medium">{filters.maxRate[0]}%</span>
                    <span>20%</span>
                  </div>
                </div>
              </div>

              <div>
                <Label htmlFor="lenderType">Lender Type</Label>
                <Select value={filters.lenderType} onValueChange={(value) => setFilters({ ...filters, lenderType: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Types</SelectItem>
                    <SelectItem value="bank">Banks</SelectItem>
                    <SelectItem value="credit_union">Credit Unions</SelectItem>
                    <SelectItem value="online">Online Lenders</SelectItem>
                    <SelectItem value="peer_to_peer">Peer-to-Peer</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="minAmount">Min Amount ($)</Label>
                <Input
                  id="minAmount"
                  type="number"
                  placeholder="5000"
                  value={filters.minAmount}
                  onChange={(e) => setFilters({ ...filters, minAmount: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="maxAmount">Max Amount ($)</Label>
                <Input
                  id="maxAmount"
                  type="number"
                  placeholder="50000"
                  value={filters.maxAmount}
                  onChange={(e) => setFilters({ ...filters, maxAmount: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-sm font-medium">Your Credit Score</Label>
                <div className="mt-2">
                  <Slider
                    value={filters.minCreditScore}
                    onValueChange={(value) => setFilters({ ...filters, minCreditScore: value })}
                    max={850}
                    min={300}
                    step={10}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>300</span>
                    <span className="font-medium">{filters.minCreditScore[0]}</span>
                    <span>850</span>
                  </div>
                </div>
              </div>
            </div>

            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setFilters({
                maxRate: [15],
                minAmount: "",
                maxAmount: "",
                lenderType: "all",
                minCreditScore: [500]
              })}
            >
              Reset Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Results Summary */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <h2 className="text-2xl font-semibold">Available Loans</h2>
          <span className="text-muted-foreground">({filteredLoans.length} results)</span>
        </div>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <TrendingDown className="h-4 w-4" />
          <span>Sorted by interest rate</span>
        </div>
      </div>

      {/* Loan Cards */}
      {filteredLoans.length === 0 ? (
        <Card className="text-center py-12">
          <CardContent>
            <Filter className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">No loans match your criteria</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your filters or search terms</p>
            <Button 
              variant="outline"
              onClick={() => setFilters({
                maxRate: [15],
                minAmount: "",
                maxAmount: "",
                lenderType: "all",
                minCreditScore: [500]
              })}
            >
              Clear All Filters
            </Button>
          </CardContent>
        </Card>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredLoans
            .sort((a, b) => a.interestRate - b.interestRate)
            .map((loan) => (
              <LoanCard
                key={loan.id}
                loan={loan}
                onApply={handleApply}
              />
            ))}
        </div>
      )}

      {/* Educational Footer */}
      <Card className="mt-12 bg-gradient-card">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div>
              <DollarSign className="h-8 w-8 text-primary mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Compare Rates</h3>
              <p className="text-sm text-muted-foreground">
                Shop around to find the best rates and terms for your situation
              </p>
            </div>
            <div>
              <TrendingDown className="h-8 w-8 text-success mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Improve Your Score</h3>
              <p className="text-sm text-muted-foreground">
                Higher credit scores typically qualify for better interest rates
              </p>
            </div>
            <div>
              <Filter className="h-8 w-8 text-warning mx-auto mb-3" />
              <h3 className="font-semibold mb-2">Read the Terms</h3>
              <p className="text-sm text-muted-foreground">
                Always review all fees, terms, and conditions before applying
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}