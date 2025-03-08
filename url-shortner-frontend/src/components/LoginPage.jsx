import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { useStoreContext } from "../contextApi/ContextApi";
import { motion } from "framer-motion";
import { FaSignInAlt } from "react-icons/fa";

const LoginPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);
  const { setToken } = useStoreContext();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    mode: "onTouched",
  });

  const loginHandler = async (data) => {
    setLoader(true);
    try {
      const { data: response } = await api.post("/api/auth/public/login", data);
      setToken(response.token);
      localStorage.setItem("JWT_TOKEN", JSON.stringify(response.token));
      toast.success("Login Successful!");
      reset();
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
      toast.error("Login Failed!");
    } finally {
      setLoader(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-bg-dark flex justify-center items-center px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <form
          onSubmit={handleSubmit(loginHandler)}
          className="bg-bg-card border border-border-light rounded-lg shadow-lg p-8 relative overflow-hidden"
        >
          {/* Background Animation */}
          <motion.div
            className="absolute top-0 left-0 w-full h-1 bg-brand-primary"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8 }}
          />

          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-center mb-8"
          >
            <div className="inline-block p-3 rounded-full bg-brand-primary/10 mb-4">
              <FaSignInAlt className="text-3xl text-brand-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-text-primary">
              Welcome Back
            </h1>
            <p className="text-text-secondary mt-2">
              Sign in to access your account
            </p>
          </motion.div>

          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            <TextField
              label="Username"
              required
              id="username"
              type="text"
              message="Username is required"
              placeholder="Enter your username"
              register={register}
              errors={errors}
            />

            <TextField
              label="Password"
              required
              id="password"
              type="password"
              message="Password is required"
              placeholder="Enter your password"
              register={register}
              min={6}
              errors={errors}
            />
          </motion.div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loader}
            type="submit"
            className="w-full mt-6 px-6 py-3 bg-brand-primary hover:bg-brand-hover text-text-primary rounded-md font-medium transition-colors duration-200 disabled:opacity-50 flex items-center justify-center gap-2"
          >
            {loader ? (
              <>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                  className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                />
                <span>Logging in...</span>
              </>
            ) : (
              <>
                <span>Login</span>
                <FaSignInAlt />
              </>
            )}
          </motion.button>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-center text-text-secondary mt-6"
          >
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-brand-primary hover:text-brand-hover font-medium transition-colors duration-200"
            >
              Sign Up
            </Link>
          </motion.p>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
