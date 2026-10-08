import { lazy } from "react";

// id (from data/study/toolCatalog.js) -> lazy-loaded tool component.
// Lazy so a student only downloads the tool they open.
export const TOOL_COMPONENTS = {
  "english-alphabet": lazy(() => import("./tools/EnglishAlphabet")),
  "akshar-gyan": lazy(() => import("./tools/AksharGyan")),
  "barah-khadi": lazy(() => import("./tools/BarahKhadi")),
  "maatra-gyan": lazy(() => import("./tools/MaatraGyan")),
  counting: lazy(() => import("./tools/Counting")),
  tables: lazy(() => import("./tools/Tables")),
  shapes: lazy(() => import("./tools/Shapes")),
  colors: lazy(() => import("./tools/Colors")),
  poems: lazy(() => import("./tools/Poems")),
  drawing: lazy(() => import("./tools/Drawing")),
  "time-explorer": lazy(() => import("./tools/TimeExplorer")),
  translator: lazy(() => import("./tools/Translator")),
  "maths-practice": lazy(() => import("./tools/MathsPractice")),
  "unit-converter": lazy(() => import("./tools/UnitConverter")),
  "squares-cubes": lazy(() => import("./tools/SquaresCubes")),
};
