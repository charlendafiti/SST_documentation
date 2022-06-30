const fs = require('fs');
const { resolve } = require('path');
const databaseService = require('../services/database.js');
const { conditionalCreate } = require('./migrations.js');
const migrations = require('./migrations.js');


class simpleMigration {
    async runMigrations(){
        await this.loadMigrations();
        await this.executeConditionalCreations();
        await this.executeMigrations();
    }

    async loadMigrations(){
        console.log('Loading migrations...')
        this.migrations = migrations;
    }

    async executeMigration(sqlCommand){
        const db = databaseService.getDatabase();
        
        try {
            return await new Promise( (resolve, reject) => {
                db.exec(sqlCommand, (data, err) => {
                    if(err){
                        console.log(err);
                        reject(err);
                    } else {
                        db.close();
                        console.log('Executed sucefully');
                        resolve();
                    }
                });  
            });

        }catch( error ){
            console.warn('Execution failed :', error);
        }

        return;
    }

    async executeConditionalCreations(){
        console.log('Executing conditional creations ...')
        for(let conditionalCreate of this.migrations.conditionalCreate){
            try {
                console.log(' -- Running migration: ', conditionalCreate.description);
                await this.executeMigration( conditionalCreate.sql )
            } catch( error ){
                throw `Error while executing migration: ${conditionalCreate.description}`
            }
        }
    }

    async getCurrentMigration(){
        const db = databaseService.getDatabase();
        try{
            return await new Promise((resolve, reject) => {
                db.all('select version from version where id = 0', (error, result) => {
                    if(error){
                        reject(0)
                    } else {
                        resolve(result[0] ? result[0].version : 0);
                    }
                });
            });
        }catch(error){
            return 0;
        }
    }

    async executeMigrations(){
        const db = databaseService.getDatabase();
        let currentMigration = await this.getCurrentMigration();
        const regularMigrations = this.migrations.regularMigrations.filter( ( migration, idx) => {
            return idx >= currentMigration;
        });
        if(regularMigrations.length > 0){
            console.log('Executing regular migrations ...')
        }
        for(let regularMigration of regularMigrations){
            currentMigration++;
            try {
                console.log(' -- Running migration: ', regularMigration.description);
                for(let command of regularMigration.sql){
                    await this.executeMigration( command );
                }
            } catch( error ){
                throw `Error while executing migration: ${regularMigration.description}`
            }
            db.run(`update version set version = ${currentMigration}`)
        }        

        db.close();
    }
}

module.exports = new simpleMigration();