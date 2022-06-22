<script setup>
  import { RouterLink } from 'vue-router';
</script>

<template>
  <div class="task" v-if="task.id">
    <div class="task-header">

    
    <button
      @click="redirectToRoot" 
      v-if="showBackButton" 
      class="back-button"
    > Voltar </button>
    
      
      <router-link :to="{path: `/task/${task.id}`}">
        <span class="task-jira-id">{{task.jira_id}}</span>
      </router-link>

      <a class="jira-button" :href="`${jiraURL}/${task.jira_id}`" target="_blank">
        Link do Jira
      </a>
      
       <router-link :to="{path: `/task/${task.id}`}">
        <h2 class="task-title">{{task.title}}</h2>
       </router-link>
    </div>
    <div class="task-body">
        <task-description-item 
          title="Description" 
          field_id="description"
          :task_id="task.id"
          :text="task.description || ''" 
          :editable="editable"
        />
        
        <task-description-item 
          title="Dev Journey"
          field_id="dev_journey" 
          :task_id="task.id"
          :text="task.dev_journey || ''" 
          :editable="editable"
        />
        
        <task-description-item 
          title="SEO principles"
          field_id="SEO_principles" 
          :task_id="task.id"
          :text="task.SEO_principles || ''" 
          :editable="editable"
        />
        
        <task-description-item 
          title="Best practices"
          field_id="best_practices" 
          :task_id="task.id"
          :text="task.best_practices || ''" 
          :editable="editable"
        />
    </div>
  </div>  
</template>

<script>
import TaskDescriptionItem from '../components/TaskDescriptionItem.vue';
import GeneralConfig from "../config/generalConfig";
import { getTasks } from '../helpers/tasks'; 

export default {
  
  props: {
    editable: {
      required: false,
      type: Boolean,
      default: false
    },

    showBackButton: {
      required: false,
      type: Boolean,
      default: false,
    },

    task: {
      required: true,
      type: Object
    }
  },

  components: {
    TaskDescriptionItem
  },

  methods: {
    redirectToRoot() {
       
      this.$router.push('/')
    }
  },

  computed: {
    jiraURL() {
      return GeneralConfig.jira_url; 
    }
  }
}
</script>

<style scoped lang="scss">

textarea {
    width: 100%;
    height: fit-content;
    overflow: auto;
    min-height: 100px;
    border:none;
    outline: none;
    background: none;
}

.task {
    border-radius: 5px;
    margin-bottom: 1.5rem;
    border: 1px solid var(--color-50);
    background-color: lighten(#f2f2f2, 5);
    box-shadow: 0px 0px 0px 1px rgba(2,2,2,.1);
}

.task-header {
    border-radius: 5px 5px 0 0;
    padding: .8rem 1rem; 
    border-bottom: 1px solid var(--color-100);
}

.task-id {
    font-size: .7rem;
    font-weight: 300;
    display: inline-block;
    padding: 4px 8px;
    border-radius: 5px;
    cursor: pointer;
}

.task-jira-id {
  @extend .task-id; 
  background: #eaeaea;
  color: #000; 
  font-weight: bold;
  color: var(--color-700);
  background-color: var(--color-100);
  float: left;
}

.jira-button {
  @extend .task-id; 
  background: #0052cc; 
  color: white;
  border: none;
  font-weight: 600;
  margin-left: 8px;
}

.back-button {
    display: block;
    background-color: var(--color-600);
    color: white;
    border: none;
    padding: 5px 10px;
    border-radius: 5px;
    font-weight: 500;
    font-size: .875rem;
    float: right;
}

.back-button:hover {
    transition: background-color .2s linear;
    cursor: pointer;
    background-color: #212121;
}

.task-header .task-title {
    color: var(--title-color);
    font-weight: 500;
    font-size: 1.2rem;
    clear: both;
    margin-top: 8px;
}

.task-body {
    border-radius:  0 0 5px 5px;
    padding: .8rem 1rem; 
    word-break: break-all;
}
</style>