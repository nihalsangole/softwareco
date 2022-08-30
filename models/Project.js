const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    user: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String },
    categories: { type: Array },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
