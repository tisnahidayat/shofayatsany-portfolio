import { useState, useEffect, useCallback, memo } from "react";
import { Helmet } from "react-helmet-async";
import { Mail, ExternalLink, Instagram, Linkedin } from "lucide-react";
import AOS from "aos";
import "aos/dist/aos.css";

const MainTitle = memo(() => (
  <div
    className="space-y-1 sm:space-y-2"
    data-aos="fade-up"
    data-aos-delay="600"
  >
    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl xl:text-7xl font-bold tracking-tight leading-tight">
      <span className="relative inline-block mt-1 sm:mt-2">
        <span className="absolute -inset-2 bg-gradient-to-r from-[#14b8a6] to-[#10b981] blur-2xl opacity-20"></span>
        <span className="relative bg-gradient-to-r from-[#14b8a6] to-[#10b981] bg-clip-text text-transparent">
          Pharmacist
        </span>
      </span>
    </h1>
  </div>
));

const SkillBadge = memo(({ skill }) => (
  <div className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-white/5 backdrop-blur-sm border border-white/10 text-xs sm:text-sm text-gray-300 hover:bg-white/10 transition-colors duration-300 whitespace-nowrap">
    {skill}
  </div>
));

const CTAButton = memo(({ href, text, icon: Icon }) => (
  <a href={href} className="w-full sm:w-auto">
    <button className="group relative w-full sm:w-[160px]">
      <div className="absolute -inset-0.5 bg-gradient-to-r from-[#0d9488] to-[#059669] rounded-xl opacity-50 blur-md group-hover:opacity-90 transition-all duration-700"></div>
      <div className="relative h-11 bg-[#031411] backdrop-blur-xl rounded-lg border border-white/10 leading-none overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-500 bg-gradient-to-r from-[#0d9488]/20 to-[#059669]/20"></div>
        <span className="absolute inset-0 flex items-center justify-center gap-2 text-sm group-hover:gap-3 transition-all duration-300">
          <span className="bg-gradient-to-r from-gray-200 to-white bg-clip-text text-transparent font-medium z-10">
            {text}
          </span>
          <Icon
            className={`w-4 h-4 text-gray-200 ${text === "Contact" ? "group-hover:translate-x-1" : "group-hover:rotate-45"} transform transition-all duration-300 z-10`}
          />
        </span>
      </div>
    </button>
  </a>
));

const SocialLink = memo(({ icon: Icon, link, label }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={label}>
    <button className="group relative" aria-label={label}>
      <div className="absolute inset-0 bg-gradient-to-r from-[#14b8a6] to-[#10b981] rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-300"></div>
      <div className="relative rounded-xl bg-black/50 backdrop-blur-xl p-3.5 flex items-center justify-center border border-white/10 group-hover:border-white/20 transition-all duration-300">
        <Icon className="w-5 h-5 text-gray-400 group-hover:text-white transition-colors" />
      </div>
    </button>
  </a>
));

const TYPING_SPEED = 100;
const ERASING_SPEED = 50;
const PAUSE_DURATION = 2000;
const WORDS = [
  "Healthcare Professional",
  "Pharmaceutical Care",
  "Health Educator",
];
const CLINICAL_SKILLS = [
  "Clinical Pharmacy",
  "Patient Counseling",
  "Pharmacotherapy",
  "Drug Safety",
];
const SOCIAL_LINKS = [
  {
    icon: Linkedin,
    link: "https://www.linkedin.com/in/shofaya-tsany",
    label: "LinkedIn Profile",
  },
  {
    icon: Instagram,
    link: "https://www.instagram.com/shofayatsany",
    label: "Instagram Profile",
  },
];

