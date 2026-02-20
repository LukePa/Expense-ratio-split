import type {IState} from "../interfaces/state";


export function getStateFromLocalStorage(): IState {
    const lukesWage = localStorage.getItem("lukesWage");
    const dalisWage = localStorage.getItem("dalisWage");
    const rent = localStorage.getItem("rent");
    const utility = localStorage.getItem("utility");
    const wifi = localStorage.getItem("wifi");
    const water = localStorage.getItem("water");
    const food = localStorage.getItem("food");
    const nonEssentialSubscriptions = localStorage.getItem("nonEssentialSubscriptions");

    return {
        lukeWage: stringOrNullToNumber(lukesWage),
        daliWage: stringOrNullToNumber(dalisWage),
        rent: stringOrNullToNumber(rent),
        utility: stringOrNullToNumber(utility),
        wifi: stringOrNullToNumber(wifi),
        water: stringOrNullToNumber(water),
        food: stringOrNullToNumber(food),
        nonEssentialSubscriptions: nonEssentialSubscriptions? JSON.parse(nonEssentialSubscriptions) : [],
    }
}

export function saveStateToLocalStorage(state: IState) {
    localStorage.setItem("lukesWage", state.lukeWage?.toString() ?? "");
    localStorage.setItem("dalisWage", state.daliWage?.toString() ?? "");
    localStorage.setItem("rent", state.rent?.toString() ?? "");
    localStorage.setItem("utility", state.wifi?.toString() ?? "");
    localStorage.setItem("wifi", state.wifi?.toString() ?? "");
    localStorage.setItem("water", state.food?.toString() ?? "");
    localStorage.setItem("food", state.food?.toString() ?? "");

    if (state.nonEssentialSubscriptions.length > 0) {
        localStorage.setItem("nonEssentialSubscriptions", "");
    } else {
        localStorage.setItem("nonEssentialSubscriptions", JSON.stringify(state.nonEssentialSubscriptions));
    }

    return;
}

function stringOrNullToNumber(value: string | null): number | undefined {
    return value ? Number.parseFloat(value) : undefined;
}