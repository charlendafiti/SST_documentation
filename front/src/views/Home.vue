<template>
   
    <header-component />
    <div class="main">
        <div class="input-group">
            <input 
                type="text" 
                maxlength="20" 
                placeholder="ID do Jira. Ex.: SST-20" 
                @input="onTyping"
                v-on:keyup.enter="search" 
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
    
        <results-component :tasks="tasks"/>
        
        <task-component 
            v-for="task in tasks" 
            :key="task.id" 
            :task="task"
            :editable="false"
        />
    </div>
</template>

<script>
import { getTasks, isValidToken } from "../helpers/tasks";

// components 
import TaskComponent from "../components/Task.vue";
import HeaderComponent from "../components/Header.vue";
import ResultsComponent from "../components/Result.vue";

export default {
    beforeCreate() {
        if(!isValidToken()) {
            this.$router.push({name: 'token'}); 
        }
    },
    mounted: function () {
        this.init();    
    },

    components: {
        TaskComponent,
        HeaderComponent,
        ResultsComponent
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

        onEnter() {
            this.search();
        },

        onTyping() {
            clearTimeout(this.timeout); 
            this.timeout = setTimeout(() => this.search(), 1000);
        },

        search() {
            
            if(this.query.length >= 1) {

                this.isLoading = true;

                this.fetchJson().then(tasks => {
                    this.tasks = tasks.filter(task => {
                        return task.jira_id.includes(this.query.toUpperCase());
                    });
                    this.isLoading = false; 
                });
            } else {
                this.loadJson();
            }
            
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
                        result = !((!!task.description && !!task.description.trim()) && result);
                    }

                    if(this.filters.no_dev_journey && result) {
                        result = !((!!task.dev_journey && !!task.dev_journey.trim()) && result);
                    }

                    if(this.filters.no_seo_principles && result) {
                        result = !((!!task.SEO_principles && !!task.SEO_principles.trim()) && result);
                    }

                    if(this.filters.no_best_practices && result) {
                        result = !((!!task.best_practices && !!task.best_practices.trim()) && result);
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

.input-group {
    display: flex; 
    flex-direction: column;
    margin: 1rem 0;
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
        top: 20%;
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
        background-color: #999999cc;
        color: white;
        cursor: pointer;
        transition: all .1s ease-in;

        &.active {
            background: #000000cc; 
            color: white; 
        }
    }
}

@media screen and (max-width: 500px) {
    .filters {
        display: flex;
        flex-direction: column;
    }
    button {
        display: inline-block;
        margin: 0.2rem 0;
        width: 100%;
    }
}
</style>   