import React from "react";
import "./RoleSelect.css";
import { useNavigate } from "react-router-dom";
import { RiAdminFill } from "react-icons/ri";
import { FaUser } from "react-icons/fa";
function RoleSelect() {
  const navigate = useNavigate();

  return (
    <div className="roleselec-main">
      <div>
        <h1 className="pt-5">Inventory Management System</h1>
      </div>
      <div>
        <h3 className="mb-4">Select Role</h3>
        <button onClick={() => navigate("/admin/dashboard")} className="me-3">
          <RiAdminFill />
          <span className="ms-2">Admin</span>
        </button>
        <button onClick={() => navigate("/customer")}>
          <FaUser />
          <span className="ms-2">Customer</span>
        </button>
      </div>
      <div className="pb-5">
        Design by{" "}
        <a href="https://www.linkedin.com/in/vijay-sudhakar/" target="_blank">
          Vijay Sudhakar
        </a>
      </div>
    </div>
  );
}

export default RoleSelect;
