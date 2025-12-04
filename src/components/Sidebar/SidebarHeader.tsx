import { useSidebarContext } from "../../context/sidebarContext";
import BrandLogo from "../Widgets/BrandLogo";
import ThemeToggler from "../Widgets/ThemeToggler";
import { SidebarToggler } from "./SidebarToggler";

export default function SidebarHeader () {
    const { expanded } = useSidebarContext();
    return (
            <header className="sidebar-header">
                <div className="d-flex justify-content-between align-items-center">
                    <BrandLogo></BrandLogo>
                    <SidebarToggler role="close" expanded={expanded}></SidebarToggler>
                    <ThemeToggler></ThemeToggler>
                </div>
            </header>
  );
}


