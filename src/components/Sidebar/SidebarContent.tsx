import { FaHome } from "react-icons/fa";
import { useSidebarContext } from "../../context/sidebarContext";
import { IconList, type TIconLink } from "../Widgets/IconList";
import React, { useEffect } from "react";
import { useLocation } from "react-router";


const sidebarIcons: { [key:string ]: TIconLink } = 
    {
        'home' : {
            title: 'home',
            href: '/',
            active: false,
            svg: <FaHome/>
        }
    };


export default function SidebarContent () {
    const { expanded } = useSidebarContext();
    const [ icons, setIcons  ] = React.useState<{ [key:string ]: TIconLink }>(sidebarIcons);
    const location = useLocation();
    
    //Handle active icon
    useEffect(() => {
        for (const key of Object.keys(icons)) {
            const iconLink = icons[key];
            if (iconLink.title === location.pathname ) {
                if (!iconLink.active) {
                    setIcons((prev) => ({ ...prev, [iconLink.title]: { ...iconLink, active: true }}));
                }
            }
        }
    }, [icons]);

    return (
            <div className="sidebar-content">
                <IconList icons={Object.values(icons)} expanded={expanded}></IconList>
            </div>
  );
}


