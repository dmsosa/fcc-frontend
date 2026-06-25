import { forwardRef, type ForwardedRef } from "react"
import type { FieldError } from "react-hook-form";

type FieldsetTextProps = React.InputHTMLAttributes<HTMLInputElement> & {
    className?: string, 
    id: string, 
    label?: string, 
    error?: FieldError | undefined,
}

const FieldsetText = forwardRef((props: FieldsetTextProps, ref: ForwardedRef<HTMLInputElement>) => {
    const { id, className = "", label, error, ...attributes } = props;

    return (
          <fieldset className="form-fieldset">
            <input ref={ref} id={id} className={`form-fieldset-input ${className}`} {...attributes}></input>
            {label && <label htmlFor={id} >Nombre</label>}
            {error && <div className="form-fieldset-error" >{error.message}</div>}
          </fieldset>
    )
});

export default FieldsetText;
