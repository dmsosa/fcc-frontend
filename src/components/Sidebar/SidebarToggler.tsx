import { useSidebarContext } from "../../context/sidebarContext";

interface ISidebarTogglerProps {
    role: 'open' | 'close';
}

export function SidebarToggler({ role='open' }: ISidebarTogglerProps ) {

    const { expanded, setExpanded } = useSidebarContext();

    const toOpen = role === 'open';
    const clazzRole = toOpen ? 'sidebar-opener' : 'sidebar-closer';
    const visibility = toOpen ? expanded ? 'hidden d-none' : 'visible d-block' : expanded ? 'visible d-block' : 'hidden d-none';
    const clazz = `sidebar-toggler ${clazzRole} ${visibility}`;

    const onClick = () => {
      if (toOpen) {
        setExpanded(true);
      } else {
        setExpanded(false);
      }
    }
    return ( 
        <button className={clazz} onClick={onClick}>
            <SVGArrow attributes={{ width: "2rem", height: "2rem"}}></SVGArrow>
        </button>
    )
}

function SVGArrow ({attributes}: {attributes: React.SVGAttributes<SVGElement>}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="50 50 400 400" {...attributes}>
      <path id="line1" d="M 300 400 L 100.318 254.085 L 300 100"></path>
      <path id="line2" d="M 347.104 360.106 L 200.992 254.085 L 347.995 139.156"></path>
    </svg>
  )
};
