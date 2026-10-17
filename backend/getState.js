import fs from "fs";
import { uploadStateToBlob } from "./uploadStateToBlob.js";
import { getEmptyStateObject } from "./getEmptyStateObject.js";
import { getStateFromBlob } from "./getStateFromBlob.js";


export default async function getState() {
    let state = {};
    
    try {
        state = await getStateFromBlob();
    } catch (err) {
        // Only initialise when the blob genuinely doesn't exist; any other error must not overwrite real data
        if (err.statusCode !== 404) throw err;
        state = getEmptyStateObject();
        await uploadStateToBlob(state)
    }
    
    return state;
    
}