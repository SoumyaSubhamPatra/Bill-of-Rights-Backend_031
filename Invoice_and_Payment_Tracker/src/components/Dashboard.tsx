import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from '../store/index'; // Adjust the path according to your project structure
import '../styles/dashboard.css'; // Adjust the path according to your project structure

const Dashboard: React.FC = () => {
  const invoices = useSelector((state: RootState) => state.invoices.invoices);
  const customers = useSelector((state: RootState) => state.customers.customers);

  const [totalInvoices, setTotalInvoices] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [paidCount, setPaidCount] = useState(0);
  const [unpaidCount, setUnpaidCount] = useState(0);
  const [overdueCount, setOverdueCount] = useState(0);
  const [customerCount, setCustomerCount] = useState(0);

  useEffect(() => {
    if (invoices) {
      const currentDate = new Date().toISOString().split('T')[0]; // Get the current date in YYYY-MM-DD format
      
      // Total invoices count
      const totalInvoices = invoices.length;

      // Calculate total payments for invoices with status "Paid"
      const totalPayments = invoices
        .filter(invoice => invoice.status === "Paid")
        .reduce((sum, invoice) => sum + invoice.totalAmount, 0);

      // Count of paid invoices
      const paidCount = invoices.filter(invoice => invoice.status === "Paid").length;
      
      // Count of unpaid invoices
      const unpaidCount = invoices.filter(invoice => invoice.status === "Unpaid").length;
      
      // Count of overdue invoices
      const overdueCount = invoices.filter(invoice => 
        invoice.status === "Unpaid" && invoice.dueDate < currentDate
      ).length;

      setTotalInvoices(totalInvoices);
      setTotalPayments(totalPayments);
      setPaidCount(paidCount);
      setUnpaidCount(unpaidCount);
      setOverdueCount(overdueCount);
    }
  }, [invoices]);

  useEffect(() => {
    if (customers) {
      setCustomerCount(customers.length);
    }
  }, [customers]);

  return (
    <div className="dashboard">
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Invoices</h3>
          <p>{totalInvoices}</p>
        </div>
        <div className="card">
          <h3>Total Payments</h3>
          <p>${totalPayments.toFixed(2)}</p>
        </div>
        <div className="card">
          <h3>Paid Invoices</h3>
          <p>{paidCount}</p>
        </div>
        <div className="card">
          <h3>Unpaid Invoices</h3>
          <p>{unpaidCount}</p>
        </div>
        <div className="card">
          <h3>Overdue Invoices</h3>
          <p>{overdueCount}</p>
        </div>
        <div className="card">
          <h3>Customer Count</h3>
          <p>{customerCount}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
