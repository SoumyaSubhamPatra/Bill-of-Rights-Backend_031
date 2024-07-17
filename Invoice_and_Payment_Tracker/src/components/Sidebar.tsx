// Sidebar.tsx
import React from "react";
import { Link } from "react-router-dom";
import {
  FaTachometerAlt,
  FaFileInvoiceDollar,
  FaBox,
  FaUsers,
  FaUserCog,
} from "react-icons/fa";

const Sidebar: React.FC = () => {
  return (
    <div className="sidebar">
      <ul className="sidebar-menu">
        <li>
          <Link to="/dashboard">
            <FaTachometerAlt className="sidebar-icon" />
            Dashboard
          </Link>
        </li>
        <li>
          <Link to="/invoice">
            <FaFileInvoiceDollar className="sidebar-icon" />
            Invoice
          </Link>
        </li>
        <li>
          <Link to="/product">
            <FaBox className="sidebar-icon" />
            Product
          </Link>
        </li>
        <li>
          <Link to="/customer">
            <FaUsers className="sidebar-icon" />
            Customer
          </Link>
        </li>
        <li>
          <Link to="/system-users">
            <FaUserCog className="sidebar-icon" />
            System Users
          </Link>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
