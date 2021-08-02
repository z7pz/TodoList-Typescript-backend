import mongoose from 'mongoose';

type TInput = {
    db: string;
}
export default ({ db }: TInput) => {
    const models = { TodoModel: require('./Models/Todos') }
    const connect = async() => {
        mongoose.connection.on('disconnected', connect);
    
        return new Promise((resolve, reject) => {
            mongoose
            .connect(
                db,
                {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                }
            )
            .then(() => {
                console.info(`Successfully connected to ${db}`);
                return resolve(models);
            })
            .catch(error => {
                console.error('Error connecting to database: ', error);
                return process.exit(1);
            });
    
        })
        
    };

    return {
        connect,
        models
    }
};