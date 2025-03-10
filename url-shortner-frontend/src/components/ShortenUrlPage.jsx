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
        console.log("Attempting to fetch URL for:", url); // Debug log

        // Make sure we're using the correct API endpoint
        const response = await api.get(`/api/urls/redirect/${url}`);
        console.log("API Response:", response.data); // Debug log

        if (response.data.originalUrl) {
          let redirectUrl = response.data.originalUrl;
          if (
            !redirectUrl.startsWith("http://") &&
            !redirectUrl.startsWith("https://")
          ) {
            redirectUrl = "https://" + redirectUrl;
          }
          console.log("Redirecting to:", redirectUrl); // Debug log
          window.location.href = redirectUrl;
        } else {
          console.error("No original URL found in response");
          setError("URL not found");
          navigate("/error", {
            state: {
              message: "This short link doesn't exist or has been removed",
            },
          });
        }
      } catch (error) {
        console.error("Redirect error:", error.response || error);
        setError(error.response?.data?.message || "An error occurred");
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

  if (error) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <div className="text-text-primary text-center">
          <h1 className="text-2xl font-bold mb-2">Error</h1>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg-dark flex items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full"
      />
    </div>
  );
};

export default ShortenUrlPage;
