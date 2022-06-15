const fs = require('fs');

function TaskController() {
    // constructor() {
    //     this.tasks = this.loadTasks();
    // }

    this.getTasks = function(req, res){
        //this.tasks;
        //console.log(this);
        res.send(this.tasks);
    }
    

    this.updateTask = function(req, res){
        let currentTaskIdx;

        this.tasks.map( (task, index) => {
            if(task.id == req.body.payload.id){
                this.tasks[index] = {
                    ...task,
                    ...req.body.payload
                }
            }
            let jsonResult = JSON.stringify(this.tasks);
            fs.writeFileSync('./tasks.json', jsonResult);
        })

        res.send('ok');
    }

    this.loadTasks = function(){
        let tasks = fs.readFileSync('./tasks.json', {encoding: 'utf-8'});
        return JSON.parse(tasks);
    }

    this.tasks = this.loadTasks();

    return this;
}

module.exports = TaskController();