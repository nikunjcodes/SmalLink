import React, { useState } from "react";
import { useForm } from "react-hook-form";
import TextField from "./TextField";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";
import { FaUserPlus } from "react-icons/fa";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loader, setLoader] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      email: "",
      password: "",
    },
    mode: "onTouched",
  });

  const registerHandler = async (data) => {
    setLoader(true);
    try {
      await api.post("/api/auth/public/register", data);
      reset();
      navigate("/login");
      toast.success("Registration Successful!");
    } catch (error) {
      console.log(error);
      toast.error("Registration Failed!");
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
          onSubmit={handleSubmit(registerHandler)}
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
              <FaUserPlus className="text-3xl text-brand-primary" />
            </div>
            <h1 className="font-display text-3xl font-bold text-text-primary">
              Create Account
            </h1>
            <p className="text-text-secondary mt-2">
              Join us to start shortening URLs
            </p>
          </motion.div>

          <div className="space-y-4">
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
              label="Email"
              required
              id="email"
              type="email"
              message="Email is required"
              placeholder="Enter your email"
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
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loader}
            type="submit"
            className="w-full mt-6 px-6 py-3 bg-brand-primary hover:bg-brand-hover text-text-primary rounded-md font-medium transition-colors duration-200 disabled:opacity-50"
          >
            {loader ? "Creating Account..." : "Create Account"}
          </motion.button>

          <p className="text-center text-text-secondary mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-brand-primary hover:text-brand-hover font-medium transition-colors duration-200"
            >
              Login
            </Link>
          </p>
        </form>
      </motion.div>
    </div>
  );
};

export default RegisterPage;
