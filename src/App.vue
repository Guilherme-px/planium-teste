<template>
    <div id="app">
        <div class="header">
            <Navbar />
        </div>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
import Navbar from "./components/template/Navbar.vue";

export default {
    name: "App",
    components: { Navbar },
};
</script>

<style>
.header {
    min-height: 10vh;
}
</style>
