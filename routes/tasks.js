const express = require('express');
const fs = require('fs');
const TaskController = require('../controllers/tasks')
const checkToken = require('../middleware/checkToken');

const router = express.Router();

router.use(checkToken);

router.get('/', TaskController.getTasks);
router.post('/', TaskController.updateTask);

module.exports = router;