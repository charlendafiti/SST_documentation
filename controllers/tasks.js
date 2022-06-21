const fs = require('fs');
const database = require('../services/database');
function TaskController() {

    this.getTasks = async function(req, res){
        
        let tasks = await database.getAllTasks();
        res.send(tasks);
    }    

    this.updateTask = async function(req, res){
        let currentTaskIdx;

        let dataToUpdate = req.body.payload;

        database.udpateTask(dataToUpdate);

        res.send('ok');
    }

    return this;
}

module.exports = TaskController();