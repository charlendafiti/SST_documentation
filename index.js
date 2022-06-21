const express = require('express');
const fs = require('fs');
const taskRoutes = require('./routes/tasks');
const cors = require('cors');

const app = express();

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    res.set('Access-Control-Allow-Headers', 'Content-Type')
    app.use(cors());
    next();
});

app.use(express.json())
app.use(express.urlencoded({ extended: true}))



const port = 3021;

app.use(express.static('./static/'));

app.use('/tasks', taskRoutes);

app.get('/getTasks1/', (req, res) => {
    let mockTask = fs.readFileSync('./tasks.json', {encoding: 'utf-8'});
    res.send(mockTask);
})



app.listen(port, _ => {
    console.log(`Listening on ${port} port`);
});