import { Router } from 'express';
import { 
    consultaPeliculas, 
    consulta_individual, 
    insercion, 
    actualizar, 
    eliminar 
} from '../controllers/peliculas.controller.js';
import { iniciar_sesion, registro_usuario } from '../controllers/usuarios.controller.js';
import authMiddleware from '../config/authMiddleware.js';
import verificarAdmin from '../config/verificarAdmin.js';

const router = Router();

// Ruta genérica para tipo de películas
router.get("/:tipo", consultaPeliculas); 
router.get("/:tipo/:pelicula", consulta_individual);
router.post("/:tipo/insercion",authMiddleware, insercion);
router.delete("/:tipo/eliminar/:id",authMiddleware, verificarAdmin ,eliminar);
router.put("/:tipo/actualizar/:id",authMiddleware, actualizar);
router.post("/registro",registro_usuario);
router.post("/login",iniciar_sesion);

export default router;
