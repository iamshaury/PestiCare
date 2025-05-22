import React from "react";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();

  const navLinks = [
    { href: "#", label: t("home") },
    { href: "#", label: t("howItWorks") },
    { href: "#", label: t("contact") },
    { href: "#", label: t("privacyPolicy") },
    { href: "#", label: t("termsOfService") },
  ];

  return (
    <footer className="bg-white border-t border-green-200 mt-20 pt-10 pb-4 text-gray-700">
      <div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row md:justify-between md:items-start gap-10">
        <div className="flex flex-col items-center md:items-start gap-2 md:w-1/3 text-center md:text-left">
          <div className="flex items-center gap-2 mb-2 justify-center md:justify-start">
            <span
              className="inline-block text-green-600"
              style={{
                animation: "bounce 1.5s infinite alternate",
                color: "#22c55e",
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-8 h-8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 3v1.5M12 19.5V21M4.219 4.219l1.061 1.061M18.719 18.719l1.061 1.061M3 12h1.5M19.5 12H21M4.219 19.781l1.061-1.061M18.719 5.281l1.061-1.061"
                />
              </svg>
            </span>
            <span className="font-extrabold text-green-700 text-2xl tracking-tight">
              PestiCare
            </span>
          </div>
          <p className="text-gray-500 max-w-xs">
            {t("footerDesc")}
            <br />
            {t("footerLove")}
          </p>
          <div className="mt-3 text-sm text-gray-400">
            <strong>{t("contact")}:</strong> support@pesticare.com
            <br />
            <strong>{t("address")}:</strong> KIET GROUP OF INSTITUTIONS,
            GHAZIABAD
          </div>
        </div>

        {/* Navigation Links */}
        <div className="flex flex-col items-center md:items-start gap-2 md:w-1/4 text-center md:text-left">
          <span className="font-semibold text-green-700 mb-1">
            {t("quickLinks")}
          </span>
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-gray-600 hover:text-green-700 transition-colors duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>
        </div>
      </div>

      <div className="mt-8 border-t border-green-100 pt-4 text-center text-gray-400 text-sm flex flex-col items-center gap-2">
        © {new Date().getFullYear()} PestiCare. {t("allRightsReserved")}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="mt-1 px-3 py-1 bg-green-100 text-green-700 rounded hover:bg-green-200 transition text-xs"
        >
          ↑ {t("backToTop")}
        </button>
      </div>
      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0);}
          50% { transform: translateY(-8px);}
        }
      `}</style>
    </footer>
  );
};

export default Footer;
