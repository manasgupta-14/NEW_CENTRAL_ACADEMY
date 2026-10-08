import ClassStudyPage from "../../../components/study/ClassStudyPage";
import { PLAYWAY_GROUP, PLAYWAY_CLASSES } from "../../../data/study/playwayLkgUkg";

function Playway() {
  return <ClassStudyPage group={PLAYWAY_GROUP} cls={PLAYWAY_CLASSES[0]} />;
}

export default Playway;
