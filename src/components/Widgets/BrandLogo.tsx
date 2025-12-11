import whiteLogo from "../../assets/img/logo.png";
import blackLogo from "../../assets/img/logo-black.png"
import { useThemeContext } from "../../context/themeContext";
import { useEffect, useState } from "react";

function BrandLogo({ expanded=false }: { expanded?: boolean}) {
    const { theme } = useThemeContext();
    const [logo, setLogo ] = useState(theme === 'dark' ? blackLogo : whiteLogo);
    useEffect(() => {
        if (theme === 'dark') {
            setLogo(whiteLogo);
        } else {
            setLogo(blackLogo);

        }
    }, [theme])
    //check theme iin localStorage
    //theme is dark
    //theme is Dark
    return (
        <a className="logo link-regular">
            <img src={logo}></img>
            {expanded && <span>dmsosa</span>}
        </a>
    )
}

export default BrandLogo;