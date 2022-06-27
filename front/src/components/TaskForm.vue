<template>  
    <div class="row">

        <p v-if="errors.length" class="errors">
            <b>Corrija o(s) seguinte(s) erro(s): </b>
            <ul>
                <li v-for="error in errors">{{error}}</li>
            </ul>
        </p>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="jira-id">Jira ID</label>
            <input 
                class="description-text" 
                type="text" 
                maxlength="10" 
                placeholder="SST-20" 
                v-model="task.jira_id"
            />
        </div>
    </div>
    <div class="row">
        <div class="form-group">
            <label for="title">Título</label>
            <input 
                class="description-text" 
                type="text"  
                placeholder="[Dafiti] - Remoção de H1s extras" 
                v-model="task.title"
            />
        </div>
    </div>
    <div class="row">
        <button v-if="!isProcessing" class="btn-submit" @click="submit">Gravar</button>
        <button v-else class="btn-submit processing" disabled @click="submit">Enviando...</button>
    </div>
</template>

<script>
    import { getToken, escape } from '../helpers/tasks';
    import config from '../config/generalConfig.js';
    export default {
        data: _ => ({
            isProcessing: false,
            errors: [],
            task: {
                jira_id: '',
                title: ''
            }
        }),

        methods: {
            submit() {

                this.isProcessing = true;  

                if(this.checkFields()) {
                    
                    let {
                            jira_id, 
                            title, 
                        } = this.task;

                    let body = `{"payload": {"jira_id": "${escape(jira_id)}","title": "${escape(title)}"}}`;

                    fetch((config.host || '') + '/tasks', {
                        method: 'POST',
                        body: body,
                        headers: {
                            "Content-type": "application/json;charset=UTF-8",
                            token: getToken(),
                        }
                    }).then(response => response.json())
                    .then(json => console.log(json))
                    .catch(err => console.log(err));
                }

                this.isProcessing = false;
            },

            checkFields() {
                if(this.task.jira_id && this.task.title) {
                    return true;
                }

                this.errors = []; 

                if(!this.task.jira_id) {
                    this.errors.push('O ID do Jira é obrigatório');
                }

                if(!this.task.title) {
                    this.errors.push('O título é obrigatório');
                }
            },
        }
    }
</script>

<style scoped lang="scss">

    .row {
        margin-bottom: 20px;

        label {
            font-weight: bold;
            font-size: .875rem;
        }
    }
    
    .m-10 {
        margin-bottom: 10px;
    }

    .description-text {
        width: 100%;
        overflow: auto;

        background: #fff;
        border-color: var(--color-100);
        padding: 1rem;
        color: var(--color-800);
        content: attr(data-replicated-value) " ";

        &:focus {
            outline-color: #666;
        }
    }

    .btn-submit {
        background: #0052cc;
        color: white;
        border: none;
        padding: 10px 24px;
        border-radius: 2px;
        cursor: pointer; 

        &.processing {
            background-color: lighten(#0052cc, 30);
        }
    }

    .errors {
        color: #721c24;
        background-color: #f8d7da;
        border-color: #f5c6cb; 
        padding: 1rem; 
        border-radius: 4px;
    }
</style>