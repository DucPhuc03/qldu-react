import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import { Link } from "react-router-dom";

const Group = () => {
  const [groups, setGroups] = useState([
    {
      id: 1,
      name: "Nhóm 1",
      topic: "Xây dựng hệ thống quản lý đồ án",
      members: [
        { id: 1, name: "Nguyễn Văn A", role: "Nhóm trưởng" },
        { id: 2, name: "Trần Thị B", role: "Thành viên" },
        { id: 3, name: "Lê Văn C", role: "Thành viên" },
      ],
      status: "active",
      progress: 75,
      startDate: "01/03/2024",
      endDate: "01/06/2024",
    },
    {
      id: 2,
      name: "Nhóm 2",
      topic: "Ứng dụng di động quản lý nhà hàng",
      members: [
        { id: 4, name: "Phạm Thị D", role: "Nhóm trưởng" },
        { id: 5, name: "Hoàng Văn E", role: "Thành viên" },
      ],
      status: "pending",
      progress: 30,
      startDate: "15/03/2024",
      endDate: "15/06/2024",
    },
    {
      id: 3,
      name: "Nhóm 3",
      topic: "Hệ thống quản lý thư viện",
      members: [
        { id: 6, name: "Đỗ Thị F", role: "Nhóm trưởng" },
        { id: 7, name: "Vũ Văn G", role: "Thành viên" },
        { id: 8, name: "Ngô Thị H", role: "Thành viên" },
      ],
      status: "pending",
      progress: 45,
      startDate: "20/03/2024",
      endDate: "20/06/2024",
    },
  ]);

  const handleApprove = async (groupId, status) => {
    try {
      const response = await axios.patch(
        "http://localhost:8080/team/approval",
        {
          id: groupId,
          status: status,
        }
      );

      if (response.status === 200) {
        const updatedGroups = groups.map((group) => {
          if (group.id === groupId) {
            return { ...group, status: status };
          }
          return group;
        });
        setGroups(updatedGroups);

        alert(
          status === "APPROVED"
            ? "Đã duyệt nhóm thành công!"
            : "Đã từ chối nhóm!"
        );
      }
    } catch (error) {
      console.error("Error approving group:", error);
      alert("Có lỗi xảy ra khi duyệt nhóm!");
    }
  };

  return (
    <div>
      <div className="d-flex mt-3">
        <div className="sidebar">
          <Sidebar />
        </div>
        <div className="bg-light" style={{ width: "1200px" }}>
          <div className="header d-flex align-items-center justify-content-end mt-3 me-3">
            <i className="fa-solid fa-envelope fs-4"></i>
            <i className="fa-solid fa-user-nurse ms-3 fs-4"></i>
            <p className="mb-0 ms-1 fs-5">Nguyễn Đức Phức</p>
          </div>

          <div className="container-fluid p-4">
            {/* Header Section */}
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mb-0">Quản lý nhóm</h3>
              <div className="d-flex gap-2">
                <div className="input-group" style={{ width: "300px" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm nhóm..."
                  />
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>

            {/* Statistics Cards */}
            <div className="row mb-4">
              <div className="col-md-3">
                <div className="card bg-primary text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="card-title mb-0">Tổng số nhóm</h6>
                        <h2 className="mt-2 mb-0">{groups.length}</h2>
                      </div>
                      <i className="fas fa-users fa-2x"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-success text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="card-title mb-0">Đã duyệt</h6>
                        <h2 className="mt-2 mb-0">
                          {groups.filter((g) => g.status === "active").length}
                        </h2>
                      </div>
                      <i className="fas fa-check-circle fa-2x"></i>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-md-3">
                <div className="card bg-warning text-white">
                  <div className="card-body">
                    <div className="d-flex justify-content-between align-items-center">
                      <div>
                        <h6 className="card-title mb-0">Chờ duyệt</h6>
                        <h2 className="mt-2 mb-0">
                          {groups.filter((g) => g.status === "pending").length}
                        </h2>
                      </div>
                      <i className="fas fa-clock fa-2x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Groups List */}
            <div className="row">
              {groups.map((group) => (
                <div key={group.id} className="col-md-6 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-header bg-white">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5 className="card-title mb-0">{group.name}</h5>
                        <span
                          className={`badge ${
                            group.status === "active"
                              ? "bg-success"
                              : group.status === "pending"
                              ? "bg-warning"
                              : "bg-secondary"
                          }`}
                        >
                          {group.status === "active"
                            ? "Đã duyệt"
                            : group.status === "pending"
                            ? "Chờ duyệt"
                            : "Đã kết thúc"}
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <h6 className="text-muted mb-2">Đề tài:</h6>
                        <p className="mb-0">{group.topic}</p>
                      </div>

                      <div className="mb-3">
                        <h6 className="text-muted mb-2">Thành viên:</h6>
                        <div>
                          {group.members.map((member) => (
                            <span key={member.id} className="member-badge">
                              <i className="fas fa-user me-1"></i>
                              {member.name}
                              <small className="ms-1 text-muted">
                                ({member.role})
                              </small>
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="row mb-3">
                        <div className="col-6">
                          <small className="text-muted">Ngày bắt đầu:</small>
                          <p className="mb-0">{group.startDate}</p>
                        </div>
                        <div className="col-6">
                          <small className="text-muted">Ngày kết thúc:</small>
                          <p className="mb-0">{group.endDate}</p>
                        </div>
                      </div>

                      <div className="progress mb-3" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: `${group.progress}%` }}
                          aria-valuenow={group.progress}
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>

                      <div className="d-flex justify-content-between align-items-center">
                        <div className="text-muted small">
                          <i className="fas fa-users me-1"></i>
                          {group.members.length} thành viên
                        </div>
                        <div className="text-muted small">
                          <i className="fas fa-tasks me-1"></i>
                          {group.progress}% hoàn thành
                        </div>
                      </div>
                    </div>
                    <div className="card-footer bg-white">
                      <div className="d-flex justify-content-between">
                        <Link
                          to={`/nhom/${group.id}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          <i className="fas fa-eye me-1"></i> Chi tiết
                        </Link>
                        {group.status === "pending" ? (
                          <div className="btn-group">
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={() =>
                                handleApprove(group.id, "APPROVED")
                              }
                            >
                              <i className="fas fa-check me-1"></i> Duyệt
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() =>
                                handleApprove(group.id, "REJECTED")
                              }
                            >
                              <i className="fas fa-times me-1"></i> Từ chối
                            </button>
                          </div>
                        ) : (
                          <div className="btn-group">
                            <button className="btn btn-outline-success btn-sm">
                              <i className="fas fa-edit me-1"></i> Sửa
                            </button>
                            <button className="btn btn-outline-danger btn-sm">
                              <i className="fas fa-trash me-1"></i> Xóa
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Group;
