import React from "react";
import { motion } from "framer-motion";
const Card = ({ title, desc }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="group relative bg-bg-card p-8 rounded-lg border border-border-light hover:border-border-active transition-colors duration-200"
    >
      <div className="relative">
        <motion.div
          whileHover={{ rotate: 180 }}
          transition={{ duration: 0.6 }}
          className="w-12 h-12 mb-6 rounded-md bg-brand-primary flex items-center justify-center"
        >
          <svg
            className="w-6 h-6 text-text-primary"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </motion.div>

        <h2 className="font-display text-xl font-semibold mb-3 text-text-primary group-hover:text-brand-primary transition-colors duration-200">
          {title}
        </h2>

        <p className="font-sans text-text-secondary leading-relaxed">{desc}</p>
      </div>
    </motion.div>
  );
};

export default Card;
