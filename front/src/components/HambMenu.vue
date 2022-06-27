<script>
import Sidebar from './Sidebar.vue';
export default {
    data() {
        return {
            viewSidebar: false
        }
    },
    components: {
        Sidebar
    },
    methods: {
        toggleSidebar() {
            this.viewSidebar = !this.viewSidebar;
        }
    },
    mounted() {
        console.log(`Initial value of viewSidebar is ${this.viewSidebar}`)
    }
}
</script>
<template>
    <div class="hamb-menu-container">
        <div class="hamb-menu" @click="toggleSidebar">
            <div class="hamb-menu-line"></div>
            <div class="hamb-menu-line"></div>
            <div class="hamb-menu-line"></div>
        </div>
    
    </div>
    <Sidebar v-if="this.viewSidebar" @toggleSidebar="toggleSidebar"></Sidebar>

</template>
<style scoped lang="scss">
    .hamb-menu-container {
        position: absolute;
        left: 0px;
        top: 0px;
        display: inline-block;
        width: 4vh;
        max-width: 30px;
        height: 3vh;
        margin: 1.5rem 1rem;

        .hamb-menu {
            width: 100%;
            height: 100%;
            cursor: pointer;
        }

        .hamb-menu-line {
            display: flex;
            flex: 1;
            background-color: black;
            width: 100%;
            height: 17%;
            margin: 16% 0;
        }
    
    }
</style>
