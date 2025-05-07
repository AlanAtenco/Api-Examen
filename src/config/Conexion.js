import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const Conexion = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            maxPoolSize: 10,
            minPoolSize: 5
        });
        console.log('❇️ Conectado a MongoDB');
    } catch (error) {
        console.log('Error en la conexión:', error.message);
        process.exit(1);
    }
};

export default Conexion;
