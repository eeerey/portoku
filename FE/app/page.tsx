"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import portfolioDataJson from "@/data/portfolio.json"; // <--- Import data JSON lokal

import { Preloader } from "@/components/preloader";
import { ThemeToggle } from "@/components/theme-toggle";
import { PhotoStack } from "@/components/photo-stack";

import {
  SiHtml5,
  SiCss,
  SiJavascript,
  SiTypescript,
  SiReact,
  SiNextdotjs,
  SiTailwindcss,
  SiNodedotjs,
  SiExpress,
  SiPhp,
  SiLaravel,
  SiCodeigniter,
  SiPython,
  SiFlutter,
  SiDart,
  SiMysql,
  SiPostgresql,
  SiMongodb,
  SiGit,
  SiGithub,
  SiFigma,
  SiGodotengine,
} from "react-icons/si";

import {
  FaLinkedin,
  FaInstagram,
  FaXTwitter,
  FaYoutube,
  FaFacebook,
  FaTiktok,
  FaDiscord,
  FaPaperPlane,
} from "react-icons/fa6";

import {
  ArrowDown,
  ArrowUpRight,
  Code2,
  Layers3,
  Database,
  Wrench,
  Mail,
  Sparkles,
  FolderKanban,
  GraduationCap,
  Briefcase,
  Zap,
  Award,
} from "lucide-react";

// Map ikon dinamis untuk Floating Badge
const badgeIconMap: Record<string, React.ReactNode> = {
  Code2: <Code2 size={18} className="text-[#a8783a] dark:text-[#c9a15c]" />,
  Briefcase: (
    <Briefcase size={18} className="text-[#a8783a] dark:text-[#c9a15c]" />
  ),
  Zap: <Zap size={18} className="text-[#a8783a] dark:text-[#c9a15c]" />,
  Award: <Award size={18} className="text-[#a8783a] dark:text-[#c9a15c]" />,
  Sparkles: (
    <Sparkles size={18} className="text-[#a8783a] dark:text-[#c9a15c]" />
  ),
};

// Preset Posisi Otomatis jika posisi tidak ditentukan di DB/JSON
const positionClasses = [
  "-bottom-4 -left-6", // Badge 1 (Kiri Bawah)
  "-top-4 -right-6", // Badge 2 (Kanan Atas)
  "-bottom-4 -right-6", // Badge 3 (Kanan Bawah)
  "-top-4 -left-6", // Badge 4 (Kiri Atas)
];

const iconMap: Record<string, React.ReactNode> = {
  SiHtml5: <SiHtml5 className="text-orange-500 text-2xl" />,
  SiCss: <SiCss className="text-blue-500 text-2xl" />,
  SiCss3: <SiCss className="text-blue-500 text-2xl" />,
  SiJavascript: <SiJavascript className="text-yellow-500 text-2xl" />,
  SiTypescript: <SiTypescript className="text-blue-500 text-2xl" />,
  SiReact: <SiReact className="text-cyan-500 text-2xl" />,
  SiNextdotjs: (
    <SiNextdotjs className="text-slate-900 dark:text-white text-2xl" />
  ),
  SiTailwindcss: <SiTailwindcss className="text-sky-500 text-2xl" />,
  SiNodedotjs: <SiNodedotjs className="text-green-600 text-2xl" />,
  SiExpress: (
    <SiExpress className="text-slate-700 dark:text-slate-200 text-2xl" />
  ),
  SiPhp: <SiPhp className="text-indigo-500 text-2xl" />,
  SiLaravel: <SiLaravel className="text-red-500 text-2xl" />,
  SiCodeigniter: <SiCodeigniter className="text-orange-500 text-2xl" />,
  SiPython: <SiPython className="text-yellow-500 text-2xl" />,
  SiFlutter: <SiFlutter className="text-sky-500 text-2xl" />,
  SiDart: <SiDart className="text-blue-500 text-2xl" />,
  SiMysql: <SiMysql className="text-blue-600 text-2xl" />,
  SiPostgresql: <SiPostgresql className="text-indigo-500 text-2xl" />,
  SiMongodb: <SiMongodb className="text-green-500 text-2xl" />,
  SiGit: <SiGit className="text-orange-600 text-2xl" />,
  SiGithub: <SiGithub className="text-slate-900 dark:text-white text-2xl" />,
  SiFigma: <SiFigma className="text-pink-500 text-2xl" />,
  SiGodotengine: <SiGodotengine className="text-blue-500 text-2xl" />,
  SiLinkedin: <FaLinkedin className="text-blue-600 text-xl" />,
  SiInstagram: <FaInstagram className="text-pink-500 text-xl" />,
  SiX: <FaXTwitter className="text-slate-900 dark:text-white text-xl" />,
  SiYoutube: <FaYoutube className="text-red-600 text-xl" />,
  SiFacebook: <FaFacebook className="text-blue-500 text-xl" />,
  SiTiktok: <FaTiktok className="text-slate-900 dark:text-white text-xl" />,
  SiDiscord: <FaDiscord className="text-indigo-500 text-xl" />,
};

