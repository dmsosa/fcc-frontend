import { useState, type ChangeEvent, type FormEvent } from "react";
import { ThankYou } from "../Widgets/Form/SubmittedMessages";
import PhantomCard from "../Widgets/Phantom/PhamtonCard";

const initForm = {
  nombre: undefined,
  apellidos: undefined, 
  email: undefined, 
  carreras: undefined, 
  comentario: undefined, 
  gdpr: undefined
}

export default function ContactUsForm() 
{
  const [ loading, setLoading ] = useState(true);
  const [ sent, setSent ] = useState(false);
  const [{ nombre, apellidos, email, comentario, gdpr }, setForm] = useState(initForm);
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    console.log(setSent);
    // setTimeout( () => {
    //   setLoading(false);
    //   setSent(true);
    // } ,6000)
  }
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const name = e.target.name;
    const value = e.target.value;

    setForm((form) => ({ ...form, [name]: value }));
  }
  return (
    <div className="card bg-body card-rounded container">
      { loading ? <PhantomCard></PhantomCard> :
        sent ? <ThankYou></ThankYou> :
        <form id="contact-form"  onSubmit={handleSubmit} className="contact-form app-form">
          <legend className="h1">Consultar tus cursos</legend>
          <fieldset className="form-fieldset">
            <input id="nombre" placeholder="" className="form-fieldset-input" type="text" required value={nombre} onChange={handleChange}></input>
            <label htmlFor="nombre" className="bg-body" >Nombre</label>
          </fieldset>

          <fieldset  className="form-fieldset">
            <input id="apellidos" placeholder="" className="form-fieldset-input" type="text" value={apellidos} onChange={handleChange}></input>
            <label htmlFor="apellidos" className="bg-body" >Apellidos</label>
          </fieldset>

          <fieldset className="form-fieldset">
            <input id="email" placeholder="" className="form-fieldset-input" type="email" required value={email} onChange={handleChange}></input>
            <label htmlFor="email" className="bg-body" >Email</label>
          </fieldset>

          <fieldset className="form-fieldset">
            <label htmlFor="carreras" >Carreras de interes</label>
            <select id="carreras" aria-placeholder="" className="form-fieldset-select" name="carreras">
              <option value="" disabled selected>Carreras de interes*</option>
              <option value="Medicina">Medicina</option>
              <option value="Ciencias">Ciencias</option>
              <option value="Psicologia">Psicologia</option>
              <option value="Ciencias-Sociales">Ciencias Sociales</option>
              <option value="Tecnologia">Tecnologia</option>
              <option value="Arte">Arte</option>
            </select>
          </fieldset>

          <fieldset className="form-fieldset">
            <textarea className="form-fieldset-input" required value={comentario} onChange={handleChange}></textarea>
            <label className="bg-body">Dejanos un comentario</label>
          </fieldset>

          <fieldset className="form-fieldset">
            <input type="checkbox" className="form-fieldset-input" required  value={gdpr} onChange={handleChange}/>
            <label className="bg-body">Aceptar RGPD</label>
          </fieldset>

          <div className="d-flex justify-content-center align-items-center">
              <button type="submit" className="btn btn-primary">
              Send Message
              </button>
              <button role="clear" className="btn btn-danger">
              Cancel
              </button>
          </div>
        </form>
      }
    </div>
  );
}
