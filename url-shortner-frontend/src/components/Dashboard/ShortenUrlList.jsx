import React from "react";
import ShortenItem from "./ShortenItem";
import { motion } from "framer-motion";

const ShortenUrlList = ({ data }) => {
  return (
    <div className="space-y-4">
      {data.map((item) => (
        <motion.div
          key={item.id}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          <ShortenItem {...item} />
        </motion.div>
      ))}
    </div>
  );
};

export default ShortenUrlList;
