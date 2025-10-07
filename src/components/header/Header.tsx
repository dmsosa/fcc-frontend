import { useState } from "react";
import BrandLogo from "../Widgets/BrandLogo";
import DropdownButton from "./DropdownButton";
import DropdownMenu from "./DropdownMenu";

export default function Header () {
  const [ show, setShow ] = useState(false);
  return (
    <header id='header' className="header">
        <nav className="nav-wrapper">
            <BrandLogo expanded></BrandLogo>
            <DropdownButton show={show} setShow={setShow}></DropdownButton>
            <DropdownMenu  show={show} />
        </nav>
    </header>
  );
}
