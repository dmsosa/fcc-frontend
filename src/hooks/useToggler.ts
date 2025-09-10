import type { MouseEvent } from "react";

export default function useToggler(value: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>) {
    return (e: MouseEvent<HTMLButtonElement>) => {e.preventDefault(); setter(!value);}
}