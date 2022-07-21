import express from 'express';
import dotenv from 'dotenv';
import Products from '../src/routes/productsRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.set('view engine', 'pug')

app.use(express.static('public'));

app.set('views', __dirname + '/views')

app.use(express.json());
app.use(express.urlencoded({extended: true}));

const server = app.listen(PORT,()=>{
  console.log(`Server is running on port:${PORT}`);
})

server.on( 'error', err => console.log(`Error en el servidor ${err}`) )

app.use('/products', Products)

app.get('/',(req,res)=>{

  const inputs = [
    {
      label:'Nombre',
      id:'name',
      name:'name',
      required:true,
      type:"text",
      placeholder:"Globo Terráqueo",
    },
    {
      label:'Precio',
      id:'price',
      name:'price',
      required:true,
      type:"number",
      placeholder:"345.67",
      step:"0.01"
    },
    {
      label:'Imagen',
      id:'thumbnail',
      name:'thumbnail',
      required:true,
      type:"text",
      placeholder:"https://cdn3.iconfinder.com/globot.png",
    }

  ]

  res.render('index',{
    inputs
  })
})

export default app