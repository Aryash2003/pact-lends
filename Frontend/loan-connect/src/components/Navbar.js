import { Link, useNavigate } from "react-router-dom";
import api from "../api/axiosconfig";

export default function Navbar({ role, loggedIn }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      if (!role) return;

      const route = role === "lender" ? "/Lender/logout" : "/Borrowers/Logout";
      await api.post(route);
      alert("Logout successful");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert("Failed to logout");
    }
  };

  return (
    <nav className="bg-blue-600 text-white px-10 py-5 flex justify-between items-center shadow-lg">
      <h1
        className="font-extrabold text-3xl cursor-pointer hover:text-green-300 transition-colors"
        onClick={() => navigate("/")}
      >
        LoanConnect
      </h1>

      <div className="flex items-center space-x-10 text-lg">
        {!loggedIn ? (
          <>
            <Link
              to="/"
              className="hover:text-green-300 transition-colors font-semibold"
            >
              Home
            </Link>
            <Link
              to="/login"
              className="hover:text-green-300 transition-colors font-semibold"
            >
              Login
            </Link>
            <Link
              to="/signup?role=borrower"
              className="hover:text-green-300 transition-colors font-semibold"
            >
              Borrower Signup
            </Link>
            <Link
              to="/signup?role=lender"
              className="hover:text-green-300 transition-colors font-semibold"
            >
              Lender Signup
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 px-6 py-2 rounded-2xl font-bold transition-colors shadow-md"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
