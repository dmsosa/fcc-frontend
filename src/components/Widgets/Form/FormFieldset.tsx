import type { ChangeEvent } from "react";
import type {  FieldError, UseFormRegisterReturn } from "react-hook-form";
interface IFormFieldsetProps {
    registerAttributes?: UseFormRegisterReturn;
    errors?: FieldError;
    id: string;
    type: string;
    label: string;
    placeholder?: string;
    expanded?: boolean;
    handleChange?: (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => void;
}

export default function FormFieldset({ registerAttributes, errors, id, type, label, placeholder, expanded=true, handleChange}: IFormFieldsetProps) {
    return (
        <fieldset className="app-fieldset">
            {expanded && <label htmlFor={id}>{label}</label>}
            {
                type === 'textarea' ?
                <textarea 
                id={id}
                onChange={handleChange}
                placeholder={placeholder ?? ''}
                {...registerAttributes}
                aria-invalid={errors ? "true" : "false"}
                ></textarea>
                :
                <input 
                id={id}  
                type={type} 
                onChange={handleChange} 
                placeholder={placeholder ?? ''} 
                {...registerAttributes}
                aria-invalid={errors?.message ? "true" : "false"}
                />
            }
            {/* use role="alert" to announce the error message */}
            {errors && <span role="alert" className="text-red-500 text-sm mt-1">{errors.message}</span>}
        </fieldset>
    )
}