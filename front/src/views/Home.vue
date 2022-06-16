<template>
    <header>
    <h1 class="main-title"> Tarefas de Q1 e Q3</h1>
  </header>

    <task v-for="task in tasks" :key="task.id" :task="task" />
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

<style scoped>
.main-title {
    font-size: 2rem;
    color: var(--title-color); 
    display: block;
    margin-bottom: 1rem;
    font-weight: 700;
}

</style>   