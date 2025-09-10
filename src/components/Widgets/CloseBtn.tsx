import { FaX } from "react-icons/fa6";
import useToggler from "../../hooks/useToggler";
import type { MouseEvent } from "react";

export default function CloseBtn ({ value, setter, cb }: { value: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>, cb?: (...args: any) => any } ) {
    const toggler = useToggler(value, setter);
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
      toggler(e);
      if (cb) { cb() };
    }
    return (
        <button className="btn btn-danger close-btn" onClick={handleClick}>
          <FaX></FaX>
        </button>
  );
}

// heute habe ich der ganzes excel sheet GiEmptyMetalBucketHandle, und auch meine gute add zu machen LiaSteam.
// was mein zu machen app brauchst?
// was wurde german mich fragen am Ende der tages?
