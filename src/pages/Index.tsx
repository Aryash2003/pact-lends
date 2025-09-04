import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { Building2, Users, TrendingUp, Shield, Clock, DollarSign, CheckCircle, Star } from "lucide-react";

const Index = () => {
  const [userType, setUserType] = useState<"lender" | "borrower" | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <DollarSign className="h-8 w-8 text-primary" />
              <span className="text-2xl font-bold text-foreground">LoanConnect</span>
            </div>
            <div className="flex items-center gap-4">
              <Button variant="ghost" asChild>
                <Link to="/marketplace">Browse Loans</Link>
              </Button>
              <Button variant="ghost" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              Connect Borrowers with 
              <span className="bg-gradient-hero bg-clip-text text-transparent"> Trusted Lenders</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto">
              The modern lending marketplace where borrowers find competitive rates and lenders reach qualified customers.
            </p>

            {/* User Type Selection */}
            <div className="grid md:grid-cols-2 gap-6 max-w-2xl mx-auto mb-12">
              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-loan-card hover:-translate-y-2" onClick={() => setUserType("borrower")}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-gradient-primary rounded-full w-16 h-16 flex items-center justify-center">
                    <Users className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <CardTitle className="text-2xl">I Need a Loan</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6">
                    Compare rates from multiple lenders and apply online in minutes
                  </p>
                  <Button variant="primary" className="w-full" asChild>
                    <Link to="/marketplace">Browse Loan Options</Link>
                  </Button>
                </CardContent>
              </Card>

              <Card className="group cursor-pointer transition-all duration-300 hover:shadow-loan-card hover:-translate-y-2" onClick={() => setUserType("lender")}>
                <CardHeader className="text-center pb-4">
                  <div className="mx-auto mb-4 p-3 bg-gradient-success rounded-full w-16 h-16 flex items-center justify-center">
                    <Building2 className="h-8 w-8 text-success-foreground" />
                  </div>
                  <CardTitle className="text-2xl">I'm a Lender</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-muted-foreground mb-6">
                    Advertise your loan products and connect with qualified borrowers
                  </p>
                  <Button variant="success" className="w-full" asChild>
                    <Link to="/lender">Access Lender Portal</Link>
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">$2.1M+</div>
                <div className="text-sm text-muted-foreground">Loans Funded</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-success">150+</div>
                <div className="text-sm text-muted-foreground">Active Lenders</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-warning">4.8★</div>
                <div className="text-sm text-muted-foreground">Average Rating</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary">24hr</div>
                <div className="text-sm text-muted-foreground">Avg Approval</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">Why Choose LoanConnect?</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              We make lending simple, transparent, and secure for both borrowers and lenders.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group hover:shadow-card transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <TrendingUp className="h-8 w-8 text-primary" />
                </div>
                <CardTitle>Competitive Rates</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Compare rates from multiple lenders to find the best deal for your financial situation.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-card transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-success/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Clock className="h-8 w-8 text-success" />
                </div>
                <CardTitle>Fast Processing</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Get approved in minutes with our streamlined application process and instant decisions.
                </p>
              </CardContent>
            </Card>

            <Card className="group hover:shadow-card transition-all duration-300">
              <CardHeader className="text-center">
                <div className="mx-auto mb-4 p-3 bg-warning/10 rounded-full w-16 h-16 flex items-center justify-center">
                  <Shield className="h-8 w-8 text-warning" />
                </div>
                <CardTitle>Secure & Trusted</CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-muted-foreground">
                  Bank-level security and verified lenders ensure your information and money are safe.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">How It Works</h2>
            <p className="text-xl text-muted-foreground">Simple steps to get the funding you need</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold mb-3">Compare Options</h3>
              <p className="text-muted-foreground">
                Browse loan offers from verified lenders and compare rates, terms, and features.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold mb-3">Apply Online</h3>
              <p className="text-muted-foreground">
                Complete our secure application with your financial information and get instant pre-approval.
              </p>
            </div>

            <div className="text-center">
              <div className="mx-auto mb-6 w-16 h-16 bg-gradient-primary rounded-full flex items-center justify-center text-primary-foreground text-2xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Funded</h3>
              <p className="text-muted-foreground">
                Receive funds directly in your bank account, often within 24 hours of approval.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-hero">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto text-primary-foreground">
            <h2 className="text-4xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of satisfied borrowers and lenders on our platform
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="secondary" size="lg" asChild>
                <Link to="/marketplace">Find Your Loan</Link>
              </Button>
              <Button variant="outline" size="lg" className="bg-transparent border-primary-foreground text-primary-foreground hover:bg-primary-foreground hover:text-primary" asChild>
                <Link to="/lender">Become a Lender</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t bg-card py-12 px-4">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <DollarSign className="h-6 w-6 text-primary" />
            <span className="text-xl font-bold text-foreground">LoanConnect</span>
          </div>
          <p className="text-muted-foreground">
            Connecting borrowers with trusted lenders since 2024
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
