import { useFormContext } from 'react-hook-form'
import type { TSwFormFields } from '../../../../types'
import FieldsetText from '../../control/FieldsetText';

function EssenCoreForm() {
  const { register } = useFormContext<TSwFormFields>();
  //we need to insert errors here with useFormState
  return (
    <>
    <input type="hidden" {...register("userId")} />
    <input type="hidden" {...register("createdDate")} />
    <div className='row'>
      <FieldsetText id="name" label="Order No." disabled {...register("userNo")}></FieldsetText>
      <FieldsetText id="mobile" label="Mobile number" {...register("mobile")}></FieldsetText>
    </div>
    <div className='row'>
      <FieldsetText id="name" label="username" {...register("username")}></FieldsetText>
      <FieldsetText id="email" label="email" {...register("email")}></FieldsetText>
    </div>
    </>
    )
}

export default EssenCoreForm;
