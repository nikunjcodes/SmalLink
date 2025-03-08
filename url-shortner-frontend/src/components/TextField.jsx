import { useState } from "react";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock } from "react-icons/fa";

const TextField = ({
  label,
  id,
  type: initialType,
  errors,
  register,
  required,
  message,
  min,
  placeholder,
}) => {
  const [type, setType] = useState(initialType);

  const getIcon = () => {
    switch (id) {
      case "username":
        return <FaUser className="text-text-muted" />;
      case "email":
        return <FaEnvelope className="text-text-muted" />;
      case "password":
        return <FaLock className="text-text-muted" />;
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col gap-1.5"
    >
      <label
        htmlFor={id}
        className="font-medium text-text-primary text-sm flex items-center gap-2"
      >
        {getIcon()}
        {label}
      </label>

      <div className="relative">
        <input
          type={type}
          id={id}
          placeholder={placeholder}
          className={`w-full px-4 py-2.5 bg-bg-light border rounded-md outline-none transition-all duration-200 text-text-primary placeholder:text-text-muted
                      ${
                        errors[id]?.message
                          ? "border-red-500 focus:border-red-500"
                          : "border-border-light focus:border-brand-primary"
                      }
                      ${initialType === "password" ? "pr-12" : ""}`}
          {...register(id, {
            required: { value: required, message },
            minLength: min
              ? { value: min, message: "Minimum 6 characters required" }
              : null,
            pattern:
              initialType === "email"
                ? {
                    value: /^[a-zA-Z0-9]+@(?:[a-zA-Z0-9]+\.)+com+$/,
                    message: "Invalid email",
                  }
                : initialType === "url"
                ? {
                    value:
                      /^(https?:\/\/)?(([a-zA-Z0-9\u00a1-\uffff-]+\.)+[a-zA-Z\u00a1-\uffff]{2,})(:\d{2,5})?(\/[^\s]*)?$/,
                    message: "Please enter a valid URL",
                  }
                : null,
          })}
        />

        {initialType === "password" && (
          <motion.button
            type="button"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setType(type === "password" ? "text" : "password")}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-text-muted hover:text-text-primary transition-colors duration-200"
          >
            {type === "password" ? (
              <FaEye size={20} />
            ) : (
              <FaEyeSlash size={20} />
            )}
          </motion.button>
        )}
      </div>

      {errors[id]?.message && (
        <motion.p
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-sm text-red-500 mt-1 flex items-center gap-1"
        >
          <span className="text-lg">⚠</span>
          {errors[id]?.message}
        </motion.p>
      )}
    </motion.div>
  );
};

export default TextField;
