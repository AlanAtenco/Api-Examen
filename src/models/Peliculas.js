import mongoose from "mongoose";

const PeliculaSchema = new mongoose.Schema({
    pelicula: { type: String, required: true },
    descripcion: { type: String, required: true },
    fecha: { type: String, required: true }
});

// Especifica la colección manualmente (tercer parámetro)
export const Estreno = mongoose.model("estreno", PeliculaSchema, "estreno");
export const Terror = mongoose.model("terror", PeliculaSchema, "terror");
export const Caricatura = mongoose.model("caricatura", PeliculaSchema, "caricatura");
