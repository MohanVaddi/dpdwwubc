import mongoose from 'mongoose';
import environment from '../../environment';

const connect = async () => {
    const mongodb_URI = environment.mongodb_URI;
    try {
        await mongoose.connect(mongodb_URI);
        console.log('Database connected');
    } catch (err) {
        console.error(err);
        console.log('Unable to connect to database');
    }
};

export default connect;
