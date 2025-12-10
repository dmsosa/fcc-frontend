import type { ForwardRefExoticComponent, ReactNode, RefAttributes } from "react";
import { Link, type LinkProps } from "react-router";

export type TIconLink = {
    title: string,
    href: string,
    active?: boolean,
    state?: ForwardRefExoticComponent<LinkProps & RefAttributes<HTMLAnchorElement>>,
    svg?: ReactNode,
}
export function IconList({ iconLinks, expanded=false }: { iconLinks: TIconLink[], expanded?: boolean }) {
    return (
        <ul className="icon-list">
            {iconLinks.map((link) => {
                const clazz = `icon-list-li ${link.active ? 'active':''}`;
                return (
                    <li key={link.title} className={clazz}>
                        <Link to={link.href} state={link.state}>
                            {link.svg}
                            { expanded && <span>{link.title}</span>}
                        </Link>
                    </li>
                )
            })}
        </ul>
    )
}
