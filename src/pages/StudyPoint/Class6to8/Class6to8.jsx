import ClassPicker from "../../../components/study/ClassPicker";
import { CLASS_6_8_GROUP, CLASS_6_8_CLASSES } from "../../../data/study/class6to8";

function Class6to8() {
  return <ClassPicker group={CLASS_6_8_GROUP} classes={CLASS_6_8_CLASSES} intro="Pick a class: mental maths, squares and cubes, unit conversion and vocabulary." />;
}

export default Class6to8;
