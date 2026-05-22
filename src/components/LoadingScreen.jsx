import React from "react";

const LoadingScreen = () => {
  return (
    <div className="min-h-screen bg-[#031411] flex items-center justify-center">
      <div className="relative">
        {/* Mengubah pendaran background belakang menjadi Teal & Emerald */}
        <div className="absolute -inset-4 bg-gradient-to-r from-[#14b8a6] to-[#10b981] rounded-full opacity-20 blur-2xl animate-pulse"></div>

        <div className="relative flex flex-col items-center gap-4 p-8">
          {/* Spinner diubah warna utamanya ke Teal dengan t-transparent */}
          <div className="w-12 h-12 rounded-full border-4 border-t-transparent border-[#14b8a6] animate-spin"></div>

          <div className="relative">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#14b8a6] to-[#10b981] rounded blur opacity-20"></div>
            <span className="relative text-teal-100/80 text-sm tracking-wider font-medium animate-pulse">
              Loading...
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
