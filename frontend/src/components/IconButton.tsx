import type {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";


interface Props {
    icon: IconProp;
    onClick: (() => void) | (() => Promise<void>);
    label?: string;
    className?: string;
}

export default function IconButton({ icon, onClick, className, label }: Props) {
    
    let buttonClassName = "bg-orange-200 p-2 cursor-pointer border-1 border-orange-500 rounded-sm";
    if (className) buttonClassName += ` ${className}`;
    
    const onButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.stopPropagation();
        onClick();
    }
    
    return (
        <button 
            onClick={onButtonClick} 
            className={buttonClassName}
        >
            <div className="flex items-center">
                <div className="flex items-center justify-center size-5">
                    <FontAwesomeIcon icon={icon} className="h-1"/>
                </div>
                {label ? <span className="font-thin ml-3">{label}</span> : undefined}
            </div>
        </button>
    )
}