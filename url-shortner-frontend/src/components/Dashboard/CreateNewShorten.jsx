import React, { useState } from "react";
import { useStoreContext } from "../../contextApi/ContextApi";
import { useForm } from "react-hook-form";
import { data } from "autoprefixer";
import TextField from "../TextField";
import { Tooltip } from "@mui/material";
import { RxCross2 } from "react-icons/rx";
import api from "../../api/api";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CreateNewShorten = ({ setOpen, refetch }) => {
  const { token } = useStoreContext();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      originalUrl: "",
    },
    mode: "onTouched",
  });

  const createShortUrlHandler = async (data) => {
    setLoading(true);
    try {
      const { data: res } = await api.post("/api/urls/shorten", data, {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: "Bearer " + token,
        },
      });

      const shortenUrl = `${
        import.meta.env.VITE_REACT_FRONT_END_URL + "/s/" + `${res.shortUrl}`
      }`;
      navigator.clipboard.writeText(shortenUrl).then(() => {
        toast.success("Short URL Copied to Clipboard", {
          position: "bottom-center",
          className: "mb-5",
          duration: 3000,
        });
      });

      // await refetch();
      reset();
      setOpen(false);
    } catch (error) {
      toast.error("Create ShortURL Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="flex justify-center items-center"
    >
      <form
        onSubmit={handleSubmit(createShortUrlHandler)}
        className="sm:w-[450px] w-[360px] relative bg-bg-card border border-border-light rounded-lg shadow-lg p-8"
      >
        <div className="text-center mb-6">
          <h1 className="font-display text-2xl font-bold text-text-primary">
            Create New Short Link
          </h1>
          <p className="text-text-secondary mt-2">
            Enter a long URL to create a shortened version
          </p>
        </div>

        <div className="mb-6">
          <TextField
            label="Enter URL"
            required
            id="originalUrl"
            placeholder="https://example.com"
            type="url"
            message="URL is required"
            register={register}
            errors={errors}
          />
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="w-full px-6 py-3 bg-brand-primary hover:bg-brand-hover text-text-primary rounded-md font-medium transition-colors duration-200"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
              />
              <span>Creating...</span>
            </div>
          ) : (
            "Create Link"
          )}
        </motion.button>

        {!loading && (
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(false)}
            className="absolute right-4 top-4 text-text-secondary hover:text-text-primary transition-colors duration-200"
          >
            <RxCross2 className="text-2xl" />
          </motion.button>
        )}
      </form>
    </motion.div>
  );
};

export default CreateNewShorten;
