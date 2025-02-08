import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { Layout } from "./components/layout/layout";
import HomePage from "./pages/homepage";
import StudentHomepage from "./pages/student/studenthome";
import Studentprofiles from "./pages/faculty/facultystudentprofile";
import PSDetails from "./pages/student/pslevel";
import FullStack from "./pages/student/fullstack";
import Leetcodeperformance from "./pages/student/leetcode";
import Github from "./pages/student/github";
import RepoDetails from "./pages/student/repodetails";
import Facultyhome from "./pages/faculty/facultyhome";
import Facultypspage from "./pages/faculty/facultypspage";
import Addsuggestion from "./pages/faculty/facultypsform";
import Facultyfullstackdetails from "./pages/faculty/facultyfullstackdetails";
import Facultytechnical from "./pages/faculty/facultytechnical";
import Home from "./pages/admin/home";
import Adddetails from "./pages/admin/adddetails";
import Login from "./pages/login";

function AppLayout() {
  const location = useLocation();
  
  // Check if the current path is "/login"
  const isLoginPage = location.pathname === "/";

  return (
    <>
      {isLoginPage ? (
        <Routes>
          <Route path="/" element={<Login />} />
        </Routes>
      ) : (
        <Layout>
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/demo-home" element={<HomePage />} />
            <Route path="/student-home" element={<StudentHomepage />} />
            <Route path="/ps-details" element={<PSDetails />} />
            <Route path="/full-stack" element={<FullStack />} />
            <Route path="/student-profiles" element={<Studentprofiles />} />
            <Route path="/technical/leetcode-performance" element={<Leetcodeperformance />} />
            <Route path="/technical/github-performance" element={<Github />} />
            <Route path="/technical/github-performance/repo-details" element={<RepoDetails />} />
            {/* Faculty */}
            <Route path="/home-page" element={<Facultyhome />} />
            <Route path="/faculty-ps-details" element={<Facultypspage />} />
            <Route path="/add-suggestion" element={<Addsuggestion />} />
            <Route path="/full-stack-details" element={<Facultyfullstackdetails />} />
            <Route path="/technical-performance" element={<Facultytechnical />} />
            {/* Admin */}
            <Route path="/admin-home" element={<Home />} />
            <Route path="/add-details" element={<Adddetails />} />
          </Routes>
        </Layout>
      )}
    </>
  );
}

function App() {
  return (
    <Router>
      <AppLayout />
    </Router>
  );
}

export default App;
