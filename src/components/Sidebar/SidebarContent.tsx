import { FaHome } from "react-icons/fa";
import { IconList, type TIconLink } from "../Widgets/IconList";
import { useLocation } from "react-router";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Stack from "react-bootstrap/Stack";


const sidebarIcons: TIconLink[] = 
[    
    {
        title: 'home',
        href: '/',
        active: false,
        svg: <FaHome/>
    }
];
export default function SidebarContent ({ sidebarExpanded }: { sidebarExpanded: boolean }) {
    const location = useLocation();
    console.log('loc', location)


    return (
            <div className="sidebar-content">
                <Stack  gap={2}>
                    <Button className="focus-ring focus-ring-x-3" as="a" variant="primary">
                        Button as link
                    </Button>
                    <Button className="focus-ring" as="a" variant="success">
                        Button as link
                    </Button>
                </Stack>;
                <Dropdown onToggle={(next, meta) => console.log(next, meta)}>
                  <Dropdown.Toggle className="focus-ring" bsPrefix="mak" variant="success" id="dropdown-basic">
                    Dropdown Button
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                <IconList iconLinks={sidebarIcons} expanded={sidebarExpanded}></IconList>
                <div className="container container-sm">
                                  <Stack  gap={2}>
                    <Button className="focus-ring" as="a" variant="primary">
                        Button as link
                    </Button>
                    <Button className="focus-ring" as="a" variant="success">
                        Button as link
                    </Button>
                </Stack>;
                </div>
            </div>
  );
}


