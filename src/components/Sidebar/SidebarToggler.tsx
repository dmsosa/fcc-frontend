export function SidebarToggler({ sidebarExpanded, setSidebarExpanded }: { sidebarExpanded: boolean, setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>> }) {

    return ( 
        <a role="button" href="#" aria-label="sidebar-toggler" aria-expanded={sidebarExpanded} className={`link link-regular py-0 px-0 sidebar-toggler d-flex align-items-center justify-content-between ${sidebarExpanded ? 'sidebar-toggler--close' : 'sidebar-toggler--open'}`} onClick={() => setSidebarExpanded(!sidebarExpanded)}>
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
