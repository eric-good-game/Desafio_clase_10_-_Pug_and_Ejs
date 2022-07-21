import express from 'express';
import dotenv from 'dotenv';
import Products from '../src/routes/productsRoute';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static('public'));

app.set('views', __dirname + '/views')

app.set('view engine', 'ejs')

app.use(express.urlencoded({extended: true}));
app.use(express.json());

const server = app.listen(PORT,()=>{
  console.log(`Server is running on port:${PORT}`);
})

server.on( 'error', err => console.log(`Error en el servidor ${err}`) )

app.get('/',(req,res)=>{

  const css = [
    '<link rel="stylesheet" href="styles/index.css">',
    '<link rel="stylesheet" href="styles/animations.css">',
  ]
  const js = ['<script src="scripts/home.js"></script>']
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
    inputs,
    css,
    js,
  })
})

app.use('/products', Products)