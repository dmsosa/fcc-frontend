import type { MouseEvent } from "react";

export default function DropdownButton({ show, setShow } : { show:boolean, setShow: React.Dispatch<React.SetStateAction<boolean>> }) {
    //Dropdown Logik
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        const body = document.body;
        if (window.innerWidth < 768) {
            body.classList.toggle("no-scroll");
        }
        
        setShow(!show);

        const header = document.getElementById("site-header");
        header?.classList.toggle("active");
        e.currentTarget.classList.toggle("x");
    }
    return (
            <button className="dropdown-toggler" type="button" 
            aria-expanded={show}
            aria-label="header dropdown toggler" aria-controls="header-dropdown" onClick={handleClick}>
                <svg className="svg-content" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 500 500" width="50px" height="50px">
                    <path id="dropdown-path-1"></path>
                    <path id="dropdown-path-2"></path>
                    <path id="dropdown-path-3"></path>
                </svg>
            </button>
    )
}