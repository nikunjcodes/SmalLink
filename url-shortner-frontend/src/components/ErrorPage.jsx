import React from "react";
import { useLocation, Link } from "react-router-dom";

const ErrorPage = ({ message }) => {
  const location = useLocation();
  const errorMessage =
    location.state?.message || message || "An error occurred";

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center p-4">
      <div className="text-center">
        <h1 className="text-4xl font-bold text-text-primary mb-4">Oops!</h1>
        <p className="text-text-secondary mb-8">{errorMessage}</p>
        <Link
          to="/"
          className="px-6 py-3 bg-brand-primary hover:bg-brand-hover text-text-primary rounded-md font-medium transition-colors duration-200"
        >
          Go Back Home
        </Link>
      </div>
    </div>
  );
};

export default ErrorPage;
