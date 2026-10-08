import ClassPicker from "../../../components/study/ClassPicker";
import { CLASS_1_5_GROUP, CLASS_1_5_CLASSES } from "../../../data/study/class1to5";

function Class1to5() {
  return <ClassPicker group={CLASS_1_5_GROUP} classes={CLASS_1_5_CLASSES} intro="Pick a class: matra, tables, maths practice, units and vocabulary." />;
}

export default Class1to5;
