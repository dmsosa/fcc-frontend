import { useFormContext } from 'react-hook-form'
import type { EssenFormFields } from '../../../../types'
import FieldsetText from '../../control/FieldsetText';

function EssenCoreForm() {
  const { register } = useFormContext<EssenFormFields>();
  //we need to insert errors here with useFormState
  return (
    <>
    <input type="hidden" {...register("orderId")} />
    <input type="hidden" {...register("date")} />
    <div className='row'>
      <FieldsetText id="name" label="Order No." disabled {...register("orderNo")}></FieldsetText>
      <FieldsetText id="mobile" label="Mobile number" {...register("mobile")}></FieldsetText>
    </div>
    <div className='row'>
      <FieldsetText id="name" label="Name" {...register("name")}></FieldsetText>
      <FieldsetText id="email" label="Email" {...register("email")}></FieldsetText>
    </div>
    </>
    )
}

export default EssenCoreForm;
