const express = require('express');
const fs = require('fs');
const taskRoutes = require('./routes/tasks');
const cors = require('cors');
const path = require('path');

const app = express();

app.options('*', cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    app.use(cors());
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true}))

const port = process.argv[2] || 3021;

app.use(express.static('./front/dist/'));

app.use('/tasks', taskRoutes);

app.use(/\/task\/.*/, express.static('./front/dist/'));

app.get('/getTasks1/', (req, res) => {
    let mockTask = fs.readFileSync('./tasks.json', {encoding: 'utf-8'});
    res.send(mockTask);
})



app.listen(port, _ => {
    console.log(`Listening on ${port} port`);
});