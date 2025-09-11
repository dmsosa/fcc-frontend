export interface ICheckboxProps {
    clazz?: string;
    name?: string;
    id?: string;
    checked: boolean;
    onClick?: React.MouseEventHandler<HTMLLabelElement>;
}

export function Checkbox ( { clazz, checked, name, id, onClick }: ICheckboxProps) {
    const className = clazz ? `checkbox-wrapper ${clazz}` : 'checkbox-wrapper';
  return (
    <label className={className} htmlFor={id} onClick={onClick}>
      <input type="checkbox" name={name} id={id} checked={checked}  />
    </label>
  );
}
