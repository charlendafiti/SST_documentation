const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');


class database {
    
    constructor(){
        // this.checkDataAndStructure();
    }

    getDatabase(){
        return new sqlite3.Database(path.resolve(__dirname, '../data/taskData.db'));
    }

    
    async udpateTask(dataToUpdate){
        const db = this.getDatabase();
        let id, field, value;

        Object.keys(dataToUpdate).forEach( currentField => {
            if(currentField == 'id'){
                id = dataToUpdate[currentField];
            } else {
                field = currentField;
                value = dataToUpdate[currentField];
            }
        });

        return new Promise( (resolve, reject) => {
            const stmt = db.prepare(`update tasks set ${field} = ? where id = ${id}`, error => {
                if(error){
                    reject(error);
                } else {
                    stmt.run(value);   
                    stmt.finalize();
                    db.close();
                    resolve({message: `Task ${id} updated`});
                } 
            });
        });
        
    }

    async insertTask(jira_id, title){
        const db = this.getDatabase();

        return new Promise( (resolve, reject) => {
            const stmt = db.prepare(`insert into tasks(jira_id, title) values(?, ?)`, error => {
                if(error){
                    reject(error);
                } else {
                    stmt.run(jira_id, title);    
                    stmt.finalize();
                    db.close();
                    resolve({message: `Task ${jira_id} inserted`});
                } 
            });
        });        
    }

    async deleteTask(id){
        const db = this.getDatabase();

        return new Promise( (resolve, reject) => {
            const stmt = db.prepare(`delete from tasks where id = ?`, error => {
                if(error){
                    reject(error);
                } else {
                    let result = stmt.run(id);    

                    stmt.finalize();
                    db.close();
                    resolve({message: `Task ${id} deleted`});
                } 
            });
        });        
    }

    async getAllTasks(){
        const db = this.getDatabase();
        return await new Promise((resolve, reject) => {
            db.all(`
                    select 
                        cast(substr(tasks.jira_id,5) as int) as id_jira, 
                        tasks.*
                    from tasks
                    order by id_jira asc
                    `, (err, data) => {
                if(!err){
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    }
}

module.exports = new database();