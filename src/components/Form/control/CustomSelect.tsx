import { type FieldError } from 'react-hook-form'
import type React from 'react';
import { forwardRef, type ForwardedRef } from 'react';

export type Option<T = string> = {
  value: T;
  label: string;
  disabled?: boolean;
};

type CustomSelectAltProps<T = string> = React.SelectHTMLAttributes<HTMLSelectElement> & {
    id: string,
    className?: string | undefined,
    options: Option<T>[],
    label?: string | undefined,
    error?: FieldError | undefined,
}

const CustomSelectAlt = forwardRef((props: CustomSelectAltProps, ref: ForwardedRef<HTMLSelectElement>) => {
    const { id, className="", options, label, error, ...attributes } = props;
  return (
    <fieldset className="form-fieldset">
        <select id={id} className={`custom form-fieldset-select ${className}`} ref={ref} {...attributes}>
            {options.map((opt, i) => <option key={i} value={opt.value} disabled={opt.disabled}>{opt.label}</option>
            )}
        </select>
        {label && <label htmlFor={id}>{label}</label>}
        {error && <div className="form-fieldset-error">{error.message}</div>}
    </fieldset>
    )
});

export default CustomSelectAlt;
