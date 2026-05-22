import React, { useState } from "react";
import { X, ArrowRight, ExternalLink } from "lucide-react";

const ProjectCardModal = ({ title, description, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className="inline-flex items-center space-x-1 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-colors duration-200 border border-white/5"
        onClick={() => setIsOpen(true)}
      >
        <span className="text-sm">Details</span>
        <ArrowRight className="w-4 h-4 text-teal-400" />
      </button>

      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm animate-fade-in px-4"
          onClick={() => setIsOpen(false)}
        >
          <div
            className="relative w-full max-w-md rounded-2xl bg-[#04211b] border border-teal-500/20 p-6 text-white shadow-2xl animate-slide-up sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mengganti ikon Eye menjadi X (Close) yang lebih logis */}
            <button
              className="absolute top-4 right-4 rounded-md p-1.5 text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-200"
              onClick={() => setIsOpen(false)}
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            {/* Judul Pengalaman / Institusi Medik */}
            <h2 className="mb-3 pr-6 text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-teal-100 bg-clip-text text-transparent">
              {title}
            </h2>

            {/* Deskripsi Rekam Jejak Klinis */}
            <p className="mb-6 text-sm sm:text-base text-gray-300 leading-relaxed text-justify font-light">
              {description}
            </p>

            <div className="flex justify-end space-x-3 text-sm">
              <button
                className="rounded-lg bg-white/5 border border-white/10 px-4 py-2 font-medium text-gray-300 hover:bg-white/10 hover:text-white transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                Close
              </button>

              {/* Tombol aksi disesuaikan dari "Live Demo" menjadi "View Document" (Hanya muncul jika ada link) */}
              {link && (
                <a
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center rounded-lg bg-gradient-to-r from-[#14b8a6] to-[#10b981] px-4 py-2 font-medium text-white hover:opacity-90 shadow-lg shadow-teal-500/10 transition-all duration-200"
                >
                  View Document <ExternalLink className="ml-1.5 h-4 w-4" />
                </a>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProjectCardModal;
