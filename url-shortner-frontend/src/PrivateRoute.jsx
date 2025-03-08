import { Navigate } from "react-router-dom";
import { useStoreContext } from "./contextApi/ContextApi";
import { motion } from "framer-motion";

export default function PrivateRoute({ children, publicPage }) {
  const { token } = useStoreContext();

  // Optional: Add loading state while checking token
  if (token === undefined) {
    return (
      <div className="min-h-screen bg-bg-dark flex items-center justify-center">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          className="w-8 h-8 border-2 border-brand-primary border-t-transparent rounded-full"
        />
      </div>
    );
  }

  if (publicPage) {
    return token ? <Navigate to="/dashboard" /> : children;
  }

  return !token ? <Navigate to="/login" /> : children;
}
