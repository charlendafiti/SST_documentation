<template>
    <div class="task-description-item">
        <h3 class="description-title">
            {{title}}
        </h3>
        <p class="description-text">
            {{text}}
        </p>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                required: true,
                type: String
            },

            text: {
                required: true,
                type: String
            }
        }
    }
</script>

<style scoped>
    .task-description-item {
        margin-bottom: 1rem; 
    }

    .description-title {
        font-size: 1rem; 
        color: var(--task-body-title);
        margin-bottom: 5px;
        font-weight: bold;
    }

    .description-text {
        font-size: .875rem;
        color: var(--text-color);
    }
</style>