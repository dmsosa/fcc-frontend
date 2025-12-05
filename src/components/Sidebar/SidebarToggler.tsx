import type { MouseEvent } from "react";
import { useSidebarContext } from "../../context/sidebarContext";

export function SidebarToggler() {

    const { setIsResizing, expanded, setExpanded, widthCheckedInLS, appWrapperRef } = useSidebarContext();


    const handleExpanded = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const appWrapper = appWrapperRef.current;
        if (!appWrapper) return;
        let newWidth: number;
        console.log(expanded);
        console.log(widthCheckedInLS);
        if (!expanded) {
          setExpanded(true);
          newWidth = widthCheckedInLS;
        } else {
          setExpanded(false);
          newWidth = 96;
        }
        appWrapper.style.setProperty('--sidebar-width', `${newWidth}px`);
        appWrapper.style.setProperty('--main-content-width',`calc(100% - ${newWidth}px)`);
        setIsResizing(false);
    }
    return ( 
        <a role="button" aria-label="sidebar-toggler" aria-expanded={expanded} className={`themed-border border-1 themed-bg py-0 px-0 sidebar-toggler ${expanded ? 'sidebar-toggler--close' : 'sidebar-toggler--open'}`} onClick={handleExpanded}>
            <SVGArrow></SVGArrow>
        </a>
    )
}

function SVGArrow ({attributes = { viewBox: "0 0 500 500"}}: {attributes?: React.SVGAttributes<SVGElement>}) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" {...attributes}>
      <path id="line1"></path>
    </svg>
  )
};
