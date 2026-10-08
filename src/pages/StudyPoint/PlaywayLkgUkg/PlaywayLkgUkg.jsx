import ClassPicker from "../../../components/study/ClassPicker";
import { PLAYWAY_GROUP, PLAYWAY_CLASSES } from "../../../data/study/playwayLkgUkg";

function PlaywayLkgUkg() {
  return <ClassPicker group={PLAYWAY_GROUP} classes={PLAYWAY_CLASSES} intro="Pick a class to start learning: letters, numbers, shapes, rhymes and drawing." />;
}

export default PlaywayLkgUkg;
