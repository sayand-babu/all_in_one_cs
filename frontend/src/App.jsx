import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import ProblemsListPage from "./pages/ProblemsListPage";
import ProblemPage from "./pages/ProblemPage";
import TailwindDebug from  "./TailwindDebug.jsx";

// Contest Pages
import ContestsListPage from "./pages/contest/ContestsListPage";
import ContestDashboard from "./pages/contest/ContestDashboard";
import CreateContestPage from "./pages/contest/CreateContestPage";
import ProblemSolvingPage from "./pages/contest/ProblemSolvingPage";

const App = () => {
  return (
    <Router>
      <div className="min-h-screen bg-tech-black">
        <Header />
        <Routes>
          {/* Legacy problem practice routes */}
          <Route path="/" element={<HomePage />} />
          <Route path="/problems" element={<ProblemsListPage />} />
          <Route path="/problems/:problemId" element={<ProblemPage />} />

          {/* Contest routes */}
          <Route path="/contests" element={<ContestsListPage />} />
          <Route path="/contest/create" element={<CreateContestPage />} />
          <Route path="/contest/:contestId" element={<ContestDashboard />} />
          <Route
            path="/contest/:contestId/problem/:problemId"
            element={<ProblemSolvingPage />}
          />

          {/* Debug route */}
          <Route path="/debug" element={<TailwindDebug />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
