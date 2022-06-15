const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());

function goto(id){
    document.location = `./?id=${id}`;
}

function goRoot() {
    document.location = './';
}

function OnInput() {
    this.style.height = "auto";
    this.style.height = (this.scrollHeight) + "px";
}

function onFieldChange(changed){
    let body = `{"payload": {"id": "${params.id}","${changed.target.id}": "${changed.target.value}"}}`;
    fetch('./tasks/',
        {
            method: 'POST', 
            body: body,
            headers: {"Content-type": "application/json;charset=UTF-8"}
        }).then( res => {
        console.log(res.body.json);
    });
}


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

                let backButtonHtml = `<button class="back-button" onClick="goRoot()">Voltar</button>`
                let taskHtml = !params.id ? `
                    
                    <div class="task-header">
                        ${params.id ? backButtonHtml : ''}
                        <span class="task-id" onClick="goto('${id}')">${id}</span>
                        <h2 class="task-title">${title}</h2>
                    </div>
                    <div class="task-body">
                        <h3>Description</h3><div class="task-description">${description||""}</div>
                        <h3>Dev Journey</h3><div class="task-description">${dev_journey||""}</div>
                        <h3>SEO Principles discovered</h3><div class="task-description">${SEO_principles||""}</div>
                        <h3>Best Practices</h3><div class="task-description">${best_practices||""}</div>
                    </div>
                ` : `
                <div class="task-header">
                ${params.id ? backButtonHtml : ''}
                <span class="task-id" onClick="goto('${id}')">${id}</span>
                <h2 class="task-title">${title}</h2>
                </div>
                <div class="task-body">
                    <h3>Description</h3><textarea id="description" class="task-description">${description||""}</textarea>
                    <h3>Dev Journey</h3><textarea id="dev_journey" class="task-description">${dev_journey||""}</textarea>
                    <h3>SEO Principles discovered</h3><textarea id="SEO_principles" class="task-description">${SEO_principles||""}</textarea>
                    <h3>Best Practices</h3><textarea id="best_practices" class="task-description">${best_practices||""}</textarea>
                </div>
                `; 
                
                currentTask.innerHTML = taskHtml; 
                
                document.body.append( currentTask );

                if(params.id){
                    const tx = document.getElementsByTagName("textarea");
                    for (let i = 0; i < tx.length; i++) {
                    tx[i].setAttribute("style", "height:" + (tx[i].scrollHeight) + "px;overflow-y:hidden;");
                    tx[i].addEventListener("input", OnInput, false);
                    tx[i].addEventListener("change",onFieldChange, false);
                    }
                }

            });
        })
    })

