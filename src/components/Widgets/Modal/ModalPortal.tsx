import React from 'react';
import ReactDOM from 'react-dom';
import { BsX } from 'react-icons/bs';

type ModalPortalProps = {
  title: string;
  subtitle?: string;
  show: boolean;
  children?: React.ReactNode;
  setShow: React.Dispatch<React.SetStateAction<boolean>>;
};

function ModalPortal  ({
  title,
  subtitle,
  show,
  children,
  setShow
}:ModalPortalProps) {

  const clazz = show ? 'app-modal-inner-show' : 'app-modal-inner-hide';
  return !show ? null : ReactDOM.createPortal(
    <div className='app-modal position-absolute d-flex justify-content-center align-items-center z-modal vh-100 top-0 bottom-0 start-0 end-0' onClick={() => setShow(false)}>
      <div
        className={`${clazz} app-modal-inner position-relative w-75 mx-auto bg-body-secondary border border-3 border-secondary`}
        onClick={(e) => e.stopPropagation()} // prevent close on modal click
      >
        <button className="btn btn-danger position-absolute top-0 end-0 fw-bold" onClick={() => setShow(false)}>
          <BsX></BsX>
        </button>
        <header className='bg-body-tertiary border-bottom border-3 border-secondary px-1 py-2' >
          <h2>{title}</h2>
          {subtitle && <p>{subtitle}</p>}
        </header>

        <div className='px-2 py-4'>
          {children}
        </div>
      </div>
    </div>,
    document.getElementById('root') as HTMLElement
  );
};

export default ModalPortal;
