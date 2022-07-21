export type Product = {
  name:string,
  price:number,
  thumbnail:string,
  id:number|null
}

export type File = {
  nextId:number,
  data:Product[]
}

export type dataUpdate = {
  name?:string,
  price?:number,
  thumbnail?:string,
  id:number
}

type Data = {
  [key: string]:string|number
}