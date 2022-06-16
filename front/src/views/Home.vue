<template>
    <task v-for="task in tasks" :key="task.id" :task=task />
</template>

<script>
import Task from "../components/Task.vue"

export default {
    mounted: function() {
        fetch('http://localhost:3021/tasks')
            .then(readableStream => readableStream.json())
            .then(tasks => this.tasks = tasks);
    },
    
    components: {
        Task
    },

    data: _ => ({
        tasks: [],
    })

}
</script>