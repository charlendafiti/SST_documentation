class utilFile{
    async checkDataAndStructure(){
        await this.generateStructure();
        this.importInitialDataIfNotExists();
    }

    async generateStructure(){
        const db = databaseService.getDatabase();

        const createTasks = await new Promise((resolve, reject) => {
            db.run(`
            
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
        const db = databaseService.getDatabase();

        return await new Promise( (resolve, reject) => {
            db.all('select * from tasks', (err, data) => { 
                let result = !!data ? data.length > 0 :  false;
                resolve(result)
            }).close();
        });
    }

    async hasStatus() {
        const db = databaseService.getDatabase();

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
        const db = databaseService.getDatabase();

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
        const db = databaseService.getDatabase();

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
}