import store from "../store/store";
import type { TTodo } from "./todoData";


export const getTodoState = () => store.getState().todo;
export const getTodoIds = (): number[] =>
  getTodoState() ? getTodoState().todoIds : []

export const getTodosWithFilter = ( ): TTodo[] => {
    //For each todo, check if equals das FilterObjekt, 
    console.log('mock todos call')
    return [];
}

export function todoMatchFilter(filter: Partial<TTodo>, todo: TTodo): boolean {
    let match = true;
    Object.keys(filter).forEach((prop) => {
        if (prop === 'title') {
          const filterTitle = filter.title as string;
          if (!todo.title.toLowerCase().startsWith(filterTitle.toLowerCase())) {
            match = false;
          }
        } else if (prop && filter[prop as keyof TTodo] !== undefined) {
            if (todo[prop as keyof TTodo] !== filter[prop as keyof TTodo]) {
              console.log('prop', prop, filter[prop as keyof TTodo])
              match = false;
            }
        }
    })
    return match;
}
export function getTodoById(id: number): TTodo | null {
  console.log('todo with id not found', id);
  return null;
}