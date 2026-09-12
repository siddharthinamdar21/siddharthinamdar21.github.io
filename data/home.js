/* ==========================================================================
   HOME PAGE TAB CONTENT - the text each tab shows above the project grid.

   One block per tab. Keep the keys "games", "casino" and "apps" as they are;
   everything inside them is yours to rewrite freely.

     title       heading above the project grid
     intro       the line underneath that heading
     highlights  the row of cards near the top of the page

   Add or remove highlight cards as you like - the row reflows to fit.
   Three or four per tab reads best. `icon` is just an emoji.

   Nothing else needs touching when you edit this file.
   ========================================================================== */

const HOME = {

  /* ---------------- Mobile Games tab ---------------- */
  games: {
    title: "Mobile Games",
    intro: "Company titles, a live Play Store release, academic work and prototypes - click any card for details.",
    highlights: [
      {
        icon: "🚀",
        title: "Shipped, not just built",
        text: "A live Google Play title with 10K+ downloads that I extend and maintain, alongside company titles built and released in production.",
      },
      {
        icon: "🎮",
        title: "Production live-ops",
        text: "Hands-on with live games: Firebase Auth & Cloud Save, Unity Gaming Services, Google Play Games Services and AWS-backed REST APIs.",
      },
      {
        icon: "⚙️",
        title: "Clean, modular architecture",
        text: "Maintainable C# systems designed to scale, with builds tuned for performance on low-end mobile devices.",
      },
      {
        icon: "🧩",
        title: "Full lifecycle ownership",
        text: "Comfortable owning everything independently: prototyping, core gameplay, UI/UX, optimization, release and post-launch iteration.",
      },
    ],
  },

  /* ---------------- Casino Games tab ---------------- */
  casino: {
    title: "Casino Games",
    intro: "Table games, slots, instant-win and lottery titles built in production - click any card for details.",
    highlights: [
      {
        icon: "🎰",
        title: "Casino formats in production",
        text: "Table games, slots, instant-win and lottery formats built end to end across client casino apps. These cards are previews of the builds that show best, not the full catalogue.",
      },
      {
        icon: "🎲",
        title: "Odds and payout systems",
        text: "Weighted outcomes, paytables and multiplier logic built to spec and balanced for live play.",
      },
      {
        icon: "🔁",
        title: "Variants at speed",
        text: "Six Plinko builds, five Slots and three Blackjack variants - shared systems reshaped into distinct products.",
      },
      {
        icon: "⚙️",
        title: "Reusable foundations",
        text: "The same modular C# groundwork across titles, so each new variant starts from systems that already work.",
      },
    ],
  },

  /* ---------------- Mobile Apps tab ---------------- */
  apps: {
    title: "Mobile Apps",
    intro: "Non-game mobile work - wellness, training and client apps built in Unity and Flutter.",
    highlights: [
      {
        icon: "📱",
        title: "Live on the App Store",
        text: "Two Flutter apps built for clients and released - both live now.",
      },
      {
        icon: "☁️",
        title: "Backend-driven content",
        text: "Images and video delivered over AWS-backed REST APIs, so content changes without shipping a new build.",
      },
      {
        icon: "🎧",
        title: "Media-heavy interfaces",
        text: "Audio players, video playback, streaks, quizzes and progress tracking.",
      },
      {
        icon: "🔀",
        title: "Unity and Flutter",
        text: "Shipping in both - Unity for the wellness and training apps, Flutter for cross-platform client work.",
      },
    ],
  },

};
