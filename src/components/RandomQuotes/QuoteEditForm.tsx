import { useState, type ChangeEvent, type FormEvent, type MouseEvent } from 'react';
import { type TQuote } from '../../store/quotesSlice/quotesSlice';
import { useAppDispatch } from '../../store';
import { Button, Stack } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import FormFieldset from '../Widgets/Form/FormFieldset';
import { BsBack, BsSave } from 'react-icons/bs';

type EditQuoteFormProps = {
  quote: TQuote;
  onClose?: (e: MouseEvent<HTMLButtonElement> | FormEvent) => void;
};

type EditQuoteFormData = {
    text: string,
    author: string
}

type TFieldErrors = {
    [key in keyof EditQuoteFormData]?: string[];
}
type TFieldNames = "text" | "author";
function EditQuoteForm({ quote, onClose }: EditQuoteFormProps) {
    const { register, setValue, handleSubmit, getValues} = useForm<EditQuoteFormData>({defaultValues: {...quote}});
    const [isFormValid, setIsFormValid] = useState<boolean>(false);
    const [fieldErrors, setFieldErrors] = useState<TFieldErrors>({});
    const [submitted, setSubmitted] = useState<boolean>(false);

    const dispatch = useAppDispatch();


    const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    handleSubmit((data) => console.log(data));
    onClose?.(e);
    console.log(dispatch, 'dispatch edit')
  };

    const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
        if (!e.currentTarget) return;
        const name = e.currentTarget.name as TFieldNames;
        const value = e.currentTarget.value;
        setValue(name, value);
        console.log(getValues())
    }
    
    const handleClose = (e: MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        if (onClose) {
            onClose(e);
        } 
    }

    return (
        <div className="mt-3">
            {submitted ? <p>Thanks!</p>
            :
            <form onSubmit={onSubmit}>
            <h3>Edit Quote</h3>

            <FormFieldset attributes={{...register("text")}} errors={fieldErrors.text} type='text' name='text' id='quote-text' label='text' handleChange={handleChange}></FormFieldset>


            <Stack direction='horizontal' gap={3}>
                <Button variant="primary" type='submit'>Save <BsSave></BsSave></Button>
                <Button variant="danger" onClick={handleClose}>Cancel <BsBack></BsBack></Button>
            </Stack>
            </form>
            }
        </div>
        
    );
};

export default EditQuoteForm;
