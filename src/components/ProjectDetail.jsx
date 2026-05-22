import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  ExternalLink,
  FileText,
  HeartHandshake,
  Star,
  ChevronRight,
  Layers,
  Layout,
  Globe,
  Package,
  Cpu,
  Code,
  Activity,
} from "lucide-react";
import Swal from "sweetalert2";
import { toSlug } from "../utils/slug";

// Pemetaan icon bawaan dialihkan untuk melambangkan kompetensi farmasi
const TECH_ICONS = {
  React: Globe,
  Tailwind: Layout,
  Express: Cpu,
  Python: Code,
  Javascript: Code,
  HTML: Code,
  CSS: Code,
  default: Package,
};

const TechBadge = ({ tech }) => {
  const Icon = TECH_ICONS[tech] || TECH_ICONS["default"];
  return (
    <div className="group relative overflow-hidden px-3 py-2 md:px-4 md:py-2.5 bg-gradient-to-r from-teal-600/10 to-emerald-600/10 rounded-xl border border-teal-500/10 hover:border-teal-500/30 transition-all duration-300 cursor-default">
      <div className="absolute inset-0 bg-gradient-to-r from-teal-500/0 to-emerald-500/0 group-hover:from-teal-500/10 group-hover:to-emerald-500/10 transition-all duration-500" />
      <div className="relative flex items-center gap-1.5 md:gap-2">
        <Icon className="w-3.5 h-3.5 md:w-4 md:h-4 text-teal-400 group-hover:text-teal-300 transition-colors" />
        <span className="text-xs md:text-sm font-medium text-teal-300/90 group-hover:text-teal-200 transition-colors">
          {tech}
        </span>
      </div>
    </div>
  );
};

const FeatureItem = ({ feature }) => {
  return (
    <li className="group flex items-start space-x-3 p-2.5 md:p-3.5 rounded-xl hover:bg-white/5 transition-all duration-300 border border-transparent hover:border-white/10">
      <div className="relative mt-2">
        <div className="absolute -inset-1 bg-gradient-to-r from-teal-600/20 to-emerald-600/20 rounded-full blur group-hover:opacity-100 opacity-0 transition-opacity duration-300" />
        <div className="relative w-1.5 h-1.5 md:w-2 md:h-2 rounded-full bg-gradient-to-r from-teal-400 to-emerald-400 group-hover:scale-125 transition-transform duration-300" />
      </div>
      <span className="text-sm md:text-base text-gray-300 group-hover:text-white transition-colors">
        {feature}
      </span>
    </li>
  );
};

const ProjectStats = ({ project }) => {
  const techStackCount = project?.TechStack?.length || 0;
  const featuresCount = project?.Features?.length || 0;

  return (
    <div className="grid grid-cols-2 gap-3 md:gap-4 p-3 md:p-4 bg-[#041a16] rounded-xl overflow-hidden relative border border-white/5">
      <div className="absolute inset-0 bg-gradient-to-br from-teal-900/20 to-emerald-900/20 opacity-50 blur-2xl z-0" />
      
      {/* STAT 1: TECH STACK -> KOMPETENSI POKOK */}
      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-teal-500/20 transition-all duration-300 hover:scale-105 hover:border-teal-500/50 hover:shadow-lg">
        <div className="bg-teal-500/20 p-1.5 md:p-2 rounded-full">
          <HeartHandshake
            className="text-teal-300 w-4 h-4 md:w-6 md:h-6"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-teal-200">
            {techStackCount}
          </div>
          <div className="text-[10px] md:text-xs text-gray-400">
            Kompetensi Pokok
          </div>
        </div>
      </div>

      {/* STAT 2: FEATURES -> CAPAIAN KHUSUS */}
      <div className="relative z-10 flex items-center space-x-2 md:space-x-3 bg-white/5 p-2 md:p-3 rounded-lg border border-emerald-500/20 transition-all duration-300 hover:scale-105 hover:border-emerald-500/50 hover:shadow-lg">
        <div className="bg-emerald-500/20 p-1.5 md:p-2 rounded-full">
          <Layers
            className="text-emerald-300 w-4 h-4 md:w-6 md:h-6"
            strokeWidth={1.5}
          />
        </div>
        <div className="flex-grow">
          <div className="text-lg md:text-xl font-semibold text-emerald-200">
            {featuresCount}
          </div>
          <div className="text-[10px] md:text-xs text-gray-400">
            Capaian Khusus
          </div>
        </div>
      </div>
    </div>
  );
};

const handleGithubClick = (githubLink) => {
  if (githubLink === "Private" || !githubLink) {
    Swal.fire({
      icon: "info",
      title: "Referensi Bersifat Internal",
      text: "Maaf, detail dokumen referensi untuk rekam jejak ini hanya dapat diakses secara internal.",
      confirmButtonText: "Mengerti",
      confirmButtonColor: "#14b8a6",
      background: "#04211b",
      color: "#ffffff",
    });
    return false;
  }
  return true;
};

