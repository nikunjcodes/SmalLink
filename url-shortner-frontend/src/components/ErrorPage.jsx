import React, { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const errorMessage = location.state?.message || message || "Page not found";

  useEffect(() => {
    // Redirect to home page after 3 seconds
    const timer = setTimeout(() => {
      navigate("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Oops!</h1>
        <p className="text-text-secondary mb-4">{errorMessage}</p>
        <p className="text-text-secondary mb-8">Redirecting to home page...</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-brand-primary hover:bg-brand-hover text-text-primary rounded-md font-medium transition-colors duration-200"
        >
          Go Home Now
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
