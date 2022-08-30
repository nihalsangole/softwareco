const Project = require('../models/Project');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAdmin,
  verifyTokenAndAuthorizationAndEditor,
} = require('./verifyToken');

const router = require('express').Router();

//CREATE

router.post('/', verifyTokenAndAuthorizationAndEditor, async (req, res) => {
  const newProject = new Project(req.body);

  try {
    const savedProject = await newProject.save();
    res.status(200).json(savedProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE
router.put('/:id', verifyTokenAndAuthorizationAndEditor, async (req, res) => {
  try {
    const updatedProject = await Project.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedProject);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(200).json('Project has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET PROJECT
router.get(
  '/find/:id',
  verifyTokenAndAuthorizationAndEditor,
  async (req, res) => {
    try {
      const Project = await Project.findById(req.params.id);
      res.status(200).json(Project);
    } catch (err) {
      res.status(500).json(err);
    }
  }
);

//GET ALL PROJECTS
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  const qNew = req.query.new;
  const qCategory = req.query.category;
  try {
    let Projects;

    if (qNew) {
      Projects = await Project.find().sort({ createdAt: -1 }).limit(1);
    } else if (qCategory) {
      Projects = await Project.find({
        categories: {
          $in: [qCategory],
        },
      });
    } else {
      Projects = await Project.find();
    }

    res.status(200).json(Projects);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
