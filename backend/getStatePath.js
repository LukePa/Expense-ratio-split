import path from "path";
import {getDirname} from "./helpers.js";

export default function getStatePath() {
    return process.env.STATE_FILE_PATH ?? path.join(getDirname(), "state.json");
}