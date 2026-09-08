"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";
import axios from "axios";
import { Trash2 } from "lucide-react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export default function AdminDashboard() {
  const router = useRouter();
  const token = Cookies.get("admin_token");

  const [activeTab, setActiveTab] = useState<
    | "profile"
    | "education"
    | "skills"
    | "projects"
    | "socials"
    | "highlights"
    | "messages"
  >("profile");
  const [loading, setLoading] = useState(true);
  const [statusMsg, setStatusMsg] = useState("");

  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);

  // States Data Portofolio
  const [profile, setProfile] = useState({
    fullName: "",
    title: "",
    subTitle: "",
    aboutMeText: "",
  });
  const [educationList, setEducationList] = useState<any[]>([]);
  const [skillsList, setSkillsList] = useState<any[]>([]);
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [socialsList, setSocialsList] = useState<any[]>([]);
  const [highlightsList, setHighlightsList] = useState<any[]>([]); // State Highlights
  const [messagesList, setMessagesList] = useState<any[]>([]);

  // Preset Ikon Media Sosial
  const SOCIAL_ICONS = [
    { label: "GitHub", value: "SiGithub" },
    { label: "LinkedIn", value: "SiLinkedin" },
    { label: "Instagram", value: "SiInstagram" },
    { label: "Twitter / X", value: "SiX" },
    { label: "YouTube", value: "SiYoutube" },
    { label: "Facebook", value: "SiFacebook" },
    { label: "TikTok", value: "SiTiktok" },
    { label: "Discord", value: "SiDiscord" },
  ];

  const AVAILABLE_ICONS = [
    { label: "HTML5", value: "SiHtml5" },
    { label: "CSS3", value: "SiCss3" },
    { label: "JavaScript", value: "SiJavascript" },
    { label: "TypeScript", value: "SiTypescript" },
    { label: "React.js", value: "SiReact" },
    { label: "Next.js", value: "SiNextdotjs" },
    { label: "Tailwind CSS", value: "SiTailwindcss" },
    { label: "Node.js", value: "SiNodedotjs" },
    { label: "Express.js", value: "SiExpress" },
    { label: "PHP", value: "SiPhp" },
    { label: "Laravel", value: "SiLaravel" },
    { label: "CodeIgniter", value: "SiCodeigniter" },
    { label: "Python", value: "SiPython" },
    { label: "Flutter", value: "SiFlutter" },
    { label: "Dart", value: "SiDart" },
    { label: "MySQL", value: "SiMysql" },
    { label: "PostgreSQL", value: "SiPostgresql" },
    { label: "MongoDB", value: "SiMongodb" },
    { label: "Git", value: "SiGit" },
    { label: "GitHub", value: "SiGithub" },
    { label: "Figma", value: "SiFigma" },
    { label: "Godot Engine", value: "SiGodotengine" },
  ];

  // Preset Ikon Highlights / Badges
  const HIGHLIGHT_ICONS = [
    { label: "Code2 (Coding)", value: "Code2" },
    { label: "Briefcase (Work)", value: "Briefcase" },
    { label: "Zap (Lightning)", value: "Zap" },
    { label: "Award (Badge/Trophy)", value: "Award" },
    { label: "Sparkles (Stars)", value: "Sparkles" },
  ];

  // Form Input States
  const [eduInput, setEduInput] = useState({ school: "", desc: "" });
  const [skillInput, setSkillInput] = useState({ name: "", iconName: "" });
  const [projectInput, setProjectInput] = useState({
    title: "",
    desc: "",
    projectUrl: "",
  });
  const [projectImageFile, setProjectImageFile] = useState<File | null>(null);

  // Form Social Media State
  const [socialInput, setSocialInput] = useState({
    platform: "",
    iconName: "",
    url: "",
  });
  const [editingSocialId, setEditingSocialId] = useState<number | null>(null);

  // Form Highlight / Badge State
  const [highlightInput, setHighlightInput] = useState({
    title: "",
    value: "",
    iconName: "Code2",
    position: "",
  });
  const [editingHighlightId, setEditingHighlightId] = useState<number | null>(
    null,
  );

  useEffect(() => {
    if (!token) {
      router.push("/admin/login");
    } else {
      fetchData();
    }
  }, [token, router]);

  const fetchData = async () => {
    try {
      setLoading(true);
      const res = await axios.get(`${API_URL}/api/portfolio`);
      const data = res.data;

      if (data?.profile) {
        let aboutText = "";
        try {
          const parsed =
            typeof data.profile.aboutMe === "string"
              ? JSON.parse(data.profile.aboutMe)
              : data.profile.aboutMe;
          aboutText = Array.isArray(parsed) ? parsed.join("\n") : parsed;
        } catch {
          aboutText = data.profile.aboutMe || "";
        }
        setProfile({
          fullName: data.profile.fullName || "",
          title: data.profile.title || "",
          subTitle: data.profile.subTitle || "",
          aboutMeText: aboutText,
        });

        if (data.profile.photos) {
          try {
            const parsedPhotos =
              typeof data.profile.photos === "string"
                ? JSON.parse(data.profile.photos)
                : data.profile.photos;
            setUploadedPhotos(Array.isArray(parsedPhotos) ? parsedPhotos : []);
          } catch {
            setUploadedPhotos([]);
          }
        }
      }

      setEducationList(Array.isArray(data?.education) ? data.education : []);
      setSkillsList(Array.isArray(data?.skills) ? data.skills : []);
      setProjectsList(Array.isArray(data?.projects) ? data.projects : []);
      setSocialsList(Array.isArray(data?.socials) ? data.socials : []);
      setHighlightsList(Array.isArray(data?.highlights) ? data.highlights : []);

      try {
        const resMsg = await axios.get(`${API_URL}/api/messages`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessagesList(Array.isArray(resMsg.data) ? resMsg.data : []);
      } catch (err) {
        setMessagesList([]);
      }
    } catch (err) {
      console.error("Gagal mengambil data portofolio di Admin:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    Cookies.remove("admin_token");
    router.push("/admin/login");
  };

  const notify = (msg: string) => {
    setStatusMsg(msg);
    setTimeout(() => setStatusMsg(""), 3000);
  };

  // UPLOAD FOTO PROFILE
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    const files = Array.from(e.target.files);

    const formData = new FormData();
    files.forEach((file) => formData.append("profile_photos", file));

    try {
      const res = await axios.post(
        `${API_URL}/api/profile/upload-photos`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setUploadedPhotos((prev) => [...prev, ...res.data.photos]);
      notify("✅ Foto profil berhasil diunggah!");
    } catch (err) {
      notify("❌ Gagal mengunggah foto profil.");
    }
  };

  // HAPUS FOTO PROFILE
  const handleDeletePhoto = async (photoUrl: string) => {
    if (!confirm("Hapus foto ini?")) return;
    try {
      await axios.delete(`${API_URL}/api/profile/photos`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        data: {
          photoUrl,
        },
      });
      setUploadedPhotos((prev) => prev.filter((url) => url !== photoUrl));
      notify("✅ Foto berhasil dihapus!");
    } catch (err) {
      notify("❌ Gagal menghapus foto.");
    }
  };

  // UPDATE PROFILE
  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const aboutMeArray = profile.aboutMeText
        .split("\n")
        .filter((line) => line.trim() !== "");
      await axios.put(
        `${API_URL}/api/profile`,
        {
          fullName: profile.fullName,
          title: profile.title,
          subTitle: profile.subTitle,
          aboutMe: aboutMeArray,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      notify("✅ Profile berhasil diperbarui!");
      setIsEditingProfile(false);
      fetchData();
    } catch (err) {
      notify("❌ Gagal memperbarui Profile.");
    }
  };

  // EDUCATION CRUD
  const handleAddEducation = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/education`, eduInput, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEduInput({ school: "", desc: "" });
      notify("✅ Education berhasil ditambahkan!");
      fetchData();
    } catch (err) {
      notify("❌ Gagal menambah Education.");
    }
  };

  const handleDeleteEducation = async (id: number) => {
    if (!confirm("Hapus data pendidikan ini?")) return;
    try {
      await axios.delete(`${API_URL}/api/education/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notify("✅ Education berhasil dihapus!");
      fetchData();
    } catch (err) {
      notify("❌ Gagal menghapus Education.");
    }
  };

  // SKILLS CRUD
  const handleAddSkill = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(`${API_URL}/api/skills`, skillInput, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setSkillInput({ name: "", iconName: "" });
      notify("✅ Skill berhasil ditambahkan!");
      fetchData();
    } catch (err) {
      notify("❌ Gagal menambah Skill.");
    }
  };

  const handleDeleteSkill = async (id: number) => {
    if (!confirm("Hapus skill ini?")) return;
    try {
      await axios.delete(`${API_URL}/api/skills/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notify("✅ Skill berhasil dihapus!");
      fetchData();
    } catch (err) {
      notify("❌ Gagal menghapus Skill.");
    }
  };

  // PROJECTS CRUD
  const handleAddProject = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let uploadedImageUrl = "";

      if (projectImageFile) {
        const formData = new FormData();
        formData.append("project_image", projectImageFile);

        const uploadRes = await axios.post(
          `${API_URL}/api/projects/upload-image`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: `Bearer ${token}`,
            },
          },
        );
        uploadedImageUrl = uploadRes.data.imageUrl;
      }

      await axios.post(
        `${API_URL}/api/projects`,
        {
          title: projectInput.title,
          desc: projectInput.desc,
          imageUrl: uploadedImageUrl,
          projectUrl: projectInput.projectUrl,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setProjectInput({ title: "", desc: "", projectUrl: "" });
      setProjectImageFile(null);
      notify("✅ Project berhasil ditambahkan!");
      fetchData();
    } catch (err) {
      notify("❌ Gagal menambah Project.");
    }
  };

  const handleDeleteProject = async (id: number) => {
    if (!confirm("Hapus proyek ini?")) return;
    try {
      await axios.delete(`${API_URL}/api/projects/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notify("✅ Project berhasil dihapus!");
      fetchData();
    } catch (err) {
      notify("❌ Gagal menghapus Project.");
    }
  };

  // SOCIAL MEDIA CRUD
  const handleSaveSocial = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSocialId) {
        await axios.put(
          `${API_URL}/api/socials/${editingSocialId}`,
          socialInput,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        notify("✅ Media sosial berhasil diperbarui!");
      } else {
        await axios.post(`${API_URL}/api/socials`, socialInput, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        notify("✅ Media sosial berhasil ditambahkan!");
      }
      setSocialInput({ platform: "", iconName: "", url: "" });
      setEditingSocialId(null);
      fetchData();
    } catch (err) {
      notify("❌ Gagal menyimpan Media Sosial.");
    }
  };

  const handleEditSocialClick = (item: any) => {
    setEditingSocialId(item.id);
    setSocialInput({
      platform: item.platform,
      iconName: item.iconName,
      url: item.url,
    });
  };

  const handleDeleteSocial = async (id: number) => {
    if (!confirm("Hapus media sosial ini?")) return;
    try {
      await axios.delete(`${API_URL}/api/socials/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notify("✅ Media sosial berhasil dihapus!");
      fetchData();
    } catch (err) {
      notify("❌ Gagal menghapus Media Sosial.");
    }
  };

  // HIGHLIGHTS / BADGES CRUD
  const handleSaveHighlight = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingHighlightId) {
        await axios.put(
          `${API_URL}/api/highlights/${editingHighlightId}`,
          highlightInput,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          },
        );
        notify("✅ Highlight berhasil diperbarui!");
      } else {
        await axios.post(`${API_URL}/api/highlights`, highlightInput, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        notify("✅ Highlight berhasil ditambahkan!");
      }
      setHighlightInput({
        title: "",
        value: "",
        iconName: "Code2",
        position: "",
      });
      setEditingHighlightId(null);
      fetchData();
    } catch (err) {
      notify("❌ Gagal menyimpan Highlight.");
    }
  };

  const handleEditHighlightClick = (item: any) => {
    setEditingHighlightId(item.id);
    setHighlightInput({
      title: item.title,
      value: item.value,
      iconName: item.iconName || "Code2",
      position: item.position || "",
    });
  };

  const handleDeleteHighlight = async (id: number) => {
    if (!confirm("Hapus highlight badge ini?")) return;
    try {
      await axios.delete(`${API_URL}/api/highlights/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notify("✅ Highlight berhasil dihapus!");
      fetchData();
    } catch (err) {
      notify("❌ Gagal menghapus Highlight.");
    }
  };

  // MESSAGES DELETE
  const handleDeleteMessage = async (id: number) => {
    if (!confirm("Hapus pesan ini?")) return;
    try {
      await axios.delete(`${API_URL}/api/messages/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      notify("✅ Pesan berhasil dihapus!");
      fetchData();
    } catch (err) {
      notify("❌ Gagal menghapus Pesan.");
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-[#12141a] text-[#eeece5] p-8 font-mono">
        Memuat dashboard admin...
      </div>
    );

  const inputClass =
    "w-full p-2.5 rounded-lg bg-[#14161c] border border-[#2b2f3a] text-sm text-[#eeece5] outline-none focus:border-[#c9a15c] transition-colors";
  const labelClass = "block text-xs font-semibold text-[#a3a7b3] mb-1";
  const cardClass =
    "bg-[#1b1e26] p-6 rounded-xl border border-[#2b2f3a] space-y-4";
  const btnPrimary =
    "px-5 py-2.5 bg-[#c9a15c] hover:bg-[#d4b073] text-[#14161c] font-semibold text-xs rounded-lg transition-colors";
  const btnAdd =
    "px-5 py-2.5 bg-[#5f8a52] hover:bg-[#6c9a5d] text-white font-semibold text-xs rounded-lg transition-colors";
  const btnEdit =
    "px-3 py-1.5 bg-[#5c7a94] hover:bg-[#6a89a5] text-white rounded-lg text-xs font-semibold transition-colors";
  const btnDelete =
    "px-3 py-1.5 bg-[#a8543f]/85 hover:bg-[#a8543f] text-white rounded-lg text-xs font-semibold transition-colors";

  return (
    <div className="min-h-screen bg-[#12141a] text-[#eeece5] p-6 md:p-10 font-sans">
      <style jsx global>{`
        @import url("https://fonts.googleapis.com/css2?family=Newsreader:ital,opsz,wght@0,6..72,500;1,6..72,500&family=Manrope:wght@400;500;600;700&display=swap");
        .font-display {
          font-family: "Newsreader", Georgia, serif;
        }
        body {
          font-family: "Manrope", system-ui, sans-serif;
        }
      `}</style>

      <div className="max-w-5xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex justify-between items-center border-b border-[#2b2f3a] pb-4">
          <div>
            <h1 className="font-display italic text-2xl font-medium text-[#c9a15c]">
              Dashboard admin portfolio
            </h1>
            <p className="text-xs text-[#8b8c83] mt-1">
              Kelola seluruh data website portofolio dari satu tempat
            </p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-[#a8543f]/85 hover:bg-[#a8543f] text-white font-semibold rounded-lg text-xs transition-colors"
          >
            Logout
          </button>
        </div>

        {/* Notifikasi Status */}
        {statusMsg && (
          <div className="p-3 bg-[#c9a15c]/10 border border-[#c9a15c]/40 text-[#c9a15c] text-xs rounded-lg font-medium">
            {statusMsg}
          </div>
        )}

        {/* Tab Navigasi */}
        <div className="flex border-b border-[#2b2f3a] gap-2 overflow-x-auto pb-2">
          {(
            [
              "profile",
              "education",
              "skills",
              "projects",
              "socials",
              "highlights",
              "messages",
            ] as const
          ).map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-lg text-xs font-semibold capitalize transition-colors whitespace-nowrap ${
                activeTab === tab
                  ? "bg-[#c9a15c] text-[#14161c] shadow-lg shadow-[#c9a15c]/20"
                  : "bg-[#1b1e26] text-[#a3a7b3] hover:bg-[#21242e]"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* TAB 1: PROFILE */}
        {activeTab === "profile" && (
          <div className="space-y-6">
            {!isEditingProfile ? (
              <div className={cardClass}>
                <div className="flex justify-between items-center border-b border-[#2b2f3a] pb-3">
                  <h2 className="text-lg font-semibold text-[#c9a15c]">
                    Preview profile saat ini
                  </h2>
                  <button
                    onClick={() => setIsEditingProfile(true)}
                    className={btnEdit}
                  >
                    Edit profile
                  </button>
                </div>
                <div className="space-y-3 text-sm">
                  <div>
                    <span className="text-[#6b6f7c] text-xs block">
                      fullName:
                    </span>
                    <p className="font-semibold text-[#eeece5] text-base">
                      {profile.fullName || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#6b6f7c] text-xs block">title:</span>
                    <p className="font-semibold text-[#d8d5c9]">
                      {profile.title || "-"}
                    </p>
                  </div>
                  <div>
                    <span className="text-[#6b6f7c] text-xs block">
                      subTitle:
                    </span>
                    <p className="text-[#a3a7b3]">{profile.subTitle || "-"}</p>
                  </div>
                  <div>
                    <span className="text-[#6b6f7c] text-xs block">
                      aboutMe (JSON Array):
                    </span>
                    <p className="text-[#a3a7b3] whitespace-pre-wrap bg-[#14161c] p-3 rounded-lg border border-[#2b2f3a] mt-1">
                      {profile.aboutMeText || "-"}
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <form onSubmit={handleUpdateProfile} className={cardClass}>
                <div className="flex justify-between items-center border-b border-[#2b2f3a] pb-3">
                  <h2 className="text-lg font-semibold text-[#c9a15c]">
                    Edit data profile
                  </h2>
                  <button
                    type="button"
                    onClick={() => setIsEditingProfile(false)}
                    className="px-3 py-1.5 bg-[#21242e] hover:bg-[#282c38] text-[#d8d5c9] font-semibold rounded-lg text-xs transition-colors"
                  >
                    Batal
                  </button>
                </div>
                <div>
                  <label className={labelClass}>fullName</label>
                  <input
                    type="text"
                    value={profile.fullName}
                    onChange={(e) =>
                      setProfile({ ...profile, fullName: e.target.value })
                    }
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>title</label>
                  <input
                    type="text"
                    value={profile.title}
                    onChange={(e) =>
                      setProfile({ ...profile, title: e.target.value })
                    }
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>subTitle</label>
                  <textarea
                    rows={2}
                    value={profile.subTitle}
                    onChange={(e) =>
                      setProfile({ ...profile, subTitle: e.target.value })
                    }
                    required
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>aboutMe</label>
                  <textarea
                    rows={5}
                    value={profile.aboutMeText}
                    onChange={(e) =>
                      setProfile({ ...profile, aboutMeText: e.target.value })
                    }
                    required
                    className={inputClass}
                  />
                </div>
                <button type="submit" className={btnPrimary}>
                  Simpan perubahan
                </button>
              </form>
            )}

            <div className={cardClass}>
              <h3 className="text-md font-semibold text-[#c9a15c]">
                Upload galeri foto profile (max 20MB/file)
              </h3>
              <input
                type="file"
                multiple
                accept="image/*"
                onChange={handlePhotoUpload}
                className="block w-full text-xs text-[#a3a7b3] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#c9a15c] file:text-[#14161c] hover:file:bg-[#d4b073] cursor-pointer"
              />
              {uploadedPhotos.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4">
                  {uploadedPhotos.map((photoUrl, idx) => (
                    <div
                      key={idx}
                      className="relative group rounded-lg overflow-hidden border border-[#2b2f3a] h-32 bg-[#14161c]"
                    >
                      <img
                        src={photoUrl}
                        alt={`Profile Photo ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors" />
                      <button
                        type="button"
                        onClick={() => handleDeletePhoto(photoUrl)}
                        aria-label="Hapus foto"
                        className="absolute top-2 right-2 w-7 h-7 rounded-md bg-[#a8543f]/90 hover:bg-[#a8543f] text-white flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 2: EDUCATION */}
        {activeTab === "education" && (
          <div className="space-y-6">
            <form onSubmit={handleAddEducation} className={cardClass}>
              <h2 className="text-lg font-semibold text-[#c9a15c]">
                Tambah riwayat pendidikan
              </h2>
              <div>
                <label className={labelClass}>school</label>
                <input
                  type="text"
                  value={eduInput.school}
                  onChange={(e) =>
                    setEduInput({ ...eduInput, school: e.target.value })
                  }
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>desc</label>
                <textarea
                  value={eduInput.desc}
                  onChange={(e) =>
                    setEduInput({ ...eduInput, desc: e.target.value })
                  }
                  required
                  className={inputClass}
                />
              </div>
              <button type="submit" className={btnAdd}>
                Tambah education
              </button>
            </form>
            <div className={cardClass}>
              <h3 className="font-semibold text-sm text-[#a3a7b3]">
                Daftar pendidikan
              </h3>
              {educationList.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between items-center bg-[#14161c] p-4 rounded-lg border border-[#2b2f3a]"
                >
                  <div>
                    <h4 className="font-semibold text-sm text-[#eeece5]">
                      {item.school}
                    </h4>
                    <p className="text-xs text-[#8b8c83]">{item.desc}</p>
                  </div>
                  <button
                    onClick={() => handleDeleteEducation(item.id)}
                    className={btnDelete}
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: SKILLS */}
        {activeTab === "skills" && (
          <div className="space-y-6">
            <form onSubmit={handleAddSkill} className={cardClass}>
              <h2 className="text-lg font-semibold text-[#c9a15c]">
                Tambah skill keahlian
              </h2>
              <div>
                <label className={labelClass}>iconName</label>
                <select
                  value={skillInput.iconName}
                  onChange={(e) => {
                    const found = AVAILABLE_ICONS.find(
                      (item) => item.value === e.target.value,
                    );
                    setSkillInput({
                      iconName: e.target.value,
                      name: skillInput.name
                        ? skillInput.name
                        : found
                          ? found.label
                          : "",
                    });
                  }}
                  required
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">-- Pilih ikon --</option>
                  {AVAILABLE_ICONS.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label} ({icon.value})
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>name</label>
                <input
                  type="text"
                  value={skillInput.name}
                  onChange={(e) =>
                    setSkillInput({ ...skillInput, name: e.target.value })
                  }
                  required
                  className={inputClass}
                />
              </div>
              <button type="submit" className={btnAdd}>
                Tambah skill
              </button>
            </form>
            <div className={cardClass}>
              <h3 className="font-semibold text-sm text-[#a3a7b3]">
                Daftar skill saat ini
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {skillsList.map((skill) => (
                  <div
                    key={skill.id}
                    className="flex justify-between items-center bg-[#14161c] p-3 rounded-lg border border-[#2b2f3a]"
                  >
                    <div>
                      <h4 className="font-semibold text-sm text-[#eeece5]">
                        {skill.name}
                      </h4>
                      <p className="text-xs text-[#6b6f7c]">
                        iconName: {skill.iconName}
                      </p>
                    </div>
                    <button
                      onClick={() => handleDeleteSkill(skill.id)}
                      className={btnDelete}
                    >
                      Hapus
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: PROJECTS */}
        {activeTab === "projects" && (
          <div className="space-y-6">
            <form onSubmit={handleAddProject} className={cardClass}>
              <h2 className="text-lg font-semibold text-[#c9a15c]">
                Tambah proyek portofolio
              </h2>
              <div>
                <label className={labelClass}>title</label>
                <input
                  type="text"
                  value={projectInput.title}
                  onChange={(e) =>
                    setProjectInput({ ...projectInput, title: e.target.value })
                  }
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>desc</label>
                <textarea
                  value={projectInput.desc}
                  onChange={(e) =>
                    setProjectInput({ ...projectInput, desc: e.target.value })
                  }
                  required
                  className={inputClass}
                />
              </div>
              <div>
                <label className={labelClass}>imageUrl (upload file)</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setProjectImageFile(
                      e.target.files ? e.target.files[0] : null,
                    )
                  }
                  className="block w-full text-xs text-[#a3a7b3] file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-xs file:font-semibold file:bg-[#c9a15c] file:text-[#14161c] hover:file:bg-[#d4b073] cursor-pointer"
                />
              </div>
              <div>
                <label className={labelClass}>projectUrl (opsional)</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={projectInput.projectUrl}
                  onChange={(e) =>
                    setProjectInput({
                      ...projectInput,
                      projectUrl: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>
              <button type="submit" className={btnAdd}>
                Tambah proyek
              </button>
            </form>
            <div className={cardClass}>
              <h3 className="font-semibold text-sm text-[#a3a7b3]">
                Daftar proyek
              </h3>
              {projectsList.map((proj) => (
                <div
                  key={proj.id}
                  className="flex justify-between items-center bg-[#14161c] p-4 rounded-lg border border-[#2b2f3a]"
                >
                  <div className="flex items-center gap-4">
                    {proj.imageUrl && (
                      <img
                        src={proj.imageUrl}
                        alt={proj.title}
                        className="w-16 h-12 object-cover rounded border border-[#2b2f3a]"
                      />
                    )}
                    <div>
                      <h4 className="font-semibold text-sm text-[#c9a15c]">
                        {proj.title}
                      </h4>
                      <p className="text-xs text-[#8b8c83]">{proj.desc}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => handleDeleteProject(proj.id)}
                    className={btnDelete}
                  >
                    Hapus
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 5: SOCIALS */}
        {activeTab === "socials" && (
          <div className="space-y-6">
            <form onSubmit={handleSaveSocial} className={cardClass}>
              <div className="flex justify-between items-center border-b border-[#2b2f3a] pb-2">
                <h2 className="text-lg font-semibold text-[#c9a15c]">
                  {editingSocialId
                    ? "Edit media sosial"
                    : "Tambah media sosial"}
                </h2>
                {editingSocialId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingSocialId(null);
                      setSocialInput({ platform: "", iconName: "", url: "" });
                    }}
                    className="text-xs text-[#a3a7b3] hover:text-[#c9a15c] hover:underline transition-colors"
                  >
                    Batal edit
                  </button>
                )}
              </div>

              <div>
                <label className={labelClass}>Pilih ikon social media</label>
                <select
                  value={socialInput.iconName}
                  onChange={(e) => {
                    const selectedIcon = e.target.value;
                    const found = SOCIAL_ICONS.find(
                      (item) => item.value === selectedIcon,
                    );
                    setSocialInput({
                      ...socialInput,
                      iconName: selectedIcon,
                      platform: socialInput.platform
                        ? socialInput.platform
                        : found
                          ? found.label
                          : "",
                    });
                  }}
                  required
                  className={`${inputClass} cursor-pointer`}
                >
                  <option value="">-- Pilih ikon --</option>
                  {SOCIAL_ICONS.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label} ({icon.value})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>Nama platform</label>
                <input
                  type="text"
                  placeholder="contoh: GitHub"
                  value={socialInput.platform}
                  onChange={(e) =>
                    setSocialInput({ ...socialInput, platform: e.target.value })
                  }
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>URL akun</label>
                <input
                  type="url"
                  placeholder="https://github.com/username"
                  value={socialInput.url}
                  onChange={(e) =>
                    setSocialInput({ ...socialInput, url: e.target.value })
                  }
                  required
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className={editingSocialId ? btnEdit : btnAdd}
              >
                {editingSocialId ? "Perbarui social" : "Tambah social"}
              </button>
            </form>

            <div className={cardClass}>
              <h3 className="font-semibold text-sm text-[#a3a7b3]">
                Daftar akun media sosial
              </h3>
              {socialsList.length === 0 ? (
                <p className="text-xs text-[#6b6f7c]">
                  Belum ada media sosial yang ditambahkan.
                </p>
              ) : (
                <div className="space-y-3">
                  {socialsList.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-[#14161c] p-4 rounded-lg border border-[#2b2f3a]"
                    >
                      <div>
                        <h4 className="font-semibold text-sm text-[#eeece5]">
                          {item.platform}
                        </h4>
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noreferrer"
                          className="text-xs text-[#c9a15c] hover:underline block"
                        >
                          {item.url}
                        </a>
                        <span className="text-[10px] text-[#6b6f7c]">
                          Icon: {item.iconName}
                        </span>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditSocialClick(item)}
                          className={btnEdit}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteSocial(item.id)}
                          className={btnDelete}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 6: HIGHLIGHTS / BADGES */}
        {activeTab === "highlights" && (
          <div className="space-y-6">
            <form onSubmit={handleSaveHighlight} className={cardClass}>
              <div className="flex justify-between items-center border-b border-[#2b2f3a] pb-2">
                <h2 className="text-lg font-semibold text-[#c9a15c]">
                  {editingHighlightId
                    ? "Edit floating badge"
                    : "Tambah floating badge"}
                </h2>
                {editingHighlightId && (
                  <button
                    type="button"
                    onClick={() => {
                      setEditingHighlightId(null);
                      setHighlightInput({
                        title: "",
                        value: "",
                        iconName: "Code2",
                        position: "",
                      });
                    }}
                    className="text-xs text-[#a3a7b3] hover:text-[#c9a15c] hover:underline transition-colors"
                  >
                    Batal edit
                  </button>
                )}
              </div>

              <div>
                <label className={labelClass}>Label atas (Contoh: Focus)</label>
                <input
                  type="text"
                  placeholder="Focus"
                  value={highlightInput.title}
                  onChange={(e) =>
                    setHighlightInput({
                      ...highlightInput,
                      title: e.target.value,
                    })
                  }
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>
                  Nilai utama (Contoh: Full Stack Dev)
                </label>
                <input
                  type="text"
                  placeholder="Full Stack Dev"
                  value={highlightInput.value}
                  onChange={(e) =>
                    setHighlightInput({
                      ...highlightInput,
                      value: e.target.value,
                    })
                  }
                  required
                  className={inputClass}
                />
              </div>

              <div>
                <label className={labelClass}>Pilih ikon badge</label>
                <select
                  value={highlightInput.iconName}
                  onChange={(e) =>
                    setHighlightInput({
                      ...highlightInput,
                      iconName: e.target.value,
                    })
                  }
                  required
                  className={`${inputClass} cursor-pointer`}
                >
                  {HIGHLIGHT_ICONS.map((icon) => (
                    <option key={icon.value} value={icon.value}>
                      {icon.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className={labelClass}>
                  Posisi kustom CSS (Opsional)
                </label>
                <input
                  type="text"
                  placeholder="Contoh: -bottom-4 -left-6 (Biarkan kosong untuk otomatis)"
                  value={highlightInput.position}
                  onChange={(e) =>
                    setHighlightInput({
                      ...highlightInput,
                      position: e.target.value,
                    })
                  }
                  className={inputClass}
                />
              </div>

              <button
                type="submit"
                className={editingHighlightId ? btnEdit : btnAdd}
              >
                {editingHighlightId ? "Perbarui highlight" : "Tambah highlight"}
              </button>
            </form>

            <div className={cardClass}>
              <h3 className="font-semibold text-sm text-[#a3a7b3]">
                Daftar Floating Badges / Highlights
              </h3>
              {highlightsList.length === 0 ? (
                <p className="text-xs text-[#6b6f7c]">
                  Belum ada highlight badge yang ditambahkan.
                </p>
              ) : (
                <div className="space-y-3">
                  {highlightsList.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between items-center bg-[#14161c] p-4 rounded-lg border border-[#2b2f3a]"
                    >
                      <div>
                        <span className="text-[10px] text-[#c9a15c] uppercase font-bold tracking-wider">
                          {item.title}
                        </span>
                        <h4 className="font-semibold text-sm text-[#eeece5]">
                          {item.value}
                        </h4>
                        <p className="text-xs text-[#6b6f7c]">
                          Icon: {item.iconName}{" "}
                          {item.position ? `| Posisi: ${item.position}` : ""}
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEditHighlightClick(item)}
                          className={btnEdit}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteHighlight(item.id)}
                          className={btnDelete}
                        >
                          Hapus
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* TAB 7: MESSAGES */}
        {activeTab === "messages" && (
          <div className={cardClass}>
            <h2 className="text-lg font-semibold text-[#c9a15c]">
              Pesan masuk dari contact form
            </h2>
            {messagesList.length === 0 ? (
              <p className="text-xs text-[#8b8c83]">
                Belum ada pesan yang masuk.
              </p>
            ) : (
              <div className="space-y-3">
                {messagesList.map((msg) => (
                  <div
                    key={msg.id}
                    className="bg-[#14161c] p-4 rounded-lg border border-[#2b2f3a] space-y-2"
                  >
                    <div className="flex justify-between items-center border-b border-[#2b2f3a] pb-2">
                      <span className="text-xs font-semibold text-[#c9a15c]">
                        {msg.email}
                      </span>
                      <button
                        onClick={() => handleDeleteMessage(msg.id)}
                        className="text-xs text-[#c17a63] hover:underline"
                      >
                        Hapus pesan
                      </button>
                    </div>
                    <p className="text-xs text-[#a3a7b3] whitespace-pre-wrap">
                      {msg.message}
                    </p>
                    <p className="text-[10px] text-[#6b6f7c]">
                      {msg.createdAt
                        ? new Date(msg.createdAt).toLocaleString()
                        : "-"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
