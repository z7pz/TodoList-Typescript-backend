import { Application, Router } from "express"
import { Request, Response } from "express-serve-static-core";
import TodosModel, { todo } from "../../Database/Models/Todos";

export default class GetAllTodosRoute {
    protected router: Router;
    protected app: Application
    constructor(app: Application) {
        this.app = app;
        this.router = Router();
        this.app.use("/todos", this.router);


        this.router.get('/', async (req: Request, res: Response) => {
         
            const data = await TodosModel.find()
            res.status(200).send(data)
        })
        this.router.get('/:id', async (req: Request, res: Response) => {
            const id = (req.params.id as string);
            if (!req.params.id) return res.send({ message: "please put id in the params." })
            const data = await TodosModel.findOne({
                id
            });
            if (!data) {
                return res.status(404).send({ message: "i cant find this todo" })
            }
            return res.status(200).send(data)
        })
        this.router.post('/', async (req: Request, res: Response) => {


            const { desc, title } = (req.body as { desc: string, title: string });
            if(!desc || !title) return res.status(400).send({message: "somefields are not compleated"})
            const id = Math.random().toString(36).replace(/[^a-z]+/g, '').substr(0, 10); 
            const data = await todo.create({ discription: desc, title, id })
            res.status(200).send(data)
        })


        this.router.delete('/:id', async (req: Request, res: Response) => {
            const id = (req.params.id as string);
            if (!req.params.id) return res.send({ message: "please put id in the params." })

            await todo.Delete(id)
            res.status(200).send({ message: 'Success' })
        })
        
        this.router.put('/:id', async (req: Request, res: Response) => {
            const id = (req.params.id as string);
            if (!req.params.id) return res.send({ message: "please put id in the params." })
            const { desc, title } = (req.body as { desc: string, title: string });
            if(!desc || !title) return res.status(400).send({message: "somefields are not compleated"})

            await todo.edit(id, {discription: desc, title})
            res.status(200).send({ message: 'Success' })
        })
    }
}