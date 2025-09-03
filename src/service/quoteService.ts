import axios from "axios";

export type TQuote = {
    q: string,
    a: string
};
export type TQuoteAxios = {
    quote: string,
    author: string
};
export type TQuoteData = {
    quotes: TQuoteAxios[],
};
const instance = axios.create({ 
    baseURL: 'https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json'
})

const formatData = (data: TQuoteData): TQuote[] => {
    return data.quotes.map((item) => ({ q: item.quote, a: item.author }));
}
export async function getQuoteArray(): Promise<TQuote[]> {
    try {
        const res = await instance.get('');
        const data = res.data;
        return formatData(data);
    } catch (error) {
        throw error;
    }
}