import React from "react";
import { Link } from "react-router-dom";
import { FaGithub, FaTwitter, FaLinkedin, FaInstagram } from "react-icons/fa";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-bg-dark border-t border-border-light text-text-secondary">
      <div className="max-w-7xl mx-auto px-6 lg:px-14 py-12">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <h2 className="font-display text-2xl font-bold text-text-primary">
                Link<span className="text-brand-primary">Chota</span>
              </h2>
            </Link>
            <p className="text-sm leading-relaxed">
              Professional URL shortening service designed for modern businesses
              and individuals.
            </p>
            <div className="flex space-x-4 pt-2">
              <SocialLink
                href="https://github.com/nikunjcodes"
                icon={<FaGithub size={20} />}
              />
              <SocialLink
                href="https://twitter.com/nikunjcodes"
                icon={<FaTwitter size={20} />}
              />
              <SocialLink
                href="https://www.linkedin.com/in/nikunj-jakhotiya-894331291/"
                icon={<FaLinkedin size={20} />}
              />
              <SocialLink
                href="https://www.instagram.com/nikunjjakhotiya16/"
                icon={<FaInstagram size={20} />}
              />
            </div>
          </div>

          {/* Product Links */}
          <div>
            <h3 className="font-display font-semibold text-text-primary mb-4">
              Product
            </h3>
            <ul className="space-y-3">
              <FooterLink text="Features" />
              <FooterLink text="Analytics" />
              <FooterLink text="Security" />
              <FooterLink text="Pricing" />
            </ul>
          </div>

          {/* Resources Links */}
          <div>
            <h3 className="font-display font-semibold text-text-primary mb-4">
              Resources
            </h3>
            <ul className="space-y-3">
              <FooterLink text="Documentation" />
              <FooterLink text="API Reference" />
              <FooterLink text="Blog" />
              <FooterLink text="Status" />
            </ul>
          </div>

          {/* Company Links */}
          <div>
            <h3 className="font-display font-semibold text-text-primary mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <FooterLink text="About Us" />
              <FooterLink text="Careers" />
              <FooterLink text="Legal" />
              <FooterLink text="Contact" />
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="mt-12 py-8 border-t border-border-light">
          <div className="max-w-md">
            <h3 className="font-display font-semibold text-text-primary mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm mb-4">
              Get the latest updates and news directly in your inbox.
            </p>
            <form className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-md bg-bg-light border border-border-light focus:border-brand-primary focus:outline-none text-text-primary"
              />
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="px-4 py-2 bg-brand-primary hover:bg-brand-hover text-text-primary rounded-md font-medium transition-colors duration-200"
              >
                Subscribe
              </motion.button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t border-border-light flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm">
            © {new Date().getFullYear()} LinkChota. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm">
            <Link
              to="/privacy"
              className="hover:text-text-primary transition-colors duration-200"
            >
              Privacy Policy
            </Link>
            <Link
              to="/terms"
              className="hover:text-text-primary transition-colors duration-200"
            >
              Terms of Service
            </Link>
            <Link
              to="/cookies"
              className="hover:text-text-primary transition-colors duration-200"
            >
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Social Link Component
const SocialLink = ({ href, icon }) => (
  <motion.a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    whileHover={{ scale: 1.1, y: -2 }}
    className="text-text-secondary hover:text-brand-primary transition-colors duration-200"
  >
    {icon}
  </motion.a>
);

// Footer Link Component
const FooterLink = ({ text }) => (
  <li>
    <Link
      to="#"
      className="text-text-secondary hover:text-text-primary transition-colors duration-200 text-sm"
    >
      {text}
    </Link>
  </li>
);

export default Footer;
