import ClassStudyPage from "../../../components/study/ClassStudyPage";
import { PLAYWAY_GROUP, PLAYWAY_CLASSES } from "../../../data/study/playwayLkgUkg";

function Lkg() {
  return <ClassStudyPage group={PLAYWAY_GROUP} cls={PLAYWAY_CLASSES[1]} />;
}

export default Lkg;
