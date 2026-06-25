import { useState} from "react";
import { ThankYou } from "../../Widgets/Form/SubmittedMessages";
import PhantomCard from "../../Widgets/Phantom/PhamtonCard";
import { FormProvider, useForm, type UseFormReturn } from "react-hook-form";
import EssenCoreForm from "./components/EssenCoreForm";
import type { EssenCoreFormFields, EssenFormFields, EssenItemsFormFields, LieferaddresseFormFields } from "../../../types";
import EssenItemsForm from "./components/EssenItemsForm";

const initItems: EssenItemsFormFields[] = [{ id: 0, price: 0, quantity: 0, totalPrice: 0}];

const initAddress: LieferaddresseFormFields = { street: "", landmark: "", city: "", number: "" };

const initValues: EssenFormFields = {
  orderId: 0,
  orderNo: new Date().valueOf(),
  mobile: "",
  email: "",
  username: "",
  gTotal: 0,
  items: initItems,
  address: initAddress,
  date: new Date(),
  payMethod: "",
  delivery: 0,
}

export default function ContactUsForm() 
{
  const [ loading, setLoading ] = useState(false);
  const [ sent, setSent ] = useState(false);
  const methods: UseFormReturn<EssenCoreFormFields> = useForm<EssenCoreFormFields>(
  { 
    defaultValues: async (): Promise<EssenCoreFormFields> => {
      return new Promise((resolve) => resolve(initValues));
    }, 
  });

  const { handleSubmit, } = methods;

  const onSubmit = (data: EssenCoreFormFields) => {
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
