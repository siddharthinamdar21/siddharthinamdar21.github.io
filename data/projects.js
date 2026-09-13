/* ==========================================================================
   YOUR PROJECTS LIVE HERE - this is the only file to edit when adding one.

   HOW TO ADD A PROJECT (2 minutes):
   1. Copy the template below and paste it into the PROJECTS list (order on
      the site = order in this list).
   2. Fill in what you have. EVERYTHING except id, title, category and
      description is OPTIONAL - missing fields simply don't appear.
      Add  featured: true  to show a project in the big "Spotlight" section
      on the home page (best work first - keep it to 3-5 projects).
      Add  showcase: true  to put it in the rotating hero banner at the top
      of the home page (your absolute best, with a video or image):
        - no youtubeId  -> modal shows the image instead of a video
        - no thumbnail  -> a colored placeholder with initials is generated
        - no links      -> no buttons are shown
   3. To show a video: upload it to YouTube (unlisted is fine), copy the ID
      from the URL (youtube.com/watch?v=THIS_PART) into youtubeId.
   4. To show a thumbnail: drop an image into assets/images/ and set the
      thumbnail path. 16:9 images (e.g. 1280x720) look best.

   TEMPLATE:
   {
     id: "my-new-game",                      // unique, lowercase, no spaces
     title: "My New Game",
     category: "professional",               // key from CATEGORIES below
     genre: "Casual Puzzle",
     description: "One or two short paragraphs about the game.",
     role: "What YOU did on it.",
     tech: ["Unity", "C#", "Firebase"],
     thumbnail: "assets/images/my-new-game.png",
     youtubeId: "dQw4w9WgXcQ",
     links: {
       appstore: "https://apps.apple.com/...",
       playstore: "https://play.google.com/...",
       docs: "https://drive.google.com/...",
       github: "https://github.com/...",
       website: "https://..."
     }
   },
   ========================================================================== */

const CATEGORIES = {
  professional: "Company Work",
  published:    "Published Games",
  prototype:    "Prototypes & Workshops",
  academic:     "Academic",
  casino:       "Casino Games",
  apps:         "Mobile Apps",
  boardgame:    "Board Game Design",
};

