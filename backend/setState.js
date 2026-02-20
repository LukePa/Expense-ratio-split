import fs from "fs"
import getStatePath from "./getStatePath.js";


export async function setState(state) {
    if (verifyState(state)) {
        fs.writeFileSync(getStatePath(), JSON.stringify(state));
        return true;
    }
    
    return false;
}

export function verifyState(state) {
    if (!state) return false;
    if (state.lukeWage && Number.isNaN(Number.parseFloat(state.lukeWage))) return false;
    if (state.daliWage && Number.isNaN(Number.parseFloat(state.daliWage))) return false;
    if (state.rent && Number.isNaN(Number.parseFloat(state.rent))) return false;
    if (state.utility && Number.isNaN(Number.parseFloat(state.utility))) return false;
    if (state.water && Number.isNaN(Number.parseFloat(state.water))) return false;
    if (state.wifi && Number.isNaN(Number.parseFloat(state.wifi))) return false;
    if (state.food && Number.isNaN(Number.parseFloat(state.food))) return false;
    
    if (state.nonEssentialSubscriptions) {
        if(!Array.isArray(state.nonEssentialSubscriptions)) return false;
        let hasInvalidSubscription = false;
        state.nonEssentialSubscriptions.forEach(subscription => {
            if (!subscription.title) hasInvalidSubscription = true;
            if (subscription.cost && Number.isNaN(Number.parseFloat(subscription.cost))) {
                hasInvalidSubscription = true
            }
        });
        
        return !hasInvalidSubscription;
    }
    
    return true;
}