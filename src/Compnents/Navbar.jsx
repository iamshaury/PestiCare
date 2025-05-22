import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    }
    if (dropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownOpen]);

  const switchLanguage = (lang) => {
    i18n.changeLanguage(lang);
    setSelectedLanguage(lang);
    setDropdownOpen(false);
  };

  // Close mobile menu on navigation
  const handleNavClick = () => setMobileMenuOpen(false);

  return (
    <div className="relative" ref={dropdownRef}>
      <header
        className={`sticky top-0 z-30 flex items-center justify-between py-4 px-4 sm:px-8
          bg-white border-b border-gray-200
          transition-all duration-300 ${
            scrolled
              ? "shadow-xl backdrop-blur-md"
              : "shadow-md backdrop-blur-none"
          }`}
        style={{ backdropFilter: scrolled ? "blur(8px)" : "none" }}
      >
        <div className="flex items-center gap-2">
          <span
            className="inline-block text-green-600"
            style={{
              animation: "bounce 1.5s infinite alternate",
              transition: "color 0.3s",
              color: "#22c55e",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-8 h-8 hover:scale-110 transition-transform duration-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M18.719 18.719l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M18.719 5.281l1.061-1.061"
              />
            </svg>
          </span>
          <span className="cursor-pointer font-extrabold text-green-700 text-2xl tracking-tight">
            PestiCare
          </span>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-8 text-base items-center">
          <a
            href="#"
            className="text-gray-900 no-underline transition-colors duration-200 hover:text-green-700 hover:underline"
          >
            {t("home")}
          </a>
          <a
            href="#"
            className="text-gray-900 no-underline transition-colors duration-200 hover:text-green-700 hover:underline"
          >
            {t("howItWorks")}
          </a>
          <a
            href="#"
            className="text-gray-900 no-underline transition-colors duration-200 hover:text-green-700 hover:underline"
          >
            {t("contact")}
          </a>
          <div className="relative">
            <button
              onClick={() => setDropdownOpen((open) => !open)}
              className="px-3 py-1 bg-green-100 text-green-800 rounded-md shadow-sm hover:bg-green-200 transition-colors duration-200 focus:outline-none"
            >
              🌐 {t("language")}
            </button>
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fade-in-up">
                <button
                  onClick={() => switchLanguage("en")}
                  className={`block w-full text-left px-4 py-2 transition-colors duration-150 ${
                    selectedLanguage === "en"
                      ? "bg-green-300 text-green-700 font-semibold"
                      : "hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  English
                </button>
                <button
                  onClick={() => switchLanguage("hi")}
                  className={`block w-full text-left px-4 py-2 transition-colors duration-150 ${
                    selectedLanguage === "hi"
                      ? "bg-green-300 text-green-700 font-semibold"
                      : "hover:bg-green-50 hover:text-green-700"
                  }`}
                >
                  हिंदी
                </button>
              </div>
            )}
          </div>
        </nav>

        {/* Hamburger for Mobile */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-10 h-10 rounded hover:bg-green-100 transition"
          onClick={() => setMobileMenuOpen((open) => !open)}
          aria-label="Open menu"
        >
          <span className="block w-6 h-0.5 bg-green-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-green-700 mb-1"></span>
          <span className="block w-6 h-0.5 bg-green-700"></span>
        </button>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 flex flex-col items-end md:hidden">
          <div
            className="w-3/4 max-w-xs bg-white h-full shadow-lg p-6 flex flex-col gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="self-end text-2xl text-gray-500 hover:text-green-700 mb-4"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
            >
              ×
            </button>
            <a
              href="#"
              className="text-gray-900 text-lg font-semibold no-underline hover:text-green-700 hover:underline"
              onClick={handleNavClick}
            >
              {t("home")}
            </a>
            <a
              href="#"
              className="text-gray-900 text-lg font-semibold no-underline hover:text-green-700 hover:underline"
              onClick={handleNavClick}
            >
              {t("howItWorks")}
            </a>
            <a
              href="#"
              className="text-gray-900 text-lg font-semibold no-underline hover:text-green-700 hover:underline"
              onClick={handleNavClick}
            >
              {t("contact")}
            </a>
            <div className="relative">
              <button
                onClick={() => setDropdownOpen((open) => !open)}
                className="px-3 py-1 bg-green-100 text-green-800 rounded-md shadow-sm hover:bg-green-200 transition-colors duration-200 focus:outline-none w-full text-left"
              >
                🌐 {t("language")}
              </button>
              {dropdownOpen && (
                <div className="absolute left-0 mt-2 w-32 bg-white border border-gray-200 rounded-md shadow-lg z-50 animate-fade-in-up">
                  <button
                    onClick={() => switchLanguage("en")}
                    className={`block w-full text-left px-4 py-2 transition-colors duration-150 ${
                      selectedLanguage === "en"
                        ? "bg-green-300 text-green-700 font-semibold"
                        : "hover:bg-green-50 hover:text-green-700"
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => switchLanguage("hi")}
                    className={`block w-full text-left px-4 py-2 transition-colors duration-150 ${
                      selectedLanguage === "hi"
                        ? "bg-green-300 text-green-700 font-semibold"
                        : "hover:bg-green-50 hover:text-green-700"
                    }`}
                  >
                    हिंदी
                  </button>
                </div>
              )}
            </div>
          </div>
          {/* Click outside to close */}
          <div
            className="flex-1 w-full"
            onClick={() => setMobileMenuOpen(false)}
            aria-label="Close menu"
          />
        </div>
      )}

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-8px);}
        }
      `}</style>
    </div>
  );
};

export default Navbar;
