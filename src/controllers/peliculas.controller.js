import { Estreno, Terror, Caricatura } from '../models/Peliculas.js';

const getModelo = (tipo) => {
    switch (tipo) {
        case 'estreno': return Estreno;
        case 'terror': return Terror;
        case 'caricatura': return Caricatura;
        default: throw new Error('Tipo de película no válido');
    }
};

// Obtener todas las películas
export const consultaPeliculas = async (req, res) => {
    try {
        const Modelo = getModelo(req.params.tipo);
        const data = await Modelo.find();
        res.json(data);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar las películas', error });
    }
};

// Obtener una película individual por ID
export const consulta_individual = async (req, res) => {
    try {
        const Modelo = getModelo(req.params.tipo);
        const pelicula = await Modelo.findById(req.params.pelicula);
        res.json(pelicula);
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al consultar la película', error });
    }
};

// Insertar nueva película
export const insercion = async (req, res) => {
    try {
        if (req.user ) return res.status(500).json({"msj":"no tienes permisos para efectuar esta accion"})
        const Modelo = getModelo(req.params.tipo);
        const nuevaPelicula = new Modelo(req.body);
        await nuevaPelicula.save();
        res.json({ mensaje: 'Película agregada correctamente' });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al insertar la película', error });
    }
};

// Actualizar una película por ID
export const actualizar = async (req, res) => {
    try {
        if (req.user ) return res.status(500).json({"msj":"no tienes permisos para efectuar esta accion"})
        const Modelo = getModelo(req.params.tipo);
        const actualizada = await Modelo.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json({ mensaje: 'Película actualizada correctamente', actualizada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al actualizar la película', error });
    }
};

// Eliminar una película por ID
export const eliminar = async (req, res) => {
    try {
        if (req.user ) return res.status(500).json({"msj":"no tienes permisos para efectuar esta accion"})
        const Modelo = getModelo(req.params.tipo);
        const eliminada = await Modelo.findByIdAndDelete(req.params.id);
        res.json({ mensaje: 'Película eliminada correctamente', eliminada });
    } catch (error) {
        res.status(500).json({ mensaje: 'Error al eliminar la película', error });
    }
};
