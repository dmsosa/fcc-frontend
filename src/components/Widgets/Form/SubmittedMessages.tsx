import { BiSolidHappyHeartEyes } from "react-icons/bi";
import { BsCheck } from "react-icons/bs";

export function ThankYou() {
  return (
    <div className="container mt-5">
      <div className="alert alert-success text-center shadow-sm">
        <h4 className="alert-heading">Thank you! <BiSolidHappyHeartEyes></BiSolidHappyHeartEyes></h4>
        <p>Your form has been submitted successfully.</p>
        <hr />
        <p className="mb-0">
          We’ll get back to you as soon as possible.
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
