<template>
    <div class="task-description-item">
        <h3 class="description-title">
            {{title}}
        </h3>
        <p v-if="!editable" class="description-text img-fluid" v-html="text">
        </p>
        <div v-else 
            :contentEditable="true"
            v-html="text"
            class="description-text description-editable img-fluid"  
            :id="field_id"
            @input="onTyping"
        ></div>
    </div>
</template>

<script>
    import { getToken} from '../helpers/tasks';
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

        data: _ => ({
            timeout: null, 
        }),

        methods: {
            onTyping(e) {
                clearTimeout(this.timeout); 
                this.timeout = setTimeout(() => this.updateItemDescription(e), 1000);
            },
            updateItemDescription(e) {
                let elementValue = e.target.innerHTML;
                
                let content = elementValue.replace(/[\\]/g, '\\\\')
                .replace(/[\"]/g, '\\\"')
                .replace(/[\/]/g, '\\/')
                .replace(/[\b]/g, '\\b')
                .replace(/[\f]/g, '\\f')
                .replace(/[\n]/g, '\\n')
                .replace(/[\r]/g, '\\r')
                .replace(/[\t]/g, '\\t');


                let body = `{"payload": {"id": "${this.task_id}","${this.field_id}": "${content}"}}`;
                

                fetch((config.host || '') + '/tasks', {
                    method: 'PUT', 
                    body: body,
                    headers: {
                        "Content-type": "application/json;charset=UTF-8",
                        token: getToken(),
                    }
                }).then( res => {
                    
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
        font-size: .875rem; 
        color: var(--color-800);
        margin-bottom: 5px;
        font-weight: 700;
    }

    .description-text {
        outline: none;
        font-size: .875rem;
        color: var(--color-600);
        white-space: pre-line;
        word-break: break-word;
        text-align: justify;

        &.description-editable {
            font-size: .875rem;
            color: var(--color-800);
            word-break: break-word;
            text-align: justify;
            padding: .8rem;
            border: 1px solid var(--color-100);
            border-radius: 3px;
            background-color: var(--color-50);
        }
    }

    textarea.description-text {
        width: 100%;
        overflow: auto;

        background: #f1f1f1;
        border-color: var(--color-100);
        padding: 1rem;
        color: var(--color-800);
        content: attr(data-replicated-value) " ";
        border: 1px solid var(--color-100);
        
        &:focus {
            outline-color: #666;
        }
    }
</style>