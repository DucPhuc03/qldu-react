import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !password) {
      setError("Vui lòng nhập đầy đủ thông tin!");
      return;
    }
    setError("");
    try {
      const res = await fetch("http://localhost:8080/api/v1/user/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      if (res.ok) {
        const data = await res.json();
        // Giả sử backend trả về { token: "..." }
        localStorage.setItem("token", data.token || "");
        navigate("/do-an");
      } else {
        setError("Tài khoản hoặc mật khẩu không đúng!");
      }
    } catch (err) {
      setError("Lỗi kết nối đến máy chủ!");
    }
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center bg-light"
      style={{ minHeight: "100vh", minWidth: "100vw" }}
    >
      <div
        className="card shadow p-4"
        style={{
          minWidth: 350,
          maxWidth: 400,
          borderRadius: 16,
          boxShadow: "0 4px 24px rgba(0,0,0,0.08)",
        }}
      >
        <div className="text-center mb-4">
          <i className="fas fa-graduation-cap fa-3x text-primary mb-2"></i>
          <h3 className="fw-bold">Đăng nhập</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Tài khoản</label>
            <input
              type="text"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Nhập tài khoản hoặc email"
            />
          </div>
          <div className="mb-3">
            <label className="form-label">Mật khẩu</label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Nhập mật khẩu"
            />
          </div>
          {error && <div className="alert alert-danger py-2">{error}</div>}
          <button type="submit" className="btn btn-primary w-100 mt-2">
            Đăng nhập
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
