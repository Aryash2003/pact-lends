import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosconfig";

export default function Login() {
  const [role, setRole] = useState("borrower"); // default
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
  try {
    const endpoint = role === "lender" ? "/Lender/login" : "/Borrowers/Login";

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    const res = await api.post(endpoint, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });

    alert("Login successful!");
    navigate(role === "lender" ? "/lender-dashboard" : "/borrower-dashboard");
  } catch (err) {
    console.error(err);
    alert(err.response?.data || "Login failed! Check credentials.");
  }
};


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-6 rounded-xl shadow-lg w-96">
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>

        {/* Role selection */}
        <div className="flex justify-around mb-4">
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="borrower"
              checked={role === "borrower"}
              onChange={() => setRole("borrower")}
            />
            <span>Borrower</span>
          </label>
          <label className="flex items-center space-x-2">
            <input
              type="radio"
              value="lender"
              checked={role === "lender"}
              onChange={() => setRole("lender")}
            />
            <span>Lender</span>
          </label>
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="border w-full p-2 mb-3 rounded"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="border w-full p-2 mb-3 rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          className="bg-blue-600 text-white w-full py-2 rounded-xl hover:bg-blue-700"
        >
          Login as {role.charAt(0).toUpperCase() + role.slice(1)}
        </button>
      </div>
    </div>
  );
}
