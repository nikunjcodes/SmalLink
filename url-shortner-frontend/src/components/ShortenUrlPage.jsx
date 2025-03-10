import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../api/api";
import { motion } from "framer-motion";

const ShortenUrlPage = () => {
  const { url } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        console.log("Fetching URL for:", url);
        const response = await api.get(`/api/urls/redirect/${url}`);
        console.log("API Response:", response.data);

        if (response.data.originalUrl) {
          let redirectUrl = response.data.originalUrl;

          // Ensure URL has proper protocol
          if (!redirectUrl.match(/^https?:\/\//i)) {
            redirectUrl = "https://" + redirectUrl;
          }

          console.log("Redirecting to:", redirectUrl);

          // Method 1: Using window.location.replace
          window.location.replace(redirectUrl);

          // Method 2 (fallback): Using window.location.href
          setTimeout(() => {
            if (window.location.href !== redirectUrl) {
              window.location.href = redirectUrl;
            }
          }, 100);

          // Method 3 (fallback): Using anchor tag
          setTimeout(() => {
            const link = document.createElement("a");
            link.href = redirectUrl;
            link.target = "_self";
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
          }, 200);
        } else {
          throw new Error("Invalid URL response");
        }
      } catch (error) {
        console.error("Redirect error:", error);
        setError(error.message || "An error occurred");
        navigate("/error", {
          state: {
            message:
              "Unable to process this short link. Please try again later.",
          },
        });
      }
    };

    if (url) {
      redirectToOriginalUrl();
    }
  }, [url, navigate]);

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center">
      {error ? (
        <div className="text-text-primary text-center">
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p>{error}</p>
        </div>
      ) : (
        <>
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full mb-4"
          />
          <p className="text-text-secondary">
            Redirecting you to your destination...
          </p>
        </>
      )}
    </div>
  );
};

export default ShortenUrlPage;
