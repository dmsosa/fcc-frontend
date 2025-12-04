import { useState } from "react";

export default function useToggler(initValue?: boolean | undefined): [ boolean, (newValue?: boolean | undefined) => void ] {
    const [ value, setValue ] = useState<boolean>(initValue ?? false);
    const toggler = (newValue?: boolean | undefined) => {
        if (!newValue) {
            setValue(!value);
        } else {
            setValue(newValue);
        }
    };
    return [value, toggler];
}