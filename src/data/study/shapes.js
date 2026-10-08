// Shapes & colours. `draw` decides which drawing ShapeArt uses; `sides` is for regular polygons.
export const SHAPES = [
  { id: "circle", en: "Circle", hi: "वृत्त", cat: "2d", color: "#ffb199", example: "Ball, wheel", draw: "circle" },
  { id: "square", en: "Square", hi: "वर्ग", cat: "2d", color: "#ffd59e", example: "Box, tile", draw: "square" },
  { id: "rectangle", en: "Rectangle", hi: "आयत", cat: "2d", color: "#a9e8c0", example: "Door, phone", draw: "rectangle" },
  { id: "triangle", en: "Triangle", hi: "त्रिभुज", cat: "2d", color: "#fff1a8", example: "Pizza slice, roof", draw: "triangle" },
  { id: "oval", en: "Oval", hi: "अंडाकार", cat: "2d", color: "#ffc4e6", example: "Egg", draw: "oval" },
  { id: "diamond", en: "Diamond (Rhombus)", hi: "समचतुर्भुज", cat: "2d", color: "#bfdcff", example: "Kite", draw: "diamond" },
  { id: "pentagon", en: "Pentagon", hi: "पंचभुज", cat: "2d", color: "#c4d9ff", example: "Home plate", draw: "polygon", sides: 5 },
  { id: "hexagon", en: "Hexagon", hi: "षट्भुज", cat: "2d", color: "#ffc9bd", example: "Honeycomb", draw: "polygon", sides: 6 },
  { id: "heptagon", en: "Heptagon", hi: "सप्तभुज", cat: "2d", color: "#e3ccff", example: "50 pence coin", draw: "polygon", sides: 7 },
  { id: "octagon", en: "Octagon", hi: "अष्टभुज", cat: "2d", color: "#b9f0d6", example: "Stop sign", draw: "polygon", sides: 8 },
  { id: "nonagon", en: "Nonagon", hi: "नवभुज", cat: "2d", color: "#ffd6b8", example: "9-sided shape", draw: "polygon", sides: 9 },
  { id: "decagon", en: "Decagon", hi: "दशभुज", cat: "2d", color: "#ffd0d0", example: "10-sided shape", draw: "polygon", sides: 10 },

  { id: "star", en: "Star", hi: "तारा", cat: "special", color: "#ffe066", example: "Star in the sky", draw: "star" },
  { id: "heart", en: "Heart", hi: "दिल", cat: "special", color: "#ff9fb8", example: "Love sign", draw: "heart" },
  { id: "crescent", en: "Crescent", hi: "अर्धचंद्र", cat: "special", color: "#bcc9ff", example: "Moon", draw: "crescent" },
  { id: "parallelogram", en: "Parallelogram", hi: "समांतर चतुर्भुज", cat: "special", color: "#a8f0ad", example: "Slanted board", draw: "parallelogram" },
  { id: "trapezoid", en: "Trapezoid", hi: "समलंब चतुर्भुज", cat: "special", color: "#ffb8b8", example: "Bucket, bridge sign", draw: "trapezoid" },

  { id: "cube", en: "Cube", hi: "घन", cat: "3d", color: "#a9d8f7", example: "Dice, box", draw: "cube" },
  { id: "cuboid", en: "Cuboid", hi: "घनाभ", cat: "3d", color: "#ffcf9e", example: "Lunch box, brick", draw: "cuboid" },
  { id: "sphere", en: "Sphere", hi: "गोला", cat: "3d", color: "#ffb199", example: "Ball, globe", draw: "sphere" },
  { id: "cone", en: "Cone", hi: "शंकु", cat: "3d", color: "#ffe29a", example: "Ice-cream cone", draw: "cone" },
  { id: "cylinder", en: "Cylinder", hi: "बेलन", cat: "3d", color: "#bfe3ff", example: "Battery, can", draw: "cylinder" },
  { id: "pyramid", en: "Pyramid", hi: "पिरामिड", cat: "3d", color: "#e5c6ff", example: "Pyramid of Egypt", draw: "pyramid" },
];

export const COLORS = [
  { en: "Red", hi: "लाल", hex: "#e53935", example: "Apple 🍎" },
  { en: "Blue", hi: "नीला", hex: "#1e88e5", example: "Sky 🌤️" },
  { en: "Yellow", hi: "पीला", hex: "#fdd835", example: "Banana 🍌" },
  { en: "Green", hi: "हरा", hex: "#43a047", example: "Leaf 🍃" },
  { en: "Orange", hi: "नारंगी", hex: "#fb8c00", example: "Orange 🍊" },
  { en: "Purple", hi: "बैंगनी", hex: "#8e24aa", example: "Grapes 🍇" },
  { en: "Pink", hi: "गुलाबी", hex: "#f06292", example: "Flower 🌸" },
  { en: "Brown", hi: "भूरा", hex: "#6d4c41", example: "Chocolate 🍫" },
  { en: "Black", hi: "काला", hex: "#212121", example: "Crow 🐦‍⬛" },
  { en: "White", hi: "सफेद", hex: "#fafafa", example: "Milk 🥛" },
  { en: "Grey", hi: "स्लेटी", hex: "#9e9e9e", example: "Elephant 🐘" },
];
