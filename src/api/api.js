import axiosInstance from "./axiosInstance";

// Auth APIs
export const loginUser = (data) => axiosInstance.post("/auth/login", data);

export const registerUser = (data) =>
  axiosInstance.post("/auth/register", data);

// Payroll APIs
export const getPayrolls = () => axiosInstance.get("/payroll");

export const createPayroll = (data) => axiosInstance.post("/payroll", data);

export const updatePayroll = (id, data) =>
  axiosInstance.put(`/payroll/${id}`, data);

export const deletePayroll = (id) => axiosInstance.delete(`/payroll/${id}`);

export const calculateNetPay = (data) =>
  axiosInstance.post("/payroll/netpay", data);

export const getPayrollAnomalies = () =>
  axiosInstance.get("/payroll/anomalies");
