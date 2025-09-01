import type { ReactNode } from "react";
import { Link } from "react-router";


export type TLinkObject = {
    title: string,
    to: string,
    icon: ReactNode,
    state?: object,
}


function LinksListe({ links, vertical=false, expanded=false } : { links: TLinkObject[], vertical?: boolean, expanded?: boolean, }) {
    return (
        <ul className={`links-ul ${vertical ? 'links-ul-vertical': ''}`}>
            {links.map((link) => 
                (
                <li key={link.title} className={'links-li'}>
                    <Link className="link" to={link.to} state={link.state ? link.state : null} aria-expanded={expanded}>
                        {link.icon}
                        {expanded && <span>{link.title}</span>}
                    </Link>
                </li>
                )
            )}
        </ul>
    );
}
export default LinksListe;