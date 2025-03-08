import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { FaExternalLinkAlt, FaRegCalendarAlt } from "react-icons/fa";
import { IoCopy } from "react-icons/io5";
import { LiaCheckSolid } from "react-icons/lia";
import { MdAnalytics, MdOutlineAdsClick } from "react-icons/md";
import api from "../../api/api";
import { Link, useNavigate } from "react-router-dom";
import { useStoreContext } from "../../contextApi/ContextApi";
import { Hourglass } from "react-loader-spinner";
import Graph from "./Graph";
import { motion } from "framer-motion";
import * as Loader from "react-loader-spinner";

const ShortenItem = ({ originalUrl, shortUrl, clickCount, createdDate }) => {
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [isCopied, setIsCopied] = useState(false);
  const [analyticToggle, setAnalyticToggle] = useState(false);
  const [loader, setLoader] = useState(false);
  const [selectedUrl, setSelectedUrl] = useState("");
  const [analyticsData, setAnalyticsData] = useState([]);

  const subDomain = import.meta.env.VITE_REACT_FRONT_END_URL.replace(
    /^https?:\/\//,
    ""
  );

  const analyticsHandler = (shortUrl) => {
    if (!analyticToggle) {
      setSelectedUrl(shortUrl);
    }
    setAnalyticToggle(!analyticToggle);
  };

  const fetchMyShortUrl = async () => {
    setLoader(true);
    try {
      const { data } = await api.get(
        `/api/urls/analytics/${selectedUrl}?startDate=2024-12-01T00:00:00&endDate=2025-12-31T23:59:59`,
        {
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            Authorization: "Bearer " + token,
          },
        }
      );
      setAnalyticsData(data);
      setSelectedUrl("");
      console.log(data);
    } catch (error) {
      navigate("/error");
      console.log(error);
    } finally {
      setLoader(false);
    }
  };

  useEffect(() => {
    if (selectedUrl) {
      fetchMyShortUrl();
    }
  }, [selectedUrl]);

  return (
    <div className="bg-bg-card border border-border-light rounded-lg p-6 mb-4 transition-all duration-200 hover:border-brand-primary">
      <div className="flex sm:flex-row flex-col sm:justify-between w-full sm:gap-4 gap-5">
        <div className="flex-1 space-y-4">
          <div className="flex items-center gap-2">
            <Link
              target="_blank"
              className="text-brand-primary hover:text-brand-hover font-mono text-lg transition-colors duration-200"
              to={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
            >
              {subDomain + "/s/" + shortUrl}
            </Link>
            <FaExternalLinkAlt className="text-text-secondary" />
          </div>

          <p className="text-text-secondary break-all">{originalUrl}</p>

          <div className="flex items-center gap-8">
            <div className="flex items-center gap-2 text-text-primary">
              <MdOutlineAdsClick className="text-brand-primary text-xl" />
              <span className="font-mono">
                {clickCount} {clickCount === 1 ? "Click" : "Clicks"}
              </span>
            </div>

            <div className="flex items-center gap-2 text-text-secondary">
              <FaRegCalendarAlt className="text-brand-primary" />
              <span className="font-mono">
                {dayjs(createdDate).format("MMM DD, YYYY")}
              </span>
            </div>
          </div>
        </div>

        <div className="flex sm:flex-col flex-row gap-4">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => analyticsHandler(shortUrl)}
            className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-text-primary rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
          >
            <span>Analytics</span>
            <MdAnalytics />
          </motion.button>

          <CopyToClipboard
            onCopy={() => setIsCopied(true)}
            text={`${import.meta.env.VITE_REACT_FRONT_END_URL}/s/${shortUrl}`}
          >
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="px-4 py-2 border border-border-light hover:border-brand-primary text-text-secondary hover:text-text-primary rounded-md font-medium transition-colors duration-200 flex items-center gap-2"
            >
              {isCopied ? (
                <>
                  <span>Copied</span>
                  <LiaCheckSolid />
                </>
              ) : (
                <>
                  <span>Copy</span>
                  <IoCopy />
                </>
              )}
            </motion.button>
          </CopyToClipboard>
        </div>
      </div>

      {analyticToggle && (
        <div className="mt-6 border-t border-border-light pt-6">
          {loader ? (
            <Loader />
          ) : (
            <div className="h-96 relative">
              {analyticsData.length === 0 ? (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <h1 className="text-text-primary font-display text-xl font-semibold mb-2">
                    No Analytics Data
                  </h1>
                  <p className="text-text-secondary text-center max-w-md">
                    Share your link to start collecting analytics
                  </p>
                </div>
              ) : (
                <Graph graphData={analyticsData} />
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ShortenItem;
