import fs from "fs";
import getStatePath from "./getStatePath.js";


export default function getState() {
    let state = {};
    
    try {
        const contents = fs.readFileSync(getStatePath());
        state = JSON.parse(contents);
    } catch (err) {
        fs.writeFileSync(getStatePath(), "{}");
    }
    
    return state;
    
}