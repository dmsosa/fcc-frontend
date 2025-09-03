import type { MouseEvent } from "react";

export default function LayoutHandlers({ inputFullscreen, previewFullscreen, target }: { inputFullscreen: boolean; previewFullscreen: boolean, target: 'row' | 'col' }) {
    const onMouseDown = (e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault();
        const handler = e.currentTarget;
        const grid = document.querySelector('.grid') as HTMLElement;
        if (!grid) return;
        const target = handler.dataset.target;
        
        function startDrag(event: globalThis.MouseEvent) {
          if (target === 'row') {
            const topPos = Math.round((event.clientY * 100) / window.innerHeight);
            const botPos = 100 - topPos;
            grid.style.gridTemplateRows = `minmax(25%, ${topPos}%) minmax(25%, ${botPos}%)`;
            handler.style.top = `min(75%, (max(25%, ${topPos}%)))`;
            console.log(topPos)
          } else if (target === 'col') {
            const leftPos = Math.round((event.clientX * 100) / window.innerWidth);
            const rightPos = 100 - leftPos;
            grid.style.gridTemplateColumns = `minmax(25%, ${leftPos}%) minmax(25%, ${rightPos}%)`;
            handler.style.left = `min(75%, (max(25%, ${leftPos}%)))`;
          }
        }
        //client X ist horizontale position von das Viewport
        const stopDrag = () => {
          document.removeEventListener('mousemove', startDrag);
          document.removeEventListener('mouseup', stopDrag);
        }
          document.addEventListener('mousemove', startDrag);
          document.addEventListener('mouseup', stopDrag);
        } 
  return (
    <a href="" className={`handler handler-${target} ${inputFullscreen || previewFullscreen ? 'd-none' : ''}`} 
        onClick={(e) => { e.preventDefault() }}
        onMouseDown={onMouseDown}
        data-target={target}
        ></a>
  )
};