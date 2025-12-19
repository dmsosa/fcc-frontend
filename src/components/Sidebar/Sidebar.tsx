import React, { useEffect, useRef, useState } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import SidebarFooter from "./SidebarFooter";
import { useLocalStorage } from "../../hooks";

const SIDEBAR_MIN_WIDTH = 240;
const SIDEBAR_MAX_WIDTH = 400;
const STORAGE_KEY = 'sidebarWidth';

export default function Sidebar ({ sidebarExpanded, setSidebarExpanded }: { sidebarExpanded: boolean, setSidebarExpanded: React.Dispatch<React.SetStateAction<boolean>> }) {
    // const resizerRef = useRef<HTMLAnchorElement | null>(null);
    // const draggingRef = useRef(false);

    const startXRef = useRef<number>(0);
    const sidebarWrapperRef = useRef<HTMLDivElement | null>(null);
    const [ isResizing, setIsResizing ] = useState<boolean>(false);
    const [ width, setWidthLS ] = useLocalStorage<number>(STORAGE_KEY, SIDEBAR_MIN_WIDTH, { ns: 'fcc-sidebar' });
    const containerClass = `sidebar-container ${sidebarExpanded ? 'sidebar-container--expanded':''}`;

    const onMouseDown = (e: React.MouseEvent<HTMLAnchorElement> ) => {
            e.preventDefault();
            setIsResizing(true);
            setSidebarExpanded(true);
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
    }
    const onClick = (e: React.MouseEvent<HTMLAnchorElement> ) => {
        e.preventDefault();
    }

    const onTouchStart = (e: React.TouchEvent) => {
         e.preventDefault();
        setIsResizing(true);
        setSidebarExpanded(true);
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    };

      // keyboard support for accessibility
    const onKeyDown = (e: React.KeyboardEvent) => {
        // Left/Right arrows decrease/increase by step
        const step = 20;
        setSidebarExpanded(true);
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setWidthLS((w) => Math.max(SIDEBAR_MIN_WIDTH, w - step));
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setWidthLS((w) => Math.min(SIDEBAR_MAX_WIDTH, w + step));
        } else if (e.key === "Home") {
          e.preventDefault();
          setWidthLS(SIDEBAR_MIN_WIDTH);
        } else if (e.key === "End") {
          e.preventDefault();
          setWidthLS(SIDEBAR_MAX_WIDTH);
        }
    };

    //CSS Custom Property setzen (nur 1 Mal)
    useEffect(() => {
                console.log(width + 'resi')

        const sidebarWrapper = sidebarWrapperRef.current;
        if (!sidebarWrapper) return;
        if (width !== SIDEBAR_MIN_WIDTH) {
            const clampedWidth = Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, width));
            sidebarWrapper.style.setProperty('--sidebar-width', `${clampedWidth}px`);
        }
    }, []);

    //Resize logic
    useEffect(() => {
        if (!isResizing) return;
        const sidebarWrapper = sidebarWrapperRef.current;
        if (!sidebarWrapper) return;
        
        //1st solution: Mit State + Sidebar derselber Grosse als unseres clientX
        const onMove = (e: MouseEvent | TouchEvent) => {
            let clientX: number;
            if (e instanceof TouchEvent) {
                clientX = e.touches[0]?.clientX ?? SIDEBAR_MIN_WIDTH;
            } else {
                clientX = (e as MouseEvent).clientX;
            }
            const delta = clientX - startXRef.current;
            const clampedWidth = Math.min(SIDEBAR_MAX_WIDTH, Math.max(SIDEBAR_MIN_WIDTH, delta));
            setSidebarExpanded(true);
            setWidthLS(clampedWidth);
            sidebarWrapper.style.setProperty('--sidebar-width', `${clampedWidth}px`);
        };

        const onUp = () => {
            setIsResizing(false);
            document.body.style.cursor = "";
            document.body.style.userSelect = "";
        };

        window.addEventListener("mousemove", onMove);
        window.addEventListener("touchmove", onMove, { passive: false });
        window.addEventListener("mouseup", onUp);
        window.addEventListener("touchend", onUp);
        window.addEventListener("touchcancel", onUp);

        return () => {
            window.removeEventListener("mousemove", onMove);
            window.removeEventListener("touchmove", onMove);
            window.removeEventListener("mouseup", onUp);
            window.removeEventListener("touchend", onUp);
            window.removeEventListener("touchcancel", onUp);
        };
    }, [ SIDEBAR_MIN_WIDTH, SIDEBAR_MAX_WIDTH, isResizing ]);
    
    return (
        <aside id="sidebar" className={containerClass} ref={sidebarWrapperRef}>
            <div className="sidebar-inner">
                <nav>
                    <SidebarHeader sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}></SidebarHeader>
                    <SidebarContent sidebarExpanded={sidebarExpanded}></SidebarContent>
                    <SidebarFooter sidebarExpanded={sidebarExpanded} setSidebarExpanded={setSidebarExpanded}></SidebarFooter>
                </nav>
                {/* Resizer */}
                <a
                    role="separator"
                    aria-orientation="vertical"
                    tabIndex={0}
                    onClick={onClick}
                    onKeyDown={onKeyDown}
                    onMouseDown={onMouseDown}
                    onTouchStart={onTouchStart}
                    className="resizer"
                    title="Größe ändern (Drag oder Pfeiltasten)"
                    style={{ touchAction: "none" }}
                >
                    {/* Visual handle */}
                    <div className="h-12 w-px bg-gray-200 pointer-events-none" />
                </a>
            </div>
        </aside>
    
  );
}


