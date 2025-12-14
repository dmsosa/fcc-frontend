import BrandLogo from "../Widgets/BrandLogo";
import ThemeToggler from "../Widgets/ThemeToggler";
import { SidebarToggler } from "./SidebarToggler";

export default function SidebarHeader ({ sidebarExpanded, setSidebarExpanded }: { sidebarExpanded: boolean, setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>> }) {
    return (
            <header className="sidebar-header px-4 py-2 border-bottom border-color border-2 shadow-sm">
                <div className="d-flex justify-content-between align-items-center  ">
                    <BrandLogo expanded={sidebarExpanded}></BrandLogo>
                    <SidebarToggler sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}></SidebarToggler>
                    <ThemeToggler svgAttributes={{ width: '2rem', height: '2rem' }}></ThemeToggler>
                </div>
            </header>
  );
}


