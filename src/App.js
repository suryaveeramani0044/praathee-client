import { Routes, Route, useNavigate } from "react-router-dom";
import { LoginPage } from "./page/loginPage";
import { Dashboard } from "./page/dashboard";
import { useEffect, useState } from "react";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

export const App = () => {
  const navigate = useNavigate();
  /* eslint-disable */
  useEffect(() => {
    const token = localStorage.getItem("jwttoken");
    if (token) {
      navigate("/dashboard");
    }
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route
          path="/dashboard"
          element={
            <PrtotectedRoute>
              <Dashboard />
            </PrtotectedRoute>
          }
        />
        <Route path="*" element={<div>page not found</div>} />
      </Routes>
      <ToastContainer />
    </>
  );
};
const PrtotectedRoute = ({ children }) => {
  const [auth, setAuth] = useState(false);
  const navigate = useNavigate();
  let token;
  /* eslint-disable */
  useEffect(() => {
    token = localStorage.getItem("jwttoken");
    if (token) {
      setAuth(true);
    }
  }, []);
  return auth ? (
    children
  ) : (
    <div
      style={{
        height: "100vh",
        background: "#cc00ff",
        textAlign: "center",
        color: "white",
        padding: "20px",
      }}
    >
      <h4> Please go back to home,Login for getting access dashboard</h4>
      <button onClick={() => navigate("/")} className="login-btn">
        Home
      </button>
    </div>
  );
};
