import {useEffect, useState} from "react";


export default function LoadingPage() {
    const [numDots, setNumDots] = useState(0);
    
    function incrementDots() {
        setNumDots(numDots < 3 ? numDots + 1 : 0 );
    }
    
    useEffect(() => {
        const intervalId = window.setInterval(incrementDots, 500);
        return () => window.clearInterval(intervalId);
    })
    
    let dots = "";
    for (let i = 0; i < numDots; i++) {
        dots += "."
    }
    
    return (
        <div className="h-dvh w-full flex items-center justify-center bg-gray-200">
            <p className="font-thin">Loading{dots}</p>
        </div>
    )
}