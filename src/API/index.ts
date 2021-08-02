import express, { Request, Response, Application } from 'express';
import TodosRoute from './Routes/todos'
import bodyParser from 'body-parser';
import database from '../Database';
export default class API {
    protected port: number = 3000;
    protected app: Application;
    public dburi = ""
    constructor({ port }: { port?: number }) {
        this.port = port;
        this.app = express();

        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: true }));

        this.app.get('/', (req: Request, res: Response) =>
            res.send('Welcome to the Mongoose & TypeScript example')
        );
        new TodosRoute(this.app)
        database({ db: this.dburi }).connect()



        this.app.listen(port, () =>
            console.log(`Application started successfully on port ${port}.`)
        );
    }
}