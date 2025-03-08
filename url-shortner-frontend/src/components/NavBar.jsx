import React, { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { IoIosMenu } from "react-icons/io";
import { RxCross2 } from "react-icons/rx";
import { useStoreContext } from "../contextApi/ContextApi";
import { motion } from "framer-motion";

const Navbar = () => {
  const navigate = useNavigate();
  const { token, setToken } = useStoreContext();
  const path = useLocation().pathname;
  const [navbarOpen, setNavbarOpen] = useState(false);

  const onLogOutHandler = () => {
    setToken(null);
    localStorage.removeItem("JWT_TOKEN");
    navigate("/login");
  };

  return (
    <div className="h-16 bg-bg-dark border-b border-border-light z-50 flex items-center sticky top-0">
      <div className="lg:px-14 sm:px-8 px-4 w-full flex justify-between items-center">
        <Link to="/" className="flex items-center gap-2">
          <motion.h1
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="font-display font-bold text-3xl text-text-primary"
          >
            Link<span className="text-brand-primary">Chota</span>
          </motion.h1>
        </Link>

        {/* Desktop Navigation */}
        <div
          className={`flex sm:gap-8 gap-4 items-center sm:static absolute left-0 top-[64px] sm:shadow-none shadow-md ${
            navbarOpen ? "h-fit sm:pb-0 pb-5" : "h-0 overflow-hidden"
          } transition-all duration-200 sm:h-fit sm:bg-transparent bg-bg-dark sm:w-fit w-full sm:flex-row flex-col px-4 sm:px-0`}
        >
          <Link
            to="/"
            className={`${
              path === "/" ? "text-brand-primary" : "text-text-secondary"
            } hover:text-text-primary transition-colors duration-200 font-medium`}
          >
            Home
          </Link>

          <Link
            to="/about"
            className={`${
              path === "/about" ? "text-brand-primary" : "text-text-secondary"
            } hover:text-text-primary transition-colors duration-200 font-medium`}
          >
            About
          </Link>

          {token && (
            <Link
              to="/dashboard"
              className={`${
                path === "/dashboard"
                  ? "text-brand-primary"
                  : "text-text-secondary"
              } hover:text-text-primary transition-colors duration-200 font-medium`}
            >
              Dashboard
            </Link>
          )}

          <div className="flex items-center sm:gap-4 gap-2">
            {!token ? (
              <>
                <Link to="/login">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2 border border-border-light hover:border-brand-primary text-text-secondary hover:text-text-primary rounded-md font-medium transition-all duration-200"
                  >
                    Login
                  </motion.button>
                </Link>
                <Link to="/register">
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-5 py-2 bg-brand-primary hover:bg-brand-hover text-text-primary rounded-md font-medium transition-colors duration-200"
                  >
                    Sign Up
                  </motion.button>
                </Link>
              </>
            ) : (
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onLogOutHandler}
                className="px-5 py-2 bg-brand-primary hover:bg-brand-hover text-text-primary rounded-md font-medium transition-colors duration-200"
              >
                Logout
              </motion.button>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          onClick={() => setNavbarOpen(!navbarOpen)}
          className="sm:hidden flex items-center text-text-primary"
        >
          {navbarOpen ? (
            <RxCross2 className="text-3xl" />
          ) : (
            <IoIosMenu className="text-3xl" />
          )}
        </button>
      </div>
    </div>
  );
};

export default Navbar;
