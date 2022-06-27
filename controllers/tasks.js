const fs = require('fs');
const database = require('../services/database');
function TaskController() {

    this.getTasks = async function(req, res){
        
        let tasks = await database.getAllTasks();
        res.send(tasks);
    }    

    this.updateTask = async function(req, res){

        try {
            let currentTaskIdx;    
            let dataToUpdate = req.body.payload;

            if(!dataToUpdate.id){
                throw {message: "No ID informed"};
            }

            if(Object.keys(dataToUpdate).length < 2){
                throw {message: 'Insuficient params'};
            }
            
                database.udpateTask(dataToUpdate)
                .then( data => {
                    res.send('ok');            
                })
                .catch( error => {
                    res.status(406).send({errorMessage: error.message, params: req.body.payload})
                });
    
        } catch (error) {
            res.status(403).send({errorMessage: error.message, params: req.body.payload})
        }
    }

    this.insertTask = async function(req, res){

        try {
            let taskToInsert = req.body.payload;

            if(!taskToInsert.jira_id){
                throw {message: "No jira_id informed"};
            }

            if(!taskToInsert.title){
                throw {message: "No tittle informed"};
            }

            if(Object.keys(taskToInsert).length < 2){
                throw {message: 'Insuficient params'};
            }
            
            database.insertTask(taskToInsert.jira_id, taskToInsert.title)
            .then( data => {
                res.send('ok');            
            })
            .catch( error => {
                res.status(406).send({errorMessage: error.message, params: req.body.payload})
            });
    
        } catch (error) {
            res.status(406).send({errorMessage: error.message, params: req.body.payload})
        }
    }

    this.deleteTask = async function(req, res){
        let {id} = req.body.paylod;

        try {
            if(!id){
                throw {message: "No id infomed"}
            }
            database.deleteTask(id);
        } catch (error) {
            res.status(406).send({errorMessage: error.message, params: req.body.payload})
        }
    }

    return this;
}

module.exports = TaskController();