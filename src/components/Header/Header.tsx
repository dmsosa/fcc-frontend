import { useState } from "react";
import BrandLogo from "./BrandLogo";
import DropdownButton from "./DropdownButton";
import DropdownMenu from "./DropdownMenu";

export default function Header () {
  const [ show, setShow ] = useState(false);
  return (
    <header id='header' className="header">
        <nav className="nav-wrapper">
            <BrandLogo></BrandLogo>
            <DropdownButton show={show} setShow={setShow}></DropdownButton>
            <DropdownMenu  show={show} />
        </nav>
    </header>
  );
}
