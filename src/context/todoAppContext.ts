import { createStrictContext } from "./createStrictContext";

export type TTodoAppContext = {
    editModalShow: boolean;
    setEditModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    deleteModalShow: boolean;
    setDeleteModalShow: React.Dispatch<React.SetStateAction<boolean>>;
    targetId: number | undefined;
    setTargetId: React.Dispatch<React.SetStateAction<number | undefined>>;
}
export const  [ useTodoContext, TodoContextProvider ] = createStrictContext<TTodoAppContext>()
