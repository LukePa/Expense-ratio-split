import type {IState} from "../interfaces/state";


interface OwedAmounts {
    luke: string;
    dali: string;
}

export default function calculateOwedAmounts(state: IState): OwedAmounts | undefined {
    
    if (state.lukeWage === undefined || state.daliWage === undefined) return undefined;
    
    const totalOutgoing = sumExpenses(state);
    const combinedWage = state.lukeWage + state.daliWage;
    
    return {
        luke: getIndividualCost(state.lukeWage, combinedWage, totalOutgoing).toFixed(2),
        dali: getIndividualCost(state.daliWage, combinedWage, totalOutgoing).toFixed(2),
    }
}


function sumExpenses(state: IState): number {
    let total = 0;
    
    total += state.water || 0;
    total += state.utility || 0;
    total += state.rent || 0;
    total += state.wifi || 0;
    total += state.food || 0;
    
    state.nonEssentialSubscriptions.forEach(subscription => {
        total += subscription.cost || 0;
    })
    
    return total;
}


function getIndividualCost(wage: number, combinedWage: number, expensesCost: number): number {
    return (wage / combinedWage) * expensesCost;
}