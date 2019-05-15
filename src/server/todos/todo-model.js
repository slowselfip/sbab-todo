const mongoose = require('mongoose');

const { Schema } = mongoose;

const TodoSchema = new Schema(
  {
    description: { type: String, trim: true },
    completed: { type: Boolean, default: false }
  },
  {
    timestamps: true
  }
);

TodoSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (_, { _id, ...ret }) => ({ id: _id, ...ret })
});

module.exports = mongoose.model('TodoModel', TodoSchema);
