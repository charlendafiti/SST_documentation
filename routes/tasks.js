const express = require('express');
const fs = require('fs');

const router = express.Router();

router.get('/', (req, res) => {
    let mockTask = fs.readFileSync('./tasks.json', {encoding: 'utf-8'});
    res.send(mockTask);
});

module.exports = router;