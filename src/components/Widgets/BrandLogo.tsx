import whiteLogo from "../../assets/img/logo.png";
import blackLogo from "../../assets/img/logo-black.png"
import { useEffect, useState } from "react";

function BrandLogo({ expanded=false }: { expanded?: boolean}) {

    const [ theme, setTheme ] = useState();
    const [ logo, setLogo ] = useState(blackLogo);
    
    useEffect(() => {
        console.log(setTheme)
        if ( theme === 'light' ) {
            setLogo(blackLogo);
        } else {
            setLogo(whiteLogo);
        }
    }, [theme])
    return (
        <a className="logo">
            <img src={logo}></img>
            {expanded && <span>dmsosa</span>}
        </a>
    )
}

export default BrandLogo;