const express = require('express');
const fs = require('fs');
const TaskController = require('../controllers/tasks')
const checkToken = require('../middleware/checkToken');

const router = express.Router();

router.use(checkToken);

router.get('/', TaskController.getTasks);
router.put('/', TaskController.updateTask);
router.post('/', TaskController.insertTask);
router.delete('/', TaskController.deleteTask);

module.exports = router;