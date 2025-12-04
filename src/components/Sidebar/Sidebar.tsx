import { useSidebarContext } from "../../context/sidebarContext";
import React, { useEffect, useRef } from "react";
import SidebarHeader from "./SidebarHeader";
import SidebarContent from "./SidebarContent";
import SidebarFooter from "./SidebarFooter";

export default function Sidebar () {
    const containerRef = useRef<HTMLDivElement | null>(null);
    // const resizerRef = useRef<HTMLAnchorElement | null>(null);
    // const draggingRef = useRef(false);

    const { isResizing, setIsResizing, expanded, setExpanded, setWidthLS, minWidth, maxWidth, appWrapperRef } = useSidebarContext();
    const containerClass = `sidebar-container ${expanded ? 'sidebar-container--expanded':''}`;

    const onMouseDown = (e: React.MouseEvent<HTMLAnchorElement> ) => {
            e.preventDefault();
            setIsResizing(true);
            setExpanded(true);
            document.body.style.cursor = "col-resize";
            document.body.style.userSelect = "none";
    }
    const onClick = (e: React.MouseEvent<HTMLAnchorElement> ) => {
        e.preventDefault();
    }

    const onTouchStart = (e: React.TouchEvent) => {
         e.preventDefault();
        setIsResizing(true);
        setExpanded(true);
        document.body.style.cursor = "col-resize";
        document.body.style.userSelect = "none";
    };
    
      // keyboard support for accessibility
      const onKeyDown = (e: React.KeyboardEvent) => {
        // Left/Right arrows decrease/increase by step
        const step = 20;
        if (e.key === "ArrowLeft") {
          e.preventDefault();
          setWidthLS((w) => Math.max(minWidth, w - step));
        } else if (e.key === "ArrowRight") {
          e.preventDefault();
          setWidthLS((w) => Math.min(maxWidth, w + step));
        } else if (e.key === "Home") {
          e.preventDefault();
          setWidthLS(minWidth);
        } else if (e.key === "End") {
          e.preventDefault();
          setWidthLS(maxWidth);
        }
      };



    //Resize logic
    useEffect(() => {
        if (!isResizing) return;
        const appWrapper = appWrapperRef.current;
        if (!appWrapper) return;
        if (!expanded) {
        setWidthLS(96);
        return;
        } 
        //1st solution: Mit State + Sidebar derselber Grosse als unseres clientX
        const onMove = (e: MouseEvent | TouchEvent) => {
            let clientX: number;
            if (e instanceof TouchEvent) {
                clientX = e.touches[0]?.clientX ?? minWidth;
            } else {
                clientX = (e as MouseEvent).clientX;
            }

            const clampedWidth = Math.min(maxWidth, Math.max(minWidth, clientX));
            console.log(clampedWidth, appWrapper)
            appWrapper.style.setProperty('--sidebar-width', `${clampedWidth}px`);
            appWrapper.style.setProperty('--main-content-width', `calc(100% - ${clampedWidth}px)`);

        };

        const onUp = () => {
            setIsResizing(false);
            window.removeEventListener('mousemove', onMove);
            window.removeEventListener('mouseup', onUp);
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
    }, [ minWidth, maxWidth, isResizing ]);
    
    return (
        <aside id="sidebar" className={containerClass} ref={containerRef}>
            <nav>
                <SidebarHeader></SidebarHeader>
                <SidebarContent></SidebarContent>
                <SidebarFooter></SidebarFooter>
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
        </aside>
    
  );
}