const ProjectDetails = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    const storedProjects = JSON.parse(localStorage.getItem("projects")) || [];
    const selectedProject = storedProjects.find(
      (p) => toSlug(p.Title) === slug,
    );

    if (selectedProject) {
      const enhancedProject = {
        ...selectedProject,
        Features: selectedProject.Features || [],
        TechStack: selectedProject.TechStack || [],
        Github: selectedProject.Github || "",
      };
      setProject(enhancedProject);
    }
  }, [slug]);

  if (!project) {
    return (
      <div className="min-h-screen bg-[#031411] flex items-center justify-center">
        <div className="text-center space-y-6 animate-fadeIn">
          <div className="w-16 h-16 md:w-24 md:h-24 mx-auto border-4 border-teal-500/30 border-t-teal-400 rounded-full animate-spin" />
          <h2 className="text-xl md:text-3xl font-bold text-white">
            Loading Record...
          </h2>
        </div>
      </div>
    );
  }

  // Dialihkan ke URL platform portofolio Shofaya
  const projectUrl = `https://shofayatsany.vercel.app/project/${toSlug(project.Title)}`;

  return (
    <>
      <Helmet>
        <title>{project.Title} — Shofaya Tsany Ediningtyas</title>
        <meta
          name="description"
          content={
            project.Description
              ? project.Description.slice(0, 155)
              : `Rekam jejak praktik kefarmasian ${project.Title} oleh Shofaya Tsany Ediningtyas — Apoteker.`
          }
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href={projectUrl} />
        <meta
          property="og:title"
          content={`${project.Title} — Shofaya Tsany Ediningtyas`}
        />
        <meta
          property="og:description"
          content={project.Description?.slice(0, 155)}
        />
        <meta property="og:url" content={projectUrl} />
        <meta property="og:type" content="website" />
        {project.Img && <meta property="og:image" content={project.Img} />}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "MedicalBusiness",
            "name": "${project.Title}",
            "description": "${project.Description?.replace(/"/g, '\\"')}",
            "url": "${projectUrl}",
            "employee": {
              "@type": "Person",
              "name": "Shofaya Tsany Ediningtyas",
              "url": "https://shofayatsany.vercel.app"
            }
          }
        `}</script>
      </Helmet>

      <div className="min-h-screen bg-[#031411] px-[2%] sm:px-0 relative overflow-hidden">
        <div className="fixed inset-0 pointer-events-none z-0">
          <div className="absolute -inset-[10px] opacity-20">
            {/* Background Blob diubah ke warna medis Teal, Cyan, Emerald */}
            <div className="absolute top-0 -left-4 w-72 md:w-96 h-72 md:h-96 bg-teal-500 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob" />
            <div className="absolute top-0 -right-4 w-72 md:w-96 h-72 md:h-96 bg-cyan-500 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-2000" />
            <div className="absolute -bottom-8 left-20 w-72 md:w-96 h-72 md:h-96 bg-emerald-500 rounded-full mix-blend-screen filter blur-3xl opacity-60 animate-blob animation-delay-4000" />
          </div>
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.01]" />
        </div>

        <div className="relative z-10">
          <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-16">
            <div className="flex items-center space-x-2 md:space-x-4 mb-8 md:mb-12 animate-fadeIn">
              <button
                onClick={() => navigate(-1)}
                className="group inline-flex items-center space-x-1.5 md:space-x-2 px-3 md:px-5 py-2 md:py-2.5 bg-white/5 backdrop-blur-xl rounded-xl text-white/90 hover:bg-white/10 transition-all duration-300 border border-white/10 hover:border-white/20 text-sm md:text-base font-medium"
              >
                <ArrowLeft className="w-4 h-4 md:w-5 md:h-5 text-teal-400 group-hover:-translate-x-1 transition-transform" />
                <span>Back</span>
              </button>
              <div className="flex items-center space-x-1 md:space-x-2 text-sm md:text-base text-white/50">
                <span>Experiences</span>
                <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                <span className="text-white/90 truncate">{project.Title}</span>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 md:gap-16">
              <div className="space-y-6 md:space-y-10 animate-slideInLeft">
                <div className="space-y-4 md:space-y-6">
                  <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold bg-gradient-to-r from-white via-teal-100 to-emerald-200 bg-clip-text text-transparent leading-tight">
                    {project.Title}
                  </h1>
                  <div className="relative h-1 w-16 md:w-24">
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full animate-pulse" />
                    <div className="absolute inset-0 bg-gradient-to-r from-teal-500 to-emerald-500 rounded-full blur-sm" />
                  </div>
                </div>

                <div className="prose prose-invert max-w-none">
                  <p className="text-sm md:text-base text-gray-300/90 leading-relaxed font-light text-justify">
                    {project.Description}
                  </p>
                </div>

                <ProjectStats project={project} />

                <div className="flex flex-wrap gap-3 md:gap-4 text-sm">
                  {/* LIVE DEMO -> VIEW DOCUMENT */}
                  {project.Link && (
                    <a
                      href={project.Link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-6 py-2.5 md:py-3.5 bg-gradient-to-r from-teal-600/10 to-emerald-600/10 hover:from-teal-600/20 hover:to-emerald-600/20 text-teal-300 rounded-xl transition-all duration-300 border border-teal-500/20 hover:border-teal-500/40 backdrop-blur-xl overflow-hidden"
                    >
                      <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-teal-600/10 to-emerald-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                      <ExternalLink className="relative w-4 h-4 md:w-5 md:h-5 group-hover:rotate-12 transition-transform" />
                      <span className="relative font-medium">View Document</span>
                    </a>
                  )}

                  {/* GITHUB -> INTERNAL REFERENCE */}
                  {project.Github && (
                    <a
                      href={project.Github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group relative inline-flex items-center space-x-1.5 md:space-x-2 px-4 md:px-6 py-2.5 md:py-3.5 bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 hover:from-emerald-600/20 hover:to-cyan-600/20 text-emerald-300 rounded-xl transition-all duration-300 border border-emerald-500/20 hover:border-emerald-500/40 backdrop-blur-xl overflow-hidden"
                      onClick={(e) =>
                        !handleGithubClick(project.Github) && e.preventDefault()
                      }
                    >
                      <div className="absolute inset-0 translate-y-[100%] bg-gradient-to-r from-emerald-600/10 to-cyan-600/10 transition-transform duration-300 group-hover:translate-y-[0%]" />
                      <FileText className="relative w-4 h-4 md:w-5 md:h-5 text-emerald-400" />
                      <span className="relative font-medium">Internal Reference</span>
                    </a>
                  )}
                </div>

                {/* TECH STACK -> SKILLS & EXPERTISES */}
                <div className="space-y-4 md:space-y-6">
                  <h3 className="text-base md:text-lg font-semibold text-white/90 mt-[3rem] md:mt-0 flex items-center gap-2 md:gap-3">
                    <Activity className="w-4 h-4 md:w-5 md:h-5 text-teal-400" />
                    Skills & Expertises Demanded
                  </h3>
                  {project.TechStack && project.TechStack.length > 0 ? (
                    <div className="flex flex-wrap gap-2 md:gap-3">
                      {project.TechStack.map((tech, index) => (
                        <TechBadge key={index} tech={tech} />
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs md:text-sm text-gray-400 opacity-50 font-light">
                      No specific skills listed.
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-6 md:space-y-10 animate-slideInRight">
                <div className="relative rounded-2xl overflow-hidden border border-white/10 shadow-2xl group bg-white/5">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#031411] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <img
                    src={project.Img}
                    alt={project.Title}
                    className="w-full object-cover transform transition-transform duration-700 will-change-transform group-hover:scale-103"
                    onLoad={() => setIsImageLoaded(true)}
                  />
                  <div className="absolute inset-0 border-2 border-white/0 group-hover:border-white/10 transition-colors duration-300 rounded-2xl" />
                </div>

                {/* KEY FEATURES -> KEY ACTIVITIES / IMPACTS */}
                <div className="bg-white/[0.02] backdrop-blur-xl rounded-2xl p-6 md:p-8 border border-white/10 space-y-5 hover:border-white/20 transition-colors duration-300 group">
                  <h3 className="text-lg md:text-xl font-semibold text-white/90 flex items-center gap-3">
                    <Star className="w-5 h-5 text-teal-400 group-hover:rotate-[20deg] transition-transform duration-300" />
                    Key Activities & Impacts
                  </h3>
                  {project.Features && project.Features.length > 0 ? (
                    <ul className="list-none space-y-2">
                      {project.Features.map((feature, index) => (
                        <FeatureItem key={index} feature={feature} />
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs md:text-sm text-gray-400 opacity-50 font-light">
                      No core activities noted.
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <style jsx>{`
          @keyframes blob {
            0% { transform: translate(0px, 0px) scale(1); }
            33% { transform: translate(30px, -50px) scale(1.05); }
            66% { transform: translate(-20px, 20px) scale(0.95); }
            100% { transform: translate(0px, 0px) scale(1); }
          }
          .animate-blob { animation: blob 10s infinite; }
          .animation-delay-2000 { animation-delay: 2s; }
          .animation-delay-4000 { animation-delay: 4s; }
          .animate-fadeIn { animation: fadeIn 0.7s ease-out; }
          .animate-slideInLeft { animation: slideInLeft 0.7s ease-out; }
          .animate-slideInRight { animation: slideInRight 0.7s ease-out; }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          @keyframes slideInLeft {
            from { opacity: 0; transform: translateX(-30px); }
            to { opacity: 1; transform: translateX(0); }
          }
          @keyframes slideInRight {
            from { opacity: 0; transform: translateX(30px); }
            to { opacity: 1; transform: translateX(0); }
          }
        `}</style>
      </div>
    </>
  );
};

export default ProjectDetails;