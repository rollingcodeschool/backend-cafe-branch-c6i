import Usuario from "../models/usuario";
import { validationResult } from "express-validator";
// import bcrypt from "bcryptjs";
import generarJWT from "../helpers/jwt";

export const login = async (req, res) => {
  try {
    // manejar los errores de la validacion
    const errors = validationResult(req);
    // errors.isEmpty() devuelve false si hay errores
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    //verificar si existe un mail como el recibido
    const { email, password } = req.body;

    //verificar si el email ya existe
    let usuario = await Usuario.findOne({ email }); //devulve un null
    if (!usuario) {
      //si el usuario existe
      return res.status(400).json({
        mensaje: "Correo o password invalido - correo",
      });
    }
     if (password !== usuario.password) {
        return res.status(400).json({
          mensaje: "Correo o password invalido - password",
        });
      }

    // //verificar si el password corresponde con el pass encriptado en mi BD
    // const passwordValido = bcrypt.compareSync(password, usuario.password);
    // // si no es valido el password
    // if (!passwordValido) {
    //   return res.status(400).json({
    //     mensaje: "Correo o password invalido - password",
    //   });
    // }
    // //generar el token y enviarlo en la respuesta
    // const token = await generarJWT(usuario._id, usuario.nombre);

    //responder que el usuario es correcto
    res.status(200).json({
      mensaje: "El usuario existe",
      uid: usuario._id,
      nombre: usuario.nombre
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "usuario o contraseña invalido",
    });
  }
};

export const crearUsuario = async (req, res) => {
  try {
    // manejar los errores de la validacion
    const errors = validationResult(req);
    // errors.isEmpty() devuelve false si hay errores
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    //verificar si el email ya existe
    let usuario = await Usuario.findOne({ email }); 
    if (usuario) {
      //si el usuario existe
      return res.status(400).json({
        mensaje: "ya existe un usuario con el correo enviado",
      });
    }

    //guardamos el nuevo usuario en la BD
    usuario = new Usuario(req.body);
    // //guardar el usuario en la BD con la pass encriptada
    // const salt = bcrypt.genSaltSync();
    // usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    res.status(201).json({
      mensaje: "usuario creado",
      nombre: usuario.nombre,
      uid: usuario._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({
      mensaje: "El usuario no pudo ser creado",
    });
  }
};
