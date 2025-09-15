import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import api from "../api/axiosconfig";

export default function Signup() {
  const navigate = useNavigate();
  const role = new URLSearchParams(useLocation().search).get("role"); // borrower or lender

  const [formData, setFormData] = useState({
    FirstName: "",
    LastName: "",
    Email: "",
    Password: "",
    PhoneNumber: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignup = async () => {
    try {
      const endpoint = role === "lender" ? "/Lender/AddLender" : "/Borrowers/AddBorrower";
      const res = await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" } // ✅ because backend uses [FromForm]
      });
      alert("Signup successful! Please login.");
      navigate(`/login?role=${role}`);
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed!");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h2 className="text-2xl font-bold mb-4">{role} Signup</h2>
      
      {role === "borrower" && (
        <>
          <input name="FirstName" onChange={handleChange} placeholder="First Name" className="border p-2 mb-2" />
          <input name="LastName" onChange={handleChange} placeholder="Last Name" className="border p-2 mb-2" />
          <input name="Email" type="email" onChange={handleChange} placeholder="Email" className="border p-2 mb-2" />
          <input name="Password" type="password" onChange={handleChange} placeholder="Password" className="border p-2 mb-2" />
          <input name="PhoneNumber" onChange={handleChange} placeholder="Phone Number" className="border p-2 mb-2" />
        </>
      )}

      {role === "lender" && (
        <>
          <input name="FirstName" onChange={handleChange} placeholder="First Name" className="border p-2 mb-2" />
          <input name="LastName" onChange={handleChange} placeholder="Last Name" className="border p-2 mb-2" />
          <input name="Email" type="email" onChange={handleChange} placeholder="Email" className="border p-2 mb-2" />
          <input name="Password" type="password" onChange={handleChange} placeholder="Password" className="border p-2 mb-2" />
          <input name="PhoneNumber" onChange={handleChange} placeholder="Phone Number" className="border p-2 mb-2" />
        </>
      )}

      <button onClick={handleSignup} className="bg-green-500 text-white px-6 py-2 rounded-xl">
        Signup
      </button>
    </div>
  );
}
