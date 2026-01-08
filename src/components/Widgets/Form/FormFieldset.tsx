import type { ChangeEvent, HTMLAttributes } from "react";
interface IFormFieldsetProps {
    attributes?: HTMLAttributes<HTMLElement>;
    errors?: string[];
    id: string;
    name: string;
    type: string;
    label: string;
    placeholder?: string;
    expanded?: boolean;
    handleChange: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => void;
}

export default function FormFieldset({ attributes, errors, type, label, placeholder, expanded=true, handleChange}: IFormFieldsetProps) {
    console.log(attributes, 'attrs')
    return (
        <fieldset className="app-fieldset">
            {expanded && <label htmlFor={attributes?.id}>{label}</label>}
            {
                type === 'textarea' ?
                <textarea {...attributes}  onChange={handleChange} placeholder={placeholder ?? ''} ></textarea>
                :
                <input {...attributes} type={type} onChange={handleChange} placeholder={placeholder ?? ''} />
            }
            {errors && errors.map( (e) =>
              <div className="text-red-500 text-sm mt-1">{e}</div>
            )}
        </fieldset>
    )
}