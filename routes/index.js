import {
  addTodo,
  deleteTodo,
  getAllTodo,
  getSingleTodo,
  updateTodo,
} from '../controllers/todoController.js';

async function routes(fastify, opts) {
  fastify.addSchema({
    $id: 'todoSchema',
    type: 'object',
    properties: {
      name: { type: 'string' },
      isComplete: { type: 'boolean' },
    },
    required: ['name'],
  });

  const todoBodyJsonSchema = {
    type: 'object',
    properties: {
      name: { type: 'string' },
      isComplete: { type: 'boolean' },
    },
    required: ['name'],
  };

  const todoResponseSchema = {
    200: {
      type: 'object',
      properties: {
        success: { type: 'number' },
        msg: { type: 'string' },
      },
    },
  };

  fastify.get(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        response: {
          200: { $ref: 'todoSchema#' },
        },
      },
    },
    getSingleTodo
  );

  fastify.get('/', getAllTodo);

  fastify.post(
    '/',
    {
      schema: {
        body: todoBodyJsonSchema,
        response: todoResponseSchema,
      },
    },
    addTodo
  );
  // fastify.post('/', (request, reply) => {
  //   return request.body;
  // });

  fastify.put(
    '/:id',
    {
      schema: {
        body: todoBodyJsonSchema,
        response: todoResponseSchema,
      },
    },
    updateTodo
  );

  fastify.delete(
    '/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: {
            id: { type: 'string' },
          },
        },
        response: todoResponseSchema,
      },
    },
    deleteTodo
  );
}

export default routes;
