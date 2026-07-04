import getStatePath from "./getStatePath.js"
import fs from "fs"

export async function getStateFromBlob() {
    const contents = fs.readFileSync(getStatePath());
    return JSON.parse(contents);
}