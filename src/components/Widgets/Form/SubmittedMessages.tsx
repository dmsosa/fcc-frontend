import { BiSolidHappyHeartEyes } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";

export function ThankYou() {
  return (
    <div className="container mt-5">
      <div className="alert alert-success text-center shadow-sm">
        <h4 className="alert-heading">Gracias por tu colaboracion! <BiSolidHappyHeartEyes></BiSolidHappyHeartEyes></h4>
        <p>Hemos recibido tus datos con exito.</p>
        <hr />
        <p className="mb-0">
          Nuestro equipo de seleccion se pondra en contacto contigo a la mayor brevedad posible.
        </p>
      </div>
    </div>
  );
}

export function EditFormSubmitted() {
  return (
    <div className="container mt-5">
      <div className="alert alert-success text-center shadow-sm">
        <h4 className="alert-heading">Your changes were saved successfully! <BsCheck></BsCheck></h4>
        <p>Check them out.</p>
        <hr />
      </div>
    </div>
  );
}
