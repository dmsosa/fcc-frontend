import type { MouseEvent } from "react";

export default function CollapsableToggler({ show, setShow } : { show:boolean, setShow: React.Dispatch<React.SetStateAction<boolean>> }) {
    //Dropdown Logik
    const handleClick = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const body = document.body;
        if (window.innerWidth < 768) {
            body.classList.toggle("no-scroll");
        }
        
        setShow(!show);
        e.currentTarget.classList.toggle("x");
    }
    return (
            <a href="#" role="button" className="collapsable-toggler link link-regular" type="button" 
            aria-expanded={show} target="collapsable-nav"
            aria-label="header dropdown toggler" aria-controls="header-dropdown" onClick={handleClick}>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500">
                    <path id="dropdown-path-1"></path>
                    <path id="dropdown-path-2"></path>
                    <path id="dropdown-path-3"></path>
                </svg>
            </a>
    )
}