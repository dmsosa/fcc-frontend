import { FaGithub, FaInstagram, FaLinkedin, FaSearch, FaYoutube } from "react-icons/fa";
import { type TLinkObject } from "../Widgets/LinksListe";
import { Link } from "react-router";
import { useState, type ChangeEvent } from "react";
const links: TLinkObject[] = [
    { title: 'Instagram', to: 'https://www.instagram.com/duvi_official/', icon: <FaInstagram />    },
    { title: 'GitHub', to: 'https://github.com/dmsosa/', icon: <FaGithub/> },
    { title: 'LinkedIn', to: 'https://www.linkedin.com/in/durian-sosa-807147241/', icon: <FaLinkedin /> },
    { title: 'YouTube', to: 'https://www.youtube.com/@EinfachDev', icon: <FaYoutube /> },
]; 
export default function DropdownMenu ({ show } : { show:boolean }) {
  const [ search, setSearch ] = useState('search');

      

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const value = e.currentTarget.value;
    setSearch(value);
  }
  return (
    <>
        <div id='collapsableNav' className={`collapsable collapsable-wrapper ${show ? 'collapsable-active':''}`}>
          <div className="px-3 py-3 d-flex flex-column flex-md-row px-md-2 py-md-2 gap-3 align-items-start justify-content-center align-items-md-center">
            <ul className='collapsable-nav gap-2'>
              {links.map((link) => 
                  (
                  <li key={link.title} className={'links-li'}>
                      <Link className="link fs-5 d-flex justify-content-center align-items-center" to={link.to} state={link.state ? link.state : null}>
                          {link.icon}
                          <span>{link.title}</span>
                      </Link>
                  </li>
                  )
              )}
            </ul>
            <form className="d-flex justify-content-center align-items-center">
              <input type="text" value={search} placeholder="search" onChange={handleInput}/>
              <button className="btn btn-primary"><FaSearch/></button>
            </form>
          </div>
          
        </div>
        
    </>
  );
}
