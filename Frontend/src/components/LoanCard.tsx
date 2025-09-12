import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, DollarSign, TrendingUp, Building2 } from "lucide-react";

export interface LoanPlan {
  id: string;
  lenderName: string;
  lenderType: "bank" | "credit_union" | "online" | "peer_to_peer";
  title: string;
  description: string;
  interestRate: number;
  minAmount: number;
  maxAmount: number;
  termMonths: number[];
  creditScoreMin: number;
  processingTime: string;
  features: string[];
  isPopular?: boolean;
}

interface LoanCardProps {
  loan: LoanPlan;
  onApply: (loanId: string) => void;
}

const lenderTypeColors = {
  bank: "bg-primary text-primary-foreground",
  credit_union: "bg-success text-success-foreground",
  online: "bg-warning text-warning-foreground",
  peer_to_peer: "bg-accent text-accent-foreground"
};

export function LoanCard({ loan, onApply }: LoanCardProps) {
  return (
    <Card className={`relative overflow-hidden bg-gradient-card shadow-loan-card hover:shadow-glow transition-all duration-300 hover:-translate-y-1 ${loan.isPopular ? 'ring-2 ring-primary' : ''}`}>
      {loan.isPopular && (
        <div className="absolute top-0 right-0 bg-gradient-primary text-primary-foreground px-3 py-1 text-sm font-medium rounded-bl-lg">
          Popular
        </div>
      )}
      
      <CardHeader className="pb-4">
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl font-bold text-foreground">{loan.title}</CardTitle>
            <div className="flex items-center gap-2 mt-2">
              <Building2 className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">{loan.lenderName}</span>
              <Badge className={lenderTypeColors[loan.lenderType]}>
                {loan.lenderType.replace('_', ' ')}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="flex items-baseline gap-1 mt-4">
          <span className="text-3xl font-bold text-primary">{loan.interestRate}%</span>
          <span className="text-sm text-muted-foreground">APR</span>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">{loan.description}</p>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4 text-success" />
            <div>
              <p className="text-xs text-muted-foreground">Loan Amount</p>
              <p className="text-sm font-semibold">${loan.minAmount.toLocaleString()} - ${loan.maxAmount.toLocaleString()}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-warning" />
            <div>
              <p className="text-xs text-muted-foreground">Terms</p>
              <p className="text-sm font-semibold">{loan.termMonths.join(', ')} months</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-primary" />
            <div>
              <p className="text-xs text-muted-foreground">Min Credit Score</p>
              <p className="text-sm font-semibold">{loan.creditScoreMin}+</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <div>
              <p className="text-xs text-muted-foreground">Processing</p>
              <p className="text-sm font-semibold">{loan.processingTime}</p>
            </div>
          </div>
        </div>

        {loan.features.length > 0 && (
          <div>
            <p className="text-sm font-medium text-foreground mb-2">Features:</p>
            <div className="flex flex-wrap gap-1">
              {loan.features.map((feature, index) => (
                <Badge key={index} variant="secondary" className="text-xs">
                  {feature}
                </Badge>
              ))}
            </div>
          </div>
        )}
      </CardContent>

      <CardFooter>
        <Button 
          onClick={() => onApply(loan.id)}
          variant="primary"
          className="w-full"
        >
          Apply Now
        </Button>
      </CardFooter>
    </Card>
  );
}