import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center">
      <h1 className="text-4xl font-bold mb-6">Welcome to LoanConnect 💸</h1>
      <p className="mb-8">A platform connecting Borrowers and Lenders</p>
      <div className="space-x-4">
        <Link to="/login?role=borrower" className="bg-green-500 text-white px-6 py-3 rounded-xl">Borrower</Link>
        <Link to="/login?role=lender" className="bg-blue-500 text-white px-6 py-3 rounded-xl">Lender</Link>
      </div>
    </div>
  );
}
