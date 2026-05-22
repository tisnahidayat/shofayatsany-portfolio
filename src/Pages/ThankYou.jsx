import React from "react";
import { CheckCircle } from "lucide-react";
import { Link } from "react-router-dom";

const ThankYouPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-[#031411]">
      <div className="text-center">
        {/* Mengubah warna ikon CheckCircle menjadi Teal */}
        <div className="flex justify-center mb-6">
          <CheckCircle className="w-16 h-16 text-[#14b8a6]" />
        </div>

        {/* Mengubah gradasi judul ke Teal & Emerald */}
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] to-[#10b981]">
          Thank You!
        </h1>

        <p className="text-gray-400 text-lg mb-8 font-light">
          Your message has been received. I'll get back to you as soon as
          possible.
        </p>

        {/* Mengubah warna tombol utama & efek bayangan (shadow-glow) ke tema Teal */}
        <Link
          to="/"
          className="inline-flex items-center justify-center px-8 py-3 bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white rounded-xl font-semibold transition-all duration-300 hover:scale-[1.02] hover:shadow-lg hover:shadow-teal-500/20 active:scale-[0.98]"
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default ThankYouPage;
