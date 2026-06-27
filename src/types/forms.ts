// Example fields our form needs to manage from Star Wars API
// The form is going to allow a user to add a new character with a series of films in which it appears.

// 		"name": "Luke Skywalker",
// 		"height": "172",
// 		"mass": "77",
// 		"hair_color": "blond",
// 		"skin_color": "fair",
// 		"eye_color": "blue",
// 		"birth_year": "19BBY",
// 		"gender": "male",
// 		"homeworld": "https://swapi.info/api/planets/1",
// 		"films": [
// 			"https://swapi.info/api/films/1",
// 			"https://swapi.info/api/films/2",
// 			"https://swapi.info/api/films/3",
// 			"https://swapi.info/api/films/6"
// 		],
// 		"species": [],
// 		"vehicles": [
// 			"https://swapi.info/api/vehicles/14",
// 			"https://swapi.info/api/vehicles/30"
// 		],
// 		"starships": [
// 			"https://swapi.info/api/starships/12",
// 			"https://swapi.info/api/starships/22"
// 		],
// 		"created": "2014-12-09T13:50:51.644000Z",
// 		"edited": "2014-12-20T21:17:56.891000Z",
// 		"url": "https://swapi.info/api/people/1"


export type TEditQuoteFormFields = {
    id?: string,
    index?: number,
    text: string,
    author: string,
}

export type TSwFormSelectFields = {
  homeworld: string,
  side: 'dark' | 'white',
}

export type TSwFormAddress = {
  street: string
  landmark: string
  number: string
  planet: string
}

export type TSwFormFields = {
  address: TSwFormAddress
  films: TSwFormFilms[]
  vehicles: TSwVehiclesFields[]
} & TSwFormCoreFields & TSwFormSelectFields


export type TSwFormCoreFields = {
  userId: string,
  createdDate: Date,
  userNo: number,
  username: string,
  mobile: string,
  email: string,
  gender: 'male' | 'female',
  height: number,
  mass: number,
  hairColor: 'blond' | 'brown',
  skinColor: 'one' | 'another',
  eyeColor: 'one' | 'another',
  totalPrice: number
  totalMinutes: number
  birthdate: Date
}

//for me, register was like taking track of a
//current input element like input type text name
//now, it is a select, which is the id of one item among 
//ordered items of my user.

export type TSwFilms = {
  id: number,
  name: string,
  minutes: number,
}
export type TSwFilmsFields = {
  id: number,
  minutes: number,
  quantity: number,
  totalMinutes: number,
}

export type TSwVehicles = {
  id: number,
  name: string,
  price: number,
}
export type TSwVehiclesFields = {
  id: number,
  price: number,
  quantity: number,
  totalPrice: number,
}
