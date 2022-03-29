import {
  addTodo,
  deleteTodo,
  getAllTodo,
  getSingleTodo,
  updateTodo,
} from '../controllers/todoController.js';

async function routes(fastify, opts) {
  fastify.get('/:id', getSingleTodo);

  fastify.get('/', getAllTodo);

  fastify.post('/', addTodo);

  fastify.put('/:id', updateTodo);

  fastify.delete('/:id', deleteTodo);
}

export default routes;
