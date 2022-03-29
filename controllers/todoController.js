import Todo from '../models/Todo.js';

const getSingleTodo = async (request, reply) => {
  const { id } = request.params;
  console.log(id);
  const todo = await Todo.findById(id);
  if (!todo) {
    reply.code(404);
    throw new Error('No Todo found!');
  }
  return todo;
};

const getAllTodo = async (request, reply) => {
  const todo = await Todo.find({}).sort({ createdAt: -1 });
  if (!todo.length) {
    throw new Error('Empty todos');
  }
  return todo;
};

const addTodo = async (request, reply) => {
  const todo = await Todo.create(request.body);
  console.log(todo);
  return { success: 1, msg: `Successfully added todo - id: ${todo._id}` };
};

const updateTodo = async (request, reply) => {
  const { id } = request.params;
  const newTodo = await Todo.findByIdAndUpdate(id, request.body, {
    new: true,
    runValidators: true,
  });
  console.log(newTodo);
  return { success: 1, msg: `Successfully updated todo` };
};

const deleteTodo = async (request, reply) => {
  const { id } = request.params;
  const deletedTodo = await Todo.findByIdAndDelete(id);
  return { success: 1, msg: `Successfully deleted todo` };
};

export { getSingleTodo, getAllTodo, updateTodo, addTodo, deleteTodo };
