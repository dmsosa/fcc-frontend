import { useFormContext } from 'react-hook-form'
import type { TSwFormFields } from '../../../../types'
import FieldsetText from '../../control/FieldsetText';

function EssenCoreForm() {
  const { register } = useFormContext<TSwFormFields>();
  //we need to insert errors here with useFormState
  return (
    <>
    <input type="hidden" id='userId' {...register("userId")} />
    <input type="hidden" id='createdDate' {...register("createdDate")} />
    <div className='row'>
      <FieldsetText id="userNo" label="User No." disabled {...register("userNo")}></FieldsetText>
      <FieldsetText id="mobile" label="intergalactic mobile number" {...register("mobile")}></FieldsetText>
    </div>
    <div className='row'>
      <FieldsetText id="username" label="username" {...register("username")}></FieldsetText>
      <FieldsetText id="email" label="email" {...register("email")}></FieldsetText>
    </div>
    </>
    )
}

export default EssenCoreForm;
