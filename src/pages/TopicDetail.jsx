import React, { useState, useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import { useParams } from "react-router-dom";
import axios from "axios";
const TopicDetail = () => {
  const { topicID } = useParams();
  const [topic, setTopic] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      if (!topicID) return;
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:8080/team/topic/${topicID}`
        );
        if (response.data && response.data.result.length > 0) {
          setTopic(response.data.result[0]);
        } else {
          setTopic(null);
        }
      } catch (error) {
        console.error("Error fetching topic data:", error);
        setTopic(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [topicID]);

  const [showTaskModal, setShowTaskModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    deadline: "",
    description: "",
    note: "",
  });

  const [tasks, setTasks] = useState([]);
  const [files, setFiles] = useState([]);

  const [showGradeModal, setShowGradeModal] = useState(false);
  const [gradeForm, setGradeForm] = useState({
    progressScore: "",
    reportScore: "",
    defenseScore: "",
    reviewScore: "",
    finalScore: "",
  });

  // State cho modal chấm điểm file
  const [showFileGradeModal, setShowFileGradeModal] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileGradeForm, setFileGradeForm] = useState({
    score: "",
  });

  const fetchTasks = async () => {
    if (!topicID) return;
    try {
      const response = await axios.get(`http://localhost:8080/task/${topicID}`);
      setTasks(response.data.result || []);
    } catch (error) {
      console.error("Error fetching task data:", error);
      setTasks([]);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [topicID]);

  useEffect(() => {
    const fetchFiles = async () => {
      if (!topicID) return;
      try {
        const response = await axios.get(
          `http://localhost:8080/files/${topicID}`
        );
        setFiles(response.data.result || []);
      } catch (error) {
        console.error("Error fetching files:", error);
        setFiles([]);
      }
    };
    fetchFiles();
  }, [topicID]);

  const handleCreateTask = async () => {
    // Chuyển đổi deadline sang ISO string, thêm giờ mặc định 14:30:00
    const deadlineISO = newTask.deadline ? newTask.deadline + "T14:30:00" : "";
    const body = {
      title: newTask.title,
      deadline: deadlineISO,
      describe: newTask.description,
      comment: newTask.note,
      status: false,
      topicID: Number(topicID),
    };
    try {
      const res = await fetch("http://localhost:8080/task", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(body),
      });
      if (res.ok) {
        setShowTaskModal(false);
        setNewTask({ title: "", deadline: "", description: "", note: "" });
        fetchTasks(); // Tải lại danh sách nhiệm vụ
        alert("Tạo nhiệm vụ thành công!");
      } else {
        alert("Tạo nhiệm vụ thất bại!");
      }
    } catch (err) {
      alert("Có lỗi xảy ra khi tạo nhiệm vụ!");
    }
  };

  const handleDeleteTask = async (taskId) => {
    if (window.confirm("Bạn có chắc chắn muốn xóa nhiệm vụ này?")) {
      try {
        const res = await fetch(`http://localhost:8080/task/${taskId}`, {
          method: "DELETE",
        });

        if (res.ok) {
          fetchTasks(); // Tải lại danh sách nhiệm vụ
          alert("Xóa nhiệm vụ thành công!");
        } else {
          alert("Xóa nhiệm vụ thất bại!");
        }
      } catch (err) {
        console.error("Error deleting task:", err);
        alert("Có lỗi xảy ra khi xóa nhiệm vụ!");
      }
    }
  };

  const handleOpenGradeModal = () => {
    setGradeForm({
      progressScore: topic.grade?.progressScore ?? "",
      reportScore: topic.grade?.reportScore ?? "",
      defenseScore: topic.grade?.defenseScore ?? "",
      reviewScore: topic.grade?.reviewScore ?? "",
      finalScore: topic.grade?.finalScore ?? "",
    });
    setShowGradeModal(true);
  };

  const handleGradeChange = (e) => {
    setGradeForm({ ...gradeForm, [e.target.name]: e.target.value });
  };

  const handleSaveGrade = async () => {
    try {
      // Chuẩn bị dữ liệu để gửi API
      const gradeData = {
        id: topic.id, // ID của topic
        progressScore: parseFloat(gradeForm.progressScore) || 0,
        reportScore: parseFloat(gradeForm.reportScore) || 0,
        defenseScore: parseFloat(gradeForm.defenseScore) || 0,
        reviewScore: parseFloat(gradeForm.reviewScore) || 0,
        finalScore: parseFloat(gradeForm.finalScore) || 0,
      };

      // Gọi API cập nhật điểm
      const response = await axios.put(
        "http://localhost:8080/grade/update-all",
        gradeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Cập nhật state local
        setTopic((prev) => ({
          ...prev,
          grade: { ...gradeForm },
        }));
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

  // Hàm mở modal chấm điểm file
  const handleOpenFileGradeModal = (file) => {
    setSelectedFile(file);
    setFileGradeForm({
      score: file.score || "",
    });
    setShowFileGradeModal(true);
  };

  // Hàm xử lý thay đổi điểm file
  const handleFileGradeChange = (e) => {
    setFileGradeForm({ ...fileGradeForm, [e.target.name]: e.target.value });
  };

  // Hàm lưu điểm file
  const handleSaveFileGrade = async () => {
    try {
      // Chuẩn bị dữ liệu để gửi API
      const fileGradeData = {
        id: selectedFile.id,
        score: parseFloat(fileGradeForm.score) || 0,
      };

      // Gọi API cập nhật điểm file
      const response = await axios.put(
        "http://localhost:8080/files/update",
        fileGradeData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        // Cập nhật state local
        const updatedFiles = files.map((file) => {
          if (file.id === selectedFile.id) {
            return {
              ...file,
              score: fileGradeForm.score,
            };
          }
          return file;
        });
        setFiles(updatedFiles);

        setShowFileGradeModal(false);
        alert("Lưu điểm file thành công!");
      } else {
        alert("Lưu điểm file thất bại!");
      }
    } catch (error) {
      console.error("Error saving file grade:", error);
      alert("Có lỗi xảy ra khi lưu điểm file!");
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!topic) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <h2>Không tìm thấy thông tin đồ án.</h2>
      </div>
    );
  }

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
            {/* Header Section */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center">
                  <h3 className="mb-0">{topic.topicName}</h3>
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
                      <strong>Ngày bắt đầu:</strong>{" "}
                      {topic.topicSemester?.startTime}
                    </p>
                  </div>
                  <div className="col-md-4">
                    <p>
                      <strong>Ngày kết thúc:</strong>{" "}
                      {topic.topicSemester?.endTime}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card hiển thị các đầu điểm */}
            <div className="card mb-4">
              <div className="card-body">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h5 className="mb-0">Các đầu điểm của đồ án</h5>
                  <button
                    className="btn btn-outline-primary btn-sm"
                    onClick={handleOpenGradeModal}
                  >
                    <i className="fas fa-pen"></i> Nhập điểm
                  </button>
                </div>
                <ul className="list-group">
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Điểm quá trình</span>
                    <span className="fw-bold">
                      {topic.grade?.progressScore ?? "Chưa có"}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Điểm báo cáo</span>
                    <span className="fw-bold">
                      {topic.grade?.reportScore ?? "Chưa có"}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Điểm bảo vệ</span>
                    <span className="fw-bold">
                      {topic.grade?.defenseScore ?? "Chưa có"}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Điểm phản biện</span>
                    <span className="fw-bold">
                      {topic.grade?.reviewScore ?? "Chưa có"}
                    </span>
                  </li>
                  <li className="list-group-item d-flex justify-content-between align-items-center">
                    <span>Điểm tổng kết</span>
                    <span className="fw-bold">
                      {topic.grade?.finalScore ?? "Chưa có"}
                    </span>
                  </li>
                </ul>
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
                          {topic.member?.map((members) => (
                            <tr key={members.inum}>
                              <td>{members.inum}</td>
                              <td>{members.name}</td>
                              <td>{members.position}</td>
                              <td>{members.email}</td>
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
                          {files.map((file) => (
                            <tr key={file.id}>
                              <td>{file.uri}</td>
                              <td>{file.submitDay}</td>
                              <td>
                                <span
                                  className={`badge ${
                                    file.status === "Đã duyệt"
                                      ? "bg-success"
                                      : "bg-warning"
                                  }`}
                                >
                                  {file.status === "Đã duyệt"
                                    ? "Đã duyệt"
                                    : "Chưa duyệt"}
                                </span>
                              </td>
                              <td>{file.score ?? "Chưa chấm"}</td>
                              <td>
                                <button className="btn btn-sm btn-primary me-2">
                                  <i className="fas fa-download"></i>
                                </button>
                                <button className="btn btn-sm btn-success me-2">
                                  <i className="fas fa-check"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-warning"
                                  onClick={() => handleOpenFileGradeModal(file)}
                                >
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
                      <button
                        className="btn btn-primary"
                        onClick={() => setShowTaskModal(true)}
                      >
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
                          {tasks.map((task) => (
                            <tr key={task.id}>
                              <td>{task.title}</td>
                              <td>
                                {task.deadline
                                  ? task.deadline.split("T")[0]
                                  : ""}
                              </td>
                              <td>
                                <span
                                  className={`badge ${
                                    task.status === true
                                      ? "bg-success"
                                      : task.status === false
                                      ? "bg-info"
                                      : "bg-secondary"
                                  }`}
                                >
                                  {task.status === true
                                    ? "Hoàn thành"
                                    : "Đang thực hiện"}
                                </span>
                              </td>
                              <td>
                                <button className="btn btn-sm btn-primary me-2">
                                  <i className="fas fa-edit"></i>
                                </button>
                                <button
                                  className="btn btn-sm btn-danger"
                                  onClick={() => handleDeleteTask(task.id)}
                                >
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

      {/* Modal tạo nhiệm vụ mới */}
      {showTaskModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Tạo nhiệm vụ mới</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowTaskModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Tiêu đề</label>
                  <input
                    type="text"
                    className="form-control"
                    value={newTask.title}
                    onChange={(e) =>
                      setNewTask({ ...newTask, title: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Hạn</label>
                  <input
                    type="date"
                    className="form-control"
                    value={newTask.deadline}
                    onChange={(e) =>
                      setNewTask({ ...newTask, deadline: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Miêu tả</label>
                  <textarea
                    className="form-control"
                    value={newTask.description}
                    onChange={(e) =>
                      setNewTask({ ...newTask, description: e.target.value })
                    }
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Ghi chú</label>
                  <textarea
                    className="form-control"
                    value={newTask.note}
                    onChange={(e) =>
                      setNewTask({ ...newTask, note: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowTaskModal(false)}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleCreateTask}
                >
                  Lưu nhiệm vụ
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal nhập điểm */}
      {showGradeModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.3)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Nhập điểm đồ án</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowGradeModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Điểm quá trình</label>
                  <input
                    type="number"
                    name="progressScore"
                    className="form-control"
                    value={gradeForm.progressScore}
                    onChange={handleGradeChange}
                    min={0}
                    max={10}
                    step={0.1}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Điểm báo cáo</label>
                  <input
                    type="number"
                    name="reportScore"
                    className="form-control"
                    value={gradeForm.reportScore}
                    onChange={handleGradeChange}
                    min={0}
                    max={10}
                    step={0.1}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Điểm bảo vệ</label>
                  <input
                    type="number"
                    name="defenseScore"
                    className="form-control"
                    value={gradeForm.defenseScore}
                    onChange={handleGradeChange}
                    min={0}
                    max={10}
                    step={0.1}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Điểm phản biện</label>
                  <input
                    type="number"
                    name="reviewScore"
                    className="form-control"
                    value={gradeForm.reviewScore}
                    onChange={handleGradeChange}
                    min={0}
                    max={10}
                    step={0.1}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">Điểm tổng kết</label>
                  <input
                    type="number"
                    name="finalScore"
                    className="form-control"
                    value={gradeForm.finalScore}
                    onChange={handleGradeChange}
                    min={0}
                    max={10}
                    step={0.1}
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

      {/* Modal chấm điểm file */}
      {showFileGradeModal && (
        <div
          className="modal fade show"
          style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  Chấm điểm file: {selectedFile?.uri}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowFileGradeModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Điểm</label>
                  <input
                    type="number"
                    name="score"
                    className="form-control"
                    value={fileGradeForm.score}
                    onChange={handleFileGradeChange}
                    min={0}
                    max={10}
                    step={0.1}
                    placeholder="Nhập điểm từ 0-10"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowFileGradeModal(false)}
                >
                  Đóng
                </button>
                <button
                  type="button"
                  className="btn btn-success"
                  onClick={handleSaveFileGrade}
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

export default TopicDetail;
