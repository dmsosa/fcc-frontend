interface ICheckboxProps {
    clazz?: string;
    name?: string;
    id?: string;
    value: boolean;
    handleChange?: (e: React.InputEvent<HTMLInputElement>) => void;
    disabled?: boolean;
}

export function Checkbox ( { clazz, name, id, value, handleChange, disabled=false }: ICheckboxProps) {
    let className = clazz ? `checkbox-wrapper ${clazz}` : 'checkbox-wrapper';
    if (disabled) {
        className += ' checkbox-wrapper--disabled';
    };
  return (
    <label className={className} htmlFor={id}  >
      <input type="checkbox" name={name} id={id} checked={value} onInput={handleChange}/>
    </label>
  );
}
