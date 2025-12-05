import whiteLogo from "../../assets/img/logo.png";
import blackLogo from "../../assets/img/logo-black.png"
import { useEffect, useState } from "react";
import { useThemeContext } from "../../context/themeContext";

function BrandLogo({ expanded=false }: { expanded?: boolean}) {

    const { theme } = useThemeContext();
    const [ logo, setLogo ] = useState(blackLogo);
    
    useEffect(() => {
        if ( theme === 'light' ) {
            setLogo(blackLogo);
        } else {
            setLogo(whiteLogo);
        }
    }, [theme])
    return (
        <a className="logo link">
            <img src={logo}></img>
            {expanded && <span>dmsosa</span>}
        </a>
    )
}

export default BrandLogo;