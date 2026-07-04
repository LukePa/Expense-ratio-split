import fs from "fs";
import { uploadStateToBlob } from "./uploadStateToBlob.js";
import { getEmptyStateObject } from "./getEmptyStateObject.js";
import { getStateFromBlob } from "./getStateFromBlob.js";


export default async function getState() {
    let state = {};
    
    try {
        state = await getStateFromBlob();
    } catch (err) {
        state = getEmptyStateObject();
        await uploadStateToBlob(state)
    }
    
    return state;
    
}