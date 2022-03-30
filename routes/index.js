import {
  addTodo,
  deleteTodo,
  getAllTodo,
  getSingleTodo,
  updateTodo,
} from '../controllers/todoController.js';

async function routes(fastify, opts) {
  // schema
  fastify.addSchema({
    $id: 'todoSchema',
    type: 'object',
    properties: {
      name: { type: 'string' },
      isComplete: { type: 'boolean' },
    },
    required: ['name'],
  });
  fastify.addSchema({
    $id: 'todoResponseSchema',
    type: 'object',
    properties: {
      success: { type: 'number' },
      msg: { type: 'string' },
    },
  });

  // routes
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

  fastify.get(
    '/',
    {
      schema: {
        response: {
          200: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                _id: { type: 'string' },
                name: { $ref: 'todoSchema#/properties/name' },
                isComplete: {
                  $ref: 'todoSchema#/properties/isComplete',
                },
                updatedAt: { type: 'string' },
              },
            },
          },
        },
      },
    },
    getAllTodo
  );

  fastify.post(
    '/',
    {
      schema: {
        body: { $ref: 'todoSchema#' },
        response: {
          200: { $ref: 'todoResponseSchema#' },
        },
      },
    },
    addTodo
  );

  fastify.put(
    '/:id',
    {
      schema: {
        body: { $ref: 'todoSchema#' },
        response: {
          200: { $ref: 'todoResponseSchema#' },
        },
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
        response: {
          200: { $ref: 'todoResponseSchema#' },
        },
      },
    },
    deleteTodo
  );
}

export default routes;