const PROJECTS = [

  /* ---------- Published games ---------- */

  {
    id: "gems-of-luna",
    title: "Gems of Luna",
    category: "published",
    featured: true,
    showcase: true,
    genre: "Match-3 Puzzle · Live on Google Play",
    description: "A relaxing match-3 puzzle - swap gems through hundreds of handcrafted levels to piano music, fully playable offline. Published by EpicJoy Games and live on Google Play.\n\nThe game was already released when the client handed over the codebase, so the work here is extending and maintaining a live product rather than building one: roughly 300 levels, Google Play Games sign-in with conflict-resolved cloud saves, and offline quest and daily-reward systems built to the client’s explicit no-cloud requirement.\n\nThe difficulty system layers three tiers over the existing levels and unlocks them as the player advances - clear 100 levels and tier two opens across levels 1-100; clear 200 and that band moves to tier three while 100-200 opens at tier two, and so on, each band re-colouring as it unlocks. Finished stretches of the game become new content again instead of sitting idle.",
    role: [
      "Took over an already-live title from the client.",
      "Added roughly 300 levels.",
      "Google Play Games sign-in with conflict-resolved cloud save loading.",
      "Offline quest system, built with no cloud dependency to the client’s requirement.",
      "Offline daily-reward system under the same constraint.",
      "Tiered difficulty system that re-unlocks earlier level bands as the player progresses.",
      "GPGS project setup, bug fixing and QA.",
    ],
    tech: ["Unity", "C#", "Google Play Games Services", "Unity Authentication", "Unity Cloud Save"],
    youtubeId: "6miTWs4TYxM",
    links: { playstore: "https://play.google.com/store/apps/details?id=com.gems.ofluna" },
  },

  /* ---------- Company work ---------- */
  {
    id: "candy-factory",
    title: "Candy Factory",
    category: "professional",
    featured: true,
    genre: "Match-2 Puzzle",
    description: "A 2D match-2 puzzle built around a conveyor belt. Candies run along the belt beneath a full grid, and you tap the grid candies that match whatever the belt brings past. Power-ups help clear the tougher boards.",
    role: [
      "Sole developer on the project.",
      "Grid and conveyor belt logic with match resolution.",
      "Power-up systems.",
      "Release build.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "jGW-ktzxTNw",
  },

  {
    id: "cage-escape",
    title: "Cage Escape",
    category: "professional",
    featured: true,
    genre: "2D Platformer",
    description: "A 2D platformer where you don’t control the animal - you control the cage it is trapped in. Move left and right, jump, and platform your way up to the key to free it. A range of animals can be unlocked.",
    role: [
      "Sole developer on the project.",
      "Cage movement and platforming physics.",
      "Level flow and the animal unlock system.",
      "Release build.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "qUc-WGUUjDM",
  },

  {
    id: "connect-merge",
    title: "Connect Merge",
    category: "professional",
    genre: "Connect Puzzle",
    description: "A 2D connect-and-merge puzzle. Drag through as many matching candies as you like in any direction, but a wrong connection costs a move. Completed connections produce the special candies that every level goal is built around.",
    role: [
      "Sole developer on the project.",
      "Omnidirectional connection detection and validation.",
      "Special-candy generation feeding the level goals.",
      "Goal and level progression logic.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "yz1MJSoD8GI",
  },

  {
    id: "drag-racing",
    title: "Drag Racing",
    category: "professional",
    genre: "Arcade Racing",
    description: "A 2D drag racer built entirely on shift timing. Nitro pickups spawn along the road and supply the acceleration needed to reach the next gear change - though once you hit top speed they stop helping.",
    role: [
      "Sole developer on the project.",
      "Gear-shift timing and acceleration curves.",
      "Nitro spawning and pickup behaviour.",
      "Race flow and progression.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "xP5tKV_RrYI",
  },

  {
    id: "fishing-odyssey",
    title: "Fishing Odyssey",
    category: "professional",
    featured: true,
    genre: "Casual Fishing",
    description: "A 2D fishing game played in two beats: time the cast to reach maximum depth, then drag the returning hook across fish to catch them. Rarer fish pay more coins, and upgrades raise both how deep the hook travels and how many fish it can carry back.",
    role: [
      "Sole developer on the project.",
      "Cast timing and hook control on the return path.",
      "Rarity-based catch rewards.",
      "Upgrade system for hook depth and carry capacity.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "Y8r3iSBtDYk",
  },

  {
    id: "football-plinko",
    title: "Football Plinko",
    category: "professional",
    showcase: true,
    genre: "Sports · Plinko",
    description: "A 2D football game played like plinko. The ball drops from the far goal to your keeper; tap and drag to throw it between teammates down the pitch toward your striker. The enemy keeper patrols the goal line while your striker circles the box carrying a coin multiplier, and a well-timed tap decides the shot. Lose the ball to an opponent and it is thrown off in a random direction unless your striker intercepts it.",
    role: [
      "Sole developer on the project.",
      "Tap-and-drag ball passing and throw mechanics.",
      "Enemy keeper patrol and striker rotation behaviour.",
      "Coin multiplier scoring and shot timing.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "BplrDJl-PTM",
  },

  {
    id: "froggo",
    title: "Froggo",
    category: "professional",
    showcase: true,
    genre: "Voice-Controlled Arcade",
    description: "A 2D game controlled by your voice. The frog hops from lily pad to lily pad for as long as you keep making sound - go quiet mid-jump and it drops into the water. Sinking and breaking pads, crocodiles surfacing on a timer, a fish patrolling the gaps and alternating spikes all stand between the frog and dry land. Ships with handcrafted levels alongside an endless mode.",
    role: [
      "Sole developer on the project.",
      "Microphone input driving the frog’s jump.",
      "Obstacle systems - sinking and breaking pads, timed crocodiles, a patrolling fish and alternating spikes.",
      "Handcrafted level flow alongside an endless mode.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "PqszXz8h8vA",
  },

  {
    id: "light-drop",
    title: "Light Drop",
    category: "professional",
    genre: "Physics Puzzle",
    description: "A physics puzzle where you rotate the board rather than the ball. The ball hangs from a wire and always falls straight down - gravity ignores the board’s angle - so turning the arena swings it, while the controls on the right pay the wire out or reel it back in. Connect the ball to the plug to light the bulb, dodging saw blades on the way, inside a capped length of wire and a level timer. Every level is handcrafted.",
    role: [
      "Sole developer on the project.",
      "Board rotation and suspended-wire physics.",
      "Wire-length limit and level timer systems.",
      "Obstacle design across handcrafted levels.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "ct4b5OWtD_w",
  },

  {
    id: "ball-escape",
    title: "Ball Escape",
    category: "professional",
    genre: "One-Tap Timing",
    description: "A timing game played on a rotating ring. The ball circles the track and so does the obstacle, and a single tap flips the ball’s direction - the whole game is reading the closing gap and reversing at the right moment. Speed and shield power-ups carry runs further.",
    role: [
      "Sole developer on the project.",
      "Rotation and collision timing.",
      "Obstacle patterns.",
      "Speed and shield power-ups.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "B3JqQpC2ims",
  },

  {
    id: "bubble-shooter",
    title: "Bubble Shooter",
    category: "professional",
    genre: "Bubble Shooter",
    description: "A 2D bubble shooter with power-ups.",
    role: [
      "Sole developer on the project.",
      "Core bubble shooter gameplay.",
      "Power-up systems.",
      "Release build.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "PgZ_QX3LTTk",
  },

  {
    id: "neon-space",
    title: "Neon Space Fighter",
    category: "professional",
    genre: "Top-Down Shooter",
    description: "A top-down 2D plane shooter. Enemies spawn in waves while your fighter returns fire, and downed enemies drop score modules to fly through and collect. Score converts into the currency for unlocking new planes.",
    role: [
      "Sole developer on the project.",
      "Enemy spawning and shooting mechanics.",
      "Score module drops and pickup collection.",
      "Plane unlock economy.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "sgywb-XosGM",
  },

  {
    id: "nest-quest",
    title: "Nest Quest",
    category: "professional",
    featured: true,
    genre: "2D Platformer",
    description: "A 2D platformer across handcrafted levels in which an animal works its way to a nest. The twist is wraparound: leave the screen on the left and you re-enter from the right, and the same applies vertically.",
    role: [
      "Sole developer on the project.",
      "Screen-wrap movement across both axes.",
      "Platforming physics and controls.",
      "Handcrafted level design.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "0vIexHXSHls",
  },

  {
    id: "pillars-of-four",
    title: "Pillars Of Four",
    category: "professional",
    genre: "Turn-Based Strategy · Dots & Boxes",
    description: "Dots and Boxes with a dice twist. Players join adjacent dots with lines, and closing the fourth side of a square claims it; whoever holds the most squares once the board runs out wins.\n\nThe roll is what changes it - each turn the dice decides how many lines you get to draw, and certain highlighted connections only open on a six, so position and luck trade off against each other.\n\nShips with a PvE opponent and pass-and-play PvP for two to four players on a single device.",
    role: [
      "Sole developer on the project.",
      "Line drawing and square-claim logic across the dot grid.",
      "Dice-driven turn system, including the six-only connections.",
      "PvE opponent and 2-4 player pass-and-play PvP.",
      "Scoring and end-of-game resolution.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "2m47ykLcFP8",
  },

  {
    id: "plinko-heroes",
    title: "Plinko Heroes",
    category: "professional",
    showcase: true,
    genre: "Endless Defence · Merge",
    description: "An endless wave defender played on a plinko board. Enemies fall through a pin grid, and anything still alive at the bottom is piped back to the top - pressure accumulates across waves instead of resetting.\n\nCurrency earned from kills buys heroes dropped onto the pins: fire mage, ice mage, tank or knight, drawn at random, each with its own health and strengths. Matching heroes merge into higher tiers with upgraded stats, up to four levels deep.\n\nEnemies chip away at whatever hero they reach until it dies. A support hero at the base is permanent, but if the grid itself is empty at the end of a wave, the run is over - so the whole game is spending kills fast enough to keep the board populated.",
    role: [
      "Sole developer on the project.",
      "Pin-grid enemy pathing and the wrap-around wave pipe.",
      "Hero deployment, random draw and the four-tier merge system.",
      "Kill-driven currency economy.",
      "Wave escalation and end-of-run conditions.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "4IWyXi8dx2I",
  },

  {
    id: "triple-tile",
    title: "Triple Tile",
    category: "professional",
    genre: "Tile Match Puzzle",
    description: "A tile-matching puzzle - clear the board by collecting three identical tiles at a time.",
    role: [
      "Sole developer on the project.",
      "Tile matching and board clearing logic.",
      "Level progression.",
      "Release build.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "5PmlzqoR6E0",
  },

  {
    id: "sweet-merge",
    title: "Sweet Merge",
    category: "professional",
    genre: "Merge Puzzle",
    description: "A merge puzzle built around combining matching items into higher tiers to work through the board.",
    role: [
      "Sole developer on the project.",
      "Merge system and tier progression.",
      "UI feedback and animation.",
      "Release build.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "fOdI5jGWktc",
  },

  {
    id: "sliding-puzzle",
    title: "Sliding Puzzle",
    category: "professional",
    genre: "Sliding Tile Puzzle",
    description: "A classic sliding tile puzzle - shuffle pieces through the single empty slot to restore the picture.",
    role: [
      "Sole developer on the project.",
      "Slide mechanics and solvability handling.",
      "Level progression.",
      "Release build.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "xCrC5wkd8XY",
  },

  /* ---------- Mobile apps ---------- */

  {
    id: "app-fretboard",
    title: "Fretboard",
    category: "apps",
    featured: true,
    showcase: true,
    genre: "Music Practice · Reference",
    description: "A guitar fretboard trainer. Knowing your scales and chord shapes still leaves a gap: naming the note under your finger on the fifth string, seventh fret, without stopping to work it out. The app drills that recall until it is instant. Published on the App Store as HelloMilli Mobile.",
    role: [
      "Sole developer on the project.",
      "Fretboard note-recognition drills and practice flow.",
      "Cross-platform build in Flutter.",
      "App Store release.",
    ],
    tech: ["Flutter", "Dart", "iOS"],
    youtubeId: "4arcfy7CDrE",
    links: { appstore: "https://apps.apple.com/us/app/hellomilli-mobile/id6784356110" },
  },

  {
    id: "app-spindrift",
    title: "Spindrift",
    category: "apps",
    featured: true,
    showcase: true,
    genre: "Craft Tools · Reference",
    description: "A knitting companion built around gauge - the gap between the stitches a pattern assumes and the stitches your hands actually produce, which is what turns forty hours of work into a sweater that does not fit. Published on the App Store as N.V Official App.",
    role: [
      "Sole developer on the project.",
      "Gauge calculation and pattern conversion.",
      "Cross-platform build in Flutter.",
      "App Store release.",
    ],
    tech: ["Flutter", "Dart", "iOS"],
    youtubeId: "_Vk4Kj-aot4",
    links: { appstore: "https://apps.apple.com/us/app/n-v-official-app/id6786820641" },
  },

  {
    id: "app-trackplan",
    title: "Trackplan",
    category: "apps",
    genre: "Model Railway · Utility",
    description: "An offline iPhone companion for DCC model railway enthusiasts. It keeps a locomotive fleet and its DCC addresses in one place, and checks whether a given train can actually handle the curve radii of a planned layout before it is built.\n\nDecoder settings and programming history live alongside each locomotive, so the configuration that took an afternoon to get right is still there months later. Everything works without a connection - the layout room is rarely where the signal is.",
    role: [
      "Sole developer on the project.",
      "Locomotive fleet and DCC address management.",
      "Curve radius validation against planned layouts.",
      "Decoder settings and programming history per locomotive.",
      "Fully offline local storage.",
      "Cross-platform build in Flutter.",
    ],
    tech: ["Flutter", "Dart", "iOS"],
    youtubeId: "ZIo9gI988eo",
  },

  {
    id: "app-wellness",
    title: "Wellness & Meditation",
    category: "apps",
    featured: true,
    showcase: true,
    genre: "Wellness · Meditation",
    description: "A wellness and meditation app built around a guided sound player and a meditation library, plus custom breathing sessions the user configures themselves.",
    role: [
      "Sole developer on the project.",
      "Sound player and meditation library.",
      "Custom breathing session builder.",
      "Image and video delivery over AWS-backed REST APIs.",
    ],
    tech: ["Unity", "C#", "AWS", "REST APIs"],
    youtubeId: "tXftHrM0Y_s",
  },

  {
    id: "app-volleyball-trainer",
    title: "Volleyball Trainer",
    category: "apps",
    featured: true,
    showcase: true,
    genre: "Sports Training",
    description: "A training companion for volleyball - drill sessions delivered through an in-app video player, with quizzes, daily streaks and progress tracked across them.",
    role: [
      "Sole developer on the project.",
      "Training sessions with an in-app video player.",
      "Quizzes, streak tracking and progress history.",
      "Image and video delivery over AWS-backed REST APIs.",
    ],
    tech: ["Unity", "C#", "AWS", "REST APIs"],
    youtubeId: "oi7WQWG_pw8",
  },

  {
    id: "app-famous-sports-meditation",
    title: "Famous Sports Meditation",
    category: "apps",
    featured: true,
    genre: "Wellness · Meditation",
    description: "Meditation sessions tailored to individual sports - basketball, football, cricket and tennis each getting their own guided content.",
    role: [
      "Sole developer on the project.",
      "Per-sport content structure and navigation.",
      "Guided audio playback.",
      "Image and video delivery over AWS-backed REST APIs.",
    ],
    tech: ["Unity", "C#", "AWS", "REST APIs"],
    youtubeId: "RNI4aB5dwIo",
  },

  {
    id: "app-sports-meditation",
    title: "Sports Meditation",
    category: "apps",
    genre: "Wellness · Meditation",
    description: "A meditation app aimed at athletes generally, built around a guided sound player.",
    role: [
      "Sole developer on the project.",
      "Guided audio playback and session flow.",
      "Image and video delivery over AWS-backed REST APIs.",
    ],
    tech: ["Unity", "C#", "AWS", "REST APIs"],
    youtubeId: "L9f_seiJ1IU",
  },

  {
    id: "app-meditation",
    title: "Meditation",
    category: "apps",
    genre: "Wellness · Meditation",
    description: "A general-purpose meditation app centred on a guided sound player.",
    role: [
      "Sole developer on the project.",
      "Guided audio playback and session flow.",
      "Image and video delivery over AWS-backed REST APIs.",
    ],
    tech: ["Unity", "C#", "AWS", "REST APIs"],
    youtubeId: "XjGOkcz5Ww8",
  },

  /* ---------- Prototypes & workshops ---------- */
  {
    id: "tiny-rooms-pr",
    title: "Tiny Rooms PR",
    category: "prototype",
    genre: "3D Puzzle · Recreation",
    description: "An unofficial recreation of the 'Tiny Room' puzzle game mechanics, built in Unity as part of a college workshop. All credit for the original game and concept goes to Kiary Games.",
    role: "Recreated the room-rotation and interaction mechanics as a learning exercise.",
    tech: ["Unity", "C#"],
    youtubeId: "OCQs5bAax-8",
    links: { playstore: "https://play.google.com/store/apps/details?id=com.kiarygames.tinyroom" },
  },

  /* ---------- Academic ---------- */
  {
    id: "big-dreams",
    title: "Big Dreams",
    category: "academic",
    genre: "FPS · 3D Action",
    description: "A Doom-inspired FPS where a toy soldier battles a corrupted Teddy Bear controlling the other toys in a toy store. Group project built by a team of four programmers, intended for showcase at IGDC / Comic Con.",
    role: "Implemented player movement and shooting mechanics, focusing on responsive FPS controls.",
    tech: ["Unity", "C#"],
    youtubeId: "NEw10298YU8",
  },
  {
    id: "word-ezy",
    title: "Word EZ",
    category: "academic",
    genre: "Multiplayer Word Game",
    description: "A 2D multiplayer word game for Android and iOS. Each round hands both teams a clue - Kitchen, City, School - and players race to submit as many related words as they can inside a two-minute timer. Correct answers score, repeats are rejected, and four rounds decide the match.\n\nAnswering quickly matters more than answering often. Every correct word opens a combo window, and the multiplier keeps climbing as long as the next word lands in time; stall, and the accumulated combo banks into the score and resets. Vocabulary gets you on the board, pace is what wins.\n\nTwo modes change the shape of that. Normal alternates Red and Blue on the same clue, so the second team has to find whatever the first missed. Fast-Paced has both teams answering at once. Rooms hold up to four players over Photon Unity Networking.",
    role: [
      "Sole developer - built as a BCA final-year project.",
      "Photon Unity Networking: rooms, synchronised player state and RPC traffic.",
      "Clue and word-list validation, rejecting repeats and non-matching answers.",
      "Combo timing, multiplier scoring and team totals.",
      "Normal and Fast-Paced round flow, lobby and the full UI.",
    ],
    tech: ["Unity", "C#", "Photon PUN", "Android", "iOS"],
    youtubeId: "F52IhWcr_2s",
  },
  {
    id: "ez-escape",
    title: "EZ-Escape",
    category: "academic",
    genre: "Action-RPG · Survival",
    description: "A sci-fi survival action-RPG: stranded on an alien planet, you must gather what you need and escape before your pursuers arrive. Work in progress.",
    role: "Solo developer - exploration systems, survival mechanics and enemy pursuit logic.",
    tech: ["Unity", "C#"],
    youtubeId: "47f3ppg84-0",
  },
  {
    id: "fruit-catch",
    title: "Fruit Catch",
    category: "academic",
    genre: "Hyper-Casual",
    description: "A hyper-casual reflex game - catch falling fruits with slider controls and share your high score with friends. In development.",
    role: "Solo developer - slider input, spawn balancing and score-sharing functionality.",
    tech: ["Unity", "C#"],
    youtubeId: "BpevSGG4g1g",
  },
  {
    id: "angry-birds-proto",
    title: "Angry Birds Recreation",
    category: "academic",
    genre: "2D Physics Puzzle",
    description: "A recreation of the classic slingshot physics gameplay - trajectory aiming, destructible structures and satisfying chain reactions, built as a learning prototype.",
    role: "Solo developer - slingshot physics, projectile trajectory and destruction logic.",
    tech: ["Unity", "C#"],
    youtubeId: "O98EYRDUlEI",
  },
  {
    id: "fps-shooting-proto",
    title: "FPS Shooting Prototype",
    category: "academic",
    genre: "First-Person Shooter",
    description: "A first-person shooting prototype - raycast weapons, target destruction and responsive camera controls, built to explore core FPS feel.",
    role: "Solo developer - weapon systems, raycast hit detection and camera handling.",
    tech: ["Unity", "C#"],
    youtubeId: "rg0W3fyrmXg",
  },
  {
    id: "wall-breaker",
    title: "Wall Breaker",
    category: "academic",
    genre: "Arcade · Brick Breaker",
    description: "A brick-breaker arcade prototype - paddle control, ball physics, brick layouts and power-up hooks.",
    role: "Solo developer - ball physics, collision handling and level layouts.",
    tech: ["Unity", "C#"],
    youtubeId: "wrKIEZGlRMc",
  },
  {
    id: "platformer-proto",
    title: "Platformer Game",
    category: "academic",
    genre: "2D Platformer",
    description: "A 2D platformer prototype with a full character controller - running, jumping, hazards and a menu flow with instructions.",
    role: "Solo developer - character controller, level design and game flow.",
    tech: ["Construct 2"],
    youtubeId: "d7FQ6q8zqoA",
  },
  {
    id: "snake-game",
    title: "Snake Game",
    category: "academic",
    genre: "Arcade Classic",
    description: "The classic snake, rebuilt in Unity - grid-based movement, growth mechanics and scoring.",
    role: "Solo developer - grid movement system and game loop.",
    tech: ["Unity", "C#"],
    youtubeId: "309AFuXXCCo",
  },
  {
    id: "candy-crush-proto",
    title: "Candy Crush Recreation",
    category: "academic",
    genre: "Match-3 Puzzle",
    description: "A match-3 prototype recreating Candy Crush-style gameplay - grid matching, swaps and cascade resolution.",
    role: "Solo developer - match detection, swap logic and cascading refills.",
    tech: ["Unity", "C#"],
    youtubeId: "EfKOfvyojNU",
  },


  {
    id: "space-shooter",
    title: "Space Shooter",
    category: "academic",
    genre: "2D Arcade Shooter",
    description: "A 2D plane shooter - fly, dodge incoming fire and clear waves of enemies. Built in Construct 2 using its visual event system rather than written code.",
    role: "Solo developer - enemy waves, shooting and collision logic built with Construct 2 event sheets.",
    tech: ["Construct 2"],
    youtubeId: "Q2YIJ_SYroQ",
  },

  {
    id: "car-movement",
    title: "Car Movement",
    category: "academic",
    genre: "Vehicle Physics",
    description: "A driving prototype built by working through Unity’s own vehicle setup documentation - wheel colliders, suspension and steering behaviour.",
    role: "Solo developer - configured the wheel colliders and drive/steering setup from Unity’s vehicle manual.",
    tech: ["Unity", "C#"],
    youtubeId: "Ob4C2kxogIo",
  },

  {
    id: "ar-qr-detector",
    title: "AR QR Detector",
    category: "academic",
    genre: "Augmented Reality",
    description: "A marker-based AR experiment - the camera detects a QR marker and anchors an interactive 3D overlay to it, keeping the overlay tracked as the marker moves.",
    role: "Built the marker detection and AR overlay interaction in Unity.",
    tech: ["Unity", "AR Core", "Vuforia"],
    youtubeId: "6UU3Qr2jNsI",
  },

  {
    id: "ar-face-filter",
    title: "AR Face Filter",
    category: "academic",
    genre: "Augmented Reality",
    description: "A face-tracking AR filter that maps effects onto the user’s face through the front camera and keeps them anchored in real time.",
    role: "Built the face tracking and filter overlay in Unity.",
    tech: ["Unity", "AR Core", "Vuforia"],
    youtubeId: "MBJkSrnmTnk",
  },
  {
    id: "cartoon-environment-ai",
    title: "Cartoonish Environment with AI",
    category: "academic",
    genre: "3D Environment · AI",
    description: "A stylized cartoon environment populated with AI-driven characters, built as an academic project and demonstrated on video.",
    role: "Environment assembly, lighting and AI behavior setup.",
    tech: ["Unity", "C#"],
    youtubeId: "aLyYumdB7r0",
  },
  /* ---------- Casino games ---------- */

  {
    id: "casino-plinko",
    title: "Plinko",
    category: "casino",
    featured: true,
    showcase: true,
    genre: "Casino · Drop Game",
    description: "Plinko built across six variants - a ball dropped through a peg field into weighted prize slots, with multipliers and risk settings deciding the payout.",
    role: [
      "Sole developer on all six variants.",
      "Peg field and drop physics.",
      "Weighted slot payouts, multipliers and risk settings.",
      "Release builds.",
    ],
    tech: ["Unity", "C#"],
    videos: [
      { id: "cK5ldKDHyF4", label: "Variant 1" },
      { id: "S3kUkTH4pXg", label: "Variant 2" },
      { id: "p6HClRFq2Vw", label: "Variant 3" },
      { id: "cjUrhETQPAw", label: "Variant 4" },
      { id: "vCfPaAYu4pc", label: "Variant 5" },
      { id: "n-1z7OD65gw", label: "Variant 6" },
    ],
  },

  {
    id: "casino-slots",
    title: "Slots",
    category: "casino",
    showcase: true,
    genre: "Casino · Slot Machine",
    description: "Slot machines built across five variants - reel spin logic, paylines, symbol weighting and win resolution.",
    role: [
      "Sole developer on all five variants.",
      "Reel spin and stop logic.",
      "Payline evaluation and symbol weighting.",
      "Win resolution and payout.",
    ],
    tech: ["Unity", "C#"],
    videos: [
      { id: "giEqrRl8JnY", label: "Variant 3" },
      { id: "Jn41RSzX49M", label: "Variant 2" },
      { id: "BwMqQO-A9YM", label: "Variant 1" },
      { id: "YNGhh43Nkdw", label: "Variant 4" },
      { id: "khF41DTLa8g", label: "Variant 5" },
    ],
  },

  {
    id: "casino-blackjack",
    title: "Blackjack",
    category: "casino",
    genre: "Casino · Card Game",
    description: "Blackjack built across three variants - betting, hit, stand, double and split handling with dealer rules and payout resolution.",
    role: [
      "Sole developer on all three variants.",
      "Hand logic - hit, stand, double, split.",
      "Dealer rules and bust handling.",
      "Betting and payout resolution.",
    ],
    tech: ["Unity", "C#"],
    videos: [
      { id: "t3fUgE1TCqw", label: "Variant 1" },
      { id: "qU8_fmFiSfU", label: "Variant 2" },
      { id: "kwrxJ9D-1So", label: "Variant 3" },
    ],
  },

  {
    id: "casino-lucky-wheel",
    title: "Lucky Wheel",
    category: "casino",
    genre: "Casino · Prize Wheel",
    description: "A prize wheel built across two variants - weighted segment selection, spin physics and reward payout.",
    role: [
      "Sole developer on both variants.",
      "Spin physics and easing to a weighted result.",
      "Segment weighting and reward payout.",
    ],
    tech: ["Unity", "C#"],
    videos: [
      { id: "Un7Ztal-QHg", label: "Variant 1" },
      { id: "Nz7PFVOOKkg", label: "Variant 2" },
    ],
  },

  {
    id: "casino-video-poker",
    title: "Video Poker",
    category: "casino",
    featured: true,
    genre: "Casino · Card Game",
    description: "Video poker built across two variants - deal, hold and draw, with payouts resolved against a hand-ranking table.",
    role: [
      "Sole developer on both variants.",
      "Deal, hold and draw flow.",
      "Hand ranking and paytable resolution.",
    ],
    tech: ["Unity", "C#"],
    videos: [
      { id: "MsMIYtvBXfw", label: "Variant 1" },
      { id: "10j9Fooi9Mk", label: "Variant 2" },
    ],
  },

  {
    id: "casino-baccarat",
    title: "Baccarat",
    category: "casino",
    genre: "Casino · Card Game",
    description: "A Baccarat table for mobile - player and banker betting, card draw rules and payout resolution.",
    role: [
      "Sole developer on the project.",
      "Draw rules and hand resolution.",
      "Betting and payout logic.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "G19Ay9SBAzI",
  },

  {
    id: "casino-bingo",
    title: "Bingo",
    category: "casino",
    genre: "Casino · Number Game",
    description: "A mobile Bingo game - card marking, pattern detection and payout on completed lines.",
    role: [
      "Sole developer on the project.",
      "Number draw and card marking.",
      "Pattern detection and payout.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "Qjl89UVoYoU",
  },

  {
    id: "casino-keno",
    title: "Keno",
    category: "casino",
    featured: true,
    genre: "Casino · Number Game",
    description: "A Keno game - pick your numbers, run the draw and resolve payouts against how many hit.",
    role: [
      "Sole developer on the project.",
      "Number selection and draw.",
      "Hit-count payout resolution.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "4KOBpYOYnrI",
  },

  {
    id: "casino-scratch",
    title: "Scratch Card",
    category: "casino",
    genre: "Casino · Instant Win",
    description: "A scratch card game - reveal panels by scratching and resolve the prize underneath.",
    role: [
      "Sole developer on the project.",
      "Scratch reveal interaction and masking.",
      "Prize generation and payout.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "F7N1IVmkIk0",
  },

  {
    id: "casino-teenpatti",
    title: "Teen Patti",
    category: "casino",
    showcase: true,
    genre: "Casino · Card Game",
    description: "Teen Patti for mobile - hand ranking, betting rounds and showdown resolution.",
    role: [
      "Sole developer on the project.",
      "Hand ranking and comparison.",
      "Betting rounds and showdown.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "Hmv9yLb9aeU",
  },

  {
    id: "casino-roulette",
    title: "Roulette",
    category: "casino",
    genre: "Casino · Table Game",
    description: "A Roulette table - inside and outside bets, wheel spin and payout resolution.",
    role: [
      "Sole developer on the project.",
      "Wheel spin and result landing.",
      "Inside and outside bet payouts.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "1d-GztYg3uw",
  },

  {
    id: "casino-bicho-bash",
    title: "Bicho Bash",
    category: "casino",
    genre: "Casino · Lottery",
    description: "An animal-themed lottery game - choose your animals, run the draw and pay out on matches.",
    role: [
      "Sole developer on the project.",
      "Selection and draw logic.",
      "Match detection and payout.",
    ],
    tech: ["Unity", "C#"],
    youtubeId: "-L43vRsMnxE",
  },

  /* ---------- Board game design ---------- */
  {
    id: "rise-of-heroes",
    title: "Rise of Heroes",
    category: "boardgame",
    genre: "Physical Board Game · Co-op Wave Defense",
    description: "Two ancient Demon Lords have been reincarnated to take revenge against The Four Kingdoms, who once defeated and sealed them away. The kingdoms performed a ritual and summoned four heroes from differing worlds to conquer the demon lords and save their land.\n\nYou are one of those heroes - summoned to a kingdom with a weapon fate has gifted you. Each weapon has its own pros and cons against different monsters. Fight through waves, defeat each wave's boss, and lift the curse from the kingdoms.\n\nDesigned and built academically as a complete physical game: board, hero/boss/minion cards, dice and full rules. The board was composed in Photoshop over Carcassonne's tile artwork and the creature cards use existing fantasy art - the systems, card layouts, balancing and rules are my own.",
    role: "Game designer - core loop, wave and weapon balancing, card layouts and board composition in Photoshop, playtesting and complete design documentation.",
    tech: ["Game Design", "Balancing", "Playtesting"],
    thumbnail: "assets/images/rise-of-heroes/thumb.jpg",
    /* Photos for the board game gallery on the home page (side-arrow carousel).
       Web-ready copies live in assets/images/rise-of-heroes/; the print masters
       they were made from are in that folder's source/ subfolder. */
    gallery: [
      { src: "assets/images/rise-of-heroes/physical-3.jpg", caption: "Printed components" },
      { src: "assets/images/rise-of-heroes/physical-1.jpg", caption: "The printed game" },
      { src: "assets/images/rise-of-heroes/physical-2.jpg", caption: "Perks sheet with quest and monster cards" },
      { src: "assets/images/rise-of-heroes/board.jpg",         caption: "The board" },
      { src: "assets/images/rise-of-heroes/boss-cards.jpg",    caption: "Boss cards" },
      { src: "assets/images/rise-of-heroes/monster-cards.jpg", caption: "Monster cards - buffs and nerfs per weapon" },
      { src: "assets/images/rise-of-heroes/quest-cards.jpg",   caption: "Quest cards" },
      { src: "assets/images/rise-of-heroes/perk-chart.jpg",    caption: "Perk chart" },
      { src: "assets/images/rise-of-heroes/cards-info.jpg",    caption: "Card reference sheet" },
    ],
  },

];
