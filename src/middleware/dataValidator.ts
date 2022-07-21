import { Request, Response } from "express";
import { Data } from "../../types";

const dataValidator = function (req:Request, res:Response, next:Function) {
  const data:Data = {};

  function validate(key:string){
    let val;
    switch (key) {
      case 'price':
        val = req.body[key]
        if(typeof(val)=='string'){
          val = parseFloat(val)
        }
        if(val<=0){
          throw Error(`The ${key} has to be greater than 0.`)
        }
        break;
      case 'name':
      case 'thumbnail':
        val = req.body[key]
        if(typeof(val) != 'string' || !val.trim()){
          throw Error(`The ${key} cannot be empty.`)
        }
        break
      
      default:
        break;
    }
    return val;
  }
  
  switch (req.method) {
    case 'POST':
      try{
        Object.keys(req.body).forEach(key=>{
          const val = validate(key)
          data[key] = val;
        })
        req.body = data;
      } catch (error) {
        console.log(error);
        res.sendStatus(400)
        return
      }
      break
    case 'PUT':
      try{

        if(!Object.keys(req.body).length) throw Error('Invalid data to update.')

        Object.keys(req.body).forEach(key=>{
          const val = validate(key)
          if(val) data[key] = val;
        })
        if(Object.keys(data).length) req.body = data;
        req.body.id = parseInt(req.params.id)
      } catch (error) {
        console.log(error);
        res.sendStatus(400)
        return
      }
      break
    case 'DELETE':
    case 'GET':
      try{
        const id = parseInt(req.params.id)
        if(id) req.body.id = id;
      } catch (error) {
        console.log(error);
        return
      }
      break
    default:
      break;
  }

  next()
}

export default dataValidator