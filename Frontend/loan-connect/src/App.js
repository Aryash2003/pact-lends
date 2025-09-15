import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import BorrowerDashboard from "./Pages/BorrowerDashboard";
import LenderDashboard from "./Pages/LenderDashboard";
import Signup from "./Pages/Signup";
function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/borrower-dashboard" element={<BorrowerDashboard />} />
        <Route path="/lender-dashboard" element={<LenderDashboard />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
