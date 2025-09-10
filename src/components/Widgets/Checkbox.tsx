export interface ICheckboxProps {
    name?: string;
    id?: string;
    checked: boolean;
    onClick?: React.MouseEventHandler<HTMLLabelElement>;
}

export function Checkbox ( { checked, name, id, onClick }: ICheckboxProps) {
  return (
    <label className='checkbox-wrapper' htmlFor={id} onClick={onClick}>
      <input type="checkbox" name={name} id={id} checked={checked} />
    </label>
  );
}
