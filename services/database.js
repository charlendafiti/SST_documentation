const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');


class database {
    
    constructor(){
        this.checkDataAndStructure();
    }

    getDatabase(){
        return new sqlite3.Database(path.resolve(__dirname, '../data/taskData.db'));
    }

    async checkDataAndStructure(){
        await this.generateStructure();
        this.importInitialDataIfNotExists();
    }

    async generateStructure(){
        const db = this.getDatabase();

        const createTasks = await new Promise((resolve, reject) => {
            db.run(`
            CREATE TABLE IF NOT EXISTS
                tasks( 
                    id integer PRIMARY KEY, 
                    jira_id varchar(20) not null,
                    title varchar(50) not null, 
                    description varchar(500), 
                    dev_journey varchar(1000), 
                    SEO_principles varchar(1000), 
                    best_practices varchar(1000)
                )
            `, _ => {
                resolve();
            });
        });

        const createStatus = await new Promise((resolve, reject) => {
            db.run(`
            CREATE TABLE IF NOT EXISTS
                status( 
                    id integer PRIMARY KEY, 
                    description not null
                )
            `, _ => {
                resolve();
            });
        });

        return true;
    }

    async hasTasks() {
        const db = this.getDatabase();

        return await new Promise( (resolve, reject) => {
            db.all('select * from tasks', (err, data) => { 
                let result = !!data ? data.length > 0 :  false;
                resolve(result)
            }).close();
        });
    }

    async hasStatus() {
        const db = this.getDatabase();

        return await new Promise( (resolve, reject) => {
            db.all('select * from status', (err, data) => { 
                let result = !!data ? data.length > 0 :  false;
                resolve(result)
            }).close();
        });
    }

    async importTasks(){
        const fileData = fs.readFileSync(path.resolve(__dirname, '../tasks.json'),{encoding: 'utf8'});
        const tasks = JSON.parse(fileData);
        const db = this.getDatabase();

        const stmt = db.prepare(`
            insert into tasks(jira_id, title, description, dev_journey, SEO_principles, best_practices) values(?, ?, ?, ?, ?, ?);
        `);
        
        
        tasks.forEach( task => {
            stmt.run(task.id, task.title, task.description, task.dev_journey, task.SEO_principles, task.best_practices);
        });

        stmt.finalize();
        db.close();
    }

    async insertStatus(){
        const db = this.getDatabase();

        const stmt = db.prepare(`
            insert into status(id, description) values(0,'done');
            insert into status(id, description) values(1,'canceled');
            insert into status(id, description) values(3,'draft');
        `);  

        stmt.run();
        
        
        db.run(`ALTER TABLE tasks ADD status integer not null default 0`);

        stmt.finalize();
        db.close();
    }

    async importInitialDataIfNotExists(){


        let hasTasks = await this.hasTasks();

        if (!hasTasks) {
            this.importTasks();
        }

        let hasStatus = await this.hasStatus();

        if(!hasStatus){
            this.insertStatus();
        }
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