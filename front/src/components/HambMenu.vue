<script>
import Sidebar from './Sidebar.vue';
export default {
    
    components: {
        Sidebar
    },

    data: _ => ({
        viewSidebar: false,
    }),
    
    methods: {
        toggleSidebar() {
            this.viewSidebar = !this.viewSidebar;
        }
    },
    mounted() {

    }
}
</script>
<template>
    
    <div class="hamb-menu-container" @click="toggleSidebar">
        <div class="hamb-menu">
        </div>
    </div>
    <Sidebar v-if="this.viewSidebar" @toggleSidebar="toggleSidebar"></Sidebar>

</template>
<style scoped lang="scss">
    
     @media screen and (max-width: 300px) {
        .hamb-menu-container {
            position: absolute;
            top: 50%;
            left: 1rem;
        }
    }

   @media screen and (min-width: 301px) and (max-width: 500px) {
        .hamb-menu-container {
            position: absolute;
            top: 50%;
            left: 2rem;
        }
    }

    .hamb-menu-container {
        cursor: pointer;
        padding: .5rem 0;
    }

    .line {
        width: 100%;
        height: 2.5px;
        border-radius: 5px;
        background-color: var(--color-800); 
    }

    .hamb-menu {
       @extend .line; 
       width: 23px;
       display: block;
       position: relative; 
       cursor: pointer;


       &::before, 
       &::after {
        content: '';
        @extend .line;
        position: absolute;
       }

       &::before {
        top: -6px; 
       }

       &::after {
        top: 6px; 
       }

    }
</style>
