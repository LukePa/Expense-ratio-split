import TitledInput from "./TitledInput.tsx";

interface Props {
    title: string;
    value: number | undefined;
    setValue: (value: number | undefined) => void;
    disabled?: boolean;
    error?: boolean;
}

export default function TitledMoneyAmountInput({title, value, setValue, disabled, error}: Props) {
    
    const inputValue = value === undefined ? "" : value.toString();
    
    function setNewValue(val: string) {
        let newVal: number | undefined;

        if (val === "") {
            newVal = undefined;
        } else if (!Number.isNaN(Number(val))) {
            newVal = Number(val);
        } else {
            newVal = value;
        }
        setValue(newVal)
    }
    
    return (
        <TitledInput 
            title={title} 
            value={inputValue} 
            setValue={setNewValue} 
            disabled={disabled} 
            type="number"
            error={error}
        />
    )
}