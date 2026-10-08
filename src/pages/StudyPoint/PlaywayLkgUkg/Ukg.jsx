import ClassStudyPage from "../../../components/study/ClassStudyPage";
import { PLAYWAY_GROUP, PLAYWAY_CLASSES } from "../../../data/study/playwayLkgUkg";

function Ukg() {
  return <ClassStudyPage group={PLAYWAY_GROUP} cls={PLAYWAY_CLASSES[2]} />;
}

export default Ukg;
