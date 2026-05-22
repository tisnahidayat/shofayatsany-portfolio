import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink, ArrowRight } from "lucide-react";
import { toSlug } from "../utils/slug";

const CardProject = ({ Img, Title, Description, Link: ProjectLink, id }) => {
  const handleLiveDemo = (e) => {
    if (!ProjectLink) {
      console.log("ProjectLink/Berkas kosong");
      e.preventDefault();
      alert("Document link is not available");
    }
  };

  const handleDetails = (e) => {
    if (!id) {
      console.log("ID kosong");
      e.preventDefault();
      alert("Track record details are not available");
    }
  };

  return (
    <div className="group relative w-full h-full">
      {/* Mengubah warna dasar card dan efek hover shadow ke tema Teal */}
      <div className="relative h-full overflow-hidden rounded-xl bg-gradient-to-br from-[#04211b]/90 to-[#02110e]/90 backdrop-blur-lg border border-white/5 shadow-2xl transition-all duration-300 hover:shadow-teal-500/10">
        {/* Mengubah pendaran gradasi latar belakang ke warna Teal & Emerald */}
        <div className="absolute inset-0 bg-gradient-to-br from-teal-500/5 via-emerald-500/5 to-cyan-500/5 opacity-50 group-hover:opacity-70 transition-opacity duration-300"></div>

        <div className="relative p-5 z-10 flex flex-col h-full justify-between">
          <div>
            <div className="relative overflow-hidden rounded-lg">
              <img
                src={Img}
                alt={Title}
                className="w-full h-full object-cover aspect-[16/8] transform group-hover:scale-103 transition-transform duration-500"
              />
            </div>

            <div className="mt-4 space-y-2">
              {/* Mengubah gradasi judul teks menjadi putih-teal cerah */}
              <h3 className="text-xl font-semibold bg-gradient-to-r from-white via-teal-100 to-emerald-200 bg-clip-text text-transparent">
                {Title}
              </h3>

              <p className="text-gray-300/80 text-sm leading-relaxed line-clamp-2 font-light">
                {Description}
              </p>
            </div>
          </div>

          <div className="pt-4 flex items-center justify-between mt-auto">
            {/* Penyesuaian teks aksi dari "Live Demo" menjadi "Document" */}
            {ProjectLink ? (
              <a
                href={ProjectLink || "#"}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLiveDemo}
                className="inline-flex items-center space-x-1.5 text-teal-400 hover:text-teal-300 transition-colors duration-200"
              >
                <span className="text-sm font-medium">Document</span>
                <ExternalLink className="w-4 h-4" />
              </a>
            ) : (
              <span className="text-gray-500 text-xs font-light">
                No Document Attached
              </span>
            )}

            {id ? (
              <Link
                to={`/project/${toSlug(Title)}`}
                onClick={handleDetails}
                className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 text-white/90 transition-all duration-200 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-teal-500/30 border border-white/5"
              >
                <span className="text-sm font-medium">Details</span>
                <ArrowRight className="w-4 h-4 text-teal-400" />
              </Link>
            ) : (
              <span className="text-gray-500 text-xs font-light">
                Details Not Available
              </span>
            )}
          </div>
        </div>

        {/* Mengubah border hover dari warna ungu menjadi Teal */}
        <div className="absolute inset-0 border border-teal-500/0 group-hover:border-teal-500/30 rounded-xl transition-colors duration-300 -z-50"></div>
      </div>
    </div>
  );
};

export default CardProject;
