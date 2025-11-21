import CloseBtn from "../CloseBtn";
import type { ReactNode } from "react";



export default function ModalContainer ({ show, setter, id, children }: { show: boolean, setter: React.Dispatch<React.SetStateAction<boolean>>, id: string, children: ReactNode | ReactNode[] }) {

    return (
        <div className={`modal modal-flex p-3 ${show ? 'show': 'hide'}`} id={id}>
            <div className="modal-inner box container p-3">
                <CloseBtn value={show} setter={setter}/> 
                { children }
            </div>
        </div>
  );
}



