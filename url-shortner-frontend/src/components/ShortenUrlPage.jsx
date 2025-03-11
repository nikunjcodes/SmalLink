import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios"; // Import axios directly
import { motion } from "framer-motion";

const ShortenUrlPage = () => {
  const { url } = useParams();
  const navigate = useNavigate();
  const [error, setError] = useState(null);

  useEffect(() => {
    const redirectToOriginalUrl = async () => {
      try {
        console.log("Fetching URL for:", url);

        // Make request directly to the backend URL
        const response = await axios({
          method: "GET",
          url: `${import.meta.env.VITE_BACKEND_URL}/${url}`,
          maxRedirects: 0,
          validateStatus: function (status) {
            return status >= 200 && status < 400;
          },
        });

        console.log("Response:", response);

        // Check if we got a redirect response
        if (response.status === 302 && response.headers.location) {
          let redirectUrl = response.headers.location;

          // Ensure URL has proper protocol
          if (!redirectUrl.match(/^https?:\/\//i)) {
            redirectUrl = "https://" + redirectUrl;
          }

          console.log("Redirecting to:", redirectUrl);
          window.location.href = redirectUrl;
        } else {
          // If no redirect, go to home page
          navigate("/", {
            state: {
              message: "Invalid short link",
            },
          });
        }
      } catch (error) {
        console.error("Redirect error:", error);
        console.log("Error response:", error.response);

        if (error.response?.status === 404) {
          navigate("/", {
            state: {
              message: "This short link doesn't exist",
            },
          });
        } else {
          // For network errors or other issues
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
