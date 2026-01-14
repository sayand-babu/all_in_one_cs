import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import TailwindDebug from  "./TailwindDebug.jsx";

// Auth Pages
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";

// Contest Pages
import ContestsListPage from "./pages/contest/ContestsListPage";
import ContestDashboard from "./pages/contest/ContestDashboard";
import CreateContestPage from "./pages/contest/CreateContestPage";
import ExamModePage from "./pages/contest/ExamModePage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-tech-black">
        <Header />
        <Routes>
          {/* Auth routes */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />

          {/* Contest routes */}
          <Route path="/" element={<ContestsListPage />} />
          <Route path="/contests" element={<ContestsListPage />} />
          <Route path="/contest/create" element={<CreateContestPage />} />
          <Route path="/contest/:contestId" element={<ContestDashboard />} />
          <Route path="/contest/:contestId/attempt" element={<ExamModePage />} />

          {/* Debug route */}
          <Route path="/debug" element={<TailwindDebug />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
