<template>
    <div
        v-if="visible" 
        class="badge badge-sm" 
        :class="`badge--${type.toLowerCase()}`"
        >
        {{description}}
        </div>
</template>

<script>
export default {
    props: {
        description: {
            required: true,
            type: String
        },

        // done, canceled, draft
        type: {
            required: false,
            type: String,
            default: 'draft'
        },

        visible: {
            required: false,
            type: Boolean,
            default: true
        }
    }
}
</script>


<style scoped lang="scss">
.badge {
    display: inline-block;
    padding: 0.25em 0.4em;
    font-size: 75%;
    font-weight: 700;
    line-height: 1;
    text-align: center;
    white-space: nowrap;
    vertical-align: baseline;
    border-radius: 0.25rem;
    margin-left: 5px;

    &-sm {
        padding: .6em .9em;  
    }

    &--done {
        color: #fff;
        background-color: #28a745;
    }
    
    &--canceled {
        color: #fff;
        background-color: #dc3545;
    }    

    &--draft {
        color: #fff;
        background-color: #6c757d;
    }
}
</style>