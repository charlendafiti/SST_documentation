<template>
    <div class="task-description-item">
        <h3 class="description-title">
            {{title}}
        </h3>
        <p v-if="!editable" class="description-text" v-html="text">
        </p>
        <div v-else class="grow-wrap">
            <div 
                :contentEditable="true"
                class="description-text description-editable"  
                :id="field_id"
                cols="30" 
                rows="10"
                @input="updateItemDescription"
                v-html="text"
            ></div>
        </div>
        
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

        methods: {
            updateItemDescription(e) {

                let element = e || event;

                console.log(element);

                let elementValue = element.target.value || element.target.innerHTML;
                
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
                    this.adjustTextareaHeight();
                });
            },

            adjustTextareaHeight(e) {
                element.style.height = "auto";
                element.style.height = `${element.scrollHeight}px`;
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
        font-size: .875rem;
        color: var(--color-600);
        white-space: pre-line;
        word-break: break-word;
        text-align: justify;
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

    .grow-wrap {
        display: grid;
    }
    .grow-wrap::after {
        content: attr(data-replicated-value) " ";
        visibility: hidden;
    }

    .grow-wrap > textarea {
        resize: none;
        overflow: hidden;
    }
    .grow-wrap > textarea,
    .grow-wrap::after {
    
    padding: 0.5rem;
    font: inherit;
    grid-area: 1 / 1 / 2 / 2;
    }
</style>