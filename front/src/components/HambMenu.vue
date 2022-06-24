<script>
export default {
    data() {

    }
}
</script>
<template>
    <div class="hamb-menu-container">
        <div class="hamb-menu">
            <div class="hamb-menu-line"></div>
            <div class="hamb-menu-line"></div>
            <div class="hamb-menu-line"></div>
        </div>
    </div>
</template>
<style scoped lang="scss">
    .hamb-menu-container {
        display: inline-block;
        width: 5vh;
        height: 2rem;
        margin: 0 1rem;

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
            height: 20%;
            margin: 13% 0;
            border-radius: 1rem;
        }

        .hamb-menu-line:first {
            margin: 0;
        }
    
    }
</style>
