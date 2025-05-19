import logo from "./logo.svg";
import "./App.css";
import Sidebar from "./components/sidebar/Sidebar";
import Topic from "./pages/Topic";
import Student from "./pages/Student";
import "@fontsource/be-vietnam";
import { Routes, Route, Router } from "react-router-dom";
import TopicDetail from "./pages/TopicDetail";
import Group from "./pages/Group";
import Council from "./pages/Council";
import CouncilDetail from "./pages/CouncilDetail";

function App() {
  return (
    <div className="App">
      <Routes>
        {/* <Route path="/" element={<DashBorad></DashBorad>} /> */}
        <Route path="/do-an" element={<Topic></Topic>} />
        <Route path="/sinh-vien" element={<Student></Student>} />
        <Route path="/nhom-do-an" element={<Group></Group>} />
        <Route path="/hoi-dong" element={<Council></Council>} />
        <Route
          path="/hoi-dong/:councilId"
          element={<CouncilDetail></CouncilDetail>}
        />
        <Route path="/do-an/:topicName" element={<TopicDetail></TopicDetail>} />
        {/* <Route path="/ho-so" element={<Profile></Profile>} /> */}
      </Routes>
    </div>
  );
}

export default App;
