import { Router } from 'express';
import { client } from 'utils/db.js';
import type { Todo } from 'models/todo.js';
import { ObjectId } from 'mongodb';
import type { Request, Response } from 'express';

const router = Router();
const db = client.db('todo-db');
const collection = db.collection<Todo>('todos');

router.post('/', async (req: Request<{}, {}, { title: string }>, res: Response) => {
  const { title } = req.body;
  if (!title) return res.status(400).send('Title is required');

  const newTodo: Todo = { title, isCompleted: false };
  const result = await collection.insertOne(newTodo);
  res.status(201).json({ ...newTodo, _id: result.insertedId });
});

router.get('/', async (_req: Request, res: Response) => {
  const todos = await collection.find().toArray();
  res.json(todos);
});

router.put('/:id', async (req: Request<{ id: string }, {}, { title: string }>, res: Response) => {
  const { id } = req.params;
  const { title } = req.body;
  if (!title) return res.status(400).send('Title is required');

  const result = await collection.updateOne({ _id: new ObjectId(id) }, { $set: { title } });
  if (result.matchedCount === 0) return res.status(404).send('Todo not found');
  res.send('Updated successfully');
});

router.patch('/:id/toggle', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;

  const todo = await collection.findOne({ _id: new ObjectId(id) });
  if (!todo) return res.status(404).send('Todo not found');

  await collection.updateOne({ _id: new ObjectId(id) }, { $set: { completed: !todo.isCompleted } });
  res.send('Toggled successfully');
});

router.delete('/:id', async (req: Request<{ id: string }>, res: Response) => {
  const { id } = req.params;
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  if (result.deletedCount === 0) return res.status(404).send('Todo not found');
  res.send('Deleted successfully');
});

export default router;
