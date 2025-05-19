import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useParams } from "react-router-dom";

const TopicDetail = () => {
  const { topicName } = useParams();
  const [topic, setTopic] = useState({
    name: "Xây dựng hệ thống quản lý đồ án",
    groupName: "Nhóm 1",
    status: "APPROVED",
    startDate: "01/03/2024",
    endDate: "01/06/2024",
    description: "Xây dựng hệ thống quản lý đồ án cho sinh viên và giảng viên",
    members: [
      {
        id: 1,
        name: "Nguyễn Văn A",
        studentId: "SV001",
        role: "Nhóm trưởng",
        email: "nguyenvana@example.com",
      },
      {
        id: 2,
        name: "Trần Thị B",
        studentId: "SV002",
        role: "Thành viên",
        email: "tranthib@example.com",
      },
      {
        id: 3,
        name: "Lê Văn C",
        studentId: "SV003",
        role: "Thành viên",
        email: "levanc@example.com",
      },
    ],
    files: [
      {
        id: 1,
        name: "Báo cáo tiến độ.docx",
        uploadDate: "15/03/2024",
        status: "Đã duyệt",
        score: 8.5,
      },
      {
        id: 2,
        name: "Source code.zip",
        uploadDate: "20/03/2024",
        status: "Chờ duyệt",
        score: null,
      },
    ],
    tasks: [
      {
        id: 1,
        title: "Hoàn thiện giao diện người dùng",
        deadline: "25/03/2024",
        status: "Đang thực hiện",
        assignedTo: "Nguyễn Văn A",
      },
      {
        id: 2,
        title: "Viết báo cáo tiến độ",
        deadline: "30/03/2024",
        status: "Đã hoàn thành",
        assignedTo: "Trần Thị B",
      },
    ],
  });

  return (
    <div>
      <div className="d-flex mt-3">
        <div className="sidebar">
          <Sidebar></Sidebar>
        </div>
        <div className="bg-light" style={{ width: "1200px" }}>
          <div className="header d-flex align-items-center justify-content-end mt-3 me-3">
            <i className="fa-solid fa-envelope fs-4"></i>
            <i className="fa-solid fa-user-nurse ms-3 fs-4"></i>
            <p className="mb-0 ms-1 fs-5">Nguyễn Đức Phức</p>
          </div>

          <div className="container-fluid p-4">
            {/* Header Section */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">{topic.name}</h3>
                  <span
                    className={`badge ${
                      topic.status === "APPROVED"
                        ? "bg-success"
                        : topic.status === "PENDING"
                        ? "bg-warning"
                        : "bg-secondary"
                    }`}
                  >
                    {topic.status === "APPROVED"
                      ? "Đã duyệt"
                      : topic.status === "PENDING"
                      ? "Đang chờ"
                      : "Từ chối"}
                  </span>
                </div>
                <p className="text-muted mt-2">{topic.description}</p>
                <div className="row mt-3">
                  <div className="col-md-4">
                    <p>
                      <strong>Nhóm:</strong> {topic.groupName}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <strong>Ngày bắt đầu:</strong> {topic.startDate}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <strong>Ngày kết thúc:</strong> {topic.endDate}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tabs Section */}
            <ul className="nav nav-tabs mb-4" id="topicTabs" role="tablist">
              <li className="nav-item">
                <a
                  className="nav-link active"
                  id="members-tab"
                  data-bs-toggle="tab"
                  href="#members"
                  role="tab"
                >
                  <i className="fas fa-users me-2"></i>Thành viên
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="files-tab"
                  data-bs-toggle="tab"
                  href="#files"
                  role="tab"
                >
                  <i className="fas fa-file me-2"></i>File đã nộp
                </a>
              </li>
              <li className="nav-item">
                <a
                  className="nav-link"
                  id="tasks-tab"
                  data-bs-toggle="tab"
                  href="#tasks"
                  role="tab"
                >
                  <i className="fas fa-tasks me-2"></i>Nhiệm vụ
                </a>
              </li>
            </ul>

            {/* Tab Content */}
            <div className="tab-content" id="topicTabContent">
              {/* Members Tab */}
              <div
                className="tab-pane fade show active"
                id="members"
                role="tabpanel"
              >
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Mã SV</th>
                            <th>Họ tên</th>
                            <th>Vai trò</th>
                            <th>Email</th>
                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topic.members.map((member) => (
                            <tr key={member.id}>
                              <td>{member.studentId}</td>
                              <td>{member.name}</td>
                              <td>{member.role}</td>
                              <td>{member.email}</td>
                              <td>
                                <button className="btn btn-sm btn-primary me-2">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-sm btn-danger">
                                  <i className="fas fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Files Tab */}
              <div className="tab-pane fade" id="files" role="tabpanel">
                <div className="card">
                  <div className="card-body">
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Tên file</th>
                            <th>Ngày nộp</th>
                            <th>Trạng thái</th>
                            <th>Điểm</th>
                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topic.files.map((file) => (
                            <tr key={file.id}>
                              <td>{file.name}</td>
                              <td>{file.uploadDate}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    file.status === "Đã duyệt"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  {file.status}
                                </span>
                              </td>
                              <td>{file.score || "Chưa chấm"}</td>
                              <td>
                                <button className="btn btn-sm btn-primary me-2">
                                  <i className="fas fa-download"></i>
                                </button>
                                <button className="btn btn-sm btn-success me-2">
                                  <i className="fas fa-check"></i>
                                </button>
                                <button className="btn btn-sm btn-warning">
                                  <i className="fas fa-star"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tasks Tab */}
              <div className="tab-pane fade" id="tasks" role="tabpanel">
                <div className="card">
                  <div className="card-body">
                    <div className="d-flex justify-content-end mb-3">
                      <button className="btn btn-primary">
                        <i className="fas fa-plus me-2"></i>Tạo nhiệm vụ mới
                      </button>
                    </div>
                    <div className="table-responsive">
                      <table className="table table-hover">
                        <thead>
                          <tr>
                            <th>Tên nhiệm vụ</th>
                            <th>Deadline</th>
                            <th>Trạng thái</th>

                            <th>Hành động</th>
                          </tr>
                        </thead>
                        <tbody>
                          {topic.tasks.map((task) => (
                            <tr key={task.id}>
                              <td>{task.title}</td>
                              <td>{task.deadline}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    task.status === "Đang thực hiện"
                                      ? "bg-info"
                                      : task.status === "Hoàn thành"
                                      ? "bg-success"
                                      : "bg-secondary"
                                  }`}
                                >
                                  {task.status}
                                </span>
                              </td>

                              <td>
                                <button className="btn btn-sm btn-primary me-2">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button className="btn btn-sm btn-danger">
                                  <i className="fas fa-trash"></i>
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TopicDetail;
