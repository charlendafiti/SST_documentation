<template>
    <div class="task-description-item">
        <h3 class="description-title">
            {{title}}
        </h3>
        <p v-if="!editable" class="description-text" v-html="text">
        </p>
        <textarea 
            v-else
            class="description-text"  
            :id="field_id"
            cols="30" 
            rows="10"
            @change="updateItemDescription"
        >{{text}}</textarea>
        
    </div>
</template>

<script>
    import config from '../config/generalConfig.js';
    export default {
        
        props: {
            editable: {
                required: false, 
                type: Boolean,
                default: false,
            },

            field_id: {
                required: false,
                type: String,
                default: ''
            },

            task_id: {
                required: true,
                type: Number,
            },

            title: {
                required: true,
                type: String
            },

            text: {
                required: true,
                type: String
            }
        },

        methods: {
            updateItemDescription(e) {
                
                let content = e.target.value.replace(/[\\]/g, '\\\\')
                .replace(/[\"]/g, '\\\"')
                .replace(/[\/]/g, '\\/')
                .replace(/[\b]/g, '\\b')
                .replace(/[\f]/g, '\\f')
                .replace(/[\n]/g, '\\n')
                .replace(/[\r]/g, '\\r')
                .replace(/[\t]/g, '\\t');


                let body = `{"payload": {"id": "${this.task_id}","${this.field_id}": "${content}"}}`;
                

                fetch((config.host || '') + '/tasks', {
                    method: 'POST', 
                    body: body,
                    headers: {"Content-type": "application/json;charset=UTF-8"}
                }).then( res => {
                    console.log(res.body.json);
                });
            }
        },
    }
</script>

<style scoped lang="scss">
    .task-description-item {
        margin-bottom: 1rem; 
    }

    .description-title {
        font-size: 1rem; 
        color: var(--task-body-title);
        margin-bottom: 5px;
        font-weight: bold;
    }

    .description-text {
        font-size: .875rem;
        color: var(--text-color);
        white-space: pre-line;
        
    }

    textarea.description-text {
        width: 100%;
        background: #F5F5F5;
        border-color: #DADADA;
        padding: 1rem;

        &:focus {
            outline-color: #666;
        }
    }
</style>