const fs = require('fs');
const database = require('../services/database');
function TaskController() {

<<<<<<< HEAD
    this.getTasks = function(req, res){
        res.send(this.tasks);
    }
    
    this.getTask = function(req, res) {
        res.send(this.tasks.filter(task => task.id == req.params.id));
    }
=======
    this.getTasks = async function(req, res){
        
        let tasks = await database.getAllTasks();
        res.send(tasks);
    }    
>>>>>>> master

    this.updateTask = async function(req, res){
        let currentTaskIdx;

        let dataToUpdate = req.body.payload;

        database.udpateTask(dataToUpdate);

        res.send('ok');
    }

    return this;
}

module.exports = TaskController();