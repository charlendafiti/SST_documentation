const fs = require('fs');
const database = require('../services/database');
function TaskController() {

    this.getTasks = async function(req, res){
        
        let tasks = await database.getAllTasks();
        //let tasksFormated = tasks.map(task => { return {...task,id: task.jira_id}});
        res.send(tasks);
    }    

    this.updateTask = async function(req, res){
        let currentTaskIdx;

        let dataToUpdate = req.body.payload;

        database.udpateTask(dataToUpdate);

        // this.tasks.map( (task, index) => {
        //     if(task.id == dataToUpdate.id){
        //         this.tasks[index] = {
        //             ...task,
        //             ...req.body.payload
        //         }
        //     }
        //     let jsonResult = JSON.stringify(this.tasks);
        //     fs.writeFileSync('./tasks.json', jsonResult);
        // })

        res.send('ok');
    }

    // this.loadTasks = async function(){
    //     let tasks = database.getAllTasks();
    //     return JSON.parse(tasks);
    // }

    //this.tasks = this.loadTasks();

    return this;
}

module.exports = TaskController();