import React, { useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import axios from "axios";
import Sidebar from "../components/sidebar/Sidebar";

const CouncilDetail = () => {
  const { councilId } = useParams();
  const location = useLocation();
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
    // {
    //   id: 1,
    //   topicName: "Xây dựng hệ thống quản lý đồ án",
    //   groupName: "Nhóm 1",
    //   lecturer: "Nguyễn Văn D",
    //   status: "APPROVED",
    //   progress: 75,
    //   startDate: "01/03/2024",
    //   endDate: "01/06/2024",
    //   members: [
    //     { id: 1, name: "Nguyễn Văn A", role: "Nhóm trưởng" },
    //     { id: 2, name: "Trần Thị B", role: "Thành viên" },
    //     { id: 3, name: "Lê Văn C", role: "Thành viên" },
    //   ],
    // },
    // {
    //   id: 2,
    //   topicName: "Ứng dụng di động quản lý nhà hàng",
    //   groupName: "Nhóm 2",
    //   lecturer: "Phạm Thị E",
    //   status: "PENDING",
    //   progress: 30,
    //   startDate: "15/03/2024",
    //   endDate: "15/06/2024",
    //   members: [
    //     { id: 4, name: "Phạm Thị D", role: "Nhóm trưởng" },
    //     { id: 5, name: "Hoàng Văn E", role: "Thành viên" },
    //   ],
    // },
    // {
    //   id: 3,
    //   topicName: "Hệ thống quản lý thư viện",
    //   groupName: "Nhóm 3",
    //   lecturer: "Hoàng Văn F",
    //   status: "REJECTED",
    //   progress: 0,
    //   startDate: "20/03/2024",
    //   endDate: "20/06/2024",
    //   members: [
    //     { id: 6, name: "Đỗ Thị F", role: "Nhóm trưởng" },
    //     { id: 7, name: "Vũ Văn G", role: "Thành viên" },
    //     { id: 8, name: "Ngô Thị H", role: "Thành viên" },
    //   ],
    // },
    // {
    //   id: 4,
    //   topicName: "Website bán hàng trực tuyến",
    //   groupName: "Nhóm 4",
    //   lecturer: "Đinh Văn I",
    //   status: "APPROVED",
    //   progress: 90,
    //   startDate: "10/03/2024",
    //   endDate: "10/06/2024",
    //   members: [
    //     { id: 9, name: "Đinh Văn I", role: "Nhóm trưởng" },
    //     { id: 10, name: "Lý Thị K", role: "Thành viên" },
    //   ],
    // },
  ]);

  // State cho modal chấm điểm
  const [showGradeModal, setShowGradeModal] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [gradeForm, setGradeForm] = useState({
    score: "",
    note: "",
  });

  // Hàm format thời gian từ LocalDateTime
  const formatDateTime = (dateTimeString) => {
    if (!dateTimeString) return "";

    try {
      const date = new Date(dateTimeString);
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateTimeString;
    }
  };

  // Hàm format chỉ ngày
  const formatDate = (dateString) => {
    if (!dateString) return "";

    try {
      const date = new Date(dateString);
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      console.error("Error formatting date:", error);
      return dateString;
    }
  };

  useEffect(() => {
    // Kiểm tra xem có dữ liệu council được truyền từ trang trước không
    if (location.state && location.state.councilData) {
      setCouncilData(location.state.councilData);
    }
    console.log(councilData);
    const fetchData = async () => {
      try {
        // Chỉ fetch từ API nếu không có dữ liệu từ state
        if (!location.state || !location.state.councilData) {
          // Fetch council details
          const councilResponse = await axios.get(
            `http://localhost:8080/api/councils/${councilId}`
          );
          if (councilResponse.data && councilResponse.data.result) {
            setCouncilData(councilResponse.data.result);
          }
        }

        // Fetch topics of this council
        const topicsResponse = await axios.get(
          `http://localhost:8080/api/councils/${councilId}/topics`
        );
        if (topicsResponse.data) {
          setTopics(topicsResponse.data);
        }
      } catch (error) {
        console.error("Error fetching council data:", error);
      }
    };

    fetchData();
  }, [councilId, location.state]);

  // Hàm mở modal chấm điểm
  const handleOpenGradeModal = (topic) => {
    setSelectedTopic(topic);
    setGradeForm({
      score: topic.grade?.score ?? "",
      note: topic.grade?.note ?? "",
    });
    setShowGradeModal(true);
  };

  // Hàm xử lý thay đổi điểm
  const handleGradeChange = (e) => {
    setGradeForm({ ...gradeForm, [e.target.name]: e.target.value });
  };

  // Hàm lưu điểm
  const handleSaveGrade = async () => {
    try {
      // Chuẩn bị dữ liệu để gửi API
      const gradeData = {
        id: selectedTopic.id,
        score: parseFloat(gradeForm.score) || 0,
        type: "DEFENSE", // Mặc định là điểm bảo vệ
      };

      // Gọi API cập nhật điểm
      const response = await axios.put(
        "http://localhost:8080/grade/update",
        gradeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Cập nhật state local
        const updatedTopics = topics.map((topic) => {
          if (topic.id === selectedTopic.id) {
            return {
              ...topic,
              grade: {
                ...topic.grade, // Giữ lại điểm cũ
                score: gradeForm.score, // Cập nhật điểm bảo vế
              },
            };
          }
          return topic;
        });
        setTopics(updatedTopics);

        setShowGradeModal(false);
        alert("Lưu điểm thành công!");
      } else {
        alert("Lưu điểm thất bại!");
      }
    } catch (error) {
      console.error("Error saving grade:", error);
      alert("Có lỗi xảy ra khi lưu điểm!");
    }
  };

  return (
    <div>
      <div className="d-flex mt-3">
        <div className="sidebar">
          <Sidebar />
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
            <div className="mb-4">
              <h3 className="mb-3">Thông tin hội đồng</h3>
              <div className="card">
                <div className="card-header bg-primary text-white">
                  <h5 className="card-title mb-0">{councilData.name}</h5>
                </div>
                <div className="card-body">
                  <div className="mb-3">
                    <strong>Thời gian:</strong>{" "}
                    {formatDateTime(councilData.startTime)}
                  </div>
                  <div className="mb-3">
                    <strong>Địa điểm:</strong> {councilData.location}
                  </div>
                  {councilData.code && (
                    <div className="mb-3">
                      <strong>Mã hội đồng:</strong> {councilData.code}
                    </div>
                  )}

                  <div className="mt-3">
                    <h6>Thành viên hội đồng:</h6>
                    <ul className="list-group">
                      {councilData.members?.map((member) => (
                        <li
                          key={member.id}
                          className="list-group-item d-flex justify-content-between align-items-center"
                        >
                          <div>
                            <i className="fas fa-user me-2"></i>
                            {member.name}
                            {member.role && (
                              <small className="text-muted ms-2">
                                ({member.role})
                              </small>
                            )}
                          </div>
                          <span className="badge bg-info">
                            {member.departmentName ||
                              member.specialization ||
                              "N/A"}
                          </span>
                        </li>
                      ))}
                    </ul>
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
                          {/* <span
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
                          </span> */}
                        </div>
                      </div>
                      <div className="card-body">
                        <div className="mb-3">
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-users text-primary me-2"></i>
                            <span className="text-muted">Nhóm:</span>
                            <span className="ms-2 fw-bold">
                              {topic.teamName || topic.groupName}
                            </span>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-user text-primary me-2"></i>
                            <span className="text-muted">
                              Giảng viên hướng dẫn:
                            </span>
                            <span className="ms-2">
                              {topic.instructorName || topic.lecturer}
                            </span>
                          </div>
                          <div className="d-flex align-items-center mb-2">
                            <i className="fas fa-calendar text-primary me-2"></i>
                            <span className="text-muted">Thời gian:</span>
                            <span className="ms-2">
                              {formatDate(topic.startDay || topic.startDate)} -{" "}
                              {formatDate(topic.endDay || topic.endDate)}
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

                        {/* Hiển thị điểm nếu có */}
                        {topic.grade && (
                          <div className="mb-3">
                            <h6 className="text-muted mb-2">Điểm hiện tại:</h6>
                            <div className="row">
                              <div className="col-6">
                                <small className="text-muted">Điểm:</small>
                                <p className="mb-0 fw-bold">
                                  {topic.grade.score ||
                                    topic.grade.defenseScore ||
                                    "Chưa có"}
                                </p>
                              </div>
                              <div className="col-6">
                                <small className="text-muted">Ghi chú:</small>
                                <p className="mb-0 fw-bold">
                                  {topic.grade.note || "Không có"}
                                </p>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="card-footer bg-white">
                        <div className="d-flex justify-content-between">
                          <button className="btn btn-outline-primary btn-sm">
                            <i className="fas fa-eye me-1"></i> Xem chi tiết
                          </button>
                          <button
                            className="btn btn-outline-success btn-sm"
                            onClick={() => handleOpenGradeModal(topic)}
                          >
                            <i className="fas fa-pen me-1"></i> Chấm điểm
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

      {/* Modal chấm điểm */}
      {showGradeModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.3)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Chấm điểm đồ án: {selectedTopic?.topicName}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowGradeModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Điểm bảo vệ</label>
                  <input
                    type="number"
                    name="score"
                    className="form-control"
                    value={gradeForm.score}
                    onChange={handleGradeChange}
                    min={0}
                    max={10}
                    step={0.1}
                    placeholder="Nhập điểm từ 0-10"
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ghi chú</label>
                  <textarea
                    name="note"
                    className="form-control"
                    value={gradeForm.note}
                    onChange={handleGradeChange}
                    rows="3"
                    placeholder="Nhập ghi chú (nếu có)"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowGradeModal(false)}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSaveGrade}
                >
                  Lưu điểm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CouncilDetail;
