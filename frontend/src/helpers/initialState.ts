import type {IState} from "../interfaces/state";
import {getStateFromStorage} from "./storage.ts";
import {updateStateFromParams} from "./queryParams.ts";


export async function getInitialState(): Promise<IState> {
    const state = await getStateFromStorage();
    updateStateFromParams(state)
    return state;
}