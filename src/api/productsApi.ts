import fs from 'fs/promises'
import { dataUpdate, File, Product } from '../../types'

class ProductsApi{

  filePath
  fileName
  file:File = {
    nextId:1,
    data:[]
  }
  constructor(fileName:string,ext:string='txt'){
    this.fileName = fileName
    this.filePath = `./src/data/${fileName}.${ext}`
  }

  async getFile(){
    try {
      const data = await fs.readFile(this.filePath,'utf-8');
      if(!data) return
      this.file = JSON.parse(data)
    } catch (err:unknown) {
      if (err instanceof Error) {
        if(err.name=='SyntaxError'){
          console.log('Error en el formato de archivo.');
          
        }
        if(err.name=='Error'){
          await fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
        }
      }
    }
  }

  async getAll(){
    try {
      await this.getFile();
      return this.file.data
    } catch (error) {
      console.log(error);
      return []
    }
  }

  async getById(id:number):Promise<Product|null>{
    try {
      await this.getFile()
      const product = this.file.data.find(p=>p.id==id)
      console.log(id);
      console.log(product);
      
      return product?product:null
    } catch (error) {
      console.log(error);
      return null
    }
  }

  async create(product:Product):Promise<Product|null>{
    try {
      await this.getFile();
      product.id = this.file.nextId;
      this.file.nextId++;
      this.file.data.push(product)
      await fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
      return product
    } catch (error) {
      console.log(error);
      return null
    }
  }

  async update(product:dataUpdate){
    try {
      await this.getFile();
      this.file.data = this.file.data.map(p=>{
        if(p.id==product.id){
          product = {
            ...p,
            ...product,
          }
          return {
            ...p,
            ...product,  
          }
        }
        return p
      })
      await fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
      return product
    } catch (error) {
      console.log(error);
      return false  
    }
  }
  async deleted(id:number) {
    try {
      await this.getFile();
      const length = this.file.data.length;
      this.file.data = this.file.data.filter(p=>p.id!=id)
      if(length == this.file.data.length){
        throw Error(`El producto con id ${id} no existe.`)
      }
      fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
      return {notification:`El producto con id ${id} ha sido eliminado correctamente.`}
    } catch (error) {
      console.log(error);
      
    }
  }
}

export default ProductsApi