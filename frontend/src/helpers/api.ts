import type {IState, ISubscription} from "../interfaces/state";

const url = import.meta.env.PROD ? "/state" : "http://localhost:1111/state";

export async function getStateFromApi(): Promise<IState> {
    
    const res = await fetch(url, {
        headers: {
            'Accept': 'application/json',
        }
    });
    if (!res.ok) throw new Error(`Failed to load state: ${res.status}`);
    const body = await res.json()
    return formatStateFromApi(body)
}



export async function saveStateToApi(state: IState) {
    const res = await fetch(url, {
        method: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(state),
    })
    if (!res.ok) throw new Error(`Failed to save state: ${res.status}`);
}


function formatStateFromApi(body: any): IState {
    
    return {
        lukeWage: parseOptionalNumberFromBody(body.lukeWage),
        daliWage: parseOptionalNumberFromBody(body.daliWage),
        food: parseOptionalNumberFromBody(body.food),
        rent: parseOptionalNumberFromBody(body.rent),
        utility: parseOptionalNumberFromBody(body.utility), 
        water: parseOptionalNumberFromBody(body.water), 
        wifi: parseOptionalNumberFromBody(body.wifi),
        nonEssentialSubscriptions: parseSubscriptionsFromBody(body.nonEssentialSubscriptions), 
    }
}

function parseOptionalNumberFromBody(value: any): number | undefined {
    return value !== undefined && value !== null && !Number.isNaN(Number.parseFloat(value)) ? 
        Number.parseFloat(value) :
        undefined
}

function parseSubscriptionsFromBody(value: any): Array<ISubscription> {
    const subscriptions: Array<ISubscription> = [];
    
    if (Array.isArray(value)) {
        value.forEach(item => {
            if (item.title !== undefined) {
                subscriptions.push({
                    title: item.title,
                    cost: item.cost,
                })
            }
        })
    } 
    
    return subscriptions;
}