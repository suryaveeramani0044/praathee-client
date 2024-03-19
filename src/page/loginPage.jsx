import { useState } from "react";
import "./login.css";
import AxiosInstance from "../api/api";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const handleLogin = () => {
    const { email, password } = user;
    if (email && password) {
      AxiosInstance.post("/login", user)
        .then((res) => {
          console.log("login data", res.data.token);
          localStorage.setItem("jwttoken", res.data.token);
          navigate("/dashboard");
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("please fill all field");
    }
  };
  return (
    <main className="login">
      <section className="login-container">
        <h3 className="title">Chat Me</h3>
        <input
          type="text"
          placeholder="Email or Username"
          name="email"
          value={user.email}
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="
            Password"
          name="email"
          value={user.password}
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button className="login-btn" onClick={() => handleLogin()}>
          Login
        </button>
        <p className="reg-text">Have a good day</p>
      </section>
    </main>
  );
};
