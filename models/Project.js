const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    title: { type: String, required: true, unique: true },
    desc: { type: String, required: true },
    img: { type: String, default: '' },
    categories: { type: Array, default: [] },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Project', ProjectSchema);
