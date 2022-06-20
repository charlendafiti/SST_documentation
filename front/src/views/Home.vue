<template>
    <header>
        <h1 class="main-title"> Tarefas de Q1 e Q3</h1>
    </header>
    <div class="input-group">
        <label for="search">Informe o ID da task que deseja: </label>
        <input 
            type="search" 
            maxlength="20" 
            placeholder="Exemplo: SST-20" 
            @input="search"
            v-model="query"
            
        />
        <button 
            @click="clearSearch"
            v-if="!!query"
        >x</button>
    </div>
    <task v-for="task in tasks" :key="task.id" :task="task" />
</template>

<script>
import _ from "lodash";

// components 
import Task from "../components/Task.vue";

export default {
    mounted: function () {
        this.init(); 
    },

    components: {
        Task,
    },

    data: _ => ({
        query: null,
        tasks: [],
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
            _.debounce(_ => {
                fetch('http://localhost:3021/tasks')
                .then(readableStream => readableStream.json())
                .then(tasks => {
                    this.tasks = tasks.filter(task => task.id.includes(this.query))
                });
            }, 1000)();
        },

        loadJson() {
            fetch('http://localhost:3021/tasks')
            .then(readableStream => readableStream.json())
            .then(tasks => this.tasks = tasks);
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
    margin: 1rem 0;
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
}

.input-group label {
    font-weight: 500;
}

input[type="search"] {
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