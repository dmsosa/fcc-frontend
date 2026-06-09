// import type { ReactNode } from 'react';
// import { createPortal } from 'react-dom';
// import { createRoot } from 'react-dom/client';

// type TUseDeleteConfirmOptions = {
//     title: string,
//     message: string,
//     actions: (onConfirm: () => void, onCancel: () => void) => ReactNode,
//     onConfirm: (close: () => void) => void,
//     onCancel?: () => void;
// }

// const defaultOptions: TUseDeleteConfirmOptions = {
//   title: 'string',
//   message: 'string',
//   actions: (onConfirm: () => void, onCancel: () => void) => console.log('ReactNode'),
//   onConfirm: () => console.log('con'),
//   onCancel?: () => console.log('con'),
// }
// function useDeleteConfirm(options: TUseDeleteConfirmOptions = defaultOptions) {
//   function handleClose() {
//     const deleteConfirmationRoot = document.getElementById('delete-confirmation-root');
//     if (deleteConfirmationRoot) {
//       document.body.removeChild(deleteConfirmationRoot);
//     }
//   }

//   function handleConfirm(onConfirm) {
//     onConfirm(handleClose);
//   }

//   function handleCancel(onCancel) {
//     onCancel?.();
//     handleClose();
//   }

//   function requestConfirmation(item) {
//     if (!item || typeof item.onConfirm !== 'function' || typeof item.actions !== 'function') {
//       throw new Error('Invalid configuration for useDeleteConfirmation hook.');
//     }

//     let deleteConfirmationRoot = document.getElementById('delete-confirmation-root');
//     if (!deleteConfirmationRoot) {
//       deleteConfirmationRoot = document.createElement('div');
//       deleteConfirmationRoot.id = 'delete-confirmation-root';
//       document.body.appendChild(deleteConfirmationRoot);
//     }

//     createRoot(deleteConfirmationRoot).render(
//       createPortal(
//       <div className={`fixed inset-0 bg-black/50 flex items-center justify-center z-50 ${options.rootClassName || ''}`}>
//           <div className={`bg-white p-6 rounded-md shadow-md max-w-md w-full ${options.modalClassName || ''}`}>
//             <div>{item.title}</div>
//             <div className="mt-2">{item.message}</div>
//             {item.actions(
//               () => handleConfirm(item.onConfirm),
//               () => handleCancel(item.onCancel)
//             )}
//           </div>
//         </div>,
//         deleteConfirmationRoot,
//         deleteConfirmationRoot.id
//       )
//     );
//   }

//   return { requestConfirmation };
// }

// export default useDeleteConfirm;