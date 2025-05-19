import React, { useEffect, useState } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";

const Topic = () => {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:8080/team/5");
        setData(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id, status) => {
    try {
      const response = await axios.patch(
        "http://localhost:8080/api/topics/approval",
        {
          id: id,
          status: status,
        }
      );

      if (response.status === 200) {
        // Cập nhật lại danh sách sau khi duyệt
        const updatedData = data.map((item) => {
          if (item.id === id) {
            return { ...item, status: status };
          }
          return item;
        });
        setData(updatedData);

        // Hiển thị thông báo thành công
        alert(
          status === "APPROVED"
            ? "Đã duyệt đồ án thành công!"
            : "Đã từ chối đồ án!"
        );
      }
    } catch (error) {
      console.error("Error approving topic:", error);
      alert("Có lỗi xảy ra khi duyệt đồ án!");
    }
  };

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
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mb-0">Danh sách đồ án</h3>
              <div className="d-flex gap-2">
                <div className="input-group" style={{ width: "300px" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm đồ án..."
                  />
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
              </div>
            </div>

            <div className="row">
              {data.map((item) => (
                <div key={item.id} className="col-md-6 col-lg-4 mb-4">
                  <div className="card h-100 shadow-sm">
                    <div className="card-header bg-white">
                      <div className="d-flex justify-content-between align-items-center">
                        <h5
                          className="card-title mb-0 text-truncate"
                          style={{ maxWidth: "200px" }}
                        >
                          {item.topicName}
                        </h5>
                        <span
                          className={`badge ${
                            item.status != "PENDING"
                              ? "bg-success"
                              : item.status === "PENDING"
                              ? "bg-warning"
                              : "bg-secondary"
                          }`}
                        >
                          {item.status != "PENDING"
                            ? "Đã duyệt"
                            : item.status === "PENDING"
                            ? "Đang chờ"
                            : "Từ chối"}
                        </span>
                      </div>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <div className="d-flex align-items-center mb-2">
                          <i className="fas fa-users text-primary me-2"></i>
                          <span className="text-muted">Nhóm:</span>
                          <span className="ms-2 fw-bold">{item.groupName}</span>
                        </div>
                        <div className="d-flex align-items-center mb-2">
                          <i className="fas fa-calendar text-primary me-2"></i>
                          <span className="text-muted">Ngày bắt đầu:</span>
                          <span className="ms-2">01/03/2024</span>
                        </div>
                        <div className="d-flex align-items-center">
                          <i className="fas fa-calendar-check text-primary me-2"></i>
                          <span className="text-muted">Ngày kết thúc:</span>
                          <span className="ms-2">01/06/2024</span>
                        </div>
                      </div>

                      <div className="progress mb-3" style={{ height: "8px" }}>
                        <div
                          className="progress-bar bg-success"
                          role="progressbar"
                          style={{ width: "75%" }}
                          aria-valuenow="75"
                          aria-valuemin="0"
                          aria-valuemax="100"
                        ></div>
                      </div>

                      {/* <div className="d-flex justify-content-between align-items-center">
                          <div className="text-muted small">
                            <i className="fas fa-tasks me-1"></i>
                            3/4 nhiệm vụ hoàn thành
                          </div>
                          <div className="text-muted small">
                            <i className="fas fa-file me-1"></i>2 file đã nộp
                          </div>
                        </div> */}
                    </div>
                    <div className="card-footer bg-white">
                      <div className="d-flex justify-content-between">
                        <Link
                          to={`/do-an/${item.topicName}`}
                          className="btn btn-outline-primary btn-sm"
                        >
                          <i className="fas fa-eye me-1"></i> Chi tiết
                        </Link>
                        {item.status === "PENDING" && (
                          <div className="btn-group">
                            <button
                              className="btn btn-outline-success btn-sm"
                              onClick={() =>
                                handleApprove(item.topicId, "APPROVED")
                              }
                            >
                              <i className="fas fa-check me-1"></i> Duyệt
                            </button>
                            <button
                              className="btn btn-outline-danger btn-sm"
                              onClick={() =>
                                handleApprove(item.topicId, "REJECTED")
                              }
                            >
                              <i className="fas fa-times me-1"></i> Từ chối
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

export default Topic;
