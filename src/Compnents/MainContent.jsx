import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const AccordionSection = ({ title, children, defaultOpen = false }) => {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="mb-2 border-b border-gray-200">
      <button
        className="w-full flex justify-between items-center py-2 text-left font-semibold text-green-700 hover:text-green-900 focus:outline-none"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
      >
        <span>{title}</span>
        <span>{open ? "▲" : "▼"}</span>
      </button>
      {open && <div className="pl-2 pb-2 text-gray-800">{children}</div>}
    </div>
  );
};

const DetailModal = ({ result, open, onClose }) => {
  const { t } = useTranslation();
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/40 z-40"
        onClick={onClose}
        aria-label={t("closeModal")}
      />
      {/* Modal content */}
      <div className="bg-white rounded-xl shadow-lg max-w-md w-full p-6 relative z-50">
        <button
          className="absolute top-2 right-3 text-gray-500 hover:text-green-700 text-2xl font-bold"
          onClick={onClose}
          aria-label={t("close")}
        >
          ×
        </button>
        <div className="flex flex-col items-center mb-4">
          <span className="text-4xl">
            {result.simple_name?.toLowerCase().includes("healthy")
              ? "✅"
              : "⚠️"}
          </span>
          <div
            className={`font-bold text-lg ${
              result.simple_name?.toLowerCase().includes("healthy")
                ? "text-green-700"
                : "text-yellow-700"
            }`}
          >
            {result.simple_name}
          </div>
          <div className="text-gray-700 text-base">
            {t("confidence")}: {(result.confidence * 100).toFixed(2)}%
          </div>
        </div>
        <AccordionSection title={t("whatToDo")} defaultOpen>
          {result.advice}
        </AccordionSection>
        {result.symptoms && (
          <AccordionSection title={t("symptoms")}>
            {result.symptoms}
          </AccordionSection>
        )}
        {result.causes && (
          <AccordionSection title={t("causes")}>
            {result.causes}
          </AccordionSection>
        )}
        {result.prevention && (
          <AccordionSection title={t("prevention")}>
            {result.prevention}
          </AccordionSection>
        )}
        {result.treatment && (
          <AccordionSection title={t("treatment")}>
            {result.treatment}
          </AccordionSection>
        )}
      </div>
    </div>
  );
};

const MainContent = () => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
      setResult(null);
    }
  };

  const handleDetectDisease = async () => {
    if (!selectedFile) {
      alert(t("pleaseUploadImage"));
      return;
    }
    setLoading(true);
    setResult(null);
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await fetch("http://localhost:5000/predict", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (response.ok) {
        setResult(data);
        setModalOpen(true); // Open modal on result
      } else {
        setResult({ error: data.error || t("predictionFailed") });
      }
    } catch {
      setResult({ error: t("serverError") });
    }
    setLoading(false);
  };

  return (
    <div className="w-full flex flex-col items-center justify-center min-h-[80vh] bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden">
      <video
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-90 blur-md z-0"
      ></video>
      <main className="flex flex-col items-center w-full px-2 sm:px-4 mb-10">
        <h1 className="z-9 text-2xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-2 tracking-tight">
          {t("title")}
        </h1>
        <p className="z-9 text-base sm:text-lg md:text-xl text-gray-800 mt-2 text-center mb-6">
          {t("subtitle")}
        </p>
        <section className="bg-white/80 backdrop-blur-lg shadow-xl rounded-3xl p-4 sm:p-6 md:p-8 w-full max-w-xs sm:max-w-md md:max-w-lg flex flex-col items-center border border-green-100">
          <label
            htmlFor="leaf-upload"
            className="w-full flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-xl p-4 sm:p-6 cursor-pointer transition-all duration-300 hover:bg-green-50 hover:border-green-600 mb-4"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 sm:h-12 sm:w-12 text-green-400 mb-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2M7 10l5-5m0 0l5 5m-5-5v12"
              />
            </svg>
            <span className="text-green-700 font-semibold text-sm sm:text-base">
              {preview ? t("changeImage") : t("upload")}
            </span>
            <input
              id="leaf-upload"
              type="file"
              accept="image/*"
              capture="environment"
              onChange={handleFileChange}
              className="hidden"
            />
          </label>

          {preview && (
            <div className="mt-2 mb-4">
              <img
                src={preview}
                alt={t("uploadedPreview")}
                className="w-28 h-28 sm:w-40 sm:h-40 object-cover rounded-lg shadow-md border border-green-200"
              />
            </div>
          )}

          <button
            onClick={handleDetectDisease}
            className="mt-2 bg-green-600 text-white rounded-lg px-6 sm:px-8 py-2 text-base font-semibold shadow-md transition-all duration-300 hover:bg-green-700 hover:scale-105 focus:outline-none"
            disabled={loading}
          >
            {loading ? t("analyzing") : t("detect")}
          </button>

          {/* Show "View Details" button if result is available and not error */}
          {result && !result.error && (
            <button
              className="mt-4 bg-yellow-100 text-yellow-800 font-semibold px-4 sm:px-6 py-2 rounded-lg shadow hover:bg-yellow-200 transition"
              onClick={() => setModalOpen(true)}
            >
              {t("viewDetails")}
            </button>
          )}
          {/* Show error if any */}
          {result && result.error && (
            <div className="mt-4 text-red-600 font-semibold">
              {result.error}
            </div>
          )}
        </section>
      </main>
      {/* Modal for details */}
      {result && !result.error && (
        <DetailModal
          result={result}
          open={modalOpen}
          onClose={() => setModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MainContent;
