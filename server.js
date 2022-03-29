import Fastify from 'fastify';
import routes from './routes/index.js';
import mongoose from 'mongoose';
const fastify = Fastify({ logger: true });

const PORT = 5000;

// db connect
mongoose
  .connect('mongodb://127.0.0.1:27017/fast-todo')
  .then(() => fastify.log.info('Successfully connected to db'))
  .catch((err) => fastify.log.error(err));

fastify.register(routes, { prefix: '/api/v1/todo' });

const start = async function () {
  try {
    await fastify.listen(PORT);
    // fastify.log.info(`🚀 Server is up and running at http://localhost:${PORT}`);
  } catch (err) {
    fastify.log.error(err);
    process.exit(1);
  }
};
start();
