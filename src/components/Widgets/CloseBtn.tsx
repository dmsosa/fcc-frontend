import { FaX } from "react-icons/fa6";
import type { MouseEventHandler } from "react";

export default function CloseBtn ({ handleClick }: { handleClick: MouseEventHandler} ) {
    return (
        <button className="btn btn-danger close-btn" onClick={handleClick}>
          <FaX></FaX>
        </button>
  );
}

// heute habe ich der ganzes excel sheet GiEmptyMetalBucketHandle, und auch meine gute add zu machen LiaSteam.
// was mein zu machen app brauchst?
// was wurde german mich fragen am Ende der tages?
