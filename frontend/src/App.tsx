
import './App.css'
import {getInitialState} from "./helpers/initialState.ts";
import LoadedPage from "./components/LoadedPage.tsx";
import {Suspense, useState} from "react";
import LoadingPage from "./components/LoadingPage.tsx";
import ErrorPage from "./components/ErrorPage.tsx";
import type {IState} from "./interfaces/state";


function App() {
    const [errored, setErrored] = useState(false);
    
    const statePromise = async (): Promise<IState> => {
        try {
            return await getInitialState()
        } catch (error) {
            setErrored(true);
            throw error;
        }
    };
    
    return (
        <div className="overflow-y-auto bg-blue-200 min-h-dvh">
            { errored ?
                <ErrorPage />
                :
                <Suspense fallback={<LoadingPage />}>
                    <LoadedPage statePromise={statePromise()} />
                </Suspense>
            }
        </div>
    )
}

export default App
