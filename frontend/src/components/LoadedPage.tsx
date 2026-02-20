import {use, useEffect, useState} from "react";
import type {IState, ISubscription} from "../interfaces/state";
import {saveStateToStorage} from "../helpers/storage.ts";
import OweSection from "./OweSection.tsx";
import TitledMoneyAmountInput from "./TitledMoneyAmountInput.tsx";
import Accordion from "./Accodion.tsx";
import NonEssentialSubscriptions from "./NonEssentialSubscriptions.tsx";


interface Props {
    statePromise: Promise<IState>;
}

let debounceTimeoutId: number;

export default function LoadedPage({statePromise}: Props) {
    const [state, setState] = useState(use(statePromise))
    
    
    useEffect(() => {
        if (debounceTimeoutId) clearTimeout(debounceTimeoutId);
        debounceTimeoutId = window.setTimeout(() => {
            saveStateToStorage(state)
        }, 1000)
    }, [state])

    const setLukesWage = (value: number | undefined) => {
        setState({...state, lukeWage: value})
    }

    const setDalisWage = (value: number | undefined) => {
        setState({...state, daliWage: value})
    }

    const setRent = (value: number | undefined) => {
        setState({...state, rent: value})
    }

    const setUtility = (value: number | undefined) => {
        setState({...state, utility: value})
    }

    const setWater = (value: number | undefined) => {
        setState({...state, water: value})
    }

    const setWifi = (value: number | undefined) => {
        setState({...state, wifi: value})
    }

    const setFood = (value: number | undefined) => {
        setState({...state, food: value})
    }

    const addSubscription = (newSubscription: ISubscription) => {
        const alreadyHasSubscription = state.nonEssentialSubscriptions.some(sub => {
            return sub.title === newSubscription.title;
        })

        if (!alreadyHasSubscription) {
            setState({...state, nonEssentialSubscriptions: [...state.nonEssentialSubscriptions, newSubscription]})
        }
    }

    const updateSubscription = (index: number, newVal: number | undefined) => {
        const newSubscriptions = state.nonEssentialSubscriptions.map((sub, i) => {
            if (i === index) {
                return {...sub, cost: newVal};
            } else {
                return {...sub}
            }
        })

        setState({...state, nonEssentialSubscriptions: newSubscriptions})
    }

    const deleteSubscription = (index: number) => {
        const newSubscriptions = state.nonEssentialSubscriptions.filter((_sub, i) => {
            return i !== index;
        })

        setState({...state, nonEssentialSubscriptions: newSubscriptions})
    }

    return (
        <div className="mx-5 md:mx-20 lg:mx-60 mt-5 mb-5 flex flex-col gap-5">
            <OweSection state={state} />

            <div className="flex gap-x-30 gap-y-5 bg-gray-200 p-5 rounded-md flex-wrap">
                <div className="min-w-10 flex justify-center grow-1">
                    <TitledMoneyAmountInput
                        title="Luke's Monthly Wage"
                        value={state.lukeWage}
                        setValue={setLukesWage}
                    />
                </div>
                <div className="min-w-5 flex justify-center grow-1">
                    <TitledMoneyAmountInput
                        title="Dali's Monthly Wage"
                        value={state.daliWage}
                        setValue={setDalisWage}
                    />
                </div>
            </div>
            
            <p className="font-thin text-center underline underline-offset-3 text-lg">Bills</p>

            <Accordion title="Essentials">
                <div className="flex flex-col gap-5">
                    <TitledMoneyAmountInput
                        title="Rent"
                        value={state.rent}
                        setValue={setRent}
                    />

                    <TitledMoneyAmountInput
                        title="Utilities"
                        value={state.utility}
                        setValue={setUtility}
                    />

                    <TitledMoneyAmountInput
                        title="Water"
                        value={state.water}
                        setValue={setWater}
                    />

                    <TitledMoneyAmountInput
                        title="Wifi"
                        value={state.wifi}
                        setValue={setWifi}
                    />

                    <TitledMoneyAmountInput
                        title="Food"
                        value={state.food}
                        setValue={setFood}
                    />
                </div>
            </Accordion>

            <NonEssentialSubscriptions
                subscriptions={state.nonEssentialSubscriptions}
                addSubscription={addSubscription}
                removeSubscription={deleteSubscription}
                updateSubscription={updateSubscription}
                disabled={false}
            />
        </div>
    )
}