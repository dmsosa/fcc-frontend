import { FaHome } from "react-icons/fa";
import { useSidebarContext } from "../../context/sidebarContext";
import { IconList, type TIconLink } from "../Widgets/IconList";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Stack from "react-bootstrap/Stack";


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
                <Stack  gap={2}>
                    <Button as="a" variant="primary">
                        Button as link
                    </Button>
                    <Button as="a" variant="success">
                        Button as link
                    </Button>
                </Stack>;
                <Dropdown onToggle={(next, meta) => console.log(next, meta)}>
                  <Dropdown.Toggle bsPrefix="mak" variant="success" id="dropdown-basic">
                    Dropdown Button
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <IconList iconLinks={Object.values(icons)} expanded={expanded}></IconList>
                <div className="container container-sm">
                                  <Stack  gap={2}>
                    <Button as="a" variant="primary">
                        Button as link
                    </Button>
                    <Button as="a" variant="success">
                        Button as link
                    </Button>
                </Stack>;
                </div>
            </div>
  );
}


