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

        // Update the endpoint to match your backend
        const response = await api.get(`/${url}`, {
          maxRedirects: 0, // Prevent axios from following redirects
          validateStatus: (status) => {
            return status >= 200 && status < 400; // Accept redirect status codes
          },
        });

        // Get the redirect URL from the Location header
        const redirectUrl = response.headers.location;
        console.log("Redirect URL from headers:", redirectUrl);

        if (redirectUrl) {
          // Ensure URL has proper protocol
          let finalUrl = redirectUrl;
          if (!finalUrl.match(/^https?:\/\//i)) {
            finalUrl = "https://" + finalUrl;
          }

          console.log("Redirecting to:", finalUrl);
          window.location.href = finalUrl;
        } else {
          throw new Error("No redirect URL found");
        }
      } catch (error) {
        console.error("Redirect error:", error);
        if (error.response?.status === 404) {
          navigate("/", {
            state: {
              message: "This short link doesn't exist",
            },
          });
        } else {
          navigate("/error", {
            state: {
              message:
                "Unable to process this short link. Please try again later.",
            },
          });
        }
      }
    };

    if (url) {
      redirectToOriginalUrl();
    }
  }, [url, navigate]);

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
