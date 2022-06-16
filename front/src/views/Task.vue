<template>
  <div class="task">
    <div class="task-header">
      <button class="back-button">Voltar</button>
      <h2 class="task-title">SST-20 [Dafiti] - Remoção de H1s extras</h2>
    </div>
    <div class="task-body">
        <task-description-item />
        <task-description-item />
        <task-description-item />
        <task-description-item />
    </div>
  </div>  
</template>

<script>
import TaskDescriptionItem from '../components/TaskDescriptionItem.vue'
export default {
  components: {
    TaskDescriptionItem
  },

  data: _ => ({

  }),
}
</script>

<style scoped>

textarea {
    width: 100%;
    height: fit-content;
    overflow: auto;
    min-height: 100px;
    border:none;
    outline: none;
    background: none;
}

.main-title {
    font-size: 2rem;
    color: var(--title-color); 
    display: block;
    margin-bottom: 1rem;
    font-weight: 700;
}

.task {
    border-radius: 5px;
    margin-bottom: 1.5rem;
    -webkit-box-shadow: -1px 1px 1px 2px rgb(228 239 253); 
    box-shadow: -1px 1px 1px 2px rgb(228 239 253);
}

.task-header {
    border-radius: 5px 5px 0 0;
    padding: .8rem 1rem; 
    background: white; 
    border-bottom: 2px solid var(--border-color)
}

.task-id {
    font-size: .8rem;
    color: #333;
    font-weight: 300;
    background-color: #eaeaea;
    display: inline-block;
    padding: 5px 10px;
    border-radius: 5px;
    margin-bottom: 4px;
    cursor: pointer;
}

.back-button {
    display: block;
    background-color: var(--back-button-bg);
    color: white;
    border: none;
    margin-bottom: 10px;
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
    font-size: 1.5rem;
}

.task-body {
    border-radius:  0 0 5px 5px;
    padding: .8rem 1rem; 
    background-color: var(--task-bg);
}
</style>