export interface ICheckboxProps {
    clazz?: string;
    name?: string;
    id?: string;
    checked: boolean;
    onClick?: React.MouseEventHandler<HTMLLabelElement>;
    disabled?: boolean;
}

export function Checkbox ( { clazz, checked, name, id, onClick, disabled=false }: ICheckboxProps) {
    let className = clazz ? `checkbox-wrapper ${clazz}` : 'checkbox-wrapper';
    if (disabled) {
        className += ' checkbox-wrapper--disabled';
    };
  return (
    <label className={className} htmlFor={id} onClick={onClick} >
      <input type="checkbox" name={name} id={id} checked={checked}  />
    </label>
  );
}
