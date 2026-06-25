export type TEditQuoteFormFields = {
    id?: string,
    index?: number,
    text: string,
    author: string,
}

export type ZahlungFormFields = {
  payMethod: string
  delivery: number
}

export type LieferaddresseFormFields = {
  street: string
  landmark: string
  number: string
  city: string
}

export type EssenFormFields = {
  address: LieferaddresseFormFields
  items: EssenItemsFormFields[]
} & EssenCoreFormFields & ZahlungFormFields


export type EssenCoreFormFields = {
  orderId: number
  orderNo: number
  username: string
  mobile: string
  email: string
  gTotal: number
  date: Date
}

//for me, register was like taking track of a
//current input element like input type text name
//now, it is a select, which is the id of one item among 
//ordered items of my user.

export type TEssenItems = {
  id: number,
  name: string,
  price: number,
}
export type EssenItemsFormFields = {
  id: number,
  price: number,
  quantity: number,
  totalPrice: number,
}
