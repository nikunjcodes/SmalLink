import { useNavigate } from "react-router-dom";
import React from "react";
import { motion } from "framer-motion";

import Card from "./Card";
import { useStoreContext } from "../contextApi/ContextApi";
import ParticlesBackground from "./ParticlesBackground";
import Footer from "./Footer";

let desc =
  "Generate short, memorable links with ease using Linklytics's intuitive interface. Share URLs effortlessly across platforms. Optimize your sharing strategy with Linklytics. Track clicks and manage your links seamlessly to enhance your online presence. Generate short, memorable links with ease using Linklytics's intuitive interface. Share URLs effortlessly across platforms.";

const LandingPage = () => {
  const navigate = useNavigate();
  const { token } = useStoreContext();
  console.log("TOKEN FROM LANDING PAGE: " + token);

  const dashBoardNavigateHandler = () => {};
  return (
    <div className="relative bg-bg-dark">
      <div className="flex flex-col min-h-screen">
        <div className="absolute inset-0">
          <ParticlesBackground />
        </div>

        <div className="relative flex-grow">
          <div className="relative max-w-7xl mx-auto lg:px-14 sm:px-8 px-4">
            <div className="lg:flex-row flex-col lg:py-20 pt-16 lg:gap-16 gap-8 flex justify-between items-center">
              <div className="flex-1 lg:max-w-[600px]">
                <motion.div
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="inline-block px-4 py-1.5 mb-6 rounded-md bg-bg-light border border-border-light"
                >
                  <span className="font-mono text-brand-primary text-sm tracking-wide">
                    PROFESSIONAL URL SHORTENER
                  </span>
                </motion.div>

                <motion.h1
                  initial={{ opacity: 0, y: -30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="font-display font-bold md:text-6xl sm:text-5xl text-4xl md:leading-[1.2] mb-6 text-text-primary tracking-tight"
                >
                  Transform Long URLs into
                  <span className="text-brand-primary"> Short Links</span>
                </motion.h1>

                <motion.p
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="font-sans text-text-secondary text-lg leading-relaxed mb-8"
                >
                  LinkChota helps you create memorable, trackable links in
                  seconds. Perfect for social media, marketing campaigns, and
                  professional sharing.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="flex items-center gap-4"
                >
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 bg-brand-primary hover:bg-brand-hover text-text-primary rounded-md font-sans font-medium transition-colors duration-200"
                  >
                    Get Started Free
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="px-6 py-3 border border-border-light hover:border-border-active text-text-secondary hover:text-text-primary rounded-md font-sans font-medium transition-colors duration-200"
                  >
                    Learn More
                  </motion.button>
                </motion.div>

                <motion.div className="mt-8 flex flex-wrap items-center gap-4">
                  <FeatureBadge icon="⚡" text="Lightning Fast" />
                  <FeatureBadge icon="🔒" text="Enterprise Security" />
                  <FeatureBadge icon="📊" text="Advanced Analytics" />
                </motion.div>
              </div>

              <div className="flex-1 flex justify-center">
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="relative"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="relative rounded-lg overflow-hidden border border-border-light"
                  ></motion.div>
                </motion.div>
              </div>
            </div>

            {/* Features Section */}
            <div className="py-20">
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-center text-white mb-16"
              >
                Trusted by professionals worldwide
              </motion.h2>

              <div className="grid lg:grid-cols-4 md:grid-cols-2 gap-8">
                <Card
                  title="Simple URL Shortening"
                  desc="Experience the ease of creating short, memorable URLs in just a few clicks. Our intuitive interface and quick setup process ensure you can start shortening URLs without any hassle."
                />
                <Card
                  title="Powerful Analytics"
                  desc="Gain insights into your link performance with our comprehensive analytics dashboard. Track clicks, geographical data, and referral sources to optimize your marketing strategies."
                />
                <Card
                  title="Enhanced Security"
                  desc="Rest assured with our robust security measures. All shortened URLs are protected with advanced encryption, ensuring your data remains safe and secure."
                />
                <Card
                  title="Fast and Reliable"
                  desc="Enjoy lightning-fast redirects and high uptime with our reliable infrastructure. Your shortened URLs will always be available and responsive, ensuring a seamless experience for your users.
"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative">
          <Footer />
        </div>
      </div>
    </div>
  );
};

const FeatureBadge = ({ icon, text }) => (
  <motion.div
    whileHover={{ scale: 1.02 }}
    className="flex items-center gap-2 px-4 py-2 rounded-md bg-bg-light border border-border-light"
  >
    <span>{icon}</span>
    <span className="text-text-secondary font-mono text-sm">{text}</span>
  </motion.div>
);

export default LandingPage;
