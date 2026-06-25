import type { EssenFormFields, TEssenItems } from "../types"

export const getEssenItems = () => {
  return [
    { id: 1, name: "Chicken Tenders", price: 3.5 },
    { id: 2, name: "GC. Sandwich", price: 3.99 },
    { id: 3, name: "Soup", price: 2.5 },
    { id: 4, name: "Onion Rings", price: 2.99 },
    { id: 5, name: "Fries", price: 1.99 },
    { id: 6, name: "SP. Fries", price: 2.49 },
    { id: 7, name: "Sweet Tea", price: 1.79 },
    { id: 8, name: "Botttle Water", price: 1 },
    { id: 9, name: "Canned Drinks", price: 1 },
  ] as TEssenItems[]
}

const ORDER_KEY = 'order'
export const createOrder = (order: EssenFormFields) => {
  localStorage.setItem(ORDER_KEY, JSON.stringify(order))
}

export const fetchLastOrder = async (): Promise<EssenFormFields | null> => {
  await new Promise((resolve) => setTimeout(resolve, 2000))
  const order = localStorage.getItem(ORDER_KEY)
  if (order == null) return null
  else return JSON.parse(order)
}
