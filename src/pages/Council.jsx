import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Council = () => {
  const [councils, setCouncils] = useState([
    // {
    //   id: 1,
    //   name: "Hội đồng bảo vệ đồ án 1",
    //   date: "15/03/2024",
    //   location: "Phòng A101",
    //   status: "ACTIVE",
    //   members: [
    //     {
    //       id: 1,
    //       name: "Nguyễn Văn A",
    //       role: "Chủ tịch",
    //       specialization: "Công nghệ thông tin",
    //     },
    //     {
    //       id: 2,
    //       name: "Trần Thị B",
    //       role: "Thư ký",
    //       specialization: "Kỹ thuật phần mềm",
    //     },
    //     {
    //       id: 3,
    //       name: "Lê Văn C",
    //       role: "Ủy viên",
    //       specialization: "Hệ thống thông tin",
    //     },
    //   ],
    // },
    // {
    //   id: 2,
    //   name: "Hội đồng bảo vệ đồ án 2",
    //   date: "20/03/2024",
    //   location: "Phòng B203",
    //   status: "ACTIVE",
    //   members: [
    //     {
    //       id: 4,
    //       name: "Phạm Thị D",
    //       role: "Chủ tịch",
    //       specialization: "Công nghệ thông tin",
    //     },
    //     {
    //       id: 5,
    //       name: "Hoàng Văn E",
    //       role: "Thư ký",
    //       specialization: "Kỹ thuật phần mềm",
    //     },
    //     {
    //       id: 6,
    //       name: "Đỗ Thị F",
    //       role: "Ủy viên",
    //       specialization: "Hệ thống thông tin",
    //     },
    //   ],
    // },
    // {
    //   id: 3,
    //   name: "Hội đồng bảo vệ đồ án 3",
    //   date: "25/03/2024",
    //   location: "Phòng C305",
    //   status: "COMPLETED",
    //   members: [
    //     {
    //       id: 7,
    //       name: "Vũ Văn G",
    //       role: "Chủ tịch",
    //       specialization: "Công nghệ thông tin",
    //     },
    //     {
    //       id: 8,
    //       name: "Ngô Thị H",
    //       role: "Thư ký",
    //       specialization: "Kỹ thuật phần mềm",
    //     },
    //     {
    //       id: 9,
    //       name: "Đinh Văn I",
    //       role: "Ủy viên",
    //       specialization: "Hệ thống thông tin",
    //     },
    //   ],
    // },
  ]);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/api/councils/teacher/5"
        );
        setCouncils(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  console.log(councils);

  const handleViewDetail = (council) => {
    // Chuyển sang trang chi tiết với dữ liệu council
    navigate(`/hoi-dong/${council.id}`, {
      state: { councilData: council },
    });
  };

  return (
    <div>
      <div className="d-flex mt-3">
        <div className="sidebar">
          <Sidebar></Sidebar>
        </div>
        <div className="bg-light" style={{ width: "1200px" }}>
          <div
            className="header d-flex align-items-center justify-content-end mt-3 me-3 p-3 shadow rounded bg-white"
            style={{ minHeight: 70 }}
          >
            <div className="d-flex align-items-center gap-3">
              <div className="position-relative">
                <img
                  src="https://i.pravatar.cc/40?img=5"
                  alt="avatar"
                  className="rounded-circle border"
                  style={{ width: 40, height: 40, objectFit: "cover" }}
                />
                <span
                  className="position-absolute bottom-0 end-0 translate-middle p-1 bg-success border border-light rounded-circle"
                  style={{ width: 10, height: 10 }}
                ></span>
              </div>
              <div className="text-end">
                <div className="fw-bold" style={{ fontSize: 18 }}>
                  Trần Thị Mai
                </div>
                <div className="text-muted" style={{ fontSize: 13 }}>
                  Giảng viên
                </div>
              </div>
              <button className="btn btn-light border ms-3" title="Thông báo">
                <i className="fa-solid fa-envelope fs-5 text-primary"></i>
              </button>
            </div>
          </div>

          <div className="container-fluid p-4">
            <h3 className="mb-4">Danh sách hội đồng</h3>

            <div className="row">
              {councils.map((council) => (
                <div key={council.id} className="col-md-6 mb-4">
                  <div className="card">
                    <div className="card-header bg-primary text-white">
                      <h5 className="card-title mb-0">{council.name}</h5>
                    </div>
                    <div className="card-body">
                      <div className="mb-3">
                        <strong>Thời gian:</strong> {council.startTime}
                      </div>
                      <div className="mb-3">
                        <strong>Địa điểm:</strong> {council.location}
                      </div>
                      {/* <div className="mb-3">
                        <strong>Trạng thái:</strong>{" "}
                        <span
                          className={`badge ${
                            council.status === "ACTIVE"
                              ? "bg-success"
                              : council.status === "PENDING"
                              ? "bg-warning"
                              : "bg-secondary"
                          }`}
                        >
                          {council.status === "ACTIVE"
                            ? "Đang hoạt động"
                            : council.status === "PENDING"
                            ? "Chờ duyệt"
                            : "Đã kết thúc"}
                        </span>
                      </div> */}

                      <div className="mt-3">
                        <h6>Thành viên hội đồng:</h6>
                        <ul className="list-group">
                          {council.members?.map((member) => (
                            <li
                              key={member.id}
                              className="list-group-item d-flex justify-content-between align-items-center"
                            >
                              <div>
                                <i className="fas fa-user me-2"></i>
                                {member.name}
                                {/* <small className="text-muted ms-2">
                                  ({member.role})
                                </small> */}
                              </div>
                              <span className="badge bg-info">
                                {member.departmentName}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="mt-3">
                        <button
                          onClick={() => handleViewDetail(council)}
                          className="btn btn-primary me-2"
                        >
                          <i className="fas fa-eye me-1"></i> Xem chi tiết
                        </button>
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

export default Council;
