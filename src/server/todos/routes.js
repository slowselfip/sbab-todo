const Router = require('koa-router');
const TodoModel = require('./todo-model');
const OrderModel = require('./order-model');

const router = Router();

router.post('/todos', async ctx => {
  const { description } = ctx.request.body;
  if (
    description !== 0 &&
    (!description || (description.trim && description.trim().length === 0))
  ) {
    ctx.throw(
      400,
      "The body must be a JSON object that contain a non empty, non whitespace-only property named 'description'."
    );
  }

  try {
    // Create todo with a description
    const todo = await TodoModel.create({ description });
    // Add it first
    await OrderModel.updateOne(
      {},
      {
        $push: {
          order: {
            $each: [todo.id],
            $position: 0
          }
        }
      },
      {
        upsert: true
      }
    );
    if (todo) {
      ctx.status = 200;
      ctx.body = todo;
    } else if (ctx.status >= 400 && ctx.status < 500) {
      ctx.throw(ctx.status, 'Unable to create Todo.');
    } else {
      ctx.throw(500, 'Unable to create Todo.');
    }
  } catch (err) {
    ctx.throw(500, 'Unable to create Todo.');
  }
});

router.get('/todos', async ctx => {
  try {
    await Promise.all([TodoModel.find(), OrderModel.findOne({}, 'order')]).then(
      ([todos, order]) => {
        ctx.status = 200;
        ctx.body = {
          todos,
          order: order.order
        };
      },
      () => {
        ctx.throw(500, 'There was a problem fetching the todos.');
      }
    );
  } catch (err) {
    ctx.throw(500, 'Server Error');
  }
});

router.put('/todos/:id', async ctx => {
  const { id } = ctx.params;
  const todo = ctx.request.body;

  if (id && todo) {
    const updatedTodo = await new Promise((resolve, reject) =>
      TodoModel.findByIdAndUpdate(id, todo, { new: true }, (err, res) => {
        if (err) {
          reject(err);
        } else {
          resolve(res);
        }
      })
    );
    if (updatedTodo) {
      ctx.status = 200;
      ctx.body = updatedTodo;
    }
  }
});

router.put('/order', async ctx => {
  const order = ctx.request.body;

  if (!order || !order.length) {
    ctx.throw(400, 'The body of the request must be a non-empty array of ids.');
  }

  try {
    await OrderModel.replaceOne({}, { order });
  } catch (err) {
    ctx.throw(500, 'Unable to store the order.');
  }

  ctx.status = 200;
});

router.delete('/todos', async ctx => {
  try {
    await TodoModel.deleteMany({});
    await OrderModel.deleteOne({});
  } catch (err) {
    ctx.throw(500, 'Unable to clear documents');
  }

  ctx.status = 200;
});

router.post('/todos/batch/delete', async ctx => {
  const ids = ctx.request.body;

  if (!ids) {
    ctx.throw(400, 'Must provide at least one id to remove.');
  }

  new Promise((resolve, reject) => {
    TodoModel.deleteMany({ _id: { $in: ids } }, err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  })
    .then(
      async () => {
        // Also clear deleted items from the order array
        await OrderModel.updateMany({}, { $pullAll: { order: ids } });
        ctx.body = ids;
      },
      () => {
        ctx.throw(500, 'There was a problem deleting the todo/s.');
      }
    )
    .catch(() => ctx.throw(500, 'There was a problem deleting the todo/s.'));
  ctx.body = ids;
  ctx.status = 200;
});

module.exports = router;
