import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axiosconfig";

export default function Login() {
  const [role, setRole] = useState("borrower");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      alert("Please enter email and password.");
      return;
    }

    setLoading(true);
    try {
      const endpoint = role === "lender" ? "/Lender/login" : "/Borrowers/Login";

      const formData = new FormData();
      formData.append("email", email);
      formData.append("password", password);

      await api.post(endpoint, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      alert("Login successful!");
      navigate(role === "lender" ? "/lender-dashboard" : "/borrower-dashboard");
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Login failed! Check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-blue-600">Login</h2>

        {/* Role selection */}
        <div className="flex justify-around mb-6">
          {["borrower", "lender"].map((r) => (
            <label key={r} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                value={r}
                checked={role === r}
                onChange={() => setRole(r)}
                className="accent-blue-600"
              />
              <span className="capitalize">{r}</span>
            </label>
          ))}
        </div>

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          className="border p-3 w-full mb-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          className="border p-3 w-full mb-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={handleLogin}
          disabled={loading}
          className={`w-full py-3 rounded-xl text-white font-semibold transition ${
            loading ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {loading ? "Logging in..." : `Login as ${role.charAt(0).toUpperCase() + role.slice(1)}`}
        </button>
      </div>
    </div>
  );
}
