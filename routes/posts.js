const express = require('express');

const { createPost } =require('../controllers/posts');

const auth = require('../middlemare/auth');
const router = express.Router();

router.post('/', auth, createPost);

module.exports = router;