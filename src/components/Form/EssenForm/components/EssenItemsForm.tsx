import { useFieldArray, useFormContext } from 'react-hook-form'
import type { EssenFormFields, TEssenItems } from '../../../../types'
import FieldsetText from '../../control/FieldsetText';
import { useEffect, useState, type ChangeEvent } from 'react';
import { getEssenItems } from '../../../../db/essen';
import CustomSelectAlt, { type Option } from '../../control/CustomSelect';

function EssenItemsForm() {
  const [ itemsList, setItemsList ] = useState<TEssenItems[]>([]);
  const [ itemOptions, setItemOptions ] = useState<Option<number>[]>([]);
  const { fields, append, remove } = useFieldArray<EssenFormFields>({
    name: "items",
  });

  useEffect(() => {
    const itemsFetched = getEssenItems();
    setItemsList(itemsFetched);
    const optionsFetched: Option<number>[] = itemsFetched.map((item) => ({ label: item.name, value: item.id }));
    setItemOptions([{ value: 0, label: "Select an item" }, ...optionsFetched]);
  })

  const { register, getValues, setValue } = useFormContext<EssenFormFields>();
  //we need to insert errors here with useFormState
  const onAdd = () => {
    append({ id: 0, price: 0, quantity: 0, totalPrice: 0 });
  }
  const onRemove = (index: number) => {
    remove(index);
  }

  const onSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const target = e.currentTarget;
    const itemId = parseInt(target.value);
    const index = target.dataset.index ? parseInt(target.dataset.index) : 0;
    const price = itemsList.find((i) => i.id === itemId)?.price || 0; 
    setValue(`items.${index}.price`, price);
  }


  return (
    <>
    <caption>Ordered Essen Items</caption>
    <table>
      <thead>
        <tr>
          <th className='fw-bold text-center'>Food</th>
          <th className='fw-bold text-center'>Price</th>
          <th className='fw-bold text-center'>Quantity</th>
          <th className='fw-bold text-center'>T.Price</th>
          <th><button className="btn btn-primary" onClick={onAdd}>+ add</button></th>
        </tr>
      </thead>
      <tbody>
        {fields.map((field, index) => (
        <tr>
          <td>
            <CustomSelectAlt 
            {...register(`items.${index}.id`)}
            value={field.id}
            className=''
            options={itemOptions}
            onChange={onSelectChange}
            >
            </CustomSelectAlt>
          </td>
          <td>
            <span>{field.price}</span>
          </td>
          <td>
            <FieldsetText
            id='items-quantity'
            type='number'
            min={0}
            {...register(`items.${index}.quantity`)}>
            </FieldsetText>
          </td>
          <td className='text-start'>
            {"$" + getValues}
          </td>
          <td>
            <button 
            className="btn btn-danger"
            onClick={() => onRemove(index)}
            >
              DEL
            </button>
          </td>
        </tr>

        ))}
      </tbody>
    </table>
    </>
    )
}

export default EssenItemsForm;
