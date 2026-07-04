import fs from "fs"
import getStatePath from "./getStatePath.js";

export async function uploadStateToBlob(state) {
    const file = typeof state === "string" ? state : JSON.stringify(state);

    fs.writeFileSync(getStatePath(), file);
}