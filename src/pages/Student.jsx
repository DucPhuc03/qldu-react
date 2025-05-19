import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import axios from "axios";

const Student = () => {
  const [students, setStudents] = useState([
    // {
    //   id: 1,
    //   studentId: "SV001",
    //   name: "Nguyễn Văn A",
    //   email: "nguyenvana@example.com",
    //   phone: "0123456789",
    //   class: "CNTT1",
    //   major: "Công nghệ thông tin",
    //   projects: "Hệ thống IOT",
    // },
    // {
    //   id: 2,
    //   studentId: "SV002",
    //   name: "Trần Thị B",
    //   email: "tranthib@example.com",
    //   phone: "0987654321",
    //   class: "CNTT1",
    //   major: "Công nghệ thông tin",
    //   projects: "Ứng dụng Android",
    // },
    // {
    //   id: 3,
    //   studentId: "SV003",
    //   name: "Lê Văn C",
    //   email: "levanc@example.com",
    //   phone: "0369852147",
    //   class: "CNTT2",
    //   major: "Công nghệ thông tin",
    //   projects: "Ứng dungj Web",
    // },
  ]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/student_topic/1"
        );
        setStudents(response.data.result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
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
            <div className="d-flex justify-content-between align-items-center mb-4">
              <h3 className="mb-0">Danh sách sinh viên</h3>
              <div className="d-flex gap-2">
                <div className="input-group" style={{ width: "300px" }}>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Tìm kiếm sinh viên..."
                  />
                  <button className="btn btn-outline-secondary">
                    <i className="fas fa-search"></i>
                  </button>
                </div>
                <div className="dropdown">
                  <button
                    className="btn btn-outline-secondary dropdown-toggle"
                    type="button"
                    data-bs-toggle="dropdown"
                  >
                    <i className="fas fa-filter me-2"></i>Lọc
                  </button>
                  <ul className="dropdown-menu">
                    <li>
                      <a className="dropdown-item" href="#">
                        Lớp
                      </a>
                    </li>
                    <li>
                      <a className="dropdown-item" href="#">
                        Chuyên ngành
                      </a>
                    </li>
                  </ul>
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
                        <h6 className="card-title mb-0">Tổng số sinh viên</h6>
                        <h2 className="mt-2 mb-0">150</h2>
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
                        <h6 className="card-title mb-0">Đang thực hiện</h6>
                        <h2 className="mt-2 mb-0">45</h2>
                      </div>
                      <i className="fas fa-project-diagram fa-2x"></i>
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
                        <h2 className="mt-2 mb-0">12</h2>
                      </div>
                      <i className="fas fa-clock fa-2x"></i>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Students Table */}
            <div className="card">
              <div className="card-body">
                <div className="table-responsive">
                  <table className="table table-hover">
                    <thead>
                      <tr>
                        <th>Mã SV</th>
                        <th>Họ tên</th>
                        <th>Lớp</th>
                        <th>Chuyên ngành</th>
                        <th>Tên đồ án</th>

                        <th>Hành động</th>
                      </tr>
                    </thead>
                    <tbody>
                      {students.map((student) => (
                        <tr key={student.id}>
                          <td>{student.idNum}</td>
                          <td>
                            <div className="d-flex align-items-center">
                              {/* <div className="avatar-circle bg-primary text-white me-2">
                                {student.name.charAt(0)}
                              </div> */}
                              <div>
                                <div className="fw-bold">{student.name}</div>
                                <div className="small text-muted">
                                  {student.email}
                                </div>
                              </div>
                            </div>
                          </td>
                          <td>{student.course.name}</td>
                          <td>{student.major.name}</td>
                          <td>
                            <span className="badge bg-info">
                              {student.topicName}
                            </span>
                          </td>

                          <td>
                            <button className="btn btn-sm btn-outline-primary me-2">
                              <i className="fas fa-eye"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-success me-2">
                              <i className="fas fa-edit"></i>
                            </button>
                            <button className="btn btn-sm btn-outline-danger">
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
  );
};

export default Student;
