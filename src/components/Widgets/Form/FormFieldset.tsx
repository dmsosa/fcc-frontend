import { Checkbox } from "./Checkbox";

interface IFormFieldsetProps {
    type: string;
    name: string;
    id: string;
    value: boolean | string | number;
    text: string;
    handleChange?: (e: React.FormEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement> ) => void;
}

export default function FormFieldset({ type, name, id, value, text, handleChange}: IFormFieldsetProps) {
    return (
        <fieldset>
            { type === 'checkbox' ?
                <Checkbox handleChange={handleChange} name={name} id={id} value={value as boolean}></Checkbox> :
                type === 'select' ?
                <select name="" id=""></select>
                :
                type === 'textarea' ?
                <textarea name="" id=""></textarea>
                :
                <input type={type} name={name} id={id} onChange={handleChange} value={value.toString()} />
            }
            <label htmlFor={id}>{text}</label>
        </fieldset>
    )
}