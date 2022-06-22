<template>
    <header>
        <h1 class="main-title"> Tarefas de Q1 e Q3</h1>
    </header>
    <div class="input-group">
        <label for="search">Informe o ID da task: </label>
        <input 
            type="text" 
            maxlength="20" 
            placeholder="ID do banco ou do Jira" 
            @input="search"
            v-model="query"
            
        />
        <small v-if="isLoading"> Loading...</small>
        <button 
            @click="clearSearch"
            v-if="!!query"
        >x</button>
    </div>

    <div class="filters">
        <button :class="{active: filters.no_description}" @click="toggleNoDescription">No Description </button>
        <button :class="{active: filters.no_dev_journey}" @click="toggleNoDevJourney">No Dev Journey </button>
        <button :class="{active: filters.no_best_practices}" @click="toggleNoBestPractices">No Best Practices</button>
        <button :class="{active: filters.no_seo_principles}" @click="toggleNoSeoPrinciples">No SEO Principles </button>
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
        localStorage: null,
        filters: {
            no_description: false,
            no_dev_journey: false,
            no_seo_principles: false,
            no_best_practices: false
        }
    }),

    methods: {
        init() { 
            this.localStorage = window.localStorage; 
            this.filters = this.getFiltersFromLocalStorage();            
            this.loadJson();
        },

        clearSearch() {
            this.query = null;
            this.loadJson();
        },

        search() {
            
            clearTimeout(this.timeout); 

            this.timeout = setTimeout(() => {
                if(this.query.length >= 1) {
                    this.fetchJson().then(tasks => {
                        this.tasks = tasks.filter(task => {
                            return (
                                (task.id == this.query) || (task.jira_id.includes(this.query.toUpperCase()) ) 
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
                
                
                this.tasks = tasks.filter(task => {
                    let result = true; 

                    if(this.filters.no_description && result) {
                        result = !(!!task.description.trim() && result);
                    }

                    if(this.filters.no_dev_journey && result) {
                        result = !(!!task.dev_journey.trim() && result);
                    }

                    if(this.filters.no_seo_principles && result) {
                        result = !(!!task.SEO_principles.trim() && result);
                    }

                    if(this.filters.no_best_practices && result) {
                        result = !(!!task.best_practices.trim() && result);
                    }

                    return result; 
                });

                this.isLoading = false;
            });
        },

        getFiltersFromLocalStorage() {
            
            let localStorage = window.localStorage; 

            return {
                no_description: this.getBoolean(localStorage.no_description),
                no_dev_journey: this.getBoolean(localStorage.no_dev_journey),
                no_seo_principles: this.getBoolean(localStorage.no_seo_principles),
                no_best_practices: this.getBoolean(localStorage.no_best_practices)
            }
        },

        toggleNoDescription() {
            let toggleValue = !this.filters.no_description;

            this.localStorage.setItem('no_description',toggleValue);
            this.filters.no_description = toggleValue; 

            this.loadJson();
        },
        
        toggleNoDevJourney() {
            let toggleValue = !this.filters.no_dev_journey;

            this.localStorage.setItem('no_dev_journey',toggleValue);
            this.filters.no_dev_journey = toggleValue; 

            this.loadJson();
        },

        toggleNoBestPractices() {
           let toggleValue = !this.filters.no_best_practices;

            this.localStorage.setItem('no_best_practices',toggleValue);
            this.filters.no_best_practices = toggleValue; 

            this.loadJson();
        },
        
        toggleNoSeoPrinciples() {
            let toggleValue = !this.filters.no_seo_principles;

            this.localStorage.setItem('no_seo_principles',toggleValue);
            this.filters.no_seo_principles = toggleValue; 

            this.loadJson();
        },

        getBoolean(value){ 
            switch(value) { 
                case true: 
                case "true": 
                case 1: 
                case "1": 
                case "on": 
                case "yes": 
                return true; 
                default: 
                return false; 
            } 
        }
    },
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

.filters {
    margin: 10px 0; 
    display: flex;
    justify-content: flex-start;

    button {
        margin-right: 10px;
        border: none; 
        padding: 5px 10px;
        border-radius: 3px;
        background-color: #eaeaea;
        border: 1px solid #666;
        cursor: pointer;
        transition: all .1s ease-in;

        &.active {
            background: #212121; 
            color: white; 
        }
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