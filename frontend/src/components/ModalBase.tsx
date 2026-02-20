import {createPortal} from "react-dom";
import type {ReactNode} from "react";

interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    body: ReactNode
    footer: ReactNode
}


export function ModalBase({...props}: Props) {
    
    return (
        <>
        {
            props.open ? createPortal(<Modal {...props} />, document.body) : null
        }
        </>
    )
}

interface BodyProps {
    children: ReactNode
}

export function Body({children}: BodyProps) {
    return (
        <div className="p-5 flex items-center justify-center">
            {children}
        </div>
    )
}

interface FooterProps {
    children: ReactNode
}

export function Footer({children}: FooterProps) {
    return (
        <div className="flex justify-end gap-2 p-2 bg-gray-200 rounded-md">
            {children}
        </div>
    )
}

function Modal({...props}: Props) {
    
    let backgroundClasses = "fixed bottom-0 top-0 left-0 right-0 bg-black/50 flex items-center justify-center";
    if (!props.open) backgroundClasses += " hidden";
    
    function onBackgroundClick(e: React.MouseEvent<HTMLDivElement>) {
        e.preventDefault();
        e.stopPropagation();
        props.setOpen(false);
    }
    
    function onBodyClick(e: React.MouseEvent<HTMLDivElement>) {
        e.stopPropagation();
    }
    
    return (
        <div className={backgroundClasses} onClick={onBackgroundClick}>
            <div className="flex flex-col min-w-50 items-stretch bg-white rounded-md" onClick={onBodyClick}>
                {props.body}
                {props.footer}
            </div>
        </div>
    )
}