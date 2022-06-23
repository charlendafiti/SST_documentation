<template>
    <header-component />

    <div class="main">
        <task :task="task" showBackButton editable/>
    </div>
</template>

<script>
import Task from "../components/Task.vue"
import HeaderComponent from "../components/Header.vue"
import { getTasks, isValidToken } from "../helpers/tasks";


export default {
    beforeCreate() {
        if(!isValidToken()) {
            this.$router.push({name: 'token'}); 
        }
    },

    created() {
        const taskId = this.$route.params.id; 

        getTasks().then(tasks => {
            this.task = tasks.find(task => task.id == taskId);
        });
    },
    
    components: {
        Task,
        HeaderComponent
    },

    data: _ => ({
        task: {},
    })
}
</script>