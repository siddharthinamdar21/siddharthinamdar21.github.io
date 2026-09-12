/* ==========================================================================
   ABOUT CONTENT — edit anytime. Rendered on the Home page (stats, highlights)
   and the About page (summary, experience, education, skills, strengths).
   ========================================================================== */

const ABOUT = {

  /* Hero stat chips (Home). "value" animates counting up if it starts with a number. */
  stats: [
    { value: "3+",  label: "years professional experience" },
    { value: "12",  label: "company titles built solo" },
    { value: "30+", label: "projects & prototypes" },
  ],

  /* Recruiter-focused highlight cards (Home, under the hero) */
  /* About page — summary paragraphs */
  summary: [
    "I'm a Unity developer with over two years of professional experience building and shipping mobile games and applications for production environments. My work spans casino, hyper-casual and casual games, as well as Unity-based meditation and wellness apps.",
    "I primarily work independently, handling the complete development lifecycle — from implementing core gameplay systems and application logic to integrating live services, backend APIs and optimizing builds for mobile performance. I have hands-on experience with live games, integrating Firebase (Authentication, Cloud Save), Unity Gaming Services, Google Play Games Services and AWS-backed REST APIs.",
    "My focus is on clean, modular architecture, performance-conscious development, and creating systems that stay scalable and maintainable under real production constraints. While I don't specialize in asset creation, I work closely with design inputs to integrate assets seamlessly into polished, functional experiences.",
  ],

  experience: [
    {
      role: "Unity Developer",
      company: "Zapplogics Solutions LLP",
      location: "Remote",
      period: "Aug 2023 — Present",
      points: [
        "Develop and maintain casino, hyper-casual and casual mobile games in production.",
        "Integrate live services: Firebase (Auth, Cloud Save), Unity Gaming Services, Google Play Games Services and AWS-backed REST APIs.",
        "Shipped Unity-based meditation & wellness applications end-to-end.",
        "Own complete lifecycles independently — core gameplay, application logic, optimization and store builds.",
      ],
    },
  ],

  education: [
    {
      degree: "MCA",
      school: "ASM's Institute of Business Management and Research, Pune",
      period: "Pursuing",
    },
    {
      degree: "BCA — Game Development",
      school: "Tilak Maharashtra Vidyapeeth",
      period: "2020 — 2023",
    },
  ],

  skills: {
    "Game Engines": ["Unity (Advanced)", "Unreal Engine (Basic)", "Godot (Basic)"],
      "Mobile & App": ["Flutter", "Dart", "Android", "iOS"],
    "Languages": ["C#", "C++", "Python", "Java", "JavaScript", "HTML/CSS", "SQL"],
    "Tools & Services": [
      "Firebase", "Unity Gaming Services", "Google Play Games Services", "AWS",
      "Plastic SCM", "GitHub", "Visual Studio", "Cursor", "Photoshop", "MS-SQL",
    ],
  },

  strengths: ["Problem Solving", "Time Management", "Adaptability", "Quick Learning"],
};
