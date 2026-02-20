import {type ReactNode, useState} from "react";
import IconButton from "./IconButton.tsx";
import {faCaretDown, faCaretUp} from "@fortawesome/free-solid-svg-icons";

interface Props {
    title: string;
    children: ReactNode;
}


export default function Accordion({title, children}: Props) {
    const [open, setOpen] = useState(false);
    
    let accordianContentClass = "rounded-md border-gray-200 bg-gray-100 transition-all ";
    if (!open) {
        accordianContentClass += "max-h-0"
    } else {
        accordianContentClass += "max-h-100 border-t-1 border-3"
    }
    
    const toggleOpen = () => {
        setOpen(!open);
    }
    
    return (
        <div className="overflow-hidden">
            <div 
                className="bg-gray-200 flex justify-between rounded-md p-5 items-center"
                onClick={toggleOpen}
            >
                <span className="font-thin">{title}</span>
                <IconButton icon={open ? faCaretUp : faCaretDown} onClick={toggleOpen} />
            </div>
            
            <div className={accordianContentClass}>
                <div className="px-2 sm:px-5 py-5">
                    {children}
                </div>
            </div>
        </div>
    )
}