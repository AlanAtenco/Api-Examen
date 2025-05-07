const verificarAdmin = (req, res, next) => {
    if (req.user.rol !== 'admin') {
        return res.status(403).json({ msj: 'Acceso denegado. Solo los administradores pueden realizar esta acción.' });
    }
    next();
};

export default verificarAdmin;
