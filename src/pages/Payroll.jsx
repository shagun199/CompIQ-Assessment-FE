import { useEffect, useState } from "react";
import {
  getPayrolls,
  createPayroll,
  updatePayroll,
  deletePayroll,
  calculateNetPay,
  getPayrollAnomalies,
} from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Payroll() {
  const navigate = useNavigate();

  const [payrolls, setPayrolls] = useState([]);
  const [form, setForm] = useState({
    employee_id: "",
    name: "",
    department: "",
    salary: "",
    bonus: "",
    deductions: "",
  });
  const [editId, setEditId] = useState(null);

  const [netForm, setNetForm] = useState({
    salary: "",
    bonus: "",
    taxPercent: "",
    ssPercent: "",
    deductions: "",
  });
  const [netResult, setNetResult] = useState(null);
  const [anomalies, setAnomalies] = useState([]);

  // Fetch payrolls
  const fetchPayrolls = async () => {
    try {
      const res = await getPayrolls();
      setPayrolls(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  // Handle form submit
  const handleSubmit = async () => {
    try {
      const payload = {
        ...form,
        salary: Number(form.salary),
        bonus: Number(form.bonus),
        deductions: Number(form.deductions),
      };

      if (editId) {
        await updatePayroll(editId, payload);
        setEditId(null);
      } else {
        await createPayroll(payload);
      }

      setForm({
        employee_id: "",
        name: "",
        department: "",
        salary: "",
        bonus: "",
        deductions: "",
      });

      fetchPayrolls();
    } catch (err) {
      console.error(err);
    }
  };

  // Handle edit
  const handleEdit = (p) => {
    setEditId(p._id);
    setForm({
      employee_id: p.employee_id,
      name: p.name,
      department: p.department,
      salary: p.salary.toString(),
      bonus: p.bonus.toString(),
      deductions: p.deductions.toString(),
    });
  };

  // Handle delete
  const handleDelete = async (id) => {
    if (window.confirm("Are you sure?")) {
      await deletePayroll(id);
      fetchPayrolls();
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/auth");
  };

  const handleCalculateNet = async () => {
    try {
      const res = await calculateNetPay({
        salary: Number(netForm.salary),
        bonus: Number(netForm.bonus),
        taxPercent: Number(netForm.taxPercent),
        ssPercent: Number(netForm.ssPercent),
        deductions: Number(netForm.deductions),
      });
      setNetResult(res.data);
    } catch (err) {
      alert(err.response?.data?.error || "Error calculating net pay");
    }
  };

  const fetchAnomalies = async () => {
    try {
      const res = await getPayrollAnomalies();
      setAnomalies(res.data.anomalies);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchPayrolls();
    fetchAnomalies();
  }, []);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Payroll Management</h1>
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
        >
          Logout
        </button>
      </div>

      <div className="bg-white p-6 rounded shadow-md mt-6">
        <h2 className="text-xl mb-4">Payroll Anomalies</h2>
        {anomalies.length === 0 && (
          <p className="text-gray-500">No anomalies found.</p>
        )}
        {anomalies.map((p) => (
          <div key={p._id} className="border-b py-2">
            {p.name} - {p.department} - Salary: {p.salary}, Bonus: {p.bonus},
            Deductions: {p.deductions}
          </div>
        ))}
      </div>

      {/* Form */}
      <div className="bg-white p-6 rounded shadow-md mb-6">
        <h2 className="text-xl mb-4">
          {editId ? "Edit Payroll" : "Add Payroll"}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="text"
            placeholder="Employee ID"
            value={form.employee_id}
            onChange={(e) => setForm({ ...form, employee_id: e.target.value })}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="text"
            placeholder="Department"
            value={form.department}
            onChange={(e) => setForm({ ...form, department: e.target.value })}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Salary"
            value={form.salary}
            onChange={(e) => setForm({ ...form, salary: e.target.value })}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Bonus"
            value={form.bonus}
            onChange={(e) => setForm({ ...form, bonus: e.target.value })}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Deductions"
            value={form.deductions}
            onChange={(e) => setForm({ ...form, deductions: e.target.value })}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleSubmit}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          {editId ? "Update Payroll" : "Add Payroll"}
        </button>
      </div>

      {/* Payroll Table */}
      <div className="bg-white p-6 rounded shadow-md">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b">
              <th className="py-2 px-4">Employee ID</th>
              <th className="py-2 px-4">Name</th>
              <th className="py-2 px-4">Department</th>
              <th className="py-2 px-4">Salary</th>
              <th className="py-2 px-4">Bonus</th>
              <th className="py-2 px-4">Deductions</th>
              <th className="py-2 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {payrolls.map((p) => (
              <tr key={p._id} className="border-b hover:bg-gray-50">
                <td className="py-2 px-4">{p.employee_id}</td>
                <td className="py-2 px-4">{p.name}</td>
                <td className="py-2 px-4">{p.department}</td>
                <td className="py-2 px-4">{p.salary}</td>
                <td className="py-2 px-4">{p.bonus}</td>
                <td className="py-2 px-4">{p.deductions}</td>
                <td className="py-2 px-4 space-x-2">
                  <button
                    onClick={() => handleEdit(p)}
                    className="px-2 py-1 bg-yellow-400 rounded hover:bg-yellow-500"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(p._id)}
                    className="px-2 py-1 bg-red-500 rounded hover:bg-red-600 text-white"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {payrolls.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center py-4 text-gray-500">
                  No payrolls found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <div className="bg-white p-6 rounded shadow-md mt-6">
        <h2 className="text-xl mb-4">Net Pay Calculator</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input
            type="number"
            placeholder="Salary"
            value={netForm.salary}
            onChange={(e) => setNetForm({ ...netForm, salary: e.target.value })}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Bonus"
            value={netForm.bonus}
            onChange={(e) => setNetForm({ ...netForm, bonus: e.target.value })}
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Tax Percent"
            value={netForm.taxPercent}
            onChange={(e) =>
              setNetForm({ ...netForm, taxPercent: e.target.value })
            }
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Social Security %"
            value={netForm.ssPercent}
            onChange={(e) =>
              setNetForm({ ...netForm, ssPercent: e.target.value })
            }
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
          <input
            type="number"
            placeholder="Deductions"
            value={netForm.deductions}
            onChange={(e) =>
              setNetForm({ ...netForm, deductions: e.target.value })
            }
            className="p-2 border rounded focus:ring-2 focus:ring-blue-400"
          />
        </div>
        <button
          onClick={handleCalculateNet}
          className="mt-4 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Calculate Net Pay
        </button>

        {netResult && (
          <div className="mt-4 bg-gray-100 p-4 rounded">
            <p>Gross: {netResult.gross}</p>
            <p>Tax: {netResult.tax}</p>
            <p>Social Security: {netResult.social}</p>
            <p>Deductions: {netResult.deductions}</p>
            <p className="font-bold">Net Pay: {netResult.net}</p>
          </div>
        )}
      </div>
    </div>
  );
}
