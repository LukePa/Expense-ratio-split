import type {ISubscription} from "../interfaces/state";
import NonEssentialSubscription from "./NonEssentialSubscription.tsx";
import Accordion from "./Accodion.tsx";
import IconButton from "./IconButton.tsx";
import {faAdd} from "@fortawesome/free-solid-svg-icons";
import ModalSubscriptionAdd from "./ModalSubscriptionAdd.tsx";
import {useState} from "react";


interface Props {
    subscriptions: Array<ISubscription>
    addSubscription: (subscription: ISubscription) => void
    removeSubscription: (subscriptionIndex: number) => void
    updateSubscription: (subscriptionIndex: number, newValue: number | undefined) => void
    disabled: boolean
}

export default function NonEssentialSubscriptions({subscriptions, addSubscription, removeSubscription, updateSubscription, disabled}: Props) {
    const [showAddSubscription, setShowAddSubscription] = useState(false);
    
    let addButtonClass = "self-center mt-5"
    if (disabled) {
        addButtonClass += " hidden";
    }
    
    function showAddSubscriptionModal() {
        setShowAddSubscription(true)
    }
    
    
    return (
        <>
            <Accordion title="Non Essential Subscriptions">
                <div className="flex flex-col items-stretch flex-1">
                    <div className="flex flex-col gap-5 items-stretch flex-1">
                        {subscriptions.map((subscription, index) => {
                            return (
                                <NonEssentialSubscription
                                    key={subscription.title}
                                    subscription={subscription}
                                    onDelete={() => removeSubscription(index)}
                                    disabled={disabled}
                                    updateValue={(val) => updateSubscription(index, val)}
                                />
                                    
                            )
                        })}
                    </div>
                    
                    <IconButton 
                        icon={faAdd} 
                        onClick={showAddSubscriptionModal} 
                        className={addButtonClass} 
                        label="New"
                    />
                </div>
            </Accordion>
            
            <ModalSubscriptionAdd 
                open={showAddSubscription} 
                setOpen={setShowAddSubscription} 
                addSubscription={addSubscription} 
            />
        </>
    )    
}