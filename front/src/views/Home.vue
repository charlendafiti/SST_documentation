<template>
    <header>
        <h1 class="main-title"> Tarefas de Q1 e Q3</h1>
    </header>
    <div class="input-group">
        <label for="search">Informe o ID da task: </label>
        <input 
            type="text" 
            maxlength="20" 
            placeholder="Informe pelo menos 3 caracteres para buscar" 
            @input="search"
            v-model="query"
            
        />
        <small v-if="isLoading"> Loading...</small>
        <button 
            @click="clearSearch"
            v-if="!!query"
        >x</button>
    </div>
    <task-component 
        v-for="task in tasks" 
        :key="task.id" 
        :task="task"
        :editable="false"
    />
</template>

<script>
import { getTasks } from "../helpers/tasks";

// components 
import TaskComponent from "../components/Task.vue";


export default {
    mounted: function () {
        this.init(); 
    },

    components: {
        TaskComponent,
    },

    data: _ => ({
        isLoading: false,
        query: null,
        tasks: [], 
        timeout: null,
    }),

    methods: {
        init() { 
            this.loadJson();
        },

        clearSearch() {
            this.query = null;
            this.loadJson();
        },

        search() {
            
            clearTimeout(this.timeout); 

            this.timeout = setTimeout(() => {
                console.log(this.query)
                if(this.query.length >= 3) {
                    this.fetchJson().then(tasks => {
                        this.tasks = tasks.filter(task => {
                            return (
                                task.id.includes(this.query.toUpperCase()) || 
                                task.title.includes(this.query)
                            ); 
                        });
                        this.isLoading = false; 
                    });
                } else {
                    this.loadJson();
                }
            }, 1000);
        },

        fetchJson() {
            this.isLoading = true;
             return getTasks();  
        },

        loadJson() {
            this.fetchJson().then(tasks => { 
                this.tasks = tasks;
                this.isLoading = false;
            });
        }
    }
}
</script>

<style scoped lang="scss">
.main-title {
    font-size: 2rem;
    color: var(--title-color);
    display: block;
    margin-bottom: 1rem;
    font-weight: 700;
}

.input-group {
    display: flex; 
    flex-direction: column;
    margin: 1.5rem 0;
    margin-bottom: 2rem;
    position: relative;


    button {
        width: 25px;
        height: 25px;
        display: block;
        text-align: center;
        background: #eaeaea;
        color: #242424;
        border-radius: 50%;
        border: none;
        position: absolute;
        right: 10px;
        top: 50%;
        cursor: pointer;
    }
     
    small {
        color: #666;
        position: absolute;
        bottom: -1.2rem
    }
}

.input-group label {
    font-weight: 600;
    font-size: .875rem;
}

input[type="text"] {
    background-color: white; 
    font-size: .875rem;
    border: none;
    border-radius: 5px; 
    border: 2px solid var(--border-color);
    padding: 8px 12px; 
    outline: 0;
    color: #212121;

    &:focus {
        transition: border-color .2s linear;
        border-color: darken(#DEE7F2, 15);
    }
}

</style>   