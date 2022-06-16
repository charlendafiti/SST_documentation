const express = require('express');
const fs = require('fs');
const TaskController = require('../controllers/tasks')

const router = express.Router();

router.get('/', TaskController.getTasks);
router.get('/task/:id', TaskController.getTask);
router.post('/', TaskController.updateTask);

module.exports = router;