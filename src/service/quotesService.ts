import axios from "axios";
import { type TQuote } from "../store/quotesSlice/quotesSlice";
import { v4 } from "uuid";

type TApiData = {
    quotes: { quote: string, author: string }[];
}
export type TQuoteAxios = {
    quote: string,
    author: string
};

const instance = axios.create({ 
    baseURL: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
})
const formatQuotesToArray = ({ quotes }: TApiData): TQuote[] => {
    return quotes.map((item, index) => ({ index, id: v4(), text: item.quote, author: item.author }));
}
const quotesService = {
    getAll: async (): Promise<TQuote[]> => {
        try {
            const res = await instance.get('');
            const data = res.data as TApiData;
            return formatQuotesToArray(data);
        } catch (error) {
            console.error('Fehler bei Axios Anruf:', error);
            throw error;
        }
    }
}
export default quotesService;