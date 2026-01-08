import { useDispatch } from 'react-redux';
import { quoteAdded, type TQuote } from '../../store/quotesSlice/quotesSlice';
import { type AppDispatch } from '../../store';
import { useState, type ChangeEvent, type FormEvent } from 'react';

const AddQuotes = () => {
  const dispatch = useDispatch<AppDispatch>();

  const [{ text, author }, setForm ] = useState<Partial<TQuote>>({});
  const [active, setActive ] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    if (!text || !author) return;

    dispatch(quoteAdded(text, author));
    setForm({});
    setActive(false);
  };

const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement> ) => {
    if (!active) setActive(true);
    const name = e.currentTarget.name;
    const value = e.currentTarget.value;
    setForm((prev) => ({ ...prev, [name]: value }))
  };


  return (
    <form onSubmit={handleSubmit}>
      <h3>Add New Quote</h3>

      <div>
        <label>Quote</label>
        <textarea
        name='text'
          value={text ?? ''}
          onChange={handleChange}
          placeholder="Enter quote text"
        />
      </div>

      <div>
        <label>Author</label>
        <input
            name='author'
          type="text"
          value={author ?? ''}
          onChange={handleChange}
          placeholder="Enter author name"
        />
      </div>

      <button type="submit">Add Quote</button>
    </form>
  );
};

export default AddQuotes;
