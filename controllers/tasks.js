const fs = require('fs');

function TaskController() {

    this.getTasks = function(req, res){
        res.header("Access-Control-Allow-Origin", "*");
        res.send(this.tasks);
    }
    
    this.getTask = function(req, res) {
        res.header("Access-Control-Allow-Origin", "*");
        res.send(this.tasks.filter(task => task.id == req.params.id));
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