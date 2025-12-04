import React, { useEffect, useRef, useState } from "react";

type Props = {
  // initial width in px (optional)
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
  storageKey?: string;
  // sidebar and content
  sidebar: React.ReactNode;
  children: React.ReactNode;
};

export default function ResizableSidebar({
  initialWidth = 280,
  minWidth = 200,
  maxWidth = 680,
  storageKey = "sidebarWidth",
  sidebar,
}: Props) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const draggingRef = useRef(false);
  const startXRef = useRef(0);
  const startWidthRef = useRef(initialWidth);

  // width in px
  const [width, setWidth] = useState<number>(() => {
    try {
      const stored = localStorage.getItem(storageKey);
      if (stored) {
        const n = Number(stored);
        if (!Number.isNaN(n)) return Math.min(maxWidth, Math.max(minWidth, n));
      }
    } catch {
      /* ignore */
    }
    return initialWidth;
  });

  // write width to localStorage (debounced-ish)
  useEffect(() => {
    try {
      localStorage.setItem(storageKey, String(width));
    } catch {
      /* ignore */
    }
  }, [width, storageKey]);

  // pointer / mouse handlers
  useEffect(() => {
    const onMove = (e: MouseEvent | TouchEvent) => {
      if (!draggingRef.current) return;
      let clientX: number;
      if (e instanceof TouchEvent) {
        clientX = e.touches[0]?.clientX ?? startXRef.current;
      } else {
        clientX = (e as MouseEvent).clientX;
      }

      const delta = clientX - startXRef.current;
      const newWidth = Math.min(maxWidth, Math.max(minWidth, startWidthRef.current + delta));
      setWidth(newWidth);
    };

    const onUp = () => {
      draggingRef.current = false;
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
  }, [minWidth, maxWidth]);

  const startDrag = (clientX: number) => {
    draggingRef.current = true;
    startXRef.current = clientX;
    startWidthRef.current = width;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  const onMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    startDrag(e.clientX);
  };

  const onTouchStart = (e: React.TouchEvent) => {
    startDrag(e.touches[0].clientX);
  };

  // keyboard support for accessibility
  const onKeyDown = (e: React.KeyboardEvent) => {
    // Left/Right arrows decrease/increase by step
    const step = 20;
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      setWidth((w) => Math.max(minWidth, w - step));
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      setWidth((w) => Math.min(maxWidth, w + step));
    } else if (e.key === "Home") {
      e.preventDefault();
      setWidth(minWidth);
    } else if (e.key === "End") {
      e.preventDefault();
      setWidth(maxWidth);
    }
  };

  return (
    <div ref={containerRef} className="flex h-full min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside
        className="bg-white border-r border-gray-200 overflow-auto"
        style={{ width: width }}
        aria-label="Sidebar"
      >
        {sidebar}
      </aside>

      {/* Resizer */}
      <div
        role="separator"
        aria-orientation="vertical"
        tabIndex={0}
        onKeyDown={onKeyDown}
        onMouseDown={onMouseDown}
        onTouchStart={onTouchStart}
        className="resizer"
        title="Größe ändern (Drag oder Pfeiltasten)"
        style={{ touchAction: "none" }}
      >
        {/* Visual handle */}
        <div className="h-12 w-px bg-gray-200 pointer-events-none" />
      </div>

    </div>
  );
}
