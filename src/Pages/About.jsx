import React, { useEffect, memo, useMemo } from "react";
import {
  FileText,
  HeartHandshake,
  Award,
  Globe,
  ArrowUpRight,
  Sparkles,
  Activity,
} from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

// Memoized Components
const Header = memo(() => (
  <div className="text-center lg:mb-8 mb-2 px-[5%]">
    <div className="inline-block relative group">
      <h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] to-[#10b981]"
        data-aos="zoom-in-up"
        data-aos-duration="600"
      >
        About Me
      </h2>
    </div>
    <p
      className="mt-2 text-gray-400 max-w-2xl mx-auto text-base sm:text-lg flex items-center justify-center gap-2"
      data-aos="zoom-in-up"
      data-aos-duration="800"
    >
      <Sparkles className="w-5 h-5 text-teal-400" />
      Dedicated to public health and pharmaceutical care
      <Sparkles className="w-5 h-5 text-teal-400" />
    </p>
  </div>
));

const ProfileImage = memo(() => (
  <div className="flex justify-center lg:justify-end items-center sm:p-12 sm:py-0 sm:pb-0 p-0 py-2 pb-2">
    <div className="relative group" data-aos="fade-up" data-aos-duration="1000">
      {/* Optimized gradient backgrounds with Teal & Emerald color palette */}
      <div className="absolute -inset-6 opacity-[25%] z-0 hidden sm:block">
        <div className="absolute inset-0 bg-gradient-to-r from-teal-600 via-cyan-500 to-emerald-600 rounded-full blur-2xl animate-spin-slower" />
        <div className="absolute inset-0 bg-gradient-to-l from-emerald-500 via-teal-500 to-cyan-600 rounded-full blur-2xl animate-pulse-slow opacity-50" />
        <div className="absolute inset-0 bg-gradient-to-t from-teal-600 via-emerald-500 to-cyan-400 rounded-full blur-2xl opacity-50" />
      </div>

      <div className="relative">
        <div className="w-64 h-64 sm:w-72 sm:h-72 md:w-80 md:h-80 rounded-full overflow-hidden shadow-[0_0_40px_rgba(20,184,166,0.2)] transform transition-all duration-700 group-hover:scale-105">
          <div className="absolute inset-0 border-4 border-white/20 rounded-full z-20 transition-all duration-700 group-hover:border-white/40 group-hover:scale-105" />

          {/* Optimized overlay effects - disabled on mobile */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-black/40 z-10 transition-opacity duration-700 group-hover:opacity-0 hidden sm:block" />
          <div className="absolute inset-0 bg-gradient-to-t from-teal-500/20 via-transparent to-emerald-500/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-700 hidden sm:block" />

          <img
            src="/shofaya.jpeg"
            alt="Shofaya Tsany Ediningtyas"
            className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
            loading="lazy"
          />

          {/* Advanced hover effects - desktop only */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 z-20 hidden sm:block">
            <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
            <div className="absolute inset-0 bg-gradient-to-bl from-transparent via-white/10 to-transparent transform translate-y-full group-hover:-translate-y-full transition-transform duration-1000 delay-100" />
            <div className="absolute inset-0 rounded-full border-8 border-white/10 scale-0 group-hover:scale-100 transition-transform duration-700 animate-pulse-slow" />
          </div>
        </div>
      </div>
    </div>
  </div>
));

const StatCard = memo(
  ({ icon: Icon, color, value, label, description, animation }) => (
    <div
      data-aos={animation}
      data-aos-duration={1300}
      className="relative group"
    >
      <div className="relative z-10 bg-gray-900/50 backdrop-blur-lg rounded-2xl p-6 border border-white/10 overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl h-full flex flex-col justify-between">
        <div
          className={`absolute -z-10 inset-0 bg-gradient-to-br ${color} opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
        ></div>

        <div className="flex items-center justify-between mb-4">
          <div className="w-14 h-14 rounded-full flex items-center justify-center bg-white/10 transition-transform group-hover:rotate-6">
            <Icon className="w-7 h-7 text-white" />
          </div>
          <span
            className="text-4xl font-bold text-white"
            data-aos="fade-up-left"
            data-aos-duration="1500"
            data-aos-anchor-placement="top-bottom"
          >
            {value}
          </span>
        </div>

        <div>
          <p
            className="text-xs sm:text-sm uppercase tracking-wider text-gray-300 mb-1"
            data-aos="fade-up"
            data-aos-duration="800"
            data-aos-anchor-placement="top-bottom"
          >
            {label}
          </p>
          <div className="flex items-center justify-between">
            <p
              className="text-xs text-gray-400"
              data-aos="fade-up"
              data-aos-duration="1000"
              data-aos-anchor-placement="top-bottom"
            >
              {description}
            </p>
            <ArrowUpRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
          </div>
        </div>
      </div>
    </div>
  ),
);

const AboutPage = () => {
  // Configured dynamic fallback data for stats
  const { totalCertificates, YearExperience } = useMemo(() => {
    const storedCertificates = JSON.parse(
      localStorage.getItem("certificates") || "[]",
    );

    const startDate = new Date("2026-05-11"); // Dynamic experience calculation base
    const today = new Date();
    let experience = today.getFullYear() - startDate.getFullYear();
    if (
      today <
      new Date(today.getFullYear(), startDate.getMonth(), startDate.getDate())
    ) {
      experience--;
    }

    return {
      totalCertificates: storedCertificates.length || 0,
      YearExperience: experience > 0 ? experience : 1,
    };
  }, []);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: false,
      });
    };

    initAOS();

    let resizeTimer;
    const handleResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(initAOS, 250);
    };

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      clearTimeout(resizeTimer);
    };
  }, []);

  // Tailored stats data matching medical profile
  const statsData = useMemo(
    () => [
      {
        icon: HeartHandshake,
        color: "from-[#14b8a6] to-[#10b981]",
        value: "100%",
        label: "Patient Care",
        description: "Optimal counseling & medication safety",
        animation: "fade-right",
      },
      {
        icon: Award,
        color: "from-[#10b981] to-[#14b8a6]",
        value: totalCertificates,
        label: "Certificates",
        description: "Validated professional competencies",
        animation: "fade-up",
      },
      {
        icon: Globe,
        color: "from-[#14b8a6] to-[#10b981]",
        value: `${YearExperience}+`,
        label: "Years Experience",
        description: "Continuous health service journey",
        animation: "fade-left",
      },
    ],
    [totalCertificates, YearExperience],
  );

  return (
    <div
      className="h-auto pb-[10%] text-white overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] pt-20 lg:pt-24"
      id="About"
      itemScope
      itemType="https://schema.org/Person"
    >
      <Header />

      <div className="w-full mx-auto pt-6 sm:pt-10 relative">
        {/* Mengubah lg:grid-cols-2 menjadi grid dengan perbandingan kolom 60% dan 40% */}
        <div className="flex flex-col-reverse lg:grid lg:grid-cols-[60%_40%] gap-10 lg:gap-12 items-center">
          {/* Kolon Kiri (Teks): Sekarang mendapat porsi ruang 60% */}
          <div className="space-y-6 text-center lg:text-left w-full">
            <h2
              className="text-3xl sm:text-4xl lg:text-5xl font-bold"
              data-aos="fade-right"
              data-aos-duration="1000"
            >
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#14b8a6] to-[#10b981]">
                Hello, I'm
              </span>
              <span
                className="block mt-2 text-gray-200"
                data-aos="fade-right"
                data-aos-duration="1300"
                itemProp="name"
              >
                apt. Shofaya Tsany Ediningtyas, S.Farm
              </span>
            </h2>

            {/* Menggunakan teks bahasa Inggris pilihanmu dengan font-light yang rapi */}
            <p
              className="text-sm sm:text-base md:text-lg text-gray-300 leading-relaxed text-justify pb-2 sm:pb-0 font-light"
              data-aos="fade-right"
              data-aos-duration="1500"
            >
              Pursuing my professional education at Ahmad Dahlan University has
              shaped me into a Pharmacist who views medicine not merely as a
              commodity, but as an instrument of safety. Following my
              professional oath, I am dedicated to evidence-based pharmaceutical
              care—safeguarding patient compliance through in-depth counseling
              and educating on drug interactions to ensure safer, higher-quality
              therapeutic outcomes for the community.
            </p>

            {/* Quote Section */}
            <div
              className="relative bg-gradient-to-br from-[#14b8a6]/5 via-transparent to-[#10b981]/5 border border-[#14b8a6]/20 rounded-2xl p-4 my-4 backdrop-blur-md shadow-2xl overflow-hidden"
              data-aos="fade-up"
              data-aos-duration="1700"
            >
              {/* Floating orbs background */}
              <div className="absolute top-2 right-4 w-16 h-16 bg-gradient-to-r from-[#14b8a6]/10 to-[#10b981]/10 rounded-full blur-xl"></div>
              <div className="absolute -bottom-4 -left-2 w-12 h-12 bg-gradient-to-r from-[#10b981]/10 to-[#14b8a6]/10 rounded-full blur-lg"></div>

              {/* Quote icon */}
              <div className="absolute top-3 left-4 text-[#14b8a6] opacity-30">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h4v10h-10z" />
                </svg>
              </div>

              <blockquote className="text-gray-300 text-center lg:text-left italic font-medium text-xs sm:text-sm relative z-10 pl-6">
                "Prioritizing patient safety through pharmaceutical services
                based on clinical evidence."
              </blockquote>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center lg:justify-start">
              <a
                href="https://drive.google.com/"
                className="w-full sm:w-auto"
                target="_blank"
                rel="noopener noreferrer"
              >
                <button
                  data-aos="fade-up"
                  data-aos-duration="800"
                  className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-lg bg-gradient-to-r from-[#14b8a6] to-[#10b981] text-white font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 shadow-lg hover:shadow-teal-500/20"
                >
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" /> Download
                  Portfolio / CV
                </button>
              </a>
              <a href="#Portofolio" className="w-full sm:w-auto">
                <button
                  data-aos="fade-up"
                  data-aos-duration="1000"
                  className="w-full sm:w-auto px-6 py-2.5 sm:py-3 rounded-lg border border-[#14b8a6]/40 text-[#14b8a6] font-medium transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 hover:bg-[#14b8a6]/10"
                >
                  <Activity className="w-4 h-4 sm:w-5 sm:h-5" /> View Track
                  Record
                </button>
              </a>
            </div>
          </div>

          {/* Kolom Kanan (Foto): Mengambil porsi ruang 40% agar pas dengan ukuran bundar foto */}
          <div className="w-full flex justify-center lg:justify-end items-center">
            <ProfileImage />
          </div>
        </div>

        {/* Stats Cards Section */}
        <a href="#Portofolio">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mt-16 cursor-pointer">
            {statsData.map((stat) => (
              <StatCard key={stat.label} {...stat} />
            ))}
          </div>
        </a>
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-20px);
          }
        }
        @keyframes spin-slower {
          to {
            transform: rotate(360deg);
          }
        }
        .animate-bounce-slow {
          animation: bounce 3s infinite;
        }
        .animate-pulse-slow {
          animation: pulse 3s infinite;
        }
        .animate-spin-slower {
          animation: spin-slower 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default memo(AboutPage);
