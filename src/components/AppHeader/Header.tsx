import { useState } from "react";
import BrandLogo from "../Widgets/BrandLogo";
import CollapsableNav from "./CollapsableNav";
import CollapsableToggler from "./CollapsableToggler";

export default function Header () {
  const [ show, setShow ] = useState(false);
  return (
    <header id='header' className="header">
        <nav className="nav-wrapper position-relative">
            <BrandLogo expanded></BrandLogo>
            <CollapsableToggler show={show} setShow={setShow}></CollapsableToggler>
            <div className="collapsable-wrapper" aria-expanded={show}>
              <CollapsableNav/>
            </div>
        </nav>
    </header>
  );
}
