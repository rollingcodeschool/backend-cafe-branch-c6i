import { Router } from "express";
import { crearProducto, listarProductos } from "../controllers/productos.controllers";

const router = Router();

router.route('/productos')
    .get(listarProductos)
    .post(crearProducto)


export default router;

// app.get('/productos', (req, res)=>{

//     res.send('aqui tengo que retornar un arreglo de productos')
// })
// app.post('/productos', (req, res)=>{

//     res.send('Esto es una prueba de la peticion GET')
// })
// app.get('/productos2', (req, res)=>{
    
//     res.send('aqui devolvemos un producto')
// })
