<template>
    <task :task="task" showBackButton/>
</template>

<script>
import Task from "../components/Task.vue"

export default {
    mounted: function() {
        const taskId = this.$route.params.id; 

        fetch(`http://localhost:3021/tasks`)
            .then(readableStream => readableStream.json())
            .then(tasks => {
                this.task = tasks.find(taskItem => taskItem.id == taskId);
            })
            
    },
    
    components: {
        Task
    },

    data: _ => ({
        task: {},
    })

}
</script>