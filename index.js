const express = require('express');
const fs = require('fs');

const app = express();

const port = 3021;

app.use(express.static('./static/'));

app.get('/getTasks/', (req, res) => {
    let mockTask = fs.readFileSync('./tasks.json', {encoding: 'utf-8'});
    res.send(mockTask);
})

app.listen(port, _ => {
    console.log(`Listening on ${port} port`);
});