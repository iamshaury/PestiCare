import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const MainContent = () => {
  const { t } = useTranslation();
  const [preview, setPreview] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleDetectDisease = () => {
    alert("Disease detection not implemented.");
  };

  return (
    <div
      className="w-full flex flex-col items-center justify-center min-h-[80vh] 
        bg-gradient-to-br from-green-50 via-white to-green-100 relative overflow-hidden"
    >
      <video
        src="/video.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="absolute top-0 left-0 w-full h-full object-cover opacity-90 blur-md z-0]"
      ></video>
      <div className="absolute top-0 left-0 w-40 h-40 bg-green-200 rounded-full opacity-30 blur-2xl animate-float-slow -z-10" />
      <div className="absolute bottom-0 right-0 w-56 h-56 bg-green-300 rounded-full opacity-20 blur-2xl animate-float-slower -z-10" />
      <main className="flex flex-col items-center mt-16 animate-fade-in-up w-full px-4 mb-20">
        <h1 className="text-4xl md:text-5xl font-extrabold text-center text-gray-900 mb-2 tracking-tight animate-slide-in-down z-1">
          {t("title")}
        </h1>
        <p className="text-lg md:text-xl text-gray-800 mt-2 text-center animate-fade-in-up z-1">
          {t("subtitle")}
        </p>
        <section className="mt-14 bg-white/60 backdrop-blur-lg shadow-xl rounded-3xl p-10 w-full max-w-md flex flex-col items-center border border-green-100 animate-fade-in-up">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 animate-slide-in-left">
            {t("upload")}
          </h2>
          <label
            htmlFor="leaf-upload"
            className="w-full flex flex-col items-center justify-center border-2 border-dashed border-green-400 rounded-xl p-6 cursor-pointer transition-all duration-300 hover:bg-green-50 hover:border-green-600 animate-pulse"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-12 h-12 text-green-500 mb-2 animate-fade-in"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 16v-4m0 0V8m0 4h4m-4 0H8m12 4.5V19a2 2 0 01-2 2H6a2 2 0 01-2-2v-2.5M16 3.13a4 4 0 010 7.75M8 3.13a4 4 0 000 7.75"
              />
            </svg>
            <span className="text-gray-600 font-medium">
              Click or drag & drop to upload
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
            <div className="mt-6">
              <img
                src={preview}
                alt="Uploaded Preview"
                className="w-40 h-40 object-cover rounded-lg shadow-md"
              />
            </div>
          )}

          <button
            onClick={handleDetectDisease}
            className="mt-6 bg-green-600 text-white rounded-lg px-8 py-2 text-base font-semibold shadow-md transition-all duration-300 hover:bg-green-700 hover:scale-105 focus:outline-none animate-bounce-in"
          >
            {t("detect")}
          </button>
        </section>
      </main>
    </div>
  );
};

export default MainContent;
