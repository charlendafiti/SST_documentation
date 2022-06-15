fetch('./getTasks/').
    then( data => {
        data.json().then( res => {
            res.forEach(task => {
                let currentTask = document.createElement('div');
                let {id, title, description, dev_journey, SEO_principles, best_practices} = task;

            currentTask.className = "task";
                
            // # id - title
            currentTask.innerHTML = `<h2 class="task-title">${id} - ${title}</h2>`;

            // # description
            currentTask.innerHTML += `<h3>Description</h3><div class="task-description">${description||""}</div>`;

            // # dev journey
            currentTask.innerHTML += `<h3>Dev Journey</h3><div class="task-description">${dev_journey||""}</div>`;

            // # SEO Principles discovered
            currentTask.innerHTML += `<h3>SEO Principles discovered</h3><div class="task-description">${SEO_principles||""}</div>`;

            // # Best Practices
            currentTask.innerHTML += `<h3>Best Practices</h3><div class="task-description">${best_practices||""}</div>`;
            
            document.body.append( currentTask );

            });
        })
    })