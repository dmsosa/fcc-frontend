import { useState, type MouseEvent } from "react";

export function useToggler(value: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) {
    return (e: MouseEvent<HTMLButtonElement>) => {e.preventDefault(); setter(!value);}
}


export function useClickOutside() {
    const [show, setShow ] = useState(true);
    //wenn zeigen, fugt EreignissHorer ein
    if (show) {
        // window.addEventListener()
    }
}