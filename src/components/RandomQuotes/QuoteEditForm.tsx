import { type FormEvent, type MouseEvent } from 'react';
import { quoteUpdated, type TQuote } from '../../store/quotesSlice/quotesSlice';
import { useAppDispatch } from '../../store';
import { Button, Stack } from 'react-bootstrap';
import { useForm, type FieldErrors } from 'react-hook-form';
import { BsBack, BsSave } from 'react-icons/bs';
import FormFieldset from '../Widgets/Form/FormFieldset';
import { EditFormSubmitted } from '../Widgets/Form/SubmittedMessages';

//Ich kann mein Form korrekt validieren und mit submit senden.

type EditQuoteFormProps = {
  quote: TQuote;
  onClose?: (e: MouseEvent<HTMLButtonElement> | FormEvent) => void;
};

const regexpName = /^[A-Za-z]+([ A-Za-z]+)*/g;

function EditQuoteForm({ quote, onClose }: EditQuoteFormProps) {
    const { register, handleSubmit, formState,  } = useForm<TQuote>({defaultValues: {...quote}});
    const { errors, isValid, isSubmitted} = formState;

    const dispatch = useAppDispatch();

    const onValid = (data: TQuote) => dispatch(quoteUpdated(data));
    const onInvalid = (errors: FieldErrors<TQuote>) => {
            console.group();
            console.error('Error in the form:');
            console.error(errors);
            console.log("----------------");
            console.groupEnd();
        };

    const handleClose = (e: MouseEvent<HTMLButtonElement> ) => {
        e.preventDefault();
        if (onClose) {
            onClose(e);
        } 
    }

    const registerText = register("text", { 
        required: true, 
        minLength: { value: 15, message: "The text must be at least 15 chars long"}, 
        maxLength: { value: 350, message: "The length must not exceed 350 chars"}, 
        validate: {
            "containsA": (value) => value.length > 12 || "notvalid",
        }
    });
    const registerAuthor = register("author", { 
        required: true, 
        minLength: { value: 3, message: "Author's name must be at least 3"}, 
        maxLength: { value: 30, message: "The length must not exceed 500 chars"}, 
        pattern: { value: regexpName, message: "Is not a valid name" },
        // validate: {
        //     "name regexp": (value) => regexpName.test(value) || "is not a valid name"
        // }
    });
    return (
        <div className="mt-3">
            {
            isSubmitted ? 
            <EditFormSubmitted/>
            :
            <form onSubmit={handleSubmit(onValid, onInvalid)}>
                <h3>Edit Quote</h3>
                <FormFieldset 
                registerAttributes={{...registerText}}
                errors={errors.text} 
                type='textarea'
                id='quote-text' 
                label='Content:'>
                </FormFieldset>
                <FormFieldset 
                registerAttributes={{...registerAuthor}}
                errors={errors.author} 
                type='text'
                id='quote-author' 
                label='Author:'>
                </FormFieldset>


                <Stack direction='horizontal' gap={3}>
                    <Button variant="primary"  type='submit' disabled={!isValid} className='d-flex justify-content-center align-items-center gap-1'>Save <BsSave></BsSave></Button>
                    <Button variant="danger" className='d-flex justify-content-center align-items-center gap-1' onClick={handleClose}>Cancel <BsBack></BsBack></Button>
                </Stack>
            </form>
            }
        </div>
        
    );
};

export default EditQuoteForm;
