import { useSidebarContext } from "../../context/sidebarContext";

export function SidebarToggler() {

    const { setIsResizing, expanded, setExpanded, widthCheckedInLS, appWrapperRef } = useSidebarContext();
  

    const handleExpanded = () => {
        const appWrapper = appWrapperRef.current;
        if (!appWrapper) return;
        let newWidth: number;
        if (!expanded) {
          setExpanded(false);
          newWidth = 96;
        } else {
          setExpanded(true);
          newWidth = widthCheckedInLS;
        }
        appWrapper.style.setProperty('--sidebar-width', `${newWidth}px`);
        appWrapper.style.setProperty('--main-content-width',`calc(100% - ${newWidth}px)`);
        setIsResizing(false);
    }
    return ( 
        <button className={`sidebar-toggler ${expanded ? 'sidebar-closer' : 'sidebar-opener'}`} onClick={handleExpanded}>
            <SVGArrow></SVGArrow>
        </button>
    )
}

function SVGArrow ({attributes = { viewBox: "0 0 500 500", width: "2rem", height: "2rem"}}: {attributes?: React.SVGAttributes<SVGElement>}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...attributes}>
      <path id="line1"></path>
      <path id="line2"></path>
    </svg>
  )
};