const Home = () => {
  const [text, setText] = useState("");
  const [isTyping, setIsTyping] = useState(true);
  const [wordIndex, setWordIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    const initAOS = () => {
      AOS.init({
        once: true,
        offset: 10,
      });
    };

    initAOS();
    window.addEventListener("resize", initAOS);
    return () => window.removeEventListener("resize", initAOS);
  }, []);

  useEffect(() => {
    setIsLoaded(true);
    return () => setIsLoaded(false);
  }, []);

  const handleTyping = useCallback(() => {
    if (isTyping) {
      if (charIndex < WORDS[wordIndex].length) {
        setText((prev) => prev + WORDS[wordIndex][charIndex]);
        setCharIndex((prev) => prev + 1);
      } else {
        setTimeout(() => setIsTyping(false), PAUSE_DURATION);
      }
    } else {
      if (charIndex > 0) {
        setText((prev) => prev.slice(0, -1));
        setCharIndex((prev) => prev - 1);
      } else {
        setWordIndex((prev) => (prev + 1) % WORDS.length);
        setIsTyping(true);
      }
    }
  }, [charIndex, isTyping, wordIndex]);

  useEffect(() => {
    const timeout = setTimeout(
      handleTyping,
      isTyping ? TYPING_SPEED : ERASING_SPEED,
    );
    return () => clearTimeout(timeout);
  }, [handleTyping]);

  return (
    <>
      <Helmet>
        <title>Shofaya Tsany Ediningtyas — Apoteker</title>
        <meta
          name="description"
          content="Website resmi Shofaya Tsany Ediningtyas, seorang Apoteker. Berkomitmen memberikan edukasi kesehatan, pelayanan kefarmasian terbaik, dan solusi kesehatan yang terpercaya."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://shofayatsany.vercel.app" />
        <meta
          property="og:title"
          content="Shofaya Tsany Ediningtyas — Apoteker"
        />
        <meta
          property="og:description"
          content="Website resmi dan portofolio profesional Shofaya Tsany Ediningtyas, seorang Apoteker terpercaya."
        />
        <meta property="og:url" content="https://shofayatsany.vercel.app" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Shofaya Tsany Ediningtyas",
            "jobTitle": "Apoteker",
            "url": "https://shofayatsany.vercel.app",
            "sameAs": [
              "https://www.linkedin.com/in/shofaya-tsany",
              "https://www.instagram.com/shofayatsany"
            ]
          }
        `}</script>
      </Helmet>

      <div
        className="min-h-screen bg-[#031411] overflow-hidden px-[5%] sm:px-[5%] lg:px-[10%] flex items-center"
        id="Home"
      >
        <div
          className={`w-full relative z-10 transition-all duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
        >
          <div className="container mx-auto min-h-screen flex items-center py-20 lg:py-0">
            <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-10 lg:gap-16 xl:gap-20">
              {/* Left Column (Teks Profil) */}
              <div
                className="w-full lg:w-1/2 space-y-5 sm:space-y-6 text-left order-1 flex flex-col justify-center"
                data-aos="fade-right"
                data-aos-delay="200"
              >
                <div className="space-y-4">
                  <MainTitle />

                  {/* Typing Effect */}
                  <div
                    className="h-8 flex items-center"
                    data-aos="fade-up"
                    data-aos-delay="800"
                  >
                    <span className="text-lg sm:text-xl md:text-2xl bg-gradient-to-r from-gray-100 to-gray-300 bg-clip-text text-transparent font-light tracking-wide">
                      {text}
                    </span>
                    <span className="w-[2px] sm:w-[3px] h-5 sm:h-6 bg-gradient-to-t from-[#14b8a6] to-[#10b981] ml-1 animate-blink"></span>
                  </div>

                  {/* Description */}
                  <p
                    className="text-sm sm:text-base md:text-lg text-gray-400 max-w-xl leading-relaxed font-light"
                    data-aos="fade-up"
                    data-aos-delay="1000"
                  >
                    Highly committed to providing optimal pharmaceutical
                    services, medication adherence education, to support
                    improving the quality of life and public health.
                  </p>

                  {/* Skills / Badges */}
                  <div
                    className="flex flex-wrap gap-2 sm:gap-3 justify-start pt-2"
                    data-aos="fade-up"
                    data-aos-delay="1200"
                  >
                    {CLINICAL_SKILLS.map((skill, index) => (
                      <SkillBadge key={index} skill={skill} />
                    ))}
                  </div>

                  {/* Action Group Stacking (CTA Buttons & Social Media Stacked Vertically) */}
                  <div
                    className="space-y-4 pt-4"
                    data-aos="fade-up"
                    data-aos-delay="1400"
                  >
                    {/* Row 1: CTA Buttons */}
                    <div className="flex flex-row gap-3 w-full sm:w-auto">
                      <CTAButton
                        href="#Portofolio"
                        text="Portofolio"
                        icon={ExternalLink}
                      />
                      <CTAButton href="#Contact" text="Contact" icon={Mail} />
                    </div>

                    {/* Row 2: Social Links (Selalu diletakkan di bawah baris tombol) */}
                    <div className="flex gap-3 justify-start items-center">
                      {SOCIAL_LINKS.map((social, index) => (
                        <SocialLink key={index} {...social} />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Column (Gambar Animasi / Ilustrasi) */}
              <div
                className="w-full lg:w-1/2 max-w-[320px] sm:max-w-[450px] md:max-w-[500px] lg:max-w-none aspect-square relative flex items-center justify-center order-2 mx-auto lg:mx-0"
                onMouseEnter={() => setIsHovering(true)}
                onMouseLeave={() => setIsHovering(false)}
                data-aos="fade-left"
                data-aos-delay="600"
              >
                <div className="relative w-full h-full opacity-90 flex items-center justify-center">
                  <div
                    className={`absolute inset-0 bg-gradient-to-r from-[#14b8a6]/10 to-[#10b981]/10 rounded-3xl blur-3xl transition-all duration-700 ease-in-out ${
                      isHovering
                        ? "opacity-40 scale-105"
                        : "opacity-20 scale-100"
                    }`}
                  ></div>

                  <div
                    className={`relative z-10 w-full h-full max-h-[280px] sm:max-h-[380px] md:max-h-[420px] lg:max-h-[500px] opacity-90 transform transition-transform duration-500 flex items-center justify-center ${
                      isHovering ? "scale-105" : "scale-100"
                    }`}
                  >
                    <img
                      src="medicine.gif"
                      alt="Pharmacist Professional Illustration"
                      className={`w-full h-full object-contain transition-all duration-500 ${
                        isHovering ? "scale-[95%] rotate-2" : "scale-[90%]"
                      }`}
                    />
                  </div>

                  <div
                    className={`absolute inset-0 pointer-events-none transition-all duration-700 ${
                      isHovering ? "opacity-40" : "opacity-20"
                    }`}
                  >
                    <div
                      className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] bg-gradient-to-br from-teal-500/10 to-emerald-500/10 blur-3xl animate-[pulse_6s_cubic-bezier(0.4,0,0.6,1)_infinite] transition-all duration-700 ${
                        isHovering ? "scale-110" : "scale-100"
                      }`}
                    ></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default memo(Home);
