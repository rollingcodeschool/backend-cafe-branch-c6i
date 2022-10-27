import { Router } from "express";
import { editarProducto } from "../controllers/productos.controllers";
import { crearProducto, listarProductos, obtenerProducto } from "../controllers/productos.controllers";

const router = Router();

router.route('/productos')
    .get(listarProductos)
    .post(crearProducto)

router.route('/productos/:id')
.get(obtenerProducto)
.put(editarProducto)
// .delete()

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
