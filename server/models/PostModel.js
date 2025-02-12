const { Schema, model } = require("mongoose");

const CommentSchema = new Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
});

const PostSchema = new Schema({
  author: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Автор - користувач
  text: { type: String, required: true },
  comments: [CommentSchema],
});

PostSchema.pre('find', function() {
  this.populate('author', 'name');
});

PostSchema.pre('findOne', function() {
  this.populate('author', 'name');
});

module.exports = model("Post", PostSchema);
