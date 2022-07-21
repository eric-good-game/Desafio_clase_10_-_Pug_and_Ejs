import fs from 'fs/promises'

type Product = {
  name:string,
  price:number,
  thumbnail:string,
  id?:number,
}
type File = {
  nextId:number,
  data: Array<Product>
}

class Products{

  file:File = {
    nextId:1,
    data:[]
  };
  filePath:string;

  constructor(fileName:string,ext:string='txt'){
    this.filePath = `./app/data/${fileName}.${ext}`;
  }

  async getFile(){
    try {
      const json = await fs.readFile(this.filePath,'utf-8');
      if(!json){
        console.log('file empty.');
        return
      }
      const data = JSON.parse(json);
      if (!data?.nextId){
        console.log('file empty.');
        return
      }
      this.file = data;
      console.log('Get data successfully');
      
    } catch (error) {
      console.log(error);
      await fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
      console.log('File as been create');
    }
  }

  async getAll(){
    await this.getFile();
    return this.file.data;
  }

  async getById(id:number){
    let error = null;
    let item;
    await this.getFile();
    item = this.file.data.find(i=>i.id==id);
    if(!item){
      error = `The item with id ${id} don't exists.`;
    }
    return {error,item}
  }

  async create(newItem:Product){
    try {
      if(typeof(newItem) != 'object' || !Object.keys(newItem).length){
        throw new Error('The new item is not object or is empty.')
      }
      await this.getFile();
      this.file.data.push({
        ...newItem,
        id:this.file.nextId,
      })
      this.file.nextId++;
      await fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
      console.log('New item save successfully.');
    } catch (error) {
      console.log(error);
    }
  }
  async update(item:Product){

    try {
      await this.getFile();
      this.file.data = this.file.data.map(i => {
        if(i.id==item.id){
          return {
            name: item.name?item.name:i.name,
            price: item.price?item.price:i.price,
            thumbnail: item.thumbnail?item.thumbnail:i.thumbnail,
            id: i.id,
          };
        }
        return i;
      })
      
      await fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
    } catch (error) {
      console.log(error);
      
    }

  }

  async deleteById(remove_id:number){
    try {
      await this.getFile();
      const length = this.file.data.length;
      this.file.data = this.file.data.filter(i=>i.id!=remove_id);      
      if(length==this.file.data.length){
        throw new Error(`The item with id ${remove_id} don't exists.`)
      }
      await fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
      return `The item with id ${remove_id} as been deleted.`;
    } catch (error) {
      return error

    }
  }

  async deleteAll(){
    this.file.data = [];
    await fs.writeFile(this.filePath,JSON.stringify(this.file,null,2),'utf-8');
  }

}

export default Products;