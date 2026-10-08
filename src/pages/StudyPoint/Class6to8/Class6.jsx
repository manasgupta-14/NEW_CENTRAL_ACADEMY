import ClassStudyPage from "../../../components/study/ClassStudyPage";
import { CLASS_6_8_GROUP, CLASS_6_8_CLASSES } from "../../../data/study/class6to8";

function Class6() {
  return <ClassStudyPage group={CLASS_6_8_GROUP} cls={CLASS_6_8_CLASSES[0]} />;
}

export default Class6;
