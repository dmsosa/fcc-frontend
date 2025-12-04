import { createStrictContext } from "./createStrictContext";

export type TSidebarContext = {
    // width: number;
    // setWidth: React.Dispatch<React.SetStateAction<number>>;
    widthCheckedInLS: number;
    setWidthLS: (v: number | ((prev: number) => number)) => void;
    removeWidthLS: () => void;
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
    isResizing: boolean;
    setIsResizing: React.Dispatch<React.SetStateAction<boolean>>;
    initialWidth: number;
    minWidth: number;
    maxWidth: number;
    storageKey: string;

    appWrapperRef: React.RefObject< HTMLDivElement | null>;
};

export const [ useSidebarContext, SidebarContextProvider ] = createStrictContext<TSidebarContext>({ displayName: 'sidebarContext', errorMessage: 'No sidebar context provider found u in the tree'});

