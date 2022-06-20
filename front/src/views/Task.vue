<template>
    <task :task="task" showBackButton editable/>
</template>

<script>
import Task from "../components/Task.vue"
import { getTasks } from "../helpers/tasks";

export default {
    created() {
        const taskId = this.$route.params.id; 

        getTasks().then(tasks => {
            this.task = tasks.find(task => task.id == taskId);
        });
    },
    
    components: {
        Task
    },

    data: _ => ({
        task: {},
    })
}
</script>