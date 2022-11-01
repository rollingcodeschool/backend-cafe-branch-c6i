import { Router } from "express";
import {
  crearProducto,
  listarProductos,
  obtenerProducto,
  borrarProducto,
  editarProducto,
} from "../controllers/productos.controllers";
import { check } from "express-validator";

const router = Router();

router
  .route("/productos")
  .get(listarProductos)
  .post(
    [
      check("nombreProducto")
        .notEmpty()
        .withMessage("El nombre del producto es un dato obligatorio")
        .isLength({ min: 2, max: 50 })
        .withMessage(
          "El nombre del producto debe tener entre 2 y 50 caracteres"
        ),
      check("precio")
        .notEmpty()
        .withMessage("El precio es un dato obligatorio")
        .isNumeric()
        .withMessage('El precio debe ser un numero')
        .custom((value)=>{
            if(value>= 1 && value <= 10000){
                return true;
            }else{
                throw new Error('El precio debe estar entre 1 y 10000')
            }
        }),
        check('imagen')
        .matches(/^https?:\/\/[\w\-]+(\.[\w\-]+)+[/#?]?.*$/)
        .withMessage('Debe enviar una URL valida'),
        check('categoria')
        .isIn(['bebida caliente','bebida fria', 'dulce', 'salado'])
        .withMessage('La categoria debe ser correcta')
    ],
    crearProducto
  );

router
  .route("/productos/:id")
  .get(obtenerProducto)
  .put(editarProducto)
  .delete(borrarProducto);

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
