// src/Sidebar.js
import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Sidebar.css";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      path: "/hoi-dong",
      name: "Hội đồng tham gia",
      icon: "fa-users",
    },
    {
      path: "/nhom-do-an",
      name: "Nhóm hướng dẫn",
      icon: "fa-user-graduate",
    },
    {
      path: "/sinh-vien",
      name: "Sinh viên hướng dẫn",
      icon: "fa-user-friends",
    },
    {
      path: "/do-an",
      name: "Đồ án hướng dẫn",
      icon: "fa-project-diagram",
    },
    {
      path: "/tin-tuc",
      name: "Tin tức",
      icon: "fa-newspaper",
    },
  ];

  return (
    <div className="sidebar">
      <h2>
        <i className="fas fa-graduation-cap me-2"></i>
        Quản lý đồ án
      </h2>
      <ul>
        {menuItems.map((item) => (
          <li key={item.path}>
            <Link
              to={item.path}
              className={location.pathname === item.path ? "active" : ""}
            >
              <i className={`fas ${item.icon}`}></i>
              <span>{item.name}</span>
            </Link>
          </li>
        ))}
      </ul>
      <hr style={{ borderColor: "rgba(255,255,255,0.1)" }} />
      <button
        className="btn btn-danger w-100 mt-3"
        style={{ background: "#e74c3c", border: "none" }}
        onClick={() => {
          localStorage.clear();
          window.location.href = "/login";
        }}
      >
        <i className="fas fa-sign-out-alt me-2"></i> Đăng xuất
      </button>
    </div>
  );
};

export default Sidebar;
