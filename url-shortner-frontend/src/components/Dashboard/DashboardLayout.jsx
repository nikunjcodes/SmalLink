import React, { useState } from "react";
import Graph from "./Graph";
import { dummyData } from "../../dummyData/data";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useFetchMyShortUrls, useFetchTotalClicks } from "../../hooks/useQuery";
import ShortenPopUp from "./ShortenPopUp";
import { FaLink } from "react-icons/fa";
import ShortenUrlList from "./ShortenUrlList";
import { useNavigate } from "react-router-dom";
import Loader from "../Loader";
import { motion } from "framer-motion";

const DashboardLayout = () => {
  // const refetch = false;
  const { token } = useStoreContext();
  const navigate = useNavigate();
  const [shortenPopUp, setShortenPopUp] = useState(false);

  // console.log(useFetchTotalClicks(token, onError));

  const {
    isLoading,
    data: myShortenUrls,
    refetch,
  } = useFetchMyShortUrls(token, onError);

  const { isLoading: loader, data: totalClicks } = useFetchTotalClicks(
    token,
    onError
  );

  function onError() {
    navigate("/error");
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-bg-dark lg:px-14 sm:px-8 px-4">
      {loader ? (
        <Loader />
      ) : (
        <div className="lg:w-[90%] w-full mx-auto py-16">
          <div className="relative bg-bg-card border border-border-light rounded-lg p-6 mb-8">
            <h2 className="text-text-primary font-display text-xl font-semibold mb-4">
              Analytics Overview
            </h2>
            {totalClicks.length === 0 ? (
              <div className="absolute flex flex-col justify-center items-center w-full left-0 top-0 bottom-0 right-0 m-auto">
                <h1 className="text-text-primary font-display text-xl font-semibold mb-2">
                  No Data Available
                </h1>
                <p className="text-text-secondary text-center max-w-md">
                  Share your short links to start seeing analytics data
                </p>
              </div>
            ) : (
              <div className="h-96">
                <Graph graphData={totalClicks} />
              </div>
            )}
          </div>

          <div className="flex justify-end mb-6">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShortenPopUp(true)}
              className="px-6 py-3 bg-brand-primary hover:bg-brand-hover text-text-primary rounded-md font-medium transition-colors duration-200"
            >
              Create New Short URL
            </motion.button>
          </div>

          {!isLoading && myShortenUrls.length === 0 ? (
            <div className="flex justify-center pt-16">
              <div className="flex gap-2 items-center justify-center p-6 rounded-lg bg-bg-card border border-border-light">
                <h1 className="text-text-primary font-display">
                  No short links created yet
                </h1>
                <FaLink className="text-brand-primary text-xl" />
              </div>
            </div>
          ) : (
            <ShortenUrlList data={myShortenUrls} />
          )}
        </div>
      )}

      <ShortenPopUp
        refetch={refetch}
        open={shortenPopUp}
        setOpen={setShortenPopUp}
      />
    </div>
  );
};

export default DashboardLayout;
