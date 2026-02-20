import type {IState} from "../interfaces/state";


export function updateStateFromParams(state: IState) {
    const searchParams = new URLSearchParams(document.location.search);
    
    if (searchParams.has("lukesWage")) {
        state.lukeWage = Number.parseFloat(searchParams.get("lukesWage") ?? "")
    }
    
    if (searchParams.has("dalisWage")) {
        state.daliWage = Number.parseFloat(searchParams.get("dalisWage") ?? "")
    }
    
    if (searchParams.has("rent")) {
        state.rent = Number.parseFloat(searchParams.get("rent") ?? "")
    }
    
    if (searchParams.has("utility")) {
        state.utility = Number.parseFloat(searchParams.get("utilities") ?? "")
    }
    
    if (searchParams.has("wifi")) {
        state.wifi = Number(searchParams.get("wifi") ?? "")
    }

    if (searchParams.has("water")) {
        state.wifi = Number(searchParams.get("water") ?? "")
    }

    if (searchParams.has("food")) {
        state.wifi = Number(searchParams.get("food") ?? "")
    }
    
    if (searchParams.has("nonEssentialSubscriptions")) {
        const subscriptions = searchParams.getAll("nonEssentialSubscriptions");
        state.nonEssentialSubscriptions = subscriptions.map((s) => {
            return JSON.parse(s)
        })
    }
}

export function stateToUrl(state: IState) {
    const searchParams = new URLSearchParams(document.location.search);
    if (state.lukeWage) searchParams.append("lukesWage", state.lukeWage.toString());
    if (state.daliWage) searchParams.append("dalisWage", state.daliWage.toString());
    if (state.utility) searchParams.append("utilities", state.utility.toString());
    if (state.wifi) searchParams.append("wifi", state.wifi.toString());
    if (state.water) searchParams.append("water", state.water.toString());
    if(state.food) searchParams.append("food", state.food.toString());
    if(state.nonEssentialSubscriptions.length > 0) {
        state.nonEssentialSubscriptions.forEach((s) => {
            searchParams.append("nonEssentialSubscriptions", JSON.stringify(s));
        })
    }
    
    return `${document.location.host}?${searchParams}`;
}