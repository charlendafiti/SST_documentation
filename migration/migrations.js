module.exports = {
    conditionalCreate: [
        {
            description: "Create structure for migrations on default database",
            sql: `
                CREATE TABLE IF NOT EXISTS 
                version (
                    id integer PRIMARY KEY,
                    version integer not null default 0
                )
                `
        },
        {
            description: "Create tasks table if not exists",
            sql: `
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
                `
        }
    ],
    regularMigrations: [
        {
            description: "Insert version 0 on version",
            sql: 
                [
                    `
                        insert into version(id,version) values(0,0)
                    `
                ]
            
        },
        {
            description: "Update description fields to varchar max",
            sql: [
                    `
                    PRAGMA foreign_keys=off;
                    BEGIN TRANSACTION;

                    ALTER TABLE tasks RENAME column description TO old_description;
                    ALTER TABLE tasks ADD column description text;
                    UPDATE tasks SET description = old_description;
                    ALTER TABLE tasks DROP column old_description;

                    ALTER TABLE tasks RENAME column dev_journey TO old_dev_journey;
                    ALTER TABLE tasks ADD column dev_journey text;
                    UPDATE tasks SET dev_journey = old_dev_journey;
                    ALTER TABLE tasks DROP column old_dev_journey;

                    ALTER TABLE tasks RENAME column SEO_principles TO old_SEO_principles;
                    ALTER TABLE tasks ADD column SEO_principles text;
                    UPDATE tasks SET SEO_principles = old_SEO_principles;
                    ALTER TABLE tasks DROP column old_SEO_principles;

                    ALTER TABLE tasks RENAME column best_practices TO old_best_practices;
                    ALTER TABLE tasks ADD column best_practices text;
                    UPDATE tasks SET best_practices = old_best_practices;
                    ALTER TABLE tasks DROP column old_best_practices;


                    COMMIT;
                    PRAGMA foreign_keys=on;
                    `
                ]
        }
    ]
}