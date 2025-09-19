import { createContext, type SetStateAction } from "react";

type TTodoModalContext = {
    showEdit: boolean,
    showDelete: boolean,
    setShowEdit: React.Dispatch<SetStateAction<boolean>> | undefined,
    setShowDelete: React.Dispatch<SetStateAction<boolean>> | undefined,
    targetId: null
}
const defaultContext: TTodoModalContext = {
    showEdit: false,
    showDelete: false,
    setShowEdit: undefined,
    setShowDelete: undefined,
    targetId: null
}
const TodoModalContext = createContext<TTodoModalContext>({ defaultContext });