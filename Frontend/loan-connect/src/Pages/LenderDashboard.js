import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/axiosconfig";
import Modal from "../components/Modal";

export default function LenderDashboard() {
  const [plans, setPlans] = useState([]);
  const [requests, setRequests] = useState([]);
  const [newPlan, setNewPlan] = useState({
    Title: "",
    InterestRate: "",
    DurationInMonths: "",
    MaxAmount: ""
  });
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [editPlan, setEditPlan] = useState(null);
  const navigate = useNavigate();

  // fetch data when page loads
  useEffect(() => {
    const fetchData = async () => {
      try {
        const plansRes = await api.get("/Lender/GetPlans");
        setPlans(plansRes.data);

        const reqRes = await api.get("/Lender/GetRequests");
        setRequests(reqRes.data);
      } catch (err) {
        if (err.response?.status === 401) {
          alert("Session expired. Please login again.");
          navigate("/login");
        } else {
          console.error(err);
        }
      }
    };
    fetchData();
  }, [navigate]);

  // Add new plan
  const addPlan = async () => {
    try {
      const formData = new FormData();
      formData.append("title", newPlan.Title);
      formData.append("interestRate", newPlan.InterestRate);
      formData.append("duration", newPlan.DurationInMonths); // ✅ backend expects "duration"
      formData.append("amount", newPlan.MaxAmount);

      await api.post("/Lender/Add_plan", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Plan added!");
      setOpenAdd(false);

      // refresh plans
      const res = await api.get("/Lender/GetPlans");
      setPlans(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to add plan");
    }
  };

  // Edit existing plan
  const saveEditPlan = async () => {
    try {
      const formData = new FormData();
      formData.append("id", editPlan.id);
      formData.append("Title", editPlan.Title);
      formData.append("amount", editPlan.MaxAmount);
      formData.append("interest", editPlan.InterestRate);
      formData.append("Duration", editPlan.DurationInMonths);

      await api.put("/Lender/EditPlan", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert("Plan updated!");
      setOpenEdit(false);
      setEditPlan(null);

      // refresh plans
      const res = await api.get("/Lender/GetPlans");
      setPlans(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to update plan");
    }
  };

  // approve/deny request
  const updateStatus = async (id, status) => {
    try {
      const formData = new FormData();
      formData.append("requestId", id);
      formData.append("status", status);

      await api.post("/Lender/StatusUpdate", formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });

      alert(`Request ${status}`);
      // refresh requests
      const res = await api.get("/Lender/GetRequests");
      setRequests(res.data);
    } catch (err) {
      console.error(err);
      alert(err.response?.data || "Failed to update status");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Lender Dashboard</h2>

      {/* Add Plan Button */}
      <button
        onClick={() => setOpenAdd(true)}
        className="bg-blue-500 text-white px-6 py-2 rounded-xl mb-6"
      >
        + Add Plan
      </button>

      {/* Existing Plans */}
      <h3 className="font-bold mb-2">Your Loan Plans</h3>
      {plans.length === 0 ? (
        <p className="mb-4 text-gray-500">No plans created yet.</p>
      ) : (
        <ul className="mb-6">
          {plans.map((p) => (
            <li
              key={p.id}
              className="border p-3 rounded-xl mb-2 flex justify-between items-center"
            >
              <span>
                {p.title} - {p.interestRate}% for {p.durationInMonths} months{" "}
                (Max: {p.maxLoanAmount})
              </span>
              <button
                className="bg-yellow-500 text-white px-3 py-1 rounded-xl"
                onClick={() => {
                  setEditPlan({
                    id: p.id,
                    Title: p.title,
                    InterestRate: p.interestRate,
                    DurationInMonths: p.durationInMonths,
                    MaxAmount: p.maxLoanAmount
                  });
                  setOpenEdit(true);
                }}
              >
                Edit
              </button>
            </li>
          ))}
        </ul>
      )}

      {/* Requests Section */}
      <h3 className="font-bold mb-2">Loan Requests</h3>
      {requests.length === 0 ? (
        <p className="text-gray-500">No requests yet.</p>
      ) : (
        requests.map((r) => (
          <div
            key={r.id}
            className="border p-4 rounded-xl flex justify-between items-center mb-2"
          >
            <span>
              {r.firstName} {r.lastName} - {r.amount} ({r.status})
            </span>
            <div className="space-x-2">
              <button
                className="bg-green-500 px-4 py-1 text-white rounded-xl"
                onClick={() => updateStatus(r.id, "Approved")}
              >
                Approve
              </button>
              <button
                className="bg-red-500 px-4 py-1 text-white rounded-xl"
                onClick={() => updateStatus(r.id, "Denied")}
              >
                Deny
              </button>
            </div>
          </div>
        ))
      )}

      {/* Modal for Adding Plan */}
      <Modal isOpen={openAdd} onClose={() => setOpenAdd(false)}>
        <h3 className="text-lg font-bold mb-4">Add New Plan</h3>
        <input
          placeholder="Title"
          className="border p-2 mb-2 w-full"
          onChange={(e) => setNewPlan({ ...newPlan, Title: e.target.value })}
        />
        <input
          placeholder="Interest Rate"
          type="number"
          className="border p-2 mb-2 w-full"
          onChange={(e) =>
            setNewPlan({ ...newPlan, InterestRate: e.target.value })
          }
        />
        <input
          placeholder="Duration (months)"
          type="number"
          className="border p-2 mb-2 w-full"
          onChange={(e) =>
            setNewPlan({ ...newPlan, DurationInMonths: e.target.value })
          }
        />
        <input
          placeholder="Max Loan Amount"
          type="number"
          className="border p-2 mb-2 w-full"
          onChange={(e) =>
            setNewPlan({ ...newPlan, MaxAmount: e.target.value })
          }
        />
        <button
          onClick={addPlan}
          className="bg-blue-500 text-white px-4 py-2 rounded-xl"
        >
          Add
        </button>
      </Modal>

      {/* Modal for Editing Plan */}
      <Modal isOpen={openEdit} onClose={() => setOpenEdit(false)}>
        <h3 className="text-lg font-bold mb-4">Edit Plan</h3>
        <input
          placeholder="Title"
          className="border p-2 mb-2 w-full"
          value={editPlan?.Title || ""}
          onChange={(e) => setEditPlan({ ...editPlan, Title: e.target.value })}
        />
        <input
          placeholder="Interest Rate"
          type="number"
          className="border p-2 mb-2 w-full"
          value={editPlan?.InterestRate || ""}
          onChange={(e) =>
            setEditPlan({ ...editPlan, InterestRate: e.target.value })
          }
        />
        <input
          placeholder="Duration (months)"
          type="number"
          className="border p-2 mb-2 w-full"
          value={editPlan?.DurationInMonths || ""}
          onChange={(e) =>
            setEditPlan({ ...editPlan, DurationInMonths: e.target.value })
          }
        />
        <input
          placeholder="Max Loan Amount"
          type="number"
          className="border p-2 mb-2 w-full"
          value={editPlan?.MaxAmount || ""}
          onChange={(e) =>
            setEditPlan({ ...editPlan, MaxAmount: e.target.value })
          }
        />
        <button
          onClick={saveEditPlan}
          className="bg-yellow-500 text-white px-4 py-2 rounded-xl"
        >
          Save Changes
        </button>
      </Modal>
    </div>
  );
}
