import React from "react";
import { motion } from "framer-motion";
import { FaLink, FaShareAlt, FaShieldAlt, FaBolt } from "react-icons/fa";

const AboutPage = () => {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-bg-dark py-16 lg:px-14 sm:px-8 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-bg-light border border-border-light"
          >
            <span className="text-brand-primary font-medium">
              About LinkChota
            </span>
          </motion.div>

          <h1 className="font-display text-4xl md:text-5xl font-bold text-text-primary mb-6">
            Simplifying URL Management
          </h1>
          <p className="text-text-secondary text-lg max-w-3xl">
            LinkChota is your professional solution for URL shortening and link
            management. We combine powerful analytics with enterprise-grade
            security to help you track and optimize your shared links
            effectively.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 gap-8">
          <FeatureCard
            icon={<FaLink />}
            title="Intelligent URL Shortening"
            description="Create concise, memorable links instantly with our advanced shortening algorithm. Perfect for social media sharing and marketing campaigns."
            delay={0.3}
          />

          <FeatureCard
            icon={<FaShareAlt />}
            title="Comprehensive Analytics"
            description="Track your link performance with detailed insights. Monitor clicks, geographic data, and engagement patterns to optimize your sharing strategy."
            delay={0.4}
          />

          <FeatureCard
            icon={<FaShieldAlt />}
            title="Enterprise Security"
            description="Your data security is our priority. All shortened URLs are protected with advanced encryption and regular security audits."
            delay={0.5}
          />

          <FeatureCard
            icon={<FaBolt />}
            title="Lightning Fast Redirects"
            description="Experience instant redirects with our optimized infrastructure. Your shortened links are always available and responsive."
            delay={0.6}
          />
        </div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 grid sm:grid-cols-3 gap-8"
        >
          <StatCard number="1M+" label="Links Created" />
          <StatCard number="5B+" label="Total Clicks" />
          <StatCard number="100K+" label="Happy Users" />
        </motion.div>
      </div>
    </div>
  );
};

const FeatureCard = ({ icon, title, description, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.6, delay }}
    className="bg-bg-card border border-border-light rounded-lg p-6 hover:border-brand-primary transition-all duration-300"
  >
    <div className="w-12 h-12 bg-brand-primary bg-opacity-10 rounded-lg flex items-center justify-center mb-4">
      <span className="text-brand-primary text-2xl">{icon}</span>
    </div>
    <h2 className="font-display text-xl font-semibold text-text-primary mb-3">
      {title}
    </h2>
    <p className="text-text-secondary">{description}</p>
  </motion.div>
);

const StatCard = ({ number, label }) => (
  <div className="bg-bg-card border border-border-light rounded-lg p-6 text-center">
    <motion.h3
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6 }}
      className="font-display text-3xl font-bold text-brand-primary mb-2"
    >
      {number}
    </motion.h3>
    <p className="text-text-secondary font-medium">{label}</p>
  </div>
);

export default AboutPage;
