import { createStrictContext } from "./createStrictContext";

export type TSidebarContext = {
    expanded: boolean;
    setExpanded: React.Dispatch<React.SetStateAction<boolean>>;
};

export const [ useSidebarContext, SidebarContextProvider ] = createStrictContext<TSidebarContext>({ displayName: 'sidebarContext', errorMessage: 'No sidebar context provider found u in the tree'});