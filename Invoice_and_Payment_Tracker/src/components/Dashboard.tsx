import React, { useEffect, useState } from "react";
// import "./Dashboard.css";

const Dashboard: React.FC = () => {
  const [invoices, setInvoices] = useState(0);
  const [payments, setPayments] = useState(0);
  const [outstanding, setOutstanding] = useState(0);

  useEffect(() => {
    // Fetch data from an API or calculate the values here
    // Example hardcoded data for demonstration
    const fetchedInvoices = 120;
    const fetchedPayments = 80;
    const fetchedOutstanding = fetchedInvoices - fetchedPayments;

    setInvoices(fetchedInvoices);
    setPayments(fetchedPayments);
    setOutstanding(fetchedOutstanding);
  }, []);

  return (
    <div className="dashboard">
      <h2>Dashboard Overview</h2>
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Invoices</h3>
          <p>{invoices}</p>
        </div>
        <div className="card">
          <h3>Total Payments</h3>
          <p>{payments}</p>
        </div>
        <div className="card">
          <h3>Outstanding Amounts</h3>
          <p>{outstanding}</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
