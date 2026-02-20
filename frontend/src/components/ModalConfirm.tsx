import {ModalBase, Body, Footer} from "./ModalBase.tsx";
import IconButton from "./IconButton.tsx";
import {faCheck, faXmark} from "@fortawesome/free-solid-svg-icons";

interface Props {
    message: string
    open: boolean
    setOpen: (open: boolean) => void
    onConfirm: () => void
}

export default function ModalConfirm({...props}: Props) {
    
    const onClickNo = () => {
        props.setOpen(false)
    }
    
    const onClickYes = () => {
        props.onConfirm()
        props.setOpen(false)
    }
    
    return (
        <ModalBase 
            open={props.open} 
            setOpen={props.setOpen} 
            body={
                <Body>
                    <p>{props.message}</p>
                </Body>
                } 
            footer={
                <Footer>
                    <IconButton icon={faXmark} onClick={onClickNo} />
                    <IconButton icon={faCheck} onClick={onClickYes} />
                </Footer>
            } 
        />
    )
}