import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const OAuthSuccess = () => {
  const navigate = useNavigate();
  const { checkAuthStatus } = useAuth();

  useEffect(() => {
    console.log("OAuthSuccess mounted — URL:", window.location.href);
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("token", token);
      checkAuthStatus().then(() => {
        navigate("/dashboard");
      });
    } else {
      navigate("/auth");
    }
  }, []);

  return (
    <div className="h-screen flex items-center justify-center text-gray-700">
      Logging you in via Google...
    </div>
  );
};

export default OAuthSuccess;
