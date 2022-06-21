const sqlite3 = require('sqlite3').verbose();
const path = require('path');
const fs = require('fs');


class database {

    constructor() {
        this.checkDataAndStructure();
    }

    getDatabase() {
        return new sqlite3.Database(path.resolve(__dirname, '../data/taskData.db'));
    }

    async checkDataAndStructure() {
        await this.generateStructure();
        this.importInicialDataIfNotExists();
    }

    async generateStructure() {
        const db = this.getDatabase();

        const result = await new Promise((resolve, reject) => {
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

        return result;
    }

    async importInicialDataIfNotExists() {


        let hasTasks = await this.hasTasks();

        if (!hasTasks) {
            console.log('Has no tasks');
            const fileData = fs.readFileSync(path.resolve(__dirname, '../tasks.json'), { encoding: 'utf8' });
            const tasks = JSON.parse(fileData);
            const db = this.getDatabase();

            const stmt = db.prepare(`
                insert into tasks(jira_id, title, description, dev_journey, SEO_principles, best_practices) values(?, ?, ?, ?, ?, ?);
            `);


            tasks.forEach(task => {
                stmt.run(task.id, task.title, task.description, task.dev_journey, task.SEO_principles, task.best_practices);
            });

            stmt.finalize();
            db.close();
        }
    }

    async hasTasks() {
        const db = this.getDatabase();

        return await new Promise((resolve, reject) => {
            db.all('select * from tasks', (err, data) => {
                let result = !!data ? data.length > 0 : false;
                resolve(result)
            }).close();
        });
    }

    async udpateTask(dataToUpdate) {
        const db = this.getDatabase();
        let id, field, value;

        Object.keys(dataToUpdate).forEach(currentField => {
            if (currentField == 'id') {
                id = dataToUpdate[currentField];
            } else {
                field = currentField;
                value = dataToUpdate[currentField];
            }
        });

        const stmt = db.prepare(`update tasks set ${field} = ? where id = ${id}`);

        stmt.run(value);

        stmt.finalize();

        db.close();

    }

    async getAllTasks() {
        const db = this.getDatabase();
        return await new Promise((resolve, reject) => {
            db.all('select * from tasks', (err, data) => {
                if (!err) {
                    resolve(data);
                } else {
                    reject(err);
                }
            })
        })
    }
}

module.exports = new database();