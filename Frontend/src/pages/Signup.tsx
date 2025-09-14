import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "borrower" as "lender" | "borrower"
  });
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don't match");
      return;
    }

    // TODO: Connect to your backend registration
    console.log("Signup attempt:", formData);
    
    const formData2 = new FormData();
    formData2.append("FirstName", formData.firstName);
    formData2.append("LastName", formData.lastName);
    formData2.append("Email", formData.email);
    formData2.append("PhoneNumber", formData.phoneNumber);
    formData2.append("Password", formData.password);
    if(formData.role === "borrower") {
        const response = await fetch("https://localhost:7008/api/Borrowers/AddBorrower", {
        method: "POST",
        body: formData2,
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if(!response.ok) {
        alert(JSON.stringify(data, null, 2));
      }else{
        alert("User registered successfully");
        navigate("/marketplace");
      }
    }
    else {
        const response = await fetch("https://localhost:7008/api/Lenders/AddLender", {
        method: "POST",
        body: formData2,
        credentials: "include",
      });
      const data = await response.json();
      console.log(data);
      if(!response.ok) {
        alert(JSON.stringify(data, null, 2));
      }else{
        alert("Lender registered successfully");
        navigate("/lender");
      }
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
          <CardDescription>Join our lending platform</CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="firstName">First Name</Label>
                <Input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="John"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastName">Last Name</Label>
                <Input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Doe"
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phoneNumber">Phone Number</Label>
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  type="tel"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="(123) 456-7890"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Create a strong password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="Confirm your password"
                required
              />
            </div>

            <div className="space-y-2">
              <Label>Account Type</Label>
              <div className="flex gap-4">
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="borrower"
                    checked={formData.role === "borrower"}
                    onChange={handleChange}
                    className="text-primary"
                  />
                  <span>Borrower</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="role"
                    value="lender"
                    checked={formData.role === "lender"}
                    onChange={handleChange}
                    className="text-primary"
                  />
                  <span>Lender</span>
                </label>
              </div>
            </div>

            <Button type="submit" className="w-full">
              Create Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Already have an account?{" "}
              <Link to="/login" className="text-primary hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Signup;