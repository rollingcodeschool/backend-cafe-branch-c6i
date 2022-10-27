import Producto from "../models/producto";

export const listarProductos = async(req, res) => {
    try {
        //buscar todos los productos en la BD
        const listaProductos = await Producto.find();
        //responder al usuario que todo salio bien
        res.status(200).json(listaProductos)
      } catch (error) {
        console.log(error);
        res.status(404).json({
            mensaje: 'Error al intentar buscar los productos'
        })
      }


};

export const crearProducto = async(req, res) => {
  try {
    //extraer del body los datos
    console.log(req.body);
    //agregar la validacion correspondiente
    const productoNuevo = new Producto(req.body);
    //guardar ese producto en la BD
    await productoNuevo.save();
    //responder al usuario que todo salio bien
    res.status(201).json({
        mensaje: 'El producto fue correctamente creado'
    })
  } catch (error) {
    console.log(error);
    res.status(400).json({
        mensaje: 'Error al intentar agregar un producto'
    })
  }
};


export const obtenerProducto = async (req, res)=>{
  try{
    //obtener el parametro
    console.log(req.params.id)
    //pedirle a la BD buscar el documento que coincide con el id del parametro
    const productoBuscado = await Producto.findById(req.params.id);
    //responder con el producto encontrado
    res.status(200).json(productoBuscado);
  }catch(error){
    console.log(error)
    res.status(404).json({
      mensaje: 'Error no se pudo encontrar el producto solicitado'
    })
  }
}