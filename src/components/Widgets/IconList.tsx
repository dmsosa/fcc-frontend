import type { ReactNode } from "react";

export type TIconLink = {
    title: string,
    href: string,
    active?: boolean,
    svg?: ReactNode,
}
export function IconList({ icons, expanded=false }: { icons: TIconLink[], expanded?: boolean }) {
    return (
        <ul className="icon-list">
            {icons.map((icon) => {
                const clazz = `icon-list-li ${icon.active ? 'active':''}`;
                return (
                    <li key={icon.title} className={clazz}>
                        <a className="link" href={icon.href}>
                            {icon.svg}
                            { expanded && <span>{icon.title}</span>}
                        </a>
                    </li>
                )
            })}
        </ul>
    )
}
