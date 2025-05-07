import usuarios from "../models/usuarios.js";
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';



const iniciar_sesion = async (recibido, respuesta) => {
    try{
        const {usuario,password} = recibido.body;
        const consultaUsuario = await usuarios.findOne({"usuario":usuario});
        if (!consultaUsuario)return respuesta.status(500).json({"msj":`El usuario ${usuario} no esta registrado!`});

        let comparacion = await bcrypt.compare(password, consultaUsuario.password);
        if (!comparacion) return respuesta.status(500).json({"msj":"Credenciales de acceso no validas!"});

        const token=jwt.sign({
            "id":consultaUsuario._id,
            "rol":consultaUsuario.rol
        }, 
        process.env.JWT_SECRET,
        {"expiresIn":"1hr"}
    );

        respuesta.status(201).json({"msj":"Inicio de sesion exitoso!","token":token})

    }catch(error){
        respuesta.status(500).json({"msj":error.msj})
    }
}

const registro_usuario = async (req, res) => {
    try {
        const { usuario, password, rol } = req.body;

        if (!['usuario', 'admin'].includes(rol)) {
            return res.status(400).json({ msj: "Rol no válido. Debe ser 'usuario' o 'admin'" });
        }

        const cifrado = await bcrypt.hash(password, 10);

        const registro = new usuarios({
            usuario,
            password: cifrado,
            rol,
            estado: 0
        });

        await registro.save();

        res.status(201).json({ msj: "Usuario registrado", registro });
    } catch (error) {
        res.status(500).json({ msj: error.message });
    }
};


export { registro_usuario ,iniciar_sesion};
