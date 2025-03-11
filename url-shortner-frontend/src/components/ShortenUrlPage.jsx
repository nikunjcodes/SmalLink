import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { motion } from "framer-motion";

const ShortenUrlPage = () => {
  const { url } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (url) {
      // Directly redirect to backend URL
      window.location.href = `${import.meta.env.VITE_BACKEND_URL}/${url}`;
    }
  }, [url]);

  return (
    <div className="min-h-screen bg-bg-dark flex flex-col items-center justify-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        className="w-12 h-12 border-4 border-brand-primary border-t-transparent rounded-full mb-4"
      />
      <p className="text-text-secondary">
        Redirecting you to your destination...
      </p>
    </div>
  );
};

export default ShortenUrlPage;
