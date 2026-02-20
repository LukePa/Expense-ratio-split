

interface Props {
    value: string;
    onChange: (value: string) => void;
    type?: string;
    disabled?: boolean;
    error?: boolean;
}

export default function StyledInput({value, onChange, type = "text", disabled = false, error}: Props) {
    
    let inputClass = "border-black border-1 rounded-sm px-2 text-center flex-1 min-w-0";
    inputClass += disabled ? " border-black/10" : " border-black" 
    
    if (error) {
        inputClass += " border-red-500 bg-white";
    } else if (disabled) {
        inputClass += " border-black/10 bg-gray-50";
    } else {
        inputClass +=  " border-black bg-white"
    }
    
    return (
        <input
            className={inputClass}
            value={value}
            disabled={disabled}
            onChange={e => onChange(e.target.value)}
            type={type}
        />
    );
}