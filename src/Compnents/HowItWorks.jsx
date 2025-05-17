import React from "react";
import { useTranslation } from "react-i18next";

const HowItWorks = () => {
  const { t } = useTranslation();
  const steps = [
    {
      title: t("step1Title"),
      description: t("step1Desc"),
      icon: (
        <svg
          className="w-10 h-10 text-green-500 mb-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 4.5V19a2 2 0 01-2 2H6a2 2 0 01-2-2v-2.5M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75"
          />
        </svg>
      ),
    },
    {
      title: t("step2Title"),
      description: t("step2Desc"),
      icon: (
        <svg
          className="w-10 h-10 text-green-500 mb-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 10l4.553-2.276A2 2 0 0020 6.382V5a2 2 0 00-2-2H6a2 2 0 00-2 2v1.382a2 2 0 00.447 1.342L9 10m6 0v4m0 0l-4.553 2.276A2 2 0 0112 17.618V19a2 2 0 002 2h4a2 2 0 002-2v-1.382a2 2 0 00-.447-1.342L15 14m0 0V10"
          />
        </svg>
      ),
    },
    {
      title: t("step3Title"),
      description: t("step3Desc"),
      icon: (
        <svg
          className="w-10 h-10 text-green-500 mb-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M9 12l2 2 4-4M7.5 21h9a2.5 2.5 0 002.5-2.5v-13A2.5 2.5 0 0016.5 3h-9A2.5 2.5 0 005 5.5v13A2.5 2.5 0 007.5 21z"
          />
        </svg>
      ),
    },
    {
      title: t("step4Title"),
      description: t("step4Desc"),
      icon: (
        <svg
          className="w-10 h-10 text-green-500 mb-3"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </svg>
      ),
    },
  ];

  return (
    <section className="w-full min-h-[70vh] flex flex-col items-center justify-center bg-gradient-to-br from-green-50 via-white to-green-100 py-16 px-4">
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-8 tracking-tight">
        {t("howItWorks")}
      </h2>
      <div className="flex flex-wrap justify-center gap-8  w-full">
        {steps.map((step, idx) => (
          <div
            key={idx}
            className="bg-white/70 backdrop-blur-lg border border-green-100 rounded-2xl shadow-xl flex flex-col items-center p-8 w-full max-w-xs transition-transform duration-300 hover:scale-105 hover:shadow-2xl"
          >
            <div className="flex items-center justify-center bg-green-100 rounded-full w-16 h-16 mb-4 shadow-md">
              {step.icon}
            </div>
            <h3 className="text-xl font-bold text-green-800 mb-2 text-center">
              {step.title}
            </h3>
            <p className="text-gray-700 text-center">{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
