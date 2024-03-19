import { useNavigate } from "react-router-dom";
import "./header.css";
export const Header = () => {
  const navigate = useNavigate();
  const handleLogout = async () => {
    await localStorage.removeItem("jwttoken");
    navigate("/");
  };
  return (
    <header>
      <h3>Assesment</h3>
      <button onClick={() => handleLogout()} className="logout">
        logout
      </button>
    </header>
  );
};
