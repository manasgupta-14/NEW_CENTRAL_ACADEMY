// Playway / LKG / UKG section. Each class lists the tools (and their settings) students see.
export const PLAYWAY_GROUP = {
  slug: "playway-lkg-ukg",
  title: "Playway, LKG & UKG",
  basePath: "/study-point/playway-lkg-ukg",
};

export const PLAYWAY_CLASSES = [
  {
    slug: "playway",
    title: "Playway",
    emoji: "🧸",
    note: "Rang, aakar, gintee aur rhymes: khel-khel mein pehla kadam.",
    tools: [
      { id: "english-alphabet" },
      { id: "akshar-gyan", props: { groups: ["swar"] }, title: "स्वर ज्ञान", blurb: "अ से अः तक, चित्र और आवाज़ के साथ।" },
      { id: "counting", props: { max: 20 }, title: "Counting 1 to 20" },
      { id: "colors" },
      { id: "shapes", props: { categories: ["2d"] }, title: "Basic Shapes" },
      { id: "poems" },
      { id: "drawing" },
    ],
  },
  {
    slug: "lkg",
    title: "LKG",
    emoji: "🎨",
    note: "Poori varnamala, 1 se 50 tak ginti aur shapes.",
    tools: [
      { id: "english-alphabet" },
      { id: "akshar-gyan" },
      { id: "counting", props: { max: 50 }, title: "Counting 1 to 50" },
      { id: "shapes", props: { categories: ["2d", "special"] } },
      { id: "colors" },
      { id: "poems" },
      { id: "drawing" },
    ],
  },
  {
    slug: "ukg",
    title: "UKG",
    emoji: "🎒",
    note: "Barah khadi, matra gyan, 1 se 100 tak ginti aur calendar.",
    tools: [
      { id: "english-alphabet" },
      { id: "akshar-gyan" },
      { id: "barah-khadi" },
      { id: "maatra-gyan" },
      { id: "counting", props: { max: 100 }, title: "Counting 1 to 100" },
      { id: "shapes" },
      { id: "time-explorer", title: "Days, Weeks & Months" },
      { id: "poems" },
      { id: "drawing" },
    ],
  },
];
