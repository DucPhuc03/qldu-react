import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/sidebar/Sidebar";

const CouncilDetail = () => {
  const [councilData, setCouncilData] = useState({
    id: 1,
    name: "Hội đồng bảo vệ đồ án 1",
    code: "HD001",
    chairman: "Nguyễn Văn A",
    secretary: "Trần Thị B",
    reviewer: "Lê Văn C",
    startTime: "15/03/2024",
    location: "Phòng A101",
  });

  const [topics, setTopics] = useState([
    {
      id: 1,
      topicName: "Xây dựng hệ thống quản lý đồ án",
      groupName: "Nhóm 1",
      lecturer: "Nguyễn Văn D",
      status: "APPROVED",
      progress: 75,
      startDate: "01/03/2024",
      endDate: "01/06/2024",
      members: [
        { id: 1, name: "Nguyễn Văn A", role: "Nhóm trưởng" },
        { id: 2, name: "Trần Thị B", role: "Thành viên" },
        { id: 3, name: "Lê Văn C", role: "Thành viên" },
      ],
    },
    {
      id: 2,
      topicName: "Ứng dụng di động quản lý nhà hàng",
      groupName: "Nhóm 2",
      lecturer: "Phạm Thị E",
      status: "PENDING",
      progress: 30,
      startDate: "15/03/2024",
      endDate: "15/06/2024",
      members: [
        { id: 4, name: "Phạm Thị D", role: "Nhóm trưởng" },
        { id: 5, name: "Hoàng Văn E", role: "Thành viên" },
      ],
    },
    {
      id: 3,
      topicName: "Hệ thống quản lý thư viện",
      groupName: "Nhóm 3",
      lecturer: "Hoàng Văn F",
      status: "REJECTED",
      progress: 0,
      startDate: "20/03/2024",
      endDate: "20/06/2024",
      members: [
        { id: 6, name: "Đỗ Thị F", role: "Nhóm trưởng" },
        { id: 7, name: "Vũ Văn G", role: "Thành viên" },
        { id: 8, name: "Ngô Thị H", role: "Thành viên" },
      ],
    },
    {
      id: 4,
      topicName: "Website bán hàng trực tuyến",
      groupName: "Nhóm 4",
      lecturer: "Đinh Văn I",
      status: "APPROVED",
      progress: 90,
      startDate: "10/03/2024",
      endDate: "10/06/2024",
      members: [
        { id: 9, name: "Đinh Văn I", role: "Nhóm trưởng" },
        { id: 10, name: "Lý Thị K", role: "Thành viên" },
      ],
    },
  ]);

  const { councilId } = useParams();

  // useEffect(() => {
  //   const fetchCouncilData = async () => {
  //     try {
  //       // Fetch council details
  //       const councilResponse = await axios.get(
  //         `http://localhost:8080/council/${councilId}`
  //       );
  //       setCouncilData(councilResponse.data.result);

  //       // Fetch topics of this council
  //       const topicsResponse = await axios.get(
  //         `http://localhost:8080/council/${councilId}/topics`
  //       );
  //       setTopics(topicsResponse.data.result);
  //     } catch (error) {
  //       console.error("Error fetching council data:", error);
  //     }
  //   };

  //   fetchCouncilData();
  // }, [councilId]);

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
            <div className="mb-4">
              <h3 className="mb-3">Thông tin hội đồng</h3>
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title">{councilData.name}</h5>
                  <div className="row mt-3">
                    <div className="col-md-6">
                      <p>
                        <strong>Mã hội đồng:</strong> {councilData.code}
                      </p>
                      <p>
                        <strong>Chủ tịch hội đồng:</strong>{" "}
                        {councilData.chairman}
                      </p>
                      <p>
                        <strong>Thời gian:</strong> {councilData.startTime}
                      </p>
                    </div>
                    <div className="col-md-6">
                      <p>
                        <strong>Thư ký:</strong> {councilData.secretary}
                      </p>
                      <p>
                        <strong>Phản biện:</strong> {councilData.reviewer}
                      </p>
                      <p>
                        <strong>Địa điểm:</strong> {councilData.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <h3 className="mb-3">Danh sách đề tài</h3>
              <div className="row">
                {topics.map((topic) => (
                  <div key={topic.id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card h-100 shadow-sm">
                      <div className="card-header bg-white">
                        <div className="d-flex justify-content-between align-items-center">
                          <h5
                            className="card-title mb-0 text-truncate"
                            style={{ maxWidth: "200px" }}
                          >
                            {topic.topicName}
                          </h5>
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
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-users text-primary me-2"></i>
                            <span className="text-muted">Nhóm:</span>
                            <span className="ms-2 fw-bold">
                              {topic.groupName}
                            </span>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-user text-primary me-2"></i>
                            <span className="text-muted">
                              Giảng viên hướng dẫn:
                            </span>
                            <span className="ms-2">{topic.lecturer}</span>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-calendar text-primary me-2"></i>
                            <span className="text-muted">Thời gian:</span>
                            <span className="ms-2">
                              {topic.startDate} - {topic.endDate}
                            </span>
                          </div>
                        </div>

                        <div
                          className="progress mb-3"
                          style={{ height: "8px" }}
                        >
                          <div
                            className="progress-bar bg-success"
                            role="progressbar"
                            style={{ width: `${topic.progress}%` }}
                            aria-valuenow={topic.progress}
                            aria-valuemin="0"
                            aria-valuemax="100"
                          ></div>
                        </div>

                        <div className="d-flex justify-content-between align-items-center">
                          <div className="text-muted small">
                            <i className="fas fa-users me-1"></i>
                            {topic.members.length} thành viên
                          </div>
                          <div className="text-muted small">
                            <i className="fas fa-tasks me-1"></i>
                            {topic.progress}% hoàn thành
                          </div>
                        </div>
                      </div>
                      <div className="card-footer bg-white">
                        <button className="btn btn-outline-primary btn-sm">
                          <i className="fas fa-eye me-1"></i> Xem chi tiết
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CouncilDetail;
