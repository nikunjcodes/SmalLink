import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import api from "../api/api";
import { motion } from "framer-motion";

const ShortenUrlPage = () => {
  const { url } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        // Remove any 's/' prefix if it exists
        const cleanUrl = url.replace(/^s\//, "");
        const response = await api.get(`/api/urls/${cleanUrl}`);

        if (response.data.originalUrl) {
          // Add proper protocol if missing
          let redirectUrl = response.data.originalUrl;
          if (
            !redirectUrl.startsWith("http://") &&
            !redirectUrl.startsWith("https://")
          ) {
            redirectUrl = "https://" + redirectUrl;
          }
          window.location.href = redirectUrl;
        } else {
          navigate("/error");
        }
      } catch (error) {
        console.error("Redirect error:", error);
        navigate("/error");
      }
    };

    redirectToOriginalUrl();
  }, [url, navigate]);

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
