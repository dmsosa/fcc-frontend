import type { ChangeEvent } from "react";
type TInputHandlers = ((e: ChangeEvent<HTMLInputElement> ) => void) | ((e: ChangeEvent<HTMLTextAreaElement> ) => void);
interface IFormFieldsetProps {
    type: string;
    name: string;
    id: string;
    value: boolean | string | number;
    label: string;
    placeholder?: string;
    expanded?: boolean;
    handleChange: TInputHandlers;
}

export default function FormFieldset({ type, name, id, value, label, placeholder, expanded, handleChange}: IFormFieldsetProps) {
    return (
        <fieldset>
            {
                type === 'textarea' ?
                <textarea name={name} id={id} onChange={handleChange as ((e: ChangeEvent<HTMLTextAreaElement> ) => void)} value={value.toString()} placeholder={placeholder ?? ''} ></textarea>
                :
                <input type={type} name={name} id={id} onChange={handleChange as ((e: ChangeEvent<HTMLInputElement> ) => void)} value={value.toString()} placeholder={placeholder ?? ''} />
            }
            {expanded && <label htmlFor={id}>{label}</label>}
        </fieldset>
    )
}