import { Order } from './order.model'
export class User{
    id:number
    firstName:string
    lastName:string
    address: {
       housenumber: string,
       streetname:string,
       zip:string,
       country:string,
       state:string,
       city: string
    }
    login: {
        username: string,
        password: string
    }

}