import ClassStudyPage from "../../../components/study/ClassStudyPage";
import { CLASS_1_5_GROUP, CLASS_1_5_CLASSES } from "../../../data/study/class1to5";

function Class1() {
  return <ClassStudyPage group={CLASS_1_5_GROUP} cls={CLASS_1_5_CLASSES[0]} />;
}

export default Class1;
