import { FaGithub, FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";
import { type TLinkObject } from "../Widgets/LinksListe";
import { Link } from "react-router";
const links: TLinkObject[] = [
    { title: 'Instagram', to: 'https://www.instagram.com/duvi_official/', icon: <FaInstagram />    },
    { title: 'GitHub', to: 'https://github.com/dmsosa/', icon: <FaGithub/> },
    { title: 'LinkedIn', to: 'https://www.linkedin.com/in/durian-sosa-807147241/', icon: <FaLinkedin /> },
    { title: 'YouTube', to: 'https://www.youtube.com/@EinfachDev', icon: <FaYoutube /> },
]; 
export default function CollapsableNav () {

  return (

            <div id='collapsable-nav' className={'collapsable-nav'} >
              <ul className='link-ul d-flex flex-column flex-md-row justify-content-between justify-content-md-center align-items-start align-items-md-center'>
                {links.map((link) => 
                    (
                    <li key={link.title} className={'link-li'}>
                        <Link className="link-primary link-opacity-25-hover d-flex justify-content-center align-items-center gap-2 text-decoration-none" to={link.to} state={link.state ? link.state : null}>
                            {link.icon}
                            <span>{link.title}</span>
                        </Link>
                    </li>
                    )
                )}
              </ul>
            </div>
          
  );
}
