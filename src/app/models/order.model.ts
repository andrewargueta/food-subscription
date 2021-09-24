export class Orders{
    ordersList: Order[]
}

export class Order{
    userId: number
      datePlaced: Date
      dishes: 
        {
          dish: string,
          servings: number
        }[]
      
      total: number
      status: string
}