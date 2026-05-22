import React from "react";

const TechStackIcon = ({ TechStackIcon, Language }) => {
  return (
    <div className="group p-4 sm:p-6 rounded-2xl bg-[#04211b]/30 backdrop-blur-sm border border-white/5 hover:bg-[#0d9488]/10 transition-all duration-300 ease-in-out flex flex-col items-center justify-center gap-3 hover:scale-105 cursor-pointer shadow-lg hover:shadow-teal-500/5 h-full">
      <div className="relative flex items-center justify-center">
        {/* Mengubah efek glow lingkaran belakang menjadi Teal & Emerald */}
        <div className="absolute -inset-2 bg-gradient-to-r from-[#14b8a6] to-[#10b981] rounded-full opacity-0 group-hover:opacity-40 blur-md transition duration-300"></div>

        <img
          src={TechStackIcon}
          alt={`${Language} icon`}
          className="relative h-12 w-12 sm:h-16 sm:w-16 md:h-20 md:w-20 object-contain transform transition-transform duration-300 group-hover:scale-110"
        />
      </div>

      {/* Menambahkan text-center dan membatasi ukuran teks agar rapi saat patah baris */}
      <span className="text-slate-300 font-medium text-xs sm:text-sm md:text-base tracking-wide text-center group-hover:text-white transition-colors duration-300 max-w-full line-clamp-2 px-1">
        {Language}
      </span>
    </div>
  );
};

export default TechStackIcon;
