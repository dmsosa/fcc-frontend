import { useSidebarContext } from "../../context/sidebarContext";
import BrandLogo from "../Widgets/BrandLogo";
import ThemeToggler from "../Widgets/ThemeToggler";
import { SidebarToggler } from "./SidebarToggler";

export default function SidebarHeader () {
    const { expanded } = useSidebarContext();
    return (
            <header className="sidebar-header px-4 py-2 border-bottom border-color border-2 shadow-sm">
                <div className="d-flex justify-content-between align-items-center  ">
                    <BrandLogo expanded={expanded}></BrandLogo>
                    <SidebarToggler role="close"></SidebarToggler>
                    <ThemeToggler svgAttributes={{ width: '2rem', height: '2rem' }}></ThemeToggler>
                </div>
            </header>
  );
}


