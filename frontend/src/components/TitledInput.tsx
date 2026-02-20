import StyledInput from "./StyledInput.tsx";

interface Props {
    title: string;
    value: string;
    setValue: (value: string) => void;
    disabled?: boolean;
    type?: string;
    error?: boolean;
}

export default function TitledInput({title, value, setValue, disabled, type, error}: Props) {

    return (
        <div className="flex flex-col items-stretch flex-1 min-w-0">
            <span className="font-thin">{title}</span>
            <div className="flex flex-1 gap-2">
                <span>
                    £
                </span>
                <StyledInput
                    value={value}
                    onChange={setValue}
                    type={type}
                    disabled={disabled}
                    error={error}
                />
            </div>
        </div>
    )
}