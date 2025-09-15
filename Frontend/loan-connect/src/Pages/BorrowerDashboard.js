import { useEffect, useState } from "react";
import api from "../api/axiosconfig";
import Modal from "../components/Modal";

export default function BorrowerDashboard() {
  const [plans, setPlans] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);

  // Loan request form state
  const [formData, setFormData] = useState({
    amount: "",
    firstName: "",
    lastName: "",
    dob: "",
    company: "",
    employment_status: "",
    income: "",
    job_title: ""
  });

  // Fetch all plans
  useEffect(() => {
    api.get("/Borrowers/GetAllPlans")
      .then(res => setPlans(res.data))
      .catch(err => console.error("Failed to fetch plans:", err));
  }, []);

  // Handle form input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Submit loan request
  const requestLoan = async () => {
    if (!selectedPlan) return;

    try {
      const form = new URLSearchParams();
      form.append("request_id", selectedPlan.id);
      form.append("amount", formData.amount);
      form.append("FirstName", formData.firstName);
      form.append("LastName", formData.lastName);
      form.append("dob", formData.dob);
      form.append("Company", formData.company);
      form.append("employment_status", formData.employment_status);
      form.append("income", formData.income);
      form.append("job_title", formData.job_title);

      await api.post("/Borrowers/Loan_request", form);

      alert("Loan request submitted!");
      setSelectedPlan(null);
      setFormData({
        amount: "",
        firstName: "",
        lastName: "",
        dob: "",
        company: "",
        employment_status: "",
        income: "",
        job_title: ""
      });
    } catch (err) {
      console.error("Loan request failed:", err);
      alert("Failed to request loan. Make sure you are logged in.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Available Plans</h2>
      <div className="grid grid-cols-3 gap-4">
        {plans.map(plan => (
          <div
            key={plan.id}
            className="border p-4 rounded-xl shadow hover:shadow-lg cursor-pointer"
            onClick={() => setSelectedPlan(plan)}
          >
            <h3 className="font-bold">{plan.title}</h3>
            <p>Interest: {plan.interestRate}%</p>
            <p>Duration: {plan.durationInMonths} months</p>
            <p>Max Amount: ₹{plan.maxLoanAmount}</p>
          </div>
        ))}
      </div>

      {/* Modal for loan request */}
      <Modal isOpen={!!selectedPlan} onClose={() => setSelectedPlan(null)}>
        <h3 className="text-lg font-bold mb-2">Request Loan for {selectedPlan?.title}</h3>

        <input
          type="number"
          name="amount"
          placeholder="Loan Amount"
          className="border p-2 mb-2 w-full"
          value={formData.amount}
          onChange={handleChange}
        />
        <input
          type="text"
          name="firstName"
          placeholder="First Name"
          className="border p-2 mb-2 w-full"
          value={formData.firstName}
          onChange={handleChange}
        />
        <input
          type="text"
          name="lastName"
          placeholder="Last Name"
          className="border p-2 mb-2 w-full"
          value={formData.lastName}
          onChange={handleChange}
        />
        <input
          type="date"
          name="dob"
          placeholder="Date of Birth"
          className="border p-2 mb-2 w-full"
          value={formData.dob}
          onChange={handleChange}
        />
        <input
          type="text"
          name="company"
          placeholder="Company Name"
          className="border p-2 mb-2 w-full"
          value={formData.company}
          onChange={handleChange}
        />
        <input
          type="text"
          name="employment_status"
          placeholder="Employment Status"
          className="border p-2 mb-2 w-full"
          value={formData.employment_status}
          onChange={handleChange}
        />
        <input
          type="number"
          name="income"
          placeholder="Monthly Income"
          className="border p-2 mb-2 w-full"
          value={formData.income}
          onChange={handleChange}
        />
        <input
          type="text"
          name="job_title"
          placeholder="Job Title"
          className="border p-2 mb-2 w-full"
          value={formData.job_title}
          onChange={handleChange}
        />

        <button
          onClick={requestLoan}
          className="bg-green-500 text-white px-4 py-2 rounded-xl mt-2"
        >
          Submit Loan Request
        </button>
      </Modal>
    </div>
  );
}
