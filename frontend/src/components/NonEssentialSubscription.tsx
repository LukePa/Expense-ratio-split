import type {ISubscription} from "../interfaces/state";
import TitledMoneyAmountInput from "./TitledMoneyAmountInput.tsx";
import IconButton from "./IconButton.tsx";
import {faTrash} from "@fortawesome/free-solid-svg-icons";
import ModalConfirm from "./ModalConfirm.tsx";
import {useState} from "react";


interface Props {
    subscription: ISubscription
    updateValue: (newValue: number | undefined) => void
    onDelete: () => void
    disabled: boolean
}

export default function NonEssentialSubscription({subscription, updateValue, onDelete, disabled}: Props) {
    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    
    let containerClassName = "flex items-center flex-1"
    let deleteButtonClassName = "";
    
    if (!disabled) {
        containerClassName += " gap-5";
    } else {
        deleteButtonClassName += " hidden";
    }
    
    return (
        <>
            <div className={containerClassName}>
                <IconButton icon={faTrash} onClick={() => setShowDeleteConfirm(true)} className={deleteButtonClassName} />
                <TitledMoneyAmountInput 
                    title={subscription.title} 
                    value={subscription.cost} 
                    setValue={updateValue} 
                    disabled={disabled} 
                />
            </div>

            <ModalConfirm 
                message="Are you sure?" 
                open={showDeleteConfirm} 
                setOpen={setShowDeleteConfirm}
                onConfirm={onDelete}
            />
        </>
    )
}