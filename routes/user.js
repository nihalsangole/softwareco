const User = require('../models/User');
const {
  verifyToken,
  verifyTokenAndAuthorization,
  verifyTokenAndAuthorizationAndEditor,
  verifyTokenAndAdmin,
} = require('./verifyToken');

const router = require('express').Router();

//update
router.put('/:id', verifyTokenAndAuthorizationAndEditor, async (req, res) => {
  if (req.body.password) {
    req.body.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.PASS_SEC
    ).toString();
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: req.body,
      },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//DELETE
router.delete('/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json('User has been deleted...');
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET USER
router.get('/find/:id', verifyTokenAndAuthorization, async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    const { password, ...others } = user._doc;
    res.status(200).json(others);
  } catch (err) {
    res.status(500).json(err);
  }
});

//GET ALL USER
router.get('/', verifyTokenAndAdmin, async (req, res) => {
  const query = req.query.new;
  try {
    const users = query
      ? await User.find().sort({ _id: -1 }).limit(5)
      : await User.find();
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update many user with same Data

router.put('/', verifyTokenAndAdmin, async (req, res) => {
  let value = req.query.lastname;
  try {
    const updatedUser = await User.updateMany(
      {},
      {
        $set: req.body,
      }
    );
    console.log(value);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

//UPDATE many users with different data
router.put('/', verifyTokenAndAdmin, async (req, res) => {
  let value = req.query.lastname;
  try {
    const updatedUser = await User.updateMany(
      { lastname: value },
      {
        $set: req.body,
      }
    );
    console.log(value);
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
