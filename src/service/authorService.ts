import axios from "axios";
import { type TQuote } from "../store/quotesSlice/quotesSlice";
import { v4 } from "uuid";
import type { TAuthor } from "../store/authorSlice/authorSlice";

type TApiData = [
    {
        
    }
]
export type TQuoteAxios = {
    quote: string,
    author: string
};

const instance = axios.create({ 
    baseURL: 'https://api.api-ninjas.com/v1/celebrity',
    headers: { 
        'X-Api-Key': 'JRKYPLEB/C5eo8e8XSA0Fg==sVaJ6ihD7GT6OO34'
    },
})
const formatQuotesToArray = ({ quotes }: TApiData): TQuote[] => {
    return quotes.map((item, index) => ({ index, id: v4(), text: item.quote, author: item.author.trim().replace("–","").replace("-","") }));
}
const quotesService = {
    getAuthorInfo: async (name: string): Promise<TAuthor> => {
        try {
            const res = await instance.request({ url: '', params: { name }});
            const data = res.data as TApiData;
            return formatQuotesToArray(data);
        } catch (error) {
            console.error('Fehler bei Axios Anruf:', error);
            throw error;
        }
    }
}
export default quotesService;