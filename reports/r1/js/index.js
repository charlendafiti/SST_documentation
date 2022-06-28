
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
    let fieldValue = changed.target.value.replace(/[\\]/g, '\\\\')
    .replace(/[\"]/g, '\\\"')
    .replace(/[\/]/g, '\\/')
    .replace(/[\b]/g, '\\b')
    .replace(/[\f]/g, '\\f')
    .replace(/[\n]/g, '\\n')
    .replace(/[\r]/g, '\\r')
    .replace(/[\t]/g, '\\t');
    
    let body = `{"payload": {"id": "${params.id}","${changed.target.id}": "${fieldValue}"}}`;

    fetch('/tasks',
        {
            method: 'POST', 
            body: body,
            headers: {"Content-type": "application/json;charset=UTF-8"}
        }).then( res => {

    });
}

function statusTranslate(status){
    const statusDictionary = {
        0: "Concluída",
        1: "Cancelada",
        2: "Excluida"
    }

    return statusDictionary[status];
}

// function generateLink(content){
//     let links = content.match(/http.*\:\/\/.*(\ ||\r)/ig);
//     !!links && links.forEach( link => {
//         let linkElement = `<a href='${link}' target='__blank'>${link}</a>`;
//         content = content.replace(link, linkElement)
//     })
//     return content;
// }

function reduceLink(link){
    return link.substring(0,20) + '...';
}

function generateLink(text) {
    var exp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/i;
    return text.replace(exp,`<a href='$1' class="report-link" target='__blank'>$1</a>`); 
}

function updateAllLinks(){
    let descriptions = document.getElementsByClassName('task-description');

    Object.keys(descriptions).forEach( descriptionKey => {
        let currentDescription = descriptions[descriptionKey];

        currentDescription.innerHTML = generateLink(currentDescription.innerHTML);
    });
}


fetch('/tasks',{
    headers: {
        token: window.localStorage.token
    }
}).
    then( data => {
        data.json().then( res => {
            res
            .filter( task => {
                return params.id ? task.id == params.id : true;
            })
            .forEach(task => {
                let currentTask = document.createElement('div');
                let {id, jira_id, status, title, description, dev_journey, SEO_principles, best_practices} = task;

                currentTask.className = "task";                

                let taskHtml = `
                    
                    <div class="task-header">
                        <h2 class="task-title">${jira_id} - ${title} (${statusTranslate(status)})</h2>
                    </div>
                    <div class="task-body">
                        <h3>Descrição</h3><div class="task-description">${description||""}</div>
                        <h3>Jornada de Desenvolvimento</h3><div class="task-description">${dev_journey||""}</div>
                        <h3>Principios de SEO</h3><div class="task-description">${SEO_principles||""}</div>
                        <h3>Boas práticas</h3><div class="task-description">${best_practices||""}</div>
                    </div>
                `
                
                currentTask.innerHTML = taskHtml; 
                
                document.body.append( currentTask );

            });
            updateAllLinks();
        })
    })

