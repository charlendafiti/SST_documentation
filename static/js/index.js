const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());


fetch('./tasks/').
    then( data => {
        data.json().then( res => {
            res
            .filter( task => {
                return params.id ? task.id == params.id : true;
            })
            .forEach(task => {
                let currentTask = document.createElement('div');
                let {id, title, description, dev_journey, SEO_principles, best_practices} = task;

                currentTask.className = "task";                

                let taskHtml = `
                    <div class="task-header">
                        <span class="task-id">${id}</span>
                        <h2 class="task-title">${title}</h2>
                    </div>
                    <div class="task-body">
                        <h3>Description</h3><div class="task-description">${description||""}</div>
                        <h3>Dev Journey</h3><div class="task-description">${dev_journey||""}</div>
                        <h3>SEO Principles discovered</h3><div class="task-description">${SEO_principles||""}</div>
                        <h3>Best Practices</h3><div class="task-description">${best_practices||""}</div>
                    </div>
                `; 
                
                currentTask.innerHTML = taskHtml; 
                
                document.body.append( currentTask );

            });
        })
    })