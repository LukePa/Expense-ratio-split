import type {ISubscription} from "../interfaces/state";
import {Body, Footer, ModalBase} from "./ModalBase.tsx";
import {useEffect, useState} from "react";
import IconButton from "./IconButton.tsx";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";
import TitledInput from "./TitledInput.tsx";
import TitledMoneyAmountInput from "./TitledMoneyAmountInput.tsx";


interface Props {
    open: boolean;
    setOpen: (open: boolean) => void;
    addSubscription: (subscription: ISubscription) => void;
}


export default function ModalSubscriptionAdd(props: Props) {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState<number | undefined>(undefined);
    
    const [titleError, setTitleError] = useState(false);
    const [priceError, setPriceError] = useState(false);
    
    useEffect(() => {
        resetErrors()
        resetValues()
    }, [props.open])
    
    const resetErrors = () => {
        setTitleError(false);
        setPriceError(false);
    }
    
    const resetValues = () => {
        setTitle("")
        setPrice(undefined)
    }
    
    
    const onClickNo = () => {
        props.setOpen(false)
    }
    
    const onClickYes = () => {
        resetErrors()
        let hasTitleError = false;
        let hasPriceError = false;
        
        if (title.length === 0) hasTitleError = true;
        if (!price) hasPriceError = true;
        
        if (!hasTitleError && !hasPriceError) {
            const subscription: ISubscription = {title, cost: price};
            props.addSubscription(subscription);
            props.setOpen(false);
        } else {
            setTitleError(hasTitleError);
            setPriceError(hasPriceError);
        }
    }
    
    return (
        <ModalBase 
            open={props.open} 
            setOpen={props.setOpen} 
            body={
                <Body>
                    <div className="flex flex-col items-stretch gap-3">
                        <TitledInput 
                            title="Name" 
                            value={title} 
                            setValue={setTitle} 
                            disabled={false}
                            error={titleError}
                        />

                        <TitledMoneyAmountInput
                            title="Price"
                            value={price}
                            setValue={setPrice}
                            disabled={false}
                            error={priceError}
                        />
                    </div>
                </Body>
            } 
            footer={
                <Footer>
                    <>
                        <IconButton icon={faXmark} onClick={onClickNo} />
                        <IconButton icon={faCheck} onClick={onClickYes} />
                    </>
                </Footer>
            } 
        />
    )
}