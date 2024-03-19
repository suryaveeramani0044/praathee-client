import { useState } from "react";
import "./login.css";
import AxiosInstance from "../api/api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const LoginPage = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const handleLogin = () => {
    try {
      setLoading(true);
      const { email, password } = user;
      if (email && password) {
        AxiosInstance.post("/users/login", {
          ...user,
          email: email.toLowerCase(),
        })
          .then((res) => {
            localStorage.setItem("jwttoken", res.data.token);
            setLoading(false);
            navigate("/dashboard");
          })
          .catch((e) => {
            toast.error(
              e.response.data.message ? e.response.data.message : e.message
            );
          });
      } else {
        alert("please fill all field");
        setLoading(false);
      }
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };
  return (
    <main className="login">
      <section className="login-container">
        <h3 className="title">Welcome</h3>
        <input
          type="text"
          placeholder="Enter your Email"
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
          {loading ? "loading..." : "Login"}
        </button>
      </section>
    </main>
  );
};