export default function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  // Langsung gunakan data dari file portfolio.json lokal
  const [portfolioData] = useState<any>(portfolioDataJson);

  const [emailInput, setEmailInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!emailInput || !messageInput) {
      alert("Mohon isi email dan pesan!");
      return;
    }

    setIsSending(true);
    // Simulasi pengiriman pesan sukses karena tanpa backend Express
    setTimeout(() => {
      alert("Pesan berhasil dikirim! Terima kasih telah menghubungi.");
      setEmailInput("");
      setMessageInput("");
      setIsSending(false);
    }, 600);
  };

  const rawProfile = portfolioData?.profile || {};
  const highlights = portfolioData?.highlights || [];

  const fullName = rawProfile.fullName || "Raihan Diandra";
  const title = rawProfile.title || "Full Stack Developer";

  const subTitle =
    rawProfile.subTitle ||
    "Saya fokus mengembangkan aplikasi web modern, sistem digital, UI/UX, dan teknologi berbasis solusi.";

  let myPhotos: string[] = [];

  if (rawProfile.photos) {
    try {
      const parsed =
        typeof rawProfile.photos === "string"
          ? JSON.parse(rawProfile.photos)
          : rawProfile.photos;

      myPhotos = Array.isArray(parsed) ? parsed : [rawProfile.photos];
    } catch {
      myPhotos = [rawProfile.photos];
    }
  }

  let aboutMeList: string[] = [];

  if (rawProfile.aboutMe) {
    if (Array.isArray(rawProfile.aboutMe)) {
      aboutMeList = rawProfile.aboutMe;
    } else {
      try {
        const parsed = JSON.parse(rawProfile.aboutMe);
        aboutMeList = Array.isArray(parsed) ? parsed : [rawProfile.aboutMe];
      } catch {
        aboutMeList = rawProfile.aboutMe.split("\n");
      }
    }
  } else {
    aboutMeList = [
      "Saya adalah seorang pengembang perangkat lunak yang memiliki ketertarikan dalam membangun aplikasi modern dan solusi digital.",
      "Saya senang mengeksplorasi teknologi baru, membangun user experience yang baik, serta mengembangkan sistem yang dapat memberikan manfaat nyata.",
    ];
  }

  const education = portfolioData?.education || [];
  const skills = portfolioData?.skills || [];
  const projects = portfolioData?.projects || [];
  const socials = portfolioData?.socials || [];

  const frontendSkills = skills.filter((skill: any) =>
    [
      "html",
      "css",
      "javascript",
      "typescript",
      "react",
      "next",
      "tailwind",
    ].some((item) => skill.name?.toLowerCase().includes(item)),
  );

  const backendSkills = skills.filter((skill: any) =>
    ["node", "express", "php", "laravel", "codeigniter", "python"].some(
      (item) => skill.name?.toLowerCase().includes(item),
    ),
  );

  const databaseSkills = skills.filter((skill: any) =>
    ["mysql", "postgres", "mongodb"].some((item) =>
      skill.name?.toLowerCase().includes(item),
    ),
  );

  const toolSkills = skills.filter((skill: any) =>
    ["git", "github", "figma", "godot", "flutter", "dart"].some((item) =>
      skill.name?.toLowerCase().includes(item),
    ),
  );

  return (
    <main className="min-h-screen bg-[#f3f1ea] dark:bg-[#12141a] text-[#1c1d1a] dark:text-[#eeece5] overflow-x-hidden transition-colors duration-500 selection:bg-[#c9a15c] selection:text-[#12141a]">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;0,6..72,600;1,6..72,400;1,6..72,500&family=Manrope:wght@400;500;600;700;800&display=swap");
        .font-display {
          font-family: "Newsreader", Georgia, serif;
        }
        body {
          font-family: "Manrope", system-ui, sans-serif;
        }
      `}</style>

      {/* BACKGROUND */}
      <div className="fixed inset-0 pointer-events-none -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-[#f3f1ea] dark:bg-[#12141a]" />
        <div className="absolute top-[-250px] left-[10%] w-[600px] h-[600px] bg-[#c9a15c]/10 dark:bg-[#c9a15c]/[0.07] blur-[150px] rounded-full" />
        <div className="absolute bottom-[-300px] right-[5%] w-[600px] h-[600px] bg-[#7c93a8]/10 dark:bg-[#7c93a8]/[0.06] blur-[150px] rounded-full" />
      </div>

      <AnimatePresence mode="wait">
        {isLoading && <Preloader onComplete={() => setIsLoading(false)} />}
      </AnimatePresence>

      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {/* NAVBAR */}
          <header
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-5xl rounded-2xl border transition-all duration-500 ${
              isScrolled
                ? "bg-[#f3f1ea]/85 dark:bg-[#14161c]/85 backdrop-blur-xl border-[#ddd9cd] dark:border-[#2b2f3a] shadow-xl shadow-black/5"
                : "bg-[#f3f1ea]/40 dark:bg-[#14161c]/30 backdrop-blur-md border-white/30 dark:border-white/5"
            }`}
          >
            <div className="flex items-center justify-between px-6 py-4">
              <a
                href="#home"
                className="font-display italic text-lg tracking-tight"
              >
                {fullName.split(" ")[0]}
                <span className="text-[#a8783a] dark:text-[#c9a15c]">.</span>
              </a>

              <nav className="hidden md:flex items-center gap-8 text-xs font-medium text-[#5c5d56] dark:text-[#a3a7b3]">
                <a
                  href="#about"
                  className="hover:text-[#a8783a] dark:hover:text-[#c9a15c] transition-colors"
                >
                  About
                </a>
                <a
                  href="#skills"
                  className="hover:text-[#a8783a] dark:hover:text-[#c9a15c] transition-colors"
                >
                  Skills
                </a>
                <a
                  href="#portfolio"
                  className="hover:text-[#a8783a] dark:hover:text-[#c9a15c] transition-colors"
                >
                  Projects
                </a>
                <a
                  href="#contact"
                  className="hover:text-[#a8783a] dark:hover:text-[#c9a15c] transition-colors"
                >
                  Contact
                </a>
              </nav>

              <div className="flex items-center gap-4">
                <a
                  href="#contact"
                  className="hidden sm:block text-xs font-medium text-[#5c5d56] dark:text-[#a3a7b3] hover:text-[#a8783a] dark:hover:text-[#c9a15c] transition-colors"
                >
                  Let's talk
                </a>

                <ThemeToggle />
              </div>
            </div>
          </header>

          {/* HERO */}
          <section
            id="home"
            className="relative min-h-screen flex items-center pt-32 pb-20"
          >
            <div className="max-w-7xl mx-auto w-full px-6 md:px-10">
              <div className="grid lg:grid-cols-2 gap-16 items-center">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-8"
                >
                  <div className="inline-flex items-center gap-3">
                    <span className="relative flex h-2.5 w-2.5">
                      <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-500 animate-ping opacity-60" />
                      <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-500" />
                    </span>

                    <span className="text-sm text-[#5c5d56] dark:text-[#a3a7b3]">
                      Available for collaboration
                    </span>
                  </div>

                  <div className="space-y-4">
                    <p className="font-display italic text-lg text-[#a8783a] dark:text-[#c9a15c]">
                      Hello, I'm
                    </p>

                    <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium tracking-tight leading-[1.05]">
                      {fullName}
                    </h1>

                    <div className="flex items-center gap-4 pt-1">
                      <div className="w-10 h-px bg-[#a8783a] dark:bg-[#c9a15c]" />

                      <p className="text-lg text-[#5c5d56] dark:text-[#a3a7b3]">
                        {title}
                      </p>
                    </div>
                  </div>

                  <p className="max-w-xl text-base leading-relaxed text-[#5c5d56] dark:text-[#a3a7b3]">
                    {subTitle}
                  </p>

                  <div className="flex flex-wrap gap-4">
                    <a
                      href="#portfolio"
                      className="group flex items-center gap-3 px-6 py-3.5 rounded-lg bg-[#1c1d1a] dark:bg-[#c9a15c] text-[#f3f1ea] dark:text-[#14161c] font-semibold text-sm hover:-translate-y-0.5 transition-all"
                    >
                      View my work
                      <ArrowUpRight
                        size={16}
                        className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                      />
                    </a>

                    <a
                      href="#contact"
                      className="px-6 py-3.5 rounded-lg border border-[#ddd9cd] dark:border-[#2b2f3a] hover:border-[#a8783a] dark:hover:border-[#c9a15c] transition-all font-semibold text-sm"
                    >
                      Contact me
                    </a>
                  </div>

                  {socials.length > 0 && (
                    <div className="flex flex-wrap gap-3 pt-4">
                      {socials.map((social: any) => {
                        const iconKey = Object.keys(iconMap).find(
                          (key) =>
                            key.toLowerCase() ===
                            social.iconName?.toLowerCase(),
                        );

                        return (
                          <a
                            key={social.id}
                            href={social.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            title={social.platform}
                            className="w-10 h-10 rounded-lg border border-[#ddd9cd] dark:border-[#2b2f3a] flex items-center justify-center hover:border-[#a8783a] dark:hover:border-[#c9a15c] hover:-translate-y-1 transition-all"
                          >
                            {iconKey ? (
                              iconMap[iconKey]
                            ) : (
                              <ArrowUpRight size={16} />
                            )}
                          </a>
                        );
                      })}
                    </div>
                  )}
                </motion.div>

                {/* PHOTO STACK & DYNAMIC HIGHLIGHTS */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative flex justify-center"
                >
                  <div className="absolute w-[400px] h-[400px] bg-[#c9a15c]/15 blur-[130px] rounded-full pointer-events-none" />

                  <div className="relative">
                    <div className="absolute -inset-5 border border-[#a8783a]/25 dark:border-[#c9a15c]/20 rounded-[2rem] rotate-3" />

                    {/* Frame Foto Utama */}
                    <div className="relative p-4 bg-white dark:bg-[#1b1e26] border border-[#ddd9cd] dark:border-[#2b2f3a] rounded-[1.5rem] shadow-2xl shadow-black/5 overflow-hidden">
                      {myPhotos.length > 0 ? (
                        <PhotoStack photos={myPhotos} interval={3500} />
                      ) : (
                        <div className="w-[300px] h-[380px] rounded-xl bg-[#f3f1ea] dark:bg-[#14161c] flex items-center justify-center text-sm text-[#8b8c83]">
                          Photo not available
                        </div>
                      )}
                    </div>

                    {/* Loop Render Floating Cards dari JSON */}
                    {highlights.map((item: any, idx: number) => {
                      const posClass =
                        item.position ||
                        positionClasses[idx % positionClasses.length];

                      return (
                        <motion.div
                          key={item.id || idx}
                          animate={{ y: [0, idx % 2 === 0 ? -6 : 6, 0] }}
                          transition={{
                            duration: 3.5 + idx * 0.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                          className={`absolute ${posClass} z-20 bg-white/80 dark:bg-[#1b1e26]/80 backdrop-blur-md border border-[#ddd9cd] dark:border-[#2b2f3a] shadow-2xl shadow-black/10 px-4 py-3 rounded-2xl`}
                        >
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-xl bg-[#c9a15c]/15 flex items-center justify-center shrink-0">
                              {badgeIconMap[item.iconName] || (
                                <Code2
                                  size={18}
                                  className="text-[#a8783a] dark:text-[#c9a15c]"
                                />
                              )}
                            </div>

                            <div>
                              <p className="text-[10px] uppercase font-bold tracking-wider text-[#8b8c83]">
                                {item.title}
                              </p>
                              <p className="font-bold text-xs text-[#1f232d] dark:text-white">
                                {item.value}
                              </p>
                            </div>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </motion.div>
              </div>

              <a
                href="#about"
                className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-xs text-[#8b8c83] hover:text-[#a8783a] dark:hover:text-[#c9a15c] transition-colors"
              >
                Scroll to explore
                <ArrowDown size={16} className="animate-bounce" />
              </a>
            </div>
          </section>

          {/* ABOUT */}
          <section id="about" className="py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="grid lg:grid-cols-2 gap-20">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <p className="text-sm text-[#a8783a] dark:text-[#c9a15c] font-semibold mb-5">
                    01 — About me
                  </p>

                  <h2 className="font-display text-4xl md:text-5xl font-medium tracking-tight leading-tight mb-8">
                    Turning ideas into
                    <span className="block italic text-[#a8783a] dark:text-[#c9a15c]">
                      digital experiences.
                    </span>
                  </h2>

                  <div className="space-y-5 text-[#5c5d56] dark:text-[#a3a7b3] leading-relaxed">
                    {aboutMeList.map((text, index) => (
                      <p key={index}>{text}</p>
                    ))}
                  </div>

                  <div className="grid grid-cols-3 gap-6 mt-12 pt-8 border-t border-[#ddd9cd] dark:border-[#2b2f3a]">
                    <div>
                      <p className="font-display text-3xl font-medium">
                        {projects.length}+
                      </p>
                      <p className="text-xs text-[#8b8c83] mt-1">Projects</p>
                    </div>

                    <div>
                      <p className="font-display text-3xl font-medium">
                        {skills.length}+
                      </p>
                      <p className="text-xs text-[#8b8c83] mt-1">
                        Technologies
                      </p>
                    </div>

                    <div>
                      <p className="font-display text-3xl font-medium">100%</p>
                      <p className="text-xs text-[#8b8c83] mt-1">Passion</p>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  className="space-y-6"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#c9a15c]/10 flex items-center justify-center">
                      <GraduationCap
                        size={18}
                        className="text-[#a8783a] dark:text-[#c9a15c]"
                      />
                    </div>

                    <div>
                      <p className="text-sm text-[#a8783a] dark:text-[#c9a15c] font-semibold">
                        Education
                      </p>

                      <h3 className="text-xl font-bold">Learning journey</h3>
                    </div>
                  </div>

                  <div className="space-y-5">
                    {education.map((edu: any, index: number) => (
                      <div
                        key={index}
                        className="group relative p-6 rounded-2xl bg-white dark:bg-[#1b1e26] border border-[#ddd9cd] dark:border-[#2b2f3a] hover:border-[#a8783a] dark:hover:border-[#c9a15c] transition-all"
                      >
                        <div className="absolute left-0 top-7 w-1 h-12 bg-[#a8783a] dark:bg-[#c9a15c] rounded-r-full opacity-0 group-hover:opacity-100 transition" />

                        <p className="text-xs text-[#a8783a] dark:text-[#c9a15c] font-semibold mb-2">
                          Education
                        </p>

                        <h3 className="text-lg font-bold">{edu.school}</h3>

                        <p className="text-sm text-[#8b8c83] mt-2">
                          {edu.desc}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* SKILLS */}
          <section id="skills" className="py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="mb-16">
                <p className="text-sm text-[#a8783a] dark:text-[#c9a15c] font-semibold">
                  02 — Tech stack
                </p>

                <h2 className="font-display text-4xl md:text-5xl font-medium mt-5">
                  Technologies I use
                  <span className="block italic text-[#8b8c83]">
                    to build digital products.
                  </span>
                </h2>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <SkillCategory
                  title="Frontend"
                  icon={<Layers3 size={18} />}
                  skills={frontendSkills}
                />

                <SkillCategory
                  title="Backend"
                  icon={<Code2 size={18} />}
                  skills={backendSkills}
                />

                <SkillCategory
                  title="Database"
                  icon={<Database size={18} />}
                  skills={databaseSkills}
                />

                <SkillCategory
                  title="Tools & others"
                  icon={<Wrench size={18} />}
                  skills={toolSkills}
                />
              </div>
            </div>
          </section>

          {/* PROJECTS */}
          <section id="portfolio" className="py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="mb-20">
                <div className="flex items-center gap-3 mb-5">
                  <FolderKanban
                    size={18}
                    className="text-[#a8783a] dark:text-[#c9a15c]"
                  />

                  <p className="text-sm text-[#a8783a] dark:text-[#c9a15c] font-semibold">
                    03 — Featured projects
                  </p>
                </div>

                <h2 className="font-display text-4xl md:text-6xl font-medium">
                  Things I've built.
                </h2>

                <p className="text-[#5c5d56] dark:text-[#a3a7b3] mt-5 max-w-xl">
                  Koleksi project dan solusi digital yang pernah saya
                  kembangkan.
                </p>
              </div>

              <div className="space-y-32">
                {projects.map((project: any, index: number) => (
                  <motion.article
                    key={project.id}
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className={`grid lg:grid-cols-2 gap-12 items-center ${
                      index % 2 !== 0 ? "lg:[&>*:first-child]:order-2" : ""
                    }`}
                  >
                    <div className="group relative overflow-hidden rounded-2xl border border-[#ddd9cd] dark:border-[#2b2f3a] bg-[#ece9df] dark:bg-[#1b1e26]">
                      <div className="aspect-[16/10]">
                        {project.imageUrl ? (
                          <img
                            src={project.imageUrl}
                            alt={project.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-[#8b8c83] text-sm">
                            Project preview
                          </div>
                        )}
                      </div>

                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>

                    <div className="space-y-6">
                      <p className="font-display italic text-lg text-[#a8783a] dark:text-[#c9a15c]">
                        Project {String(index + 1).padStart(2, "0")}
                      </p>

                      <h3 className="font-display text-3xl md:text-4xl font-medium">
                        {project.title}
                      </h3>

                      <p className="leading-relaxed text-[#5c5d56] dark:text-[#a3a7b3]">
                        {project.desc}
                      </p>

                      <div className="flex flex-wrap gap-2">
                        <span className="px-3.5 py-1.5 text-xs rounded-md border border-[#ddd9cd] dark:border-[#2b2f3a] text-[#5c5d56] dark:text-[#a3a7b3]">
                          Web development
                        </span>

                        <span className="px-3.5 py-1.5 text-xs rounded-md border border-[#ddd9cd] dark:border-[#2b2f3a] text-[#5c5d56] dark:text-[#a3a7b3]">
                          UI / UX
                        </span>
                      </div>

                      {project.projectUrl ? (
                        <a
                          href={project.projectUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group inline-flex items-center gap-2 font-semibold text-sm hover:text-[#a8783a] dark:hover:text-[#c9a15c] transition-colors"
                        >
                          View project
                          <ArrowUpRight
                            size={16}
                            className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                          />
                        </a>
                      ) : (
                        <span className="text-sm text-[#8b8c83]">
                          Internal project
                        </span>
                      )}
                    </div>
                  </motion.article>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT */}
          <section id="contact" className="py-32">
            <div className="max-w-7xl mx-auto px-6 md:px-10">
              <div className="relative overflow-hidden rounded-[1.75rem] bg-[#14161c] text-[#eeece5] p-8 md:p-16">
                <div className="absolute top-[-200px] right-[-150px] w-[600px] h-[600px] bg-[#c9a15c]/10 blur-[150px] rounded-full" />

                <div className="relative grid lg:grid-cols-2 gap-16">
                  <div>
                    <div className="flex items-center gap-3 text-[#c9a15c]">
                      <Sparkles size={16} />

                      <p className="text-sm font-semibold">Get in touch</p>
                    </div>

                    <h2 className="font-display text-5xl md:text-6xl font-medium mt-8 leading-tight">
                      Let's build
                      <span className="block italic text-[#c9a15c]">
                        something amazing.
                      </span>
                    </h2>

                    <p className="text-[#a3a7b3] mt-8 max-w-md leading-relaxed">
                      Punya ide project, ingin berkolaborasi, atau ingin
                      berdiskusi mengenai teknologi? Silakan hubungi saya.
                    </p>

                    <div className="flex items-center gap-3 mt-10 text-[#a3a7b3]">
                      <Mail size={16} />
                      <span className="text-sm">Let's connect</span>
                    </div>
                  </div>

                  <form onSubmit={handleContactSubmit} className="space-y-4">
                    <input
                      type="email"
                      placeholder="Your email"
                      value={emailInput}
                      onChange={(e) => setEmailInput(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-3.5 text-sm outline-none focus:border-[#c9a15c] transition-colors"
                    />

                    <textarea
                      rows={7}
                      placeholder="Tell me about your project..."
                      value={messageInput}
                      onChange={(e) => setMessageInput(e.target.value)}
                      required
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-5 py-3.5 text-sm outline-none focus:border-[#c9a15c] transition-colors resize-none"
                    />

                    <button
                      type="submit"
                      disabled={isSending}
                      className="w-full bg-[#c9a15c] hover:bg-[#d4b073] text-[#14161c] disabled:opacity-60 py-3.5 rounded-lg font-semibold text-sm flex items-center justify-center gap-3 transition-colors"
                    >
                      {isSending ? "Sending..." : "Send message"}
                      <FaPaperPlane size={13} />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* FOOTER */}
          <footer className="border-t border-[#ddd9cd] dark:border-[#2b2f3a] py-10">
            <div className="max-w-7xl mx-auto px-6 md:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-xs text-[#8b8c83]">
                © {new Date().getFullYear()} {fullName}. All rights reserved.
              </p>

              <p className="text-xs text-[#8b8c83]">
                Built with Next.js & Static JSON
              </p>
            </div>
          </footer>
        </motion.div>
      )}
    </main>
  );
}

// ==========================================
// SKILL CATEGORY COMPONENT
// ==========================================

function SkillCategory({
  title,
  icon,
  skills,
}: {
  title: string;
  icon: React.ReactNode;
  skills: any[];
}) {
  return (
    <div className="p-7 rounded-2xl bg-white dark:bg-[#1b1e26] border border-[#ddd9cd] dark:border-[#2b2f3a] hover:border-[#a8783a]/50 dark:hover:border-[#c9a15c]/50 transition-all">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-lg bg-[#c9a15c]/10 text-[#a8783a] dark:text-[#c9a15c] flex items-center justify-center">
            {icon}
          </div>

          <h3 className="font-bold text-lg">{title}</h3>
        </div>

        <span className="text-xs text-[#8b8c83]">{skills.length}</span>
      </div>

      <div className="grid grid-cols-2 gap-3">
        {skills.length > 0 ? (
          skills.map((skill: any, index: number) => {
            const iconKey = Object.keys(iconMap).find(
              (key) => key.toLowerCase() === skill.iconName?.toLowerCase(),
            );

            return (
              <motion.div
                key={index}
                whileHover={{ y: -3 }}
                className="flex items-center gap-3 p-3 rounded-lg bg-[#f3f1ea] dark:bg-[#14161c] border border-[#e4e1d5] dark:border-[#23262f]"
              >
                <div className="shrink-0">
                  {iconKey ? (
                    iconMap[iconKey]
                  ) : (
                    <Code2
                      size={18}
                      className="text-[#a8783a] dark:text-[#c9a15c]"
                    />
                  )}
                </div>

                <span className="text-xs font-medium truncate">
                  {skill.name}
                </span>
              </motion.div>
            );
          })
        ) : (
          <p className="text-sm text-[#8b8c83]">Belum ada skill</p>
        )}
      </div>
    </div>
  );
}
