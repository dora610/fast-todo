import mongoose from 'mongoose';

const TodoSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      minlength: 1,
      maxlength: [25, 'Keep the name short'],
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    isComplete: {
      type: Boolean,
      required: true,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model('Todo', TodoSchema);
