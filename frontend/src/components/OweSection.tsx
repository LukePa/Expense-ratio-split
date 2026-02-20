import type {IState} from "../interfaces/state";
import calculateOwedAmounts from "../helpers/calculation.ts";


interface Props {state: IState}



export default function OweSection({state}: Props) {
    const owedAmounts = calculateOwedAmounts(state);
    
    
    return (
        <div className="border-solid border-2 border-orange-500 bg-orange-200 flex flex-wrap justify-center py-5 rounded-md gap-x-20 md:gap-x-100">
            <div className="flex flex-col items-center">
                <span className="font-thin">Luke:</span>
                <span className="font-bold">£{owedAmounts?.luke}
                </span>
            </div>
            <div className="flex flex-col items-center">
                <span className="font-thin">Dali:</span>
                <span className="font-bold">£{owedAmounts?.dali}</span>
            </div>
        </div>
    )
}