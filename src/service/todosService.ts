import axios from "axios";
import type { TTodo } from "../store/todosSlice";

type TApiData = {
  message: string;
  todos: TTodo[];
}
const instance = axios.create({ 
    baseURL: 'https://fakeapi.com/todos'
})
const todosService = {
    getAll: async (): Promise<TTodo[]> => {
        try {
            const res = await instance.get('');
            const data = res.data as TApiData;
            console.log(data.message);
            return data.todos;
        } catch (error) {
            console.error('Fehler bei Axios Anruf:', error);
            throw error;
        }
    }
}
export default todosService;