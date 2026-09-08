const bcrypt = require("bcryptjs");

exports.seed = async function (knex) {
  // Bersihkan data lama
  await knex("messages").del();
  await knex("projects").del();
  await knex("skills").del();
  await knex("education").del();
  await knex("profiles").del();
  await knex("users").del();

  // Hash Password Admin ('admin123')
  const hashedPassword = await bcrypt.hash("admin123", 10);

  // Insert Admin User Pertama
  await knex("users").insert([{ username: "admin", password: hashedPassword }]);

  // Insert Profile Default
  await knex("profiles").insert([
    {
      fullName: "Raihan Diandra Surya",
      title: "Building Digital Experience.",
      subTitle: "Pengalaman fokus saya berfokus pada web dan desain digital.",
      aboutMe: JSON.stringify([
        "Saya adalah seseorang yang memiliki rasa ketertarikan terhadap teknologi.",
        "Perjalanan saya dalam dunia teknologi terus berkembang melalui proses belajar.",
        "Bagi saya, teknologi adalah tentang memecahkan masalah.",
      ]),
    },
  ]);

  // Insert Education Default
  await knex("education").insert([
    { school: "SMPN 2 TULUNG", desc: "Siswa SMP (2018 - 2021)" },
    {
      school: "SMA Muhammadiyah 1 Klaten",
      desc: "Siswa SMA MIPA (2021 - 2024)",
    },
    {
      school: "UNIVERSITAS SEBELAS MARET",
      desc: "Mahasiswa D3 Teknik Informatika (2024 - Sekarang)",
    },
  ]);

  // Insert Skills Default
  await knex("skills").insert([
    { name: "HTML & CSS", iconName: "SiHtml5" },
    { name: "JavaScript", iconName: "SiJavascript" },
    { name: "TypeScript", iconName: "SiTypescript" },
    { name: "React.js", iconName: "SiReact" },
    { name: "Next.js", iconName: "SiNextdotjs" },
    { name: "Tailwind CSS", iconName: "SiTailwindcss" },
    { name: "Node.js", iconName: "SiNodedotjs" },
    { name: "Express.js", iconName: "SiExpress" },
  ]);

  // Insert Projects Default
  await knex("projects").insert([
    { title: "JUDUL PROJEK 1", desc: "Keterangan singkat mengenai proyek 1." },
    { title: "JUDUL PROJEK 2", desc: "Keterangan singkat mengenai proyek 2." },
  ]);
};
