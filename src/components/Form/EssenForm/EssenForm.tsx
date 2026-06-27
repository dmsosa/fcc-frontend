import { useState} from "react";
import { ThankYou } from "../../Widgets/Form/SubmittedMessages";
import PhantomCard from "../../Widgets/Phantom/PhamtonCard";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import EssenCoreForm from "./components/EssenCoreForm";
import type { TSwFilmsFields, TSwFormAddress, TSwFormFields, TSwVehiclesFields } from "../../../types";
import EssenItemsForm from "./components/EssenItemsForm";

const initVehicles: TSwVehiclesFields[] = [{ id: 0, price: 0, quantity: 0, totalPrice: 0}];
const initFilms: TSwFilmsFields[] = [{ id: 0, minutes: 0, quantity: 0, totalMinutes: 0}];

const initAddress: TSwFormAddress = { street: "", landmark: "", planet: "", number: "" };

const initValues: TSwFormFields = {
  createdDate: new Date(),
  userId: "0",
  userNo: new Date().valueOf(),
  mobile: "",
  email: "",
  username: "",
  gender: 'female',
  homeworld: '',
  totalPrice: 0,
  totalMinutes: 0,
  vehicles: initVehicles,
  films: initFilms,
  address: initAddress,
  birthdate: new Date(),
  side: 'white',
  height: 0,
  mass: 0,
  eyeColor: 'another',
  skinColor: 'another',
  hairColor: 'blond',
}

export default function ContactUsForm() 
{
  const [ loading, setLoading ] = useState(false);
  const [ sent, setSent ] = useState(false);
  const methods: UseFormReturn<TSwFormFields> = useForm<TSwFormFields>(
  { 
    defaultValues: async (): Promise<TSwFormFields> => {
      return new Promise((resolve) => resolve(initValues));
    }, 
  });

  const { handleSubmit, } = methods;

  const onSubmit = (data: TSwFormFields) => {
    console.log("data isss\n", data);
    setLoading(true);
    console.log(setSent);
    setTimeout( () => {
      setLoading(false);
    }, 3000)
  };

  return (
    <div className="card bg-body card-rounded container px-2 py-5">
      { loading ? <PhantomCard></PhantomCard> :
        sent ? <ThankYou></ThankYou> :
        <FormProvider {...methods}>
          <form id="contact-form"  onSubmit={handleSubmit(onSubmit)} className="contact-form app-form">
            <legend className="h1 text-left px-4">Consultar tus cursos</legend>
            <EssenCoreForm></EssenCoreForm>
            <EssenItemsForm></EssenItemsForm>
          </form>
        </FormProvider>
      }
    </div>
  );
}
