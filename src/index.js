import express from "express";
import morgan from "morgan";
import cors from 'cors';
import path from 'path';
import productosRouter from "./routes/productos.routes";
import './database'
import authRouter from './routes/usuarios.routes'

//crear una instancia de express
const app = express();

//creamos una variable
app.set("port", process.env.PORT || 4000);
//usar el puerto
app.listen( app.get('port'),()=>{
    console.log('Estoy en el puerto '+ app.get('port'));
})

//middlewares: funciones que se ejecutan antes de las rutas
//da informacion extra en la terminal
app.use(morgan('dev'));
//permitir peticiones remotas
app.use(cors());
//middlewares para interpretar los objetos json
app.use(express.json());
app.use(express.urlencoded({extended:true}));
//cargar un archivo estatico
app.use(express.static(path.join(__dirname,'../public')));
// console.log(path.join(__dirname,'../public'))


//rutas: nombre de dominio + ----
// http://localhost:4000/
app.use('/apicafe',productosRouter)
app.use('/apicafe/auth',authRouter)