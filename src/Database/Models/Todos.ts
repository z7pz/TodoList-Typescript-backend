
import mongoose, { Schema, Document } from 'mongoose';


export interface ITodo {
    id: string;
    title: string;
    discription: string;
}



const TodosSchema: Schema = new Schema({
    id: String,
    title: String,
    discription: String    
})






const TodosModel = mongoose.model<ITodo>('Todos', TodosSchema);
export default TodosModel;

 async function edit(id,{discription, title}): Promise<Document<ITodo>> {
    return await TodosModel.findOneAndUpdate({
        id
    }, {
        discription,
        title
    }, {"new": false})
}  

async function create({discription, title, id}: ITodo): Promise<ITodo> {
    return await new TodosModel({
        discription,
        title,
        id
    }).save()
}  


async function Delete(id: string): Promise<void> {
    await TodosModel.deleteOne({id});
}  
export const todo = {
    edit,
    create,
    Delete
} 