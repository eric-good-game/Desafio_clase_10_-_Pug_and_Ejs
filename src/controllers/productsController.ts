import { Request, Response } from "express";
import { dataUpdate } from "../../types";
import ProductsApi from "../api/productsApi";

const productsApi = new ProductsApi('products')

async function getAll(req:Request,res:Response){
  const head_scripts = [
    '<link rel="stylesheet" href="styles/products.css">',
  ]
  const foot_scripts = [
    '<script src="scripts/products.js"></script>'
  ]

  const table_headers = ['Imagen','Nombre','Precio']
  
  const products = (await productsApi.getAll()).map(p=>{
    return {
      ...p,
      price:p.price.toFixed(2)
    };
  }).reverse();
  res.render('products',{
    products,
    table_headers,
    head_scripts,
    foot_scripts
  })
}
async function create(req:Request,res:Response){  
  
  let status:string;
  try {
    await productsApi.create(req.body)
    status='success';
  } catch (error) {
    console.log(error);
    status='error';
  }
  res.redirect(`../?status=${status}`)
}

export default {
  getAll,
  create
}